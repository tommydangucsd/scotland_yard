import React, { Component } from 'react';
import '../css/Square.css';

class Square extends Component {

	constructor(props) {
		super(props);
		this.select = this.select.bind(this);
	}

	render() {
		return (
			<div className="Square" onClick={this.select}>
				<p> map square </p>
			</div>
		);
	}

	select() {
		console.log('Square clicked')
	}
}

export default Square;
