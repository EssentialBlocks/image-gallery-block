/**
 * WordPress dependencies 
 */
import { __ } from "@wordpress/i18n";
import { InspectorControls, PanelColorSettings } from "@wordpress/block-editor";
import { 
	PanelBody,
	SelectControl,
	ToggleControl,
	Button,
	ButtonGroup,
	BaseControl,
	TabPanel
} from "@wordpress/components";
import { useEffect } from "@wordpress/element";
import { select } from "@wordpress/data";

/**
 * Internal depencencies
 */

 import objAttributes from "./attributes";

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
} from "./constants";

const {
	// mimmikCssForResBtns, 
	// mimmikCssOnPreviewBtnClickWhileBlockSelected,

	// 
	ResponsiveDimensionsControl,
	TypographyDropdown,
	BorderShadowControl,
	ResponsiveRangeController,
	BackgroundControl,
	ColorControl,
} = window.EBImageGalleryControls;

const editorStoreForGettingPreivew =
	eb_style_handler.editor_type === "edit-site"
		? "core/edit-site"
		: "core/edit-post";

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
	} = attributes;

	// this useEffect is for setting the resOption attribute to desktop/tab/mobile depending on the added 'eb-res-option-' class only the first time once
	useEffect(() => {
		setAttributes({
			resOption: select(editorStoreForGettingPreivew).__experimentalGetPreviewDeviceType(),
		});
	}, []);

	// // this useEffect is for mimmiking css for all the eb blocks on resOption changing
	// useEffect(() => {
	// 	mimmikCssForResBtns({
	// 		domObj: document,
	// 		resOption,
	// 	});
	// }, [resOption]);

	// // this useEffect is to mimmik css for responsive preview in the editor page when clicking the buttons in the 'Preview button of wordpress' located beside the 'update' button while any block is selected and it's inspector panel is mounted in the DOM
	// useEffect(() => {
	// 	const cleanUp = mimmikCssOnPreviewBtnClickWhileBlockSelected({
	// 		domObj: document,
	// 		select,
	// 		setAttributes,
	// 	});
	// 	return () => {
	// 		cleanUp();
	// 	};
	// }, []);

	const changeStyle = (selected) => {
		setAttributes({styleNumber: selected});
		switch(selected) {
			case '0':
				setAttributes({})
				break;
			case '1':
				setAttributes({})
				break;
			case '2':
				setAttributes({
					displayCaption: true,
				})
				break;
			default:
				return false;
		}
	}

	const resRequiredProps = {
		setAttributes,
		resOption,
		attributes,
		objAttributes
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
							title: 'Style',
							className: 'eb-tab styles',
						},
						{
							name: 'advance',
							title: 'Advanced',
							className: 'eb-tab advance',
						},
					] }
				>
					{(tab) =>
						<div className={"eb-tab-controls" + tab.name}>
							{tab.name === "general" && (
								<>
									<PanelBody 
										title={__("General", "essential-blocks")} 
										initialOpen={true}
									>
										<SelectControl
											label={__("Layouts", "essential-blocks")}
											value={layouts}
											options={LAYOUTS}
											onChange={(layouts) => setAttributes({ layouts })}
										/>

										<SelectControl
											label={__("Styles", "essential-blocks")}
											value={styleNumber}
											options={STYLES}
											onChange={(styleNumber) => changeStyle( styleNumber )}
										/>

										{styleNumber === "2" && (
											<SelectControl
												label={__("Overlay Styles", "essential-blocks")}
												value={overlayStyle}
												options={OVERLAY_STYLES}
												onChange={(overlayStyle) => setAttributes({ overlayStyle })}
											/>
										)}
						
										<ToggleControl
											label={__("Display Caption", "essential-blocks")}
											checked={displayCaption}
											onChange={() => setAttributes({ displayCaption: !displayCaption })}
										/>

										{displayCaption && styleNumber === '0' && (
											<ToggleControl
											label={__("Display Caption on Hover", "essential-blocks")}
											checked={captionOnHover}
											onChange={() => setAttributes({ captionOnHover: !captionOnHover })}
										/>
										)}

										<ResponsiveRangeController
											baseLabel={__("Columns", "essential-blocks")}
											controlName={GRID_COLUMNS}
											resRequiredProps={resRequiredProps}
											units={[]}
											min={1}
											max={8}
											step={1}
										/>

										<ResponsiveRangeController
											baseLabel={__("Image Gap", "essential-blocks")}
											controlName={IMAGE_GAP}
											resRequiredProps={resRequiredProps}
											units={[]}
											min={0}
											max={100}
											step={1}
										/>
						
										<ToggleControl
											label={__("Disable Light Box", "essential-blocks")}
											checked={disableLightBox}
											onChange={() => setAttributes({ disableLightBox: !disableLightBox })}
										/>
									</PanelBody>
								</>
							)}

							{tab.name === "styles" && (
								<>
									<PanelBody title={__("Image Settings", "essential-blocks")}>
										<PanelBody title={__("Border", "essential-blocks")} initialOpen={true}>
											<BorderShadowControl
												controlName={IMAGE_BORDER_SHADOW}
												resRequiredProps={resRequiredProps}
												noShadow
												// noBorder
											/>
										</PanelBody>
									</PanelBody>

									{styleNumber === "2" && (
										<PanelBody title={__("Overlay Styles", "essential-blocks")}>
											<ColorControl
                								label={__("Overlay Color", "essential-blocks")}
												color={ overlayColor }
												onChange={(color) => 
													setAttributes({ overlayColor: color })
												}
											/>
										</PanelBody>
									)}
									{displayCaption && (
										<PanelBody title={__("Caption Styles", "essential-blocks")}>

											<PanelColorSettings
												title={__('Color Controls', 'essential-blocks')}
												className={"eb-subpanel"}
												initialOpen={true}
												disableAlpha = {false}
												colorSettings={[
													{
														value: captionColor,
														onChange: (newColor) =>
															setAttributes({ captionColor: newColor }),
														label: __("Text Color", "essential-blocks"),
													}
												]}
											/>

											<ColorControl
                								label={__("Background Color", "essential-blocks")}
												color={ captionBGColor }
												onChange={(backgroundColor) =>
													setAttributes({ captionBGColor: backgroundColor })
												}
											/>

											<TypographyDropdown
												baseLabel={__("Typography", "essential-blocks")}
												typographyPrefixConstant={CAPTION_TYPOGRAPHY}
												resRequiredProps={resRequiredProps}
											/>

											<ResponsiveRangeController
												baseLabel={__("Width", "essential-blocks")}
												controlName={CAPTION_WIDTH}
												resRequiredProps={resRequiredProps}
												units={UNIT_TYPES}
												min={0}
												max={300}
												step={1}
											/>

											{displayCaption && (
												<>
													<BaseControl label={__("Text Align", "essential-blocks")}>
														<ButtonGroup>
															{TEXT_ALIGN.map((item) => (
																<Button
																	// isLarge
																	isPrimary={textAlign === item.value}
																	isSecondary={textAlign !== item.value}
																	onClick={() => setAttributes({ textAlign: item.value })}
																>
																	{item.label}
																</Button>
															))}
														</ButtonGroup>
													</BaseControl>
							
													<BaseControl label={__("Horizontal Align", "essential-blocks")}>
														<ButtonGroup>
															{HORIZONTAL_ALIGN.map((item) => (
																<Button
																	// isLarge
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
							
													<BaseControl label={__("Vertical Align", "essential-blocks")}>
														<ButtonGroup>
															{VERTICAL_ALIGN.map((item) => (
																<Button
																	// isLarge
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

													<ResponsiveDimensionsControl
														resRequiredProps={resRequiredProps}
														controlName={CAPTION_MARGIN}
														baseLabel="Margin"
													/>

													<ResponsiveDimensionsControl
														resRequiredProps={resRequiredProps}
														controlName={CAPTION_PADDING}
														baseLabel="Padding"
													/>
												</>
											)}
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
									<PanelBody title={__("Background", "essential-blocks")} initialOpen={false}>
										<BackgroundControl
											controlName={WRAPPER_BG}
											resRequiredProps={resRequiredProps}
											noOverlay
										/>
									</PanelBody>
									<PanelBody title={__("Border & Shadow")} initialOpen={false}>
										<BorderShadowControl
											controlName={WRAPPER_BORDER_SHADOW}
											resRequiredProps={resRequiredProps}
											// noShadow
											// noBorder
										/>
									</PanelBody>
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