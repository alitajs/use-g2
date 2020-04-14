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

### Basic

```tsx
import React from 'react';
import { useG2Chart } from 'use-g2';

export default () => {
  const source = [
    { name: 'foo', age: 20 },
    { name: 'bar', age: 22 },
  ];

  const [ref, chart] = useG2Chart({ height: 200, source });

  chart.point().position('name*age');

  return <div ref={ref} />;
};
```

### With `@antv/data-set`

```tsx
import React from 'react';
import { useDataSetView, useG2Chart } from 'use-g2';

export default () => {
  const source = [
    { name: 'foo', age: 20 },
    { name: 'bar', age: 22 },
  ];

  const [dv] = useDataSetView({});
  const [ref, chart] = useG2Chart({ dv, height: 200, source });

  chart.point().position('name*age');
  dv.transform({
    type: 'filter',
    callback(row) {
      return row.age < 21;
    },
  });

  return <div ref={ref} />;
};
```
