import React from 'react';
import { scaleLinear, scaleBand } from '@vx/scale';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { AxisBottom, AxisLeft } from '@vx/axis';

import { Badge } from '@chakra-ui/core';

export default ({
  width,
  height,
  yValueAccessor,
  xValueAccessor,
  data,
  yAxisLabel,
  xAxisLabel
}) => {
  if (!data || !data.length) {
    return null;
  }

  const margin = {
    top: 60,
    bottom: 60,
    left: 80,
    right: 80
  };
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // colors
  const primary = '#8921e0';

  // scales
  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(xValueAccessor),
    padding: 0.4
  });
  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, Math.max(...data.map(yValueAccessor))]
  });

  if (!data || !data.length) {
    return null;
  }

  return (
    <svg width={width} height={height}>
      <Group top={margin.top} left={margin.left}>
        {data.map((d, i) => {
          const letter = xValueAccessor(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - yScale(yValueAccessor(d));
          const barX = xScale(letter);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${letter}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(23, 233, 217, .5)"
            />
          );
        })}
        {data.map((d, i) => {
          const cx = xScale(xValueAccessor(d));
          const cy = yScale(yValueAccessor(d));
          return (
            <g key={i}>
              <Badge as="text" x={cx + xScale.bandwidth() / 2 - 4} y={cy - 10}>
                {yValueAccessor(d)}
              </Badge>
            </g>
          );
        })}
        <AxisLeft
          scale={yScale}
          top={0}
          left={0}
          label={yAxisLabel}
          stroke={primary}
          tickStroke={primary}
          strokeWidth={2}
        />
        <AxisBottom
          left={0}
          scale={xScale}
          top={yMax}
          label={xAxisLabel}
          stroke={primary}
          tickStroke={primary}
          strokeWidth={2}
        />
      </Group>
    </svg>
  );
};
