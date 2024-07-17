* [これを読めばGraphQL全体がわかる。GraphQLサーバからDB、フロントエンド構築 | アールエフェクト](https://reffect.co.jp/html/graphql)
* [Prisma を使った効率的なバックエンド開発ワークフロー](https://zenn.dev/optimisuke/articles/387b30c547ac54)

## command
```
mkdir graphql-apollo-server
cd graphql-apollo-server
npm init -y
npm install apollo-server graphql
touch index.js
npm install --save-dev nodemon
npx nodemon index.js

cat << EOF >! index.js
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query{
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello World',
  },
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
EOF

npm install prisma --save-dev
npx prisma init
.envを編集(SQLiteデータベースを利用するのでprismaフォルダに空のdev.dbファイルを作成します)
schema.prismaを編集
npx prisma migrate dev
npx prisma generate
npx prisma studio(ユーザーのデータを1件追加)
```

## resolver
helloをQueryタイプに追加し、helloはStringの型を戻すことはわかりましたがどのような文字列が戻されるのかもわかりません。
Queryタイプで定義した戻り値の型通りにどのように処理を行うのかを記述するのがresolver(リゾルバ)です。
リゾルバの関数にはparent, args, context, infoの4つ引数を受け取ります。

## 特徴
GraphQLではフィールドをクライアント側で選択できるのがREST APIと大きく異なる特徴の一つです。
