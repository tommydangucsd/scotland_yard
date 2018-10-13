import React, { Component } from 'react';
import '../css/Square.css';

class Square extends Component {

	constructor(props) {
		super(props);
		this.select = this.select.bind(this);
	}

	get_square_class() {
		if (this.props.value == 1) {
			return "SpySquare";
		} else if (this.props.value == 2) {
			return "CopSquare";
		}
		return "Square";
	}

	render() {
		let square_class = this.get_square_class();
		return (
			<div className={square_class} onClick={this.select}>
				<p> {this.props.index}</p>
				<p> {this.props.value} </p>
			</div>
		);
	}

	select() {
		console.log('Square clicked')
	}
}

export default Square;
