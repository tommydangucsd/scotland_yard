import React, { Component } from 'react';
import Square from './Square.js'
import '../css/Map.css'

class Map extends Component {
	constructor(props) {
		super(props);
	}

	draw_squares() {
		let squares = []
		for (let i = 0; i < 60; i++) {
			squares.push(<Square index={i} value={this.props.board[i]} />);
		}
		return squares;
	}

	render() {
		return (
		<div className="Map">
			<header className="map-header">
				<h3> This is the map lol </h3>
			</header>
			<div>
			{this.draw_squares()}
			</div>
		</div>
		);
	}
}

export default Map;
