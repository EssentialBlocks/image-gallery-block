/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	MediaUpload,
	MediaPlaceholder,
	BlockControls,
	useBlockProps,
} from "@wordpress/block-editor";
import {
	ToolbarGroup,
	ToolbarItem,
	ToolbarButton,
	Button,
} from "@wordpress/components";
import { Fragment, useEffect } from "@wordpress/element";
import { select } from "@wordpress/data";

/**
 * Internal depencencies
 */
import classnames from "classnames";

import Inspector from "./inspector";
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
	CAPTION_TYPOGRAPHY,
	CAPTION_WIDTH,
} from "./constants";

const {
	softMinifyCssStrings,
	generateTypographyStyles,
	generateDimensionsControlStyles,
	generateBorderShadowStyles,
	generateResponsiveRangeStyles,
	generateBackgroundControlStyles,
	// mimmikCssForPreviewBtnClick,
	duplicateBlockIdFix,
} = window.EBImageGalleryControls;

const editorStoreForGettingPreivew =
	eb_conditional_localize.editor_type === "edit-site"
		? "core/edit-site"
		: "core/edit-post";

export default function Edit(props) {
	const { attributes, setAttributes, className, clientId, isSelected } = props;
	const {
		resOption,
		blockId,
		blockMeta,
		images,
		layouts,
		sources,
		displayCaption,
		captionOnHover,
		newImage,
		captionColor,
		captionBGColor,
		overlayColor,
		horizontalAlign,
		verticalAlign,
		textAlign,
		styleNumber,
		overlayStyle,
		classHook,
	} = attributes;

	// this useEffect is for setting the resOption attribute to desktop/tab/mobile depending on the added 'eb-res-option-' class
	useEffect(() => {
		const bodyClasses = document.body.className;

		setAttributes({
			resOption: select(
				editorStoreForGettingPreivew
			).__experimentalGetPreviewDeviceType(),
		});
	}, []);

	// this useEffect is for creating a unique id for each block's unique className by a random unique number
	useEffect(() => {
		const BLOCK_PREFIX = "eb-image-gallery";
		duplicateBlockIdFix({
			BLOCK_PREFIX,
			blockId,
			setAttributes,
			select,
			clientId,
		});
	}, []);

	const blockProps = useBlockProps({
		className: classnames(className, `eb-guten-block-main-parent-wrapper`),
	});

	/**
	 * CSS/styling Codes Starts from Here
	 */

	// Caption Typography
	const {
		typoStylesDesktop: captionTypographyDesktop,
		typoStylesTab: captionTypographyTab,
		typoStylesMobile: captionTypographyMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: CAPTION_TYPOGRAPHY,
		defaultFontSize: 13,
	});

	/* Wrapper Margin */
	const {
		dimensionStylesDesktop: wrapperMarginDesktop,
		dimensionStylesTab: wrapperMarginTab,
		dimensionStylesMobile: wrapperMarginMobile,
	} = generateDimensionsControlStyles({
		controlName: WRAPPER_MARGIN,
		styleFor: "margin",
		attributes,
	});

	/* Wrapper Padding */
	const {
		dimensionStylesDesktop: wrapperPaddingDesktop,
		dimensionStylesTab: wrapperPaddingTab,
		dimensionStylesMobile: wrapperPaddingMobile,
	} = generateDimensionsControlStyles({
		controlName: WRAPPER_PADDING,
		styleFor: "padding",
		attributes,
	});

	/* Caption Margin */
	const {
		dimensionStylesDesktop: captionMarginDesktop,
		dimensionStylesTab: captionMarginTab,
		dimensionStylesMobile: captionMarginMobile,
	} = generateDimensionsControlStyles({
		controlName: CAPTION_MARGIN,
		styleFor: "margin",
		attributes,
	});

	/* Caption Padding */
	const {
		dimensionStylesDesktop: captionPaddingDesktop,
		dimensionStylesTab: captionPaddingTab,
		dimensionStylesMobile: captionPaddingMobile,
	} = generateDimensionsControlStyles({
		controlName: CAPTION_PADDING,
		styleFor: "padding",
		attributes,
	});

	// range controller Separator Line Grid Column
	const {
		rangeStylesDesktop: gridColumnsDesktop,
		rangeStylesTab: gridColumnsTab,
		rangeStylesMobile: gridColumnsMobile,
	} = generateResponsiveRangeStyles({
		controlName: GRID_COLUMNS,
		property: "",
		attributes,
	});

	// range controller Separator Line Grid Column Margin Bottom
	const {
		rangeStylesDesktop: captionWidthDesktop,
		rangeStylesTab: captionWidthTab,
		rangeStylesMobile: captionWidthMobile,
	} = generateResponsiveRangeStyles({
		controlName: CAPTION_WIDTH,
		property: "width",
		attributes,
	});

	// range controller Separator Image Gap
	const {
		rangeStylesDesktop: imageGapStyleDesktop,
		rangeStylesTab: imageGapStyleTab,
		rangeStylesMobile: imageGapStyleMobile,
	} = generateResponsiveRangeStyles({
		controlName: IMAGE_GAP,
		property: "gap",
		attributes,
	});

	//Generate Background
	const {
		backgroundStylesDesktop: wrapperBackgroundStylesDesktop,
		hoverBackgroundStylesDesktop: wrapperHoverBackgroundStylesDesktop,
		backgroundStylesTab: wrapperBackgroundStylesTab,
		hoverBackgroundStylesTab: wrapperHoverBackgroundStylesTab,
		backgroundStylesMobile: wrapperBackgroundStylesMobile,
		hoverBackgroundStylesMobile: wrapperHoverBackgroundStylesMobile,
		bgTransitionStyle: wrapperBgTransitionStyle,
	} = generateBackgroundControlStyles({
		attributes,
		controlName: WRAPPER_BG,
		noOverlay: true,
	});

	// generateBorderShadowStyles for Wrapper ⬇
	const {
		styesDesktop: wrapperBDShadowDesktop,
		styesTab: wrapperBDShadowTab,
		styesMobile: wrapperBDShadowMobile,
		stylesHoverDesktop: wrapperBDShadowHoverDesktop,
		stylesHoverTab: wrapperBDShadowHoverTab,
		stylesHoverMobile: wrapperBDShadowHoverMobile,
		transitionStyle: wrapperBDShadowTransitionStyle,
	} = generateBorderShadowStyles({
		controlName: WRAPPER_BORDER_SHADOW,
		attributes,
		// noShadow: true,
		// noBorder: true,
	});

	// generateBorderShadowStyles for Images ⬇
	const {
		styesDesktop: imageBDShadowDesktop,
		styesTab: imageBDShadowTab,
		styesMobile: imageBDShadowMobile,
		stylesHoverDesktop: imageBDShadowHoverDesktop,
		stylesHoverTab: imageBDShadowHoverTab,
		stylesHoverMobile: imageBDShadowHoverMobile,
		transitionStyle: imageBDShadowTransitionStyle,
	} = generateBorderShadowStyles({
		controlName: IMAGE_BORDER_SHADOW,
		attributes,
		noShadow: true,
		// noBorder: true,
	});

	// wrapper styles css in strings ⬇
	const wrapperStylesDesktop = `
		.eb-gallery-img-wrapper.${blockId}{
			${imageGapStyleDesktop}
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${wrapperBDShadowDesktop}
			${wrapperBackgroundStylesDesktop}
			transition:${wrapperBgTransitionStyle}, ${wrapperBDShadowTransitionStyle};
		}
		.eb-gallery-img-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverDesktop}
			${wrapperHoverBackgroundStylesDesktop}
		}
		.eb-gallery-img-wrapper.${blockId}.grid{
			grid-template-columns: repeat(${gridColumnsDesktop.replace(
		/[^0-9]/g,
		""
	)}, auto);
		}
		.eb-gallery-img-wrapper.${blockId}.masonry{
			columns: ${gridColumnsDesktop.replace(/[^0-9]/g, "")};
		}
		.eb-gallery-img-wrapper.${blockId}.masonry .eb-gallery-img-content{
			margin-bottom: ${imageGapStyleDesktop.replace(/[^0-9]/g, "")}px;
		}
	`;
	const wrapperStylesTab = `
		.eb-gallery-img-wrapper.${blockId}{
			${imageGapStyleTab}
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${wrapperBDShadowTab}
			${wrapperBackgroundStylesTab}
		}
		.eb-gallery-img-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverTab}
			${wrapperHoverBackgroundStylesTab}
		}
		.eb-gallery-img-wrapper.${blockId}.grid{
			grid-template-columns: repeat(${gridColumnsTab.replace(/[^0-9]/g, "")}, auto);
		}
		.eb-gallery-img-wrapper.${blockId}.masonry{
			columns: ${gridColumnsTab.replace(/[^0-9]/g, "")};
		}
		.eb-gallery-img-wrapper.${blockId}.masonry .eb-gallery-img-content{
			margin-bottom: calc(${imageGapStyleTab.replace(
		/[^0-9]/g,
		""
	)}px - ${gridColumnsTab.replace(/[^0-9]/g, "")}px);
		}
	`;
	const wrapperStylesMobile = `
		.eb-gallery-img-wrapper.${blockId}{
			${imageGapStyleMobile}
			${wrapperMarginMobile}
			${wrapperPaddingMobile}
			${wrapperBDShadowMobile}
			${wrapperBackgroundStylesMobile}
		}
		.eb-gallery-img-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverMobile}
			${wrapperHoverBackgroundStylesMobile}
		}
		.eb-gallery-img-wrapper.${blockId}.grid{
			grid-template-columns: repeat(${gridColumnsMobile.replace(
		/[^0-9]/g,
		""
	)}, auto);
		}
		.eb-gallery-img-wrapper.${blockId}.masonry{
			columns: ${gridColumnsMobile.replace(/[^0-9]/g, "")};
		}
		.eb-gallery-img-wrapper.${blockId}.masonry .eb-gallery-img-content{
			margin-bottom: calc(${imageGapStyleMobile.replace(
		/[^0-9]/g,
		""
	)}px - ${gridColumnsMobile.replace(/[^0-9]/g, "")}px);
		}
	`;

	const imageStylesDesktop = `
		.eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-gallery-link-wrapper {
			${imageBDShadowDesktop}
			transition:${imageBDShadowTransitionStyle};
		}
		.eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content:hover .eb-gallery-link-wrapper {
			${imageBDShadowHoverDesktop}
		}
		.eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-gallery-img-caption {
			color: ${captionColor};
			background-color: ${captionBGColor};
			text-align: ${textAlign};
			${captionMarginDesktop}
			${captionPaddingDesktop}
			${captionTypographyDesktop}
			${captionWidthDesktop}
		}
		.eb-gallery-img-wrapper.${blockId}.caption-style-2 .eb-gallery-link-wrapper:after {
			background-color: ${overlayColor};
		}
	`;

	const imageStylesTab = `
		.eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content img{
			${imageBDShadowTab}
		}
		.eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content:hover img{
			${imageBDShadowHoverTab}
		}
		.eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-gallery-img-caption {
			${captionMarginTab}
			${captionPaddingTab}
			${captionTypographyTab}
			${captionWidthTab}
		}
	`;

	const imageStylesMobile = `
		.eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content img{
			${imageBDShadowMobile}
		}
		.eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content:hover img{
			${imageBDShadowHoverMobile}
		}
		.eb-gallery-img-wrapper.${blockId} .eb-gallery-img-content .eb-gallery-img-caption {
			${captionMarginMobile}
			${captionPaddingMobile}
			${captionTypographyMobile}
			${captionWidthMobile}
		}
	`;

	// all css styles for large screen width (desktop/laptop) in strings ⬇
	const desktopAllStyles = softMinifyCssStrings(`
		${wrapperStylesDesktop}
		${imageStylesDesktop}
	`);

	// all css styles for Tab in strings ⬇
	const tabAllStyles = softMinifyCssStrings(`
		${wrapperStylesTab}
		${imageStylesTab}
	`);

	// all css styles for Mobile in strings ⬇
	const mobileAllStyles = softMinifyCssStrings(`
		${wrapperStylesMobile}
		${imageStylesMobile}
	`);

	// Set All Style in "blockMeta" Attribute
	useEffect(() => {
		const styleObject = {
			desktop: desktopAllStyles,
			tab: tabAllStyles,
			mobile: mobileAllStyles,
		};
		if (JSON.stringify(blockMeta) != JSON.stringify(styleObject)) {
			setAttributes({ blockMeta: styleObject });
		}
	}, [attributes]);

	function onImageSelect(images) {
		let sources = [];
		images.map((image) => {
			let item = {};
			item.url = image.url;
			item.caption = image.caption;
			sources.push(item);
		});

		setAttributes({ images, sources });
	}

	// Get only urls for Lightbox
	let urls = [];
	images.map((image) => urls.push(image.url));

	return (
		<>
			{isSelected && images.length > 0 && (
				<Inspector attributes={attributes} setAttributes={setAttributes} />
			)}
			<>
				{urls.length === 0 && (
					<MediaPlaceholder
						onSelect={(images) => onImageSelect(images)}
						accept="image/*"
						allowedTypes={["image"]}
						multiple
						labels={{
							title: "Images",
							instructions:
								"Drag media files, upload or select files from your library.",
						}}
					/>
				)}
			</>
			<div {...blockProps}>
				<style>
					{`
				${desktopAllStyles}

				/* mimmikcssStart */

				${resOption === "Tablet" ? tabAllStyles : " "}
				${resOption === "Mobile" ? tabAllStyles + mobileAllStyles : " "}

				/* mimmikcssEnd */

				@media all and (max-width: 1024px) {	

					/* tabcssStart */			
					${softMinifyCssStrings(tabAllStyles)}
					/* tabcssEnd */			
				
				}
				
				@media all and (max-width: 767px) {
					
					/* mobcssStart */			
					${softMinifyCssStrings(mobileAllStyles)}
					/* mobcssEnd */			
				
				}
				`}
				</style>
				{urls.length > 0 && (
					<Fragment>
						<BlockControls>
							<ToolbarGroup>
								<ToolbarItem>
									{() => (
										<MediaUpload
											value={images.map((img) => img.id)}
											onSelect={(images) => onImageSelect(images)}
											allowedTypes={["image"]}
											multiple
											gallery
											render={({ open }) => (
												<ToolbarButton
													className="components-toolbar__control"
													label={__("Edit gallery", "essential-blocks")}
													icon="edit"
													onClick={open}
												/>
											)}
										/>
									)}
								</ToolbarItem>
							</ToolbarGroup>
						</BlockControls>

						<div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
							<div
								className={`eb-gallery-img-wrapper ${blockId} ${layouts} ${overlayStyle} caption-style-${styleNumber} ${captionOnHover ? "caption-on-hover" : ""
									}`}
								data-id={blockId}
							>
								{sources.map((source, index) => (
									<a key={index} className={`eb-gallery-img-content`}>
										<span className="eb-gallery-link-wrapper">
											<img
												className="eb-gallery-img"
												src={source.url}
												image-index={index}
											/>
											{displayCaption &&
												source.caption &&
												source.caption.length > 0 && (
													<span
														className={`eb-gallery-img-caption ${horizontalAlign} ${verticalAlign}`}
													>
														{source.caption}
													</span>
												)}
										</span>
									</a>
								))}
							</div>
						</div>

						<MediaUpload
							onSelect={(newImage) => {
								let updatedImages = [...images, ...newImage];
								let sources = [];

								updatedImages.map((image) => {
									let item = {};
									item.url = image.url;
									item.caption = image.caption;
									sources.push(item);
								});

								setAttributes({ images: updatedImages, sources });
							}}
							accept="image/*"
							allowedTypes={["image"]}
							multiple
							value={newImage}
							render={({ open }) =>
								!newImage && (
									<Button
										className="eb-gallery-upload-button"
										label={__("Add Image", "essential-blocks")}
										icon="plus-alt"
										onClick={open}
									>
										Add More Images
									</Button>
								)
							}
						/>
					</Fragment>
				)}
			</div>
		</>
	);
}
