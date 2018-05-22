import React from 'react';
import * as d3 from 'd3';

// income/verifcation status (borrower quality)

class Borrower extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yearData: this.props.data, // initially, all (or 2007?)
      // create number in state for each grade, to use in pie chart
      dummyData: [1, 2, 3, 4, 5]
    };
  }

  componentDidMount() {
    console.log('props', this.props)

    let width = 600;
    let height = 300;

    let svg2 = d3.select('#svg2')
      .attr('width', width)
      .attr('height', height);
    svg2.append('g').attr('transform', 'translate('
      + width + ',' + height + ')');
    let radius = height;
    let color = d3.scaleOrdinal(['red', 'green', 'yellow', 'orange', 'blue', 'pink']);
    let pie = d3.pie()
      .sort(null)
      .value((d) => d.grade);
    let path = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);
    let label = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);
    let arc = svg2.selectAll('.arc')
      .data(pie(this.state.dummyData))
      .enter().append('g')
      .attr('class', 'arc');
    arc.append('path')
      .attr('d', path)
      // .attr('fill', (d) => color(d.grade));
      .attr('fill', 'red');
    arc.append('text')
      .attr('transform', (d) => 'translate(' + label.centroid(d) + ')')
      .attr('dy', '0.35em')
      .text((d) => d.grade);

    // different pie chart example
    // let width = 600;
    // let height = 300;

    // let svg = d3.select('svg')
    //   .attr('width', width)
    //   .attr('height', height);
    // let g = svg.append('g').attr('transform', 'translate(300, 150)');
    // let radius = height / 2;
    // let color = d3.scaleOrdinal(['red', 'green', 'yellow', 'orange', 'blue', 'pink']);

  }

  render() {
    return (<div>
      <h2>borrower</h2>
      <svg id='svg2'></svg>
    </div>);
  }
}

export default Borrower;