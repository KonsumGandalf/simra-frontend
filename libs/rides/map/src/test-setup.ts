import 'jest-preset-angular/setup-jest';

Object.defineProperty(global.URL, 'createObjectURL', {
	writable: true,
	value: jest.fn(() => 'mocked-url'),
});

