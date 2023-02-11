---
title: 'Webフロントエンドセキュリティまとめ'
excerpt: 'セキュリティはバックエンドのみの話ではなく、フロントエンド 側でできることが増えた以上、フロントエンド でももちろんセキュリティを意識しなければいけない。フロントエンドエンジニアもセキュリティ意識をしっかり育てていく。'
coverImage: '/assets/blog/hello-world/cover.jpg'
emoji: 'cat'
date: '2023.2.1'
tags: 'web frontend,security'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
---

セキュリティはバックエンドのみの話ではなく、フロントエンド 側でできることが増えた以上、フロントエンド でももちろんセキュリティを意識しなければいけない。フロントエンドエンジニアもセキュリティ意識をしっかり育てていく。

## IPAのセキュリティ被害件数
https://www.ipa.go.jp/files/000090367.pdf

例年通り、WebアプリケーションにおいてはXSSが一番多い。

[これからフロントエンド]
https://speakerdeck.com/hasegawayosuke/korekarafalsehurontoendosekiyuritei?slide=44

[サイボウズ]
https://developer.cybozu.io/hc/ja/articles/201850320-JavaScript%E3%81%A7%E3%82%BB%E3%82%AD%E3%83%A5%E3%82%A2%E3%81%AA%E3%82%B3%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0%E3%82%92%E3%81%99%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AB%E6%B0%97%E3%82%92%E3%81%A4%E3%81%91%E3%82%8B%E3%81%93%E3%81%A8

## XSS

ReactやVueはテンプレートにバインドされるデータに関しては基本的にエスケープされる。

```typescript
const App () => {
  return (
    <div>{'<hogehoge />'}</div>
  )
}
```

```typescript
const App () => {
  return (
    <div>{'&lt;hogehoge /&gt;'}</div>
  )
}
```

上の例はどちらも同じ文字列として出力される。

ただし、全てが安全ではない。

### dangerouslySetInnerHTML

JavaScriptのinnerHTMLと同様、HTMLをそのまま埋め込むことができる。
（XSSの危険性がある。）
原則として、これをどうしても使用したい場合は、
DOMPurifyといったライブラリでサニタイズすることが推奨される。
または自作するなど
（https://github.com/cure53/DOMPurify）

### href属性にユーザ入力が渡される

href属性はエスケープしないため、スクリプトが仕込まれるとコードが実行されてしまう。


### 対策

XSSの被害件数は非常に多い。

悪意のあるユーザからスクリプトを仕込まれないようにする必要がある。
eval関数などの実行関数を使用しない。

### Content-Security-Policy

XSSやデータインジェクション攻撃などの攻撃による影響を抑える。

例えば...

レスポンスヘッダに以下の指定
```
Content-Security-Policy: default-src 'self'
```
をしておくことで、同一オリジンから配信されるリソースのみ許容されることになる。
（それ以外のスクリプトは異なるドメインから読み込んだものだけでなく、インラインスクリプトに関しても動かなくなる。）

つまり、XSSによって差し込まれたスクリプトも実行対象外とすることができる。


## target="_blank"の脆弱性

```html
<a href="hogehoge" target="_blank">
```

リンク押下で別タブ表示する場合、```target="_blank"```と指定する。

ただこうするだけだと、遷移先の画面から、window.openerオブジェクトを使用して遷移元の画面を操作できてしまう。
```javascript
window.opener.location = "http://localhost:8081/"
```
とういうのも、
```
window.opener
```
で開かれたウィンドウは、プロセスとスレッドを共有してしまう。
そのため、遷移先の画面のJavaScriptで重い処理を実行すると、遷移元の画面が重くなってしまうケースがある。

```html
<a href="hogehoge" target="_blank" rel="noopener">
```

https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/


## JavaScriptのコードを生成するものは控える

eval関数はXSSの温床となるため、控える事


## ライブラリはなるべく最新バージョンを使用する

セキュリティパッチが当たっていないバージョンの可能性がある
ライブラリは最新版のものがセキュアであり、かつパフォーマンス改善&バグ修正が進んでいることが多いので、なるべく最新のものを使用する

