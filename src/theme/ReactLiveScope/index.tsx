import escape from 'escape-html';
import React from 'react';

function html(parts: Array<string>, ...values: Array<mixed>) {
  return parts.reduce((acc: string, part: mixed, i: number) => {
    const value = values[i] || '';
    let escapedValue = '';
    if (typeof value === 'string') {
      escapedValue = escape(value);
    } else if (value && (Array.isArray(value) || Object.prototype.toString.call(value) === '[object Object]')) {
      escapedValue = JSON.stringify(value, (key: string, value: mixed) =>
        typeof value === 'string' ? escape(value) : value
      );
    } else if ('toString' in Reflect.ownKeys(value)) {
      escapedValue = escape(value.toString());
    } else {
      escapedValue = escape(String(value));
    }
    return `${acc}${part}${escapedValue}`;
  }, '');
}

export default {
  React,
  ...React,
  escape,
  html,
};
