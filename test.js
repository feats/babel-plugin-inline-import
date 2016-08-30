import test from 'ava';
import plugin from './';
import { transform } from 'babel-core';

test('should wrap code with exports', (t) => {
	const fixture = 'foo';
	const expected = 'module.exports = `foo`;';

	const { code } = transform(fixture, { plugins: [plugin] });
	t.is(code, expected);
});
