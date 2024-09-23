import { useCallback, useState } from "react"
import axios from 'axios';

export type TStatus = "idle" | "loading" | 'error';
type HTTPRequestMethods = "GET" | "POST";
interface Headers {
    [content: string]: string;
}

export interface RequestConfig {
    url: string;
    method?: HTTPRequestMethods;
    body?: string | null;
    headers?: Headers;
}

export const useHttp = () => {
    const [process, setProcess] = useState<TStatus>('idle');

    const request = useCallback(async ({ url, method = "GET", body = null, headers = { 'Content-Type': 'application/json' } }: RequestConfig) => {

        setProcess('loading');

        try {
            const response = await axios.get(url, { method, headers });
            if (response.status !== 200) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            setProcess('idle');
            return response.data;

        } catch (e) {
            if (e instanceof Error) {
                setProcess('error');
            }
        }
    }, [])

    return { request, process };
}
