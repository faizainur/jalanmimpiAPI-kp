export class BankAccount {
  private id: number | undefined;
  private uid: string;
  private bankName: string;
  private accountNumber: number;
  private description: string;

  constructor(
    uid: string,
    bankName: string,
    accountNumber: number,
    description: string,
    id?: number
  ) {
    this.uid = uid;
    this.bankName = bankName;
    this.accountNumber = accountNumber;
    this.description = description;
    this.id = id;
  }

  public getId = (): number | undefined => this.id;
  public getUid = (): string => this.uid;
  public getBankName = (): string => this.bankName;
  public getAccountNumber = (): number => this.accountNumber;
  public getDescription = (): string => this.description;
}
