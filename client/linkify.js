import linkifyStr from 'linkifyjs/string';

if (Package.templating) {
	const Template = Package.templating.Template;
	const Blaze = Package.blaze.Blaze;
	const HTML = Package.htmljs.HTML;

	Blaze.Template.registerHelper('link', new Template('link', function () {
		const view = this;
		const content = view.templateContentBlock ?
			Blaze._toText(view.templateContentBlock, HTML.TEXTMODE.STRING) : '';
		return HTML.Raw(linkifyStr(content));
	}));
}
