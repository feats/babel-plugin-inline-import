import BabelInlineImportPlugin from '../plugin';
import * as babel from '@babel/core';

describe('Babel Inline Import - Plugin', () => {
  describe('Babel Plugin', () => {
    it('transforms the import default statement into a variable with the intended content', () => {
      const transformedCode = babel.transform(
        "import SomeExample from './fixtures/example.raw';",
        {
          filename: __filename,
          plugins: [BabelInlineImportPlugin]
        }
      );

      expect(transformedCode.code).to.equal(`"use strict";

/* babel-plugin-inline-import './fixtures/example.raw' */
const SomeExample = "a raw content\\n";`);
    });

    it('transforms the import namespace statement into a variable with the intended content in property "default"', () => {
      const transformedCode = babel.transform(
        "import * as SomeExample from './fixtures/example.raw';",
        {
          filename: __filename,
          plugins: [BabelInlineImportPlugin]
        }
      );

      expect(transformedCode.code).to.equal(`"use strict";

/* babel-plugin-inline-import './fixtures/example.raw' */
const SomeExample = {
  default: "a raw content\\n"
};`);
    });

    it('accepts different extensions', () => {
      const transformedCode = babel.transform(
        "import SomeExample from './fixtures/example.py';",
        {
          filename: __filename,
          plugins: [
            [
              BabelInlineImportPlugin,
              {
                extensions: ['.py']
              }
            ]
          ]
        }
      );

      expect(transformedCode.code).to.equal(
        `"use strict";

/* babel-plugin-inline-import './fixtures/example.py' */
const SomeExample = "print 1 + 1\\n";`
      );
    });

    it('throws error when importing with destructuring', () => {
      expect(() => {
        babel.transform(
          "import { SomeExample, AnotherExample } from './fixtures/example.raw';",
          {
            filename: __filename,
            plugins: [BabelInlineImportPlugin]
          }
        );
      }).to.throw(Error);
    });
  });
});
