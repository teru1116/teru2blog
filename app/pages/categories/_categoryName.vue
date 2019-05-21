<template>
  <div class="inner columns-wrapper">
    <section id="article-list-category">
      <h2>{{ $route.params.categoryName }}<hr class="gradation" /></h2>
      <ol>
        <ArticleListItem
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
        />
      </ol>
    </section>
    <aside>
      <SectionCategory />
      <SectionMonthly />
    </aside>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArticleListItem from './../../components/ArticleListItem'
import SectionCategory from './../../components/TheSectionCategory'
import SectionMonthly from './../../components/TheSectionMonthly'

export default {
  components: {
    ArticleListItem,
    SectionCategory,
    SectionMonthly
  },
  computed: {
    ...mapState({
      articles: state => state.categoryArticles
    })
  },
  methods: {
    fetchArticles () {
      this.$store.dispatch('categoryArticles/fetchCategoryArticles', this.$route.params.categoryName)
    }
  },
  created () {
    this.fetchArticles()
  },
  layout: 'site'
}
</script>

<style lang="scss" scoped>
section#article-list-category {
  @media screen and (min-width: 600px) {
    min-width: 816px;
  }
  @media screen and (max-width: 599px) {}
}
</style>
