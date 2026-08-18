/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import Save from "./save";
import Edit from "./edit";
import Attributes from "./attributes";
import example from "./example";
import { ImageGalleryIcon } from "./icon";
import deprecated from "./deprecated";
import "./style.scss";
import metadata from "../block.json";
const { ebConditionalRegisterBlockType } = EBImageGalleryControls;

ebConditionalRegisterBlockType(metadata, {
	icon: ImageGalleryIcon,
	attributes: Attributes,
	keywords: [
		__("images", "image-gallery-block"),
		__("photos", "image-gallery-block"),
		__("eb image gallery", "image-gallery-block"),
	],
	edit: Edit,
	save: Save,
	example,
	deprecated,
});
