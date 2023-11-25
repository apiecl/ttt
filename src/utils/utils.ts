import { colorsChannels, position } from "../types/types";

export const calcRadius = (dataVal:number, calVal:number, windowHeight:number):number => {
  const maxRadius = windowHeight / 2;
  const unit = maxRadius / calVal;
  return maxRadius - dataVal * unit;
}

export const calcPos = (radius:number, angle:number):position => {
  return {
    x: radius * Math.sin(angle),
    y: radius * Math.cos(angle)
  }
}

export const channelToColor = (channel : number, sensorNumber: 1 | 2):number => {
  if(sensorNumber === 1) {
    return colorsChannels.sensor1[channel];
  } else {
    return colorsChannels.sensor2[channel];
  }
}