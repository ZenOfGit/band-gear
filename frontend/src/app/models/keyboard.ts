import { IKeyboardBase } from './ikeyboard-base';

export class Keyboard implements IKeyboardBase {
  id: number;
  digiOrAnalog: number;
  brand: string;
  name: string;
  model: string;
  numKeys: string;
  description: string;
  year: string;
  countryOfOrigin: string;
  value: number;
  outputs: string;
  inputs: string;
  hasSpeakers: boolean;
  batteries: string;
  image?: string;
}
