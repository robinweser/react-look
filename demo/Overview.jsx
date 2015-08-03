import Pseudo from '../examples/Pseudo.jsx';
import React from 'react';

export default class Overview extends React.Component {
	constructor(){
		super(...arguments);
	}
	
	render(){
		return (
			<div>
				<Pseudo />
			</div>
		)
	}
}