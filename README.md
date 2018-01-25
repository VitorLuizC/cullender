# Cullender

[![Build Status][ci-badge]][ci]

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
import { cull, filters } from 'cullender'

// ...

const latest = cull(
  [ ...users ],
  filters.truthy(),
  (user) => getTime(user.created) > getTime() - 7 * DAY
)
```

## API

### `cull: (Iterable<T>, ...filters) => Array<T>` - Filter data with filter functions

#### Example

```js
import { cull } from 'cullender'

const isAdmin = (user) => user.role === 'admin'

cull(
  [ ...users ],
  (user) => user.isActive,
  isAdmin
)
```

### `create: ('AND'|'OR', ...filters) => boolean` - Creates a filter function

#### Example

```js
import { create } from 'cullender'

const isAdmin = create(
  'AND',
  (user) => user.isActive,
  (user) => user.role === 'admin'
)

[ ...users ].filter(isAdmin)

// You could also use *cull* function.
cull(users, isAdmin)
```

### `filters: Object.<string, F => filter>` - Some useful filter functions

### `filters.truthy: <T>((T, number, Array<T>) => *) => filter` - Filter truthy

Check if value, or function returned value is truthy.

#### Example

```js
import { cull, filters } from 'cullender'

cull(
  users,
  filters.truthy(user => user.id)
)
```

### `filters.into: <L, T>(Iterable.<L>, (T, number, Array<T>) => *): filter` - Filter into

Check if value, or function returned value is included on List.

#### Example

```js
import { cull, filters } from 'cullender'

const isAuthorized = filters.into(['admin', 'manager', 'executive'], user => user.role)

const authorized = cull(users, isAuthorized)
```

### `filters.search: <T>(string, (T, number, Array<T>) => string): filter` - Search terms

Check if value, or function returned value matches search terms.

#### Example

```js
import { cull, filters } from 'cullender'

const terms = document.querySelector('input[type="search"]').value

const results = cull(
  users,
  (terms, user => [user.name, user.email]) // search into multiple values with
                                           // an array you can use an plan
                                           // string value either
)
```

### `filters.not: (filter) => filter` - Not filter

Check if value, or function returned value matches search terms.

#### Example

```js
import { cull, filters } from 'cullender'

const withoutEmailUsers = cull(
  users,
  filters.not(filters.truthy(user => user.email))
)
```

## License

Licensed under MIT License. You can see it [here][license].

<!-- Links -->
[license]: ./LICENSE
[ci]: https://travis-ci.org/VitorLuizC/cullender
[ci-badge]: https://travis-ci.org/VitorLuizC/cullender.svg?branch=master
