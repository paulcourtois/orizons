import {
  CHANGE_REGISTER_FIELD, REGISTER_SUCCESS, REGISTER_FAIL,
  SET_LOADER_REGISTER, GET_MEMBER_SUCCESS,
} from '../actions/types';

const initialState = {
  nickname: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  passwordRepeat: '',
  errorMessage: '',
  isSuccessful: false,
  isLoading: false,
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case CHANGE_REGISTER_FIELD:
      return {
        ...oldState,
        [action.name]: action.value,
      };
    case REGISTER_SUCCESS:
      return {
        ...oldState,
        nickname: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        passwordRepeat: '',
        isSuccessful: true,
        isLoading: false,
      };
    case REGISTER_FAIL:
      return {
        ...oldState,
        errorMessage: action.message,
        isLoading: false,
      };
    case SET_LOADER_REGISTER:
      return {
        ...oldState,
        isLoading: true,
      }
    case GET_MEMBER_SUCCESS:
      return {
        ...oldState,
        nickname: action.member.nickname,
        first_name: action.member.first_name,
        last_name: action.member.last_name,
        email: action.member.email,
        photo_id: action.member.photo_id,
        localisation_id: action.member.localisation_id,
      }
    default:
      return oldState;
  }
};

export default reducer;