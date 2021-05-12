import { IBasicEntity } from './basic-entity';

export interface IPedalBase extends IBasicEntity {
  id: number;
  digiOrAnalog: number;
  isTrueBypass: string;
  brand: string;
  name: string;
  description: string;
  year: string;
  countryOfOrigin: string;
  value: number;
  forBassOrGuitar: string;
  image?: string;
}
