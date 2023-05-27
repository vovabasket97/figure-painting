import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProjectSliceActions, getProjectId, getProjectById } from 'store/reducers/project/project.slice';

export const useActions = () => {
  const dispatch = useDispatch();
  const combinedReducers = {
    ...ProjectSliceActions,
    getProjectId,
    getProjectById
  };

  return useMemo(() => bindActionCreators(combinedReducers, dispatch), [dispatch]);
};
