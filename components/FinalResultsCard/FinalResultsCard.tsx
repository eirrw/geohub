import { SparklesIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledFinalResultsCard } from '.'
import { selectGameNew } from '../../redux/gameNew'
import { GameType } from '../../types'
import { Banner } from '../Layout'
import { Icon, Button, ProgressBar, FlexGroup } from '../System'

type Props = {
  totalPoints: number
}

const FinalResultsCard: FC<Props> = ({ totalPoints }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const gameNew = useSelector(selectGameNew)


  const calculateProgress = () => {
    const progress = (totalPoints / 25000) * 100

    if (progress < 1) {
      return 1
    }

    return progress
  }

  const handlePlayAgain = () => {
    router.push(`/map/${gameNew.mapId}`)  
  }

  const handleDetailedResults = () => {
    router.push(`/results/${gameNew.id}`)
  }

  return (
    <StyledFinalResultsCard>
      <Banner>
        <div className="finalResultsWrapper">
          <div className="contentGrid">
            <div className="textWrapper">
              <span className="distanceMessage">Game Over, well done!</span>
              <div className="pointsWrapper">
                <span>{totalPoints} points total</span>
                <Icon size={24} fill="#8DB8FF">
                  <SparklesIcon />
                </Icon>
              </div>
            </div>
            <ProgressBar progress={calculateProgress()}/>
            <FlexGroup gap={20}>
              <Button type="ghostLight" callback={handleDetailedResults}>Detailed Results</Button>
              <Button type="solidPurple" callback={handlePlayAgain} width="180px">Play Again</Button>
            </FlexGroup>    
          </div>
        </div>     
      </Banner> 
    </StyledFinalResultsCard>
  )
}

export default FinalResultsCard
