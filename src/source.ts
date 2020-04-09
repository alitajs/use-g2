import type * as G2 from '@antv/g2';
import { usePrevious, useSingleton } from './use';

/**
 * @returns whether the data has been updated.
 */
export function useG2Source<T extends G2.View, U extends any[]>(
  chart: T,
  source: U,
  isEqual?: (prev: U, curr: U) => boolean
): boolean {
  const prevSource = usePrevious(source);

  if (!prevSource || !isEqual?.(prevSource, source)) {
    chart.data(source);
    return true;
  }

  return false;
}

/**
 * @returns whether the data has been updated.
 */
export function useG2SourceImmediately<T extends G2.View, U extends any[]>(
  chart: T,
  source: U,
  isEqual?: (prev: U, curr: U) => boolean
): boolean {
  const prevSource = usePrevious(source);
  useSingleton(() => chart.data(source));

  if (prevSource && !isEqual?.(prevSource, source)) {
    chart.changeData(source);
    return true;
  }

  return false;
}
