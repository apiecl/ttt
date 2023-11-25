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
  background = 0x434343,
  blue = 0x220b3c,
  lightblue = 0xffd900,
  yellow = 0x5f4bb6,
  red = 0xcb2f5c,
  green = 0x3cb878,
  black = 0x121c17,
  white = 0xffffff
}

type colorsSensors = {
  sensor1: Array<number>;
  sensor2: Array<number>;
}

export const colorsChannels:colorsSensors = {
  sensor1: [0xFDF851, 0xFEF2CC, 0xF1C245, 0xffe599, 0xffd966,0xf1c232,0x783f04,0xb45f06,0xe69138,0xf6b26b,0x942323],
  sensor2: [0xe69138, 0x274e13,0x38761d,0x6aa84f,0x93c47d,0xb6d7a8,0x12ea6c,0x1c4587,0x3c78d8,0x6fa8dc,0xffffff,0xa4c2f4,0x155394]
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