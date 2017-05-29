const initErrorState = {
	error: null
}

export const errorReducer = (state = initErrorState, action) => {
	switch (action.type) {

		case 'SHOW_ERROR':
			return {
				error: action.error
			}

		case 'CLEAR_ERROR':
			return initErrorState;
			
		default:
			return state;
	}
}

const initAuthState = {
	authenticated: false,
	user: null
}
export const authReducer = (state = initAuthState, action) => {
	switch (action.type) {

		case 'LOGIN_USER':
			return {
				authenticated: true,
				user: action.uid
			}

		case 'LOGOUT_USER':
			return initAuthState
	
		default:
			return state
	}
}

export const userReducer = (state = {}, action) => {
	switch (action.type) {
		case 'LOAD_USER_DATA':
			return action.userData;

		case 'CLEAR_USER_DATA':
			return {}; // For Logout;
	
		default:
			return state;
	}
}