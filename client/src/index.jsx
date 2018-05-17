import React from 'react';
import ReactDOM from 'react-dom';
import Papa from 'papaparse';

// components to consider:
  // total/average loan amounts (total credit available)
  // interest rate/grades (risk profile)
  // income/verifcation status (borrower quality)
    
const csv = require('../dist/LoanStats3a_minimum.csv');

// const csv = require('../dist/LoanStats3a_minimum.csv');

// Papa.parse(csv, {
//   complete: function(results) {
//     console.log("Finished:", results.data);
//   }
// });

// Papa.parse('../dist/LoanStats3a_minimum.csv', {
//   worker: true,
//   step: function(results) {
//     console.log("Row:", results.data);
//   }
// });

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('mounting');
    console.log(csv);
    // Papa.parse(csv, {
    //   header: true,
    //   download: true,
    //   skipEmptyLines: true,
    //   // Here this is also available. So we can call our custom class method
    //   complete: (results) => console.log('done', results)//this.updateData
    // });
  }

  render() {
    return (<div>render this</div>);
  }
}

ReactDOM.render(
  <App />, document.getElementById('app')
);