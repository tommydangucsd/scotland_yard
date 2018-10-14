import React, { Component } from 'react';
import Square from './Square.js'
import '../css/Map.css'

class Map extends Component {
	constructor(props) {
		super(props);
	}

	// Creates square components for large map grid
	draw_squares() {
		let squares = []
		for (let i = 0; i < 60; i++) {
			squares.push(<Square index={i} value={this.props.board[i]} 
				turn={this.props.turn} updateBoard={this.props.updateBoard}
				getBoardInfo={this.props.getBoardInfo} />);
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
