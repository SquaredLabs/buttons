# Squared Buttons

A simple website for keeping track of who's logged in.

## Setup

Configure the `.env` file with an `APP_KEY`. An easy way to generate one would be: `openssl rand -base64 32`.
```sh
$ cp .env.example .env
```

```sh
$ npm install
$ npx lerna bootstrap
$ npx sequelize db:migrate
```

## Development

```sh
$ npm run dev:backend
```
