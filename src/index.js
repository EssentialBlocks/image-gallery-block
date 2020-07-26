import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import "./style.scss";

import Edit from "./edit";
import save from "./save";

registerBlockType("block/image-gallery", {
	title: __("Image Gallery", "create-block"),
	description: __(
		"Example block written with ESNext standard and JSX support – build step required.",
		"create-block"
	),
	category: "widgets",
	icon: "smiley",
	supports: {
		html: false,
	},
	edit: Edit,
	save,
});
