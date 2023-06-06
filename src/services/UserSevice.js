import axios from './CustomizeAxios';

const FetchAllUser =(page)=>{
    return axios.get(`api/users?page=${page}`)
    
}

const postCreateUser= (name, job) => {
    return axios.post("api/users", {name, job})
}
const putUpdateUser = ( name ,job) =>{
    return axios.put("api/users/2", {name, job})
}
const deleteUser = (id) => {
    return axios.delete(`api/user/${id}`)
}

const loginApi= (email , password) => {
    return axios.post("api/login", {email, password})
}


export {FetchAllUser , postCreateUser, putUpdateUser ,deleteUser , loginApi};