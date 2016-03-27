var template = require('babel-template');

var buildIife = template(';(function () {\nBODY;\n})();');

module.exports = function (babel) {
	var t = babel.types;

	return {
		inherits: require("babel-plugin-transform-strict-mode"),

		visitor: {
			Program: {
				exit: function (path) {
					if (!this.runIife) {
						this.runIife = true;
						var iife = buildIife({
							BODY: path.node.body
						});
						iife[1].expression.callee.body.directives = path.node.directives;

						path.replaceWith(
							t.program(iife)
						);
					}
					path.node.directives = [];
				}
			}
		}
	};
};
