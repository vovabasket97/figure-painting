import { IBox } from 'shared/konva/konva.types';

export const transformersConfig = () => ({
  rotateEnabled: false,
  flipEnabled: false,
  enabledAnchors: [],
  boundBoxFunc: (oldBox: IBox, newBox: IBox) => {
    if (newBox.width < 5 || newBox.height < 5) return oldBox;
    return newBox;
  }
});
