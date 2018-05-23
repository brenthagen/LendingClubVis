import React from 'react';
import * as d3 from 'd3';

// average loan amounts (total credit available)
// could add total credit (per month basis, perhaps)

class Credit extends React.Component {
  constructor(props) {
    super(props);
    this.renderBarGraph = this.renderBarGraph.bind(this);
  }

  renderBarGraph() {
    // generates average loan data by year and renders to a static bar graph

    let avgData = [];
    
    // output the average loan for a year
    const getAvgLoanByYear = (yearDigits) => {
      let year = this.props.data.filter((loan) => {
        if (loan.issue_d) {
          return (loan.issue_d[5] === yearDigits[1]);
        }
      });
      let total = year.reduce((acc, cur) => acc + cur.loan_amnt, 0);
      let avg = total / year.length;
      avgData.push({yearDigits, avg});
    }

    // generate data for 2007-11
    getAvgLoanByYear('07');
    getAvgLoanByYear('08');
    getAvgLoanByYear('09');
    getAvgLoanByYear('10');
    getAvgLoanByYear('11');

    // bar graph
    let margin = {top: 20, right: 10, bottom: 20, left: 10};
    let width = 600 - margin.left - margin.right;
    let rectWidth = 100;
    let height = 300 - margin.top - margin.bottom;

    let yScale = d3.scaleLinear()
      .domain([0, 15000])
      .range([height, 0]);

    let yAxis = d3.axisLeft()
      .scale(yScale);
   
    let xScale = d3.scaleOrdinal()
      .domain(['2007', '2008', '2009', '2010', '2011'])
      .range([0, 100, 200, 300, 400]);

    let xAxis = d3.axisBottom(xScale)
      .scale(xScale);

    let svg = d3.select('#svg1')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    svg.append('g')
      .attr('transform', 'translate(40, 0)')
      .call(yAxis);
    svg.append('g')
      .attr('transform', 'translate(90, ' + height + ')')
      .call(xAxis);
    svg.selectAll('rect')
      .data(avgData)
      .enter().append('rect')
      .attr('x', (d, i) => i * rectWidth + 40)
      .attr('y', (d) => height - height * d.avg / 15000 )
      .attr('width', rectWidth)
      .attr('height', d => height * d.avg / 15000)
      .attr('fill', '#891387')
      .attr('stroke', '#fff');

    svg.selectAll('div')
      .data(avgData)
      .enter().append('text')
      .text((d) => '$' + Math.round(d.avg))
      .attr('class', 'label')
      .attr('x', (d,i) => i * rectWidth + 67)
      .attr('y', (d) => height - height * d.avg / 15000 + 10)
      .attr('dy', '2em')
      .attr('fill', '#c5cddb')
      .style("font", "16px helvetica");
  }

  componentDidMount() {
    this.renderBarGraph();
  }

  render() {
    return (<div>
      <h2>Average loan amount, by year</h2>
      <svg id='svg1'></svg>
    </div>);
  }
}


export default Credit;