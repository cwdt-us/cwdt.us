/* Adapted from https://jsfiddle.net/Byte/L5nzt7af */
function mouseDistanceFromElement(mouseEvent, element){
	let $n=element,
		mX = mouseEvent.pageX,
		mY = mouseEvent.pageY,
		from = {x:mX, y:mY},
		off = $n.getBoundingClientRect(),
		ny1 = off.top + document.body.scrollTop,//top
		ny2 = ny1 + $n.offsetHeight,//bottom
		nx1 = off.left + document.body.scrollLeft,//left
		nx2 = nx1 + $n.offsetWidth,//right
		maxX1 = Math.max(mX, nx1),
		minX2 = Math.min(mX, nx2),
		maxY1 = Math.max(mY, ny1),
		minY2 = Math.min(mY, ny2),
		intersectX = minX2 >= maxX1,
		intersectY = minY2 >= maxY1,
		to = {
			x: intersectX ? mX : nx2 < mX ? nx2 : nx1,
			y: intersectY ? mY : ny2 < mY ? ny2 : ny1
		},
		distX = to.x - from.x,
		distY = to.y - from.y,
		hypot = (distX**2 + distY**2)**(1/2);
		maxHypot = (screen.availWidth**2 + screen.availHeight**2)**(1/2) / 2
	return Math.floor(hypot) / maxHypot;
}

document.addEventListener("mousemove", function(e) {
	var element = document.getElementById("cwdt")
	var distance = mouseDistanceFromElement(e, document.getElementById("cwdt"))
	if (distance == 0) {
		element.style.fontFamily = "Redaction100";
	} else if (distance < 0.04) {
		element.style.fontFamily = "Redaction70";
	} else if (distance < 0.08) {
		element.style.fontFamily = "Redaction50";
	} else if (distance < 0.12) {
		element.style.fontFamily = "Redaction35";
	} else if (distance < 0.15) {
		element.style.fontFamily = "Redaction20";
	} else if (distance < 0.20) {
		element.style.fontFamily = "Redaction10";
	} else {
		element.style.fontFamily = "Redaction";
	}
});
