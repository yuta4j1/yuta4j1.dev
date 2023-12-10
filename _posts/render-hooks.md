---
title: '凝集性を高める Render Hooks パターン'
excerpt: ''
emoji: 'face_in_clouds'
date: '2023.12.10'
tags: 'web frontend,architecture'
ogImage:
  url: ''
---

## Render Hooks パターンとは

Hooks からコンポーネントを返すパターン。  
出自はこちら。

https://engineering.linecorp.com/ja/blog/line-securities-frontend-3

（※ Render Hooks パターンはこちらの記事で独自に命名された設計パターンであり、公式名は存在しない（はず））

コードにするとこんな感じ。

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
```

Hooks を呼ぶ側はこうなる。

```tsx
// SampleComponent.tsx
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

## 何が嬉しいの？

一言で言うと、**独立可能なコンポーネントの凝集性が高くなる。**

もしこの Hooks パターンを採用しなかった場合、 モーダルを利用する SampleComponent の実装は以下のようになる。

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

## 注意点

Render Hooks パターンでは、**コンポーネントを返してはいけない。**  
必ず、ReactElement を返す関数を返すパターンで実装すること。  
なぜなら、レンダリングコストが嵩んでしまうからだ。

// TODO リポジトリ動作確認

https://github.com/microcmsio/react-hooks-use-modal
