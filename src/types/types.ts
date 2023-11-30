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
  s: sensorNumber;
  c: boolean;
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
  [key: string]: number | boolean;
}

export interface variantNumber {
  [key: string]: number;
}

export enum sensorNumber {
  One = 1,
  Two = 2,
}

export enum colors {
  background = 0x000000,
  blue = 0x220b3c,
  lightblue = 0xffd900,
  yellow = 0x5f4bb6,
  red = 0xcb2f5c,
  green = 0x3cb878,
  black = 0x121c17,
  white = 0xffffff,
}

type colorsSensors = {
  sensor1: Array<number>;
  sensor2: Array<number>;
};

export const colorsChannels: colorsSensors = {
  sensor1: [
    0xfdf851, 0xfef2cc, 0xf1c245, 0xffe599, 0xffd966, 0xf1c232, 0x783f04,
    0xb45f06, 0xe69138, 0xf6b26b, 0x942323, 0xe69138,
  ],
  sensor2: [
    16777215,
    10797812,
    7317724,
    3963096,
    1397652,
    1852807,
    1239660,
    11982760,
    9684093,
    6989903,
    3700253,
    2575891
],
};

export type configuration = {
  //number of channels per sensor
  noChannels: number;
  //number of records stored
  noStore: number;
};

export type size = {
  w: number;
  h: number;
};

export type position = {
  x: number;
  y: number;
};
