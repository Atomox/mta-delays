import React from 'react';

import { mtaSubway as mta } from '../includes/mta.subway';


class TrainLine extends React.Component {

	getLine() {
		return (this.props.line.length > 4)
			? mta.getlineById(this.props.line)
			: this.props.line;
	}

	render() {

		let classes = 'line';
		if (this.props.disabled) {
			classes = classes + ' ' + 'disabled';
		}

		return (
			<span className={classes}>
				<strong>
					{ this.getLine() }
				</strong>

				{(this.props.dir !== 'both') ? this.props.dir : null}
			</span>
		);
	}
}


module.exports = {
  TrainLine
};
