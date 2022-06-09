import axios from 'axios'

class ProjectService {
    getProjects() {
        return axios.get('http://localhost:3000/projects')
    }

    getProjectById(id) {
        return axios.get(`http://localhost:3000/projects/${id}`)
    }

    createProject(project) {
        return axios.post('http://localhost:3000/projects', project)
    }

    updateProject(id, project) {
        return axios.put(`http://localhost:3000/projects/${id}`, project)
    }

    removeProject(id) {
        return axios.delete(`http://localhost:3000/projects/${id}`)
    }
}

export default new ProjectService();