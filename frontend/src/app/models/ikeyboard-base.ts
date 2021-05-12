import { IBasicEntity } from './basic-entity';

export interface IKeyboardBase extends IBasicEntity {
  id: number;
  digiOrAnalog: number;
  brand: string;
  name: string;
  model: string;
  year: string;
  countryOfOrigin: string;
  value: number;
  image?: string;
}
