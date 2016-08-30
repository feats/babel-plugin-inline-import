const template = require('babel-template');
const build = template(';(function () {\nBODY;\n})();');

module.exports = (babel) => ({
	visitor: {
		Program: {
			exit: (path) => {
				if (!this.run) {
					this.run = true;
					const ast = build({
						BODY: path.node.body
					});
					ast[1].expression.callee.body.directives = path.node.directives;

					path.replaceWith(
						babel.types.program(ast)
					);
				}

				path.node.directives = [];
			},
		},
	},
});
