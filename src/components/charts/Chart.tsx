import React, { useLayoutEffect, useRef } from 'react';
import * as d3 from 'd3';
import { DataProps } from '../dashboard/Dashboard';
import data from '../../data.json';
import { calculateDomainArray } from '../../helper';

const Chart: React.FC = () => {
  const chartRef = useRef(null);
  const width = 500;
  const height = 500;
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };

  useLayoutEffect(() => {
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width - margin.left - margin.right)
      .attr('height', height - margin.top - margin.bottom)
      .attr('viewBox', `0 0 ${height} ${width}`);
    const x = d3
      .scaleBand()
      .domain(data.data.map((val) => val.label))
      .range([margin.left, width - margin.right])
      .padding(0.1);
    const xAxis = d3.axisBottom(x).tickFormat((val) => val);

    const minDomain: number =
      d3.min(data.data, (obj) => Number(obj.value.toString())) ?? 0;
    const maxDomain: number =
      d3.max(data.data, (obj) => Number(obj.value.toString())) ?? 0;
    const domainArray = calculateDomainArray(
      minDomain,
      maxDomain,
      data.data.length,
    );

    const yScale = d3.scaleLinear().domain([0, maxDomain]).range([0, height]);

    const y = d3
      .scaleLinear()
      .domain(domainArray)
      .range([height - margin.bottom, margin.top]);

    svg
      .append('g')
      .attr('transform', `translate(0, ${y(0)})`)
      .call(xAxis)
      .selectAll('text')
      .data(data.data)
      .text((d) => d.label)
      .style('text-anchor', (d) => (d.value < 0 ? 'end' : 'start'))
      .attr('dx', '.5em')
      .attr('dy', '-.5em')
      .attr('transform', 'rotate(-90)')
      .style('font-size', '1.2em');

    const yAxis = d3.axisLeft(y);

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)
      .attr('font-size', '1em');
    console.log(`yscale = ${y(2280)}`);
    svg
      .append('g')
      .attr('fill', 'royalblue')
      .selectAll('react')
      .data(data.data)
      .join('rect')
      .attr('x', (d) => Number(x(d.label)))
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => y(0) - y(d.value));

    /*svg
      .append('g')
      .attr('fill', 'royalblue')
      .selectAll('react')
      .data(data)
      .join('rect')
      .attr('x', (d, i) => x(i))
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => y(0) - y(d.value));*/
  });

  return <div ref={chartRef} style={{ height, width }}></div>;
};

export default Chart;
