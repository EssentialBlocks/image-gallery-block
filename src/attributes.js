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
	CAPTION_WIDTH,
} from "./constants";
import * as CAPTION_TYPOGRAPHY from "./typoConstants";
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
	sources: {
		type: "array",
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
	newImage: {
		type: "string",
	},
	captionColor: {
		type: "string",
		default: "#ffffff"
	},
	captionBGColor: {
		type: "string",
		default: "rgba(195 195 195 / 0.7)"
	},
	overlayColor: {
		type: "string",
		default: "rgba(0 0 0 / 0.7)"
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
	overlayStyle: {
		type: "string",
		default: "overlay-bottom",
	},

	// typography attributes ⬇
	...generateTypographyAttributes(Object.values(CAPTION_TYPOGRAPHY)),

	// margin padding attributes ⬇
	...generateDimensionsAttributes(WRAPPER_MARGIN),
	...generateDimensionsAttributes(WRAPPER_PADDING),
	...generateDimensionsAttributes(CAPTION_MARGIN, {
		top: 0,
		bottom: 0,
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
			noShadow: true,
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
	// range controller Separator Caption Width
	...generateResponsiveRangeAttributes(CAPTION_WIDTH),
};

export default attributes;
