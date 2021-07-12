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
      .range([0, DIMENSIONS.width]);
    const xAxis = axisBottom(xScale);
    data.map((val) => console.log(xScale(val.label)));
    // y axis scale
    const minDomain: number =
      min(data, (obj) => Number(obj.value.toString())) ?? 0;
    const maxDomain: number =
      max(data, (obj) => Number(obj.value.toString())) ?? 0;
    const domainArray = calculateDomainArray(minDomain, maxDomain, data.length);
    const yScale = scaleLinear()
      .domain(domainArray)
      .range([DIMENSIONS.height - 100, 0]);
    const yAxis = axisLeft(yScale);

    yAxis.ticks(data.length < 2 ? 3 : data.length);

    // TODO: instead of removing and appending new, can select existing if any and apply Axis
    svg.selectAll('g').remove();

    svg
      .append('g')
      .classed('x-axis', true)
      .attr('transform', `translate(${margin.left},${yScale(0)})`)
      .call(xAxis)
      .selectAll('text')
      .data(data)
      .text((d) => d.label)
      .style('text-anchor', 'start')
      .attr('dx', '.5em')
      .attr('dy', '-.5em')
      .attr('transform', 'rotate(-90)')
      .style('font-size', '1.2em');

    svg
      .select('.x-axis')
      .append('text')
      .attr('x', () => DIMENSIONS.width / 2)
      .attr('y', 40)
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

    svg
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('fill', (d) => (d.value < 0 ? 'red' : 'blue'))
      .attr('x', (d): number => Number(xScale(d.label)) + margin.left + 15)
      .attr('y', (d) => yScale(Math.max(0, Number(d.value.toString()))))
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
