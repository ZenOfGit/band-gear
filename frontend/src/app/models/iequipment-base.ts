import { IBasicEntity } from './basic-entity';

export interface IEquipmentBase extends IBasicEntity {
  brand: string;
  category: string;
  year: string;
  model: string;
  countryOfOrigin: string;
  value: number;
  image?: string;
}
