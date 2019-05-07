<template>
  <section>
    <header class="article-header">
      <div class="article-metadata">
        <ul class="category-list">
          <li v-for="(categoryId, index) in categories" :key="index">
            <nuxt-link :to="`categories/${categoryId}`">{{ categoryId }}</nuxt-link>
          </li>
        </ul>
        <time>{{ createdDateString }}</time>
      </div>
      <h2>{{ title }}</h2>
    </header>
    <section class="wysiwyg" v-html="contentHTML" />
  </section>
</template>

<script>
export default {
  computed: {
    createdDateString () {
      const createdDate = this.createdDate.toDate()
      return `${this.createdDate.getMonth() + 1}/${this.createdDate.getDate()}`
    }
  },
  data () {
    return {
      title: '',
      contentHTML: '',
      categories: [],
      createdDate: new Date()
    }
  },
  methods: {
    async fetchArticle () {
      const db = this.$firebase.firestore()
      const doc = await db.collection('articles').doc(this.$route.params.articleId).get()
      Object.assign(this.$data, doc.data())
    }
  },
  created () {
    // 親コンポーネントが記事ページの場合は、DBからロードする
    if (this.$route.name === 'articles-articleId') {
      this.fetchArticle()
    // 親コンポーネントがプレビューページの場合は、ストアから読み込む
    } else if (this.$route.name === 'admin-articles-articleId-preview') {
      const editingArticle = this.$store.getters['admin/article/article']
      Object.assign(this.$data, editingArticle)
    }
  }
}
</script>
