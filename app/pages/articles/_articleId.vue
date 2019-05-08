<template>
  <article>
    <ArticleContent />
    <!-- コメント一覧 -->
    <section class="comments">
      <ul>
        <CommentListItem v-for="(comment, index) in comments" :key="index" :comment="comment" />
      </ul>
    </section>
    <!-- コメント投稿 -->
    <section class="input-comment"></section>
  </article>
</template>

<script>
import ArticleContent from './../../components/TheArticleContent'
import CommentListItem from './../../components/ArticleCommentListItem'

export default {
  components: {
    ArticleContent,
    CommentListItem
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
