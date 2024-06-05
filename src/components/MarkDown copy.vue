<script setup>
import { ref, onMounted } from 'vue';
import 'github-markdown-css/github-markdown.css';
import { renderMarkdown } from "../js/markdownRenderer.js"

const mText = ref('');

onMounted(async () => {
    try {
        const response = await fetch('/src/components/e.md');
        const markdown = await response.text();
        mText.value = renderMarkdown(markdown);
    } catch (error) {
        console.error('Error fetching or rendering markdown:', error);
    }
})
</script>

<template>
    <div class="markdown-body" v-html="mText"></div>
</template>