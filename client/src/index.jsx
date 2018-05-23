import React from 'react';
import ReactDOM from 'react-dom';
import Credit from './credit.jsx';
import Risk from './risk.jsx';
import Borrower from './borrower.jsx';
import * as d3 from 'd3';
import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
    
const csv = require('../dist/LoanStats3a_minimum.csv');

const App = () => (<div>
    <Grid>
      <Col md={4}>
        <Row>
          <h1>LendingClub Visualizations</h1>
        </Row>
        <Row>
          <Credit data={csv} />
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

ReactDOM.render(
  <App />, document.getElementById('app')
);