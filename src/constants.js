const { __ } = wp.i18n;

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

export const VERTICAL_ALIGN = [
	{ label: __("Top"), value: "top" },
	{ label: __("Middle"), value: "middle" },
	{ label: __("Bottom"), value: "bottom" },
];

export const HORIZONTAL_ALIGN = [
	{ label: __("Left"), value: "left" },
	{ label: __("Center"), value: "center" },
	{ label: __("Right"), value: "right" },
];

export const TEXT_ALIGN = [
	{ label: __("Left"), value: "left" },
	{ label: __("Right"), value: "right" },
	{ label: __("Center"), value: "center" },
	{ label: __("Justify"), value: "justify" },
];

export const UNIT_TYPES = [
	{ label: "px", value: "px" },
	{ label: "%", value: "%" },
];

export const LAYOUTS = [
	{ label: __("Grid Layout"), value: "grid" },
	{ label: __("Masonry Layout"), value: "masonry" },
];

export const STYLES = [
	{ label: __("None"), value: "0" },
	{ label: __("Black & White"), value: "1" },
	{ label: __("Color Overlay"), value: "2" },
];

export const OVERLAY_STYLES = [
	{ label: __("From Top"), value: "overlay-top" },
	{ label: __("From Bottom"), value: "overlay-bottom" },
	{ label: __("From Left"), value: "overlay-left" },
	{ label: __("From Right"), value: "overlay-right" },
	{ label: __("Zoom In Out"), value: "zoom" },
];