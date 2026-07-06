# Celebrity Name Chain

This is a full-stack multiplayer game built with Ionic React, Express, Prisma, and PostgreSQL. One player creates a game room, and other players join the room to continue the celebrity name chain.

## Database

Restore the `dump.sql` file from the `data` folder into PostgreSQL using pgAdmin.

## Environment Setup

Create a `.env` file in the `api` folder and add your `DATABASE_URL`.

Create a `.env` file in the `client` folder and add your `VITE_API_URL`.

## Run the API

```bash
cd api
yarn install
yarn prisma:migrate
yarn dev
```

## Run the Client

```bash
cd client
yarn install
yarn dev
```

Open:

```text
http://localhost:5175
```

## Play Together

Run the API first, then expose it with ngrok:

```bash
ngrok http 3000
```

Copy the ngrok URL and use it as the `VITE_API_URL` in the client.

## AI Use

We used AI someplace to help us understand the project requirements, fix coding errors, and explain programming concepts. Also we researched and ask for help from TA for fixed some place.  We reviewed and tested the code before adding it to the project.