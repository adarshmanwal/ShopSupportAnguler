export class Shop {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public address: string,
    public city: string,
    public state: string,
    public country: string,
    public phone: string,
    public email: string,
    public openingHours: string,
    public closingHours: string,
    public category: string,
    public rating: number,
    public images: string,
    public owner: number
  ) {}
}