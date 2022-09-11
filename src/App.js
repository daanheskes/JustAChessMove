import './App.scss';
import React, { useState, useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import ChessPositions from './positions/chessPositions';

function App() {

  let game = useRef(null);
  const [boardSize, setBoardSize] = useState(600);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [playerToMove, setPlayerToMove] = useState(null);
  const [boardOrientation, setBoardOrientation] = useState(null);
  const [evaluationMessage, setEvaluationMessage] = useState(null);
  const [bestMoveNumber, setBestMoveNumber] = useState(null);
  const [lastGameAnalysisLink, setLastGameAnalysisLink] = useState(null);
  const [lastGameLink, setLastGameLink] = useState(null);
  
  useEffect(() => {
    const randomPosition = getRandomPosition();
    const chess = new Chess(randomPosition.fen);
    const playerToMove = chess._turn === "w" ? "White" : "Black";
    setPlayerToMove(playerToMove);
    setBoardOrientation(playerToMove.toLowerCase());
    setCurrentPosition(randomPosition);
    game.current = chess;

    resizeBoard(); 

    window.addEventListener("resize", resizeBoard);
  }, []);

  const resizeBoard = () => {
    const [vw, vh] = getViewportSizes();
    const UiHeight = 279;
    let newBoardSize;

    if (vw > vh) {
      newBoardSize = vh - UiHeight;
    } else {
      if (vh - vw <= UiHeight) {
        newBoardSize = vh - UiHeight;
      } else {
        newBoardSize = vw - 52;
      }
    }

    setBoardSize(newBoardSize);
  }

  const getViewportSizes = () => {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    return [vw, vh];
  }

  const getRandomPosition = () => {
    const positions = ChessPositions;

    return positions[Math.floor(Math.random() * positions.length)];
  }

  const retryPosition = () => {
    game.current.undo();

    const currentPositionClone = structuredClone(currentPosition);
    currentPositionClone.fen = game.current.fen();
    setCurrentPosition(currentPositionClone);
    setEvaluationMessage(null);
    setBestMoveNumber(null);
  }

  const newPosition = () => {
    const randomPosition = getRandomPosition();
    setCurrentPosition(randomPosition);
    game.current.load(randomPosition.fen);
    const playerToMove = game.current._turn === "w" ? "White" : "Black";
    setPlayerToMove(playerToMove);
    setBoardOrientation(playerToMove.toLowerCase());
    setLastGameAnalysisLink(null);
    setEvaluationMessage(null);
    setBestMoveNumber(null);
  }

  const onDrop = (sourceSquare, targetSquare, piece) => {
    let move = game.current.move({
      from: sourceSquare,
      to: targetSquare
    });

    // Don't allow illegal moves
    if (move === null) return;
    let moveNotation;
    piece = piece.slice(1);
    if (piece === "P" || piece === "N" || piece === "R") {
      moveNotation = piece + sourceSquare + targetSquare;
    } else {
      moveNotation = piece + targetSquare;
    }

    const foundMove = currentPosition.moves.find(x => x.move === moveNotation);
    let evaluationText;

    if (foundMove) {
      const bestMoveNumber = currentPosition.moves.findIndex(x => x.move === moveNotation) + 1;
      evaluationText = (bestMoveNumber === 1 ? "Best move!" : "Good move!") + " Evaluation: " + foundMove.eval;
      const bestMoveEval = currentPosition.moves[0].eval;
      const worstMoveEval = currentPosition.moves[(currentPosition.moves.length - 1)].eval;

      evaluationText += ` | Best move: ${bestMoveEval} | Worst good move: ${worstMoveEval}`;
      setBestMoveNumber(bestMoveNumber);
    } else {
      evaluationText = "Not a good move.";
    }

    setEvaluationMessage(evaluationText); 

    const currentPositionClone = structuredClone(currentPosition);
    currentPositionClone.fen = game.current.fen();
    setCurrentPosition(currentPositionClone);

    let analysisLink = "https://lichess.org/analysis/standard/";
    analysisLink += currentPosition.fen.replace(/ /g,"_");

    setLastGameAnalysisLink(analysisLink);
    setLastGameLink(currentPosition.game);
  }

  return (
    currentPosition !== null ? 
    (<div className="App">
      <div className="information">
      <p className="playingAs">Just find a move for {playerToMove}</p>
      { evaluationMessage ? <p className="eval">{evaluationMessage}</p> : null }
      { bestMoveNumber ? <p className="bestMoveNumber">Your move ranked: {bestMoveNumber}</p> : null }
      { lastGameAnalysisLink ? <p className="lastGameAnalysisLink"><a href={lastGameAnalysisLink} target="_blank">Analysis link</a> | <a href={lastGameLink} target="_blank">Game link</a></p> : null }
      </div>
      <Chessboard
        position={currentPosition.fen}
        onPieceDrop={onDrop}
        customLightSquareStyle={{backgroundColor: '#95a5a6'}}
        customDarkSquareStyle={{backgroundColor: '#34495e'}}
        boardWidth={boardSize}
        areArrowsAllowed={true}
        boardOrientation={boardOrientation}
      />
      <div>
      <br />
      <button onClick={retryPosition}>Retry position</button> <button onClick={newPosition}>New position</button>
      <br />
      <p className="opensource">This project is open-source: <a href="https://github.com/daanheskes/JustAChessMove">Github</a></p>
      </div>
    </div>
    )
    : null
  );
}

export default App;
