import type { View as DataView } from '@antv/data-set/lib/view';
import type { ChartCfg } from '@antv/g2/lib/interface';
import { Chart } from '@antv/g2';
import { Ref, useCallback, useEffect, useRef } from 'react';
import { useG2ChartSize } from './config';
import { usePrevious, useSingleton } from './use';

export interface UseG2ChartOptions<T extends any[]> extends Omit<Partial<ChartCfg>, 'container'> {
  /**
   * Enable the specified `DataView` instance to transform the source data.
   */
  dv?: DataView;
  /**
   * Determine whether the chart data needs to be updated,
   * and it will be updated every time by default.
   */
  isEqual?: (prev: T, curr: T) => boolean;
  /**
   * Source data.
   */
  source?: T;
  // sourceImmediately?: boolean;
}

export function useG2Chart<T extends any[], U extends HTMLElement = HTMLDivElement>({
  dv,
  isEqual,
  source,
  // sourceImmediately,
  ...config
}: UseG2ChartOptions<T> = {}) {
  const connectedRef = useRef(false);
  const container = useSingleton(() => {
    const element = document.createElement('div');
    element.style.setProperty('position', 'relative');
    return element;
  });

  const prevSource = usePrevious(source);
  const chart = useSingleton(() => new Chart({ ...config, container }));

  const ref: Ref<U> = useCallback((element: U | null) => {
    if (element && container.parentNode !== element) {
      element.appendChild(container);
      chart.render();
    }

    connectedRef.current = !!element;
  }, []);

  useG2ChartSize(chart, config, config.autoFit);

  useEffect(() => {
    if (source && (!prevSource || !isEqual?.(prevSource, source))) {
      chart.data(dv ? dv.source(source).rows : source);
    }

    if (connectedRef.current) {
      chart.render();
    }
  });

  return [ref, chart, container] as const;
}
