import * as CAPTION_TYPOGRAPHY from "./typoConstants";

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
} from "./constants";

import {
	generateDimensionsAttributes,
	generateTypographyAttributes,
	generateBackgroundAttributes,
	generateBorderShadowAttributes,
	generateResponsiveRangeAttributes,
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
		default: "grid",
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
	newImage: {
		type: "string",
	},
	captionColor: {
		type: "string",
		default: "#ffffff",
	},
	captionBGColor: {
		type: "string",
		default: "rgba(195 195 195 / 0.7)",
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
	...generateBorderShadowAttributes(WRAPPER_BORDER_SHADOW, {
		bdrDefaults: {
			top: 0,
			bottom: 0,
			right: 0,
			left: 0,
		},
		// noShadow: true,
		// noBorder: true,
	}),
	...generateBorderShadowAttributes(IMAGE_BORDER_SHADOW, {
		bdrDefaults: {
			top: 0,
			bottom: 0,
			right: 0,
			left: 0,
		},
		// noShadow: true,
		// noBorder: true,
	}),

	// background attributes ⬇
	...generateBackgroundAttributes(WRAPPER_BG, {
		defaultBgGradient: "linear-gradient(45deg,#ffffff,#ffffff)",
		noOverlay: true,
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
