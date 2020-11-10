"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundDetails = void 0;
class FundDetails {
    constructor(donationId, itemDetail, nominalDetail, description, id) {
        this.getId = () => this.id;
        this.getDonationId = () => this.donationId;
        this.getItemDetail = () => this.itemDetail;
        this.getNominalDetail = () => this.nominalDetail;
        this.getDescription = () => this.description;
        this.donationId = donationId;
        this.itemDetail = itemDetail;
        this.nominalDetail = nominalDetail;
        this.description = description;
        this.id = id;
    }
}
exports.FundDetails = FundDetails;
