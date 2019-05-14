<template>
  <div class="inner columns-wrapper">
    <section id="article-list-monthly">
      <h2>{{ `${year}年${month}月` }}<hr class="gradation" /></h2>
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
section#article-list-monthly {
  @media screen and (min-width: 600px) {
    min-width: 816px;
  }
  @media screen and (max-width: 599px) {}
}
</style>

