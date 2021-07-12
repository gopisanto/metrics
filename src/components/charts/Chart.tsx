import React, { useLayoutEffect, useRef } from 'react';
import * as d3 from 'd3';

const Chart: React.FC = () => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    d3.select(chartRef.current)
      .append('svg')
      .append('circle')
      .attr('cx', 100)
      .attr('cy', 100)
      .attr('r', 50);
  });

  return <div ref={chartRef}></div>;
};

export default Chart;
