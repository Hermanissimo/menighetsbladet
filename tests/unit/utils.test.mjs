import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { toInt, escapeHtml, parseMarkdown } from '../../web/src/utils.js';

describe('utils.js: toInt', () => {
  test('converts valid integer strings and numbers', () => {
    assert.equal(toInt('42'), 42);
    assert.equal(toInt(42), 42);
    assert.equal(toInt('0'), 0);
    assert.equal(toInt(0), 0);
  });

  test('handles float numbers and strings with trailing characters', () => {
    assert.equal(toInt('12.34'), 12);
    assert.equal(toInt('99abc'), 99);
  });

  test('returns 0 for invalid, null, undefined, or empty values', () => {
    assert.equal(toInt(null), 0);
    assert.equal(toInt(undefined), 0);
    assert.equal(toInt(''), 0);
    assert.equal(toInt('   '), 0);
    assert.equal(toInt('invalid'), 0);
    assert.equal(toInt(NaN), 0);
  });

  test('preserves negative integers', () => {
    assert.equal(toInt('-5'), -5);
    assert.equal(toInt(-10), -10);
  });
});

describe('utils.js: escapeHtml', () => {
  test('escapes HTML special characters', () => {
    const raw = '<script>alert("XSS & danger\'s");</script>';
    const escaped = escapeHtml(raw);
    assert.equal(escaped.includes('<script>'), false);
    assert.equal(escaped.includes('&lt;script&gt;'), true);
    assert.equal(escaped.includes('&amp;'), true);
    assert.equal(escaped.includes('&quot;'), true);
    assert.equal(escaped.includes('&#039;'), true);
  });

  test('handles null, undefined, and non-string inputs safely', () => {
    assert.equal(escapeHtml(null), '');
    assert.equal(escapeHtml(undefined), '');
    assert.equal(escapeHtml(''), '');
    assert.equal(escapeHtml(123), '123');
  });

  test('leaves benign text intact', () => {
    assert.equal(escapeHtml('Storgata 12 B'), 'Storgata 12 B');
    assert.equal(escapeHtml('Bladbærer Kari Nordmann'), 'Bladbærer Kari Nordmann');
  });
});

describe('utils.js: parseMarkdown', () => {
  test('parses markdown headings, bold, and list items', () => {
    const md = '### Tittel\n\n**Viktig** beskjed:\n- Punkt 1\n- Punkt 2';
    const html = parseMarkdown(md);
    assert.equal(html.includes('<h3>Tittel</h3>'), true);
    assert.equal(html.includes('<strong>Viktig</strong>'), true);
    assert.equal(html.includes('<li>Punkt 1</li>'), true);
    assert.equal(html.includes('<li>Punkt 2</li>'), true);
  });

  test('returns empty string for null or empty input', () => {
    assert.equal(parseMarkdown(null), '');
    assert.equal(parseMarkdown(''), '');
  });
});
