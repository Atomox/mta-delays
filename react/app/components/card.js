let React = require('react');
let _ = require('lodash');

class Card extends React.Component {

	render() {
		let key = (this.props.id) ? this.props.id : _.uniqueId('card');

		return(
			<div className="card" key={key}>
			  <div className={this.props.headerClass}>
			    {this.props.header}
			  </div>
			  <div className="card-section">
			    {this.props.children}
			  </div>
			</div>
		);
	}
};


module.exports = Card;