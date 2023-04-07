export const bookReducer = (state, action) => {
    switch (action.type) {
      case 'BOOK_FETCH':
          return Object.assign({}, action.payload);
      case 'NOTE_ADD':
          return ({
              ...state,
              notes: [...state?.notes,
                  {
                      ...action.payload,
                      author: {
                          email: action.userEmail
                      }
                      }
                  ],
          });
      default:
          return state;
    }
  };