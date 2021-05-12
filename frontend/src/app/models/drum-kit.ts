import { IDrumKitBase } from './idrum-kit-base';

export class DrumKit implements IDrumKitBase {
  id: number;
  kitOrSingle: number;
  brand: string;
  name: string;
  model: string;
  numPieces: number;
  isElectric: boolean;
  description: string;
  year: string;
  countryOfOrigin: string;
  value: number;
  numDrums: number;
  numCymbals: number;
  skinsAreAftermarket: boolean;
  brandOfSkins: string;
  nameOfSkins: string;
  cymbalsAreAftermarket: boolean;
  brandOfCymbals: string;
  nameOfCymbals: string;
  hasThrone: boolean;
  brandOfThrone: string;
  nameOfThrone: string;
  hasBassPillow: boolean;
  brandOfBassPillow: string;
  nameOfBassPillow: string;
  image: string;
}
