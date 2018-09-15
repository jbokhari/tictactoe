/**
 * React tutorial
 * https://reactjs.org/tutorial/tutorial.html
 * @author Jameel Bokhari
 **/

import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

function determineWinner(squares){
	const lines = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
	];
	for (var i = lines.length - 1; i >= 0; i--) {
		const [a,b,c] = lines[i];
		if ( squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ){
			return squares[a];
		}
	}
	return null;
}

function Square(props){
	return (
		<button 
			className="square" 
			onClick={props.onClick}
		>
			{props.value}
		</button>
	);
}

class Board extends React.Component {
	renderSquare(i){
		return (
			<Square
				value={this.props.squares[i]} 
				onClick={()=>this.props.onClick(i)}
			/>
		);
	}

	render(){

		return (
			<div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}


class Game extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			stepNumber : 0,
			turn : "X"
		};
	}

	handleClick(i){
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		const turn = this.state.turn;

		if (determineWinner(squares) || squares[i] ){
			return;
		}

		squares[i] = turn;

		this.setState({
			history: history.concat([{
				squares: squares,
			}]),
			stepNumber: history.length,
			turn: (turn === "X" ? "O" : "X")
		})

	}

	jumpTo(step){
		this.setState({
			stepNumber: step,
			turn: (step % 2) === 0 ? "X" : "O"
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = determineWinner(current.squares);
		let lastState;
		const moves = history.map((step,move)=>{
			let lastInfo;
			if (move){
				for (let k = 0; k < lastState.length; k++) {
					lastState[k];
					if (lastState[k] !== step.squares[k]){
						let row = k % 3 + 1;
						let col = Math.ceil(k / 3)
						lastInfo = {
						 	row: row,
						 	col: col,
							player: ((move - 1) % 2) === 0 ? "X" : "O"
						};
					}
				}
			}
			lastState = step.squares;

			const desc = move ? <span>Go to move # {move} &#8212; <code>{lastInfo.player}</code> to row <code>{lastInfo.row}</code>, column <code>{lastInfo.col}</code></span> : <span>Got to game start</span>;

			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>{desc}</button>
				</li>
			);
		});

		let status;
		if ( winner ){
			status = "Winner! " + winner;
		} else {
			status = "Next Player: " + this.state.turn;
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={current.squares}
						onClick={(i) => this.handleClick(i)}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{moves}</ol>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDom.render(
  <Game />,
  document.getElementById('root')
);
