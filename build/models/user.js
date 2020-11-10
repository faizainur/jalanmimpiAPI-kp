"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(uid, firstName, lastName, email, gender, profession, phoneNumber, photoUrl, idCardUrl, address) {
        this.getUid = () => this.uid;
        this.getFirstName = () => this.firstName;
        this.getLastName = () => this.lastName;
        this.getEmail = () => this.email;
        this.getGender = () => this.gender;
        this.getProfession = () => this.profession;
        this.getPhoneNumber = () => this.phoneNumber;
        this.getPhotoUrl = () => this.photoUrl;
        this.getIdCardUrl = () => this.idCardUrl;
        this.getAddress = () => this.address;
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
}
exports.User = User;
