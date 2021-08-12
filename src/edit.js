/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { MediaUpload, MediaPlaceholder, BlockControls, useBlockProps } = wp.blockEditor;
const { Toolbar, Button } = wp.components;
const { Fragment } = wp.element;
const { useEffect } = wp.element;
const { select } = wp.data; 


/**
 * External dependencies
 */
import Masonry from "react-masonry-component";

/**
  * Internal depencencies
*/
import Inspector from "./inspector";
import "./editor.scss";
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
} from "./constants";
import {
	softMinifyCssStrings,
	isCssExists,
	generateTypographyStyles,
	generateDimensionsControlStyles,
	generateBorderShadowStyles,
	generateResponsiveRangeStyles,
	generateBackgroundControlStyles,
	mimmikCssForPreviewBtnClick,
	duplicateBlockIdFix,
} from "../util/helpers";

export default function Edit(props) {
	const { attributes, setAttributes, clientId, isSelected } = props;
	const {
		resOption,
		blockId,
		blockMeta,
		images,
		layouts,
		selectedImgIndex,
		columns,
		sources,
		displayCaption,
		newImage,
		captionFontSize,
		captionSizeUnit,
		captionColor,
		horizontalAlign,
		verticalAlign,
		textAlign,
		styleNumber,
		paddingUnit,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		borderColor,
		borderWidth,
		borderStyle,
		shadowColor,
		hOffset,
		vOffset,
		blur,
		isMasonry,
	} = attributes;

	// this useEffect is for setting the resOption attribute to desktop/tab/mobile depending on the added 'eb-res-option-' class
	useEffect(() => {
		const bodyClasses = document.body.className;

		setAttributes({
			resOption: select("core/edit-post").__experimentalGetPreviewDeviceType(),
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

	// this useEffect is for mimmiking css when responsive options clicked from wordpress's 'preview' button
	useEffect(() => {
		mimmikCssForPreviewBtnClick({
			domObj: document,
			select,
		});
	}, []);

	const blockProps = useBlockProps({
		className: `eb-guten-block-main-parent-wrapper`,
	});

	/**
	 * CSS/styling Codes Starts from Here
	*/

	// Caption Typography 
	const {
		typoStylesDesktop: titleTypographyDesktop,
		typoStylesTab: titleTypographyTab,
		typoStylesMobile: titleTypographyMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: CAPTION_TYPOGRAPHY,
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

	// range controller Separator Image Gap
	const {
		rangeStylesDesktop: imageGapStyleDesktop,
		rangeStylesTab: imageGapStyleTab,
		rangeStylesMobile: imageGapStyleMobile,
	} = generateResponsiveRangeStyles({
		controlName: IMAGE_GAP,
		property: "grid-gap",
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
		overlayStylesDesktop: wrapperOverlayStylesDesktop,
		hoverOverlayStylesDesktop: wrapperHoverOverlayStylesDesktop,
		overlayStylesTab: wrapperOverlayStylesTab,
		hoverOverlayStylesTab: wrapperHoverOverlayStylesTab,
		overlayStylesMobile: wrapperOverlayStylesMobile,
		hoverOverlayStylesMobile: wrapperHoverOverlayStylesMobile,
		bgTransitionStyle: wrapperBgTransitionStyle,
		ovlTransitionStyle: wrapperOvlTransitionStyle,
	} = generateBackgroundControlStyles({
		attributes,
		controlName: WRAPPER_BG,
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
		// noShadow: true,
		// noBorder: true,
	});


	// wrapper styles css in strings ⬇
	const wrapperStylesDesktop = `
		.eb-gallery-img-wrapper.${blockId}{
			grid-template-columns: repeat(${gridColumnsDesktop.replace(/[^0-9]/g, '')}, auto);
			${imageGapStyleDesktop}
			${wrapperMarginDesktop}
			${wrapperPaddingDesktop}
			${wrapperBDShadowDesktop}
			${wrapperBackgroundStylesDesktop}
			${wrapperOverlayStylesDesktop}
			${wrapperBgTransitionStyle}
			${wrapperOvlTransitionStyle}
		}
		.eb-gallery-img-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverDesktop}
			${wrapperHoverBackgroundStylesDesktop}
			${wrapperHoverOverlayStylesDesktop}
		}
	`;
	const wrapperStylesTab = `
		.eb-gallery-img-wrapper.${blockId}{
			${wrapperMarginTab}
			${wrapperPaddingTab}
			${wrapperBDShadowTab}
			${wrapperBackgroundStylesTab}
			${wrapperOverlayStylesTab}
		}
		.eb-gallery-img-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverTab}
			${wrapperHoverBackgroundStylesTab}
			${wrapperHoverOverlayStylesTab}
		}
	`;
	const wrapperStylesMobile = `
		.eb-gallery-img-wrapper.${blockId}{
			${wrapperMarginMobile}
			${wrapperPaddingMobile}
			${wrapperBDShadowMobile}
			${wrapperBackgroundStylesMobile}
			${wrapperOverlayStylesMobile}
		}
		.eb-gallery-img-wrapper.${blockId}:hover {
			${wrapperBDShadowHoverMobile}
			${wrapperHoverBackgroundStylesMobile}
			${wrapperHoverOverlayStylesMobile}
		}
	`;

	// all css styles for large screen width (desktop/laptop) in strings ⬇
	const desktopAllStyles = softMinifyCssStrings(`
		${isCssExists(wrapperStylesDesktop) ? wrapperStylesDesktop : " "}
	`);

	// all css styles for Tab in strings ⬇
	const tabAllStyles = softMinifyCssStrings(`
		${isCssExists(wrapperStylesTab) ? wrapperStylesTab : " "}
	`);

	// all css styles for Mobile in strings ⬇
	const mobileAllStyles = softMinifyCssStrings(`
		${isCssExists(wrapperStylesMobile) ? wrapperStylesMobile : " "}
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

	return [
		isSelected && images.length > 0 && (
			<Inspector attributes={attributes} setAttributes={setAttributes} />
		),
		<Fragment>
			{urls.length === 0 && (
				<MediaPlaceholder
					onSelect={(images) => onImageSelect(images)}
					allowTypes={["image"]}
					multiple
					labels={{
						title: "Images",
						instructions:
							"Drag media files, upload or select files from your library.",
					}}
				/>
			)}
		</Fragment>,
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
						<Toolbar>
							<MediaUpload
								value={images.map((img) => img.id)}
								onSelect={(images) => onImageSelect(images)}
								allowedTypes={["image"]}
								multiple
								gallery
								render={({ open }) => (
									<Button
										className="components-toolbar__control"
										label={__("Edit gallery")}
										icon="edit"
										onClick={open}
									/>
								)}
							/>
						</Toolbar>
					</BlockControls>

					<div 
						className={`eb-gallery-img-wrapper ${blockId} ${layouts} caption-style-${styleNumber}`} 
						data-id={blockId}
					>
						{sources.map((source, index) => (
							<div className={`eb-gallery-img-content`}>
								<img className="eb-gallery-img" src={source.url} image-index={index} />
								{displayCaption && (
									<span className="eb-gallery-img-caption">{source.caption}</span>
								)}
							</div>
						))}
					</div>

					<MediaUpload
						onSelect={(newImage) => {
							let updatedImages = [...images, newImage];
							let sources = [];

							updatedImages.map((image) => {
								let item = {};
								item.url = image.url;
								item.caption = image.caption;
								sources.push(item);
							});

							setAttributes({ images: updatedImages, sources });
						}}
						type="image"
						value={newImage}
						render={({ open }) =>
							!newImage && (
								<Button
									className="eb-gallery-upload-button"
									label={__("Add Image")}
									icon="plus-alt"
									onClick={open}
								>
									Add an Image
								</Button>
							)
						}
					/>
				</Fragment>
			)}
		</div>,
	];
};