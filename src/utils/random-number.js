export default function randomNumber(constant) {
	const c = constant;

	return function(index = 1, add = 1) {
		return Math.floor(c * index) + add;
	}
}