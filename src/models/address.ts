export class Address {
  private uid: string;
  private addressLine1: string;
  private addressLine2: string;
  private city: string;
  private province: string;
  private country: string;
  private postalCode: string;

  constructor(
    uid: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    province: string,
    country: string,
    postalCode: string
  ) {
    this.uid = uid;
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.city = city;
    this.province = province;
    this.country = country;
    this.postalCode = postalCode;
  }

  public getUid = (): string => this.uid;
  public getAddressLine1 = (): string => this.addressLine1;
  public getAddressLine2 = (): string => this.addressLine2;
  public getCity = (): string => this.city;
  public getProvince = (): string => this.province;
  public getCountry = (): string => this.country;
  public getPostalCode = (): string => this.postalCode;
}
