import { useState, useCallback } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type UseHttpResult<T = unknown> = {
	data: T | null;
	error: string | null;
	loading: boolean;
	sendRequest: (config: AxiosRequestConfig) => Promise<void>;
};

const axiosInstance = axios.create({
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}
})

function useHttp<T = unknown>(): UseHttpResult<T> {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const sendRequest = useCallback(async (config: AxiosRequestConfig) => {
		setLoading(true);
		setError(null);
		setData(null);
		try {
			const response: AxiosResponse<T> = await axiosInstance(config);
			setData(response.data);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setError(err.response?.data?.message || err.message || 'Something went wrong');
			} else if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('Something went wrong');
			}
		} finally {
			setLoading(false);
		}
	}, []);

	return { data, error, loading, sendRequest };
}

export default useHttp;
