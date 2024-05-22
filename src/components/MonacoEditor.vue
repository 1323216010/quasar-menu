<script setup>
import { defineProps, defineEmits, onMounted, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  channel_monaco: {
    type: Object,
    required: true,
  }
});

const emit = defineEmits(['update:modelValue']);

let editor;

onMounted(() => {
  require.config({ paths: { 'vs': './monaco-editor/min/vs' } });
  require(['vs/editor/editor.main'], () => {
    editor = monaco.editor.create(document.getElementById('container'), {
      value: JSON.stringify(props.modelValue),
      language: 'json',
      automaticLayout: true
    });

    if (editor) {
      // 监听编辑器内容变化
      editor.onDidChangeModelContent(() => {
        const currentValue = JSON.parse(editor.getValue()); // 确保解析当前编辑器的值
        props.channel_monaco.save_to_pyside(editor.getValue());
        if (editor.getValue() !== JSON.stringify(props.modelValue)) {
          emit('update:modelValue', currentValue); // 发出事件，通知父组件更新数据
          console.log(currentValue)
          console.log(props.modelValue)
        }
      });
    }
  });
});

// watch(() => props.modelValue, (newValue) => {
//   const editorContent = JSON.stringify(newValue);
//   if (editor && editor.getValue() !== editorContent) {
//     editor.setValue(editorContent);
//   }
// }, { deep: true });
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
