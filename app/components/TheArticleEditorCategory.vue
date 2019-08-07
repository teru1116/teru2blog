<template>
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
        v-for="(categoryName, index) in categories"
        :key="index" 
        class="category"
      >
        <p>{{ categoryName }}</p>
        <button class="remove" @click="$store.dispatch('admin/editingArticle/deselectCategory', categoryName)">×</button>
      </li>
    </ul>
    <h4>選択できるカテゴリー</h4>
    <ul v-if="selectableCategories.length > 0" class="category-options">
      <li
        v-for="(categoryName, index) in selectableCategories"
        :key="index"
        @click="$store.dispatch('admin/editingArticle/selectCategory', categoryName)"
      >
        {{ categoryName }}
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      categories: state => state.admin.editingArticle.categories,
      newCategories: state => state.admin.editingArticle.newCategories,
      selectableCategories: state => state.admin.editingArticle.selectableCategories
    })
  },
  data () {
    return {
      inputCategoryName: ''
    }
  },
  methods: {
    onBlurCategoryInput () {
      if (this.inputCategoryName.length === 0) return

      const alreadySelected = this.categories.includes(this.inputCategoryName)
      const alreadyRegistered = this.selectableCategories.includes(this.inputCategoryName)

      alreadySelected
        ? this.categoryError = 'すでに追加されています。'
        : alreadyRegistered
          ? this.$store.dispatch('admin/editingArticle/selectCategory', this.inputCategoryName)
          : this.$store.dispatch('admin/editingArticle/addCategory', this.inputCategoryName)

      this.inputCategoryName = ''
    }
  },
  created () {
    this.$store.dispatch('admin/editingArticle/fetchExistingCategories')
  }
}
</script>

<style lang="scss" scoped>
section {
  margin-bottom: 24px;
  h4 {
    padding: 8px 0;
    font-size: 14px;
    font-weight: 600;
    color: #444;
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
</style>
