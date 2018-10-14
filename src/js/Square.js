import React, { Component } from 'react';
import '../css/Square.css';

class Square extends Component {

	constructor(props) {
		super(props);
		this.show_valid_moves = this.show_valid_moves.bind(this);
		this.handle_selection = this.handle_selection.bind(this);
		this.hide_valid_moves = this.hide_valid_moves.bind(this);
		this.state = {
			selected: false,
			valid_moves: [],
			prev_board: []
		}
	}

/*
	Display & Rendering
*/

	// Changes color to show position
	get_square_class() {
		if (this.props.value == 1) {
			return "SpySquare";
		} else if (this.props.value == 2) {
			return "CopSquare";
		} else if (this.props.value < 0) {
			return "SelectedSquare";
		}
		return "Square";
	}

	render() {
		let square_class = this.get_square_class();
		return (
			<div className={square_class} onClick={this.handle_selection}>
				<p> {this.props.index}</p>
				<p> {this.props.value} </p>
			</div>
		);
	}


/* 

	Game & Control Flow

*/

	// Prevent move if not your turn
	check_turn() {
		if (this.props.turn === "spy" && this.props.value === 1) {
			return true;
		}
		if (this.props.turn === "cop" && this.props.value === 2) {
			return true;
		}
		return false;
	}

	// Handles the square being selected.
	// If not yet selected, shows valid moves if turn.
	// If selected, deselects valid moves.
	handle_selection() {
		if (!this.state.selected) {
			console.log("showing valid moves");
			this.show_valid_moves();
		} else {
			console.log("hiding valid moves");
			this.hide_valid_moves();
		}
	}

	// Returns array of moves within 1 square.
	show_valid_moves() {

		// Prevent move if not your turn
		if (!this.check_turn()) return

		let valid_moves = [];
		let ROW_LENGTH = 10;

		// not on the left column
		if (this.props.index % ROW_LENGTH != 0) {
			valid_moves.push(this.props.index-1);
		}

		// not on the right column

		if (this.props.index % ROW_LENGTH != 9) {
			valid_moves.push(this.props.index+1);
		}
		// not on the top row
		if (Math.floor(this.props.index / ROW_LENGTH) != 0) {
			valid_moves.push(this.props.index-ROW_LENGTH);
		}

		// not on the bottom row
		if (Math.floor(this.props.index / ROW_LENGTH) != 5) {
			valid_moves.push(this.props.index+ROW_LENGTH);
		}
		console.log(valid_moves.toString());

		// Colors selected squares by changing their value to -1.
		// TODO Keep previous board information.
		let prev_board = []
		for (let i = 0; i < valid_moves.length; i++) {
			prev_board.push(this.props.getBoardInfo(valid_moves[i]));
			this.props.updateBoard(valid_moves[i], -1);
		}
		this.setState({prev_board: prev_board, valid_moves: valid_moves, selected: true});
	}

	// Hides valid moves
	hide_valid_moves() {
		console.log("valid moves: ", this.state.valid_moves.toString());
		console.log("prev board: ", this.state.prev_board.toString());
		for (let i = 0; i < this.state.valid_moves.length; i++) {
			console.log("Updating " + this.state.valid_moves[i] + " to value " + this.state.prev_board[i]);
			this.props.updateBoard(this.state.valid_moves[i], this.state.prev_board[i]);
		}
		this.setState({prev_board: [], valid_moves: [], selected: false});
	}
}

export default Square;
