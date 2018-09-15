import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares : Array(9).fill(null),
			turn : "X"
		};
	}
	handleOnClick(i){
		const squares = this.state.squares.slice();
		squares[i] = this.state.turn;
		this.setState({
			squares : squares,
			turn: this.state.turn == "X" ? "O" : "X"
		});
	}
	renderSquare(i){
		return (
			<Square
				value={this.state.squares[i]} 
				onClick={()=>this.handleOnClick(i)}
			/>
		);
	}
	render(){
		const status = "Next player: " + this.state.turn;

		return (
			<div>
				<div className="status">{status}</div>	
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

class Square extends React.Component {
	render(){
		return (
			<button 
				className="square" 
				onClick={()=>this.props.onClick()}
			>
				{this.props.value}
			</button>
		);
	}
}


class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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
