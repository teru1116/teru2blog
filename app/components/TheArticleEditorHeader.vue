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
              <nuxt-link :to="`/admin/articles/${$route.params.articleId || 0}/preview`">プレビュー</nuxt-link>
            </li>
            <li v-if="showsBackEditButton">
              <nuxt-link :to="editPagePath">編集に戻る</nuxt-link>
            </li>
            <li v-if="showsSaveButton">
              <button @click="onSaveButtonClick">下書き</button>
            </li>
            <li v-if="showsEditButton">
              <nuxt-link :to="editPagePath">編集</nuxt-link>
            </li>
            <li v-if="showsDeleteButton">
              <button @click="onDeleteButtonClick">削除</button>
            </li>
            <li v-if="showsPostButton">
              <button class="submit" @click="onPostButtonClick">投稿</button>
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
      return this.$route.name === 'admin-articles-new' || this.$route.name === 'admin-articles-articleId-edit'
    },
    showsBackEditButton () {
      return this.$route.name === 'admin-articles-articleId-preview'
    },
    showsEditButton () {
      return this.$route.name === 'admin-articles-articleId'
    },
    showsDeleteButton () {
      return this.$route.name === 'admin-articles-articleId'
    },
    showsSaveButton () {
      return this.$route.name === 'admin-articles-new' || this.$route.name === 'admin-articles-articleId-preview' || this.$route.name === 'admin-articles-articleId-edit'
    },
    showsPostButton () {
      return this.$route.name !== 'admin-articles-articleId'
    },
    editPagePath () {
      return this.$route.params.articleId === '0' ? `/admin/articles/new` : `/admin/articles/${this.$route.params.articleId}/edit`
    }
  },
  methods: {
    onSaveButtonClick () {
      this.$store.dispatch('admin/article/saveArticle', { isTestData: false })
    },
    onDeleteButtonClick () {
      this.$store.dispatch('admin/article/deleteArticle')
    },
    async onPostButtonClick () {
      this.$store.dispatch('admin/article/postArticle', { isTestData: false })
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
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
