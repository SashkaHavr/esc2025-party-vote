# *Eurovision voting with friends*

## About

Deploy the app and choose your favorite contestant from among your friends!

> [!WARNING]
>
> This is not an official voting system, but rather a way for you to choose your favorite song or contestant to share with your friends and relatives.

## Fast local startup

> [!WARNING]
>
> This startup guide is for demonstration/testing purposes and local usage only. Do NOT use in production environments due to lack of security/stability guarantees.

1. Create [.env](./.env) file in the root directory
2. Set **TWITCH_CLIENT_ID** and **TWITCH_CLIENT_SECRET**
3. Run ``docker-compose up --build -d``

## Development setup

1. Install [Node.js](https://nodejs.org/en)
2. Install [pnpm](https://pnpm.io/installation)
3. Install [turbo](https://turborepo.com/docs/getting-started/installation#global-installation)
4. Install [bun](https://bun.sh/docs/installation)
5. Run `pnpm install` in root directory
6. Run `pnpm dev` in root directory
7. Look at console output and set missing environmental variables in [apps/api/.env](./apps/api/.env). Info about environmental variables can be found in [packages/env](./packages/env/)
8. Copy DB environmental variables into [packages/db/.env](./package/db/.env) to work with drizzle-kit