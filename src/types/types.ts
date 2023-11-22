export interface sensorOutput {
  "0": number;
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
  "6": number;
  "7": number;
  "8": number;
  "9": number;
  "10": number;
  "11": number;
  "s": sensorNumber;
  "c": boolean;
}

export interface sensorData {
  "0": number;
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
  "6": number;
  "7": number;
  "8": number;
  "9": number;
  "10": number;
  "11": number;
}

export interface variant {
  [key: string]: number | boolean
}

export interface variantNumber {
  [key: string]: number
}

export enum sensorNumber {
  One = 1,
  Two = 2,
}

export type configuration = {
  noChannels: number;
};

export type size = {
  w: number,
  h: number
}

export type position = {
  x: number,
  y: number
}