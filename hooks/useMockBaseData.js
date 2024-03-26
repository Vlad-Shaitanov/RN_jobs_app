import { useState, useEffect } from 'react';
import { base_request } from '../mock_data/base_request'


// Заглушка для экономии запросов к апи
export const useMockBaseData = (endpoint, query) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		setIsLoading(true)

		try {

			setData(base_request.data)

			setIsLoading(false)
		} catch (error) {
			setError(error);
			alert('There is an error')
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const refetch = () => {
		setIsLoading(true);
		fetchData();
	}

	return { data, isLoading, error, refetch }
}