if (Package.templating) {
	const Template = Package.templating.Template;
	const Blaze = Package.blaze.Blaze; // implied by `templating`
	const HTML = Package.htmljs.HTML; // implied by `blaze`

	Blaze.Template.registerHelper('link', new Template('link', function () {
		const view = this;
		const linkerOptions = {
			stripPrefix: false,
			stripTrailingSlash: false,
			truncate: { length: -1 },
		};

		let content = '';
		if (view.templateContentBlock) {
			content = Blaze._toText(view.templateContentBlock, HTML.TEXTMODE.STRING);
		}

		const linker = new Autolinker(linkerOptions);
		return HTML.Raw(linker.link(content));
	}));
}
