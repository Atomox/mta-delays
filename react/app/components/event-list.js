let React = require('react');
let _ = require('lodash');

let Card = require('./card');
let RouteChange = require('./routechange').RouteChange;
let StationList = require('./stations').StationList;
let Station = require('./stations').Station;
let TrainLine = require('./trains').TrainLine;
let mta = require('../includes/mta.subway').mtaSubway;

class EventList extends React.Component {

	render() {

		let e = this.props.event;

		let titleClass = "card-divider ";
		titleClass += (e.planned === true) ? 'caution' : 'bad';

		let trains = {};
		for (let i in e.line) {
			let line = mta.getlineById(e.line[i].line);
			let dir = e.line[i].dir;

			if (!trains[line]) {
				trains[line] = {line: line, dir: dir,};
			}
			else {
				if (trains[line].dir !== dir) {
					trains[line].dir = 2;
				}
			}
		}

		return (

			<Card key="event-list" id={e.id}
				header={e.type}
				headerSubtitle={e.type}
				headerClass={titleClass}>
			  <div>
			    <h3>
			    {
					Object.keys(trains).map((key, i) => {
						let line = trains[key].line;
						let dir = mta.getlineDirectionByID(trains[key].dir);

						return <TrainLine
							key={_.uniqueId('train-' + line)}
							line={line}
							dir={dir} />;
					})
				}
				</h3>
				<h5>{
					(e.detail.type_detail)
						? e.detail.type_detail.join(' | ')
						: ''}</h5>

					{ (e.detail.route_change)
						? <RouteChange routeInfo={e.detail.route_change} stations={e.detail.stations} />
						: null }

					<p>{e.detail.message}</p>

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
