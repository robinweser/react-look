import React from 'react';
import Overview from './Overview.jsx';
import {Global} from '../src/index';

let sheet = new Global({
	'*' : {
		padding: 0,
		margin: 0,
		fontFamily : '"Lato", sans-serif',
		fontWeight: 300,
		boxSizing : 'border-box'
	}
})

sheet.apply();

React.render(<Overview />, document.body);