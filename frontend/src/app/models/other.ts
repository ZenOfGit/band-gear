import { IOtherBase } from './iother-base';

export class Other implements IOtherBase {
  id: number;
  isElectric: number;
  brand: string;
  name: string;
  model: string;
  description: string;
  year: string;
  countryOfOrigin: string;
  value: number;
  isAntique: boolean;
  case: string;
  image?: string;
}
