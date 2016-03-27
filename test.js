import test from 'ava';
import plugin from './';
import strictMode from 'babel-plugin-transform-strict-mode';
import { transform } from 'babel-core';

test('should wrap code with iife', t => {
	var fixture = 'window.a = 1;';
	var expected = ';\n\n(function () {\n  "use strict";\n\n  window.a = 1;\n})();';
	t.is(transform(fixture, { plugins: [plugin] }).code, expected);
});

test('should process correctly existing strict mode', t => {
	var fixture = '"use strict"; window.a = 1;';
	var expected = ';\n\n(function () {\n  "use strict";\n  window.a = 1;\n})();';
	t.is(transform(fixture, { plugins: [plugin] }).code, expected);
});
