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

export enum colors {
  blue = 0x220b3c,
  lightblue = 0xffd900,
  yellow = 0x5f4bb6,
  red = 0xcb2f5c,
  green = 0x3cb878,
  black = 0x121c17
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