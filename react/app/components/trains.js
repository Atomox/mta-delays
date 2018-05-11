let React = require('react');

class TrainLine extends React.Component {

	render() {

		let classes = 'line';
		if (this.props.disabled) {
			classes = classes + ' ' + 'disabled';
		}

		return (
			<span className={classes}>
				<strong>
					{this.props.line}
				</strong>

				{(this.props.dir !== 'both') ? this.props.dir : null}
			</span>
		);
	}
}


module.exports = {
  TrainLine
};
