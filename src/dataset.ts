// @ts-ignore
import * as DataSet from '@antv/data-set';
import { useCallback, useMemo } from 'react';
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

/**
 * @param dataset Created by `new DateSet()` or `useDataSet()`.
 *
 * @param source Source data.
 * When `useDataView()` is used with `useG2Chart()`, `source` can be processed uniformly:
 * ```ts
 * const dv = useDataView(dataset);
 * useG2Chart({ dv, source });
 * ```
 */
export function useDataView<T extends any[]>(dataset: DataSet, source?: T) {
  const dataview = useMemo(() => dataset.createView(), [dataset]);

  if (source) dataview.source(source);

  return dataview;
}

/**
 * @param initialState
 *
 * @param source Source data.
 * When `useDataView()` is used with `useG2Chart()`, `source` can be processed uniformly:
 * ```ts
 * const dv = useDataView(dataset);
 * useG2Chart({ dv, source });
 * ```
 */
export function useDataSetView<T extends Record<string, unknown>, U extends any[]>(
  initialState: T,
  source?: U,
) {
  const [dataset, getState, setState] = useDataSet(initialState);
  const dataview = useDataView(dataset, source);

  return [dataview, dataset, getState, setState] as const;
}
