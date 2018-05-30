let React = require('react');
let _ = require('lodash');

class Card extends React.Component {

	getRibbon() {
		return (this.props.ribbon)
			? (
				<div className="ribbon-container">
					<div className="ribbon">{this.props.ribbon}</div>
				</div>
			)
			: null;
	}

	render() {
		let key = (this.props.id) ? this.props.id : _.uniqueId('card');
		let mainClass = "card";

		if (this.props.cardClass) {
			mainClass += " " + this.props.cardClass;
		}

		return(
			<div className={mainClass} key={key}>
			  <div className={this.props.headerClass}></div>
				<div className="grid-x">
					<div className="subtitle small-12 medium-5">
						{ this.getRibbon() }
						{this.props.headerSubtitle}
					</div>
					<div className="title small-12 medium-7">
						<h3>{this.props.header}</h3>
					</div>
				</div>
			  <div className="card-section small-12 medium-6">
			    {this.props.children}
			  </div>
			</div>
		);
	}
};


module.exports = Card;
