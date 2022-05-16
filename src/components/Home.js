import React from "react";
import BlogPostItem from "@theme/BlogPostItem";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "../pages/styles.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Home({ recentPosts }) {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <Layout
      title=""
      description="Paul Armstrong is a senior web application developer, specializing in JavaScript, performance, and developer experience"
    >
      <header className={classnames("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames("button button--outline button--secondary button--lg", styles.button)}
              to={useBaseUrl("pages/about")}
            >
              About
            </Link>
          </div>
        </div>
      </header>

      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--9 col--offset-1">
            {recentPosts.map(({ content: BlogPostContent }) => (
              <BlogPostItem
                key={BlogPostContent.metadata.permalink}
                frontMatter={BlogPostContent.frontMatter}
                assets={BlogPostContent.assets}
                metadata={BlogPostContent.metadata}
                truncated={BlogPostContent.metadata.truncated}
              >
                <BlogPostContent />
              </BlogPostItem>
            ))}

            <nav class="pagination-nav" aria-label="Blog list page navigation">
              <a class="pagination-nav__link pagination-nav__link--next" href="/blog">
                <div class="pagination-nav__label">All blog entries</div>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </Layout>
  );
}
