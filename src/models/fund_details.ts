export class FundDetails {
  private id: number | undefined;
  private donationId: string;
  private itemDetail: string;
  private nominalDetail: number;
  private description: string;

  constructor(
    donationId: string,
    itemDetail: string,
    nominalDetail: number,
    description: string,
    id?: number
  ) {
    this.donationId = donationId;
    this.itemDetail = itemDetail;
    this.nominalDetail = nominalDetail;
    this.description = description;
    this.id = id;
  }

  public getId = (): number | undefined => this.id;
  public getDonationId = (): string => this.donationId;
  public getItemDetail = (): string => this.itemDetail;
  public getNominalDetail = (): number => this.nominalDetail;
  public getDescription = (): string => this.description;
}
