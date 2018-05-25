import React from 'react';
// import manhattan_svg from '../../../includes/svg/manhattan.svg';
const manhattan_url = '/includes/svg/manhattan.svg';

const BoroMap = function(props) {

  let classes = {
    manhattan: "manhattan" + " " + 'severity-' + props.manhattan,
    queens: "queens" + " " + 'severity-' + props.queens,
    brooklyn: "brooklyn" + " " + 'severity-' + props.brooklyn,
    bronx: "bronx" + " " + 'severity-' + props.bronx,
    staten_island: "staten_island" + " " + 'severity-' + props.statenIsland
  };

  return (
    <svg viewBox='0 0 550 768' className={'map-' + props.name}>

      {Object.keys(classes).map(i => (
          <svg key={i}>
            <use className={classes[i]} xlinkHref={`${manhattan_url}#symbol_${i}`} />
          </svg>
        ))}

    </svg>

  );
};

export default BoroMap;
