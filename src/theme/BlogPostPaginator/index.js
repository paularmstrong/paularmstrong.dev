import React from 'react';
import BlogPostPaginator from '@theme-original/BlogPostPaginator';
import { useColorMode } from '@docusaurus/theme-common';
import Giscus from '@giscus/react';

export default function BlogPostPaginatorWrapper(props) {
  const { colorMode } = useColorMode();

  return (
    <>
      <Giscus
        id="comments"
        repo="paularmstrong/paularmstrong.dev"
        repoId="MDEwOlJlcG9zaXRvcnkyNTEwOTYwNjc="
        category="Blog"
        categoryId="DIC_kwDODvdsA84CPe1O"
        mapping="title"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={colorMode === 'dark' ? 'dark' : 'light'}
        lang="en"
        loading="lazy"
      />
      <BlogPostPaginator {...props} />
    </>
  );
}
