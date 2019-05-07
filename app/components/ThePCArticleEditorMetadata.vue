<template>
  <div class="article-editor-metadata">
    <section>
      <h3>アイキャッチ画像</h3>
      <ImagePicker
        :width="180"
        :height="135"
        v-on:onSelect="onIcatchImageUpdate"
      />
    </section>
    <section>
      <h3>記事カテゴリー</h3>
      <input
        v-model="inputCategoryName"
        placeholder="追加したいカテゴリーを入力"
        @blur="onBlurCategoryInput"
      >
      <h4>選択中のカテゴリー</h4>
      <ul class="category-list-selected">
        <li
          v-for="(categoryName, index) in selectedCategories"
          :key="index" 
          class="category"
        >
          <p>{{ categoryName }}</p>
          <button class="remove" @click="$store.dispatch('admin/article/deselectCategory', categoryName)">×</button>
        </li>
      </ul>
      <h4>選択できるカテゴリー</h4>
      <ul v-if="registeredCategories.length > 0" class="category-options">
        <li
          v-for="(categoryName, index) in registeredCategories"
          :key="index"
          @click="$store.dispatch('admin/article/selectCategory', categoryName)"
        >
          {{ categoryName }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ImagePicker from './ImagePicker'

export default {
  components: {
    ImagePicker
  },
  computed: {
    selectedCategories () { return this.$store.state.admin.article.displayingArticle.selectedCategories },
    registeredCategories () { return this.$store.state.admin.article.displayingArticle.registeredCategories },
    unregisteredCategories () { return this.$store.state.admin.article.displayingArticle.unregisteredCategories }
  },
  data () {
    return {
      inputCategoryName: ''
    }
  },
  methods: {
    onBlurCategoryInput () {
      const alreadySelected = this.selectedCategories.includes(this.inputCategoryName)
      const alreadyRegistered = this.registeredCategories.includes(this.inputCategoryName)

      alreadySelected
        ? this.categoryError = 'すでに追加されています。'
        : alreadyRegistered
          ? this.$store.dispatch('admin/article/selectCategory', this.inputCategoryName)
          : this.$store.dispatch('admin/article/addCategory', this.inputCategoryName)

      this.inputCategoryName = ''
    },
    onIcatchImageUpdate (dataURL) {
      this.$store.dispatch('admin/article/updateIcatchImageDataURL', dataURL)
    }
  }
}
</script>

<style lang="scss" scoped>
.article-editor-metadata {
  width: 180px;
  margin-left: 32px;
  section {
    margin-bottom: 24px;
    h3 {}
    h4 {
      padding: 8px 0;
      font-size: 14px;
      font-weight: 600;
      color: #444;
    }
    .article-icatch-show {
      width: 180px;
      height: 135px;
      background-color: whitesmoke;
      cursor: pointer;
    }
    input {
      margin-bottom: 16px;
      font-size: 13px;
    }
    ul.category-list-selected {
      margin-bottom: 16px;
      li.category {
        display: inline-flex;
        border: 1px solid rgba(34,34,34,0.2);
        border-radius: 2px;
        padding: 2px 4px;
        margin: 0 4px 4px 0;
        cursor: pointer;
        p {
          font-size: 13px;
        }
        button {
          line-height: 13px;
          font-size: 15px;
          margin-left: 8px;
        }
      }
    }
    ul.category-options {
      border: 1px solid rgba(34,34,34,0.2);
      border-radius: 2px;
      li {
        border-bottom: 1px solid rgba(34,34,34,0.2);
        font-size: 16px;
        padding: 8px 4px;
        cursor: pointer;
        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }
}
</style>
