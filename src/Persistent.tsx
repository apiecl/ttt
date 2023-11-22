import { Graphics } from "@pixi/react";
import { position } from "./types/types";
import { useCallback } from "react";

interface persistentProps {
    position: position;
    size: number
}
type graphics = {
    clear: () => void;
    beginFill: (color: number) => void;
    drawCircle: (x: number, y: number, size: number) => void;
    endFill: () => void;
  };

export function Persistent(props:persistentProps) {
    
    
   

    const drawCircle = useCallback((g:graphics) => {
        g;
        g.clear();
        g.beginFill(0xcb2f5c);
        g.drawCircle(props.position.x, props.position.y, props.size);
        g.endFill();
    },[props]);

    return(
        <Graphics draw={drawCircle} />
    );
}

