import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://artist-center-production.firebaseio.com'
})

// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance