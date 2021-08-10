/**
 * WordPress dependencies
 */

const { __ } = wp.i18n;
const { InspectorControls, PanelColorSettings } = wp.blockEditor;
const { 
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
	TextareaControl,
	Button,
	ButtonGroup,
	BaseControl,
	TabPanel,
} = wp.components;
const { useEffect } = wp.element;
const { select } = wp.data;

/**
 * Internal dependencies
 */
/**
 * Internal depencencies
 */
//  import {
// 	WRAPPER_BG,
// 	WRAPPER_MARGIN,
// 	WRAPPER_PADDING,
// 	WRAPPER_BORDER_SHADOW,
// 	TITLE_MARGIN,
// 	SUBTITLE_MARGIN,
// 	SEPARATOR_MARGIN,
// 	SEPARATOR_LINE_SIZE,
// 	SEPARATOR_ICON_SIZE,
// 	SEPARATOR_WIDTH,
// 	SEPARATOR_POSITION,
// 	NORMAL_HOVER,
// 	UNIT_TYPES,
// 	SEPARATOR_UNIT_TYPES,
// 	PRESETS,
// 	TEXT_ALIGN,
// 	HEADING,
// 	SEPERATOR_STYLES,
// 	SEPARATOR_TYPE,
// } from "./constants/constants";
// import {TITLE_TYPOGRAPHY, SUBTITLE_TYPOGRAPHY } from "./constants/typographyPrefixConstants";
import {mimmikCssForResBtns, mimmikCssOnPreviewBtnClickWhileBlockSelected} from "../util/helpers";
import ResponsiveDimensionsControl from "../util/dimensions-control-v2";
import TypographyDropdown from "../util/typography-control-v2";
import BorderShadowControl from "../util/border-shadow-control";
import ResponsiveRangeController from "../util/responsive-range-control";
import BackgroundControl from "../util/background-control";

import objAttributes from "./attributes";

function Inspector(props) {
	const { attributes, setAttributes } = props;
	const {
		resOption,
		columns,
		displayCaption,
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

	

	// this useEffect is for setting the resOption attribute to desktop/tab/mobile depending on the added 'eb-res-option-' class only the first time once
	useEffect(() => {
		setAttributes({
			resOption: select("core/edit-post").__experimentalGetPreviewDeviceType(),
		});
	}, []);

	// this useEffect is for mimmiking css for all the eb blocks on resOption changing
	useEffect(() => {
		mimmikCssForResBtns({
			domObj: document,
			resOption,
		});
	}, [resOption]);

	// this useEffect is to mimmik css for responsive preview in the editor page when clicking the buttons in the 'Preview button of wordpress' located beside the 'update' button while any block is selected and it's inspector panel is mounted in the DOM
	useEffect(() => {
		const cleanUp = mimmikCssOnPreviewBtnClickWhileBlockSelected({
			domObj: document,
			select,
			setAttributes,
		});
		return () => {
			cleanUp();
		};
	}, []);

	const resRequiredProps = {
		setAttributes,
		resOption,
		attributes,
	};

	return (
		<InspectorControls key="controls">
			<div className="eb-panel-control">
			
				<TabPanel
					className="eb-parent-tab-panel"
					activeClass="active-tab"
					// onSelect={onSelect}
					tabs={ [
						{
							name: 'general',
							title: 'General',
							className: 'eb-tab general',
						},
						{
							name: 'styles',
							title: 'Styles',
							className: 'eb-tab styles',
						},
						{
							name: 'advance',
							title: 'Advance',
							className: 'eb-tab advance',
						},
					] }
				>
					{(tab) =>
						<div className={"eb-tab-controls" + tab.name}>
							{tab.name === "general" && (
								<>
									<PanelBody 
										title={__("General")} 
										initialOpen={true}
									>
									<ToggleControl
										label={__("Masonry Layout")}
										checked={isMasonry}
										onChange={() => setAttributes({ isMasonry: !isMasonry })}
									/>
					
									<ToggleControl
										label={__("Display Caption")}
										checked={displayCaption}
										onChange={() => setAttributes({ displayCaption: !displayCaption })}
									/>
					
									{/* <RangeControl
										label={__("Columns")}
										value={columns}
										onChange={(columns) => setAttributes({ columns })}
										min={1}
										max={8}
									/> */}
									<ResponsiveRangeController
										baseLabel={__("Separator Height", "advance-heading")}
										controlName={SEPARATOR_LINE_SIZE}
										resRequiredProps={resRequiredProps}
										units={UNIT_TYPES}
										min={0}
										max={100}
										step={1}
									/>
					
									<SelectControl
										label={__("Styles")}
										value={styleNumber}
										options={STYLES}
										onChange={(styleNumber) => setAttributes({ styleNumber })}
									/>
								</PanelBody>
					
								{displayCaption && (
									<PanelBody title={__("Caption Styles")}>
										<ColorControl
											label={__("Caption Color")}
											color={captionColor}
											onChange={(captionColor) => setAttributes({ captionColor })}
										/>
					
										<UnitControl
											selectedUnit={captionSizeUnit}
											unitTypes={[
												{ label: "px", value: "px" },
												{ label: "em", value: "em" },
												{ label: "%", value: "%" },
											]}
											onClick={(captionSizeUnit) => setAttributes({ captionSizeUnit })}
										/>
					
										<RangeControl
											label={__("Font Size")}
											value={captionFontSize}
											allowReset
											onChange={(captionFontSize) => setAttributes({ captionFontSize })}
											step={captionSizeStep}
											min={captionSizeMin}
											max={captionSizeMax}
										/>
					
										<BaseControl label={__("Text Align")}>
											<ButtonGroup>
												{TEXT_ALIGN.map((item) => (
													<Button
														isLarge
														isPrimary={textAlign === item.value}
														isSecondary={textAlign !== item.value}
														onClick={() => setAttributes({ textAlign: item.value })}
													>
														{item.label}
													</Button>
												))}
											</ButtonGroup>
										</BaseControl>
					
										<BaseControl label={__("Vertical Align")}>
											<ButtonGroup>
												{VERTICAL_ALIGN.map((item) => (
													<Button
														isLarge
														isPrimary={verticalAlign === item.value}
														isSecondary={verticalAlign !== item.value}
														onClick={() =>
															setAttributes({
																verticalAlign: item.value,
															})
														}
													>
														{item.label}
													</Button>
												))}
											</ButtonGroup>
										</BaseControl>
					
										<BaseControl label={__("Horizontal Align")}>
											<ButtonGroup>
												{HORIZONTAL_ALIGN.map((item) => (
													<Button
														isLarge
														isPrimary={horizontalAlign === item.value}
														isSecondary={horizontalAlign !== item.value}
														onClick={() =>
															setAttributes({
																horizontalAlign: item.value,
															})
														}
													>
														{item.label}
													</Button>
												))}
											</ButtonGroup>
										</BaseControl>
									</PanelBody>
								)}
					
								<PanelBody title={__("Image Settings")}>
									<UnitControl
										selectedUnit={paddingUnit}
										unitTypes={[
											{ label: "px", value: "px" },
											{ label: "em", value: "em" },
											{ label: "%", value: "%" },
										]}
										onClick={(paddingUnit) => setAttributes({ paddingUnit })}
									/>
					
									<DimensionControl
										label={__("Padding")}
										top={paddingTop}
										right={paddingRight}
										bottom={paddingBottom}
										left={paddingLeft}
										onChange={({ top, right, bottom, left }) =>
											setAttributes({
												paddingTop: top,
												paddingRight: right,
												paddingBottom: bottom,
												paddingLeft: left,
											})
										}
									/>
					
									<PanelBody title={__("Border")} initialOpen={false}>
										<SelectControl
											label={__("Border Style")}
											value={borderStyle}
											options={BORDER_STYLES}
											onChange={(borderStyle) => setAttributes({ borderStyle })}
										/>
					
										{borderStyle !== "none" && (
											<RangeControl
												label={__("Border Width")}
												value={borderWidth}
												onChange={(borderWidth) => setAttributes({ borderWidth })}
												allowReset
												min={0}
												max={20}
											/>
										)}
					
										{borderStyle !== "none" && (
											<ColorControl
												label={__("BorderColor")}
												color={borderColor}
												onChange={(borderColor) => setAttributes({ borderColor })}
											/>
										)}
									</PanelBody>
					
									<PanelBody title={__("Shadow")} initialOpen={false}>
										<ColorControl
											label={__("Shadow Color")}
											color={shadowColor}
											onChange={(shadowColor) => setAttributes({ shadowColor })}
										/>
					
										<RangeControl
											label={__("Horizontal Offset")}
											allowReset
											value={hOffset}
											onChange={(hOffset) => setAttributes({ hOffset })}
											min={0}
											max={20}
										/>
					
										<RangeControl
											label={__("Vertical Offset")}
											value={vOffset}
											allowReset
											onChange={(vOffset) => setAttributes({ vOffset })}
											min={0}
											max={20}
										/>
					
										<RangeControl
											label={__("Shadow Blur")}
											value={blur}
											allowReset
											onChange={(blur) => setAttributes({ blur })}
											min={0}
											max={20}
										/>
									</PanelBody>
								</PanelBody>

								</>
							)}

							{tab.name === "styles" && (
								<>
								</>
							)}

							{tab.name === "advance" && (
								<>
								</>
							)}
						</div>
					}
				</TabPanel>
			</div>
		</InspectorControls>
	);
}

export default Inspector;