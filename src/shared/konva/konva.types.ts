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

export interface IShapeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  color?: string;
}

export interface IShapeComponent {
  shapeProps: IShapeProps;
}

export interface IShapeClientBox extends Omit<IShapeProps, 'rotation' | 'color'> {
  centralX: number;
  centralY: number;
}
