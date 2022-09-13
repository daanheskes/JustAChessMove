import './App.scss';

// Dependencies
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

// Components
import ChessPositions from './positions/chessPositions';
import TopUi from './components/TopUi';

// Functions
import { getResizedBoardSize } from './functions/getResizedBoardSize';

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

  const resizeBoard = useCallback(() => {
    setBoardSize(getResizedBoardSize);
  }, []);

  const getRandomPosition = () => {
    const positions = ChessPositions;
    const chosenIndex = Math.floor(Math.random() * positions.length);

    return positions[chosenIndex];
  }

  const checkUndoMove = useCallback(() => {
    if (movesMadeCount.current <= 0) return;
    
    game.current.undo();
    let currentPositionClone = structuredClone(currentPosition);
    currentPositionClone.fen = game.current.fen();
    setCurrentPosition(currentPositionClone);
    movesMadeCount.current--;
  }, [currentPosition]);

  useEffect(() => {
    // Initialise chess
    const randomPosition = getRandomPosition();
    const chess = new Chess(randomPosition.fen);
    const playerToMove = chess._turn === 'w' ? 'White' : 'Black';
    setPlayerToMove(playerToMove);
    setBoardOrientation(playerToMove.toLowerCase());
    setLoadedPosition(randomPosition);
    setCurrentPosition(randomPosition);
    game.current = chess;
    setBoardSize(getResizedBoardSize);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resizeBoard);

    return () => {
      window.removeEventListener('resize', resizeBoard);
    }
  }, [resizeBoard]);

  // const setNewPosition = (newPosition, clearUi = false) => {
  //   game.current = newPosition.fen;
  //   setLoadedPosition(newPosition);
  //   setCurrentPosition(newPosition);

  //   if (clearUi) showUi(false);
  // }

  const handleKeyDown = useCallback((e) => {
    if (e.repeat) return;

    if (e.key === 'ArrowLeft') {
      checkUndoMove();
    }
  }, [checkUndoMove]);
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown])

  function clearPosition() {
    setShowUi(false);
    movesMadeCount.current = 0;
  }

  const resetPosition = () => {
    clearPosition();
    setCurrentPosition(loadedPosition);
    game.current.load(loadedPosition.fen);
  }

  const newPosition = () => {
    const chosenPosition = getRandomPosition();

    clearPosition();
    
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
    setShowUi(true);
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
      setEvaluationMessage(evaluationText);
    } else {
      setEvaluationMessage('Game continues...');
    }

    const currentPositionClone = structuredClone(currentPosition);
    currentPositionClone.fen = game.current.fen();
    setCurrentPosition(currentPositionClone);
    
  }

  return (
    <div className='App'>
      { console.log("hi") }
      <TopUi
        showUi={showUi} 
        playerToMove={playerToMove} 
        evaluationMessage={evaluationMessage}
        bestMoveNumber={bestMoveNumber}
        lastGameAnalysisLink={lastGameAnalysisLink}
        lastGameLink={lastGameLink}
      />
      {
        <Chessboard
          position={currentPosition ? currentPosition.fen : 'start'}
          onPieceDrop={onDrop}
          customLightSquareStyle={{backgroundColor: '#95a5a6'}}
          customDarkSquareStyle={{backgroundColor: '#34495e'}}
          boardWidth={boardSize}
          areArrowsAllowed={true}
          boardOrientation={boardOrientation}
        />
      }
      <div>
        <button onClick={resetPosition}>Reset position</button> <button onClick={newPosition}>New position</button>
        <p className='opensource'>This project is open-source: <a href='https://github.com/daanheskes/JustAChessMove'>Github</a></p>
      </div>
    </div>
  );
}

export default App;
