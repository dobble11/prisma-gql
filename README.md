# prisma-gql

这是以类型安全为目标的全栈 monorepo 模版，采用 GraphQL 作为数据交换层，并通过 [@graphql-codegen/cli](https://the-guild.dev/graphql/codegen) 将编写的查询 gql 生成前端请求 Hook 代码。

数据库访问由 ORM [prisma](https://www.prisma.io/) 驱动，通过 [pothos](https://pothos-graphql.dev/) 构建 code-first GraphQL schema，结合 pothos prisma 插件实现类型从数据库模型映射到 GraphQL，再映射到前端查询 Hook，保证了整个链路类型的安全。

> 此模版包含用户登录并查询 User 表的最小 DEMO 代码

## 预览

![preview](https://raw.github.com/dobble11/aseets/master/prisma-gql-demo.gif)

## 项目结构

- `apps/client`: 客户端根目录
- `apps/server`: 服务端根目录
- `packages/eslint-config-custom`: ESLint 基础配置
- `packages/tsconfig`: TypeScript 配置，包含服务端、React 应用、React Library 配置

## 主要技术栈

客户端

- React + Vite + [@tanstack/react-query](https://tanstack.com/query/latest) + [@vanilla-extract/css](https://vanilla-extract.style/documentation/getting-started/)

服务端

- [@apollo/server](https://www.apollographql.com/docs/apollo-server/) - GraphQL 服务器，底层基于 Express
- [pothos](https://pothos-graphql.dev/) - 构建 code-first GraphQL schema
- [prisma](https://www.prisma.io/) - ORM
- [pino](https://getpino.io/) - 日志打印库

仓库

- [turbo](https://turbo.build/repo/docs) - monorepo 构建系统
- [pnpm](https://pnpm.io/) - 包管理器

## 开始

### 安装依赖

```sh
pnpm i
```

### 配置服务端环境变量

新建 `apps/server/.env` 文件，输入以下内容

```env
SERVER_PORT=4010
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/prisma-gql?schema=public

# 通过 docker compose 启动时需要配置
PG_USER=postgres
PG_PASSWORD=postgres
```

> 以上数据库信息可以根据自身情况进行配置

### 准备服务端依赖服务

如果没有 postgres 服务，可以单独启动或者使用 docker compose 启动

```sh
# 单独启动
docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres

# 使用 docker compose
cd apps/server
docker compose up -d
```

### 创建数据库并生成访问代码

```sh
cd apps/server
pnpm prisma db push

# 初始化用户
pnpm tsx ./scripts/seed.ts
```

### 启动服务

```sh
# 仓库根目录下
pnpm dev
```

## server 代码结构

以**资源**为维度组织成不同目录，读写分开定义

### resolvers

定义所有接口信息，划分为 3 个文件

- model：定义 GraphQL 类型
- query：查询字段
- mutation：更新字段

默认所有字段需要登录才能访问，可以通过设置 `skipTypeScopes: true` 跳过，例如 [login](https://github.com/dobble11/prisma-gql/blob/main/apps/server/src/resolvers/user/mutation.ts#L19) 字段，更多 auth 高级用法查看 [@pothos/plugin-scope-auth](https://pothos-graphql.dev/docs/plugins/scope-auth)

### entities

对应资源操作的业务逻辑，resolver 负责调用，划分为 query、mutation、index 3 个文件，其中 index 用于组合两个 class 并导出 entity  实例化对象

其中 public auth 访问方法固定第一个参数 `executor` 用于获取 ctx 的用户信息
