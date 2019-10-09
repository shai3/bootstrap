import { useEffect, useState } from 'react';

export default function(initialize, initialData) {
	const [data, setData] = useState(initialData);
	useEffect(() => {
		Promise.resolve(initialize()).then(data => setData(data || true));
	}, []);

	return [data, setData];
}
