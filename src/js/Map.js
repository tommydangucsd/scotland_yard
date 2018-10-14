import React, { Component } from 'react';
import Square from './Square.js'
import '../css/Map.css'

class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: -1,
			valid_moves: [],
			prev_board: []
		}
		this.move_player_to = this.move_player_to.bind(this)
		this.check_turn = this.check_turn.bind(this)
		this.show_valid_moves = this.show_valid_moves.bind(this)
		this.get_selected_index = this.get_selected_index.bind(this)
		this.hide_valid_moves = this.hide_valid_moves.bind(this)
	}

	// Creates square components for large map grid
	draw_squares() {
		let squares = []
		for (let i = 0; i < 60; i++) {
			squares.push(<Square index={i} 
				value={this.props.board[i]} 
				turn={this.props.turn} 
				updateBoard={this.props.updateBoard}
				getBoardInfo={this.props.getBoardInfo}
				movePlayerTo={this.move_player_to} 
				showValidMoves={this.show_valid_moves} 
				hideValidMoves={this.hide_valid_moves}
				checkTurn={this.check_turn}
				getSelectedIndex={this.get_selected_index}
				/>);
		}
		return squares;
	}

	// Prevent move if not your turn
	check_turn(index) {
		if (this.props.turn === "spy" && this.props.getBoardInfo(index) == 1) {
			return true;
		}
		if (this.props.turn === "cop" && this.props.getBoardInfo(index) == 2) {
			return true;
		}
		return false;
	}

	// Moves player to designated square
	move_player_to(index) {
		this.props.updatePlayerPosition(index);
		console.log("Calling updateBoard with index: ", index, " and value: ", this.props.getBoardInfo(this.state.selected))
		this.props.updateBoard(index, this.props.getBoardInfo(this.state.selected));
		this.props.updateBoard(this.state.selected, 0);
	}

	show_valid_moves(index) {

		let valid_moves = [];
		let ROW_LENGTH = 10;

		// not on the left column
		if (index % ROW_LENGTH != 0) {
			valid_moves.push(index-1);
		}

		// not on the right column

		if (index % ROW_LENGTH != 9) {
			valid_moves.push(index+1);
		}
		// not on the top row
		if (Math.floor(index / ROW_LENGTH) != 0) {
			valid_moves.push(index-ROW_LENGTH);
		}

		// not on the bottom row
		if (Math.floor(index / ROW_LENGTH) != 5) {
			valid_moves.push(index+ROW_LENGTH);
		}
		// Colors selected squares by changing their value to -1.
		// TODO Keep previous board information.
		let prev_board = []
		for (let i = 0; i < valid_moves.length; i++) {
			prev_board.push(this.props.getBoardInfo(valid_moves[i]));
			this.props.updateBoard(valid_moves[i], -1);
		}
		this.setState({prev_board: prev_board, valid_moves: valid_moves, selected: index});
	}

	// Hides valid moves
	hide_valid_moves() {
		console.log("hiding valid moves");
		for (let i = 0; i < this.state.valid_moves.length; i++) {
			this.props.updateBoard(this.state.valid_moves[i], this.state.prev_board[i]);
		}
		this.setState({prev_board: [], valid_moves: [], selected: -1});
	}

	get_selected_index() {
		return this.state.selected;
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
