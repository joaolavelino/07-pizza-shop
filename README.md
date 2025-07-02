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
@import "tailwindcss";
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
