import axios from 'axios'

class ZleceniaService {
    get() {
        return axios.get('http://localhost:3000/zlecenia')
    }
    getZlecenieById(id) {
        return axios.get(`http://localhost:3000/zlecenia/${id}`)
    }
    create(zlecenie) {
        return axios.post('http://localhost:3000/zlecenia', zlecenie)
    }

    update(id, zlecenie) {
        return axios.put(`http://localhost:3000/zlecenia/${id}`, zlecenie)
    }

    remove(id) {
        return axios.delete(`http://localhost:3000/zlecenia/${id}`)
    }
}

export default new ZleceniaService();