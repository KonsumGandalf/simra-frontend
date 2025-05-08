import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import 'reflect-metadata';

setupZoneTestEnv({
	errorOnUnknownElements: true,
	errorOnUnknownProperties: true,
});

Object.defineProperty(global.URL, 'createObjectURL', {
	writable: true,
	value: jest.fn(() => 'mocked-url'),
});
