import remarkToc from "remark-toc";
import rehypeToc from "rehype-toc";

import { remarkReadingTime } from './remark-reading-time.mjs';
import { remarkModifiedTime } from './remark-modified-time.mjs';


export default {
  remarkPlugins: [ [remarkToc, { tight: true, ordered: true }],  remarkReadingTime, remarkModifiedTime],
  rehypePlugins: [
    [
      rehypeToc,
      {
        headings: ["h2", "h3"],
        cssClasses: {
          toc: "toc-post", 
          link: "toc-link", 
        },
      },
    ],
  ],
};