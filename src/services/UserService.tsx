/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"

const USER_BASE_REST_API_URL = "http://localhost:8080/api/v1/users"

class UserService {
    authUser(username: string, password: string){
        return axios.post(USER_BASE_REST_API_URL, { username, password });
    }
}

export default new UserService();
