import React from 'react';
import { View, Text } from 'react-native';
import Svg,{
    Circle,
    Ellipse,
    G,
//    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask
} from 'react-native-svg';

import PathManhattan from './PathManhattan';
import PathQueens from './PathQueens';
import PathBronx from './PathBronx';
import PathBrooklyn from './PathBrooklyn';
import PathStatenIsland from './PathStatenIsland';

// import manhattan_svg from '../../../includes/svg/manhattan.svg';
const manhattan_url = '/src/shared/svg/manhattan.svg';

const BoroMap = function(props) {

  let classes = {
    manhattan: "manhattan" + " " + 'severity-' + props.manhattan,
    queens: "queens" + " " + 'severity-' + props.queens,
    brooklyn: "brooklyn" + " " + 'severity-' + props.brooklyn,
    bronx: "bronx" + " " + 'severity-' + props.bronx,
    staten_island: "staten_island" + " " + 'severity-' + props.statenIsland
  };

  return (
    <View>
      <Svg height="350" width="300" viewBox="0 0 350 768">

        /**
         * @TODO
         *   PATHs are loading fine, but when wrapped in Symbol, they are not showing up. Do they render at all? Do they render off the map?
         */
        <Symbol
          x="0"
          y="0"
          id="hidad"
          fill="yellow">

        </Symbol>
        <G
          id="symbol_manhattan"
          fill="#333"
          x="19"
          y="114">
          { PathManhattan }
        </G>
        <G
          id="symbol_queens" x="101" y="156">
          { PathQueens }
        </G>
        <G id="symbol_bronx" x="10" y="0">
          { PathBronx }
        </G>

        <G id="symbol_brooklyn" x="81" y="381">
          { PathBrooklyn }
        </G>

        <G id="symbol_staten_island" x="-140" y="650">
          { PathStatenIsland }
        </G>


      </Svg>
    </View>
  );
  /**
    {Object.keys(classes).map(i => (
      <svg key={i}>
        <use className={classes[i]} xlinkHref={`${manhattan_url}#symbol_${i}`} />
      </svg>
    ))}
  */
};

export default BoroMap;
