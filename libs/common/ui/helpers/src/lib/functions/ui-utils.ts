/**
 * Based on anchor element id, scroll to that element
 *
 * @param id - fragment id of the element to scroll to
 * @param block
 */
export function scrollToElementId(id: string, block: ScrollLogicalPosition = 'start') {
	const element = document.getElementById(id);
	if (element) {
		element.scrollIntoView({ behavior: 'smooth', block });
	}
}
