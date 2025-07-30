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
  withCredentials: true, //this allows axios to read the credentials for the request (the cookie with the token )
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

## Creating a POST request with useMutation() - Sign-In:

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

On a second example, on the register restaurant form, I wanted to redirect the user to the login page, but I wanted to pre-fill the form with the e-mail he just registered.
To do so, I used the `variables` passed to the mutationFn. They are accessible on the `onSuccess` using the secont argument of the arrow function. The first argument is the data provided by the response. Since this request doesn't gerenrate a response, I left it as `_`:

```ts
const { mutateAsync: registerRestaurantFn } = useMutation({
  mutationFn: registerRestaurant,
  onSuccess: (_, variables) => {
    toast.success('Register success', {
      description: 'Your shop is successfully registered',
      action: {
        label: 'Login',
        onClick: () => {
          navigate(`/sign-in?email=${variables.email}`)
        },
      },
    })
  },
  onError: (error) => {
    toast.error('Register failed', {
      description: error.message,
    })
  },
})
```

_This is more of a react-router-dom thing, but ok_
To access this search params from the URL, you can use the `useSearchParams()` hook from `react-router-dom` and pass it as the form's default values on the `useForm()` hook.

```tsx
const [searchParams] = useSearchParams()

const {
  register,
  handleSubmit,
  formState: { isSubmitting },
} = useForm<signInFormType>({
  resolver: zodResolver(signInSchema),
  defaultValues: {
    email: searchParams.get('email') ?? '',
  },
})
```

## Creating a GET request with useQuery() - Get Profile

To make a get profile, on the `api` folder, create a request with the `api` object created with Axios.
Here we can set a Typescript interface to create the typing for the expected API response:

```ts
import { api } from '@/lib/axios'

export interface getProfileResponse {
  id: string
  name: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getProfile() {
  const response = await api.get<getProfileResponse>('/me')
  return response.data
}
```

### On the component:

On the `AccountMenu`, instead of the `useMutation()` hook, we use the `useQuery()`.
This time we're fetching data, and `useQuery` provides us different functionalities.

The `useQuery()`hook recieves as a parameter an object with two main items:

- `queryKey`: provides a key, so reactQuery knows if this information is already cached, so it prevents duplication
- `queryFn`: is the function that makes the API request
  The hook returns a response, that can be destructured. This response contains the **data**, and different request states (`isError`, `isFetching`, `isLoading`, etc), errors, and more.

We can pass different outcomes for the request with `onSuccess`, `onError`, etc, but it's only used when the response needs to be passed on a callback function (i.e.: the setData on a form)

```tsx
export const AccountMenuLabel: React.FC = () => {
  const { data: userProfile } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getProfile,
  })
  return (
    <DropdownMenuLabel className="flex flex-col">
      <span>{userProfile?.name}</span>
      <span className="text-muted-foreground text-sm font-normal">
        {userProfile?.email}
      </span>
    </DropdownMenuLabel>
  )
}
```

### QUICK NOTES ON CALLBACKS ON THE REACT-QUERY HOOKS

#### `useQuery` (GET Requests)

##### 🚫 Avoid:

- Using onSuccess/onError for UI state changes
- Navigation inside callbacks

#### `useMutation` (POST/PUT/DELETE Requests)

##### 💡 Use Callbacks For:

- Analytics logging
- Syncing to localStorage
- Non-visual side effects

#### Rule of thumb:

| Feature          | `useQuery` | `useMutation` |
| ---------------- | ---------- | ------------- |
| Callbacks needed | ❌ Rarely  | ✅ Always     |
| UI updates       | In render  | In callbacks  |
| Side effects     | Minimal    | Essential     |

[//]: # 'Pro tip: Keep mutations self-contained'

### Stale Time

It defines how long it'll take to the fetched information is considered stale to Tanstack Query. If it's stale, it will be refetched if:

- New component mounts
- Window regains focus
- Network reconnects
- Query is invalidated

#### Usage

```tsx
const { data: restaurantProfile, isLoading: isLoadingManagedRestaurant } =
  useQuery({
    queryKey: [MANAGED_RESTAURANT_KEY],
    queryFn: getManagedRestaurant,
    staleTime: 1000 * 60 * 60 * 24,
  })
```

#### Recommended Stale Times:

| Scenario           | `staleTime`           | Rationale                        |
| ------------------ | --------------------- | -------------------------------- |
| **Real-time data** | `0` (default)         | Stock prices, live notifications |
| **User data**      | `1000 * 60 * 60 * 24` | Balance changes, profile edits   |
| **Static content** | `1000 * 60 * 60 * 24` | Product descriptions, help docs  |

#### Infinite stale time

You can use `Infinity` as the `staleTime` if your data never becomes stale automatically and should only update when you manually trigger a refetch. This is a valid pattern for truly static data or when you want full control over updates.

| Scenario                     | Example                      | Rationale                         | Implementation Tip              |
| ---------------------------- | ---------------------------- | --------------------------------- | ------------------------------- |
| **Manually controlled data** | CMS content, feature flags   | Changes only via UI/admin actions | Combine with `refetch()` button |
| **Never-changing data**      | Archived orders, old reports | Data is read-only after creation  | Add `cacheTime: Infinity`       |
| **Offline-first apps**       | Field service apps           | Sync only when user triggers      | Use with `persistQueryClient`   |

**Warning**: Only use this if you're certain the data won't change behind the scenes. For most cases, a finite but large staleTime (e.g., 24 hours) is safer.

**Additional** settings are needed when working with really immutable changes:

- `cacheTime`: Allows cache persistance: Data remains in cache, until `cacheTime`expires (Default: 5 minutes)

#### Alternatives for infinite stale time

```tsx
refetchOnMount: false,
refetchOnWindowFocus: false,
refetchOnReconnect: false
```

### Update HTTP States with Invalidate

After a mutation, the HTTP state is not immediately updated. In order to do so, we need to set the mutation to **invalidate** the query.

First, get the `queryClient` using the hook `useQueryClient`. Then use its method `invalidateQueries` with the `queryKey` to make this query to be refetched, thus updating the cache.
Example of `useMutation()` hook with **invalidation**

```tsx
const { mutateAsync: updateProfileFn, isPending: isUpdateProfilePending } =
  useMutation({
    mutationFn: updateRestaurantProfile,
    onSuccess: async () => {
      toast.success('Profile updated', {
        description:
          'Your new restaurant information is already visible for your customers',
      })
      await queryClient.invalidateQueries({
        queryKey: [MANAGED_RESTAURANT_KEY], //the constant is used to avoid typing errors between queries.
      })
      closeFn()
    },
    onError: (error) => {
      toast.error(error.name, { description: `${error.message} Try again` })
    },
  })
```

### Optimistic interface

Optimistic interfaces use the information provided to the mutation to update the UI before the request is setteled.
To do so, a new state of the mutation is used: `onMutate`. This is an arrow function that is called during the mutation, before the `onSuccess`/`onError` outcomes.

```tsx
const { mutateAsync: updateProfileFn, isPending: isUpdateProfilePending } =
  useMutation({
    mutationFn: updateRestaurantProfile,
    onMutate: (data: ShopProfileData) => {
      //get previously cached data
      const previousCachedData =
        queryClient.getQueryData<getManagedRestaurantResponse>([
          MANAGED_RESTAURANT_KEY,
        ])
      //change the cached data with new name, just to update the UI
      queryClient.setQueryData([MANAGED_RESTAURANT_KEY], {
        ...previousCachedData,
        name: data.name,
      })

      return { previousCachedData }
    },
    onSuccess: async () => {
      toast.success('Profile updated', {
        description:
          'Your new restaurant information is already visible for your customers',
      })
      await queryClient.invalidateQueries({
        queryKey: [MANAGED_RESTAURANT_KEY],
      })
      closeFn()
    },
    onError: (error, _, context) => {
      //revert the changes on the cached info (and UI)
      queryClient.setQueryData(
        [MANAGED_RESTAURANT_KEY],
        context?.previousCachedData,
      )
      toast.error(error.name, { description: `${error.message} Try again` })
    },
  })
```

In this example, onMutate recieves the data passed on the mutationFn (don't forget to type this), performs an action and can return a value that will be passed to the next steps (in this case, we return the previously cached info, so we can revert in case of error on the request, on the `onError`outcome.)

Inside of the function, the `queryClient` is used to get que cached data and update it.

#### Risks

This looks interesting but may create inconsistencies on some scenarios. Here are some notes about usability of this concept:
| Scenario | Good Fit? | Why? | Alternative Approach |
|------------------------------|-----------|----------------------------------------------------------------------|---------------------------------------|
| **Fast actions** (likes, toggles) | ✅ | Users expect instant feedback | Show micro-interactions (e.g., pulse) |
| **Ordered lists** (drag/drop) | ✅ | Visual continuity critical | Use placeholder animations |
| **Financial transactions** | ❌ | Discrepancies are unacceptable | Pessimistic + loading states |
| **Complex DB writes** | ❌ | Risk of unrecoverable state | Multi-step confirmation |
| **Collaborative editing** | ⚠️ | Requires conflict resolution | Operational transforms (CRDTs)

### Querys with Query Params

In order to use a query param, we need to, first, refactor our api call:

#### Update API call:

```ts
import { api } from '@/lib/axios'

export interface GetOrdersQuery {
  pageIndex?: number | null
}

export interface GetOrdersResponse {
  orders: {
    orderId: string
    createdAt: Date
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders(queries: GetOrdersQuery) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex: queries.pageIndex || 0,
    },
  })

  return response.data
}

export const GET_ORDERS_KEY = 'orders' as const
```

##### What did we do?

1. Create an interface for the query parameters:

```ts
export interface GetOrdersQuery {
  pageIndex?: number | null
}
```

2. Added the queries on as the main function`s argument, with it's interface:

```tsx
export async function getOrders(queries: GetOrdersQuery) {
  // rest of function
}
```

3. Sent an options object with the params as the second argument on the `api.get()` function (1st parameter is the url):

```tsx
const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex: queries.pageIndex || 0,
    },
```

#### Update add the params on the useQuery()

On the `useQuery` hook we need to:

1. Pass a second item to the `queryKey` array. Without this second parameter,
2. Add the params on the argument of the `queryFn` (remember to arrow function to pass an argument)

```tsx
const { data: result } = useQuery({
  queryKey: [GET_ORDERS_KEY, pageIndex],
  queryFn: () => getOrders({ pageIndex: pageIndex }),
})
```

The most impressive thing is that React Query will add the navigated pages to the cache, so if we navigate to a page for a 2nd time, it will load instantaneously.

After adding all the parameters to enable, for instance, filters, the query will look like this:

```tsx
const { data: result } = useQuery({
  queryKey: [GET_ORDERS_KEY, pageIndex, orderId, customerName, status],
  queryFn: () =>
    getOrders({
      pageIndex: pageIndex,
      orderId,
      customerName,
      status: status,
    }),
})
```

### Conditional Queries

The queries will normally trigger when the component is rendered. But in some cases we don't want to let the query happen. One example is a table of items with a details Modal triggered by a button on the table row.

By using Radix's Dialog, all the dialogs will automatically trigger a query. To avoid this behaviour we can use a useQuery propety called `enabled`.

In this example, the dialogs on the table row were controlled by a state, and the state `open` was passed to the dialog component, and used as a boolean trigger to the query.

```tsx
export const OrderDetails: React.FC<OrderDetailsProps> = ({
  orderId,
  open,
}) => {
  const { data: orderDetails } = useQuery({
    queryKey: [GET_ORDER_DETAILS_KEY, orderId],
    queryFn: () => getOrderDetails({ orderId }),
    enabled: open,
  })

```

### Manually update the cache.

When you're working on a mutation and don't want a subsequent refetch (caused by the query invalidation) that would trigger a rerender of the component, or have an unexpected UI updated caused by a different Backend response, **it's possible to update the cache manually**

⚠ I sincerely have a problem of manually rerwiting the cached information, but in some situations this is the only solution to make a fluid UX.

In this example from the Order Cancelling feature of the Pizza Shop projetct, both Order List and Order Details Queries are updated.
Order List require multiple query updates because of the pagination, and filtering queries.
Order Details is much simpler since it's only one query whose cache will be manipulated

```tsx
//cancel manually to avoid refetch - change pagination
//OrderList
const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
  queryKey: [GET_ORDERS_KEY],
})

ordersListCache.forEach(([cacheKey, cacheData]) => {
  if (!cacheData) {
    return
  }
  queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
    ...cacheData,
    orders: cacheData.orders.map((order: OrdersFromList) => {
      if (order.orderId == orderId) {
        return { ...order, status: 'canceled' }
      }
      return order
    }),
  })
})
//OrderDetails
queryClient.setQueryData(
  [GET_ORDER_DETAILS_KEY, orderId],
  (cachedData: OrderDetails) => {
    if (!cachedData) return
    return {
      ...cachedData,
      status: 'canceled',
    }
  },
)
```

### REMINDER: Information dependant query.

If I want that the query to refetch everytime some parameter changes, I need to pass this variable parameter to the `queryKey` and React Router will simply monitor this and refetch if this parameter changes.
Here's an example from the Pizza Shop App:

```tsx
const { data: dailyRevenueInCents } = useQuery({
  queryKey: [GET_METRICS_DAILY_REVENUE, dateRange],
  queryFn: () =>
    getDailyRevenue({
      from: dateRange?.from,
      to: dateRange?.to,
    }),
})
```

In this case, dateRange is a range of dates that will be passed as params to the API call. If i select different dates, a different range will be passed to this query, triggering a refetch!
Simple as that!
_I wish everything were this simple_

# React Hook Form - Contolled components

Some form field components from UI libraries don't return the proper HTML Element, for instance, Radix's `<Select>` component.
Since these components doesn't have the HTML elements itself, it's not possible to use the `register` function from RHF. We need to use the `<Controler>` component from the library.

These code examples are from `07-pizza-shop` project, on the `OrderTableFiltes.tsx` component:

## 1 - Import the control function from within the `useForm` hook.

```tsx
const { register, handleSubmit, control } = useForm<OrderFiltersDataType>({
  resolver: zodResolver(orderFiltersSchema),
})
```

## 2 - Inport the <Controller> component from RHF and with it's `render` property, render the `<Select>`

The render property recieves an arrow function, and on it's arguments we can get some of the field's information. We pass this information on the Select element, like so:

```tsx
<Controller
  name="orderStatus"
  control={control}
  render={({ field: { name, onChange, value, disabled } }) => (
    <Select
      defaultValue="all"
      name={name}
      onValueChange={onChange}
      value={value}
      disabled={disabled}
    >
      <SelectTrigger className="flex-1 md:w-[140px]">
        <SelectValue className="" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="canceled">canceled</SelectItem>
        <SelectItem value="processing">Processing</SelectItem>
        <SelectItem value="delivery">Delivery</SelectItem>
        <SelectItem value="delivered">Delivered</SelectItem>
      </SelectContent>
    </Select>
  )}
/>
```

# Testes with Vitest +

Vitest is the test framework powered by Vite. It's compatible with TS and Jest.

## Install Vitest + Documentation

```bash
npm install -D vitest
```

Check the documentation [here](https://vitest.dev/)

## Install Testing Library + Documentation

Instead of just testing js/ts functions and it's returns, Testing Library enables us to test components that have rendered elements on the DOM. It has semantic query tools for us to get the exact elements we want to perform the tests on.

```bash
npm install --save-dev @testing-library/react @testing-library/dom
```

Check the documentation [here](https://testing-library.com/docs/react-testing-library/intro)

## Install Jest-dom

`jest-dom` is a companion library for Testing Library that provides custom DOM element matchers for Jest.
Basically it allows us to make assertion on HTML elements, rendered on the DOM, its presence or not, and its properties, like: disabled, invalid, required, focus, etc.

```bash
npm install --save-dev @testing-library/jest-dom
```

Check the documentation [here](https://github.com/testing-library/jest-dom/)

## Install `happy-dom` + Documentation

`happy-dom` is a reimplementation of `jsdom`, which is a javascript DOM simulator that allows us to run all the unitary tests without running a virtual browser. It doesn't have any visual output, but reather just simulates what happens on the browser.

```bash
npm install -D happy-dom
```

Check the documentation [here](https://github.com/capricorn86/happy-dom/wiki/Getting-started)

## Vitest Basic Setup

On your `package.JSON` file, add the test script to run the tests:

```json
"scripts": {
    //all the other scripts
    "test": "vitest"
  },
```

Create a `vitest.config.ts` file and add the following:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
  },
})
```

[Documentation](https://vitest.dev/config/#globals)

It's also possible to use the `vite.config.ts` file, but it needs a few changes because of typescript errors.
(The original config object type can't get a `test` key).

```ts
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import type { UserConfig } from 'vite' //add this
import type { InlineConfig } from 'vitest/node' //add this

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: { globals: true }, //add this
} as UserConfig & {. //add this
  test: InlineConfig //add this
})
```

on `tsconfig.json` and `tsconfig.app.json` add the globals typing on the `compilerOptions`: object

```json
{
  "compilerOptions": {
    "types": ["vitest/globals"] //add this
  }
}
```

## Jest-dom basic setup

Create a tests setup file on the root of the project (outside the `src` folder): `/test/setup`. There just import the jest-dom.

```ts
import '@testing-library/jest-dom/vitest'
```

Then, reference this file on the test object of the `vitest.config.js` configuration file, or the `vite.config.js` if you decided to use the same configuration file:

```ts
test: { globals: true, setupFiles: ['./test/setup.ts'] },
```

And include it on the list of folders on the `include` object on `tsconfig.app.json` in order to the DOM assertions to be recognized by typescript.

```json
"include": ["src", "test"]
```

## Happy-dom basic setup

The only setup needed to use Happy-dom with Vite is adding `environment: 'happy-dom'` on the test object, along with the `globals` and `setupFiles`:

```ts
test: {
    globals: true,
    setupFiles: ['./test/setup.ts'],
    environment: 'happy-dom',
  }
```

## Creating the first test

On a file with the component name and `.spec.tsx` extension we can now start our tests, here's an example from pizza shop:

```tsx
describe('Order status component', () => {
  it('should display the right information based on the provided order status - canceled', () => {
    //status canceled
    const wrapper = render(<OrderStatus status="canceled" />)

    // wrapper.debug() // this shows what's being rendered on the test

    const statusText = wrapper.getByText('Canceled')
    const statusIcon = wrapper.getByLabelText('status-icon')
    //console.log(statusText.outerHTML) //this renders the HTML element that wraps the queried text
    expect(statusText).toBeInTheDocument()
    expect(statusIcon).toHaveClass('lucide-circle-x')
    expect(statusIcon).toHaveClass('text-rose-500')
  })
  // test for other status...

  it('should display the test on any display size when recieving the "full" prop', () => {
    const wrapper = render(<OrderStatus status="canceled" full />)

    const statusText = wrapper.getByText('Canceled')

    expect(statusText).not.toHaveClass('hidden')
  })
})
```

## Testing Events and function triggers with spies

To test events, it's necessary to install another companion library from Testing Library `user-event`:

```bash
npm i -d @testing-library/user-event
```

This library allows us to simulate user events, like typing and clicking.
Here's an example of this on the Pizza Shop App
1 - Create a user
2 - Create the user event

```tsx
import { render } from '@testing-library/react'
import { Pagination } from './Pagination'
import userEvent from '@testing-library/user-event'

// created default data to all the tests, so they have standardized results based on these values
const currentPageIndex = 2
const entriesNumber = 50
const entriesPerPage = 10
const pages = Math.ceil(entriesNumber / entriesPerPage) || 1
const lastPageIndex = pages - 1

const onPageChangeCallback = vi.fn() //this is a spy function (vi refers to vitest)

describe('Pagination component', () => {})
it('should navigate to the next page ', async () => {
  const wrapper = render(
    <Pagination
      entriesNumber={entriesNumber}
      onPageChange={onPageChangeCallback}
      pageIndex={currentPageIndex}
      perPage={entriesPerPage}
    />,
  )

  const nextPageButton = wrapper.getByRole('button', { name: 'Next page' })

  // User Event Simulation
  const user = userEvent.setup() //create the user
  //simulate the click - this is a promise, so the function must be async
  await user.click(nextPageButton) //simulate the action

  expect(onPageChangeCallback).toBeCalledWith(currentPageIndex + 1)
})
```

### Clear the mock function status.

If the mock function is called in multiple testes, the `toBeCalled` status can be carried from test to test, resulting in false positives.
To avoid this, we need to clear this status with the function `mockClear` from the function mockup **before each** test:

```tsx
describe('Pagination component', () => {
  beforeEach(() => {
    onPageChangeCallback.mockClear()
  })
  // all test cases
})
```

## Router related tests

Doing tests with components that are related to routing, the DOM simultaion will not be able to handle many operations related to the routing. This is mainly because we don't have a proper Browser running our tests, therefore there is no URL, for instance.

React Router Dom a tool to deal with this, called `MemoryRouter`. This is a simulation of a Router Provider, that, as the name suggests, runs on the memory. There we can set browsing related information, like the URL. It also allow us to render components that use hooks that depends on the Router Provider, like `useLocation`.

React Testing Library allow us to use a component envolving the rendered component, passing a wrapper component, on the second argument of the `render()` function, as shown below.

Here's an example of a test using it:

```tsx
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { NavigationLink } from './NavLink'

describe('NavLink component', () => {
  it('should highlight nav link when its target is the curent page', async () => {
    const wrapper = render(
      <NavigationLink to={'/about'}>About</NavigationLink>,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={['/about']}>{children}</MemoryRouter>
          )
        },
      },
    )

    wrapper.debug()
  })
})
```

The argument `initialEntries` sets the parameter of this router. The first argument is the current path.

Running the `debug` function, we can see on the render tree on the terminal, all the information about this component.
In this case, because the current path, set on `initialEntries` is the same of the component's target path, the `data-current` parameter of the anchor is true. If we change the current path on the `MemoryRouter`, this parameter will be false.

In this test, it's possible to render two NavLinks inside the render function, and assess the `data-current` on both cases.

It's also possible to render all these elements inline, without using the wrapper option on the second argument of the render function:

```tsx
render(
  <MemoryRouter initialEntries={['/orders']}>
    <OrderTableFilter />
  </MemoryRouter>,
)
```

If I want to track the url, in case of search params, it's possible to create a mock component to run alongside the tested one, that will only render the path returned by `useLocation` (that can run, when it's inside the Memory Router):

```tsx
function LocationDisplay() {
  const location = useLocation()
  return <div data-testid="location-display">Location:{location.search}</div>
}
/// Inside the test case:
render(
  <MemoryRouter initialEntries={['/orders']}>
    <OrderTableFilter />
    <LocationDisplay />
  </MemoryRouter>,
)
```

And we can render multiple providers, just like on a normal app component:

```tsx
<MemoryRouter initialEntries={['/sign-in?email=johndoe@example.com']}>
        <QueryClientProvider client={queryClient}>
          <SignInPage />
        </QueryClientProvider>
      </MemoryRouter>,
    )
```

In this case, the component use query hooks, so it need to be rendered on.

## Render Helper

To wrap it up, it's possible also to isolate this render structure with the wrapper, to be used in multiple iterations:

```tsx
import { QueryClientProvider, type QueryClient } from '@tanstack/react-query'
import { render, type RenderOptions } from '@testing-library/react'
import type { ReactNode } from 'react'
import { createTestQueryClient } from '../../test/testQueryClient'
import { MemoryRouter, useLocation } from 'react-router-dom'

interface RenderWithProvidersOptions extends RenderOptions {
  ui: ReactNode
  path?: string
  queryClient?: QueryClient
  showLocationDisplay?: boolean
}

const testQueryClient = createTestQueryClient()

function LocationDisplay() {
  const location = useLocation()
  return <div data-testid="location-display">{location.search}</div>
}

export function renderWithProviders({
  ui,
  path = '*',
  queryClient = testQueryClient,
  showLocationDisplay = false,
}: RenderWithProvidersOptions) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <QueryClientProvider client={queryClient}>
        {ui}
        {showLocationDisplay && <LocationDisplay />}
      </QueryClientProvider>
    </MemoryRouter>,
  )
}
```

i also isolated the Query Client Creation:

```ts
import { QueryClient } from '@tanstack/react-query'

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // disable retry for tests
      },
    },
  })
}
```

# MSW - Mock Service Worker

It's a API mocking library that allows you to write client-agnostic mocks and reuse them across any frameworks, tools and environments.

Make a Mock API allows us not only to test our API integration, but also have the possibility to run our front-end application without running the back-end **on a development environment**. Sometimes we only need to add a local feature that doesn't require API calls, or even only make simple UI changes. With the mock API, this can be done without the need of run all these services.

[Check the docs here](https://mswjs.io/docs/quick-start)

```bash
npm i msw --save-dev
```

Start MSW and adding the public directory:

```bash
npx msw init public/ --save
```

## 1 - Create the Worker

On the `api/` folder, create an `index.ts` file that will have the start function for the Worker. It's boilerplate, so just copy from here.

```ts
import { setupWorker } from 'msw/browser'

export const worker = setupWorker()

export async function enableMSW() {
  await worker.start() /// after this, all the requests will be intercepted by MSW
}
```

on `package.json`, create a script that will start our application on a separate environment (in this case, a test environment)

```json
  "scripts":{
    "dev:test":"vite --port 9283 --mode test"
    //this means, run the project on the port 9283 (it can be any number - not used of course), on a test environment.
  }
```

On the `env.ts` file on the `src` folder, add the `MODE` environment variable to our `envSchema`:

```ts
const envSchema = z.object({
  MODE: z.enum(['production', 'development', 'test']),
  // other env
})
```

With this environment variable, I can create a condition on the start function from MSW:

```ts
import { env } from '@/env'
import { setupWorker } from 'msw/browser'

export const worker = setupWorker()

export async function enableMSW() {
  if (env.MODE !== 'test') return //will not start if the app is running on other environments than test
  await worker.start()
}
```

To wrap it up, on the `main.tsx` file (the one that runs React), run the `enableMSW` before running React.

```tsx
enableMSW().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
```

Remember that `enableMSW`:

- is async, so `.then` will wait it's promise to be resolved;
- will only start the MSW worker if the app is running on the `test` environment;

**Run the application with the created script**

```bash
npm run dev:test
```

### Set the environment variables to the test environment

On the environment variables file `env.local` we have the variables to run this project on a local environment. For instance, the API `VITE_API_URL` variable points to the localhost. On the test environment, we need to point the API calls elsewhere.

1- Create a test environment variables file `.env.test` to name our test environment variables:

```ts
VITE_API_URL = '/' //this will point all the request to our main URL, not to the API
VITE_ENABLE_API_DELAY = false // I don't want any delay out of the development environment (it's only necessary for us to test the loading states of the UI)
```

## Create our first mock

On `/api/MSW/` create the a `.ts` file of the mock. In this example, it's Pizza Shop's sign-in:

```ts
import { http, HttpResponse } from 'msw'

export const signInMock = http.post('/authenticate', () => {
  //we create a mock POST request to /authenticate
  return new HttpResponse(null, { status: 401 }) //send back the response with no body (null) and the status
})
```

Add this `signInMock` mock to my handlers on the `index.ts` file on the MSW folder:

```ts
export const worker = setupWorker(signInMock)
```

**remove the `.url` from the `envSchema`**, as we're not sending an url on the test environment:

```tsx
const envSchema = z.object({
  MODE: z.enum(['production', 'development', 'test']),
  VITE_API_URL: z.string().//url(), //remove the URL because of the tests
  VITE_ENABLE_API_DELAY: z.string().transform((value) => value === 'true'),
  //if value is equals true, it will return true
})
```

If we test our login, it's going to work, and always return a `status:401` response with no response body.
But we can simulate a positive response.

- Get the `email` from the request body;
- return a status 200
- and set an auth cookie (kind of what the backend does when it sends the magic link: access and set the auth cookie)

This is the final mock:

```ts
import { http, HttpResponse } from 'msw'
import type { SignInBody } from '../sign-in'

export const signInMock = http.post<never, SignInBody>(
  '/authenticate',
  async ({ request }) => {
    const { email } = await request.json()
    if (email === 'johndoe@example.com') {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          'Set-Cookie': 'auth=sample-jwt',
        },
      })
    }
    return new HttpResponse(null, { status: 401 })
  },
)
```

Notes:

- The typing generics `<never, SignInBody>` stand for:
  - **Parameters type**: `never`: It's never going to be params to this request
  - **Request Body type**: We just imported the interface of the actual API request (in this case is the `email:string`)
  - The third item can be the **Response Body type**, that surely will be present on other requests (on this one the response body is null)
- It's important to mock success and failure outcomes so we can test if the UI is responding well on both scenarios.

Check this MDN documentation to know how to handle the HTTP response status.
https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status

With this final mock, if try to make a sign-in with the `johndoe@example`, the request will return a `status:200`. We can check all the details on the network tab and the UI will respond accordingly (toarts, alerts, etc.)

## Nock with data on response

```ts
import { http, HttpResponse } from 'msw'
import type { getProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, getProfileResponse>(
  '/me',
  async () => {
    return HttpResponse.json(
      {
        id: 'mock-id-string',
        name: 'Mock Name',
        email: 'mock@mail.com',
        phone: '1234567890',
        role: 'manager',
        createdAt: new Date(),
        updatedAt: null,
      },
      { status: 200 },
    )
  },
)
```

Notes:

- On the response, we don't use `new` before `HttpResponse`. In this case, we're just using a helper function, not creating a new object by it's class.
  **when returning using `new`, DON'T FORGET THE `null` RESPONSE BEFORE THE STATUS**
- Again the response typing is on the third position of the generics

# End-2-End tests with PlayWright

End-to-End tests simulate real user interactions with the application in a production-like environment. They validate that the system works as a whole — including frontend, backend, APIs, authentication, and integrations — and ensure that critical user flows function correctly from start to finish.

🎯 Purpose

- Verify that all parts of the system work together as expected
- Catch regressions in full **workflows** (e.g., sign in, create item, view dashboard)
- Provide confidence for production releases

  🧱 What E2E Tests Cover

- User interface behavior and visual feedback
- Backend request handling and data flow
- External services (mocked or stubbed)
- Error states and edge cases

🛠️ Tools Used
(Adapt this section to your stack)

- **Playwright** for browser automation and UI interaction
- **MSW** to mock Mock servers on test environments

Check MSW Documentation on how to set up and create the api mocks

## Installation and Documentation

```bash
npm init playwright@latest
```

[Documentation](https://playwright.dev/docs/intro)

## Initial Setup

1 - On the `playwright.config.ts` file, there are some settings. On `projects` there os a list of all the available browsers.
During the initial setup and as we create the first tests, this entire section can be left commented and PlayWright will use a default browser. As we start actually using these browsers, we just need to uncomment.

Uncomment the `webServer` section, this are the configurations for local server testing, that we're going to initially use.

we can also Comment (or delete) the following options on the file:

- `reporter`: we're going to see the reports on the terminal, no need to create an HTML for it
- `use.trace`: same reason

**Other setup options**

- `use.baseUrl`: UNCOMMENT - this is where the tests are running. We can use the same port as the test environment.
- `webServer.command`: The command to run the test environment: `npm run dev:test`
- `reuseExistingServer`: is going to be used only on CI environment. Here we are going to use the already running test server.

_If we want to use any custom extension othen than `.spec.ts` (for instance: `.e2e-spec.ts` to separate the end-2-end tests), it's necessary to add a config line to the file:_

```ts
testMatch: /.*\.e2e-spec\.ts$/ // Regex that means any file with extension .e2e-spec.ts
```

To run PlayWright, run on the terminal:

```bash
npx playwright test --ui
```

_use the `--ui` flag will open PlayWright's User Interface (if not, all the reports are going to appear on the terminal)_

## First E2E test

The testing here works very similarly to the Vitest / Jest ones. Instead of `screen`, there is `page`, instead of the Test Playground we have the PlayWright UI to get the queries.

Here's an example from Pizza Shop App, for future reference (read comments for futher info):

```ts
import { test, expect } from '@playwright/test'

test('sign-in success case', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })
  // it's using the baseUrl set on PlayWright config file
  // waitUntil can set a milestone for us to reach until the test set this step as complete (networkIdle means that we're going to way that every js network request is done)

  await page.getByRole('textbox').fill('johndoe@example.com')
  await page.getByRole('button', { name: 'Log-in' }).click()

  const toast = page.getByText('Login success')

  expect(toast).toBeVisible()

  await page.waitForTimeout(2000) // just to create a posterior marker in order to Playwright to render the last expected page - It's a bug from playwright that cut the final snapshot
})
test('sign-in fail case - wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('textbox').fill('notjohndoe@example.com')
  await page.getByRole('button', { name: 'Log-in' }).click()

  const toast = page.getByText(`There was an error by updating. Try again`)

  expect(toast).toBeVisible()

  await page.waitForTimeout(2000)
})
test('navigate to new restaurant form', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Create an account' }).click()

  expect(page.url()).toContain('sign-up')
})
```

### Notes:

- No need to create userEvents, they already exist on PlayWright;
- It's simples to check url and params without any helpers;

## Locators

Locators is a way to search for an item on the DOM, independently of it's visibility
On the following test, locator is used to track all of the items with the status pending. After filtering using a combobox selector, the locator looked all the table rows and the combobox button text (that rendered the selected option), but it also found the option itself, even if it's not visible.

```ts
test('filter by status - pending', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })
  await page.getByRole('combobox').click()
  await page.waitForTimeout(500)
  await page.getByRole('option', { name: 'Pending' }).click()
  await page.waitForTimeout(500)
  await page.getByRole('button', { name: 'Filter results' }).click()
  await page.waitForTimeout(500)
  const pendingStatusLocators = page.locator('text=Pending')
  await expect(pendingStatusLocators).toHaveCount(12) //12 because it counts the 10 items, the combobox button and the option inside of it. Locator finds everything on the DOM, even if it's not visible. So the length is 12. I could iterate on each item and assert it's visibility, one would return an error.
  statusArray.forEach(async (status) => {
    if (status !== 'pending')
      await expect(page.getByText(status)).not.toBeVisible()
  })
  await page.waitForTimeout(500)
})
```

So 10 rows + button + option = 12 instances, only 11 visible. The assertion was not about the visibility, but the length of the locator array length.

I could use the `.all` selector instead:

```ts
const pendingInstances = await page.getByText('Pending').all()
expect(pendingInstances).toHaveLength(12) //passed
```

Again the locator also found the hidden option. The assertion was again not about visibility

I could be even more specific 👍, and locate the instances by the role `cell`. So it's going to return an array with length 10:

```ts
const pendingInstances = await page.getByRole('cell', { name: 'Pending' }).all()
expect(pendingInstances).toHaveLength(10)
```

_Note: the number 10 is because of the pagination, it's set to 10 items per page_
