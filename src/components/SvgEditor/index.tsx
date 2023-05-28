import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useQuery } from 'react-query';
import CreateCanvas from 'components/Canvas';

const SvgEditor = () => {
  const actions = useActions();
  const projectId = useTypedSelector(state => state.project.projectId);
  const projectData = useTypedSelector(state => state.project.projectData);

  useQuery(['projectData', projectId], () => actions.getProjectById(projectId as string | number), {
    enabled: projectId !== null && projectData === null
  });

  if (!projectId) return <div>Project Id is not defined!</div>;
  if (!projectData) return <div>Project wasn`t download.</div>;

  console.log(projectData);

  return (
    <CreateCanvas
      data={projectData.items}
      canvasId={projectId}
      stageDimensions={{
        width: projectData.width,
        height: projectData.height
      }}
    />
  );
};

export default SvgEditor;
