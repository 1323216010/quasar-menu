<script setup>
import { onMounted } from 'vue';


let editor;

onMounted(() => {
  require.config({ paths: { 'vs': './monaco-editor/min/vs' } });
  require(['vs/editor/editor.main'], () => {
    editor = monaco.editor.create(document.getElementById('container'), {
      value: JSON.stringify(window.pysideConfig, null, 2),
      language: 'json',
      automaticLayout: true
    });

    if (editor) {
      // 监听编辑器内容变化
      editor.onDidChangeModelContent(() => {
        const currentValue = JSON.parse(editor.getValue()); // 确保解析当前编辑器的值
        window.channel.save_to_pyside(editor.getValue());

        if (JSON.stringify(currentValue, null, 2) !== JSON.stringify(window.pysideConfig, null, 2)) {
          window.pysideConfig = currentValue;
        }
      });
    }
  });
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
