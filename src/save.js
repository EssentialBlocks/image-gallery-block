const Save = ({ attributes }) => {
	const {
		blockId,
		layouts,
		sources,
		displayCaption,
		styleNumber,
	} = attributes;

	if (sources.length === 0) return null;

	return (
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
	);
};

export default Save;
