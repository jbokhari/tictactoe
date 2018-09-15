/**
 * React tutorial
 * https://reactjs.org/tutorial/tutorial.html
 * @author Jameel Bokhari
 **/

import React from 'react';
import ReactDom from 'react-dom';
import Game from './game.js';
import './index.css';

ReactDom.render(
  <Game />,
  document.getElementById('root')
);
