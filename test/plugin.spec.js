import BabelInlineImportPlugin from '../plugin';
import * as babel from '@babel/core';

describe('Babel Inline Import - Plugin', () => {
  describe('Babel Plugin', () => {
    it('transforms the import statement into a variable with the intended content', () => {
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

    it('supports require expressions', () => {
      const transformedCode = babel.transform(
        "let SomeExample = require('./fixtures/example.raw');",
        {
          filename: __filename,
          plugins: [BabelInlineImportPlugin]
        }
      );

      expect(transformedCode.code).to.equal(`"use strict";

let SomeExample =
/* babel-plugin-inline-import './fixtures/example.raw' */
"a raw content\\n";`);
    });

    it('supports require expressions while accepting different extensions', () => {
      const transformedCode = babel.transform(
        "let SomeExample = require('./fixtures/example.py');",
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

      expect(transformedCode.code).to.equal(`"use strict";

let SomeExample =
/* babel-plugin-inline-import './fixtures/example.py' */
"print 1 + 1\\n";`);
    });
  });
});
