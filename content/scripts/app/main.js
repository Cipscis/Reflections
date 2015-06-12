require([
	'Vector/Vector',
	'Vector/Line',
	'Vector/Plane'
], function (Vector, Line, Plane) {
	var lineDirection = new Vector(0, -1, -1),
		lineOrigin = new Vector(0, 0, 0),
		line = new Line(lineDirection, lineOrigin),

		planeNormal = new Vector(0, 1, 0),
		planeOrigin = new Vector(0, -1, 0),
		plane = new Plane(planeNormal, planeOrigin);

	var intersection = line.intersect(plane),
		reflection = line.reflect(plane),
		angle = 90-lineDirection.angle(planeNormal)/Math.PI*180;

	console.log(intersection, reflection, angle);
});