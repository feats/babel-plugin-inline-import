import test from 'ava';
import plugin from './';
import { transform } from 'babel-core';

test('should wrap code with exports', (t) => {
	const fixture = 'foo && bar \n foobar';
	const expected = 'export default "foo && bar \\n foobar";';

	const { code } = transform(fixture, { plugins: [plugin] });
	t.is(code, expected);
});
