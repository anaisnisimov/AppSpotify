export const initialState = {items: []};

 export const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...initialState,
        items: action.payload.data.tracks.items
      };
    default:
      throw new Error();
  }
}