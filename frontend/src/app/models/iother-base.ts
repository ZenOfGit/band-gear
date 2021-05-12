import { IBasicEntity } from './basic-entity';

export interface IOtherBase extends IBasicEntity {
  id: number;
  isElectric: number;
  brand: string;
  name: string;
  model: string;
  description: string;
  year: string;
  countryOfOrigin: string;
  value: number;
  image?: string;
}
