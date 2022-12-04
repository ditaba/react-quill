import { remark } from 'remark';
import remarkHtml from 'remark-html';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkStringify from 'remark-stringify';

function markdownToHtml(markdownText) {
  const file = remark().use(remarkHtml).processSync(markdownText);
  return String(file);
}

function htmlToMarkdown(htmlText) {
  const file = remark()
    .use(rehypeParse, { emitParseErrors: true, duplicateAttribute: false })
    .use(rehypeRemark)
    .use(remarkStringify)
    .processSync(htmlText);

  return String(file);
}

export { markdownToHtml, htmlToMarkdown };
