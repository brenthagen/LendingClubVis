import React from 'react';
import ReactDOM from 'react-dom';
import Credit from './credit.jsx';
import Risk from './risk.jsx';
import Borrower from './borrower.jsx';
    
const csv = require('../dist/LoanStats3a_minimum.csv');

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('mounting');
    console.log(csv);
  }

  render() {
    return (<div>
      <h1>LendingClub Visualizations</h1>
      <svg width="300px" height="300px">
        <rect x="20" y="20" width="60px" height="200" rx="5" ry="5" />
        <rect x="100" y="20" width="60px" height="200" rx="5" ry="5" />
        <rect x="180" y="20" width="60px" height="200" rx="5" ry="5"/>
      </svg>
      <Credit />
      <Risk />
      <Borrower />
    </div>);
  }
}

ReactDOM.render(
  <App />, document.getElementById('app')
);