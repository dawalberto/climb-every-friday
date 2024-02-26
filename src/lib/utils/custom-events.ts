export const subscribe = (
	eventName: CustomEvents,
	listener: EventListenerOrEventListenerObject
) => {
	document.addEventListener(eventName, listener)
}

export const unsubscribe = (
	eventName: CustomEvents,
	listener: EventListenerOrEventListenerObject
) => {
	document.removeEventListener(eventName, listener)
}

export const dispatchCustomEvent = <T>(eventName: CustomEvents, data?: T) => {
	const event = new CustomEvent(eventName, { detail: data })
	document.dispatchEvent(event)
}

export enum CustomEvents {
	ON_ROUTE_MODE_EDIT_ON = 'onRouteModeEditOn',
	ON_ROUTE_MODE_EDIT_OFF = 'onRouteModeEditOff',
	ON_POSITION_AND_SIZE_OF_BOULDER_IMAGE_CALCULATED = 'onPositionAndSizeOfBoulderImageCalculated',
	ON_ROUTE_INFO_CLICK = 'onRouteInfoClick',
}
