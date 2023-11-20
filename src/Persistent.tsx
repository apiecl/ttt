import { Graphics } from "@pixi/react";
import { position } from "./types/types";
import { ComponentProps, useCallback, useEffect, useState } from "react";

interface persistentProps {
    timeAlive: number;
    position: position;
}
type Draw = ComponentProps<typeof Graphics>['draw'];

export function Persistent(props:persistentProps) {
    console.log(props);
    const [size, setSize] = useState<number>(0);
    const [time, setTime] = useState<number>(props.timeAlive);

    useEffect(() => {
        setInterval(() => {
            while(time > 0) {
                setTime(time-1);
            }
        }, 16.6);
        
    }, [time]);

    useEffect(() => {
        setSize(time / 5);
    }, [time]);

    const drawCircle = useCallback<Draw>((g) => {
        g.drawCircle(size, props.position.x, props.position.y);
    }, [size, props]);

    return(
        <Graphics draw={drawCircle}></Graphics>
    );
}