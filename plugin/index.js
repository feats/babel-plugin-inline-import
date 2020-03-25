import BabelInlineImportHelper from './helper';

function getCurrentFilename(state) {
  return state && state.file && state.file.opts.filename;
}

function getExtensions(state) {
  return state && state.opts && state.opts.extensions;
}

function shouldImportPathBeInlined(importedPath, state) {
  const extensions = getExtensions(state);
  return BabelInlineImportHelper.shouldBeInlined(importedPath, extensions)
}

function annotate(importedPath, node) {
  const leadingComments = node.leadingComments || [];
  return {
    ...node,
    leadingComments: [...leadingComments, {
      type: 'CommentBlock',
      value: ` babel-plugin-inline-import '${importedPath}' `
    }]
  }
}

export default function({ types: t }) {
  return {
    visitor: {
      ImportDeclaration: {
        exit(path, state) {
          // get imported path
          const importedPath = path.node.source.value;

          // check if this is a path that needs to be imported
          if (!shouldImportPathBeInlined(importedPath, state)) return;

          // destructuring is unsupported
          if (path.node.specifiers.length > 1) {
            throw new Error(`Destructuring inlined import is not allowed. Check the import statement for '${givenPath}'`);
          }

          // get file contents
          const currentFilename = getCurrentFilename(state);
          const content = BabelInlineImportHelper.getContents(importedPath, currentFilename);

          // replace import with variable with file contents
          path.replaceWith(annotate(importedPath, t.variableDeclaration('const', [
            t.variableDeclarator(
              t.identifier(path.node.specifiers[0].local.name),
              t.stringLiteral(content)
            )
          ])));
        }
      },

      // support for require() expressions
      Identifier(path, state) {
        // only require
        if (path.node.name !== 'require') return;

        // only require global
        const binding = path.scope.getBinding('require');
        if (!binding) return;

        // only require call expressions
        const parentPath = path.parentPath;
        if (parentPath.node.type !== 'CallExpression') return;

        // only require with one argument
        const args = parentPath.get('arguments');
        if (args.length !== 1) return;

        // only require called with string
        const argPath = args[0];
        if (argPath.node.type !== 'StringLiteral') return;

        // get imported path
        const importedPath = argPath.node.value;

        // check if this is a path that needs to be imported
        if (!shouldImportPathBeInlined(importedPath, state)) return;

        // get file contents
        const currentFilename = getCurrentFilename(state);
        const content = BabelInlineImportHelper.getContents(importedPath, currentFilename);

        // replace require() with string with file contents
        parentPath.replaceWith(annotate(importedPath, t.stringLiteral(content)));
      },
    }
  };
}
