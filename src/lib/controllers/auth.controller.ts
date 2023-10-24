import $api from "../http";
import LoginDto from "./dto/auth/login.dto";
import axios, {AxiosError} from "axios";

export class AuthController {
    static async login({username, password}: LoginDto) {
        try {
            const response = await $api.post('login/',{
                username,
                password,
            }, {
                timeout: 5000
            });

            return response.data;
        } catch (e) {
            console.log(e);
            if (axios.isAxiosError(e)) {
                if (e.code === AxiosError.ECONNABORTED) {
                    return {
                        error: 'Internal server error. Try again!'
                    }
                }
                return {
                    error: e?.response?.data?.error ? 'Incorrect login or password' : 'Internal server error. Try again!',
                }
            } else {
                return e;
            }
        }
    }
}