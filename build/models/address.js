"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
class Address {
    constructor(uid, addressLine1, addressLine2, city, province, country, postalCode) {
        this.getUid = () => this.uid;
        this.getAddressLine1 = () => this.addressLine1;
        this.getAddressLine2 = () => this.addressLine2;
        this.getCity = () => this.city;
        this.getProvince = () => this.province;
        this.getCountry = () => this.country;
        this.getPostalCode = () => this.postalCode;
        this.uid = uid;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.province = province;
        this.country = country;
        this.postalCode = postalCode;
    }
}
exports.Address = Address;
