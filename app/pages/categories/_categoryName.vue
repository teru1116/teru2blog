<template>
  <div class="inner">
    <section id="article-list-recent">
      <h2>{{ $route.params.categoryName }}<hr class="gradation" /></h2>
      <ol>
        <ArticleListItem
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
        />
      </ol>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArticleListItem from './../../components/ArticleListItem'

export default {
  components: {
    ArticleListItem
  },
  computed: {
    ...mapState({
      articles: state => state.category.articles
    })
  },
  methods: {
    fetchArticles () {
      this.$store.dispatch('category/fetchArticles', this.$route.params.categoryName)
    }
  },
  created () {
    this.fetchArticles()
  },
  layout: 'site'
}
</script>

<style lang="scss" scoped>
//
</style>

