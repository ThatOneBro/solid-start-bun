# solid-start-bun

Adapter for Solid apps that work on Bun.

This is very experimental; the adapter API isn't at all fleshed out, and things will definitely change.

This is basically a fork of the SolidStart Deno adapter, which will likely soon be deprecated as SolidStart is moving toward using Astro adapters in the near future.

**NOTE: HIGHLY EXPERIMENTAL AND UNTESTED. USE AT YOUR OWN RISK**

## Getting Started
*Prereqs: [Install Bun](https://bun.sh/docs/installation) and clone this repo*

1. Run `bun install` inside this repo
2. Initialize a new Solid app in **empty directory** (must be empty) with:
```bash
mkdir my-project
cd my-project
bun x create-solid@latest
```
3. Link this adapter as a local dependency in your project ([bun recommended](https://bun.sh/docs/cli/install#local-packages-bun-link))
4. Initialize and use the imported adapter in the SolidStart Vite plugin config:
```ts
// vite.config.ts
import bun from "solid-start-bun";

import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [solid({ adapter: bun(), ssr: true })]
});
```
See [here](https://start.solidjs.com/api/vite) for more info on configuring Vite and SolidStart adapters.

5. Run `bun install` in `my-project`
6. Run dev server to verify your app is working
```bash
bun run dev
```
And you're good to go!

## Build
```bash
bun run build
```

## Run Prod Server
```bash
bun run start
```

### License
MIT license found at [SolidStart main repo](https://github.com/solidjs/solid-start).
