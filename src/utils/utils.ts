import { colorsChannels, position } from "../types/types";

export const calcRadius = (dataVal:number, calVal:number, windowHeight:number):number => {
  const maxRadius = windowHeight / 2;
  const unit = maxRadius / calVal;
  let radius = maxRadius - dataVal * unit;
  if(radius < 0) {
    radius = radius * -1;
  }
  console.log(radius, unit);

  return radius;
}

export const degToRad = (degrees:number) => {
  const pi = Math.PI;
  return degrees * (pi/180);
}

export const calcPos = (center: position, radius:number, angle:number):position => {
  return {
    x:  center.x - ( radius * Math.sin(degToRad(angle))),
    y:  center.y - (radius * Math.cos(degToRad(angle)))
  }
}

export const channelToColor = (channel : number, sensorNumber: 1 | 2):number => {
  if(sensorNumber === 1) {
    return colorsChannels.sensor1[channel];
  } else {
    return colorsChannels.sensor2[channel];
  }
}