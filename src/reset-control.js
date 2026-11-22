/**
 * Range control with the shared EB reset icon beside it. Same markup and
 * classes as the controls package's ResetControl, which isn't part of this
 * plugin's controls bundle.
 */
const ResetControl = ({ onReset, children }) => (
	<div className="eb-range-controller-container eb-img-gallery-reset-range">
		{children}
		<button type="button" className="eb-range-reset-button" onClick={onReset}>
			<span className="dashicon dashicons dashicons-image-rotate"></span>
		</button>
	</div>
);

export default ResetControl;
