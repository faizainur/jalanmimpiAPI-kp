import { TransactionStatus } from "../enums/transaction_status";

export class Transaction {
  private id: string;
  private uid: string;
  private donationId: string;
  private nominal: number;
  private description: string;
  private status: TransactionStatus | undefined;

  constructor(
    id: string,
    uid: string,
    donationId: string,
    nominal: number,
    description: string,
    status?: TransactionStatus | undefined
  ) {
    this.id = id;
    this.uid = uid;
    this.donationId = donationId;
    this.nominal = nominal;
    this.description = description;
  }

  public getId = (): string => this.id;
  public getUid = (): string => this.uid;
  public getDonationId = (): string => this.donationId;
  public getNominal = (): number => this.nominal;
  public getDescription = (): string => this.description;
  public getStatus = (): TransactionStatus | undefined => this.status;
}
