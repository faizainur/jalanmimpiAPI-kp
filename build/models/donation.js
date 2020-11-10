"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationItem = void 0;
class DonationItem {
    constructor(uid, title, description, totalNominal, imageUrl, expiredDate, id) {
        this.getId = () => this.id;
        this.getUid = () => this.uid;
        this.getTitle = () => this.title;
        this.getDescription = () => this.description;
        this.getTotalNominal = () => this.totalNominal;
        this.getImageUrl = () => this.imageUrl;
        this.getExpiredDate = () => this.expiredDate;
        this.id = id;
        this.uid = uid;
        this.title = title;
        this.description = description;
        this.totalNominal = totalNominal;
        this.imageUrl = imageUrl;
        this.expiredDate = expiredDate;
    }
}
exports.DonationItem = DonationItem;
