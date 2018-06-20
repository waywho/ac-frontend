import axios from 'axios'

const instance = axios.create({
	//production
	// baseURL: 'https://artist-center-production.firebaseio.com'
	//dve
	baseURL: 'https://artist-center.firebaseio.com'
})

// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance