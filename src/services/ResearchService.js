import axios from 'axios'

class ResearchService {
    get() {
        return axios.get('http://localhost:3000/research')
    }

    create(research) {
        return axios.post('http://localhost:3000/research', research)
    }

    update(id, research) {
        return axios.put(`http://localhost:3000/research/${id}`, research)
    }

    remove(id) {
        return axios.delete(`http://localhost:3000/research/${id}`)
    }
}

export default new ResearchService();