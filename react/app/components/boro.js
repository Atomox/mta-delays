let React = require('React');

class Boro extends React.Component {

	render() {

		function getName(b) {
			switch(b) {
				case 'Mn': return 'MANHATTAN';
				case 'Bk': return 'BROOKLYN';
				case 'Qs': return 'QUEENS';
				case 'Bx': return 'THE BRONX';
				case 'Si': return 'STATEN ISLAND';
			}
		}

		function getShortName(b) {
			switch(b) {
				case 'Mn': return 'MAN';
				case 'Bk': return 'BKLYN';
				case 'Qs': return 'QNS';
				case 'Bx': return 'BRONX';
				case 'Si': return 'SI';
			}
		}

		return (
			<span className="boro">
					<strong>{	(this.props.short)
						? getShortName(this.props.boro)
						: getName(this.props.boro) }</strong>
			</span>
		);
	}
}


module.exports = {
  Boro
};
