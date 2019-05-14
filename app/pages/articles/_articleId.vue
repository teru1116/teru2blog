<template>
  <div class="inner columns-wrapper">
    <article>
      <ArticleContent class="article-body" />
      <!-- コメント一覧 -->
      <section class="comment-list">
        <h3>コメント</h3>
        <CommentListItem v-for="(comment, index) in comments" :key="index" :comment="comment" />
      </section>
      <!-- コメント投稿 -->
      <section class="input-comment">
        <CommentEditor v-on:onCommentPost="fetchComments" />
      </section>
    </article>
    <aside>
      <SectionCategory />
      <SectionMonthly />
    </aside>
  </div>
</template>

<script>
import ArticleContent from './../../components/TheArticleContent'
import CommentListItem from './../../components/ArticleCommentListItem'
import CommentEditor from './../../components/TheCommentEditor'
import SectionCategory from './../../components/TheSectionCategory'
import SectionMonthly from './../../components/TheSectionMonthly'

export default {
  components: {
    ArticleContent,
    CommentListItem,
    CommentEditor,
    SectionCategory,
    SectionMonthly
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
  flex: 1;
  margin-bottom: 40px;
  .article-body {
    margin-bottom: 40px;
  }
}
</style>
