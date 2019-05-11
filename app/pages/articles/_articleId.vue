<template>
  <article>
    <ArticleContent class="article-body" />
    <!-- コメント一覧 -->
    <section class="comment-list inner">
      <h3>コメント</h3>
      <CommentListItem v-for="(comment, index) in comments" :key="index" :comment="comment" />
    </section>
    <!-- コメント投稿 -->
    <section class="input-comment inner">
      <CommentEditor v-on:onCommentPost="fetchComments" />
    </section>
  </article>
</template>

<script>
import ArticleContent from './../../components/TheArticleContent'
import CommentListItem from './../../components/ArticleCommentListItem'
import CommentEditor from './../../components/TheCommentEditor'

export default {
  components: {
    ArticleContent,
    CommentListItem,
    CommentEditor
  },
  data () {
    return {
      comments: []
    }
  },
  methods: {
    async fetchComments () {
      const db = this.$firebase.firestore()
      const articleId = this.$route.params.articleId
      const snapshot = await db.collection('articles').doc(articleId).collection('comments').orderBy('createdDate').get()
      this.comments = []
      snapshot.forEach(doc => {
        const comment = Object.assign({ id: doc.id }, doc.data())
        this.comments.push(comment)
      })
    }
  },
  created () {
    this.fetchComments()
  },
  layout: 'site'
}
</script>

<style lang="scss" scoped>
article {
  margin-bottom: 40px;
  .article-body {
    margin-bottom: 40px;
  }
}
</style>
