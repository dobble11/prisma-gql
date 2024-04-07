FROM node:18.20.0
WORKDIR /usr/src/prisma-gql
EXPOSE 4010
RUN npm install pnpm@8.15.5 --location=global
COPY .npmrc package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/eslint-config-custom/package.json ./packages/eslint-config-custom/
COPY packages/tsconfig/package.json ./packages/tsconfig/
COPY apps/server/package.json ./apps/server/
RUN pnpm i --frozen-lockfile
COPY . .
RUN pnpm build
WORKDIR /usr/src/prisma-gql/apps/server
ENTRYPOINT ["pnpm", "start"]
