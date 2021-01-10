/**
 *
 * @param items some items
 */
export function getExist<T>(...items: Array<T>): Array<T> {
	return items.filter(Boolean);
}
