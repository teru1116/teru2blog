<template>
  <li>
    <article>
      <a @click="onSelect(article.id)">
        <div class="summery">
          <!-- 公開/非公開 -->
          <div class="publish-status" :class="article.isPublished ? 'public' : 'private'">{{ article.isPublished ? '公開中' : '非公開' }}</div>
          <!-- アイキャッチ画像 -->
          <div class="icatch-photo" :style="{ backgroundImage: `url(${article.icatchImageDataURL})` }" />
          <!-- タイトル -->
          <h3>{{ article.title }}</h3>
        </div>
        <div class="metadata">
          <!-- カテゴリー -->
          <div class="category-list-wrapper">
            <ul class="category-list">
              <li v-for="(categoryName, index) in article.categories" :key="index">
                {{ categoryName }}
              </li>
            </ul>
          </div>
          <!-- 日時 -->
          <div class="time-comment">
            <time>{{ createdDateString }}</time>
            <!-- コメント数 -->
            <div class="comment-count">{{ article.commentCount }}</div>
          </div>
        </div>
      </a>
    </article>
  </li>
</template>

<script>
export default {
  props: {
    article: Object
  },
  computed: {
    createdDateString () {
      const createdDate = this.article.createdDate.toDate()
      return `${createdDate.getFullYear()}.${createdDate.getMonth() + 1}.${createdDate.getDate()}`
    }
  },
  methods: {
    async onSelect (articleId) {
      await this.$store.dispatch('admin/article/fetchArticle', articleId)
      this.$router.push(`/admin/articles/${articleId}`)
    }
  }
}
</script>

<style lang="scss" scoped>
article {
  border-bottom: 1px solid rgba(34, 34, 34, 0.2);
  @media screen and (min-width: 600px) {
    height: 68px;
    padding: 8px 0;
  }
  @media screen and (max-width: 599px) {
    padding: 8px 0;
  }
  a {
    height: 100%;
    @media screen and (min-width: 600px) {
      display: flex;
    }
    @media screen and (max-width: 599px) {
      display: block;
    }
    .summery {
      position: relative;
      @media screen and (min-width: 600px) {
        width: 760px;
      }
      @media screen and (max-width: 599px) {
        height: 98px;
      }
      .publish-status {
        position: absolute;
        @media screen and (min-width: 600px) {
          top: 0;
          left: 98px;
        }
        @media screen and (max-width: 599px) {
          top: 0;
          left: 0;
        }
        color: #fff;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 14px;
        &.public {
          background-color: green;
        }
        &.private {
          background-color: red;
        }
      }
      .icatch-photo {
        position: absolute;
        @media screen and (min-width: 600px) {
          top: 0;
          left: 0;
        }
        @media screen and (max-width: 599px) {
          top: 30px;
          left: 0;
        }
        width: 90px;
        height: 68px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-color: whitesmoke;
      }
      h3 {
        position: absolute;
        left: 98px;
        @media screen and (min-width: 600px) {
          top: 30px;
          width: 660px;
        }
        @media screen and (max-width: 599px) {
          top: 30px;
          width: calc(100vw - 32px - 98px);
        }
      }
    }
    .metadata {
      @media screen and (min-width: 600px) {
        width: calc(100% - 760px);
        position: relative;
      }
      @media screen and (max-width: 599px) {}
      .category-list-wrapper {
        @media screen and (max-width: 599px) {
          padding: 8px 0;
        }
        ul.category-list {
          display: flex;
          @media screen and (min-width: 600px) {}
          @media screen and (max-width: 599px) {}
          li {
            margin-right: 4px;
            color: #0052A3;
            font-size: 15px;
            display: inline-flex;
            &:after {
              content: ",";
              color: #000;
            }
            &:last-child {
              &:after {
                content: "";
              }
            }
          }
        }
      }
      .time-comment {
        display: flex;
        @media screen and (min-width: 600px) {
          position: absolute;
          bottom: 0;
        }
        @media screen and (max-width: 599px) {
          justify-content: space-between;
        }
        time {
          color: #555;
          font-weight: bold;
        }
        .comment-count {}
      }
    }
  }
}
</style>
