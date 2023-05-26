# Shuttly.app

Shuttly is an app to manage the scheduling of shuttles

## How to run

Once acquiring the environment variables and signing up to [Clerk.dev](https://clerk.dev) and [PlanetScale](https://planetscale.com), Install the dependencies by opening a terminal and running:

```sh
pnpm i
```

Once everything is installed run the command

```sh
pnpm dev
```

### Apps and Packages

- `Dashboard`: a [Next.js](https://nextjs.org/) using [PlanetScale's MySql](https://planetscale.com) as a database and [Clerk.dev](https://clerk.dev) for Auth.
- `Docs`: this will be the main docs for shuttly. Right now there is just a placeholder.
- `Driver`: right now this is just a placeholder for once I begin to write the [ReactNative](https://reactnative.dev/) portion.

### Utilities

- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- the rest will be listed later
