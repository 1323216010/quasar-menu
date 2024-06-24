<script setup>
import { ref, onMounted } from 'vue'
import AppHelp from '../components/AppHelp.vue'
import MonacoEditor from '../components/MonacoEditor.vue'
import MarkDown from "../components/MarkDown.vue";
import getInterface from "../js/channel";
import { useRouter } from 'vue-router';

const drawer = ref(true)
const currentMenu = ref('信息')

const router = useRouter();
// const iframeSrc = router.resolve({ name: 'IframePage' }).href;

const menuList = [
  // { icon: 'style', label: '文档', separator: true },
  { icon: 'send', label: '信息', separator: true },
  // { icon: 'delete', label: 'Trash', separator: false },
  // { icon: 'error', label: 'Spam', separator: true },
  { icon: 'settings', label: '设置', separator: false },
  // { icon: 'feedback', label: 'Send Feedback', separator: false },
  { icon: 'help', iconColor: 'primary', label: '帮助', separator: false }
]

function setCurrentMenu(menuLabel) {
  currentMenu.value = menuLabel
}

// function resizeIframe() {
//   const iframe = document.getElementById('contentIframe');
//   if (iframe && iframe.contentWindow && iframe.contentWindow.document.body) {
//     iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 50 + 'px';
//   }
// }

// function observeIframeContent() {
//   const iframe = document.getElementById('contentIframe');
//   if (iframe && iframe.contentWindow) {
//     const observer = new MutationObserver(resizeIframe);
//     observer.observe(iframe.contentWindow.document.body, {
//       childList: true,
//       subtree: true,
//       attributes: true
//     });
//   }
// }

onMounted(async () => {
  // const iframe = document.getElementById('contentIframe');
  // if (iframe) {
  //   iframe.addEventListener('load', () => {
  //     resizeIframe();
  //     observeIframeContent();
  //   });
  // }

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
          <!-- <div v-show="currentMenu === '文档'">
            <iframe id="contentIframe" :src="iframeSrc" style="width: 100%; height: 100%;" frameborder="0"></iframe>
          </div> -->
          <div v-show="currentMenu === '信息'">
            <MarkDown></MarkDown>
          </div>
          <div v-show="currentMenu === 'Trash'">
            <p>Show Trash Content Here</p>
          </div>
          <div v-show="currentMenu === 'Spam'">
            <p>Show Spam Content Here</p>
          </div>
          <div v-show="currentMenu === '设置'">
            <MonacoEditor></MonacoEditor>
            <!-- <p>Show 设置 Here</p> -->
          </div>
          <div v-show="currentMenu === 'Send Feedback'">
            <p>Show Feedback Form Here</p>
          </div>
          <div v-show="currentMenu === '帮助'">
            <AppHelp></AppHelp>
            <!-- <p>Show 帮助 Content Here</p> -->
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
