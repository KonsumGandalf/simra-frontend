import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
	vus: 5,
	duration: '20s',
};

export default function () {
	// let res = http.get('http://konsumpi:8081/api/streets/grid?lat=52.523232122212534&lng=13.47329869&zoom=9&year=2024');
	// res = http.get('http://konsumpi:8081/api/safety-metrics/simra-regions/Berlin-Potsdam');
	const res = http.get('http://konsumpi:8081/api/safety-metrics/streets-grid?weekDay=ALL_WEEK&year=2000&trafficTime=ALL_DAY');
	// res = http.get('http://konsumpi:8081/api/safety-metrics/regions?size=20&minNumberOfRides=100&page=0&weekDay=ALL_WEEK&trafficTime=ALL_DAY&year=2000&sort=dangerousScore,DESC');

	check(res, {
		'Antwortzeit < 300': (r) => r.timings.duration < 300,
		'Status ist 200': (r) => r.status === 200,
	});

}
