import { FC } from 'react';

import { Modal, NumberInput, Group, Button } from '@mantine/core';
import { useForm } from '@mantine/form';

interface IProjectIdModal {
  close: () => void;
  opened: boolean;
}

const ProjectIdModal: FC<IProjectIdModal> = ({ close, opened }) => {
  const form = useForm({
    initialValues: {
      id: ''
    },
    validate: {
      id: (value: string) => (String(value).replace(/[^0-9.]/g, '').length ? null : 'The field should consist only of numbers.')
    }
  });

  return (
    <Modal opened={opened} onClose={close} title='Fetch project'>
      <form onSubmit={form.onSubmit(values => console.log(values))}>
        <NumberInput
          hideControls
          type='number'
          withAsterisk
          label='Project id'
          placeholder='Enter project id'
          {...form.getInputProps('id')}
        />

        <Group position='right' mt='md'>
          <Button type='submit'>Fetch</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default ProjectIdModal;
