import type { ChartCfg } from '@antv/g2/lib/interface';
import { Chart } from '@antv/g2';
import { Ref, useCallback, useEffect, useRef } from 'react';
import { useG2ChartSize } from './config';
import { useSingleton } from './use';

export function useG2Container<T extends HTMLElement = HTMLDivElement>(
  config: Omit<Partial<ChartCfg>, 'container'> = {},
) {
  const connectedRef = useRef(false);
  const container = useSingleton(() => {
    const element = document.createElement('div');
    element.style.setProperty('position', 'relative');
    return element;
  });

  const chart = useSingleton(() => new Chart({ ...config, container }));

  const ref: Ref<T> = useCallback((element: T | null) => {
    if (element && container.parentNode !== element) {
      element.appendChild(container);
      chart.render();
    }

    connectedRef.current = !!element;
  }, []);

  useG2ChartSize(chart, config, config.autoFit);

  useEffect(() => {
    if (connectedRef.current) {
      chart.render();
    }
  });

  return [ref, chart, container] as const;
}
