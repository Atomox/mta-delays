let React = require('react');
let Card = require('./card');
let moment = require('moment');


class Archive extends React.Component {

		render() {
			if (!this.props.archive || !this.props.archive.id) {
				return null;
			}

			if (!this.props.stats) {
				this.props.stats.lines = [];
				this.props.stats.count = 0;
				this.props.stats.time = {};
			}

			let detail = this.props.archive.detail.split('.');
			let id = detail[1];
			detail = (detail[2]) ? detail[2].split('_').join(' ') : 'No Description';

			return (
				<div className="Archive">

					<div className="id">
						<h1>{this.props.archive.id}</h1>
						<h2>{id}</h2>
					</div>
					<div>
						<h2>{(this.props.stats.time)
							? this.props.stats.time.time_of_day : ''}</h2>
						<h4>
							{(this.props.stats.time.weekend)
								? 'Weekend' : 'Week Day'}
							&nbsp;/&nbsp;
							{(this.props.stats.time.rush_hour)
								? 'Rush Hour' : 'Off Peak'}
						</h4>
					</div>

					<em className="description">{detail}</em>

					<strong>{this.props.stats.count}</strong> events,
					(<strong className="warn">{this.props.stats.planned_events}</strong>/
					<strong className="bad">{this.props.stats.unplanned_events}</strong>), affecting	<strong>{this.props.stats.lines.length}</strong> lines: {(this.props.stats.lines)
						? this.props.stats.lines.join(', ')
						: null }


				</div>
			);
		}
}

class Header extends React.Component {

	render() {
		return (
			<div className="header">

				<Archive archive={this.props.archive} stats={this.props.summary}/>

				{(this.props.status == 'initializing' || this.props.status === false)
					? <StateMessage status={this.props.status} />
					: (this.props.numEvents === 0)
						? <AllClear />
						: null
				}
			</div>
		);
	}
}



class AllClear extends React.Component {
	render() {
		return(
			<Card id={'all-clear'} header={''} headerClass={''}>
				<div>All Good in the 'hood</div>
			</Card>
		);
	}
}

class StateMessage extends React.Component {
	render() {
		let message = '';

		switch (this.props.status) {
			case 'initializing':
				message = 'Initializing System...';
				break;

			case false:
				message = 'Error talking to Server.';
				break;
		}

		return(
			<Card id={'state-message'} header={''} headerClass={''}>
				<div>{message}</div>
			</Card>
		);
	}
}

module.exports = {
	Header,
	AllClear,
};
