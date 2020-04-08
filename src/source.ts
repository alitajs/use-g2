import type * as G2 from '@antv/g2';
import { usePrevious, useSingleton } from './use';

export function useG2Source<T extends G2.View, U extends any[]>(
  chart: T,
  source: U,
  isEqual?: (prev: U, curr: U) => boolean
): T {
  const prevSource = usePrevious(source);
  useSingleton(() => chart.data(source));

  if (prevSource && (!isEqual?.(prevSource, source))) {
    chart.changeData(source);
  }

  return chart;
}
