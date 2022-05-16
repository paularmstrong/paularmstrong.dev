/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');

module.exports = function (context, options) {
  const { goatcounter } = options || {};

  if (!goatcounter) {
    throw new Error(`You need to specify 'goatCounter' object in the plugin 'configuration' to use goatcounter`);
  }

  const isProd = process.env.NODE_ENV === 'production';

  return {
    name: 'docusaurus-plugin-goatcounter',

    getClientModules() {
      return isProd ? [path.resolve(__dirname, './analytics')] : [];
    },

    injectHtmlTags() {
      if (!isProd) {
        return {};
      }
      return {
        headTags: [
          {
            tagName: 'link',
            attributes: {
              rel: 'preconnect',
              href: '//gc.zgo.at',
            },
          },
          {
            tagName: 'script',
            attributes: {
              async: true,
              'data-goatcounter': goatcounter,
              src: '//gc.zgo.at/count.js',
            },
          },
        ],
      };
    },
  };
};
