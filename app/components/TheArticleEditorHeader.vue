<template>
  <header class="page-header admin">
    <div class="inner">
      <div class="header-left-wrapper">
        <h1>
          <nuxt-link to="/admin/articles">管理画面</nuxt-link>
        </h1>
      </div>
      <div class="header-right-wrapper">
        <nav>
          <ul>
            <li v-if="showsPreviewButton">
              <nuxt-link :to="`${$route.params.articleId || 0}/preview`">プレビュー</nuxt-link>
            </li>
            <li v-if="showEditButton">
              <nuxt-link :to="editPagePath">編集に戻る</nuxt-link>
            </li>
            <li v-if="showsSaveButton">
              <button>下書き</button>
            </li>
            <li>
              <button class="submit">投稿</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    showsPreviewButton () {
      return this.$route.name !== 'admin-articles-articleId-preview'
    },
    showEditButton () {
      return this.$route.name === 'admin-articles-articleId-preview'
    },
    editPagePath () {
      return this.$route.params.articleId === '0' ? `/admin/articles/new` : `/admin/articles/${this.$route.params.articleId}/edit`
    },
    showsSaveButton () {
      return this.$route.name === 'admin-articles-new' || this.$route.name === 'admin-articles-articleId-preview'
    }
  }
}
</script>


<style lang="scss" scoped>
header {
  background-color: #fff;
  z-index: 10;
  @media screen and (max-width: 599px) {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
  }
  .inner {
    .header-left-wrapper {}
    .header-right-wrapper {
      nav {
        ul {
          li {
            @media screen and (min-width: 600px) {}
            @media screen and (max-width: 599px) {
              font-size: 14px;
            }
            button.submit {
              color: #fff;
              padding: 2px 8px;
            }
          }
        }
      }
    }
  }
}
</style>
