const Save = ({ attributes }) => {
	const {
		eb,
		columns,
		sources,
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
		isMasonry
	} = attributes;

	if (sources.length === 0) return null;

	const captionStyles = {
		display: displayCaption ? "flex" : "none",
		fontSize: captionFontSize
			? `${captionFontSize}${captionSizeUnit}`
			: undefined,
		color: captionColor || undefined,
		justifyContent: horizontalAlign,
		alignItems: verticalAlign,
		textAlign: textAlign,
		padding: `${paddingTop || 0}${paddingUnit} ${paddingRight ||
			0}${paddingUnit} ${paddingBottom ||
			0}${paddingUnit} ${paddingLeft || 0}${paddingUnit}`
	};

	return (
		<div
			className={
				isMasonry
					? `eb-gallery-grid`
					: `eb-gallery-img-wrapper columns-${columns}`
			}
		>
			{sources.map(source => (
				<a
					className={`eb-gallery-img-link caption-style-${styleNumber} ${
						isMasonry ? "eb-gallery-grid-item" : ""
					}`}
					style={{
						width: isMasonry && `${100 / columns}%`,
						padding: `${
							typeof paddingTop !== "undefined" ? paddingTop : 3
						}${paddingUnit} ${
							typeof paddingRight !== "undefined"
								? paddingRight
								: 3
						}${paddingUnit} ${
							typeof paddingBottom !== "undefined"
								? paddingBottom
								: 3
						}${paddingUnit} ${
							typeof paddingLeft !== "undefined" ? paddingLeft : 3
						}${paddingUnit}`
					}}
					data-fslightbox={`gallery`}
					data-caption={source.caption}
					href={source.url}
				>
					<img
						className="eb-gallery-img"
						src={source.url}
						style={{
							border: `${borderWidth ||
								0}px ${borderStyle} ${borderColor || "gray"}`,
							filter: `drop-shadow(${hOffset || 0}px ${vOffset ||
								0}px ${blur || 0}px ${shadowColor || "gray"})`
						}}
					/>
					<span
						className="eb-gallery-img-caption"
						style={captionStyles}
					>
						{source.caption}
					</span>
				</a>
			))}
		</div>
	);
};

export default Save;
