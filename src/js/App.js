import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import Map from'../js/Map.js';
import Hints from '../js/Hints.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.board = new Array(60).fill(0);
		this.player_positions = new Array(2).fill(0);
		this.state = {
			turn: "spy",
			board: this.board,
			turn_number: 0,
			player_positions: this.player_positions
		}
		
		this.change_move = this.change_move.bind(this);
		this.get_game_info = this.get_game_info.bind(this);
		this.start_game = this.start_game.bind(this);
		this.update_board = this.update_board.bind(this);
		this.get_board_info = this.get_board_info.bind(this);
	}

	// Displays turn
	get_game_info() {
		return (
			<div>
				<header> Game info</header>
				<p> who turn it is: {this.state.turn} </p>
				<p> turn number: {this.state.turn_number} </p>
				<p> user pos: {this.state.player_positions.toString()} </p>
			</div>
		); 
	}

	// Prints board for development 
	printBoard() {
		return <p> {this.state.board.toString()} </p>;
	}


	// Updates move and increments turn counter
	change_move() {
		let next = "spy"
		if (this.state.turn === "spy") {
			next = "cop"
		}
		this.setState({turn: next, turn_number: this.state.turn_number+1})
	}

	start_game() {
		// Randomly assign spy, cop positions
		let spy = Math.floor(Math.random() * 60);
		console.log("spy index: " + spy);
		let cop1 = Math.floor(Math.random() * 60);
		if (cop1 == spy) {
			cop1 += Math.floor(Math.random() * 59);
			cop1 = cop1 % 60;
		}
		console.log("cop1 index: " + cop1);
		let new_board = new Array(60).fill(0);

		// Update state information
		new_board[spy] = 1;
		new_board[cop1] = 2;
		let positions = [spy, cop1]
		this.setState({board: new_board, player_positions: positions});
	}

	// Updates board. Passed down so clicking squares will update board.
	update_board(index, value) {
		let new_board = this.state.board;
		new_board[index] = value;
		this.setState({board: new_board});
	}

	// Gets board value.
	get_board_info(index) {
		console.log("on board info: ", this.state.board[index]);
		return this.state.board[index];
	}

  render() {
    return (
      <div className="App">
  			<div> {this.get_game_info()} </div>
				<div onClick={this.change_move} >
					<p> Click me to change turn </p>
				</div>
				<p onClick={this.start_game}>
					start
				</p>
  			<div>
  				{this.printBoard()}
  			</div>
				<Map board={this.state.board} turn={this.state.turn} updateBoard={this.update_board} getBoardInfo={this.get_board_info}/>
				<Hints />
      </div>
    );
  }
}

export default App;	
