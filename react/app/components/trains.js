import React from 'react';

import { mtaSubway as mta } from '../includes/mta.subway';


class TrainLine extends React.Component {

	getLine() {
		return (this.props.line.length > 4)
			? mta.getlineById(this.props.line)
			: this.props.line;
	}

	getDirection() {
		return (this.props.dir !== 'both' && this.props.dir)
			? (<span className="direction"> { mta.getlineDirectionAbbreviation(this.props.dir)}</span> )
			: null;
	}

	render() {

		let classes = 'line';
		if (this.props.disabled) {
			classes = classes + ' ' + 'disabled';
		}
		if (this.props.outline) {
			classes = classes + ' ' + 'outline';
		}

		return (
			<span className={classes}>
				<strong>
					{ this.getLine() }
				</strong>

				{ this.getDirection() }
			</span>
		);
	}
}


module.exports = {
  TrainLine
};
