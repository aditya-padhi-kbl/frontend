import React from 'react';
import { Button } from 'antd';
const bla = require('./file.css');

const SAMPLEBUTTON: React.StatelessComponent = () => {
    return (
      <React.Fragment>
        <Button type="primary">Primary</Button>
        <button onClick={ () => {alert("Hello World")}} className={bla.bck}>Hello</button>
      </React.Fragment>
    )
}

export default SAMPLEBUTTON;