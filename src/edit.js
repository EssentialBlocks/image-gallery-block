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
import { Fragment, useEffect, useState, useRef } from "@wordpress/element";
import { select } from "@wordpress/data";
import { isEqual } from "lodash";

// Saved attributes come back from JSON, so compare through JSON too: keys holding
// `undefined` drop out and a freshly built but equal value counts as unchanged.
const isSameData = (next, current) =>
	isEqual(JSON.parse(JSON.stringify(next ?? null)), current ?? null);

/**
 * Internal depencencies
 */
import classnames from "classnames";

import Inspector from "./inspector";
import Style from "./style";
import { sanitizeCaption, FilterItemContent } from "./helpers";

const {
	duplicateBlockIdFix,
} = window.EBImageGalleryControls;

export default function Edit(props) {
	const {
		attributes,
		setAttributes,
		className,
		clientId,
		isSelected,
		name
	} = props;
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
		horizontalAlign,
		verticalAlign,
		styleNumber,
		overlayStyle,
		imageSize,
		classHook,
		filterItems,
		enableFilter,
		enableFilterAll,
		filterAllTitle,
		defaultFilter,
		imageGapRange,
		columnsRange,
		imageHeightRange,
		imageWidthRange,
		imageMaxHeightRange,
		imageMaxWidthRange,
		imgBorderShadowborderStyle,
		imgBorderShadowborderColor,
		imgBorderShadowBdr_Bottom,
		imgBorderShadowBdr_Left,
		imgBorderShadowBdr_Right,
		imgBorderShadowBdr_Top,
		imgBorderShadowRds_Bottom,
		imgBorderShadowRds_Left,
		imgBorderShadowRds_Right,
		imgBorderShadowRds_Top,
		enableIsotope,
		loadmoreBtnText,
		enableLoadMore,
		enableFilterIcon,
		filterIconPosition,
	} = attributes;

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

	//Set Image Sources on Change Image/Size
	useEffect(() => {
		const currentSources = [];

		images.map((image) => {
			let item = {};
			if (image.sizes && imageSize && imageSize.length > 0) {
				item.url = image.sizes[imageSize]
					? image.sizes[imageSize].url
					: image.url;
			} else {
				item.url = image.url;
			}
			// Lightbox keeps opening the original file when a smaller size is shown
			item.fullUrl = image.url;
			item.caption = image.caption;
			item.id = image.id;
			item.alt = image.alt;
			item.customLink = image.customLink ? image.customLink : "";
			item.openNewTab = image.openNewTab ? image.openNewTab : false;
			item.isValidUrl = image.isValidUrl !== undefined ? image.isValidUrl : true;
			sources.length > 0 &&
				sources.map((source) => {
					if (source.filter && source.id === image.id) {
						item.filter = source.filter;
					}
				});
			currentSources.push(item);
		});

		// Rebuilt on every load; writing an equal array would mark the post dirty.
		if (!isSameData(currentSources, sources)) {
			setAttributes({ sources: currentSources });
		}
	}, [images, imageSize]);

	// Get only urls for Lightbox
	let urls = [];
	images.map((image) => urls.push(image.url));

	// handle deprecation
	useEffect(() => {
		if (enableFilter == null) {
			setAttributes({ enableFilter: false });
		}
		if (filterItems == null) {
			setAttributes({
				filterItems: [
					{
						value: "filter-item-1",
						label: __("Filter Item 1", "image-gallery-block"),
					},
				],
			});
		}
		if (enableFilterAll == null) {
			setAttributes({ enableFilterAll: true });
		}
		if (filterAllTitle == null) {
			setAttributes({ filterAllTitle: "All" });
		}
	}, []);

	// The gallery renders inside the editor iframe, so Isotope gets the element
	// itself; a `document.querySelector` from the editor script never finds it.
	const galleryRef = useRef(null);
	const isotopeRef = useRef(null);
	// store the filter keyword in a state
	const [filterKey, setFilterKey] = useState("*");
	const isotopeActive = enableFilter || enableIsotope;

	const getFilterSelector = () =>
		enableFilter && filterKey !== "*" ? `.${filterKey}` : "*";
	// Isotope is built once images load, which can be after the user picks a
	// filter, so it reads the latest filter from here rather than a stale closure.
	const filterSelectorRef = useRef("*");
	filterSelectorRef.current = getFilterSelector();

	// Isotope ignores elements from another window, so use the copies loaded in
	// the gallery's own window (the editor iframe), falling back to this one.
	const getLayoutLibs = (gallery) => {
		const view = gallery.ownerDocument.defaultView || window;
		return {
			Isotope: view.Isotope || window.Isotope,
			imagesLoaded: view.imagesLoaded || window.imagesLoaded,
		};
	};

	// Build Isotope, and rebuild it when layout settings change.
	useEffect(() => {
		const gallery = galleryRef.current;
		if (!isotopeActive || !gallery) {
			return;
		}
		const libs = getLayoutLibs(gallery);
		if (!libs.Isotope || !libs.imagesLoaded) {
			return;
		}

		let cancelled = false;
		libs.imagesLoaded(gallery, () => {
			if (cancelled) {
				return;
			}
			// Same layout modes as the front end.
			const options = {
				itemSelector: ".eb-gallery-img-content",
				percentPosition: true,
				filter: filterSelectorRef.current,
			};
			if (layouts === "grid") {
				options.layoutMode = "fitRows";
			} else {
				options.masonry = { columnWidth: ".eb-gallery-img-content" };
			}
			isotopeRef.current = new libs.Isotope(gallery, options);
		});

		return () => {
			cancelled = true;
			if (isotopeRef.current) {
				isotopeRef.current.destroy();
				isotopeRef.current = null;
			}
		};
	}, [
		isotopeActive,
		layouts,
		resOption,
		imageSize,
		columnsRange,
		imageGapRange,
		imageHeightRange,
		imageWidthRange,
		imageMaxHeightRange,
		imageMaxWidthRange,
		imgBorderShadowborderStyle,
		imgBorderShadowborderColor,
		imgBorderShadowBdr_Bottom,
		imgBorderShadowBdr_Left,
		imgBorderShadowBdr_Right,
		imgBorderShadowBdr_Top,
		imgBorderShadowRds_Bottom,
		imgBorderShadowRds_Left,
		imgBorderShadowRds_Right,
		imgBorderShadowRds_Top,
	]);

	// Re-apply the filter when it changes, or when images or their filters change.
	useEffect(() => {
		const isotope = isotopeRef.current;
		const gallery = galleryRef.current;
		if (!isotope || !gallery) {
			return;
		}

		getLayoutLibs(gallery).imagesLoaded(gallery, () => {
			if (isotopeRef.current !== isotope) {
				return;
			}
			// Re-read items only when images were added, removed or reordered.
			// reloadItems() forgets which items are hidden, so carry that over,
			// or filtered-out images would never be revealed again.
			const elements = Array.from(gallery.children);
			const sameItems =
				isotope.items.length === elements.length &&
				isotope.items.every((item, i) => item.element === elements[i]);
			if (!sameItems) {
				isotope.reloadItems();
				isotope.items.forEach((item) => {
					item.isHidden = item.element.style.display === "none";
				});
			}
			isotope.arrange({ filter: getFilterSelector() });
		});
	}, [enableFilter, filterKey, sources]);

	useEffect(() => {
		if (defaultFilter && defaultFilter.length > 0) {
			setFilterKey(defaultFilter === '*' ? '*' : `eb-filter-img-${defaultFilter}`)
		}
	}, [defaultFilter])

	const handleFilterKeyChange = (event, value) => {
		setFilterKey(value);
	};

	return (
		<>
			{isSelected && images.length > 0 && (
				<Inspector
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			)}
			<>
				{urls.length === 0 && (
					<MediaPlaceholder
						onSelect={(images) => setAttributes({ images })}
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
				<Style {...props} />

				{urls.length > 0 && (
					<Fragment>
						<BlockControls>
							<ToolbarGroup>
								<ToolbarItem>
									{() => (
										<MediaUpload
											value={images.map((img) => img.id)}
											onSelect={(images) =>
												setAttributes({ images })
											}
											allowedTypes={["image"]}
											multiple
											gallery
											render={({ open }) => (
												<ToolbarButton
													className="components-toolbar__control"
													label={__(
														"Edit gallery",
														"image-gallery-block"
													)}
													icon="edit"
													onClick={open}
												/>
											)}
										/>
									)}
								</ToolbarItem>
							</ToolbarGroup>
						</BlockControls>

						<div
							className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
						>
							{enableFilter && (
								<ul className={`eb-img-gallery-filter-wrapper`}>
									{enableFilterAll && (
										<li
											className={`eb-img-gallery-filter-item ${filterKey === '*' ? "is-checked" : ""}`}
											data-filter="*"
											onClick={(event) =>
												handleFilterKeyChange(
													event,
													"*"
												)
											}
										>
											{filterAllTitle !== ""
												? filterAllTitle
												: "All"}
										</li>
									)}
									{filterItems.map(
										(item, index) => {
											const { value, label } = item;
											return (
												<li
													key={index}
													className={`eb-img-gallery-filter-item ${filterKey === `eb-filter-img-${value}` ? "is-checked" : ""}`}
													data-filter={`.eb-filter-img-${value}`}
													onClick={(event) =>
														handleFilterKeyChange(
															event,
															`eb-filter-img-${value}`
														)
													}
												>
													<FilterItemContent
														item={item}
														label={label}
														showIcon={enableFilterIcon}
														position={filterIconPosition}
													/>
												</li>
											);
										}
									)}
								</ul>
							)}

							<div
								className={`eb-gallery-img-wrapper ${blockId} ${layouts} ${overlayStyle} caption-style-${styleNumber} ${captionOnHover ? "caption-on-hover" : ""
									} ${enableFilter
										? "eb-filterable-img-gallery"
										: ""
									} ${enableIsotope ? 'enable-isotope' : 'no-isotope'} ${enableLoadMore ? 'show-loadmore' : ''}`}
								data-id={blockId}
								ref={galleryRef}
							>
								{sources.map((source, index) => {
									let filters;

									if (
										source.hasOwnProperty("filter") &&
										source.filter.length > 0
									) {
										filters = JSON.parse(source.filter);

										filters = filters.map(
											(filter) => filter.value
										);

										filters = filters.toString();

										filters = filters.replaceAll(
											",",
											" eb-filter-img-"
										);
									} else {
										filters = "";
									}

									return (
										<a
											key={index}
											className={`eb-gallery-img-content eb-filter-img-${filters}`}
										>
											<span className="eb-gallery-link-wrapper">
												<img
													className="eb-gallery-img"
													src={source.url}
													image-index={index}
												/>
												{displayCaption &&
													source.caption &&
													source.caption.length >
													0 && (
														<span
															className={`eb-gallery-img-caption ${horizontalAlign} ${verticalAlign}`}
															dangerouslySetInnerHTML={{ __html: sanitizeCaption(source.caption) }}
														></span>
													)}
											</span>
										</a>
									);
								})}
							</div>

							{enableLoadMore && (
								<button className="eb-img-gallery-loadmore">{loadmoreBtnText}</button>
							)}

						</div>

						<MediaUpload
							onSelect={(newImage) => {
								let updatedImages = [...images, ...newImage];
								let newSources = [];

								updatedImages.map((image) => {
									let item = {};
									item.url = image.url;
									item.caption = image.caption;
									item.id = image.id;

									sources.length > 0 &&
										sources.map((source) => {
											if (
												source.filter &&
												source.id === image.id
											) {
												item.filter = source.filter;
											}
										});

									newSources.push(item);
								});

								setAttributes({
									images: updatedImages,
									sources: newSources,
								});
							}}
							accept="image/*"
							allowedTypes={["image"]}
							multiple
							value={newImage}
							render={({ open }) =>
								!newImage && (
									<Button
										className="eb-gallery-upload-button"
										label={__(
											"Add Image",
											"image-gallery-block"
										)}
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
