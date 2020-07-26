import { __ } from "@wordpress/i18n";

const VERTICAL_ALIGN = [
	{ label: __("Top"), value: "flex-start" },
	{ label: __("Center"), value: "center" },
	{ label: __("Bottom"), value: "flex-end" },
];

const HORIZONTAL_ALIGN = [
	{ label: __("Left"), value: "flex-start" },
	{ label: __("Center"), value: "center" },
	{ label: __("Right"), value: "flex-end" },
];

const TEXT_ALIGN = [
	{ label: __("Left"), value: "left" },
	{ label: __("Right"), value: "right" },
	{ label: __("Center"), value: "center" },
	{ label: __("Justify"), value: "justify" },
];

const STYLES = [
	{ label: __("None"), value: "0" },
	{ label: __("Style 1"), value: "1" },
	{ label: __("Style 2"), value: "2" },
	{ label: __("Style 3"), value: "3" },
];

const BORDER_STYLES = [
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

export { VERTICAL_ALIGN, HORIZONTAL_ALIGN, TEXT_ALIGN, STYLES, BORDER_STYLES };
