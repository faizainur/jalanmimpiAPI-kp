export class DonationItem {
  private id: string | undefined;
  private uid: string;
  private title: string;
  private description: string;
  private totalNominal: number;
  private imageUrl: string;
  private expiredDate: string;

  constructor(
    uid: string,
    title: string,
    description: string,
    totalNominal: number,
    imageUrl: string,
    expiredDate: string,
    id?: string
  ) {
    this.id = id;
    this.uid = uid;
    this.title = title;
    this.description = description;
    this.totalNominal = totalNominal;
    this.imageUrl = imageUrl;
    this.expiredDate = expiredDate;
  }

  public getId = (): string | undefined => this.id;
  public getUid = (): string => this.uid;
  public getTitle = (): string => this.title;
  public getDescription = (): string => this.description;
  public getTotalNominal = (): number => this.totalNominal;
  public getImageUrl = (): string => this.imageUrl;
  public getExpiredDate = (): string => this.expiredDate;
}
