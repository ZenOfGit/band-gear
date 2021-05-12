import { IBasicEntity } from './basic-entity';

export interface IDrumKitBase extends IBasicEntity {
  brand: string;
  year: string;
  countryOfOrigin: string;
  value: number;
  image?: string;
}
