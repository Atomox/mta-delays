let React = require('react');

let mta = require('../includes/mta.subway').mtaSubway;

class EventList extends React.Component {

	render() {

		let e = this.props.event;

		let titleClass = "card-divider ";
		titleClass += (e.planned === true) ? 'caution' : 'bad';

		return (

			<div className="card" key={e.id}>
			  <div className={titleClass}>
			    {e.type}
			  </div>
			  <div className="card-section">
			    <h4>
			     {
					Object.keys(e.line).map((key, i) => {
						let line = mta.getlineById(e.line[key].line);
						let dir = mta.getlineDirectionByID(e.line[key].dir);

						return <TrainLine line={line} dir={dir} />;
					})
				} &nbsp;
			     | {(e.detail.type_detail) 
					? e.detail.type_detail.join(', ') : ''}
				</h4>
			    <p>{e.summary}</p>
			    <small>
			    	{(e.planned === true) 
			    		? e.detail.durration
			    		: new Date(e.date.start).toString()
			    	}</small>
			  </div>
			</div>
		);
	}
}


class TrainLine extends React.Component {

	render() {
		return (<span className="line">
			<strong>{this.props.line}</strong> {this.props.dir}
		</span>);
	}
}


class StatusMessage extends React.Component {

	render() {

		let type = this.props.type;

		return (
			<li>
			</li>
		);
	}
}

module.exports = {
	EventList
};