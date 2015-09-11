/**
 * Creates a new image element as child of a pseudo element
 * @param {string} content - value including a valid url path to the image
 */
export default function createPseudoImage(content) {
	return React.createElement('img', {
		src: content.split('url(')[1].substr(0, content.length - 5)
	})
}