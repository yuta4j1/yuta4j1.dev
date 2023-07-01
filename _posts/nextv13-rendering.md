---
title: 'Next.js ver.13 のSSR / SSG(ISR)がどのように変わったのか'
excerpt: 'React Server Componentがデフォルトになったらしい。
それは、これまでのNext.jsのSSR / SSGにどのように影響したのか？
React Server Component を理解できていなかったので調べてみた。'
coverImage: '/assets/blog/hello-world/cover.jpg'
emoji: 'owl'
date: '2023.2.11'
tags: 'web frontend'
ogImage:
  url: ''
---

React Server Componentがデフォルトになったらしい。
それは、これまでのNext.jsのSSR / SSGにどのように影響したのか？
React Server Component を理解できていなかったので調べてみた。

## Next.jsのこれまでのSSR

まず、これまでのNext.jsのServer Side Renderingについて振り返る。

SSRする場合は、```getServerSideProps``` をページコンポーネントの中で定義。
SSGの場合は、```getStaticProps``` or ```getStaticPaths``` を定義する必要があった。

pageコンポーネントの中で定義されているそれらの関数を判別して、それぞれのページがSSRするのか、SSGするのかの判定を行なっていた。

## React Server Component

Next.js ver.13から、React Server Componentが defaultとなった。
あくまでReact Server Componentがデフォルトとなっただけで、React Server Componentがページ自体のSSRを表すものではない。その名の通り、コンポーネント単位でSSRができるようになっている。

では、React Server ComponentがデフォルトになったことでUI/UXにどのような影響を与えるか？

React Server Componentは、コンポーネント -> ReactElement への変換を行うのみで、厳密にレンダリングはクライアント側で行なっている。

こうすることで、コンポーネントのレンダリングに必要な重い処理やライブラリをサーバ側で予めレンダリングしておき、クライアントからは描画結果を取得してくるのみで済む。

クライアント側に送るJavaScriptのコード量を減らすことができる。

また、あくまでReactElementを返すので、clientコンポーネントをserverコンポーネントに含むことができる。（逆はできない）

それだけでなく、Reactコンポーネントにisormorphismが生まれる。
どういうことかというと、これまでのNext.jsは```getServerSideProps``` の内部でデータ取得を行ない、取得結果をコンポーネントにPropsとして渡す必要があった。これに対してReact Server ComponentではHooksを使用するなど、clientコンポーネントと同様の書き味でデータフェッチを表現できるようになった。

```typescript
async function getPosts(): Promise<Post[]> {
  const posts = await getAllPosts(['slug', 'content', 'title', 'date'])
  console.log('getPosts', posts)
  return posts
}

export default async function Home() {
  const recentPosts = await getPosts()
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <PostList posts={recentPosts} />
      </main>
    </div>
  )
}
```




## 動的レンダリングと静的レンダリング
[Next.jsのドキュメント](https://beta.nextjs.org/docs/rendering/static-and-dynamic-rendering)に記載があるので詳しくはそちらを参照。

| Rendering | 説明 |
| -- | -- |
|動的レンダリング | リクエストオンデマンドにレンダリングを行う。SSR。|
|静的レンダリング | Next.jsサーバのビルドタイミングにてレンダリングを行う。SSG。|

ver13からは、以下の特徴となった。

- デフォルトで静的レンダリング
- [動的関数](https://beta.nextjs.org/docs/rendering/static-and-dynamic-rendering#using-dynamic-functions) （```cookies()```, ```headers()```）がページコンポーネントにて呼び出されている場合のみ、それを検知して動的レンダリング（SSR）となる。

## React Server Componentの振る舞いの違い
では、React Server ComponentはSSR/SSGの場合振る舞いにどう違いが生じるのか？これも公式ドキュメントに記載があります。
https://nextjs.org/docs/app/building-your-application/rendering#static-rendering

（TODO: 要検証）
SSRの場合、React Server Componentの恩恵を特に感じられる（レンダリング時に返されるJavaScriptコードが減る？）

SSR、SSGいずれもReactElementを返す。SSRはキャッシュが効かず、常に再取得を行う。SSGはキャッシュからデータ（出来上がったReactElement）を返すのみとなる。



## UI/UX面でのメリット
SSR/SSGはこれまでの挙動からUI/UX面でどういった変化があるか？が不明瞭。
TODO: 要検証
（挙動自体はそんなに変化はないのではないか？これまでも、React Server Component と同様のことはSSRで行なっていたはず。）


では、何のためのReact Server Component？
以下推測。
- コンポーネントのIsormorphism
- Server 実行とclient実行の明確な区分けがなかった。これまでは、ページコンポーネントでnot-universalなコードを書くとランタイムエラーで怒られるなどしており、それがユーザフレンドリーな設計じゃなかった？
- 今後Reactの仕様となるであろう機能を、VercelがNext.jsによい形で組み込んだ

と、どちらかというとフレームワークの書き味的な部分が大きいのかもしれないと思った。






