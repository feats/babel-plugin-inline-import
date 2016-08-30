import test from 'ava';
import plugin from '../';
import { transform, transformFileSync } from 'babel-core';

test('should wrap inline code with exports', (t) => {
	const fixture = '# foo && bar \n foobar';
	const expected = 'export default "foo && bar \\n foobar";';

	const { code } = transform(fixture, { plugins: [plugin] });
	t.is(code, expected);
});

test('should process *.graphql files', (t) => {
	const expected = 'export default "foo && bar \\n foobar";';

	const { code } = transformFileSync('./fixtures/kitchen-sink.graphql', { plugins: [plugin] });
	t.is(code, expected);
});
