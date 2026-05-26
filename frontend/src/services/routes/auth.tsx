import API from "../api-config";

const route = "/auth";


export async function register(email: string, full_name: string, password: string, school_name: string) {
    return await API.post(`${route}/register`, {
        email,
        full_name,
        password,
        school_name
    });
}