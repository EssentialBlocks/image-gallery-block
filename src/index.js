import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import "./style.scss";

import Edit from "./edit";
import save from "./save";
import attributes from "./attributes";
import icon from "./icon";

registerBlockType("block/image-gallery-block", {
	title: __("Image Gallery", "create-block"),
	description: __(
		"Example block written with ESNext standard and JSX support – build step required.",
		"create-block"
	),
	keywords: [
		__("images", "essential-blocks"),
		__("photos", "essential-blocks"),
		__("gallery", "essential-blocks"),
	],
	category: "widgets",
	icon,
	supports: {
		align: true,
	},
	attributes,
	edit: Edit,
	save,
});
