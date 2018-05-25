let moment = require('moment');

let React = require('react');
import { Card } from './card';
import { TrainLine } from './trains';
import { Boro } from './boro';

import { mtaSubway as mta } from '../includes/mta.subway';
import { helpers } from '../includes/helpers';
import BoroMap from './maps/BoroMap';

class Summary extends React.Component {

	/**
	 * Given a boro incident count object, determine the final severity level.
	 * We use this for styling the summary to reflect boro severity status.
	 *
	 * @param {object} boro_data
	 *   A generated object for each boro, with the highest severity,
	 *   and the count of incidents at each level of severity.
	 *
	 * @return {object}
	 *    An object with keys for each boro, and a single number representing
	 *    the severity of delays in that boro.
	 */
		determineSeverity(boro_data) {

			let results = {};

			Object.keys(boro_data).map( d => {
				let level = boro_data[d].highest;
					results[d] = (boro_data[d].severity[level] > 2)
						? ((level * 2) - 1)
						: (level * 2);
			});

			return results;
		}


		prepareEvents(events) {

			let lines = {},
					line_boros = {},
					lines_affected = [],
					boro_count = {
						Mn: {
							highest: 5,
							severity: []
						},
						Qs: {
							highest: 5,
							severity: []
						},
						Bk: {
							highest: 5,
							severity: []
						},
						Bx: {
							highest: 5,
							severity: []
						},
						SI: {
							highest: 5,
							severity: []
						},
					};

			Object.keys(events).map(key => {
					let e = events[key];

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
					msg.keyword.push(e.detail.type);

					// Determine affected lines, add them, and add affected boros for each line.
					e.line.map( l => {
						let key = mta.getLineGroup(l.line),
							my_line = mta.getlineById(l.line);

						if (!line_grp[key]) {	line_grp[key] = msg; }

						// Push a line to the message list, but only once.
						if (line_grp[key].lines.indexOf(my_line) !== -1) { return; }
						line_grp[key].lines.push(my_line);
						if (lines_affected.indexOf(my_line) === -1) {
							lines_affected.push(my_line);
						}

						if (!line_boros[key]) {
							line_boros[key] = [];
						}

						// Boros, if available.
						if (!e.detail.boros[l.line]) { return; }
						e.detail.boros[l.line].map( b => line_grp[key].boro.push(b));
						line_grp[key].boro = _.uniq(line_grp[key].boro);
						line_boros[key] = _.union(line_grp[key].boro, line_boros[key]);

						// Tally Boro Event Severity.
						let severity = (e.detail.type && e.detail.type.weight)
							? e.detail.type.weight : 2;

						line_boros[key].map(b => {
							boro_count[b].highest = (severity <= boro_count[b].highest)
								? severity : boro_count[b].highest;
							if (!boro_count[b].severity[severity]) {
								boro_count[b].severity[severity] = 0;
							}
							boro_count[b].severity[severity] ++;
						});
					});

					Object.keys(line_grp).map( i => {
						if (!lines[i]) { lines[i] = []; }
						lines[i].push(line_grp[i]);
					});
			});

			return {
				lines: lines,
				line_boros: line_boros,
				lines_affected: lines_affected,
				boro_count: boro_count
			}
		}

		render() {

			if (!this.props.events || this.props.events.length <= 0) { return null; }

			// Analyze all events, and gather summary information.
			let { lines, line_boros, lines_affected, boro_count} = this.prepareEvents(this.props.events);

			// Get a final boro_severity for each boro.
			boro_count = this.determineSeverity(boro_count);

			return (
				<div className="Summary grid-x">

					<div className="cell small-12 medium-3 large-5">
						<BoroMap
						 	manhattan={boro_count['Mn']}
							brooklyn={boro_count['Bk']}
							queens={boro_count['Qs']}
							bronx={boro_count['Bx']}
							statenIsland={boro_count['SI']} />
					</div>
					<div className="cell small-11 medium-9 large-7">
					{
						Object.keys(lines).map(l => (<GroupLineCard
							key={_.uniqueId('lineCard-')}
							line_group={l}
							affectedLines={lines_affected}
							boros={line_boros[l]}
							events={lines[l]}/>) )
					}
					</div>
				</div>
			);
		}
}


class GroupLineCard extends React.Component {

	assembleBoros(boros, short, caps) {
		return (boros && Array.isArray(boros))
			? boros.map( b => (
					<Boro
						key={_.uniqueId('boro-' + b)}
						boro={b}
						short={short}
						caps={caps}/>
					))
				.reduce((prev, curr) => ((prev === null)
					? [curr]
					: [prev, ', ', curr]),
				null)
			: null;
	}

	assembleLines(lines) {
		return (lines && lines.length > 0 && Array.isArray(lines))
			? lines
				.map( t => (isNaN(parseInt(t)))
					? t.toUpperCase()
					: parseInt(t) )
				.map( t => (
					<TrainLine
						key={_.uniqueId('train-' + t)}
						line={t}
						disabled={(this.props.affectedLines.indexOf(t) === -1)}/>
					))
			: null;
	}

	assembleEvents(events) {

		return (events && Array.isArray(events))
			? events.map( e => {

				let tagClass = 'cell small-4 large-5',
					mainTag = (e.keyword[0])
						// ? e.keyword[0]
						? e.keyword[0]
						: {tag: '', weight: 5};
				mainTag.tag = helpers.underscoreToCaps(e.keyword[0].tag);
				tagClass += (mainTag.weight) ? ' weight-' + mainTag.weight : 'weight-5';

				return (
					<li className="grid-x" key={_.uniqueId('sum-event')}>
						<div className="cell small-2 x-large-1">
							{ (e.lines && Array.isArray(e.lines)) ? e.lines.join('/') : '' }
						</div>

						<div className="cell small-4 large-3">
						{	(e.boro)
							? this.assembleBoros(e.boro, true, false)
							: null }
						</div>

						<div className={tagClass}>
							{	(mainTag.tag) ? mainTag.tag : 'Foo' }
						</div>
					</li>
				);
			})
			: null;
	}

	render() {

		let lines = this.props.line_group.split('-');

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
						{ this.assembleLines(lines) }
					</h3>
					<div className="cell small-8 text-right">
						{ this.assembleBoros(this.props.boros, false, false) }
					</div>
				</div>

				<ul>
					{ this.assembleEvents(this.props.events) }
				</ul>
			</div>
		);
	}
}

module.exports = {
	Summary,
};
