import markdownIt from 'markdown-it';
import markdownItKatex from 'markdown-it-katex';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItTocDoneRight from 'markdown-it-toc-done-right';
import 'katex/dist/katex.min.css';

const md = markdownIt()
  .use(markdownItKatex)
  .use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.linkInsideHeader({
      symbol: '#',
      renderAttrs: (slug, state) => ({ 'aria-hidden': 'true' })
    })
  })
  .use(markdownItTocDoneRight);

export function renderMarkdown(content) {
  return md.render(content);
}
