import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import Map from'../js/Map.js';
import Hints from '../js/Hints.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.board = new Array(60).fill(0);
		this.state = {
			turn: "spy",
			board: this.board
		}
		
		this.confirm_move = this.confirm_move.bind(this);
		this.get_game_info = this.get_game_info.bind(this);
		this.start_game = this.start_game.bind(this);
	}

	get_game_info() {
		return <p> who turn it is: {this.state.turn} </p>
	}

	printBoard() {
		let board = [];
		for (let i = 0; i < 60; i++) {
			board.push(this.state.board[i]);
		}
		return <p> {board.toString()} </p>;
	}

	confirm_move() {
		if (this.state.turn === "spy") {
			this.setState({turn: 'cops'});
		} else {
			this.setState({turn: 'spy'});
		}
	}

	start_game() {
		let spy = Math.floor(Math.random() * 60);
		console.log("spy index: " + spy);
		let cop1 = Math.floor(Math.random() * 60);
		if (cop1 == spy) {
			cop1 += Math.floor(Math.random() * 59);
			cop1 = cop1 % 60;
		}
		console.log("cop1 index: " + cop1);
		let new_board = new Array(60).fill(0);
		new_board[spy] = 1;
		new_board[cop1] = 2;
		this.setState({board: new_board})
	}

  render() {
    return (
      <div className="App">
  			<div> {this.get_game_info()} </div>
				<div onClick={this.confirm_move} >
					<p> Click me to change turn </p>
				</div>
				<p onClick={this.start_game}>
					start
				</p>
  			<div>
  				{this.printBoard()}
  			</div>
				<Map board={this.state.board}/>
				<Hints />
      </div>
    );
  }
}

export default App;	
