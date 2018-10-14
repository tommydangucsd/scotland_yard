import React, { Component } from 'react';
import '../css/Square.css';

class Square extends Component {

	constructor(props) {
		super(props);
		//this.show_valid_moves = this.show_valid_moves.bind(this);
		this.handle_selection = this.handle_selection.bind(this);
		//this.hide_valid_moves = this.hide_valid_moves.bind(this);
		this.state = {
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

	Selection Flow

*/

	// Prevent move if not your turn
	check_turn() {
		return this.props.checkTurn(this.props.index)
	}

	// Handles the square being selected.
	// If not yet selected, shows valid moves if turn.
	// If selected, deselects valid moves.
	handle_selection() {
		// Valid move selected
		if (this.props.value < 0) {
			this.props.hideValidMoves();
			this.props.movePlayerTo(this.props.index);
		}
		// Current player is selected
		else if (this.props.getSelectedIndex() != this.props.index) {
			console.log("showing valid moves in square handle");
			this.show_valid_moves();
		} else {
			console.log("hiding valid moves");
			this.props.hideValidMoves();
		}
	}

	// Returns array of moves within 1 square.
	show_valid_moves() {
		if (!this.check_turn()) return;
		this.props.showValidMoves(this.props.index)
	}
}

export default Square;
