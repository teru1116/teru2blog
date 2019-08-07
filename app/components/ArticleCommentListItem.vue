<template>
  <article>
    <p class="username">{{ comment.username || '匿名' }}</p>
    <div class="content wysiwyg" v-html="comment.contentHTML" />
    <time>{{ createdDateString }}</time>
  </article>
</template>

<script>
export default {
  props: {
    comment: Object
  },
  computed: {
    createdDateString () {
      const createdDate = this.comment.createdDate.toDate()
      let minutes = createdDate.getMinutes()
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
      return `${createdDate.getMonth() + 1}/${createdDate.getDate()} ${createdDate.getHours()}:${minutes}`
    }
  }
}
</script>

<style lang="scss" scoped>
article {
  padding: 8px 8px;
  border: 1px solid rgba(34, 34, 34, 0.2);
  border-radius: 4px;
  margin-bottom: 16px!important;
  @media screen and (min-width: 600px) {}
  @media screen and (max-width: 599px) {}
  p.username {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
    @media screen and (min-width: 600px) {}
    @media screen and (max-width: 599px) {}
  }
  .content {
    margin-bottom: 8px;
    @media screen and (min-width: 600px) {}
    @media screen and (max-width: 599px) {}
    &.username {
      @media screen and (min-width: 600px) {}
      @media screen and (max-width: 599px) {}
    }
  }
  time {
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.4px;
    @media screen and (min-width: 600px) {}
    @media screen and (max-width: 599px) {}
  }
}
</style>
