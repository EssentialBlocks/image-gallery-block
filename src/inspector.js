/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	SelectControl,
	BaseControl,
	ButtonGroup,
	Button,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import UnitControl from "../util/unit-control";
import {
	HORIZONTAL_ALIGN,
	VERTICAL_ALIGN,
	TEXT_ALIGN,
	STYLES,
	BORDER_STYLES,
} from "./constants";
import DimensionControl from "../util/dimensions-control";
import ColorControl from "../util/color-control";

const Inspector = ({ attributes, setAttributes }) => {
	const {
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

	const captionSizeStep = captionSizeUnit === "em" ? 0.1 : 1;
	const captionSizeMin = captionSizeUnit === "em" ? 0.1 : 8;
	const captionSizeMax = captionSizeUnit === "em" ? 8 : 100;

	return (
		<InspectorControls key="controls">
			<PanelBody title={__("General Settings")}>
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

				<RangeControl
					label={__("Columns")}
					value={columns}
					onChange={(columns) => setAttributes({ columns })}
					min={1}
					max={8}
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
		</InspectorControls>
	);
};
export default Inspector;
