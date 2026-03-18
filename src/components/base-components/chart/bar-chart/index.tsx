import React, {CSSProperties, FC} from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {CategoricalChartProps} from "recharts/types/chart/generateCategoricalChart";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

type StackBarChartProps = CategoricalChartProps & {
  items: StackBarChartData[];
  stackKeys: StackKeyProps;
  w?: number;
  h?: number;
  legendStyle?: CSSProperties;
  rotateColor?: number;
  rounded?: {
    top?: [number, number, number, number];
    bottom?: [number, number, number, number];
  };
  patternA?: {
    id?: string;
    rectWidth?: number;
    primaryColor?: string;
    secondaryColor?: string;
    patternRotation?: number;
    primaryHeight?: number;
    secondaryHeight?: number;
  };
  patternB?: {
    id?: string;
    rectWidth?: number;
    primaryColor?: string;
    secondaryColor?: string;
    patternRotation?: number;
    primaryHeight?: number;
    secondaryHeight?: number;
  };
};

type StackBarChartData = {
  name: string | any;
  [key: string]: number | any;
};

type StackKeyProps = {
  keyA: string;
  keyB: string;
  stackId: string;
};

export const StackBarChart: FC<StackBarChartProps> = ({
  items,
  w,
  h,
  rounded,
  stackKeys,
  rotateColor,
  patternA = {
    id: "patternA",
    rectWidth: 5,
    primaryColor: "#079449",
    secondaryColor: "#d7fae0",
    patternRotation: 135,
    primaryHeight: 5,
    secondaryHeight: 5,
  },
  patternB = {
    id: "patternB",
    rectWidth: 5,
    primaryColor: "#0B74E5",
    secondaryColor: "#DBEEFF",
    patternRotation: 135,
    primaryHeight: 5,
    secondaryHeight: 5,
  },
  legendStyle,
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
      <BarChart
        {...props}
        width={w || 0}
        height={h || 0}
        data={items || data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <defs>
          <pattern
            id={`${patternA.id}`}
            patternUnits="userSpaceOnUse"
            width={patternA.rectWidth}
            height={
              patternA.primaryHeight &&
              patternA.secondaryHeight &&
              patternA.primaryHeight + patternA.secondaryHeight
            }
            patternTransform={`rotate(${patternA.patternRotation})`}
          >
            <rect
              width={patternA.rectWidth}
              height={patternA.primaryHeight}
              fill={patternA.primaryColor}
            />
            <rect
              y={patternA.primaryHeight}
              width={patternA.rectWidth}
              height={patternA.secondaryHeight}
              fill={patternA.secondaryColor}
            />
          </pattern>
        </defs>
        <defs>
          <pattern
            id={`${patternB.id}`}
            patternUnits="userSpaceOnUse"
            width={patternB.rectWidth}
            height={
              patternB.primaryHeight &&
              patternB.secondaryHeight &&
              patternB.primaryHeight + patternB.secondaryHeight
            }
            patternTransform={`rotate(${patternB.patternRotation})`}
          >
            <rect
              width={patternB.rectWidth}
              height={patternB.primaryHeight}
              fill={patternB.primaryColor}
            />
            <rect
              y={patternB.primaryHeight}
              width={patternB.rectWidth}
              height={patternB.secondaryHeight}
              fill={patternB.secondaryColor}
            />
          </pattern>
        </defs>

        <CartesianGrid vertical={false} strokeDasharray="1 1" />
        <XAxis
          dataKey="name"
          className="text-xs"
          baselineShift={0}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          orientation="right"
          tickLine={false}
          axisLine={false}
          className="text-xs"
        />
        <Tooltip
          cursor={{
            fill: "rgba(73, 73, 73, 0.03)",
            radius: 8,
            style: {transition: "0.2s ease"},
          }}
          content={CustomTooltip}
          animationEasing="ease"
          animationDuration={200}
        />
        <Legend style={legendStyle} />
        <Bar
          dataKey={stackKeys.keyA}
          stackId={stackKeys.stackId}
          fill={`url(#${patternA.id})`}
          radius={rounded?.top}
        />
        <Bar
          dataKey={stackKeys.keyB}
          stackId={stackKeys.stackId}
          fill={`url(#${patternB.id})`}
          radius={rounded?.bottom}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
