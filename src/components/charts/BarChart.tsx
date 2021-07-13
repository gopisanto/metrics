import React, { useLayoutEffect, useRef } from 'react';
import {
  select,
  scaleLinear,
  axisBottom,
  axisLeft,
  scaleOrdinal,
  scaleBand,
  min,
  max,
  NumberValue,
} from 'd3';

import { calculateDomainArray } from '../../helper';
import { DataProps } from '../dashboard/Dashboard';

interface Props {
  data: DataProps[];
}

enum DIMENSIONS {
  height = 400,
  width = 400,
}

const BarChart: React.FC<Props> = ({ data }) => {
  const svgRef = useRef(null);
  /*const chartData: number[] = data.map(
    (datum: Record<string, string | number>): number =>
      parseFloat(datum.value.toString()),
  );*/
  useLayoutEffect(() => {
    const svg = select(svgRef.current);

    const margin = {
      top: 0,
      bottom: 100,
      left: 80,
      right: 40,
    };

    // x axis scale
    const xScale = scaleBand()
      .domain(data.map((val) => val.label))
      .range([margin.left, DIMENSIONS.width - margin.right]);
    const xAxis = axisBottom(xScale).tickSize(0).ticks(0).tickValues([]);
    data.map((val) => console.log(xScale(val.label)));
    // y axis scale
    const minDomain: number =
      min(data, (obj) => Number(obj.value.toString())) ?? 0;
    const maxDomain: number =
      max(data, (obj) => Number(obj.value.toString())) ?? 0;
    const domainArray = calculateDomainArray(minDomain, maxDomain, data.length);
    const yScale = scaleLinear()
      .domain(domainArray)
      .range([DIMENSIONS.height - margin.bottom, margin.top]);
    const yAxis = axisLeft(yScale).ticks(data.length < 2 ? 3 : data.length);

    // TODO: instead of removing and appending new, can select existing if any and apply Axis
    svg.selectAll('g').remove();

    svg
      .append('g')
      .classed('x-axis', true)
      .attr('transform', `translate(0,${yScale(0)})`)
      .call(xAxis);

    svg
      .selectAll('.x-axis')
      .append('text')
      .attr('x', () => DIMENSIONS.width / 2)
      .attr('y', yScale(0))
      .attr('fill', '#000')
      .style('font-size', '20px')
      .style('text-anchor', 'middle')
      .text('metrics');

    svg
      .append('g')
      .classed('', true)
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(yAxis)
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('transform', `translate(-50, ${DIMENSIONS.height / 2}) rotate(-90)`)
      .attr('fill', '#000')
      .style('font-size', '20px')
      .style('text-anchor', 'middle')
      .text('values');

    const bars = svg.selectAll('rect');

    svg
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('fill', (d) => (d.value < 0 ? 'red' : 'blue'))
      .attr('x', (d): number => Number(xScale(d.label)) + 15)
      .attr('y', (d) => yScale(Math.max(0, d.value)))
      .attr('width', 20)
      .attr('height', (d) =>
        Math.abs(yScale(Number(d.value.toString())) - yScale(0)),
      );
  });

  return (
    <svg
      ref={svgRef}
      style={{
        width: DIMENSIONS.width,
        height: DIMENSIONS.height,
      }}
    ></svg>
  );
};

export default BarChart;
