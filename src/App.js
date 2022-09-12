import './App.scss';
import React, { useState, useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import ChessPositions from './positions/chessPositions';

function App() {
  let game = useRef(null);
  let movesMadeCount = useRef(0);
  const [boardSize, setBoardSize] = useState(600);
  const [loadedPosition, setLoadedPosition] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [playerToMove, setPlayerToMove] = useState(null);
  const [boardOrientation, setBoardOrientation] = useState(null);
  const [evaluationMessage, setEvaluationMessage] = useState(null);
  const [bestMoveNumber, setBestMoveNumber] = useState(null);
  const [lastGameAnalysisLink, setLastGameAnalysisLink] = useState(null);
  const [lastGameLink, setLastGameLink] = useState(null);
  const [showUi, setShowUi] = useState(false);

  useEffect(() => {
    const randomPosition = getRandomPosition();
    const chess = new Chess(randomPosition.fen);
    const playerToMove = chess._turn === 'w' ? 'White' : 'Black';
    setPlayerToMove(playerToMove);
    setBoardOrientation(playerToMove.toLowerCase());
    setLoadedPosition(randomPosition);
    setCurrentPosition(randomPosition);
    game.current = chess;

    resizeBoard(); 
    window.addEventListener('resize', resizeBoard);

    return () => {
      window.removeEventListener('resize', resizeBoard);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPosition])

  const handleKeyDown = (e) => {
    if (e.repeat) return;

    if (e.key === 'ArrowLeft') {
      checkUndoMove();
    }
  }

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

  const clearUi = () => {
    setShowUi(false);
    movesMadeCount.current = 0;
  }

  const getRandomPosition = () => {
    const positions = ChessPositions;
    const chosenIndex = Math.floor(Math.random() * positions.length);

    ChessPositions.splice(chosenIndex, 1);
    return positions[chosenIndex];
  }

  const checkUndoMove = () => {
    if (movesMadeCount.current === 0) return;
    game.current.undo();
    const currentPositionClone = structuredClone(currentPosition);
    currentPositionClone.fen = game.current.fen();
    console.log("triggered");
    setCurrentPosition(currentPositionClone);
  }

  const resetPosition = () => {
    clearUi();
    setCurrentPosition(loadedPosition);
    game.current.load(loadedPosition.fen);
  }

  const newPosition = () => {
    const chosenPosition = getRandomPosition();

    clearUi();
    
    setLoadedPosition(chosenPosition);
    setCurrentPosition(chosenPosition);
    game.current.load(chosenPosition.fen);
    const playerToMove = game.current._turn === 'w' ? 'White' : 'Black';
    let analysisLink = 'https://lichess.org/analysis/standard/' + chosenPosition.fen.replace(/ /g,'_');
    setLastGameAnalysisLink(analysisLink);
    setLastGameLink(chosenPosition.game);
    setPlayerToMove(playerToMove);
    setBoardOrientation(playerToMove.toLowerCase());
  }

  const onDrop = (sourceSquare, targetSquare) => {
    let move = game.current.move({
      from: sourceSquare,
      to: targetSquare
    });

    // Don't allow illegal moves
    if (move === null) return;
    movesMadeCount.current++;
    let moveNotation = sourceSquare + targetSquare;

    if (movesMadeCount.current === 1) {
      const foundMove = currentPosition.moves.find(x => x.move === moveNotation);
      let evaluationText;

      if (foundMove) {
        const bestMoveNumber = currentPosition.moves.findIndex(x => x.move === moveNotation) + 1;
        evaluationText = (bestMoveNumber === 1 ? 'Best move!' : 'Good move!') + ' Evaluation: ' + foundMove.eval;
        const bestMoveEval = currentPosition.moves[0].eval;
        const worstMoveEval = currentPosition.moves[(currentPosition.moves.length - 1)].eval;

        evaluationText += ` | Best move: ${bestMoveEval} | Worst good move: ${worstMoveEval}`;
        setBestMoveNumber(bestMoveNumber);
      } else {
        evaluationText = 'Not a good move.';
      }
      console.log(evaluationText);
      setEvaluationMessage(evaluationText);
      setShowUi(true);
    }

    const currentPositionClone = structuredClone(currentPosition);
    currentPositionClone.fen = game.current.fen();
    setCurrentPosition(currentPositionClone);
    setShowUi(false);
  }

  return (
    currentPosition !== null ? 
    (<div className='App'>
      <div className='information'>
      <p className='playingAs'>Just find a move for {playerToMove}</p>
      { showUi && evaluationMessage ? <p className='eval'>{evaluationMessage}</p> : null }
      { showUi && bestMoveNumber ? <p className='bestMoveNumber'>Your move ranked: {bestMoveNumber}</p> : null }
      { showUi && lastGameAnalysisLink ? (
        <p className='lastGameAnalysisLink'>
          <a href={lastGameAnalysisLink} target='_blank' rel='noreferrer'>Analysis link</a>
          <span> | </span>
          <a href={lastGameLink} target='_blank' rel='noreferrer'>Game link</a>
        </p>
        ) : null
      }
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
      <button onClick={resetPosition}>Reset position</button> <button onClick={newPosition}>New position</button>
      <br />
      <p className='opensource'>This project is open-source: <a href='https://github.com/daanheskes/JustAChessMove'>Github</a></p>
      </div>
    </div>
    )
    : null
  );
}

export default App;
