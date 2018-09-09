import rootReducer from '../../reducers';
import initialState from '../../reducers/initialState';

describe('root reducer', () => {
  it('should return initial state', () => {
    expect(rootReducer(undefined, {}))
      .toEqual(initialState);
  });
});
