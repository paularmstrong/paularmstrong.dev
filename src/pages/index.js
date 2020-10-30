import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title=""
      description="Paul Armstrong is a senior web application developer, specializing in JavaScript, performance, and developer experience"
    >
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames('button button--outline button--secondary button--lg', styles.button)}
              to={useBaseUrl('blog')}
            >
              Read the Blog
            </Link>
            <Link
              className={classnames('button button--outline button--secondary button--lg', styles.button)}
              to={useBaseUrl('pages/protips/index')}
            >
              Learn some ProTips
            </Link>
          </div>
        </div>
      </header>
      <main>
        <div className="iframe">
          <iframe
            src="https://player.twitch.tv/?channel=paularmstrongdev&parent=localhost&parent=paularmstrong.dev"
            height="600"
            width="1066"
            frameBorder="0"
            scrolling="no"
            allowFullScreen="allowfullscreen"
          ></iframe>
        </div>
      </main>
    </Layout>
  );
}

export default Home;
