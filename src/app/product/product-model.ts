export class Product {
    constructor(
      public id: number,
      public name: string,
      public description: string,
      public rating: number,
      public images: string | null
    ) {}
  }
  