import axios from "axios";

const initialState = {
  konselor: [],
  konselorDetail: [],
  isLoading: false,
  isFulfilled: false,
  isErrored: {},
};

const konselorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_KONSELOR_PENDING":
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isErrored: false,
      };
    case "GET_KONSELOR_REJECTED":
      return {
        ...state,
        isLoading: false,
        isErrored: action.payload,
      };
    case "GET_KONSELOR_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        konselor: action.payload,
      };

    case "GET_KONSELOR_BY_ID_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        konselorDetail: action.payload,
      };
    default:
      return state;
  }
};

function getKonselorPending() {
  return {
    type: "GET_KONSELOR_PENDING",
  };
}

function getKonselorRejected(data) {
  return {
    type: "GET_KONSELOR_REJECTED",
    payload: data,
  };
}

function getKonselorFulfilled(konselor) {
  return {
    type: "GET_KONSELOR_FULFILLED",
    payload: konselor,
  };
}

function getKonselorByIdFulfilled(konselor) {
  return {
    type: "GET_KONSELOR_BY_ID_FULFILLED",
    payload: konselor,
  };
}

export function getKonselor() {
  return async function (dispatch) {
    dispatch(getKonselorPending());
    try {
      const { data } = await axios.get(
        "https://incare-backend-production.up.railway.app/conselors/getconselor"
      );
      dispatch(getKonselorFulfilled(data));
    } catch (error) {
      dispatch(getKonselorRejected(error.message));
    }
  };
}

export function getKonselorById(id) {
  return async function (dispatch) {
    dispatch(getKonselorPending());
    try {
      const { data } = await axios.get(
        "https://incare-backend-production.up.railway.app/conselors/" + id
      );
      dispatch(getKonselorByIdFulfilled(data));
    } catch (error) {
      dispatch(getKonselorRejected(error.message));
    }
  };
}

export default konselorReducer;