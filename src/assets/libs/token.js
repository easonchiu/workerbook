import cookie from 'js-cookie'

const token = '_app_token_'

const setToken = val => {
	cookie.set(token, val, {
		path: ''
	})
}

const getToken = () => {
	return cookie.get(token, {
		path: ''
	})
}

const clearToken = () => {
	cookie.remove(token, {
		path: ''
	})
}

export {
	setToken,
	getToken,
	clearToken,
}