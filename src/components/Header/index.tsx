import { FC, memo } from 'react';
import { Header as HeaderComp, Group, Button, Box, Text } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconLivePhoto } from '@tabler/icons-react';
import ProjectIdModal from 'components/ProjectIdModal';
import { useTypedSelector } from 'hooks/useTypedSelector';

const Header: FC = () => {
  const projectId = useTypedSelector(state => state.project.projectId);
  const [opened, { open, close }] = useDisclosure(true);

  const matches = useMediaQuery('(max-width: 650px)');

  return (
    <Box>
      <HeaderComp height={60} px='md'>
        <Group noWrap position='apart' sx={{ height: '100%' }}>
          <IconLivePhoto size={30} />

          <Group spacing='xl'>
            {projectId && !matches && (
              <Group spacing='5px'>
                <Text c='dimmed' size='sm' sx={{ lineHeight: 1 }}>
                  Project id:
                </Text>
                <Text fw={500} size='sm' sx={{ lineHeight: 1 }}>
                  {projectId}
                </Text>
              </Group>
            )}
            <Button onClick={open} variant='default'>
              Fetch another
            </Button>
          </Group>
        </Group>
      </HeaderComp>
      {opened && <ProjectIdModal opened={opened} close={close} />}
    </Box>
  );
};

export default memo(Header);
