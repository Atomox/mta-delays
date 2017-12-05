let React = require('react');

let mta = require('../includes/mta.subway').mtaSubway;

class EventList extends React.Component {

	render() {

		let e = this.props.event;

		return (

			<div className="card" key={e.id}>
			  <div className="card-divider">
			    {e.type}
			  </div>
			  <div className="card-section">
			    <h4>
			     {
					Object.keys(e.line).map((key, i) => {
						let line = mta.getlineById(e.line[key].line);
						let dir = mta.getlineDirectionByID(e.line[key].dir);

						return (
							<span className="line">
								<strong>{line}</strong> {dir}
							</span>);
					})
				} &nbsp;
			     | {(e.detail.type_detail) 
					? e.detail.type_detail.join(', ') : ''}
				</h4>
			    <p>{e.summary}</p>
			  </div>
			</div>
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