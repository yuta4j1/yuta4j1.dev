---
title: 'ポートのリリース方法'
excerpt: ''
emoji: 'face_in_clouds'
date: '2023.7.8'
tags: 'network'
ogImage:
  url: ''
---

processをkillしてもポートが占有されることがたまにあるので、ポートの解放の仕方を残しておく。

```lsof``` コマンドで、ポートの占有状況を確認できる。
ポート番号で以下のように絞り込んで調べることができる。


```
lsof -P -i:3001

COMMAND   PID   USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    80932 yozaki   23u  IPv6 0xa98c9a97e82d8dc1      0t0  TCP *:exlm-agent (LISTEN)
```

PIDが出力されるので、 kill することでポートが解放される。

```
kill -9 80932
```
