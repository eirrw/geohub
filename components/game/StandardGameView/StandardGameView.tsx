import { FC } from 'react'
import Game from '@backend/models/game'
import { Streetview } from '@components/game/Streetview'
import { StandardFinalResults, StandardResults } from '@components/resultCards'
import { ResultMap } from '@components/ResultMap'
import { StyledStandardGameView } from './'

type Props = {
  gameData: Game
  setGameData: (gameData: Game) => void
  view: 'Game' | 'Result' | 'FinalResults'
  setView: (view: 'Game' | 'Result' | 'FinalResults') => void
}

const StandardGameView: FC<Props> = ({ gameData, setGameData, view, setView }) => {
  return (
    <StyledStandardGameView>
      <div className="play-wrapper" style={{ display: view === 'Game' ? 'block' : 'none' }}>
        <Streetview gameData={gameData} setGameData={setGameData} view={view} setView={setView} />
      </div>
      {view === 'Result' && (
        <div
          className="results-wrapper"
          // style={{ display: view === 'Result' || view === 'FinalResults' ? 'block' : 'none' }}
        >
          <ResultMap
            guessedLocations={gameData.guesses}
            actualLocations={gameData.rounds}
            round={gameData.round}
            resetMap={false}
          />
          <div className="results-card-wrapper">
            <StandardResults
              round={gameData.round}
              distance={gameData.guesses[gameData.guesses.length - 1].distance}
              points={gameData.guesses[gameData.guesses.length - 1].points}
              noGuess={
                gameData.guesses[gameData.guesses.length - 1].timedOut &&
                !gameData.guesses[gameData.guesses.length - 1].timedOutWithGuess
              }
              setView={setView}
            />
          </div>
        </div>
      )}

      {view === 'FinalResults' && (
        <div
          className="results-wrapper"
          // style={{ display: view === 'Result' || view === 'FinalResults' ? 'block' : 'none' }}
        >
          <ResultMap
            guessedLocations={gameData.guesses}
            actualLocations={gameData.rounds}
            round={gameData.round}
            resetMap={false}
            isFinalResults
          />
          <div className="results-card-wrapper">
            <StandardFinalResults gameData={gameData} setView={setView} setGameData={setGameData} />
          </div>
        </div>
      )}
    </StyledStandardGameView>
  )
}

export default StandardGameView