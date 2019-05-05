<template>
  <div>
    <header class="admin">
      <div class="inner">
        <div class="header-left-wrapper">
          <h1>管理画面</h1>
        </div>
        <div class="header-right-wrapper">
          <nav>
            <ul>
              <li>
                <nuxt-link to="edit">編集</nuxt-link>
              </li>
              <li>
                <nuxt-link to="rooms">チャット</nuxt-link>
              </li>
              <li>
                <button>ログアウト</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <main>
      <div class="inner">
        <!-- 記事プレビュー -->
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      article: state => state.admin.article.selectedArticle
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
