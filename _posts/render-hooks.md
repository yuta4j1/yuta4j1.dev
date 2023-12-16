---
title: '凝集性を高める Render Hooks パターン'
excerpt: ''
emoji: 'hook'
date: '2023.12.10'
tags: 'web frontend,architecture'
ogImage:
  url: ''
---

## Render Hooks パターンとは

Hooks からコンポーネントを返すパターン。  
出自はこちら。

https://engineering.linecorp.com/ja/blog/line-securities-frontend-3

（※ Render Hooks パターンはこちらの記事で独自に命名された設計パターンであり、公式名は存在しない）  
（※ また、React 公式はこのパターンを提唱していないし言及もしていない）

例をコードにするとこんな感じ。

```ts
// useModal.ts
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])
  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const renderModal: (props: { text: string }) => ReactElement = useCallback(
    ({ text }) => {
      return (
        <Modal isOpen={isOpen}>
          <h1>モーダル</h1>
          <span>{text}</span>
          <button onClick={onClose}>閉じる</button>
        </Modal>
      )
    },
    [isOpen, onClose]
  )

  return { renderModal, onOpen }
}

// SampleComponent.tsx （Hooks を呼び出す側のコンポーネント）
const SampleComponent = () => {
  const { renderModal, onOpen } = useModal()
  return (
    <div>
      <button onClick={onOpen}>モーダルを開く</button>
      {renderModal()}
    </div>
  )
}
```

## Render Hooks パターンのメリット

- **独立可能なコンポーネントの凝集性を高められる**
  - Hooks は jsx 以外のコンポーネントにまつわるステートやロジックをまとめてくれるが、コンポーネントも一緒に外だししたくなる場合がある
- あくまで設計面でのうれしさ
  - パフォーマンス的には影響しない（ただし、[注意が必要](#%F0%9F%9A%A8%20%E6%B3%A8%E6%84%8F%E7%82%B9)）

### Render Hooks パターンが浮かぶまでの思考

もしこの Render Hooks パターンを採用しなかった場合、 モーダルを利用する SampleComponent の実装は以下のようになる。

```tsx
// SampleComponent.tsx
const SampleComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <Modal isOpen={isOpen} />
    </div>
  )
}
```

これはシンプルなコンポーネントなので違和感はないが、ここに「SampleComponent で管理すべきステート」が多数並んでいる重厚なコンポーネントを想像してほしい。

```tsx
// SampleComponent.tsx
const SampleComponent = () => {
  const [user, setUser] = useState<User>()
  const [showToaster, setShowToaster] = useState(false)
  const [bookList, setbookList] = useState<Book[]>([])
  // ...多数ステートが並ぶ
  // Modal のステート
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <div>
        {showToaster && (
          <Toaster message="Success!" onClose={() => setShowToaster(false)} />
        )}
        <div>
          <h3>User Information</h3>
          {user ? (
            <div>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              {/* 他のユーザー情報 */}
            </div>
          ) : (
            <p>No user data available.</p>
          )}
        </div>

        <div>
          <h3>Book List</h3>
          <ul>
            {bookList.length > 0 ? (
              bookList.map((book, index) => (
                <li key={index}>
                  {book.title} by {book.author}
                  {/* 他の書籍情報 */}
                </li>
              ))
            ) : (
              <p>No books available.</p>
            )}
          </ul>
        </div>
      </div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} />
    </div>
  )
}
```

「isOpen」と言う名前のステートが、一体何を指すのか一見してわかりにくくなる。  
もちろんステートの命名を見直しても良いが、あくまでモーダル固有のステートであることが明示されていて欲しくなる。  
そこで、Hooks が欲しくなる。
ただし、モーダルの開閉フラグ管理のみ Hooks にまとめるだけでは、 useState をそのまま使うこととなんら変わりない。  
なんとなく、「SampleComponent がモーダルに対して行う操作に関する API だけ露出された Hooks」が欲しくなる。  
そこで Render Hooks パターンが思いつく。ステートに密に関わる JSX の部分も、Hooks の中に閉じ込め、JSX を Hooks から提供する。  
そうすれば、SampleComponent 側で触る必要のある API のみを過不足なく露出させることができる。

例えば、以下の記事がわかりやすい。

https://zenn.dev/mssknd/articles/1046a44b9d9502

ファイルアップロードに必要なロジックは JSX に依存するが、Render Hooks パターンを活用し、JSX ごと Hooks に切り出している。

## 🚨 注意点

Render Hooks パターンでは、 **ReactElement を返す関数を Hooks で提供することが推奨**される。  
なぜならコンポーネントを返すパターンだと、余計なレンダリングコストがかかってしまう。

❌ コンポーネントを Hooks から提供する形。

```tsx
const SampleComponent = () => {
  const { Modal, onOpen } = useModal()
  return (
    <div>
      <button onClick={onOpen}>モーダルを開く</button>
      <Modal />
    </div>
  )
}
```

⭕️ 「ReactElement を返す関数」を Hooks から提供する形。

```tsx
const SampleComponent = () => {
  const { renderModal, onOpen } = useModal()
  return (
    <div>
      <button onClick={onOpen}>モーダルを開く</button>
      {renderModal()}
    </div>
  )
}
```
