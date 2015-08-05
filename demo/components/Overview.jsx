import Pseudo from './Pseudo.jsx';
import Media from '../../examples/Media.jsx';
import Condition from '../../examples/Condition.jsx';
import DemoContainer from './DemoContainer.jsx';
import Look from '../../src/index';
import React from 'react';

class Overview extends React.Component {
  constructor() {
    super(...arguments);
  }
	
	look(){
		return {
			header : {
				marginTop: 20,
				marginBottom: 30,
				fontSize: 40,
				fontWeight: 600,
				textAlign: 'center',
				color: 'rgb(82, 67, 203)'
			}
		}
	}
	
  render() {
    return (
      <div>
				<h1 look="header">Look Examples</h1>
        <DemoContainer group title="1. Pseudo Classes">
          <Pseudo/>
        </DemoContainer>
        <DemoContainer group title="2. Conditions">
          <DemoContainer description="Styles depend on this.state" title="2.1. stateful styles">
            <Condition/>
          </DemoContainer>
        </DemoContainer>
        <DemoContainer group title="3. Media queries">
          <DemoContainer padding="0">
            <Media/>
          </DemoContainer>
        </DemoContainer>
      </div>
    )
  }
}

export default Look(Overview);