<template>
  <div class="tabs-container">
    <div>
      <n-h1>设置</n-h1>
    </div>
    <n-form
      label-placement="left"
      require-mark-placement="right-hanging"
      :style="{ maxWidth: '400px' }"
      size="small"
    >
      <n-tabs type="line" animated placement="left">
        <n-tab-pane name="common" tab="通用">
          <n-form-item label="启动选项">
            <n-select
              placeholder="启动选项"
              :options="launchOptions"
              v-model:value="commonValue.launchOption"
              :default-value="'new'"
            />
          </n-form-item>
          <n-form-item label="自动保存">
            <n-switch v-model:value="commonValue.autoSave" />
          </n-form-item>
        </n-tab-pane>
        <n-tab-pane name="editor" tab="编辑器">
          <n-form-item label="缩进空格数">
            <n-input-number
              v-model:value="editorValue.tabSize"
              placeholder="缩进空格数"
              :max="6"
              :min="1"
            />
          </n-form-item>
        </n-tab-pane>
      </n-tabs>
    </n-form>
  </div>
  <div class="footer">
    <n-button type="warning" secondary @click="saveAndClose" style="margin-left: auto"
      >保存并关闭</n-button
    >
    <n-button type="primary" secondary @click="savePreferences" style="margin-left: 10px"
      >保存</n-button
    >
    <n-button type="info" secondary @click="closeWin" style="margin-left: 10px">取消</n-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  useMessage,
  NTabs,
  NTabPane,
  NH1,
  NForm,
  NFormItem,
  NSelect,
  NInputNumber,
  NButton,
  NSwitch
} from 'naive-ui'
import { launchOptions } from './common'

const message = useMessage()
const loading = ref(false)
const commonValue = ref({
  launchOption: '',
  autoSave: false
})
const editorValue = ref({
  tabSize: 2
})

const closeWin = () => {
  window.api.closePreferencesWin()
}

const saveAndClose = () => {
  savePreferences()
  closeWin()
}

const savePreferences = () => {
  window.api.setStore('preferences.common', { ...commonValue.value })
  window.api.setStore('preferences.editor', { ...editorValue.value })
  message.success('保存成功')
}

onMounted(() => {
  loading.value = true
  commonValue.value = window.api.getStore('preferences.common')
  editorValue.value = window.api.getStore('preferences.editor')
  loading.value = false
})
</script>

<style scoped>
.tabs-container {
  width: calc(100vw - 40px);
  height: calc(100vh - 70px);
  margin-top: 20px;
  margin-left: 20px;
}
.footer {
  width: calc(100vw - 40px);
  margin-left: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  margin-top: 10px;
}
</style>
