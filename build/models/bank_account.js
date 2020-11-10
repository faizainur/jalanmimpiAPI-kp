"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = void 0;
class BankAccount {
    constructor(uid, bankName, accountNumber, description, id) {
        this.getId = () => this.id;
        this.getUid = () => this.uid;
        this.getBankName = () => this.bankName;
        this.getAccountNumber = () => this.accountNumber;
        this.getDescription = () => this.description;
        this.uid = uid;
        this.bankName = bankName;
        this.accountNumber = accountNumber;
        this.description = description;
        this.id = id;
    }
}
exports.BankAccount = BankAccount;
