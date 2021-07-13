import React, { useLayoutEffect, useRef } from 'react';
import * as d3 from 'd3';
import { DataProps } from '../dashboard/Dashboard';
import data from '../../data.json';
import { calculateDomainArray } from '../../helper';
import { callbackify } from 'util';

import './Chart.scss';

const Chart: React.FC = () => {
  const chartRef = useRef(null);
  const width = 500;
  const height = 500;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  useLayoutEffect(() => {
    const svg = d3
      .select(chartRef.current)
      .attr('width', width)
      .attr('height', height);

    // x scale
    const xScale = d3
      .scaleBand()
      .domain(data.data.map((val) => val.label))
      .range([margin.left, width - margin.right]);

    //x-axis
    const xAxis = d3.axisBottom(xScale).tickSize(0);

    // y scale
    const minDomain: number =
      d3.min(data.data, (obj) => Number(obj.value.toString())) ?? 0;
    const maxDomain: number =
      d3.max(data.data, (obj) => Number(obj.value.toString())) ?? 0;
    const extents = d3.extent(data.data.map((datum) => datum.value).concat(0));
    const minExtent = extents[0] || minDomain;
    const maxExtent = extents[1] || maxDomain;
    const yScale = d3
      .scaleLinear()
      .domain([minExtent, maxExtent])
      .range([height - margin.bottom, margin.top]);

    //y-axis
    const yAxis = d3
      .axisLeft(yScale)
      .tickSize(0)
      .ticks(data.data.length + 1);

    /*const x = d3
      .scaleBand()
      .domain(data.data.map((val) => val.label))
      .range([margin.left, width - margin.right])
      .padding(0.1);*/

    /*const minDomain: number =
      d3.min(data.data, (obj) => Number(obj.value.toString())) ?? 0;
    const maxDomain: number =
      d3.max(data.data, (obj) => Number(obj.value.toString())) ?? 0;
    const domainArray = calculateDomainArray(
      minDomain,
      maxDomain,
      data.data.length,
    );*/

    /*const yScale = d3.scaleLinear().domain([0, maxDomain]).range([0, height]);

    const extents = d3.extent(data.data.map((datum) => datum.value));
    const minExtent = extents[0] || minDomain;
    const maxExtent = extents[1] || maxDomain;
    const y = d3
      .scaleLinear()
      .domain([minExtent, maxExtent])
      .range([height - margin.bottom, margin.top]);*/

    //base axis
    const baseAxis = d3.axisBottom(xScale).tickSize(0);

    //define chart
    const chart = svg
      .append('g')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const bars = chart.selectAll('g').data(data.data).join('g');

    //append bars
    bars
      .append('rect')
      .attr('x', (d) => Number(xScale(d.label)))
      .attr('y', (d) => yScale(Math.max(0, d.value)))
      .attr('width', 30)
      .attr('height', (d) => Math.abs(yScale(d.value) - yScale(0)));

    //append text to bars
    bars
      .append('text')
      .attr('x', (d) => Number(xScale(d.label)))
      .attr('y', (d) => Math.abs(yScale(d.value) - yScale(0)) + 10)
      .text((d) => d.value)
      .style('text-anchor', 'start')
      .attr('dx', '.5em')
      .attr('dy', '-.5em')
      .attr('transform', 'rotate(-90)')
      .style('font-size', '1.2em');

    // add base axis
    chart
      .append('g')
      .attr('class', 'baseline')
      .attr('transform', `translate(0, ${height})`)
      .call(baseAxis);

    // add x-axis
    chart
      .append('g')
      .attr('class', 'axis x')
      .attr('transform', `translate(0, ${yScale(0)})`)
      .call(xAxis);

    // add y-axis
    chart
      .append('g')
      .attr('class', 'axis y')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis);
  });

  return <svg ref={chartRef} />;
};

export default Chart;
