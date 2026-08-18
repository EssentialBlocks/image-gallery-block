import { __ } from "@wordpress/i18n";
import { Dashicon } from "@wordpress/components";

// the consts defined here should be unique from one another
export const WRAPPER_BG = "wrprBg";
export const WRAPPER_MARGIN = "wrpMargin";
export const WRAPPER_PADDING = "wrpPadding";
export const WRAPPER_BORDER_SHADOW = "wrpBorderShadow";
export const GRID_COLUMNS = "columns";
export const IMAGE_GAP = "imageGap";
export const IMAGE_BORDER_SHADOW = "imgBorderShadow";
export const CAPTION_MARGIN = "captionMargin";
export const CAPTION_PADDING = "captionPadding";
export const CAPTION_TYPOGRAPHY = "captionTypo";
export const CAPTION_WIDTH = "captionWidth";
export const IMAGE_WIDTH = "imageWidth";
export const IMAGE_HEIGHT = "imageHeight";
export const IMAGE_MAX_WIDTH = "imageMaxWidth";
export const IMAGE_MAX_HEIGHT = "imageMaxHeight";

export const FILTER_MARGIN = "filterMargin";
export const FILTER_PADDING = "filterPadding";
export const FILTER_BORDER_SHADOW = "filterBorderShadow";

export const LOADMORE_PADDING = "loadmorePadding";
export const LOADMORE_BORDER = "loadmoreBorderShadow";


export const VERTICAL_ALIGN = [
	{ label: __("Top", "image-gallery-block"), value: "top" },
	{ label: __("Middle", "image-gallery-block"), value: "middle" },
	{ label: __("Bottom", "image-gallery-block"), value: "bottom" },
];

export const HORIZONTAL_ALIGN = [
	{ label: __("Left", "image-gallery-block"), value: "left" },
	{ label: __("Center", "image-gallery-block"), value: "center" },
	{ label: __("Right", "image-gallery-block"), value: "right" },
];

export const TEXT_ALIGN = [
	{ label: __("Left", "image-gallery-block"), value: "left" },
	{ label: __("Right", "image-gallery-block"), value: "right" },
	{ label: __("Center", "image-gallery-block"), value: "center" },
	{ label: __("Justify", "image-gallery-block"), value: "justify" },
];

export const UNIT_TYPES = [
	{ label: "px", value: "px" },
	{ label: "%", value: "%" },
];

export const IMAGE_UNIT_TYPES = [
	{ label: "px", value: "px" },
	{ label: "em", value: "em" },
	{ label: "%", value: "%" },
];

export const LAYOUTS = [
	{ label: __("Grid Layout", "image-gallery-block"), value: "grid" },
	{ label: __("Masonry Layout", "image-gallery-block"), value: "masonry" },
];

export const IMAGE_SIZE_TYPE = [
	{ label: __("Fixed", "image-gallery-block"), value: "fixed" },
	{ label: __("Adaptive", "image-gallery-block"), value: "adaptive" },
];

export const STYLES = [
	{ label: __("None", "image-gallery-block"), value: "0" },
	{ label: __("Black & White"), value: "1" },
	{ label: __("Color Overlay", "image-gallery-block"), value: "2" },
];

export const OVERLAY_STYLES = [
	{ label: __("From Top", "image-gallery-block"), value: "overlay-top" },
	{ label: __("From Bottom", "image-gallery-block"), value: "overlay-bottom" },
	{ label: __("From Left", "image-gallery-block"), value: "overlay-left" },
	{ label: __("From Right", "image-gallery-block"), value: "overlay-right" },
	{ label: __("Zoom In Out", "image-gallery-block"), value: "zoom" },
];

export const FLEX_ALIGN = [
	{ label: __(<Dashicon icon={"editor-alignleft"} />), value: "flex-start" },
	{ label: __(<Dashicon icon={"editor-aligncenter"} />), value: "center" },
	{ label: __(<Dashicon icon={"editor-alignright"} />), value: "flex-end" },
];


export const NORMAL_HOVER = [
	{ label: "Normal", value: "normal" },
	{ label: "Hover", value: "hover" },
	{ label: "Active", value: "active" },
];
