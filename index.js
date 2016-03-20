var template = require('babel-template');

var buildIIFE = template(';(function () {\nBODY;\n})();');

module.exports = function (babel) {
	var t = babel.types;

	return {
		visitor: {
			Program: {
				exit: function (path) {
					if (this.run) {
						return;
					}
					this.run = true;

					var iife = buildIIFE({
						BODY: path.node.body
					});
					path.replaceWith(
						t.program(iife)
					);
				}
			}
		}
	};
};
