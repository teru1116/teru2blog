<template>
  <nav>
    <div class="style-menu">
      <ul>
        <!-- 元に戻す -->
        <li></li>
        <!-- 見出し -->
        <li></li>
        <!-- 太字 -->
        <li></li>
        <!-- リンク -->
        <li></li>
        <!-- 引用 -->
        <li></li>
        <!-- 写真 -->
        <li></li>
        <!-- YouTube動画埋め込み -->
        <li></li>
      </ul>
    </div>
    <div class="artycle-config-menu">
      <ul>
        <!-- アイキャッチ画像 -->
        <li></li>
        <!-- カテゴリ -->
        <li></li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  display: flex;
  position: fixed;
  left: 0px;
  top: 48px;
  width: 100vw;
  height: 48px;
  border-bottom: 1px solid rgba(34,34,34,0.2);
  .style-menu {
    width: calc(100% - 88px);
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .artycle-config-menu {
    width: 88px;
    border-left: 1px solid rgba(34, 34, 34, 0.2);
  }
}
</style>

