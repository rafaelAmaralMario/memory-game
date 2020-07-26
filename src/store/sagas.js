import { takeEvery, select, put, delay } from 'redux-saga/effects';

import { CLOSE_CARDS, LOCK_CARDS, OPEN_CARD, SELECT_CARD, SET_MATCH } from './actions'



function* selectCard(action) {
  const { key } = action;
  const cards = yield select(state => state.cards);
  const isLocked = yield select(state => state.isLocked);
  const index = cards.findIndex(c => c.key === key);
  const selectedCardIndex = cards.findIndex(c => c.isActive && !c.hasMatch);

  if (!isLocked && index > -1 && !cards[index].isActive) {
    yield put({ type: OPEN_CARD, index });
    if (selectedCardIndex > -1) {
      if (cards[selectedCardIndex].id === cards[index].id) {
        yield put({ type: SET_MATCH, index1: index, index2: selectedCardIndex });
      } else {
        yield put({ type: LOCK_CARDS })
        yield delay(750);
        yield put({ type: CLOSE_CARDS, index1: index, index2: selectedCardIndex });
      }
    }
  }
}

function* gameSaga() {
  yield takeEvery(SELECT_CARD, selectCard)
}

export default gameSaga;
