import { MouseEvent } from 'react';

export interface KonvaTextEventTarget extends EventTarget {
  index: number;
}

export interface KonvaMouseEvent extends MouseEvent<HTMLElement> {
  target: KonvaTextEventTarget;
}

export interface IBox {
  rotation: number;
  x: number;
  y: number;
  width: number;
  height: number;
}
