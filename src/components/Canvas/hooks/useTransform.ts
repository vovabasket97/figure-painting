import { useRef, useMemo } from 'react';
import { useShallowEffect } from '@mantine/hooks';
import { Transformer } from 'konva/lib/shapes/Transformer';

export const useTransformers = ({ isSelected, ref }: { isSelected: number | null; ref: any }) => {
  const trRef = useRef<Transformer>(null);

  useShallowEffect(() => {
    if (trRef.current) {
      if (isSelected) {
        trRef.current.nodes([ref.current]);
        trRef.current.getLayer()?.batchDraw();
      } else {
        trRef.current.detach();
        trRef.current.getLayer()?.batchDraw();
      }
    }
  }, [isSelected, ref]);

  return useMemo(() => ({ trRef }), [trRef]);
};
