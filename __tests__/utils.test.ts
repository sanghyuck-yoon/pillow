import assert from 'node:assert';
import { test } from 'node:test';
import { validateEmail } from '../lib/utils';

test('validateEmail returns true for valid emails', () => {
  assert.strictEqual(validateEmail('test@example.com'), true);
  assert.strictEqual(validateEmail('user.name@domain.co.jp'), true);
});

test('validateEmail returns false for invalid emails', () => {
  assert.strictEqual(validateEmail('invalid-email'), false);
  assert.strictEqual(validateEmail('test@'), false);
  assert.strictEqual(validateEmail('@example.com'), false);
  assert.strictEqual(validateEmail('test@example'), false); // Regex requires 2-4 chars TLD
});
