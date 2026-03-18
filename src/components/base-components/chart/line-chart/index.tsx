import React, {FC} from "react";
import {LineChart, Line, Tooltip, ResponsiveContainer} from "recharts";
import {CategoricalChartProps} from "recharts/types/chart/generateCategoricalChart";

type WaveLineChartProps = CategoricalChartProps & {
  w?: number;
  h?: number;
  colorLine?: string;
  lineWidth?: number;
  keyId: string;
  items?: WaveLineChartData[];
  className?: string;
  dot?: boolean;
};

type WaveLineChartData = {
  name: string | any;
  [key: string]: number | any;
};
const WaveLineChart: FC<WaveLineChartProps> = ({
  w = 238,
  h = 69,
  colorLine,
  lineWidth,
  keyId,
  items,
  className,
  dot,
  ...props
}) => {
  const CustomTooltip = (props: any) => {
    const {active, payload, label} = props;
    if (active && payload && payload.length) {
      return (
        <div className="text-txtprimary bg-white text-xs p-3 rounded-md shadow-lg">
          <p className="text-xs font-medium">{`Name: ${label}`}</p>
          <div className="flex items-center gap-2 font-medium">
            UV: <p className="text-xs font-semibold">{`${payload[0].value}`}</p>
          </div>
          <p className="text-xs font-medium">{`PV: ${payload[1]?.value || "N/A"}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer>
      <LineChart width={w} height={h} data={items || []} {...props}>
        <Line
          dot={dot || false}
          type="monotone"
          dataKey={keyId}
          stroke={colorLine}
          strokeWidth={lineWidth}
        />
        <Tooltip
          cursor={{
            fill: "rgba(73, 73, 73, 0.03)",
            radius: 8,
            style: {transition: "0.2s ease"},
          }}
          content={CustomTooltip}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WaveLineChart;
