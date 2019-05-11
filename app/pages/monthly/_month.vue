<template>
  <div class="inner">
    <section id="article-list-recent">
      <h2>{{ `${year}年${month}月` }}<hr class="gradation" /></h2>
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
      articles: state => state.monthly.articles
    }),
    year () {
      return Number(this.$route.params.month.substr(0, 4))
    },
    month () {
      return Number(this.$route.params.month.substr(5, 2))
    }
  },
  methods: {
    fetchArticles () {
      this.$store.dispatch('monthly/fetchArticles', { year: this.year, month: this.month })
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

