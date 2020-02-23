import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash/object';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import { extractCritical } from 'emotion-server';

class CustomDocument extends Document {
  constructor(props) {
    // for emotion-js
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = ids;
    }
  }

  render() {
    const { AuthUserInfo } = this.props;
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.jpg" />
          <script
            id="__MY_AUTH_USER_INFO"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(AuthUserInfo, null, 2)
            }}
          />
          {/* for emotion-js */}
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />

          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

CustomDocument.getInitialProps = async ctx => {
  const page = await ctx.renderPage();
  const styles = extractCritical(page.html);

  // Get the AuthUserInfo object. This is set if the server-rendered page
  // is wrapped in the `withAuthUser` higher-order component.
  const AuthUserInfo = get(ctx, 'myCustomData.AuthUserInfo', null);

  return {
    ...page,
    ...styles,
    AuthUserInfo
  };
};

CustomDocument.propTypes = {
  AuthUserInfo: PropTypes.shape({
    AuthUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      emailVerified: PropTypes.bool.isRequired
    }),
    token: PropTypes.string
  }).isRequired
};

export default CustomDocument;
