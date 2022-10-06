'use strict';

module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:astro/recommended', 'plugin:tailwindcss/recommended'],
  plugins: ['astro', 'tailwindcss'],
  root: true,
  globals: {
    astroHTML: 'readonly'
  }
};