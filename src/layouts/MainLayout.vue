<script setup>
import { ref, reactive, onMounted } from 'vue'
import AppHelp from '../components/AppHelp.vue'
import MonacoEditor from '../components/MonacoEditor.vue'
import MarkDown from "../components/MarkDown.vue";
import getInterface from "../js/channel";

const drawer = ref(true)
const currentMenu = ref('Inbox')

const menuList = [
  { icon: 'inbox', label: 'Inbox', separator: true },
  { icon: 'send', label: '信息', separator: false },
  // { icon: 'delete', label: 'Trash', separator: false },
  // { icon: 'error', label: 'Spam', separator: true },
  { icon: 'settings', label: '设置', separator: false },
  // { icon: 'feedback', label: 'Send Feedback', separator: false },
  { icon: 'help', iconColor: 'primary', label: '帮助', separator: false }
]

function setCurrentMenu(menuLabel) {
  currentMenu.value = menuLabel
}

onMounted(async () => {
  const channelInterface = await getInterface;
  channelInterface.signal1.connect(data => {
    window.pysideConfig = data;
  });

  window.channel = channelInterface;
  window.channel.send_to_pyside("config"); // 通知pyside发config过来
});
</script>


<template>
  <div class="q-pa-none" style="height: 100vh;">
    <q-layout view="hHh Lpr lff" container class="shadow-2 rounded-borders">
      <q-drawer v-model="drawer" :width="200" :breakpoint="500" overlay bordered class="bg-grey-3">
        <q-scroll-area class="fit">
          <q-list>
            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item clickable :active="currentMenu === menuItem.label" @click="setCurrentMenu(menuItem.label)"
                v-ripple>
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index" v-if="menuItem.separator" />
            </template>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container style="margin-left: 200px;">
        <q-page padding>
          <div v-if="currentMenu === 'Inbox'">
            <q-page-container>
              <router-view />
            </q-page-container>
          </div>
          <div v-if="currentMenu === '信息'">
            <MarkDown></MarkDown>
          </div>
          <div v-if="currentMenu === 'Trash'">
            <p>Show Trash Content Here</p>
          </div>
          <div v-if="currentMenu === 'Spam'">
            <p>Show Spam Content Here</p>
          </div>
          <div v-if="currentMenu === '设置'">
            <MonacoEditor></MonacoEditor>
            <!-- <p>Show 设置 Here</p> -->
          </div>
          <div v-if="currentMenu === 'Send Feedback'">
            <p>Show Feedback Form Here</p>
          </div>
          <div v-if="currentMenu === '帮助'">
            <AppHelp></AppHelp>
            <!-- <p>Show 帮助 Content Here</p> -->
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
