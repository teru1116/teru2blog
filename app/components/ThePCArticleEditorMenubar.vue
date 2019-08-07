<template>
  <div>
    <editor-menu-bar :editor="editor">
      <div slot-scope="{ commands, getMarkAttrs }">
        <nav>
          <ul>
            <!-- 元に戻す -->
            <li>
              <button @click="commands.undo">
                <i class="material-icons">undo</i>
              </button>
            </li>
            <!-- 見出し -->
            <li>
              <button @click="commands.heading({ level: 1 })">
                <i class="material-icons">title</i>
              </button>
            </li>
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
            <!-- 写真 -->
            <li>
              <button @click="onPhotoButtonClick(commands.image)">
                <i class="material-icons">add_photo_alternate</i>
              </button>
            </li>
            <!-- YouTube動画埋め込み -->
            <li>
              <button @click="showVideoMenu">
                <i class="material-icons">play_circle_filled</i>
              </button>
            </li>
          </ul>
        </nav>
        <!-- リンクURL入力欄 -->
        <form v-if="linkMenuIsActive" @submit.prevent="setLinkUrl(commands.link, linkUrl)">
          <input type="text" v-model="linkUrl" placeholder="https://" ref="linkInput" @keydown.esc="hideLinkMenu"/>
          <button class="clear" @click="hideLinkMenu" type="button">
            <i class="material-icons">clear</i>
          </button>
        </form>
        <!-- YouTubeURL入力欄 -->
        <form v-if="videoMenuIsActive" @submit.prevent="insertVideo(commands.iframe)">
          <input type="text" v-model="videoId" placeholder="xBy4G2QW6uI" ref="videoUrlInput" @keydown.esc="hideVideoMenu"/>
          <button class="clear" @click="hideVideoMenu" type="button">
            <i class="material-icons">clear</i>
          </button>
        </form>
      </div>
    </editor-menu-bar>
    <!-- ダミーInput要素 画像アップロード用 -->
    <input
      type="file"
      ref="input"
      :style="{ display: 'none' }"
      @change="onFileSelect"
    />
  </div>
</template>

<script>
import { EditorMenuBar } from 'tiptap'

export default {
  components: {
    EditorMenuBar
  },
  props: {
    editor: Object
  },
  data () {
    return {
      linkUrl: null,
      linkMenuIsActive: false,
      videoId: null,
      videoMenuIsActive: false,
      command: null
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
    hideLinkMenu() {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },
    setLinkUrl(command, url) {
      command({ href: url })
      this.hideLinkMenu()
      this.editor.focus()
    },
    showVideoMenu () {
      this.videoMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.videoUrlInput.focus()
      })
    },
    hideVideoMenu() {
      this.videoId = null
      this.videoMenuIsActive = false
    },
    insertVideo(command) {
      command({ src: this.videoId })
      this.hideLinkMenu()
      this.editor.focus()
    },
    onPhotoButtonClick (command) {
      this.command = command
      this.$refs.input.click()
    },
    onFileSelect (e) {
      e.preventDefault()
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        const src = reader.result
        this.command({ src })
        this.command = null
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  height: 44px;
  ul {
    display: inline-flex;
    li {
      width: 44px;
      height: 44px;
      button {
        width: 100%;
        height: 100%;
      }
    }
  }
}

form {
  display: flex;
  padding: 0 16px;
  height: 44px;
  border: 1px solid rgba(34, 34, 34, 0.2);
  border-radius: 4px;
  background-color: #fff;
  input {
    border: 0;
    font-size: 14px;
  }
}
</style>
