import React from 'react';

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
			return { line: lines[i], player: squares[a]};
		}
	}
	return null;
}

function Square(props){
	let classList = "square";
		classList += props.winningSquare ? " winning-square" : "";
	return (
		<button 
			className={classList}
			onClick={props.onClick}
		>
			{props.value}
		</button>
	);
}

class Board extends React.Component {
	renderSquare(i){
		const winner = determineWinner(this.props.squares);
		let winningSquare;
		if ( winner && winner.line.indexOf(i) !== -1 ){
			winningSquare = true;
		}
		return (
			<Square
				key={'square-' + i}
				winningSquare={winningSquare}
				value={this.props.squares[i]} 
				onClick={()=>this.props.onClick(i)}
			/>
		);
	}
	renderRow(start){
		let result = [];
		for (var i = 0; i < 3; i++) {
			result.push( this.renderSquare(start + i) )
		}
		return result;
	}
	renderBoard(){
		let result = [];
		for (var i = 0; i < 3; i++) {
			result.push(
				<div key={'row-' + i} className="board-row">
					{this.renderRow(i*3)}
				</div>
			);
		}
		return result;
	}

	render(){

		return this.renderBoard();
	}
}

export default class Game extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			stepNumber : 0,
			turn : "X",
			sort : "ASC"
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

	changeSort(){
		this.setState({
			sort : this.state.sort === "ASC" ? "DESC" : "ASC"
		});
	}

	jumpTo(step, clear){
		console.log(step);
		const history = clear ? this.state.history.slice(0, step+1) : this.state.history.slice() ;
		this.setState({
			stepNumber: step,
			turn: (step % 2) === 0 ? "X" : "O",
			history: history
		});
	}

	renderResetButton(){
		return (<button onClick={()=>this.jumpTo(0, true)}>Reset?</button>);
	}

	getMoves(history){
		let lastState;
		const currentMove = this.state.stepNumber;
		const moves = history.map((step,move)=>{
			let lastInfo;
			if (move){
				for (let k = 0; k < lastState.length; k++) {
					lastState[k];
					if (lastState[k] !== step.squares[k]){
						let row = Math.floor(k / 3) + 1;
						let col = k % 3 + 1;
						lastInfo = {
						 	row: row,
						 	col: col,
							player: ((move - 1) % 2) === 0 ? "X" : "O"
						};
					}
				}
			}

			lastState = step.squares;

			let desc = move ? <span>Go to move # {move} &#8212; <code>{lastInfo.player}</code> to row <code>{lastInfo.row}</code>, column <code>{lastInfo.col}</code></span> : <span>Game started</span>;

			if (currentMove === move){
				desc = <strong>{desc}</strong>;
			}
			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>{desc}</button>
				</li>
			);
		});
		return moves;
	}

	render() {
		const history = this.state.history;
		const currentMove = this.state.stepNumber;
		const current = history[currentMove];
		const winner = determineWinner(current.squares);
		const sort = this.state.sort;
		const moves = this.getMoves(history);

		if (sort === "DESC" ){
			moves.reverse();
		}

		let status;
		if ( winner ){
			status = <span>Winner! {winner.player}<br />
			{this.renderResetButton()}</span>;
		} else if (history.length === 10) {
			status = (
				<span>Draw!<br />
				{this.renderResetButton()}</span>
			);
		} else {
			status = <span>Next Player: {this.state.turn}</span>
		}

		const sortBtn = <button onClick={()=>this.changeSort()}>{sort}</button>
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
					<div>{sortBtn}</div>
					<ol>{moves}</ol>
				</div>
			</div>
		);
	}
}