import axios from 'axios'
import {getToken} from 'src/assets/libs/token'

const config = {
	production: '/api',
	develop: 'proxy',
	test1: '/api',
	test2: '/api',
	test3: '/api',
	test4: '/api',
	test5: '/api',
}

const baseUrl = config[process.env.ENV_NAME] || config['develop']

const http = axios.create({
	baseURL: baseUrl,
	header: {
		'Accept': 'application/json;version=3.0;compress=false',
		'Content-Type': 'application/json;charset=utf-8'
	}
})

http.interceptors.request.use(config => {
	const token = getToken()
	if (token) {
		config.headers.Authorization = 'Bearer ' + token
	}
	return config
}, error => {
	return Promise.reject(error)
})

http.interceptors.response.use(config => {
	
	if (!config.data) {
		return Promise.reject({
			msg: '系统错误'
		})
	} else if (config.data.code === 0) {
		return Promise.reject({
			msg: config.data.msg
		})
	}

	return Promise.resolve({
		...config.data
	})
}, error => {
	return Promise.reject({
		msg: '系统错误'
	})
})

export default http