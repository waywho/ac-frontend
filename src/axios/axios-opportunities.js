import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://ac-auditions.herokuapp.com'
	//dev
	// baseURL: 'http://localhost:3000'
})

// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance