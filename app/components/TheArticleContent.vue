<template>
  <section>
    <header class="article-header">
      <div class="article-metadata">
        <ul class="category-list">
          <li v-for="(categoryName, index) in article.selectedCategories" :key="index">
            <nuxt-link :to="`/categories/${categoryName}`">{{ categoryName }}</nuxt-link>
          </li>
        </ul>
        <time>{{ createdDateString }}</time>
      </div>
      <h2>{{ article.title }}<hr /></h2>
    </header>
    <section class="wysiwyg" v-html="article.contentHTML" />
  </section>
</template>

<script>
export default {
  computed: {
    article () {
      return this.$store.state.admin.article.displayingArticle
    },
    createdDateString () {
      return `${this.article.createdDate.getFullYear()}.${this.article.createdDate.getMonth() + 1}.${this.article.createdDate.getDate()}`
    }
  },
  created () {
    if (this.$route.name === 'articles-articleId') {
      this.$store.dispatch('admin/article/fetchArticle', this.$route.params.articleId)
    }
  }
}
</script>

<style lang="scss" scoped>
.article-header {
  margin: 30px 0 35px;
  .article-metadata {
    display: flex;
    ul {
      display: flex;
      li {
        margin-right: 4px;
        a {
          color: #0052A3;
          font-size: 15px;
        }
        &:after {
          content: ",";
        }
        &:last-child {
          &:after {
            content: "  |  ";
          }
        }
      }
    }
  }
  h2 {
    font-size: 30px;
    font-weight: bold;
    line-height: 45.46px;
    letter-spacing: 2.1px;
    hr {
      background-color: #0070c9;
      background: linear-gradient(#42a1ec, #0070c9);
      height: 2px;
      border: 0;
    }
  }
}
</style>
