import React from 'react';
import ReactDOM from 'react-dom';
import Credit from './credit.jsx';
import Risk from './risk.jsx';
import Borrower from './borrower.jsx';
import * as d3 from 'd3';
    
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
    let rectWidth = 100;
    let height = 300;

    let svg = d3.select('svg');
    svg.selectAll('rect')
      .data(this.state.avg)
      .enter().append('rect')
      .attr('x', (d, i) => i * rectWidth)
      .attr('y', (d) => height - height * d.avg / 15000 )
      .attr('width', rectWidth)
      .attr('height', d => height * d.avg / 15000)
      .attr('fill', 'red')
      .attr('stroke', '#fff');
  }

  render() {
    return (<div>
      <h1>LendingClub Visualizations</h1>
      <svg width="500px" height="300px"></svg>
      <Credit />
      <Risk />
      <Borrower />
    </div>);
  }
}

ReactDOM.render(
  <App />, document.getElementById('app')
);