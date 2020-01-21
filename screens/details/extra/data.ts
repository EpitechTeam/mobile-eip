import { ImageSourcePropType } from 'react-native';

export class Product {

  constructor(readonly title: string,
              readonly description: string,
              readonly price: ProductPrice,
              readonly primaryImage: ImageSourcePropType,
              readonly images: ImageSourcePropType[],
              readonly details: string[],
              readonly options: ProductOption[]) {
  }

  static centralParkApartment(): Product {
    return new Product(
      'Private Rooms with Central Park View',
      'The apartment consists of 2 separate bedrooms, 1 bathroom with a hair dryer. A flat-screen TV and Blu-ray player are available.\n' +
      '\n' +
      'Rodin Museum is 4.2 km from the apartment, while Orsay Museum is 5 km away. The nearest airport is Paris - Orly Airport, 13 km from the property.',
      ProductPrice.tenDollarsPerNight(),
      require('../assets/image-product.jpg'),
      [
        require('../assets/image-product.jpg'),
        require('../assets/image-product.jpg'),
        require('../assets/image-product.jpg'),
      ],
      [
        '2 Personne',
        '1 Lit Double',
        '1 Salle De Bain',
        '1 Cuisine'
      ],
      [
        ProductOption.wifiOption(),
        ProductOption.tvOption(),
        ProductOption.parkingOption(),
      ],
    );
  }
}

export class ProductPrice {

  constructor(readonly value: number,
              readonly currency: string,
              readonly scale: string) {
  }

  get formattedValue(): string {
    return `${this.value}€`;
  }

  get formattedScale(): string {
    return `/3 jours`;
  }

  static tenDollarsPerNight(): ProductPrice {
    return new ProductPrice(10, '$', 'night');
  }
}

export class ProductOption {

  constructor(readonly icon: string,
              readonly title: string) {
  }

  static wifiOption(): ProductOption {
    return new ProductOption('wifi', 'Wi-Fi');
  }

  static tvOption(): ProductOption {
    return new ProductOption('tv', 'TV');
  }

  static parkingOption(): ProductOption {
    return new ProductOption('car', 'Free Parking');
  }
}

