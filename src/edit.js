/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { MediaUpload, MediaPlaceholder, BlockControls } = wp.blockEditor;
const { Toolbar, Button } = wp.components;
const { Fragment, useState } = wp.element;

/**
 * External dependencies
 */
// import FsLightbox from "fslightbox-react";
import Masonry from "react-masonry-component";
import Inspector from "./inspector";

const Edit = ({ isSelected, attributes, setAttributes }) => {
	const {
		images,
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

	const masonryOptions = {
		transitionDuration: "0.5s",
	};

	const imagesLoadedOptions = { background: ".eb-lightbox-image-bg" };

	const captionStyles = {
		fontSize: captionFontSize
			? `${captionFontSize}${captionSizeUnit}`
			: undefined,
		color: captionColor || undefined,
		display: "flex",
		justifyContent: horizontalAlign,
		alignItems: verticalAlign,
		textAlign: textAlign,
		padding: `${paddingTop || 0}${paddingUnit} ${
			paddingRight || 0
		}${paddingUnit} ${paddingBottom || 0}${paddingUnit} ${
			paddingLeft || 0
		}${paddingUnit}`,
	};

	// const [lightboxController, setLightboxController] = useState({
	// 	toggler: false,
	// 	sourceIndex: 0
	// });

	// function openLightboxOnSlide(number) {
	// 	setLightboxController({
	// 		toggler: !lightboxController.toggler,
	// 		sourceIndex: number
	// 	});
	// }

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

	function renderMesonry(sources) {
		return (
			<Masonry
				className={"eb-gallery-grid"}
				elementType={"div"}
				options={masonryOptions}
				disableImagesLoaded={false}
				updateOnEachImageLoad={false}
				imagesLoadedOptions={imagesLoadedOptions}
			>
				{sources.map((source, index) => (
					<a
						className={`eb-gallery-img-link caption-style-${styleNumber} ${
							isMasonry ? "eb-gallery-grid-item" : ""
						} ${selectedImgIndex === index ? "eb-is-sorting" : ""}`}
						style={{
							width: isMasonry && `${100 / columns}%`,
							padding: `${
								typeof paddingTop !== "undefined"
									? paddingTop
									: 3
							}${paddingUnit} ${
								typeof paddingRight !== "undefined"
									? paddingRight
									: 3
							}${paddingUnit} ${
								typeof paddingBottom !== "undefined"
									? paddingBottom
									: 3
							}${paddingUnit} ${
								typeof paddingLeft !== "undefined"
									? paddingLeft
									: 3
							}${paddingUnit}`,
						}}
						// onClick={() => openLightboxOnSlide(index)}
					>
						<img
							className="eb-gallery-img"
							src={source.url}
							style={{
								border: `${borderWidth || 0}px ${borderStyle} ${
									borderColor || "gray"
								}`,
								filter: `drop-shadow(${hOffset || 0}px ${
									vOffset || 0
								}px ${blur || 0}px ${shadowColor || "gray"})`,
							}}
						/>
						{displayCaption && (
							<span
								className="eb-gallery-img-caption"
								style={captionStyles}
							>
								{source.caption}
							</span>
						)}
					</a>
				))}
			</Masonry>
		);
	}

	function renderImages(sources) {
		return (
			<div className={`eb-gallery-img-wrapper columns-${columns}`}>
				{sources.map((source, index) => (
					<a
						className={`eb-gallery-img-link caption-style-${styleNumber} ${
							selectedImgIndex === index ? "eb-is-sorting" : ""
						}`}
						style={{
							padding: `${paddingTop || 0}${paddingUnit} ${
								paddingRight || 0
							}${paddingUnit} ${
								paddingBottom || 0
							}${paddingUnit} ${paddingLeft || 0}${paddingUnit}`,
						}}
						// onClick={() => openLightboxOnSlide(index)}
					>
						<img
							className="eb-gallery-img"
							src={source.url}
							style={{
								border: `${borderWidth || 0}px ${borderStyle} ${
									borderColor || "gray"
								}`,
								filter: `drop-shadow(${hOffset || 0}px ${
									vOffset || 0
								}px ${blur || 0}px ${shadowColor || "gray"})`,
							}}
						/>
						{displayCaption && (
							<span
								className="eb-gallery-img-caption"
								style={captionStyles}
							>
								{source.caption}
							</span>
						)}
					</a>
				))}
			</div>
		);
	}

	function renderPlaceholder() {
		return (
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
		);
	}

	// Get only urls for Lightbox
	let urls = [];
	images.map((image) => urls.push(image.url));

	return [
		isSelected && images.length > 0 && (
			<Inspector attributes={attributes} setAttributes={setAttributes} />
		),
		<Fragment>
			{urls.length === 0
				? renderPlaceholder()
				: isMasonry
				? renderMesonry(sources)
				: renderImages(sources)}
		</Fragment>,
		urls.length > 0 && (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<MediaUpload
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
				{/*
				<FsLightbox
					toggler={lightboxController.toggler}
					sourceIndex={lightboxController.sourceIndex}
					sources={urls}
					key={urls[lightboxController.sourceIndex]} // Fixes image reorder issue
				/>
        */}
			</Fragment>
		),
	];
};

export default Edit;
