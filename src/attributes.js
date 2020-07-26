const attributes = {
	images: {
		type: "array",
		default: [],
	},
	selectedImgIndex: {
		type: "number",
	},
	columns: {
		type: "number",
		default: 3,
	},
	sources: {
		type: "array",
		source: "query",
		selector: ".eb-gallery-img-link",
		query: {
			url: {
				type: "string",
				selector: ".eb-gallery-img",
				source: "attribute",
				attribute: "src",
			},
			caption: {
				type: "string",
				selector: ".eb-gallery-img-caption",
				source: "text",
			},
		},
		default: [],
	},
	displayCaption: {
		type: "boolean",
		default: false,
	},
	clickedImage: {
		type: "number",
	},
	newImage: {
		type: "string",
	},
	captionFontSize: {
		type: "number",
	},
	captionSizeUnit: {
		type: "string",
		default: "px",
	},
	captionColor: {
		type: "string",
	},
	horizontalAlign: {
		type: "string",
		default: "center",
	},
	verticalAlign: {
		type: "string",
		default: "flex-end",
	},
	textAlign: {
		type: "string",
		default: "center",
	},
	styleNumber: {
		type: "string",
		default: "0",
	},
	paddingUnit: {
		type: "string",
		default: "px",
	},
	paddingTop: {
		type: "number",
	},
	paddingRight: {
		type: "number",
	},
	paddingBottom: {
		type: "number",
	},
	paddingLeft: {
		type: "number",
	},
	borderColor: {
		type: "string",
	},
	borderWidth: {
		type: "number",
	},
	borderStyle: {
		type: "string",
		default: "none",
	},
	hOffset: {
		type: "number",
	},
	vOffset: {
		type: "number",
	},
	blur: {
		type: "number",
	},
	shadowColor: {
		type: "string",
	},
	isMasonry: {
		type: "boolean",
		default: false,
	},
};

export default attributes;
