import { IEquipmentBase } from './iequipment-base';

export class Equipment implements IEquipmentBase {
  id: number;
  powered: number;
  category: string;
  brand: string;
  name: string;
  model: string;
  description: string;
  year: string;
  countryOfOrigin: string;
  value: number;
  case: string;
  image?: string;
}
