// import {
// 	WRAPPER_BG,
// 	WRAPPER_MARGIN,
// 	WRAPPER_PADDING,
// 	WRAPPER_BORDER_SHADOW,
// 	TITLE_MARGIN,
// 	SUBTITLE_MARGIN,
// 	SEPARATOR_MARGIN,
// 	SEPARATOR_LINE_SIZE,
// 	SEPARATOR_ICON_SIZE,
// 	SEPARATOR_WIDTH,
// } from "./constants/constants";
import {
	generateDimensionsAttributes,
	generateTypographyAttributes,
	generateBackgroundAttributes,
	generateBorderShadowAttributes,
	generateResponsiveRangeAttributes
} from "../util/helpers";
// import * as typographyObjs from "./constants/typographyPrefixConstants";

const attributes = {
	resOption: {
		type: "string",
		default: "Desktop",
	},

	// blockId attribute for making unique className and other uniqueness
	blockId: {
		type: "string",
	},
	blockRoot: {
		type: "string",
		default: "essential_block",
	},
	blockMeta: {
		type: "object",
	},

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
