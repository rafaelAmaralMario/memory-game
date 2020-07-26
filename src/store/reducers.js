import { CLOSE_CARDS, LOCK_CARDS, OPEN_CARD, SET_MATCH, CLOSE_VICTORY_DIALOG, START_GAME } from './actions'
import ListBuilder from '../builders/ListBuilder';

const initialState = {
  isLocked: false,
  cards: new ListBuilder().createList(5).shuffle().build(),
  isVictoryDialogOpen: false,
  isGameEnd: false,
  attempts: 0
}

const gameReducer = (state = initialState, action) => {

  switch (action.type) {

    case START_GAME: {
      const cards = new ListBuilder().createList(5).shuffle().build();

      return { ...state, isVictoryDialogOpen: false, isGameEnd: false, cards, attempts: 0 };
    }

    case CLOSE_VICTORY_DIALOG: {
      return { ...state, isVictoryDialogOpen: false };
    }

    case OPEN_CARD: {
      const cards = state.cards.slice();
      cards[action.index].isActive = true;

      return { ...state, cards };
    }
    case SET_MATCH: {
      const cards = state.cards.slice();
      let isVictoryDialogOpen = false;

      let attempts = state.attempts;
      let newAttempt = attempts;

      cards[action.index1].hasMatch = true;
      cards[action.index2].hasMatch = true;
      if (cards.every(card => card.hasMatch)) {
        isVictoryDialogOpen = true;
      } else {
        newAttempt++;
      }

      return { ...state, cards, isLocked: false, isVictoryDialogOpen, isGameEnd: isVictoryDialogOpen, attempts: newAttempt };
    }
    case CLOSE_CARDS: {
      const cards = state.cards.slice();
      cards[action.index1].isActive = false;
      cards[action.index2].isActive = false;
      let attempts = state.attempts;
      let newAttempt = attempts + 1;

      return { ...state, cards, isLocked: false, attempts: newAttempt };
    }
    case LOCK_CARDS: {
      return { ...state, isLocked: true };
    }

    default:
      return state;
  }
}

export default gameReducer;
