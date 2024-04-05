<template>
  <div class="info">
    <!-- <span>Hello Typix!</span> -->
    <!-- <Editor></Editor> -->
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
      <n-message-provider>
        <router-view></router-view>
      </n-message-provider>
    </n-config-provider>
  </div>
</template>
<script setup lang="ts">
import { NConfigProvider, NMessageProvider } from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui'
</script>
