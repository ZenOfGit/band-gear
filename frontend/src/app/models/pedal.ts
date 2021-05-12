import { IPedalBase } from './ipedal-base';

export class Pedal implements IPedalBase {
  id: number;
  digiOrAnalog: number;
  isTrueBypass: string;
  brand: string;
  name: string;
  model: string;
  numKnobs: number;
  formFactor: string;
  description: string;
  year: string;
  countryOfOrigin: string;
  value: number;
  isModded: string;
  forBassOrGuitar: string;
  isStereo: boolean;
  case: string;
  image: string;
}
