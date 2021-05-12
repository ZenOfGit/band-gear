import { IGuitarBase } from './iguitar-base';

export class Guitar implements IGuitarBase {
  id: number;
  isElectric: number;
  typeGOrB: string;
  brand: string;
  name: string;
  model: string;
  numStrings: number;
  formFactor: string;
  description: string;
  puConfiguration: string;
  year: string;
  countryOfOrigin: string;
  value: number;
  pUsAreAftermarket: boolean;
  brandOfPickups: string;
  nameOfPickups: string;
  tunersAreAftermarket: boolean;
  brandOfTuners: string;
  nameOfTuners: string;
  electronicsAreAftermarket: boolean;
  brandOfPots: string;
  nameOfPots: string;
  nameOfCapacitor: string;
  additionalCustomElectronics: string;
  bridgeIsAftermarket: boolean;
  brandOfBridge: string;
  nameOfBridge: string;
  hasSpecificStrings: boolean;
  brandOfStrings: string;
  nameOfStrings: string;
  guageOfStrings: string;
  case: string;
  strap: string;
  image?: string;
}
