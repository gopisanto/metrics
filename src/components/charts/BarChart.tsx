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

import { calculateDomainArray, typifyVal } from '../../helper';
import { DataProps } from '../dashboard/Dashboard';

import './BarChart.scss';
import { getProperValue } from '../table/Col';

interface Props {
  data: DataProps[];
  splitMode?: boolean;
}

enum DIMENSIONS {
  height = 450,
  width = 400,
}

const BarChart: React.FC<Props> = ({ data, splitMode }) => {
  const svgRef = useRef(null);

  useLayoutEffect(() => {
    const margin = {
      top: 20,
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
      .range([margin.left, DIMENSIONS.width - margin.right])
      .padding(0.1);

    const xAxis = axisBottom(xScale).tickSize(0).ticks(0);

    // y axis
    const minDomain: number =
      Number(
        min(data, (obj) =>
          !splitMode ? obj.value : typifyVal(obj.type, obj.value),
        ),
      ) ?? 0;
    const maxDomain: number =
      Number(
        max(data, (obj) =>
          !splitMode ? obj.value : typifyVal(obj.type, obj.value),
        ),
      ) ?? 0;
    const domainArray = calculateDomainArray(
      minDomain,
      maxDomain,
      data.length,
      !!splitMode,
      data[0].type,
    );
    const yScale = scaleLinear()
      .domain(domainArray)
      .range([DIMENSIONS.height - margin.bottom, margin.top]);

    const yAxis = axisLeft(yScale).ticks(data.length < 5 ? 5 : data.length);

    //define chart
    const chart = svg.append('g');

    const bars = chart.selectAll('g').data(data).join('g');

    bars
      .append('rect')
      .attr('fill', (d) => (d.value < 0 ? 'red' : 'blue'))
      .attr('x', (d) => Number(xScale(domainFunc(d))))
      .attr('y', (d) => yScale(Math.max(0, typifyVal(d.type, d.value))))
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .transition()
      .duration(1000)
      .attr('height', (d) =>
        Math.abs(yScale(typifyVal(d.type, d.value)) - yScale(0)),
      );
    bars
      .append('text')
      .text((d) => getProperValue(d.value, d.type))
      .attr('x', (d) => Number(xScale(domainFunc(d))))
      .attr('y', (d) => yScale(Math.max(0, typifyVal(d.type, d.value))))
      .attr('fill', 'white')
      .attr('font-size', '0.8em');

    chart
      .append('g')
      .classed('x-axis', true)
      .attr('transform', `translate(0,${yScale(0)})`)
      .call(xAxis)
      .selectAll('text')
      .data(data)
      .attr('word-break', 'break-all')
      .style('font-size', '1.2em')
      .attr('y', 0)
      .attr('x', (d) => (d.value <= 0 ? -10 : 10))
      .attr('dy', '.35em')
      .attr('transform', 'rotate(-90)')
      .style('text-anchor', (d) => (d.value <= 0 ? 'end' : 'start'));

    chart
      .select('.x-axis')
      .append('text')
      .attr('x', () => DIMENSIONS.width / 2)
      .attr('y', 20)
      .attr('fill', 'white')
      .style('font-size', '20px')
      .style('text-anchor', 'middle')
      .text(splitMode ? data[0].category : 'metrics');

    // add y-axis
    chart
      .append('g')
      .attr('class', 'axis y')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)
      .selectAll('text')
      .attr('y', 0)
      .attr('x', -10)
      .attr('dy', '.35em')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');
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
