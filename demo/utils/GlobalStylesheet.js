import {CSS} from '../../src/index';
import {Processors} from 'dynamic-style-sheets';

let sheet = new CSS({
	'*' : {
		padding: 0,
		margin: 0,
		fontFamily : '"Lato", sans-serif',
		fontWeight: 300,
		boxSizing : 'border-box',
		userSelect : 'none'
	}
});

sheet.process(Processors.Prefixer);
sheet.apply();