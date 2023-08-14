import axios, { AxiosInstance } from 'axios';

export interface IApiInstance {
    getApi(): AxiosInstance;
}

export class ApiInstance implements IApiInstance{
    private readonly base_url: string = "https://icanhazdadjoke.com";
    private api: AxiosInstance;
    private static instance: ApiInstance;

    constructor() {
        this.api = axios.create({ baseURL: this.base_url, headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
        }, });
        this.api.interceptors.response.use((response) => {
            return response;
            }, (error) => {
                return Promise.reject(error);
            });
    }

    public static getInstance(): ApiInstance {
        if (!ApiInstance.instance) {
            return ApiInstance.instance = new ApiInstance();
        }
        return ApiInstance.instance;
    }
    
    public getApi(): AxiosInstance {
        return this.api;
    }
}