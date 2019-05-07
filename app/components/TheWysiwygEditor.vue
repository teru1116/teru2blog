<template>
  <article class="wysiwyg">
    <editor-content :editor="editor" />
  </article>
</template>

<script>
import { EditorContent, EditorMenuBubble } from 'tiptap'

export default {
  components: {
    EditorContent,
    EditorMenuBubble
  },
  props: {
    editor: Object
  }
}
</script>

<style lang="scss" scoped>
article {
  position: relative;

  .menububble {
    position: absolute;
    display: flex;
    z-index: 20;
    margin-bottom: 0.5rem;
    transform: translateX(-50%);
    visibility: hidden;
    opacity: 0;
    background: rgb(0, 0, 0);
    border-radius: 5px;
    padding: 0.3rem;
    transition: opacity 0.2s ease 0s, visibility 0.2s ease 0s;

    &.is-active {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
