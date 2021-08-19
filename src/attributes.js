import {
	WRAPPER_BG,
	WRAPPER_MARGIN,
	WRAPPER_PADDING,
	WRAPPER_BORDER_SHADOW,
	GRID_COLUMNS,
	IMAGE_GAP,
	IMAGE_BORDER_SHADOW,
	CAPTION_MARGIN,
	CAPTION_PADDING,
	CAPTION_TYPOGRAPHY
} from "./constants";
import {
	generateDimensionsAttributes,
	generateTypographyAttributes,
	generateBackgroundAttributes,
	generateBorderShadowAttributes,
	generateResponsiveRangeAttributes
} from "../util/helpers";

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
	layouts: {
		type: "string",
		default: "grid"
	},
	columns: {
		type: "number",
		default: 3,
	},
	sources: {
		type: "array",
		source: "query",
		selector: ".eb-gallery-img-content",
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
	captionOnHover: {
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
	captionColorType: {
		type: "string",
		default: "normal"
	},
	captionColor: {
		type: "string",
		default: "#333333"
	},
	captionHoverColor: {
		type: "string",
	},
	captionBGColorType: {
		type: "string",
		default: "normal"
	},
	captionBGColor: {
		type: "string",
		default: "#e5e8e9"
	},
	captionBGHoverColor: {
		type: "string",
	},
	horizontalAlign: {
		type: "string",
		default: "center",
	},
	verticalAlign: {
		type: "string",
		default: "bottom",
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

	// typography attributes ⬇
	...generateTypographyAttributes(Object.values(CAPTION_TYPOGRAPHY)),

	// margin padding attributes ⬇
	...generateDimensionsAttributes(WRAPPER_MARGIN),
	...generateDimensionsAttributes(WRAPPER_PADDING),
	...generateDimensionsAttributes(CAPTION_MARGIN, {
		top: 0,
		bottom: 10,
		right: 0,
		left: 0,
		isLinked: false,
	}),
	...generateDimensionsAttributes(CAPTION_PADDING, {
		top: 5,
		bottom: 5,
		right: 10,
		left: 10,
		isLinked: false,
	}),

	// border shadow attributes ⬇
	...generateBorderShadowAttributes(WRAPPER_BORDER_SHADOW, 
		{
			bdrDefaults: {
				top: 0,
				bottom: 0,
				right: 0,
				left: 0,
			},
			// noShadow: true,
			// noBorder: true,
		}
	),
	...generateBorderShadowAttributes(IMAGE_BORDER_SHADOW, 
		{
			bdrDefaults: {
				top: 0,
				bottom: 0,
				right: 0,
				left: 0,
			},
			// noShadow: true,
			// noBorder: true,
		}
	),

	// background attributes ⬇
	...generateBackgroundAttributes(WRAPPER_BG, {
		defaultBgGradient: "linear-gradient(45deg,#ffffff,#ffffff)",
		noOverlay : true,
	}),

	// range controller Separator Line Grid Column
	...generateResponsiveRangeAttributes(GRID_COLUMNS, {
		defaultRange: 3,
	}),
	// range controller Separator Image Gap
	...generateResponsiveRangeAttributes(IMAGE_GAP, {
		defaultRange: 10,
	}),
};

export default attributes;
