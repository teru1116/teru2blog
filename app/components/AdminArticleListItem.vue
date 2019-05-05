<template>
  <li>
    <a @click="onSelect(article.id)">
      <h3>{{ article.title }}</h3>
      <div>
        <div>{{ article.isPublished ? '公開中' : '非公開' }}</div>
        <time>{{ createdDateString }}</time>
        <div>{{ article.commentCount }}</div>
      </div>
      <!-- 編集 -->
      <!-- 非公開-->
      <!-- 削除 -->
    </a>
  </li>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: {
        id: '',
        title: '',
        createdDate: new Date(),
        commentsCount: 0,
        isPublished: true
      }
    }
  },
  computed: {
    createdDateString () {
      const createdDate = this.article.createdDate.toDate()
      return `${createdDate.getFullYear()}/${createdDate.getMonth() + 1}/${createdDate.getDate()}`
    }
  },
  methods: {
    async onSelect (articleId) {
      await this.$store.dispatch('admin/article/fetchArticle', articleId)
      this.$router.push(`${article.id}/preview`)
    }
  }
}
</script>