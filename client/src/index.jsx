import React from 'react';
import ReactDOM from 'react-dom';
import Credit from './credit.jsx';
import Risk from './risk.jsx';
import Borrower from './borrower.jsx';
import * as d3 from 'd3';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
    
const csv = require('../dist/LoanStats3a_minimum.csv');
const filteredLoan = csv.filter((loan) => !!loan.loan_amnt);

let avgData = [];

const getAvgLoanByYear = (yearDigits) => {
  let year = filteredLoan.filter((loan) => loan.issue_d[5] === yearDigits[1]);
  let total = year.reduce((acc, cur) => acc + cur.loan_amnt, 0);
  let avg = total / year.length;
  console.log(total);
  console.log(yearDigits, avg);
  avgData.push({yearDigits, avg});
}

getAvgLoanByYear('07');
getAvgLoanByYear('08');
getAvgLoanByYear('09');
getAvgLoanByYear('10');
getAvgLoanByYear('11');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: csv,
      avg: avgData
    }
  }

  componentWillMount() {
    console.log('mounting');
    console.log(this.state.data)
  }

  componentDidMount() {
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

    let svg = d3.select('svg')
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
      .data(this.state.avg)
      .enter().append('rect')
      .attr('x', (d, i) => i * rectWidth + 40)
      .attr('y', (d) => height - height * d.avg / 15000 )
      .attr('width', rectWidth)
      .attr('height', d => height * d.avg / 15000)
      .attr('fill', '#891387')
      .attr('stroke', '#fff')
  }

  render() {
    return (<div>
      <Grid>
        <Col md={4}>
          <Row>
            <h1>LendingClub Visualizations</h1>
          </Row>
          <Row>
          <svg width="600px" height="300px"></svg>
          </Row>
          <Row>
          <Credit />
          </Row>
          <Row>
          <Risk />
          </Row>
          <Row>
          <Borrower />
          </Row>
        </Col>
      </Grid>
    </div>);
  }
}

ReactDOM.render(
  <App />, document.getElementById('app')
);