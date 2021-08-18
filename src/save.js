const Save = ({ attributes }) => {
	const {
		blockId,
		layouts,
		sources,
		displayCaption,
		captionOnHover,
		styleNumber,
	} = attributes;

	if (sources.length === 0) return null;

	return (
		<div 
			className={`eb-gallery-img-wrapper ${blockId} ${layouts} caption-style-${styleNumber} ${captionOnHover ? 'caption-on-hover' : ''}`} 
			data-id={blockId}
		>
			
			{sources.map((source, index) => (
				<a
					className={`eb-gallery-img-content`}
					data-fslightbox={`gallery`}
					data-caption={source.caption}
					href={source.url}
				>
					<img className="eb-gallery-img" src={source.url} image-index={index} />
					{(displayCaption && source.caption && source.caption.length > 0) && (
						<span className="eb-gallery-img-caption">{source.caption}</span>
					)}
				</a>
			))}
		</div>
	);
};

export default Save;
