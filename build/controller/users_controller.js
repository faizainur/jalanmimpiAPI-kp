"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const db_utils_1 = require("../utils/db_utils");
require("dotenv/config");
const user_mutation_1 = require("../utils/sqls/user_mutation");
const user_queries_1 = require("../utils/sqls/user_queries");
const addresses_mutation_1 = require("../utils/sqls/addresses_mutation");
const addresses_queries_1 = require("../utils/sqls/addresses_queries");
const validator_1 = __importDefault(require("validator"));
class UserController {
    constructor() {
        this.getAllUserProfiles = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var data = yield db_utils_1.db.manyOrNone(user_queries_1.getAllUserProfileSql);
                    resolve(data);
                }
                catch (error) {
                    reject(error);
                }
            }));
        };
        this.getAccountInfo = (uid) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                db_utils_1.db.oneOrNone(user_queries_1.getRegisteredUserByUidSql, [uid])
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            }));
        };
        this.getUserProfileByUid = (uid) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var data = yield db_utils_1.db.oneOrNone(user_queries_1.getUserProfileByUidSql, [uid]);
                    resolve(data);
                }
                catch (error) {
                    reject(error);
                }
            }));
        };
        this.getUserProfilePublicByUid = (uid) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var data = yield db_utils_1.db.oneOrNone(user_queries_1.getUserProfilePublicByUidSql, [uid]);
                    resolve(data);
                }
                catch (error) {
                    reject(error);
                }
            }));
        };
        this.getUserProfileByEmail = (email) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var data = yield db_utils_1.db.oneOrNone(user_queries_1.getUserProfileByEmailSql, [email]);
                    resolve(data);
                }
                catch (error) {
                    reject(data);
                }
            }));
        };
        this.searchUserProfileByName = (name) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var data = yield db_utils_1.db.manyOrNone(user_queries_1.searchUserProfileByNameSql, [name]);
                    resolve(data);
                }
                catch (error) {
                    reject(error);
                }
            }));
        };
        this.getUserBankAccountInfo = (uid) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var data = yield db_utils_1.db.manyOrNone(user_queries_1.getUserBankAccountsSql, [uid]);
                    resolve(data);
                }
                catch (error) {
                    reject(error);
                }
            }));
        };
        this.getUserAddressByUid = (uid) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var data = yield db_utils_1.db.oneOrNone(addresses_queries_1.getUserAddressByUidSql, [uid]);
                    resolve(data);
                }
                catch (error) {
                    reject(data);
                }
            }));
        };
        this.createUser = (uid) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var data = yield db_utils_1.db.oneOrNone(user_mutation_1.registerUserSql, [uid]);
                    resolve(data);
                }
                catch (error) {
                    reject(error);
                }
            }));
        };
        this.updateEmailVerified = (uid, status, t = db_utils_1.db) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var data = yield t.oneOrNone(user_mutation_1.changeEmailVerifiedStateSql, [
                        status,
                        uid,
                    ]);
                    resolve(data);
                }
                catch (error) {
                    reject(data);
                }
            }));
        };
        this.updateProfileIsFilled = (uid, t = db_utils_1.db) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var data = yield t.oneOrNone(user_mutation_1.changeProfileIsFilledStateSql, [
                        true,
                        uid,
                    ]);
                    resolve(data);
                }
                catch (error) {
                    reject(error);
                }
            }));
        };
        this.checkIfEmailExist = (email, t = db_utils_1.db) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var check = yield t.oneOrNone(user_queries_1.checkIfEmailExistSql, [email]);
                    if (check === null) {
                        resolve();
                    }
                    else {
                        reject(4061);
                    }
                }
                catch (error) {
                    reject(error);
                }
            }));
        };
        this.checkIfEmailValid = (email) => {
            return new Promise((resolve, reject) => {
                if (validator_1.default.isEmail(email)) {
                    resolve(true);
                }
                else {
                    reject(4041);
                }
            });
        };
        this.recordUserProfile = (user) => {
            return new Promise((resolve, reject) => {
                db_utils_1.db.task((t) => __awaiter(this, void 0, void 0, function* () {
                    yield this.checkIfEmailValid(user.getEmail());
                    yield this.checkIfEmailExist(user.getEmail(), t);
                    yield t.oneOrNone(user_mutation_1.recordUserProfileSql, [
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
                    yield this.recordUserAddress(user.getAddress(), t);
                    yield this.updateProfileIsFilled(user.getUid(), t);
                    var data = yield t.oneOrNone(user_queries_1.getUserProfileByUidSql, [user.getUid()]);
                    return data;
                }))
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            });
        };
        this.updateUserProfile = (oldEmail, user) => {
            return new Promise((resolve, reject) => {
                db_utils_1.db.task((t) => __awaiter(this, void 0, void 0, function* () {
                    if (!validator_1.default.equals("" + oldEmail, "" + user.getEmail())) {
                        yield this.updateEmailVerified(user.getUid(), false, t);
                        yield this.checkIfEmailValid(user.getEmail());
                        yield this.checkIfEmailExist(user.getEmail(), t);
                    }
                    yield t.oneOrNone(user_mutation_1.updateUserProfileSql, [
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
                    yield this.updateUserAddressByUid(user.getAddress(), t);
                    return yield t.oneOrNone(user_queries_1.getUserProfileByUidSql, [user.getUid()]);
                }))
                    .then((data) => __awaiter(this, void 0, void 0, function* () {
                    resolve(data);
                }))
                    .catch((error) => reject(error));
            });
        };
        this.recordUserAddress = (address, t = db_utils_1.db) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var countryData = yield this.checkCountryName(address.getCountry(), t);
                    var provinceData = yield this.checkProvinceName(address.getProvince(), countryData.id, t);
                    var cityData = yield this.checkCityName(address.getCity(), provinceData.id, countryData.id, t);
                    var userAddress = yield t.oneOrNone(addresses_mutation_1.recordUserAddressSql, [
                        address.getUid(),
                        address.getAddressLine1(),
                        address.getAddressLine2(),
                        cityData.id,
                        provinceData.id,
                        countryData.id,
                        address.getPostalCode(),
                    ]);
                    if (userAddress !== null) {
                        var data = yield t.oneOrNone(addresses_queries_1.getUserAddressByUidSql, [
                            address.getUid(),
                        ]);
                        resolve(data);
                    }
                }
                catch (error) {
                    reject(error);
                }
            }));
        };
        this.updateUserAddressByUid = (address, t = db_utils_1.db) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var countryData = yield this.checkCountryName(address.getCountry(), t);
                    var provinceData = yield this.checkProvinceName(address.getProvince(), countryData.id, t);
                    var cityData = yield this.checkCityName(address.getCity(), provinceData.id, countryData.id);
                    var userAddress = yield t.oneOrNone(addresses_mutation_1.updateUserAddressSql, [
                        address.getAddressLine1(),
                        address.getAddressLine2(),
                        cityData.id,
                        provinceData.id,
                        countryData.id,
                        address.getPostalCode(),
                        address.getUid(),
                    ]);
                    if (userAddress !== null) {
                        var data = yield t.oneOrNone(addresses_queries_1.getUserAddressByUidSql, [
                            address.getUid(),
                        ]);
                        resolve(data);
                    }
                }
                catch (error) {
                    reject(error);
                }
            }));
        };
        this.checkCountryName = (countryName, t = db_utils_1.db) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var countryData = yield t.oneOrNone(addresses_queries_1.getCountryByNameSql, [countryName]);
                    if (countryData === null) {
                        var data = yield t.oneOrNone(addresses_mutation_1.insertCountrySql, [countryName]);
                        resolve(data);
                    }
                    else {
                        resolve(countryData);
                    }
                }
                catch (error) {
                    reject(error);
                }
            }));
        };
        this.checkProvinceName = (provinceName, countryId, t = db_utils_1.db) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var provinceData = yield t.oneOrNone(addresses_queries_1.getProvinceByNameSql, [
                        provinceName,
                        countryId,
                    ]);
                    if (provinceData === null) {
                        var data = yield t.oneOrNone(addresses_mutation_1.insertProvinceSql, [
                            provinceName,
                            countryId,
                        ]);
                        resolve(data);
                    }
                    else {
                        resolve(provinceData);
                    }
                }
                catch (error) {
                    reject(error);
                }
            }));
        };
        this.checkCityName = (cityName, provinceId, countryId, t = db_utils_1.db) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var cityData = yield t.oneOrNone(addresses_queries_1.getCityByNameSql, [
                        cityName,
                        provinceId,
                        countryId,
                    ]);
                    if (cityData === null) {
                        var data = yield t.oneOrNone(addresses_mutation_1.insertCitySql, [
                            cityName,
                            provinceId,
                            countryId,
                        ]);
                        resolve(data);
                    }
                    else {
                        resolve(cityData);
                    }
                }
                catch (error) {
                    reject(error);
                }
            }));
        };
        this.registerBankAccount = (userBankAccount) => {
            return new Promise((resolve, reject) => {
                db_utils_1.db.task((t) => __awaiter(this, void 0, void 0, function* () {
                    var data = yield t.oneOrNone(user_mutation_1.registerBankAccountSql, [
                        userBankAccount.getUid(),
                        userBankAccount.getBankName(),
                        userBankAccount.getAccountNumber(),
                        userBankAccount.getDescription(),
                    ]);
                    return data;
                }))
                    .then((data) => resolve(data))
                    .catch((error) => reject(error));
            });
        };
        this.updateBankAccountByUid = (userBankAccount) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var data = yield db_utils_1.db.oneOrNone(user_mutation_1.updateBankAccountInfoSql, [
                        userBankAccount.getBankName(),
                        userBankAccount.getAccountNumber(),
                        userBankAccount.getDescription(),
                        userBankAccount.getId(),
                        userBankAccount.getUid(),
                    ]);
                    resolve(data);
                }
                catch (error) {
                    reject(error);
                }
            }));
        };
    }
}
exports.UserController = UserController;
