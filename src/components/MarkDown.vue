<template>
    <div class="markdown-body" v-html="mText"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import 'github-markdown-css/github-markdown.css';
import { renderMarkdown } from '../js/markdownRenderer.js';

const mText = ref('');

onMounted(async () => {
    try {
        const response = await fetch('/src/md/e.md');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const markdown = await response.text();
        mText.value = renderMarkdown(markdown);
    } catch (error) {
        console.error('Error fetching or rendering markdown:', error);
        mText.value = 'Error loading content.';
    }
});
</script>

<style scoped>
.markdown-body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 16px;
    line-height: 1.6;
    padding: 0 16px;
    color: #24292e;
    background-color: #ffffff;
}
</style>