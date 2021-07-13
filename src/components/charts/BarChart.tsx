import React, { useLayoutEffect, useRef } from 'react';
import {
  select,
  scaleLinear,
  axisBottom,
  axisLeft,
  scaleBand,
  min,
  max,
} from 'd3';

import { calculateDomainArray } from '../../helper';
import { DataProps } from '../dashboard/Dashboard';

import './BarChart.scss';

interface Props {
  data: DataProps[];
}

enum DIMENSIONS {
  height = 450,
  width = 400,
}

const BarChart: React.FC<Props> = ({ data }) => {
  const svgRef = useRef(null);

  useLayoutEffect(() => {
    const margin = {
      top: 0,
      bottom: 100,
      left: 80,
      right: 40,
    };

    const svg = select(svgRef.current)
      .attr('width', DIMENSIONS.width)
      .attr('height', DIMENSIONS.height);

    const domainFunc = (val) => `${val.description}( ${val.label} )`;

    // x axis
    const xScale = scaleBand()
      .domain(data.map(domainFunc))
      .range([margin.left, DIMENSIONS.width - margin.right - 100])
      .padding(0.1);

    const xAxis = axisBottom(xScale).tickSize(0).ticks(0);

    // y axis
    const minDomain: number =
      min(data, (obj) => Number(obj.value.toString())) ?? 0;
    const maxDomain: number =
      max(data, (obj) => Number(obj.value.toString())) ?? 0;
    const domainArray = calculateDomainArray(minDomain, maxDomain, data.length);
    const yScale = scaleLinear()
      .domain(domainArray)
      .range([DIMENSIONS.height - margin.bottom, margin.top]);

    const yAxis = axisLeft(yScale).ticks(data.length < 5 ? 5 : data.length);

    // TODO: instead of removing and appending new, can select existing if any and apply Axis
    // svg.selectAll('g').remove();

    //define chart
    const chart = svg.append('g');

    const bars = chart.selectAll('g').data(data).join('g');

    bars
      .append('rect')
      .attr('fill', (d) => (d.value < 0 ? 'red' : 'blue'))
      .attr('x', (d) => Number(xScale(domainFunc(d))))
      .attr('y', (d) => yScale(Math.max(0, d.value)))
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .transition()
      .duration(1000)
      .attr('height', (d) => Math.abs(yScale(d.value) - yScale(0)));

    chart
      .append('g')
      .classed('x-axis', true)
      .attr('transform', `translate(0,${yScale(0)})`)
      .call(xAxis)
      .selectAll('text')
      .style('font-size', '1.2em')
      .style('word-break', 'break-all')
      .attr('y', 0)
      .attr('x', 10)
      .attr('dy', '.35em')
      .attr('transform', 'rotate(-90)')
      .style('text-anchor', 'start');

    chart
      .select('.x-axis')
      .append('text')
      .attr('x', () => DIMENSIONS.width / 2)
      .attr('y', yScale(0))
      .attr('fill', '#000')
      .style('font-size', '20px')
      .style('text-anchor', 'middle')
      .text('metrics');

    // add y-axis
    chart
      .append('g')
      .attr('class', 'axis y')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis);
  });

  return (
    <div>
      <svg
        ref={svgRef}
        style={{
          width: DIMENSIONS.width,
          height: DIMENSIONS.height,
        }}
      ></svg>
    </div>
  );
};

export default BarChart;
