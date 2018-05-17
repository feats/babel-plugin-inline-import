import BabelInlineImportPlugin from '../plugin';
import * as babel from 'babel-core';

describe('Babel Inline Import - Plugin', () => {
  describe('Babel Plugin', () => {
    it('transforms the import statement into a variable with the intended content', () => {
      const transformedCode = babel.transform("import SomeExample from './fixtures/example.raw';", {
        filename: __filename,
        plugins: [BabelInlineImportPlugin]
      });

      expect(transformedCode.code).to.equal(`/* babel-plugin-inline-import './fixtures/example.raw' */var SomeExample = 'a raw content\\n';`);
    });

    it('accepts different extensions', () => {
      const transformedCode = babel.transform("import SomeExample from './fixtures/example.py';", {
        filename: __filename,
        plugins: [[
          BabelInlineImportPlugin, {
            extensions: [
              '.py'
            ]
          }
        ]]
      });

      expect(transformedCode.code).to.equal(`/* babel-plugin-inline-import './fixtures/example.py' */var SomeExample = 'print 1 + 1\\n';`);
    });

    it('accepts unnamed imports', () => {
      const transformedCode = babel.transform("import './fixtures/example.py';", {
        filename: __filename,
        plugins: [[
          BabelInlineImportPlugin, {
            extensions: [
              '.py'
            ]
          }
        ]]
      });

      expect(transformedCode.code).to.equal(`'print 1 + 1\\n';`);
    });

    it('throws error when importing with destructuring', () => {
      expect(() => {
        babel.transform("import { SomeExample, AnotherExample } from './fixtures/example.raw';", {
          filename: __filename,
          plugins: [BabelInlineImportPlugin]
        });
      }).to.throw(Error);
    });
  });
});
