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

## API SETUP WITH DOCKER

### Clone the repository

`git clone https://github.com/rocketseat-education/pizzashop-api`

### Install Bun

I had a bit of a problem to install bun. After installing it with `curl -fsSL https://bun.sh/install | bash`, I had to run the following commands (provided by DeepSeek):

```ts
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
```

After this I could run the bun commands, like `bun --version`.

### Install Docker

http://docker.com/get-started/

### Run the container:

Inside of the project, on VSCode, run the following on the terminal:
`docker compose up -d`
**-d** means that the container will run **D**etatched from the terminal, on Docker Desktop

You can confirm that the conainer is up and running using the following command:
`docker ps`

With the container already up and running, install all the packages with `bun-i` I created all the database tables with , `bun migrate`, `bun seed`

# API Connection using Axios

## Create the axios API connection:

```ts
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000',
})
```

### Enviroment Variables:

When the project is deployed, the API base URL will change into the actual hosted address. So, in order to set everything up correctly, we're going to set some environment variables (.env).

Starting with a `.env.local` file on the root of the project that will handle these variables:

```ts
VITE_API_URL = 'http://localhost:3000'
```

\_Because we're working on Vite, all the environment variables have to start with VITE\_\_

And update the `baseURL` on the `axios.ts` file:

```ts
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.BASE_URL,
})
```

We can also create a validation for our environment variable using Zod.
On an `env.ts` file, create a validation schema for the variable:

```ts
import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
})

export const env = envSchema.parse(import.meta.env)
//Export the validated env - if the validation fails, it will trigger an error and prevent the app from running
```

Then import the `env` as the baseURL on the `axios.ts` config file

```ts
import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
})
```

# Tanstack React Query

## **TanStack Query (React Query)**

A powerful async state management library for React that **simplifies data fetching, caching, and synchronization**. It handles:

✅ **Auto-caching & deduping**  
✅ **Background refetching**  
✅ **Optimistic updates**  
✅ **Pagination/Infinite Queries**  
✅ **Suspense/Error Boundaries**

Works with REST, GraphQL, or any async data source. [Learn more](https://tanstack.com/query).

## Differentiate MUTATION and QUERY

### Query (`useQuery()`)

**Purpose**: Fetch data (GET requests)
**Characteristics**:
✅ Read-only operations
✅ Automatic re-fetching (when data becomes stale)
✅ Cached (shared across components)
✅ Background updates
✅ Deduplicated (same key = single request)

```tsx
const { data } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos, // GET /todos
})
```

#### Use Cases:

- Loading blog posts
- Fetching user profiles
- Getting paginated data

### Mutation (`useMutation()`)

**Purpose**: Modify data (POST/PUT/DELETE)
**Characteristics**:
🔥 Triggers side effects (changes server state)
🔄 Manual execution (call mutate() to run)
🛠️ No caching (but can invalidate queries)
⚡ Optimistic updates (UI updates before server response)

```tsx
const mutation = useMutation({
  mutationFn: (newTodo) => axios.post('/todos', newTodo),
  onSuccess: () => {
    queryClient.invalidateQueries(['todos']) // Refresh todos list
  },
})

// Trigger:
mutation.mutate({ title: 'New Todo' })
```

#### Use Cases:

- Creating/updating/deleting records
- Form submissions
- API calls that change server state

## 1 - Create a Query Client

On a `lib/query.ts` file, create the `queryClient`:

```ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()
```

And use a context provider, called `QueryClientProvider` around the `RouterProvider`, on the `App.tsx` component.

```tsx
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/reactQuery'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="pizza-shop-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster closeButton richColors />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
```

## Creating my first request - Sign-In:

In order to keep all the API request funcions organized, create a `/src/api` folder.

### The API request file:

This file will contain a function that will perform the api request. This will use the `api` setting that we create on the `lib/axios.ts` file.

All the requests will have an interface that will define the data structure of the request body.
Sign in function:

```ts
import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
}

export async function signIn(body: SignInBody) {
  await api.post('/authenticate', {
    email: body.email,
  })
}
```

To be more concise, the `body` can be destructured, so the function recieves directly the `email`.

```ts
export async function signIn({ email }: SignInBody) {
  await api.post('/authenticate', { email })
}
```

### On the Sign-in page:

On the page, i'm using the useMutation hook. This hook allows us to control the api call (see Mutation and Query definitions above) with controls like:

- **mutationFn** - what function we'll run? (on this case, the `signIn` function we just created)
- **retry** (how many times this call is going to try) / **retryDelay** (how long it'll take for a retry to happen)
- **onSuccess** (what is happening after a successful api call)
- **onSettled** (when all is done...)
- **onMutate** (when the mutation is happening...)
- etc.

This hook also return a number of information, like:

- request **status** (the `status` itself, and boolean states like `isIdle`, `isPending`, `isSuccess`, `isError`)
- when it was **submitted** with `submittedAt`
- etc.

Now we're only using `mutateAsync`, the function that is going to trigger the `mutationFn`
(i'm going to rename it to 'authenticate' to be more specific, if there are more mutation on the same file)
**Our hook:**

```tsx
//added imports
import { signIn } from '@/api/sign-in'
import { useMutation } from '@tanstack/react-query'

//inside the component
const { mutateAsync: authenticate } = useMutation({
  mutationFn: signIn, //axios function created on the /api folder
})
```

On the submit function of the Sign In form, we're passing the `authenticate` function (to trigger the mutation). It gets the request body as an argument. This is alredy typed because of the interface on the `signIn` function, our `mutationFn`. So Typescript will prevent invalid request body structures.

I changed all the visual responses from the request to the `useMutation` hook and called directly the `authenticate` function on the submit function, without the try/catch.

```tsx
const { mutateAsync: authenticate } = useMutation({
  mutationFn: signIn, //axios function created on the /api folder
  onSuccess: () => {
    toast.success('Login success', {
      description:
        'Check your e-mail for your personalized authentification link.',
      action: {
        label: 'Send again',
        onClick: () => {
          toast.success('Sent again')
        },
      },
    })
  },
  onError: (error) => {
    toast.error('Login failed', {
      description: error.message,
    })
    console.error(error)
  },
})

async function handleSignIn(data: signInFormType) {
  authenticate({ email: data.email })
}
```
