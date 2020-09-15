import * as React from "react";
import Svg, { G, Ellipse, Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={290.263}
      height={25.988}
      viewBox="0 0 290.263 25.988"
      {...props}
    >
      <G data-name="Group 4" transform="translate(0 -114.105)" fill="#e6e6e6">
        <Ellipse
          data-name="Ellipse 11"
          cx={145.131}
          cy={2.763}
          rx={145.131}
          ry={2.763}
          transform="translate(0 134.568)"
        />
        <Path
          data-name="Path 115"
          d="M39.99 124.368c-1.886 6.3 1.041 12.742 1.041 12.742s5.985-3.773 7.871-10.074-1.041-12.742-1.041-12.742-5.989 3.774-7.871 10.074z"
        />
        <Path
          data-name="Path 116"
          d="M42.849 124.538c1.587 6.382-1.64 12.679-1.64 12.679s-5.8-4.051-7.388-10.433 1.64-12.679 1.64-12.679 5.801 4.051 7.388 10.433z"
        />
      </G>

    </Svg>
  );
}

export default SvgComponent;