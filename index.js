module.exports = (babel) => ({
	visitor: {
		Program(path) {
			const t = babel.types;

			if (this.done) {
				return;
			}

			const code = t.stringLiteral(path.hub.file.code);
			const exportDeclaration = t.exportDefaultDeclaration(code);
			const program = t.program([
				exportDeclaration
			]);

			path.replaceWith(program);
			this.done = true;
		},
	},
});
