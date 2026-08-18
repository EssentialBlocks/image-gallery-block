/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	Button,
	ButtonGroup,
	BaseControl,
	TabPanel,
	TextControl,
	PanelRow,
	RangeControl,
	__experimentalDivider as Divider,
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import { select } from "@wordpress/data";

/**
 * Internal depencencies
 */

import objAttributes from "./attributes";

import SortableFilterItems from "./sortable-filteritems";

/**
 * External Dependencies
 */
import Select2 from "react-select";

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
	LAYOUTS,
	STYLES,
	OVERLAY_STYLES,
	TEXT_ALIGN,
	HORIZONTAL_ALIGN,
	VERTICAL_ALIGN,
	UNIT_TYPES,
	IMAGE_UNIT_TYPES,
	IMAGE_WIDTH,
	IMAGE_HEIGHT,
	IMAGE_MAX_WIDTH,
	IMAGE_MAX_HEIGHT,
	IMAGE_SIZE_TYPE,
	FLEX_ALIGN,
	FILTER_PADDING,
	FILTER_MARGIN,
	NORMAL_HOVER,
	FILTER_BORDER_SHADOW,
	LOADMORE_PADDING,
	LOADMORE_BORDER,
} from "./constants";

import { FILTER_TYPOGRAPHY, LOADMORE_TYPOGRAPHY } from "./typoConstants";

import { handleCustomURL, handleOpenNewTab } from "./helpers";

const {
	ResponsiveDimensionsControl,
	TypographyDropdown,
	BorderShadowControl,
	ResponsiveRangeController,
	BackgroundControl,
	ColorControl,
	AdvancedControls,
	EbImageSizeSelector,
	DynamicInputControl
} = window.EBImageGalleryControls;

function Inspector(props) {
	const { attributes, setAttributes } = props;
	const {
		resOption,
		layouts,
		displayCaption,
		captionOnHover,
		captionColor,
		overlayColor,
		captionBGColor,
		horizontalAlign,
		verticalAlign,
		textAlign,
		styleNumber,
		overlayStyle,
		disableLightBox,
		imageSizeType,
		imageSize,
		imageAlignment,
		enableFilter,
		enableFilterAll,
		filterAllTitle,
		sources,
		filterItems,
		defaultFilter,
		filterColorType,
		filterColor,
		filterHoverColor,
		filterBGColor,
		filterHoverBGColor,
		filterActColor,
		filterActBGColor,
		addCustomLink,
		images,
		enableIsotope,
		enableLoadMore,
		loadmoreBtnText,
		loadmoreColor,
		loadmoreHvColor,
		loadmoreBGColor,
		loadmoreHvBGColor,
		imagesPerPage,
	} = attributes;

	const [defaultFilterOptions, setDefaultFilterOptions] = useState("");

	/**
	 * Get All Image Sizes
	 */
	const [imageAllSizes, setImageAllSizes] = useState([]);
	useEffect(() => {
		const sizes = select("core/block-editor").getSettings().imageSizes;
		if (typeof sizes === "object" && sizes.length > 0) {
			let updatedSize = [
				{
					label: "Default",
					value: "",
				},
			];
			sizes.map((item, index) => {
				updatedSize.push({
					label: item.name,
					value: item.slug,
				});
			});
			setImageAllSizes(updatedSize);
		}
	}, []);

	useEffect(() => {
		if (!enableFilter) {
			return
		}
		let options = [{
			label: filterAllTitle,
			value: '*'
		}]

		if (filterItems.length > 0) {
			options = [
				...options,
				...filterItems
			]
		}
		if (!defaultFilter) {
			setAttributes({ defaultFilter: '*' })
		}
		setDefaultFilterOptions([...options])

	}, [filterItems, enableFilterAll])

	useEffect(() => {
		{ enableFilter === true ? setAttributes({ enableIsotope: false }) : null }
	}, [enableFilter])

	useEffect(() => {
		{ enableIsotope === false ? setAttributes({ enableLoadMore: false }) : null }
	}, [enableIsotope])

	/**
	 * Change Preset Styles
	 */
	const changeStyle = (selected) => {
		setAttributes({ styleNumber: selected });
		switch (selected) {
			case "0":
				setAttributes({});
				break;
			case "1":
				setAttributes({});
				break;
			case "2":
				setAttributes({
					displayCaption: true,
				});
				break;
			default:
				return false;
		}
	};

	const resRequiredProps = {
		setAttributes,
		resOption,
		attributes,
		objAttributes,
	};

	// add filter item
	const onFilterAdd = () => {
		const count = attributes.filterItems.length + 1;
		const filterItems = [
			...attributes.filterItems,
			{
				value: `filter-item-${count}`,
				label: `Filter Item ${count}`,
			},
		];

		setAttributes({ filterItems: filterItems });
	};

	const handleFilter = (text, id) => {
		let updatedSources = sources.map((item, index) => {
			if (id === index) {
				const newTime = { ...item };
				newTime.filter = text;
				return newTime;
			}
			return item;
		});

		setAttributes({ sources: updatedSources });
	};

	const handleSelect2Filter = (options, id) => {
		let newOptions = JSON.stringify(options);

		let updatedSources = sources.map((item, index) => {
			if (id === index) {
				const newItime = { ...item };
				newItime.filter = newOptions;
				return newItime;
			}
			return item;
		});

		setAttributes({ sources: updatedSources });
	};

	return (
		<InspectorControls key="controls">
			<div className="eb-panel-control">
				<TabPanel
					className="eb-parent-tab-panel"
					activeClass="active-tab"
					// onSelect={onSelect}
					tabs={[
						{
							name: "general",
							title: "General",
							className: "eb-tab general",
						},
						{
							name: "styles",
							title: "Style",
							className: "eb-tab styles",
						},
						{
							name: "advance",
							title: "Advanced",
							className: "eb-tab advance",
						},
					]}
				>
					{(tab) => (
						<div className={"eb-tab-controls" + tab.name}>
							{tab.name === "general" && (
								<>
									<PanelBody
										title={__(
											"General",
											"image-gallery-block"
										)}
										initialOpen={true}
									>
										<SelectControl
											label={__(
												"Layouts",
												"image-gallery-block"
											)}
											value={layouts}
											options={LAYOUTS}
											onChange={(layouts) =>
												setAttributes({ layouts })
											}
										/>

										<SelectControl
											label={__(
												"Styles",
												"image-gallery-block"
											)}
											value={styleNumber}
											options={STYLES}
											onChange={(styleNumber) =>
												changeStyle(styleNumber)
											}
										/>

										{styleNumber === "2" && (
											<SelectControl
												label={__(
													"Overlay Styles",
													"image-gallery-block"
												)}
												value={overlayStyle}
												options={OVERLAY_STYLES}
												onChange={(overlayStyle) =>
													setAttributes({
														overlayStyle,
													})
												}
											/>
										)}

										<ToggleControl
											label={__(
												"Display Caption",
												"image-gallery-block"
											)}
											checked={displayCaption}
											onChange={() =>
												setAttributes({
													displayCaption: !displayCaption,
												})
											}
										/>

										<EbImageSizeSelector
											attrname={"imageSize"}
											resRequiredProps={resRequiredProps}
											label={"Image Size"} //Optional
										/>

										{displayCaption && styleNumber === "0" && (
											<ToggleControl
												label={__(
													"Display Caption on Hover",
													"image-gallery-block"
												)}
												checked={captionOnHover}
												onChange={() =>
													setAttributes({
														captionOnHover: !captionOnHover,
													})
												}
											/>
										)}

										<ResponsiveRangeController
											baseLabel={__(
												"Columns",
												"image-gallery-block"
											)}
											controlName={GRID_COLUMNS}
											resRequiredProps={resRequiredProps}
											units={[]}
											min={1}
											max={8}
											step={1}
										/>

										<ResponsiveRangeController
											baseLabel={__(
												"Image Gap (px)",
												"image-gallery-block"
											)}
											controlName={IMAGE_GAP}
											resRequiredProps={resRequiredProps}
											units={[]}
											min={0}
											max={100}
											step={1}
										/>

										<ToggleControl
											label={__(
												"Disable Light Box",
												"image-gallery-block"
											)}
											checked={disableLightBox}
											onChange={() =>
												setAttributes({
													disableLightBox: !disableLightBox,
												})
											}
										/>
										{disableLightBox && (
											<ToggleControl
												label={__(
													"Add custom link?",
													"image-gallery-block"
												)}
												checked={addCustomLink}
												onChange={() =>
													setAttributes({
														addCustomLink: !addCustomLink,
													})
												}
											/>
										)}

										{!enableFilter && (
											<>
												<ToggleControl
													label={__(
														"Enable Isotope",
														"image-gallery-block"
													)}
													checked={enableIsotope}
													onChange={() =>
														setAttributes({
															enableIsotope: !enableIsotope,
														})
													}
												/>
											</>
										)}
									</PanelBody>

									<PanelBody
										title={__("Filter", "image-gallery-block")}
										initialOpen={false}
									>
										<ToggleControl
											label={__(
												"Enable Filter",
												"image-gallery-block"
											)}
											checked={enableFilter}
											onChange={() =>
												setAttributes({
													enableFilter: !enableFilter,
												})
											}
										/>

										{enableFilter && (
											<ToggleControl
												label={__(
													'Enable "All"',
													"image-gallery-block"
												)}
												checked={enableFilterAll}
												onChange={() =>
													setAttributes({
														enableFilterAll: !enableFilterAll,
													})
												}
											/>
										)}

										{enableFilter && enableFilterAll && (
											<TextControl
												label={__(
													'"ALL" Text',
													"image-gallery-block"
												)}
												value={filterAllTitle}
												onChange={(newtitle) =>
													setAttributes({
														filterAllTitle: newtitle,
													})
												}
											/>
										)}

										{enableFilter && (
											<>
												<SelectControl
													label={__(
														"Default Selected Filter",
														"image-gallery-block"
													)}
													value={defaultFilter}
													options={defaultFilterOptions}
													onChange={(selected) =>
														setAttributes({ defaultFilter: selected })
													}
												/>

												<Divider />
												<PanelRow>
													{__(
														"Filter Items",
														"image-gallery-block"
													)}
												</PanelRow>
												<SortableFilterItems
													filterItems={
														attributes.filterItems
													}
													setAttributes={
														setAttributes
													}
												/>
												<Button
													className="eb-pricebox-feature-button"
													label={__(
														"Add Filter",
														"image-gallery-block"
													)}
													icon="plus-alt"
													onClick={onFilterAdd}
												>
													<span className="eb-pricebox-add-button-label">
														{__(
															"Add Filter",
															"image-gallery-block"
														)}
													</span>
												</Button>
											</>
										)}
									</PanelBody>

									<PanelBody
										title={__(
											"Gallery Items",
											"image-gallery-block"
										)}
										initialOpen={false}
									>
										{sources.map((item, index) => {
											return (
												<PanelBody
													title={
														"Image " + (index + 1)
													}
													initialOpen={false}
													onToggle={() =>
														setAttributes({
															initialSlide: index,
														})
													}
													className="eb-img-gallery-item-single-panel"
													key={index}
												>
													{enableFilter && (
														<Select2
															name="select-gallery-item"
															value={
																item.hasOwnProperty(
																	"filter"
																) &&
																	item.filter
																		.length > 0
																	? JSON.parse(
																		item.filter
																	)
																	: ""
															}
															onChange={(
																selected
															) =>
																handleSelect2Filter(
																	selected,
																	index
																)
															}
															options={
																filterItems
															}
															isMulti="true"
															Placeholder="Select Filter"
														/>
													)}
													{disableLightBox &&
														addCustomLink && (
															<>
																<TextControl
																	label={__(
																		"URL",
																		"image-gallery-block"
																	)}
																	value={
																		item.customLink
																	}
																	onChange={(
																		text
																	) =>
																		handleCustomURL(
																			text,
																			item.id,
																			images,
																			setAttributes
																		)
																	}
																/>
																{item.url &&
																	item.url
																		.length >
																	0 &&
																	!item.isValidUrl && (
																		<span className="error">
																			URL
																			is
																			not
																			valid
																		</span>
																	)}
																<ToggleControl
																	label={__(
																		"Open in New Tab",
																		"image-gallery-block"
																	)}
																	checked={
																		item.openNewTab
																	}
																	onChange={() =>
																		handleOpenNewTab(
																			!item.openNewTab,
																			item.id,
																			images,
																			setAttributes
																		)
																	}
																/>
															</>
														)}

													<Divider />
													<PanelRow>
														{__(
															"Image",
															"image-gallery-block"
														)}
													</PanelRow>
													<img src={item.url} />
												</PanelBody>
											);
										})}
									</PanelBody>

									{(enableFilter || enableIsotope) && (
										<PanelBody
											title={__(
												"Load More Button",
												"image-gallery-block"
											)}
											initialOpen={false}
										>
											<ToggleControl
												label={__(
													"Enable Loadmore",
													"image-gallery-block"
												)}
												checked={enableLoadMore}
												onChange={() =>
													setAttributes({
														enableLoadMore: !enableLoadMore,
													})
												}
											/>

											{enableLoadMore && (
												<>
													<DynamicInputControl
														label="Button Text"
														attrName="loadmoreBtnText"
														inputValue={loadmoreBtnText}
														setAttributes={setAttributes}
														onChange={(text) => setAttributes({ loadmoreBtnText: text })}
													/>
													<RangeControl
														label={__(
															"Images Per Page",
															"image-gallery-block"
														)}
														value={imagesPerPage}
														onChange={(imagesPerPage) =>
															setAttributes({
																imagesPerPage,
															})
														}
														min={1}
														max={sources?.length - 1}
														allowReset={true}
													/>
												</>
											)}
										</PanelBody>
									)}
								</>
							)}

							{tab.name === "styles" && (
								<>
									<PanelBody
										title={__(
											"Image Settings",
											"image-gallery-block"
										)}
									>
										{layouts === "grid" && (
											<>
												{!enableFilter && (
													<BaseControl
														label={__(
															"Alignment",
															"image-gallery-block"
														)}
													>
														<ButtonGroup>
															{FLEX_ALIGN.map(
																(
																	item,
																	index
																) => (
																	<Button
																		key={
																			index
																		}
																		isPrimary={
																			imageAlignment ===
																			item.value
																		}
																		isSecondary={
																			imageAlignment !==
																			item.value
																		}
																		onClick={() =>
																			setAttributes(
																				{
																					imageAlignment:
																						item.value,
																				}
																			)
																		}
																	>
																		{
																			item.label
																		}
																	</Button>
																)
															)}
														</ButtonGroup>
													</BaseControl>
												)}

												<BaseControl
													label={__(
														"Image Size",
														"image-gallery-block"
													)}
												>
													<ButtonGroup>
														{IMAGE_SIZE_TYPE.map(
															(item, index) => (
																<Button
																	key={index}
																	isPrimary={
																		imageSizeType ===
																		item.value
																	}
																	isSecondary={
																		imageSizeType !==
																		item.value
																	}
																	onClick={() =>
																		setAttributes(
																			{
																				imageSizeType:
																					item.value,
																			}
																		)
																	}
																>
																	{item.label}
																</Button>
															)
														)}
													</ButtonGroup>
												</BaseControl>

												{imageSizeType === "fixed" && (
													<>
														<ResponsiveRangeController
															baseLabel={__(
																"Image Height",
																"image-gallery-block"
															)}
															controlName={
																IMAGE_HEIGHT
															}
															resRequiredProps={
																resRequiredProps
															}
															units={
																IMAGE_UNIT_TYPES
															}
															min={0}
															max={500}
															step={1}
														/>
														<ResponsiveRangeController
															baseLabel={__(
																"Image Width",
																"image-gallery-block"
															)}
															controlName={
																IMAGE_WIDTH
															}
															resRequiredProps={
																resRequiredProps
															}
															units={
																IMAGE_UNIT_TYPES
															}
															min={0}
															max={500}
															step={1}
														/>
													</>
												)}

												{imageSizeType ===
													"adaptive" && (
														<>
															<ResponsiveRangeController
																baseLabel={__(
																	"Image Max Height",
																	"image-gallery-block"
																)}
																controlName={
																	IMAGE_MAX_HEIGHT
																}
																resRequiredProps={
																	resRequiredProps
																}
																units={
																	IMAGE_UNIT_TYPES
																}
																min={0}
																max={500}
																step={1}
															/>
															<ResponsiveRangeController
																baseLabel={__(
																	"Image Max Width",
																	"image-gallery-block"
																)}
																controlName={
																	IMAGE_MAX_WIDTH
																}
																resRequiredProps={
																	resRequiredProps
																}
																units={
																	IMAGE_UNIT_TYPES
																}
																min={0}
																max={500}
																step={1}
															/>
														</>
													)}
											</>
										)}

										<PanelBody
											title={__(
												"Border",
												"image-gallery-block"
											)}
											initialOpen={true}
										>
											<BorderShadowControl
												controlName={
													IMAGE_BORDER_SHADOW
												}
												resRequiredProps={
													resRequiredProps
												}
												noShadow
											// noBorder
											/>
										</PanelBody>
									</PanelBody>

									{styleNumber === "2" && (
										<PanelBody
											title={__(
												"Overlay Styles",
												"image-gallery-block"
											)}
										>
											<ColorControl
												label={__(
													"Overlay Color",
													"image-gallery-block"
												)}
												color={overlayColor}
												onChange={(color) =>
													setAttributes({
														overlayColor: color,
													})
												}
											/>
										</PanelBody>
									)}
									{displayCaption && (
										<PanelBody
											title={__(
												"Caption Styles",
												"image-gallery-block"
											)}
										>
											<ColorControl
												label={__(
													"Text Color",
													"image-gallery-block"
												)}
												color={captionColor}
												onChange={(newColor) =>
													setAttributes({
														captionColor: newColor,
													})
												}
											/>

											<ColorControl
												label={__(
													"Background Color",
													"image-gallery-block"
												)}
												color={captionBGColor}
												onChange={(backgroundColor) =>
													setAttributes({
														captionBGColor: backgroundColor,
													})
												}
											/>

											<TypographyDropdown
												baseLabel={__(
													"Typography",
													"image-gallery-block"
												)}
												typographyPrefixConstant={
													CAPTION_TYPOGRAPHY
												}
												resRequiredProps={
													resRequiredProps
												}
											/>

											<ResponsiveRangeController
												baseLabel={__(
													"Width",
													"image-gallery-block"
												)}
												controlName={CAPTION_WIDTH}
												resRequiredProps={
													resRequiredProps
												}
												units={UNIT_TYPES}
												min={0}
												max={300}
												step={1}
											/>

											{displayCaption && (
												<>
													<BaseControl
														label={__(
															"Text Align",
															"image-gallery-block"
														)}
													>
														<ButtonGroup>
															{TEXT_ALIGN.map(
																(
																	item,
																	index
																) => (
																	<Button
																		key={
																			index
																		}
																		isPrimary={
																			textAlign ===
																			item.value
																		}
																		isSecondary={
																			textAlign !==
																			item.value
																		}
																		onClick={() =>
																			setAttributes(
																				{
																					textAlign:
																						item.value,
																				}
																			)
																		}
																	>
																		{
																			item.label
																		}
																	</Button>
																)
															)}
														</ButtonGroup>
													</BaseControl>

													<BaseControl
														label={__(
															"Horizontal Align",
															"image-gallery-block"
														)}
													>
														<ButtonGroup>
															{HORIZONTAL_ALIGN.map(
																(
																	item,
																	index
																) => (
																	<Button
																		key={
																			index
																		}
																		isPrimary={
																			horizontalAlign ===
																			item.value
																		}
																		isSecondary={
																			horizontalAlign !==
																			item.value
																		}
																		onClick={() =>
																			setAttributes(
																				{
																					horizontalAlign:
																						item.value,
																				}
																			)
																		}
																	>
																		{
																			item.label
																		}
																	</Button>
																)
															)}
														</ButtonGroup>
													</BaseControl>

													<BaseControl
														label={__(
															"Vertical Align",
															"image-gallery-block"
														)}
													>
														<ButtonGroup>
															{VERTICAL_ALIGN.map(
																(
																	item,
																	index
																) => (
																	<Button
																		key={
																			index
																		}
																		isPrimary={
																			verticalAlign ===
																			item.value
																		}
																		isSecondary={
																			verticalAlign !==
																			item.value
																		}
																		onClick={() =>
																			setAttributes(
																				{
																					verticalAlign:
																						item.value,
																				}
																			)
																		}
																	>
																		{
																			item.label
																		}
																	</Button>
																)
															)}
														</ButtonGroup>
													</BaseControl>

													<ResponsiveDimensionsControl
														resRequiredProps={
															resRequiredProps
														}
														controlName={
															CAPTION_MARGIN
														}
														baseLabel="Margin"
													/>

													<ResponsiveDimensionsControl
														resRequiredProps={
															resRequiredProps
														}
														controlName={
															CAPTION_PADDING
														}
														baseLabel="Padding"
													/>
												</>
											)}
										</PanelBody>
									)}

									{enableFilter && (
										<PanelBody
											title={__(
												"Filter",
												"image-gallery-block"
											)}
											initialOpen={false}
										>
											<ResponsiveDimensionsControl
												resRequiredProps={
													resRequiredProps
												}
												controlName={FILTER_MARGIN}
												baseLabel="Margin"
											/>
											<ResponsiveDimensionsControl
												resRequiredProps={
													resRequiredProps
												}
												controlName={FILTER_PADDING}
												baseLabel="Padding"
											/>
											<TypographyDropdown
												baseLabel={__(
													"Typography",
													"image-gallery-block"
												)}
												typographyPrefixConstant={
													FILTER_TYPOGRAPHY
												}
												resRequiredProps={
													resRequiredProps
												}
											/>
											<BaseControl>
												<ButtonGroup>
													{NORMAL_HOVER.map(
														(item, index) => (
															<Button
																key={index}
																isPrimary={
																	filterColorType ===
																	item.value
																}
																isSecondary={
																	filterColorType !==
																	item.value
																}
																onClick={() =>
																	setAttributes(
																		{
																			filterColorType:
																				item.value,
																		}
																	)
																}
															>
																{item.label}
															</Button>
														)
													)}
												</ButtonGroup>

												{filterColorType ===
													"normal" && (
														<>
															<ColorControl
																label={__(
																	"Color",
																	"image-gallery-block"
																)}
																color={filterColor}
																onChange={(
																	newColor
																) =>
																	setAttributes({
																		filterColor: newColor,
																	})
																}
															/>

															<ColorControl
																label={__(
																	"Background Color",
																	"image-gallery-block"
																)}
																color={
																	filterBGColor
																}
																onChange={(
																	newColor
																) =>
																	setAttributes({
																		filterBGColor: newColor,
																	})
																}
															/>
														</>
													)}

												{filterColorType ===
													"hover" && (
														<>
															<ColorControl
																label={__(
																	"Color",
																	"image-gallery-block"
																)}
																color={
																	filterHoverColor
																}
																onChange={(
																	newColor
																) =>
																	setAttributes({
																		filterHoverColor: newColor,
																	})
																}
															/>

															<ColorControl
																label={__(
																	"Background Color",
																	"image-gallery-block"
																)}
																color={
																	filterHoverBGColor
																}
																onChange={(
																	newColor
																) =>
																	setAttributes({
																		filterHoverBGColor: newColor,
																	})
																}
															/>
														</>
													)}

												{filterColorType ===
													"active" && (
														<>
															<ColorControl
																label={__(
																	"Color",
																	"image-gallery-block"
																)}
																color={
																	filterActColor
																}
																onChange={(
																	newColor
																) =>
																	setAttributes({
																		filterActColor: newColor,
																	})
																}
															/>
															<ColorControl
																label={__(
																	"Background Color",
																	"image-gallery-block"
																)}
																color={
																	filterActBGColor
																}
																onChange={(
																	newColor
																) =>
																	setAttributes({
																		filterActBGColor: newColor,
																	})
																}
															/>
														</>
													)}
											</BaseControl>

											<PanelRow>
												Button Border & Shadow
											</PanelRow>
											<BorderShadowControl
												controlName={
													FILTER_BORDER_SHADOW
												}
												resRequiredProps={
													resRequiredProps
												}
											// noShadow
											// noBorder
											/>
										</PanelBody>
									)}

									{(enableFilter || enableIsotope) && enableLoadMore && (
										<PanelBody
											title={__("Loadmore Button", "image-gallery-block")}
											initialOpen={false}
										>
											<>
												<TypographyDropdown
													baseLabel={__(
														"Typography",
														"image-gallery-block"
													)}
													typographyPrefixConstant={
														LOADMORE_TYPOGRAPHY
													}
													resRequiredProps={
														resRequiredProps
													}
												/>
												<ColorControl
													label={__(
														"Text Color",
														"image-gallery-block"
													)}
													color={loadmoreColor}
													onChange={(newTextColor) =>
														setAttributes({
															loadmoreColor: newTextColor,
														})
													}
												/>
												<ColorControl
													label={__(
														"Text Hover Color",
														"image-gallery-block"
													)}
													color={loadmoreHvColor}
													onChange={(newHoverTextColor) =>
														setAttributes({
															loadmoreHvColor: newHoverTextColor,
														})
													}
												/>
												<ColorControl
													label={__(
														"Background Color",
														"image-gallery-block"
													)}
													color={loadmoreBGColor}
													onChange={(newBgColor) =>
														setAttributes({
															loadmoreBGColor: newBgColor,
														})
													}
												/>
												<ColorControl
													label={__(
														"Background Hover Color",
														"image-gallery-block"
													)}
													color={loadmoreHvBGColor}
													onChange={(newHoverBgColor) =>
														setAttributes({
															loadmoreHvBGColor: newHoverBgColor,
														})
													}
												/>
												<ResponsiveDimensionsControl
													resRequiredProps={
														resRequiredProps
													}
													controlName={LOADMORE_PADDING}
													baseLabel={__(
														"Padding",
														"image-gallery-block"
													)}
												/>
												<PanelBody
													title={__("Border", "image-gallery-block")}
													initialOpen={false}
												>
													<BorderShadowControl
														controlName={LOADMORE_BORDER}
														resRequiredProps={
															resRequiredProps
														}
													/>
												</PanelBody>
											</>
										</PanelBody>
									)}
								</>
							)}

							{tab.name === "advance" && (
								<>
									<PanelBody>
										<ResponsiveDimensionsControl
											resRequiredProps={resRequiredProps}
											controlName={WRAPPER_MARGIN}
											baseLabel="Margin"
										/>
										<ResponsiveDimensionsControl
											resRequiredProps={resRequiredProps}
											controlName={WRAPPER_PADDING}
											baseLabel="Padding"
										/>
									</PanelBody>
									<PanelBody
										title={__(
											"Background",
											"image-gallery-block"
										)}
										initialOpen={false}
									>
										<BackgroundControl
											controlName={WRAPPER_BG}
											resRequiredProps={resRequiredProps}
											noOverlay
										/>
									</PanelBody>
									<PanelBody
										title={__("Border & Shadow")}
										initialOpen={false}
									>
										<BorderShadowControl
											controlName={WRAPPER_BORDER_SHADOW}
											resRequiredProps={resRequiredProps}
										// noShadow
										// noBorder
										/>
									</PanelBody>

									<AdvancedControls
										attributes={attributes}
										setAttributes={setAttributes}
									/>
								</>
							)}
						</div>
					)}
				</TabPanel>
			</div>
		</InspectorControls>
	);
}

export default Inspector;
