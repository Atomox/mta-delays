let moment = require('moment');

let React = require('react');
import { Card } from './card';
import { TrainLine } from './trains';
import { Boro } from './boro';

import { mtaSubway as mta } from '../includes/mta.subway';


class Summary extends React.Component {

		render() {

			if (!this.props.events || this.props.events.length <= 0) { return null; }

			console.log(this.props.events);

			let lines = {},
					line_boros = {};

			Object.keys(this.props.events).map(key => {
					let e = this.props.events[key];

					if (!e.detail.type_detail || !e.detail.type_detail[0]) {
						return;
					}
					else if (!e.line) {
						return;
					}
					else if (!e.detail.boros) {
						console.warn('<!> Event has no boro.');
					}

					// Determine Message
					let msg = {
						lines: [],
						keyword: [],
						boro: [],
					},
						line_grp = {};

					// Detail of event.
					msg.keyword.push(e.detail.type_detail[0]);

					// Determine affected lines, add them, and add affected boros for each line.
					e.line.map( l => {
						let key = mta.getLineGroup(l.line);

						if (!line_grp[key]) {	line_grp[key] = msg; }
						if (line_grp[key].lines.indexOf(key) !== -1) { return; }
						line_grp[key].lines.push(mta.getlineById(l.line));

						line_boros[key] = [];

						// Boros, if available.
						if (!e.detail.boros[l.line]) { return; }
						e.detail.boros[l.line].map( b => line_grp[key].boro.push(b));
						line_grp[key].boro = _.uniq(line_grp[key].boro);
						line_boros[key] = _.union(line_grp[key].boro, line_boros[key]);
					});

					Object.keys(line_grp).map( i => {
						if (!lines[i]) { lines[i] = []; }
						lines[i].push(line_grp[i]);
					});
			});

			console.log(' <LINES> . . .', lines);

			return (
				<div className="Summary grid-x">
					<div className="cell medium-4">
					</div>
					<div className="cell small-offset-1 small-11 medium-6">
					{
						Object.keys(lines).map(l => (<GroupLineCard
								line_group={l}
								boros={line_boros[l]}
								events={lines[l]}/>) )
							}
					</div>
				</div>
			);
		}
}


class GroupLineCard extends React.Component {
	render() {

		let lines = this.props.line_group.split('-');


		console.log('[line card]', lines, this.props);


		if (!lines || !this.props.events) {
			return null;
		}
		let color = mta.getLineGroupColor(this.props.line_group);
		let style = {
			borderLeft: '3px',
			borderLeftStyle: 'solid',
			borderLeftColor: color
		};

		return(
			<div style={style} className="group-line-card">
				<div className="grid-x">
					<h3 className="cell small-4">
						{ (lines && lines.length > 0)
							? lines.map( t => <TrainLine
								key={_.uniqueId('train-' + t)}
								line={t.toUpperCase()}/>)
							: ''
						}
					</h3>
					<div className="cell small-8 text-right">
						{
							(this.props.boros && this.props.boros.length > 0)
								? this.props.boros.map(b => (<Boro boro={b} short={false}/>))
								: ''
						}
					</div>
				</div>

				<ul>
					{this.props.events.map( e => (
						<li className="grid-x">
							<div className="cell small-2 large-1">
								{ (e.lines) ? e.lines.join('/') : '' }
							</div>
							<div className="cell small-4 large-3">
							{
								(e.boro && e.boro.length > 0)
									? e.boro.map(b => (<Boro boro={b} short={true}/>))
									: ''
							}
							</div>
							<div className="cell small-4 large-5">
								{	(e.keyword) ? e.keyword : '' }
							</div>
						</li>))}
				</ul>
			</div>
		);
	}
}

module.exports = {
	Summary,
};
