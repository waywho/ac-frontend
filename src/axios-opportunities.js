import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://ac-auditions.herokuapp.com'
})

// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance