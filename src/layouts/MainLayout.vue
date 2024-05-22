<script setup>
import { ref, reactive, onMounted } from 'vue'
import AppHelp from '../components/AppHelp.vue'
import MonacoEditor from '../components/MonacoEditor.vue'
import getInterface from "../js/channel";

const drawer = ref(true)
const currentMenu = ref('Help')

const menuList = [
  // { icon: 'inbox', label: 'Inbox', separator: true },
  { icon: 'send', label: 'Outbox', separator: false },
  { icon: 'delete', label: 'Trash', separator: false },
  { icon: 'error', label: 'Spam', separator: true },
  { icon: 'settings', label: 'Settings', separator: false },
  // { icon: 'feedback', label: 'Send Feedback', separator: false },
  { icon: 'help', iconColor: 'primary', label: 'Help', separator: false }
]

function setCurrentMenu(menuLabel) {
  currentMenu.value = menuLabel
}

const msg1 = reactive({});
const channel = reactive({});

onMounted(async () => {
  const channelInterface = await getInterface;
  channelInterface.signal1.connect(data => {
    msg1.value = data;
  });

  channel.value = channelInterface;
  channel.value.send_to_pyside("config"); // 通知pyside发数据给msg1.value
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
            <p>Show Inbox Content Here</p>
          </div>
          <div v-if="currentMenu === 'Outbox'">
            <p>Show Outbox Content Here</p>
          </div>
          <div v-if="currentMenu === 'Trash'">
            <p>Show Trash Content Here</p>
          </div>
          <div v-if="currentMenu === 'Spam'">
            <p>Show Spam Content Here</p>
          </div>
          <div v-if="currentMenu === 'Settings'">
            <MonacoEditor v-model:modelValue="msg1.value" v-model:channel_monaco="channel.value"></MonacoEditor>
            <!-- <p>Show Settings Here</p> -->
          </div>
          <div v-if="currentMenu === 'Send Feedback'">
            <p>Show Feedback Form Here</p>
          </div>
          <div v-if="currentMenu === 'Help'">
            <AppHelp></AppHelp>
            <!-- <p>Show Help Content Here</p> -->
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
