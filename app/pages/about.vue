<template>
  <section class="inner">
    <h2>
      ABOUT
      <hr class="gradation" />
    </h2>
    <p class="description">
      このサイトは、ブログのデモ環境です。<br />
      管理画面にログインして、記事の編集やチャット問い合わせの対応なども行えます。
    </p>
    <h3>デモ環境</h3>
    <dl>
      <dt>URL</dt>
      <dd>
        <a href="https://teru2blog-staging.firebaseapp.com/" target="_blank">
          https://teru2blog-staging.firebaseapp.com/
        </a>
      </dd>
    </dl>
    <h3>デモ環境（管理画面）</h3>
    <dl>
      <dt>URL</dt>
      <dd>
        <a href="https://teru2blog-staging.firebaseapp.com/admin/auth" target="_blank">
          https://teru2blog-staging.firebaseapp.com/admin/auth
        </a>
      </dd>
      <dt>ログインメールアドレス</dt>
      <dd>39linhlang@gmail.com</dd>
      <dt>ログインパスワード</dt>
      <dd>1qazxsw2</dd>
    </dl>
    <h3>ソースコード</h3>
    <a href="https://github.com/teru1116/teru2blog" target="_blank">
      https://github.com/teru1116/teru2blog
    </a>
    <h3>その他</h3>
    <dl>
      <dt>使用技術</dt>
      <dd>Nuxt.js/Firebase</dd>
      <dt>開発期間</dt>
      <dd>2週間</dd>
    </dl>
  </section>
</template>

<script>
export default {
  layout: 'site'
}
</script>

<style lang="scss" scoped>
section {
  padding-bottom: 40px;
  color: #444;
  font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,Segoe UI,Hiragino Kaku Gothic ProN,ヒラギノ角ゴ ProN W3,Arial,メイリオ,Meiryo,sans-serif;
}
h3 {
  font-size: 16px;
  line-height: 1.75;
  -webkit-font-feature-settings: "palt" 1;
  font-feature-settings: "palt" 1;
  letter-spacing: .04em;
  font-weight: 600;
  margin: 16px 0 8px;
}
p {
  font-size: 14px;
  line-height: 18px;
  margin: 16px 0 0;
}
a {
  text-decoration: underline;
}
dl {
  @media screen and (min-width: 600px) {}
  @media screen and (max-width: 599px) {}
  dt {
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 4px;
    @media screen and (min-width: 600px) {}
    @media screen and (max-width: 599px) {}
  }
  dd {
    margin-bottom: 16px;
    @media screen and (min-width: 600px) {}
    @media screen and (max-width: 599px) {}
  }
}
</style>

