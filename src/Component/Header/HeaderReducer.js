const SET_MENU_ACTIVE = "adaptiveHeaderWithReact/SET_MENU_ACTIVE",
  SET_MOBILE_TITLE = "adaptiveHeaderWithReact/SET_MOBILE_TITLE";

const headerReducer = (state, action) => {
  switch (action.type) {
    case SET_MENU_ACTIVE: {
      switch (action.idElem) {
        case "mobile":
        case "more": {
          return {
            ...state,
            menuLeftActive: !state.menuLeftActive,
            menuRightActive: false,
          };
        }
        case "profile": {
          return {
            ...state,
            menuRightActive: !state.menuRightActive,
            menuLeftActive: false,
          };
        }
        default: {
          return state;
        }
      }
    }
    case SET_MOBILE_TITLE: {
      return {
        ...state,
        mobileTitle: {
          ...action.elememt,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export const setMenuActive = (idElem) => ({ type: SET_MENU_ACTIVE, idElem });
export const setMobileTitle = (elememt) => ({
  type: SET_MOBILE_TITLE,
  elememt,
});

export default headerReducer;
