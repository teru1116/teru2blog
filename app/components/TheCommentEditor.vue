<template>
  <div>
    <editor-menu-bar :editor="editor">
      <div slot-scope="{ commands, getMarkAttrs }">
        <nav>
          <ul>
            <!-- 太字 -->
            <li>
              <button @click="commands.bold">
                <i class="material-icons">format_bold</i>
              </button>
            </li>
            <!-- リンク -->
            <li>
              <button @click="showLinkMenu(getMarkAttrs('link'))">
                <i class="material-icons">link</i>
              </button>
            </li>
            <!-- 引用 -->
            <li>
              <button @click="commands.blockquote">
                <i class="material-icons">format_quote</i>
              </button>
            </li>
          </ul>
          <input v-model="username" placeholder="お名前（任意）" class="username" />
        </nav>
        <!-- リンクURL入力欄 -->
        <form v-if="linkMenuIsActive" @submit.prevent="setLinkUrl(commands.link, linkUrl)">
          <input type="text" v-model="linkUrl" placeholder="https://" ref="linkInput" @keydown.esc="hideLinkMenu"/>
          <button class="clear" @click="hideLinkMenu" type="button">
            <i class="material-icons">clear</i>
          </button>
        </form>
      </div>
    </editor-menu-bar>
    <editor-content class="editor wysiwyg" :editor="editor" />
    <div class="controls-wrapper">
      <button class="submit" @click="postComment">コメント</button>
      <small v-if="errorMessage">{{ errorMessage }}</small>
    </div>
  </div>
</template>

<script>
import { Editor, EditorMenuBar, EditorContent } from 'tiptap'
import {
  Bold,
  Link,
  Blockquote
} from 'tiptap-extensions'

export default {
  components: {
    Editor,
    EditorMenuBar,
    EditorContent
  },
  data () {
    return {
      username: '',
      commentHTML: '',
      linkUrl: null,
      linkMenuIsActive: false,
      errorMessage: '',
      editor: new Editor({
        extensions: [
          new Bold(),
          new Link(),
          new Blockquote()
        ],
        onUpdate: ({ getHTML }) => {
          this.commentHTML = getHTML()
        }
      })
    }
  },
  methods: {
    showLinkMenu (attrs) {
      this.linkUrl = attrs.href
      this.linkMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
    },
    hideLinkMenu () {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },
    setLinkUrl (command, url) {
      command({ href: url })
      this.hideLinkMenu()
      this.editor.focus()
    },
    async postComment () {
      const articleId = this.$route.params.articleId
      const comment = {
        uid: this.$firebase.auth().currentUser.uid,
        username: this.username,
        contentHTML: this.commentHTML,
      }
      
      try {
        await this.$store.dispatch('article/postComment', { articleId, comment })
      } catch (e) {
        console.error(e)
        this.errorMessage = 'コメントの投稿に失敗しました。'
      }

      this.editor.clearContent()
      this.username = ''
      this.commentHTML = ''
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  height: 44px;
  background-color: #fff;
  border: 1px solid rgba(34,34,34,0.2);
  border-radius: 4px 4px 0 0;
  ul {
    display: inline-flex;
    li {
      width: 44px;
      height: 44px;
      border-right: 1px solid rgba(34,34,34,0.2);
      box-sizing: border-box;
      button {
        width: 100%;
        height: 100%;
      }
    }
  }
  input.username {
    border: 0;
    padding: 0 8px;
    font-size: 13px;
    @media screen and (min-width: 600px) {}
    @media screen and (max-width: 599px) {}
  }
}
form {
  display: flex;
  padding: 0 8px;
  height: 44px;
  background-color: #fff;
  border-left: 1px solid rgba(34,34,34,0.2);
  border-right: 1px solid rgba(34,34,34,0.2);
  border-bottom: 1px solid rgba(34,34,34,0.2);
  z-index: 9;
  input {
    border: 0;
    font-size: 14px;
  }
}
.editor {
  padding: 4px 8px;
  min-height: 50px;
  border-left: 1px solid rgba(34,34,34,0.2);
  border-right: 1px solid rgba(34,34,34,0.2);
  border-bottom: 1px solid rgba(34,34,34,0.2);
  border-radius: 0 0 4px 4px;
}
.controls-wrapper {
  display: flex;
  justify-content: flex-end;
  padding: 8px 0;
  small: {
    color: red;
    font-size: 12px;
  }
}
</style>
