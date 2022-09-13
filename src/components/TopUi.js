const EvaluationMessage = ({ evaluationMessage }) => {
    return evaluationMessage ? <p className='eval'>{evaluationMessage}</p> : null;
}

const GameLinks = ({ lastGameAnalysisLink, lastGameLink }) => {
    console.log(lastGameAnalysisLink);
    return (
        <p className='lastGameLinks'>
            {lastGameAnalysisLink ? <><a href={lastGameAnalysisLink} target='_blank' rel='noreferrer'>Analysis link</a><span> | </span></> : null}
            {lastGameLink ? <a href={lastGameLink} target='_blank' rel='noreferrer'>Game link</a> : null}
        </p>
    );
}

const BestMove = ({ bestMoveNumber }) => {
    return (
        bestMoveNumber !== null ? (
            <p className='bestMoveNumber'>Your move ranked: {bestMoveNumber}</p>
        ) : null
    )
}

const TopUi = ({ showUi=false, playerToMove, evaluationMessage, bestMoveNumber, lastGameAnalysisLink, lastGameLink }) => {
    return (
    <>
        {playerToMove ? <p className='playingAs'>Just find a move for {playerToMove}</p> : null}
        {
            showUi && (
            <>
                <EvaluationMessage evaluationMessage={evaluationMessage} 
                />
                <GameLinks
                    lastGameAnalysisLink={lastGameAnalysisLink}
                    lastGameLink={lastGameLink}
                />
                <BestMove
                    bestMoveNumber={bestMoveNumber}
                />
            </>
            )
        }
    </>
    );
};

export default TopUi;