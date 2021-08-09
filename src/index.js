import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import "./style.scss";

import Edit from "./edit";
import save from "./save";
import attributes from "./attributes";
import icon from "./icon";

registerBlockType("image-gallery-block/image-gallery-block", {
	title: __("Image Gallery", "image-gallery-block"),
	description: __(
		"Impress your audience with high-resolution images",
		"image-gallery-block"
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
