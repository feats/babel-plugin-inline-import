const template = require('babel-template');
const inherits = require("babel-plugin-transform-strict-mode");

const buildIife = template(';(function () {\nBODY;\n})();');

module.exports = (babel) => ({
	inherits,
	visitor: {
		Program: {
			exit: (path) => {
				if (!this.runIife) {
					this.runIife = true;
					var iife = buildIife({
						BODY: path.node.body
					});
					iife[1].expression.callee.body.directives = path.node.directives;

					path.replaceWith(
						babel.types.program(iife)
					);
				}
				path.node.directives = [];
			}
		}
	},
});
