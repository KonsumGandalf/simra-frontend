export function scoreFormulaMarkdownRegion(numberOfIncidents: number, numberOfScaryIncidents: number, totalDistance: number, dangerousScore: number): string {
	return `
$$
\\text{score} = \\frac{4.4 \\cdot ${numberOfScaryIncidents} + ${numberOfIncidents - numberOfScaryIncidents}}{${totalDistance/1000}} = ${dangerousScore.toFixed(5)}
$$
`;
}
