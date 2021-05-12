import { IBasicEntity } from './basic-entity';

export interface IGuitarBase extends IBasicEntity {
  isElectric: number;
  typeGOrB: string;
  brand: string;
  name: string;
  year: string;
  countryOfOrigin: string;
  value: number;
  image?: string;
}
