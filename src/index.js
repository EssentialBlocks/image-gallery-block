const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

import "./style.scss";

import Edit from "./edit";
import Save from "./save";
import attributes from "./attributes";
import icon from "./icon";
import Example from "./example";

registerBlockType("image-gallery-block/image-gallery-block", {
	title: __("Image Gallery", "image-gallery-block"),
	description: __(
		"Impress your audience with high-resolution images",
		"image-gallery-block"
	),
	keywords: [
		__("images", "image-gallery-block"),
		__("photos", "image-gallery-block"),
		__("gallery", "image-gallery-block"),
	],
	category: "widgets",
	icon,
	supports: {
		align: true,
	},
	attributes,
	edit: Edit,
	save: Save,
	example: Example,
});
