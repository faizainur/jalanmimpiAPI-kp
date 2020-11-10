"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
class Transaction {
    constructor(id, uid, donationId, nominal, description, status) {
        this.getId = () => this.id;
        this.getUid = () => this.uid;
        this.getDonationId = () => this.donationId;
        this.getNominal = () => this.nominal;
        this.getDescription = () => this.description;
        this.getStatus = () => this.status;
        this.id = id;
        this.uid = uid;
        this.donationId = donationId;
        this.nominal = nominal;
        this.description = description;
    }
}
exports.Transaction = Transaction;
