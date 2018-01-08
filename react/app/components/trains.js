let React = require('React');

class TrainLine extends React.Component {

	render() {
		return (
			<span className="line">
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
