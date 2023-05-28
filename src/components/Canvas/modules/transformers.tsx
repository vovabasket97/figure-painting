import { useMemo, memo, RefObject } from 'react';
import { useTransformers } from '../hooks/useTransform';
import { Layer, Transformer } from 'react-konva';
import { transformersConfig } from '../utils/transformersConfig';
import { Layer as LayerType } from 'konva/lib/Layer';

interface ITransformer {
  selectedId: number | null;
  layer: RefObject<LayerType>;
}

const Transformers = ({ selectedId, layer }: ITransformer) => {
  const elRef = useMemo(() => {
    if (!selectedId) return;
    const childrens = layer.current?.getChildren() ?? [];
    const el = childrens.find(el => el.attrs.id === selectedId);
    return el;
  }, [layer, selectedId]);

  const { trRef } = useTransformers({
    isSelected: selectedId,
    ref: { current: elRef }
  });

  return selectedId && elRef ? (
    <Layer>
      <Transformer ref={trRef} {...transformersConfig()} />
    </Layer>
  ) : null;
};

export default memo(Transformers);
