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
    <v-snackbar v-model="showSnackbar" :timeout="4000">{{ snackbarMessage }}</v-snackbar>
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
  data () {
    return {
      showSnackbar: false,
      snackbarMessage: ''
    }
  },
  methods: {
    async onSaveButtonClick () {
      try {
        await this.$store.dispatch('admin/editingArticle/saveArticle', { isTestData: false })
        this.snackbarMessage = '下書き保存しました'
      } catch (e) {
        this.snackbarMessage = '下書き保存できませんでした'
        console.error(e)
      } finally {
        this.showSnackbar = true
      }
    },
    async onDeleteButtonClick () {
      const result = window.confirm('記事を削除します。よろしいですか？')
      if (!result) return

      try {
        await this.$store.dispatch('admin/article/deleteArticle', this.$route.params.articleId)
        this.$router.push('/admin/articles')
      } catch (e) {
        this.showSnackbar = true
        this.snackbarMessage = '記事を削除できませんでした'
        console.error(e)
      }
    },
    async onPostButtonClick () {
      try {
        await this.$store.dispatch('admin/editingArticle/postArticle', { isTestData: false })
        this.snackbarMessage = '記事を公開しました'
      } catch (e) {
        this.snackbarMessage = '記事を更新できませんでした'
        console.error(e)
      } finally {
        this.showSnackbar = true
      }
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
              padding: 4px 8px;
            }
          }
        }
      }
    }
  }
}
</style>
