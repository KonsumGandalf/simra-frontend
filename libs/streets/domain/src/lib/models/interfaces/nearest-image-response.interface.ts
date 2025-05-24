export interface INearestImageResponse {
	data: IImage[]
}

interface IImage {
	id: number;
	captured_at: string;
}
