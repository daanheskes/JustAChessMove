import './App.scss';
import React, { useState, useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import ChessPositions from './positions/chessPositions';

function App() {

  let game = useRef(null);
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
  }, []);

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
    if (piece === "P" || piece === "N") {
      moveNotation = piece + sourceSquare + targetSquare;
    } else {
      moveNotation = piece + targetSquare;
    }

    const foundMove = currentPosition.moves.find(x => x.move === moveNotation);
    let evaluationText;

    if (foundMove) {
      const bestMoveNumber = currentPosition.moves.findIndex(x => x.move === moveNotation) + 1;
      evaluationText = (bestMoveNumber === 1 ? "Best move!" : "Good move! ") + " Evaluation: " + foundMove.eval;
      const bestMoveEval = currentPosition.moves[0].eval;
      const worstMoveEval = currentPosition.moves[(currentPosition.moves.length - 1)].eval;

      evaluationText += ` | Best move: ${bestMoveEval} | Worst move: ${worstMoveEval}`;
      setBestMoveNumber(bestMoveNumber);
    } else {
      evaluationText = "This is not a top 5 move.";
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
      <p className="playingAs">Just find a top 5 move for {playerToMove}</p>
      { evaluationMessage ? <p className="eval">{evaluationMessage}</p> : null }
      { bestMoveNumber ? <p className="bestMoveNumber">Your move ranked: {bestMoveNumber}</p> : null }
      { lastGameAnalysisLink ? <p className="lastGameAnalysisLink"><a href={lastGameAnalysisLink} target="_blank">Analysis link</a> | <a href={lastGameLink} target="_blank">Game link</a></p> : null }
      </div>
      <Chessboard
        position={currentPosition.fen}
        onPieceDrop={onDrop}
        customLightSquareStyle={{backgroundColor: '#95a5a6'}}
        customDarkSquareStyle={{backgroundColor: '#34495e'}}
        boardWidth={600}
        areArrowsAllowed={true}
        boardOrientation={boardOrientation}
      />
      <div>
      <br />
      <button onClick={retryPosition}>Retry position</button> <button onClick={newPosition}>New position</button>
      </div>
    </div>
    )
    : null
  );
}

export default App;
