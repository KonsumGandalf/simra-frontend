import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
	vus: 100,
	duration: '30s',
};

export default function () {
	const res = http.get('http://konsumpi:4200/streets/map');

	check(res, {
		'Status ist 200': (r) => r.status === 200,
		'Antwortzeit < 500ms': (r) => r.timings.duration < 500,
	});

	sleep(1);
}
