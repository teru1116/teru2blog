<template>
  <div>
    <div class="inner">
      <!-- 最新記事 -->
      <section id="article-list-recent">
          <h2>
            最新記事
            <hr/>
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
        <!-- カテゴリー -->
        <section id="category-list">
          <h2>
            カテゴリー
            <hr/>
          </h2>
          <ul>
            <li v-for="(categoryName, index) in categories" :key="index">
              <nuxt-link :to="`/categories/${categoryName}`">{{ categoryName }}</nuxt-link>
            </li>
          </ul>
        </section>
      </aside>
    </div>
    <!-- チャットでお問い合わせ -->
    <div class="chatwidget-parent">
      <ChatWidget/>
    </div>
  </div>
</template>

<script>
import ArticleListItem from './../components/ArticleListItem'
import ChatWidget from './../components/ChatWidget'
import { mapState } from 'vuex';

export default {
  components: {
    ArticleListItem,
    ChatWidget
  },
  computed: {
    ...mapState({
      articles: state => state.article.recentArticles,
      categories: state => state.category.categories
    })
  },
  async created () {
    // ブラウザ識別
    const userCredential = await this.$firebase.auth().signInAnonymously()
    this.$store.dispatch('user/updateUser', userCredential)

    // 記事取得
    this.$store.dispatch('article/fetchRecentArticles')

    // カテゴリー取得
    this.$store.dispatch('category/fetchAllCategory')
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
  aside {
    @media screen and (min-width: 600px) {
      width: 200px;
      margin-left: 40px;
    }
    @media screen and (max-width: 599px) {}
    h2 {
      font-size: 14px;
      font-weight: bold;
    }
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
section#category-list {
  ul {
    margin: 16px 0 0;
    li {
      a {
        color: #0052A3;
        padding: 2px 0;
        display: inline-block;
        @media screen and (min-width: 600px) {}
        @media screen and (max-width: 599px) {}
      }
    }
  }
}
.chatwidget-parent {
  position: fixed;
  bottom: 0;
  @media screen and (min-width: 600px) {
    width: 1000px;
    margin: 0 auto;
    left: 0;
    right: 0;
  }
  @media screen and (max-width: 599px) {
    left: 15px;
    right: 15px;
  }
}
</style>
