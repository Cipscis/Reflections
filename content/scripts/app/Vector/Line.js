define([
	'Vector/Vector',
	'Vector/Point',
	'Vector/Plane'
], function (Vector, Point, Plane) {

	var Line = function (direction, origin) {
		this.direction = (direction && direction instanceof Vector) ? direction.normalise() : new Vector(0, 0, 1);

		this.origin = (origin && origin instanceof Vector) ? origin : new Vector(0, 0, 0);
	};

	Line.prototype.intersectPlane = function (plane) {
		if (!(plane instanceof Plane)) {
			return undefined;
		}

		// lineX = a + x*b
		// Need to define the plane as an equation?

		// Return point of intersection

		var nv = plane.normal.dot(this.direction),
			no = plane.normal.dot(this.origin),

			t = (plane.p - no)/nv,
			x = this.origin.i + this.direction.i * t,
			y = this.origin.j + this.direction.j * t,
			z = this.origin.k + this.direction.k * t;

		return new Point(x, y, z);
	};

	Line.prototype.intersectPoint = function (point) {
		if (!(point instanceof Point)) {
			return undefined;
		}

		var plane = new Plane(this.direction, new Vector(point.x, point.y, point.z)),
			intersect = this.intersectPlane(plane);

		console.log(intersect);

		return (intersect.x === point.x && intersect.y === point.y && intersect.z === point.z);
	};

	Line.prototype.reflect = function (plane) {
		if (!(plane instanceof Plane)) {
			return undefined;
		}

		var direction = this.direction.reflect(plane.normal),
			origin = this.intersectPlane(plane);

		return new Line(direction, origin);
	};

	return Line;

});