import { db } from "../utils/db_utils";

import "dotenv/config";

import {
  changeEmailVerifiedStateSql,
  changeProfileIsFilledStateSql,
  recordUserProfileSql,
  registerBankAccountSql,
  registerUserSql,
  updateBankAccountInfoSql,
  updateUserProfileSql,
} from "../utils/sqls/user_mutation";
import {
  getRegisteredUserByUidSql,
  getAllUserProfileSql,
  getUserBankAccountsSql,
  getUserProfileByEmailSql,
  getUserProfileByUidSql,
  getUserProfilePublicByUidSql,
  searchUserProfileByNameSql,
  checkIfEmailExistSql,
} from "../utils/sqls/user_queries";
import {
  insertCitySql,
  insertCountrySql,
  insertProvinceSql,
  recordUserAddressSql,
  updateUserAddressSql,
} from "../utils/sqls/addresses_mutation";
import {
  countCityByNameSql,
  countCountryByNameSql,
  countProvinceByNameSql,
  getCityByNameSql,
  getCountryByNameSql,
  getProvinceByNameSql,
  getUserAddressByUidSql,
} from "../utils/sqls/addresses_queries";
import validator from "validator";
import { User } from "../models/user";
import { Address } from "../models/address";
import { BankAccount } from "../models/bank_account";

export class UserController {
  getAllUserProfiles = () => {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await db.manyOrNone(getAllUserProfileSql);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  getAccountInfo = (uid: string) => {
    return new Promise(async (resolve, reject) => {
      db.oneOrNone(getRegisteredUserByUidSql, [uid])
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    });
  };

  getUserProfileByUid = (uid: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await db.oneOrNone(getUserProfileByUidSql, [uid]);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  getUserProfilePublicByUid = (uid: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await db.oneOrNone(getUserProfilePublicByUidSql, [uid]);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  getUserProfileByEmail = (email: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await db.oneOrNone(getUserProfileByEmailSql, [email]);
        resolve(data);
      } catch (error) {
        reject(data);
      }
    });
  };

  searchUserProfileByName = (name: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await db.manyOrNone(searchUserProfileByNameSql, [name]);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  getUserBankAccountInfo = (uid: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await db.manyOrNone(getUserBankAccountsSql, [uid]);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  getUserAddressByUid = (uid: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await db.oneOrNone(getUserAddressByUidSql, [uid]);
        resolve(data);
      } catch (error) {
        reject(data);
      }
    });
  };

  createUser = (uid: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await db.oneOrNone(registerUserSql, [uid]);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  updateEmailVerified = (uid: string, status: boolean, t: any = db) => {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await t.oneOrNone(changeEmailVerifiedStateSql, [
          status,
          uid,
        ]);
        resolve(data);
      } catch (error) {
        reject(data);
      }
    });
  };

  updateProfileIsFilled = (uid: string, t: any = db) => {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await t.oneOrNone(changeProfileIsFilledStateSql, [
          true,
          uid,
        ]);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  checkIfEmailExist = (email: string, t: any = db) => {
    return new Promise(async (resolve, reject) => {
      try {
        var check = await t.oneOrNone(checkIfEmailExistSql, [email]);
        if (check === null) {
          resolve();
        } else {
          reject(4061);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  checkIfEmailValid = (email: string) => {
    return new Promise((resolve, reject) => {
      if (validator.isEmail(email)) {
        resolve(true);
      } else {
        reject(4041);
      }
    });
  };

  recordUserProfile = (user: User) => {
    return new Promise((resolve, reject) => {
      db.task(async (t: any) => {
        await this.checkIfEmailValid(user.getEmail());

        await this.checkIfEmailExist(user.getEmail(), t);

        await t.oneOrNone(recordUserProfileSql, [
          user.getUid(),
          user.getFirstName(),
          user.getLastName(),
          user.getEmail(),
          user.getGender(),
          user.getProfession(),
          user.getPhoneNumber(),
          user.getPhotoUrl(),
          user.getIdCardUrl(),
        ]);

        await this.recordUserAddress(user.getAddress(), t);

        await this.updateProfileIsFilled(user.getUid(), t);

        var data = await t.oneOrNone(getUserProfileByUidSql, [user.getUid()]);

        return data;
      })
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    });
  };

  updateUserProfile = (oldEmail: string, user: User) => {
    return new Promise((resolve, reject) => {
      db.task(async (t: any) => {
        if (!validator.equals("" + oldEmail, "" + user.getEmail())) {
          await this.updateEmailVerified(user.getUid(), false, t);
          await this.checkIfEmailValid(user.getEmail());
          await this.checkIfEmailExist(user.getEmail(), t);
        }

        await t.oneOrNone(updateUserProfileSql, [
          user.getFirstName(),
          user.getLastName(),
          user.getEmail(),
          user.getGender(),
          user.getProfession(),
          user.getPhoneNumber(),
          user.getPhotoUrl(),
          user.getIdCardUrl(),
          user.getUid(),
        ]);

        await this.updateUserAddressByUid(user.getAddress(), t);

        return await t.oneOrNone(getUserProfileByUidSql, [user.getUid()]);
      })
        .then(async (data: any) => {
          resolve(data);
        })
        .catch((error: any) => reject(error));
    });
  };

  recordUserAddress = (address: Address, t: any = db) => {
    return new Promise(async (resolve, reject) => {
      try {
        var countryData: any = await this.checkCountryName(
          address.getCountry(),
          t
        );
        var provinceData: any = await this.checkProvinceName(
          address.getProvince(),
          countryData.id,
          t
        );
        var cityData: any = await this.checkCityName(
          address.getCity(),
          provinceData.id,
          countryData.id,
          t
        );

        var userAddress = await t.oneOrNone(recordUserAddressSql, [
          address.getUid(),
          address.getAddressLine1(),
          address.getAddressLine2(),
          cityData.id,
          provinceData.id,
          countryData.id,
          address.getPostalCode(),
        ]);

        if (userAddress !== null) {
          var data = await t.oneOrNone(getUserAddressByUidSql, [
            address.getUid(),
          ]);
          resolve(data);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  updateUserAddressByUid = (address: Address, t: any = db) => {
    return new Promise(async (resolve, reject) => {
      try {
        var countryData: any = await this.checkCountryName(
          address.getCountry(),
          t
        );
        var provinceData: any = await this.checkProvinceName(
          address.getProvince(),
          countryData.id,
          t
        );
        var cityData: any = await this.checkCityName(
          address.getCity(),
          provinceData.id,
          countryData.id
        );

        var userAddress = await t.oneOrNone(updateUserAddressSql, [
          address.getAddressLine1(),
          address.getAddressLine2(),
          cityData.id,
          provinceData.id,
          countryData.id,
          address.getPostalCode(),
          address.getUid(),
        ]);

        if (userAddress !== null) {
          var data = await t.oneOrNone(getUserAddressByUidSql, [
            address.getUid(),
          ]);
          resolve(data);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  private checkCountryName = (countryName: string, t: any = db) => {
    return new Promise(async (resolve, reject) => {
      try {
        var countryData = await t.oneOrNone(getCountryByNameSql, [countryName]);

        if (countryData === null) {
          var data = await t.oneOrNone(insertCountrySql, [countryName]);
          resolve(data);
        } else {
          resolve(countryData);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  private checkProvinceName = (
    provinceName: string,
    countryId: number,
    t: any = db
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        var provinceData = await t.oneOrNone(getProvinceByNameSql, [
          provinceName,
          countryId,
        ]);

        if (provinceData === null) {
          var data = await t.oneOrNone(insertProvinceSql, [
            provinceName,
            countryId,
          ]);
          resolve(data);
        } else {
          resolve(provinceData);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  private checkCityName = (
    cityName: string,
    provinceId: number,
    countryId: number,
    t: any = db
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        var cityData = await t.oneOrNone(getCityByNameSql, [
          cityName,
          provinceId,
          countryId,
        ]);

        if (cityData === null) {
          var data = await t.oneOrNone(insertCitySql, [
            cityName,
            provinceId,
            countryId,
          ]);

          resolve(data);
        } else {
          resolve(cityData);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  registerBankAccount = (userBankAccount: BankAccount) => {
    return new Promise((resolve, reject) => {
      db.task(async (t: any) => {
        var data = await t.oneOrNone(registerBankAccountSql, [
          userBankAccount.getUid(),
          userBankAccount.getBankName(),
          userBankAccount.getAccountNumber(),
          userBankAccount.getDescription(),
        ]);

        return data;
      })
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    });
  };

  updateBankAccountByUid = (userBankAccount: BankAccount) => {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await db.oneOrNone(updateBankAccountInfoSql, [
          userBankAccount.getBankName(),
          userBankAccount.getAccountNumber(),
          userBankAccount.getDescription(),
          userBankAccount.getId(),
          userBankAccount.getUid(),
        ]);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };
}
