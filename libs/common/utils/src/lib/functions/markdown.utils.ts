export function scoreFormulaMarkdownSegment(numberOfIncidents: number, numberOfScaryIncidents: number, totalRides: number, dangerousScore: number): string {
	return `
$$
\\text{score} = \\frac{4.4 \\cdot ${numberOfScaryIncidents} + ${numberOfIncidents - numberOfScaryIncidents}}{${totalRides}} = ${dangerousScore.toFixed(5)}
$$
`;
}
