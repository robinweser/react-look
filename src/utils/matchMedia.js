let customMatchMedia;
let defaultMatchMedia = window.matchMedia;

export function setMatchMedia(matchMedia){
	if (matchMedia) {
		customMatchMedia = matchMedia;
	}
}

export function getMatchMedia(){
	return customMatchMedia || defaultMatchMedia;
}

export function canMatchMedia(){
	return defaultMatchMedia;
}