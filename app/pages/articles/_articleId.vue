<template>
  <div class="inner columns-wrapper">
    <article>
      <ArticleContent class="article-body" :article="article" />
      <!-- コメント一覧 -->
      <section class="comment-list">
        <h3>コメント</h3>
        <CommentListItem v-for="(comment, index) in article.comments" :key="index" :comment="comment" />
      </section>
      <!-- コメント投稿 -->
      <section class="input-comment">
        <CommentEditor v-on:onCommentPost="$store.dispatch('article/fetchComments')" />
      </section>
    </article>
    <aside>
      <SectionCategory />
      <SectionMonthly />
    </aside>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
  computed: {
    ...mapState({
      article: state => state.article
    })
  },
  created () {
    this.$store.dispatch('article/fetchArticle', this.$route.params.articleId)
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
