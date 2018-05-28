let React = require('react');

import { mtaSubway as mta } from '../../includes/mta.subway';
import { TrainLine } from '../trains';
import { Boro } from '../boro';

const BoroSummary = (props) => {

  function getDelays(boro) {
    return (props[boro].severity[1])
      ? (<span className="delays">
          { props[boro].severity[1] }
        </span>)
      : '\u2014';
  }

  function getPlannedWork(boro) {
    return (props[boro].severity[2])
      ? (<span className="plannedWork">
          { props[boro].severity[2] }
        </span>)
      : '\u2014';
  }

  function getLineCount(boro) {
    return (props[boro].lines_affected)
      ? props[boro].lines_affected.length
      : 0;
  }

  function getBoroLines(boro) {
    return (!props[boro])
      ? null
      : props[boro].lines_affected.map(b => (
          <TrainLine line={b} disabled={true} />));
  }

  let boros = [
    'manhattan',
    'brooklyn',
    'queens',
    'bronx',
    'statenIsland'
  ];


	return (
		<ul className="BoroSummary">
      { boros.map(b => (
          <li key={b} className="grid-x">

            <div className="cell small-3">
              <Boro boro={b} short={true} caps={false} />
            </div>
            <div className="cell small-1">
              <span className="stats">{ getDelays(b) }</span>
            </div>
            <div className="cell small-2">
              <span className="stats">
                /
                { getPlannedWork(b) }
              </span>
            </div>
            <div className="cell small-6">
              across <span className="stats">{ getLineCount(b) }</span> lines.
            </div>
            <div className="cell small-12">
              {! getBoroLines(b) }
            </div>
          </li>
        )) }
		</ul>
	);
}

export default BoroSummary;
