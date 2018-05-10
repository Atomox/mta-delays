import React from 'React';
import PropTypes from 'prop-types';

class Boro extends React.Component {

	static defaultProps = {
		 short: false,
		 caps: true
	 };

	render() {

		function getName(b, caps) {
			switch(b) {
				case 'Mn': return 'Manhattan';
				case 'Bk': return 'Brooklyn';
				case 'Qs': return 'Queens';
				case 'Bx': return 'The Bronx';
				case 'SI':
				case 'Si': return 'Staten Island';
			}
		}

		function getShortName(b) {
			switch(b) {
				case 'Mn': return 'Man';
				case 'Bk': return 'Bklyn';
				case 'Qs': return 'Qns';
				case 'Bx': return 'Bronx';
				case 'SI':
				case 'Si': return 'S.I.';
			}
		}

		let val = (this.props.short)
			? getShortName(this.props.boro)
			: getName(this.props.boro);

		if (this.props.caps && typeof val === 'string') {
			val = val.toUpperCase();
		}
		else {
			console.warn(this.props.boro, 'is of type', typeof val);
		}

		return (
			<span className="boro">
					<strong>{	val }</strong>
			</span>
		);
	}
}

Boro.propTypes = {
  boro: PropTypes.string.isRequired,
  short: PropTypes.bool,
	caps: PropTypes.bool
};


module.exports = {
  Boro
};
