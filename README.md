# ミルミル

お菓子やジュースなどの間食で無駄遣いをしている人に

食費と摂取カロリーを可視化して罪悪感をもってもらい、無駄遣いをやめるきっかけを作るための

節約＆ダイエット応援サービスです

![main-image](https://user-images.githubusercontent.com/89057417/155137168-6458863d-1df6-4747-9194-422cd22c3932.png)

### なぜこのサービスを作りたいのか？

私はコンビニで間食としてお菓子やジュースなどの無駄遣いをすることがよくあります。
罪悪感を感じつつも、中々やめられないでいました。
そこで、そういった無駄遣いをするごとに金額とカロリーを記録して可視化したり、無駄遣いしすぎていると通知がきたりするサービスがあれば危機感をもってやめられると考え、このサービスを作りました。
無駄遣いしたくない人の節約や、痩せたい人のダイエットのお役に立てれば嬉しいです。
<br />

# アプリのURL

https://www.mirumiru-line.com/top
<br />

# このアプリについて

#### メインのターゲットユーザー

- 間食をやめて節約したい人
- 間食をやめて痩せたい人

#### ユーザーが抱える課題

- 無駄なお金を使ってしまう
- 無駄なカロリーを摂取してしまう
- 無駄遣いがやめられない

#### 解決方法

- 食費と摂取カロリーを記録して、カレンダーや表を使って無駄遣いを可視化する
- 目標値を設定し、無駄遣いしすぎていると警告の通知する
<br />

# 機能一覧

- ユーザー特定機能(LINE API、axios)
- カレンダー機能(FullCalendar)
- 無駄遣いの一覧、作成、更新、削除機能(LIFF、axios)
- 無駄遣いのお気に入り機能(LIFF、axios)
- 無駄遣いの通知機能(messaging API)
- Foodの名前入力のサジェスト機能(react-autosuggest)
- バーコード読み取り機能(Quagga2)
- グラフ機能(recharts)
- スクロール機能(react-scroll)
- ルーティング機能(react-router-dom)
- 日付表示(dayjs)
<br />

# 使用技術

#### バックエンド
- Ruby 3.0.2
- Rails 6.1.4

#### フロントエンド
- HTML/CSS/SASS
- React 17.0.2
- TypeScript 4.5.5
- Chakra UI

#### データーベース
- PostgreSQL

#### テスト
- RSpec
<br />

# 画面遷移図

https://www.figma.com/file/SbIYHkDvhoVp4yWFkVP0AN/%E7%84%A1%E9%A7%84%E9%81%A3%E3%81%84%E3%82%A2%E3%83%97%E3%83%AA?node-id=0%3A1
<br />

# ER図

https://drive.google.com/file/d/1TZsKM8p3CQ4uPRDeSpvWV77ezhEezwMS/view?usp=sharing
<br />
