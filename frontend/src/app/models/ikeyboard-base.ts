import { IBasicEntity } from './basic-entity';

export interface IKeyboardBase extends IBasicEntity {
  id: number;
  isElectric: number;
  brand: string;
  name: string;
  model: string;
  year: string;
  countryOfOrigin: string;
  value: number;
  image?: string;
}
