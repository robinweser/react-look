import Extend from '../../lib/mixins/extend' 
import {expect} from 'chai' 

let extend = Extend[0].fn 

describe('Extending styles', () => {

	it('should not do anything if no styles are passed', () => {
		let extended = extend('extend', {}) 
		expect(extended).to.eql({}) 
	}) 


	it('should return whole obj if no condition and no styles are passed', () => {
		let extended = extend('extend', {
			color: 'blue',
			fontSize: 15
		}) 
		expect(extended).to.eql({
			color: 'blue',
			fontSize: 15
		}) 
	}) 


	it('should return styles if no condition is passed', () => {
		let extended = extend('extend', {
			styles: {
				color: 'blue',
				fontSize: 15
			}
		}) 
		expect(extended).to.eql({
			color: 'blue',
			fontSize: 15
		}) 
	}) 


	it('should not styles if no condition is not fulfilled', () => {
		let extended = extend('extend', {
			styles: {
				color: 'blue',
				fontSize: 15
			},
			condition: (true == false)
		}) 
		expect(extended).to.equal(false) 
	}) 


	it('should not styles if no condition is not fulfilled', () => {
		let extended = extend('extend', {
			styles: {
				color: 'blue',
				fontSize: 15
			},
			condition: (true == true)
		}) 
		expect(extended).to.eql({
			color: 'blue',
			fontSize: 15
		}) 
	}) 


	it('should merge styles if an array is passed', () => {
		let extended = extend('extend', {
			styles: [{
				color: 'blue',
				fontSize: 15
			}, {
				lineHeight: 10
			}]
		}) 
		expect(extended).to.eql({
			color: 'blue',
			fontSize: 15,
			lineHeight: 10
		}) 
	}) 


	it('should overwrite existing values while merging styles', () => {
		let extended = extend('extend', {
			styles: [{
				color: 'blue',
				fontSize: 15
			}, {
				fontSize: 10
			}]
		}) 
		expect(extended).to.eql({
			color: 'blue',
			fontSize: 10
		}) 
	}) 
}) 