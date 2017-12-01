# Cullender
A simple and composable way to filter data.

## Installation

Cullender is published on NPM registry. It's easy to integrate into your's
current project environment, you have just to install like the example below and
`import`/`require` cullender functions to filter something.

```bash
npm install cullender
```

This is a pretty module to convince you to use cullender to filter your stuff.

```javascript
import { cull } from 'cullender'

// ...

const latest = cull(
  [ ...users ],
  (user) => user.active,
  (user) => getTime(user.created) > getTime() - 7 * DAY
)
```
