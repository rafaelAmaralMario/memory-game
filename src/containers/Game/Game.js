import React from "react";
import { Board, Card, VictoryDialog } from '../../components';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux';
import { selectCard, closeDialog, startGame } from '../../store/actions';

const Game = ({ cards, handleCardClick, isVictoryDialogOpen, onGameRestart, onDialogClose, isGameEnd, attempts }) => (
  <>
    <Typography variant="h5" component="h2" fullWidth align="center">Your Attempts {attempts}</Typography>
    <Board>
      {
        cards.map(card => (
          <Card
            key={card.key}
            name={card.name}
            isActive={card.isActive}
            onClick={() => { handleCardClick(card.key) }}

          />
        ))
      }
    </Board>
    {isGameEnd && (
      <Button variant="outlined" color="primary" size="large" fullWidth onClick={onGameRestart}>Restart</Button>
    )}

    <VictoryDialog isOpen={isVictoryDialogOpen} onClose={onDialogClose} onGameRestart={onGameRestart} attempts={attempts} />
  </>
)

const mapStateToProps = (state) => ({
  cards: state.cards,
  isVictoryDialogOpen: state.isVictoryDialogOpen,
  isGameEnd: state.isGameEnd,
  attempts: state.attempts
});

const mapDispatchToProps = {
  handleCardClick: selectCard,
  onDialogClose: closeDialog,
  onGameRestart: startGame

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
