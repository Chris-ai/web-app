import axios from 'axios'

class PatientService {
    getPatients() {
        return axios.get(`http://localhost:3000/patients`)
    }
    getPatientData(id) {
        return axios.get(`http://localhost:3000/patients/${id}`)
    }
    createPatient(patient) {
        return axios.post('http://localhost:3000/patients', patient)
    }

    updatePatient(id, patient) {
        return axios.put(`http://localhost:3000/patients/${id}`, patient)
    }

    removePatient(id) {
        return axios.delete(`http://localhost:3000/patients/${id}`)
    }
}

export default new PatientService();