# informanellica.github.io

Informanellica が公開するソフトウェアのカタログ。

公開URL: <https://informanellica.github.io/>

## 構成

- `index.html` — トップ。各ソフトをカード形式で並べる
- `assets/css/custom.css` — 共通スタイル
- `assets/img/` — 各ソフトのアイコン・スクリーンショット

各ソフトの **詳細ページ・マニュアル・更新履歴** はそれぞれのリポジトリの `docs/` で配信する。
たとえば `benri-na-pdf` の詳細は <https://informanellica.github.io/benri-na-pdf/> から。

## ソフトを追加するとき

1. `assets/img/<software>-screenshot.png` (16:9 推奨) と `assets/img/<software>-icon.png` を置く
2. `index.html` の `<div class="album">` 内に新しい `<div class="col">` カードを追加
3. リンク先は `https://informanellica.github.io/<repo>/` (各ソフトの GitHub Pages)
4. ダウンロードは `https://github.com/informanellica/<repo>/releases/latest` を指す

## 公開

GitHub の Settings → Pages で「Deploy from a branch: main / root」に設定。`git push` でデプロイされる。
