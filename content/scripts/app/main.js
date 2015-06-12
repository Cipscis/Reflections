require([
	'Vector/Vector',
	'Vector/Point',
	'Vector/Line',
	'Vector/Plane'
], function (Vector, Point, Line, Plane) {
	// Example of finding plane of reflection from directions


	/*var lineDirection = new Vector(12, -1, -1),
		lineOrigin = new Vector(0, 0, 0),
		line = new Line(lineDirection, lineOrigin),

		planeNormal = new Vector(2, 1, -Math.PI),
		planeOrigin = new Vector(0, -1, 0),
		plane = new Plane(planeNormal, planeOrigin);

	var intersection = line.intersectPlane(plane),
		reflection = line.reflect(plane),
		angle = 90-lineDirection.angle(planeNormal)/Math.PI*180;

	// console.log(line.intersectPoint(new Point(0, 1, 1)));

	console.log(line.direction.normalise(), reflection.direction.normalise());

	console.log(line.direction.normalise().subtract(reflection.direction.normalise()).normalise());

	console.log(plane.normal.normalise());*/

	// console.log(intersection, reflection, angle);




	// Example of finding angle between two planes


	/*var n1 = new Vector(0, 1, 0),
		n2 = new Vector(0, 12, 1),
		p1 = new Plane(n1),
		p2 = new Plane(n2);

	console.log(p1.angle(p2)/Math.PI*180);*/
});