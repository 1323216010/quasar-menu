<script setup>
import { onMounted, ref, watch, toRefs } from 'vue';

const props = defineProps({
  src: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const { src } = toRefs(props);

const editorValue = ref(JSON.stringify(src.value, null, 2));

onMounted(() => {
  require.config({ paths: { 'vs': './monaco-editor/min/vs' } });
  require(['vs/editor/editor.main'], () => {
    const editor = monaco.editor.create(document.getElementById('container'), {
      value: editorValue.value,
      language: 'json',
      automaticLayout: true
    });

    // 监听编辑器内容变化
    editor.onDidChangeModelContent(() => {
      editorValue.value = editor.getValue();
    });
  });
});

watch(editorValue, (newValue) => {
  console.log('Editor value changed:', newValue);
});
</script>

<template>
  <div id="container"></div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
