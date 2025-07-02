# Pizza Shop App

During this project, I'm building the UI using `shadcn`, optimizing the component build and allowing me to focus on the logical part of the application.

## Chadcn

Chadcn used sets of well built primitives - like **Radix**, for instance - to build a set of UI components with unified styling, using **Tailwind**

Check the full documentation on their website: https://ui.shadcn.com/

Following the **get started** section of their documentation, select the desired framework (in my case Vite) and follow the steps:

### With the project created: **Install and configure Tailwind**

`npm install tailwindcss @tailwindcss/vite`

Replace everything in `src/index.css` with the following:

```css
@import 'tailwindcss';
```

#### Edit tsconfig.json file

The current version of Vite splits TypeScript configuration into three files, two of which need to be edited.

Add the baseUrl and paths properties to the compilerOptions section of the tsconfig.json and tsconfig.app.json files:

```json
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
```

#### Edit tsconfig.app.json file

Add `baseUrl` and `paths` into the `compilerOptions` object on the **tsconfig.app.json** file to resolve paths, for your IDE:

```json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
    // ...
  }
}
```

#### Update vite.config.ts

Add the following code to the vite.config.ts so your app can resolve paths without error:

Install: `npm install -D @types/node`

On vite.config.ts file

```ts
import path from "path"
import tailwindcss from "@tailwindcss/vite"
// import react from "@vitejs/plugin-react"
// import { defineConfig } from "vite"

// https://vite.dev/config/
// export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
// })
```

Note: the commented sections are already on the file

### Run the CLI

Run the shadcn init command to setup your project: `npx shadcn@latest init`

You will be asked a few questions to configure components.json.
`Which color would you like to use as base color? › Neutral`

## Dark Mode Setup

To enable Dark Mode on the application, just follow the instruction on Dark Mode Tab of the documentation.

## Use components

ShadCN doesn't bring all the components on the main instalation. So it's necessary to install every component, just like RadixUI.
By installing the component, it will be loaded on the `components` folder

### Example with the Button Component

1 - Install the component `npx shadcn@latest add button`
2 - Import and load the button on the app.

```tsx
import { Button } from '@/components/ui/button'
;<Button variant="outline">Button</Button>
```

3 - When using Link with NextJS or React Router Dom, pass the `asChild` property to the button and insert the `Link` component inside.

```tsx
<Button asChild>
  <Link href="/login">Login</Link>
</Button>
```

## VSCODE Extensions

1. **PostCSS Language Support**: https://marketplace.visualstudio.com/items?itemName=csstools.postcss

2. **Tailwind CSS IntelliSense**: https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss

## Tailwind + Preetier

The Automatic Class Sorting with Prettier plugin is the official class sorting tool from Tailwind to organize the class declaration in components according to their recommended class order guidelines.

_Check their guidelines here: https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted_

`npm install -D prettier prettier-plugin-tailwindcss`

Then add the plugin to your Prettier configuration file `preetier.config.cjs` (create it if necessary):

```js
export default = {
  plugins: ["prettier-plugin-tailwindcss"],
};
```

## ESlint Plugin Simple Import Sort`

https://github.com/lydell/eslint-plugin-simple-import-sort

`npm install --save-dev eslint-plugin-simple-import-sort`
`npm install eslint-plugin-import --save-dev`

Both Plugins are used

````js
{
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": "latest"
  },
  "plugins": ["simple-import-sort", "import"],
  "rules": {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error"
  }
}```
````
