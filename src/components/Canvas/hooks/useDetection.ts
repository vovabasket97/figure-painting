import { KonvaEventObject } from 'konva/lib/Node';
import { useCallback } from 'react';

export const useDetection = () => {
  const checkDeselect = useCallback((e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>, callback: (arg: null) => void) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) callback(null);
  }, []);

  return {
    checkDeselect
  };
};
