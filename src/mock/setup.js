import axios from "axios";
import { matchRoute } from "./interceptor";

//设置开发环境标识
const isDev = import.meta.env.MODE === 'development'

if (isDev) {
    console.log('🚀 启用Mock API拦截器')
    //拦截axios请求
    const originalAdapter = axios.defaults.adapter;
    axios.defaults.adapter = async (config) => {
        const { method, url, baseURL, params } = config;
        //构建完整的URL（包含baseURL）
        let fullURL = url;
        if (baseURL && !url.startsWith('http')) {
            const cleanBaseURL = baseURL.replace(/\/$/, ''); //移除尾部斜杠
            const cleanUrl = url.startsWith('/') ? url : '/' + url;//确保URL以斜杠开头
            fullURL = cleanBaseURL + cleanUrl;
        }
        //如果有参数，添加到URL中
        if (params && Object.keys(params).length > 0) {
            const searchParams = new URLSearchParams(params);
            Object.keys(params).forEach(key => {
                if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
                    searchParams.append(key, params[key]);
                }
            })
            const queryString = searchParams.toString();
            if (queryString) {
                fullURL += (fullURL.includes('?') ? '&' : '?') + queryString;
            }
        }
    }
}