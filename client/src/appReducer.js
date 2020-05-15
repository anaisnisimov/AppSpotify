export const initialState = {items: [], itemsArtists: []};

 export const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...initialState,
        items: action.payload.data.tracks.items
      };
      case 'FETCH_DATA_ARTIST':
      return {
        ...initialState,
        itemsArtists: action.payload.genreArtist

      };
    default:
      throw new Error();
  }
}