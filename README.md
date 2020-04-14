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

### Update Config

```tsx
import React from 'react';
import { useG2ChartSize, useG2Container, useG2Source } from 'use-g2';

interface MyProps {
  parentWidth: number;
}

export default (props: MyProps) => {
  const { parentWidth } = props;
  const [ref, chart] = useG2Container();

  useG2Source(chart, []);
  // When the width of the parent element is greater than 320, the size are adaptive,
  // otherwise 320 is used as the minimum width.
  useG2ChartSize(chart, { width: 320 }, parentWidth > 320);

  return <div ref={ref} />;
};
```

### With `@antv/data-set`

```tsx
import React from 'react';
import { useDataSetView, useG2Container, useG2SourceDataView } from 'use-g2';

export default () => {
  const [ref, chart] = useG2Container({ height: 200 });
  const [dataview] = useDataSetView({}, [
    { name: 'foo', age: 20 },
    { name: 'bar', age: 22 },
  ]);

  chart.point().position('name*age');
  dataview.transform({
    type: 'filter',
    callback(row) {
      return row.age < 21;
    },
  });

  useG2SourceDataView(chart, dataview);

  return <div ref={ref} />;
};
```
