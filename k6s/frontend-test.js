import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
	vus: 10,
	duration: '30s',
};

export default function () {
	const res = http.get('https://konsumpi:8081/streets/map?lat=52.522&lng=13.413&zoom=14');

	check(res, {
		'Status ist 200': (r) => r.status === 200,
		'Antwortzeit < 500ms': (r) => r.timings.duration < 500,
	});

	sleep(1);
}
