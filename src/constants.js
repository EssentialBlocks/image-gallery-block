const { __ } = wp.i18n;
const {Dashicon} = wp.components;

// the consts defined here should be unique from one another
export const WRAPPER_BG = "wrprBg";
export const WRAPPER_MARGIN = "wrpMargin";
export const WRAPPER_PADDING = "wrpPadding";
export const WRAPPER_BORDER_SHADOW = "wrpBorderShadow";
export const GRID_COLUMNS = "columns";
export const IMAGE_GAP = "imageGap";
export const IMAGE_BORDER_SHADOW = "imgBorderShadow";
export const CAPTION_MARGIN = "captionMargin";
export const CAPTION_PADDING = "captionMargin";
export const CAPTION_TYPOGRAPHY = "captionTypo";

export const VERTICAL_ALIGN = [
	{ label: __("Top"), value: "top" },
	{ label: __("Center"), value: "center" },
	{ label: __("Bottom"), value: "bottom" },
];

export const HORIZONTAL_ALIGN = [
	{ label: __("Left"), value: "flex-start" },
	{ label: __("Center"), value: "center" },
	{ label: __("Right"), value: "flex-end" },
];

export const TEXT_ALIGN = [
	{ label: __("Left"), value: "left" },
	{ label: __("Right"), value: "right" },
	{ label: __("Center"), value: "center" },
	{ label: __("Justify"), value: "justify" },
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

export const BORDER_STYLES = [
	{ label: __("None"), value: "none" },
	{ label: __("Solid"), value: "solid" },
	{ label: __("Dashed"), value: "dashed" },
	{ label: __("Dotted"), value: "dotted" },
	{ label: __("Double"), value: "double" },
	{ label: __("Groove"), value: "groove" },
	{ label: __("Inset"), value: "inset" },
	{ label: __("Outset"), value: "outset" },
	{ label: __("Ridge"), value: "ridge" },
];

export const NORMAL_HOVER = [
	{ label: "Normal", value: "normal" },
	{ label: "Hover", value: "hover" },
];

export const UNIT_TYPES = [
	{ label: "px", value: "px" },
	{ label: "%", value: "%" },
	{ label: "em", value: "em" },
];