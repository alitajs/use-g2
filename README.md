# use-g2

## Usage

```tsx
import React, { useMemo } from 'react';
import { useG2Container, useG2Source } from 'use-g2';

export default () => {
  const [ref, chart] = useG2Container({ height: 200 });

  chart.point().position('name*age');

  useG2Source(chart, [
    { name: 'foo', age: 20 },
    { name: 'bar', age: 22 },
  ]);

  return <div ref={ref} />;
};
```
