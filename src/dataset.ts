// @ts-ignore
import * as DataSet from '@antv/data-set';
import { useCallback } from 'react';
import { useSingleton } from './use';

export function useDataSet<T extends Record<string, unknown>>(initialState: T) {
  const dataset = useSingleton(() => new DataSet({ state: initialState }));

  const getState = useCallback(<U extends keyof T>(key: U): T[U] => {
    return dataset.state[key as string];
  }, []);
  const setState = useCallback(<U extends keyof T>(key: U, value: T[U]) => {
    dataset.setState(key as string, value);
  }, []);

  return [dataset, getState, setState] as const;
}
