let React = require('react');
let _ = require('lodash');

let Card = require('./card');
let mta = require('../includes/mta.subway').mtaSubway;

class EventList extends React.Component {

	render() {

		let e = this.props.event;

		let titleClass = "card-divider ";
		titleClass += (e.planned === true) ? 'caution' : 'bad';

		return (

			<Card key="event-list" id={e.id} header={e.type} headerClass={titleClass}>
			  <div>
			    <h4>
			     {
					Object.keys(e.line).map((key, i) => {
						let line = mta.getlineById(e.line[key].line);
						let dir = mta.getlineDirectionByID(e.line[key].dir);

						return <TrainLine
							key={_.uniqueId('train-' + line)}
							line={line}
							dir={dir} />;
					})
				} &nbsp;

			     | {(e.detail.type_detail) 
					? e.detail.type_detail.join(', ') : ''}
				</h4>
			    <p>{e.summary}</p>

			    <StationList stations={e.detail.stations} />

			    <small>
			    	{(e.planned === true) 
			    		? e.detail.durration
			    		: new Date(e.date.start).toString()
			    	}</small>
			    </div>
			</Card>
		);
	}
}


class TrainLine extends React.Component {

	render() {
		return (
			<span className="line">
				<strong>
					{this.props.line}
				</strong>

				{this.props.dir}
			</span>
		);
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


class StationList extends React.Component {

	render() {
		if (Object.keys(this.props.stations).length === 0) {	
			return null; 
		}
		console.log(this.props.stations);

		return (<div key={_.uniqueId('stations-')}>
			<em>Stations (alpha) | </em>
			{
			(Object.keys(this.props.stations).map(line => {
				return Object.keys(this.props.stations[line]).map( (val) => {
						return this.props.stations[line][val];
					}).join(', ');
			}))
			}
		</div>);
	}
}

module.exports = {
	EventList
};