<template>
  <div class="md-editor">
    <v-md-editor
      v-model="text"
      height="calc((100vh - 18px))"
      :include-level="[1, 4]"
      left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code | emoji"
      right-toolbar="preview toc sync-scroll"
      :autofocus="true"
      @change="handleChange"
      @save="handleSave"
    ></v-md-editor>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
const text = ref('')

const handleChange = async (_text, _html) => {
  if (text.value === '') return
  window.api.setStore('curr.changed', true)
}

const handleSave = async () => {
  window.api.save(text.value)
}

const handleKeyUp = async (event: KeyboardEvent) => {
  if (event.key === 'Tab') {
    event.preventDefault()
    const textarea = event.target
    // 获取光标位置
    // @ts-ignore
    const start = textarea.selectionStart as number
    // @ts-ignore
    const end = textarea.selectionEnd as number

    // 在光标位置插入空格
    let n = window.api.getStore('preferences.tabSize')
    let tabStr = ''
    for (let i = 0; i < n; i++) {
      tabStr += ' '
    }
    console.log(111);
    
    text.value = text.value.slice(0, start) + '  ' + text.value.slice(end)


    // 设置光标位置
    await nextTick(() => {
      // @ts-ignore
      textarea.selectionStart = textarea.selectionEnd = start + n
    })
    
    // @ts-ignore
    
  }
}

onMounted(() => {
  // 监听打开文件
  window.api.onOpenFile((value) => {
    if (value === '') {
      return
    }
    text.value = value
    window.api.setStore('curr.changed', false)
  })
  // 监听保存文件
  window.api.onSaveFile((_value) => {
    window.api.save(text.value)
  })
  // 监听另存为
  window.api.onSaveAsFile((_value) => {
    window.api.saveAs(text.value)
  })
  // 监听新建文件
  window.api.onNewFile(() => {
    text.value = ''
    window.api.setStore('curr.changed', false)
  })
  // 监听关闭并保存文件
  window.api.onCloseAndSaveFile(() => {
    window.api.saveAndClose(text.value)
  })

  // 绑定右键菜单
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    window.api.showContextMenu()
  })

  // 监听键盘事件
  window.addEventListener('keyup', handleKeyUp, true)
})
</script>

<style scoped></style>
