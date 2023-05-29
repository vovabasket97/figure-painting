import { FC, memo, useCallback } from 'react';

import { Modal, TextInput, Group, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';

interface IProjectIdModal {
  close: () => void;
  opened: boolean;
}

interface IInitialValuesForm {
  id: string;
}

const ProjectIdModal: FC<IProjectIdModal> = ({ close, opened }) => {
  const projectId = useTypedSelector(state => state.project.projectId);
  const actions = useActions();
  const form = useForm({
    initialValues: {
      id: ''
    } as IInitialValuesForm
  });

  const onCloseHandler = useCallback(
    (action?: 'update') => {
      close();

      if (action && action === 'update') actions.getProjectId();
    },
    [projectId]
  );

  const onSubmitHandler = useCallback((values: IInitialValuesForm) => {
    close();
    actions.getProjectById(values.id);
  }, []);

  return (
    <Modal opened={opened} onClose={onCloseHandler} centered closeOnClickOutside={false} closeOnEscape={false} title='Fetch project'>
      <form onSubmit={form.onSubmit(values => onSubmitHandler(values))}>
        <TextInput withAsterisk label='Project id' placeholder='Enter project id' {...form.getInputProps('id')} />

        <Group position='right' mt='md'>
          <Button onClick={onCloseHandler.bind(null, 'update')} color='red'>
            Get Id from server
          </Button>
          <Button type='submit'>Fetch</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default memo(ProjectIdModal);
