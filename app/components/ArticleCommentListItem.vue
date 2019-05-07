<template>
  <li>
    <p class="username">{{ comment.username }}</p>
    <p class="comment-body" v-html="comment.contentHTML" />
    <time>{{ createdDateString }}</time>
  </li>
</template>

<script>
export default {
  props: {
    comment: Object
  },
  computed: {
    createdDateString () {
      const createdDate = this.comment.createdDate.toDate()
      return `${createdDate.getMonth() + 1}/${createdDate.getDate()}`
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  p.username {
    font-weight: 700;
  }
}
</style>
