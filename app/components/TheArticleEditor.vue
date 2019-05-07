<template>
  <div>
    <MobileEditorMenu v-if="$isMobile" :editor="editor" />
    <div class="article-editor inner">
      <div class="article-editor-titlebody">
        <input class="article-editor-title" placeholder="記事タイトル">
        <PCEditorMenu v-if="!$isMobile" :editor="editor" class="pc-editor-menu" />
        <WysiwygEditor :editor="editor" />
      </div>
      <PCEditorMetadata v-if="!$isMobile" />
    </div>
  </div>
</template>

<script>
import MobileEditorMenu from './TheMobileArticleEditorMenubar'
import PCEditorMenu from './ThePCArticleEditorMenubar'
import WysiwygEditor from './TheWysiwygEditor'
import PCEditorMetadata from './ThePCArticleEditorMetadata'
import { Editor } from 'tiptap'
import {
  Heading,
  Bold,
  Link,
  Blockquote,
  Image,
  History,
} from 'tiptap-extensions'
import Iframe from './TiptapExtensions/Iframe.js'

export default {
  components: {
    MobileEditorMenu,
    PCEditorMenu,
    WysiwygEditor,
    PCEditorMetadata
  },
  data () {
    return {
      editor: new Editor({
        extensions: [
          new Heading({ levels: [1] }),
          new Bold(),
          new Link(),
          new Blockquote(),
          new Image(),
          new History(),
          new Iframe()
        ],
        content: ``,
        onUpdate: ({ getHTML }) => {
          const content = getHTML()
          this.$emit('onChange', content)
        },
      }),
      icatchImageDataURL: '',
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss" scoped>
.article-editor {
  @media screen and (min-width: 600px) {
    display: flex;
    margin-top: 32px;
  }
  @media screen and (max-width: 599px) {
    margin-top: 92px;
  }
  .article-editor-titlebody {
    @media screen and (min-width: 600px) {
      flex: 1;
    }
    @media screen and (max-width: 599px) {}
    .article-editor-title {
      padding: 8px 4px;
      @media screen and (min-width: 600px) {
        font-size: 24px;
        margin-bottom: 16px;
      }
      @media screen and (max-width: 599px) {
        font-size: 18px;
        margin-top: 16px;
        margin-bottom: 32px;
      }
    }
    .pc-editor-menu {
      position: sticky;
      top: 0;
      background-color: #fff;
      padding-top: 24px;
      z-index: 12;
    }
  }
}
</style>
