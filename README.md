# types.ts

Shared TypeScript definitions for Jawg Maps projects

[![npm version](https://img.shields.io/npm/v/@jawg/types.svg)](https://www.npmjs.com/package/@jawg/types)
[![Run lint and test](https://github.com/jawg/types.ts/actions/workflows/build.yml/badge.svg)](https://github.com/jawg/types.ts/actions/workflows/build.yml)
[![Publish GitHub Pages](https://github.com/jawg/types.ts/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/jawg/types.ts/actions/workflows/gh-pages.yml)
[![Release NPM Package](https://github.com/jawg/types.ts/actions/workflows/release.yml/badge.svg)](https://github.com/jawg/types.ts/actions/workflows/release.yml)
[![License](https://img.shields.io/github/license/jawg/types.ts)](https://github.com/jawg/types.ts/blob/main/README.md)

## Usage

See all exported types at https://jawg.github.io/types.ts

## Example

Perfect usage in [@jawg/js-loader](https://github.com/jawg/js-loader) [index.d.ts](https://github.com/jawg/js-loader/blob/main/index.d.ts)

```typescript
import { JawgPlaces } from '@jawg/types';

interface Options {
  accessToken: string;
}

export default class JawgJSLoader {
  constructor(options: Options);
  loadJawgPlaces(version?: string): Promise<typeof JawgPlaces>;
}
```