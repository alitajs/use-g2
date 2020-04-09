import type { Chart } from '@antv/g2';
import type { Size } from '@antv/g2/lib/interface';
import { getChartSize } from '@antv/g2/lib/util/dom';
import { usePrevious } from './use';

/**
 * @returns whether the size has been updated.
 */
export function useG2ChartSize(
  chart: Chart,
  size: Partial<Size> = {},
  autoFit: boolean = false,
): boolean {
  const { width, height } = size;
  const prevWidth = usePrevious(width);
  const prevHeight = usePrevious(height);
  const prevAutofit = usePrevious(!!autoFit);

  // initial rendering
  if (prevWidth === null || prevHeight === null || prevAutofit === null) {
    return false;
  }

  if (width === prevWidth && height === prevHeight && prevAutofit === autoFit) {
    return false;
  }

  if (chart.autoFit && !autoFit) {
    // @ts-ignore
    chart.unbindAutoFit();
    // eslint-disable-next-line no-param-reassign
    chart.autoFit = !!autoFit;
  } else if (!chart.autoFit && autoFit) {
    // eslint-disable-next-line no-param-reassign
    chart.autoFit = !!autoFit;
    // @ts-ignore
    chart.bindAutoFit();
  }

  if (width !== undefined && height !== undefined && !autoFit) {
    chart.changeSize(width, height);
  } else {
    const autofitted = getChartSize(
      chart.ele,
      autoFit,
      width ?? chart.width,
      height ?? chart.height,
    );
    chart.changeSize(autofitted.width, autofitted.height);
  }

  return true;
}
