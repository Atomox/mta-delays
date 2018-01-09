let React = require('react');
let _ = require('lodash');

let mta = require('../includes/mta.subway').mtaSubway;
let Station = require('./stations').Station;
let TrainLine = require('./trains').TrainLine;

class RouteChange extends React.Component {

  // this.props.routeInfo

  render() {
		console.log(this.props.routeInfo);

		let routes = this.props.routeInfo.route.map(r => {
			let trains = r.lines.map(t => {
					return <TrainLine
						key={_.uniqueId('train-' + mta.getlineById(t))}
						line={mta.getlineById(t)}
						dir='both' />;
			});

			let along = (<TrainLine
				key={_.uniqueId('train-' + mta.getlineById(r.along))}
				line={mta.getlineById(r.along)}
				dir={'both'} />);

			let from = (<Station
					stations={this.props.stations}
					line={_.union([r.along],r.lines)}
					sid={r.from}/>
			);
			let to = (<Station
					stations={this.props.stations}
					line={_.union([r.along],r.lines)}
					sid={r.to}/>
			);

			return (<div key={_.uniqueId()}>{trains} via the {along} from {from} until {to}.</div>
			);
		});

		return (
			<div className="route-change">
				{routes}
			</div>
		);
	}
}



module.exports = {
	RouteChange
};
