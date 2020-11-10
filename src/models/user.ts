import admin from "firebase-admin";
import { Gender } from "../enums/gender";
import { Address } from "./address";

export class User {
  private uid: string;
  private firstName: string;
  private lastName: string;
  private email: string;
  private gender: Gender;
  private profession: string;
  private phoneNumber: string;
  private photoUrl: string;
  private idCardUrl: string;
  private address: Address;

  constructor(
    uid: string,
    firstName: string,
    lastName: string,
    email: string,
    gender: Gender,
    profession: string,
    phoneNumber: string,
    photoUrl: string,
    idCardUrl: string,
    address: Address
  ) {
    this.uid = uid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.gender = gender;
    this.profession = phoneNumber;
    this.phoneNumber = phoneNumber;
    this.photoUrl = photoUrl;
    this.idCardUrl = idCardUrl;
    this.address = address;
  }

  public getUid = (): string => this.uid;
  public getFirstName = (): string => this.firstName;
  public getLastName = (): string => this.lastName;
  public getEmail = (): string => this.email;
  public getGender = (): Gender => this.gender;
  public getProfession = (): string => this.profession;
  public getPhoneNumber = (): string => this.phoneNumber;
  public getPhotoUrl = (): string => this.photoUrl;
  public getIdCardUrl = (): string => this.idCardUrl;
  public getAddress = (): Address => this.address;
}
