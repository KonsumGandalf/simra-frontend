import * as maplibregl from 'maplibre-gl';

export class MapUtils {
	public static changeCursor(mlMap: maplibregl.Map, layerId: string) {
		mlMap.on('mouseenter', layerId, () => {
			mlMap!.getCanvas().style.cursor = 'pointer';
		});

		mlMap.on('mouseleave', layerId, () => {
			mlMap!.getCanvas().style.cursor = 'default';
		});
	}
}
