<template>
  <div class="space">
    <div class="header">
      <img alt="Typix" src="../assets/logo.png" style="height: 100px; margin-top: 30px" />
      <div class="title" style="margin-top: 30px">
        <div>
          <span style="font-size: 40px; font-weight: bold">Typix</span>
          <span style="color: grey">{{ route.query.version }}</span>
        </div>
        <div>
          <span style="font-size: 15px; color: grey; margin-top: 10px">MADE WITH BY GuqierMcl</span>
        </div>
        <div class="link-bar">
          <button class="btn" @click="openGitHub">GitHub</button>
        </div>
      </div>
    </div>
    <div class="footer">
      <button class="btn" @click="closeWin">关闭</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()

const closeWin = () => {
  window.api.closeAboutWin()
}

const openGitHub = () => {
  window.api.openExternal('https://github.com/GuqierMcl/Typix')
}
</script>

<style scoped>
.space {
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 400px;
  max-width: 400px;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  font-size: 15px;
  font-weight: bold;
  width: 100%;
}

.btn {
  border: 0px;
  background-color: white;
  cursor: pointer;
}
.btn:hover {
  background-color: #e6e6e6;
}

.link-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  font-size: 15px;
  font-weight: bold;
  width: 100%;
}
</style>
