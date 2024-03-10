<template>
  <div class="md-editor">
    <v-md-editor
      v-model="text"
      height="calc((100vh - 18px))"
      :include-level="[1, 4]"
      left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code | emoji"
      right-toolbar="preview toc sync-scroll"
      autofocus="true"
      @change="handleChange"
      @save="handleSave"
    ></v-md-editor>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
const text = ref('')

const handleChange = async (_text, _html) => {
  if(text.value === '') return
  window.api.setStore('curr.changed', true)
}

const handleSave = async () => {
  window.api.save(text.value)
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
})
</script>

<style scoped></style>
