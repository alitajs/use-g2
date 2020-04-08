# use-g2

## Installation

```bash
$ npm install use-g2 --save
or
$ yarn add use-g2
```

`@antv/data-set` is an optional dependency. If you use hooks related to it, it is better to add it to your dependencies:

```bash
$ npm install @antv/data-set --save
or
$ yarn add @antv/data-set
```

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
