export function changeCursor(mlMap, layerId: string) {
	mlMap?.on('mouseenter', layerId, () => {
		mlMap.getCanvas().style.cursor = 'pointer';
	});

	mlMap?.on('mouseleave', layerId, () => {
		mlMap.getCanvas().style.cursor = 'default';
	});
}

export function removeLayer(mlMap, layerId: string) {
	if (mlMap?.getLayer(layerId)) {
		mlMap.removeLayer(layerId);
	}
}

export function removeSource(mlMap, sourceId: string) {
	if (mlMap?.getSource(sourceId)) {
		mlMap.removeSource(sourceId);
	}
}
