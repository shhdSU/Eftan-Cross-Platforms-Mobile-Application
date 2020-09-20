
import * as React from "react"
import Svg, { Defs, G, Text, TSpan, Ellipse, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={302.219} height={40} viewBox="0 0 302.219 40" {...props}>
      <Defs></Defs>
      <G data-name="Group 5">
        <G transform="translate(-.001)" filter="url(#prefix__a)">
          <Text
            data-name="\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628 \u062C\u062F\u064A\u062F"
            transform="translate(177.22 26)"
            fill="#4f3c75"
            fontSize={27}
            fontWeight={700}
            right={20}
          >
            <TSpan x={0} y={0} />
            {}
          </Text>
        </G>
        <G data-name="Group 4" transform="translate(0 -101.593)" fill="#e6e6e6">
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
      </G>
    </Svg>
  )
}

export default SvgComponent
