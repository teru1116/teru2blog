<template>
  <div>
    <div class="inner columns-wrapper">
      <!-- 最新記事 -->
      <section id="article-list-recent">
        <h2>
          RECENT
          <small>最新記事</small>
          <hr class="gradation" />
        </h2>
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
  </div>
</template>

<script>
import ArticleListItem from './../components/ArticleListItem'
import SectionCategory from './../components/TheSectionCategory'
import SectionMonthly from './../components/TheSectionMonthly'
import { mapState } from 'vuex'

export default {
  components: {
    ArticleListItem,
    SectionCategory,
    SectionMonthly
  },
  computed: {
    ...mapState({
      articles: state => state.articles
    })
  },
  async created () {
    // ブラウザ識別
    const userCredential = await this.$firebase.auth().signInAnonymously()
    this.$store.dispatch('me/setMe', userCredential)

    // 記事取得
    this.$store.dispatch('articles/fetchArticles')
  },
  layout: 'site'
}
</script>

<style lang="scss" scoped>
.inner {
  @media screen and (min-width: 600px) {
    display: flex;
  }
  @media screen and (max-width: 599px) {}
  section#article-list-recent {
    @media screen and (min-width: 600px) {
      flex: 1;
    }
    @media screen and (max-width: 599px) {}
  }
}
section {
  @media screen and (min-width: 600px) {
    margin-bottom: 48px;
  }
  @media screen and (max-width: 599px) {
    margin-bottom: 60px;
  }
}
</style>
