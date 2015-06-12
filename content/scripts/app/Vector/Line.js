define([
	'Vector/Vector',
	'Vector/Point',
	'Vector/Plane'
], function (Vector, Point, Plane) {

	var Line = function (direction, origin) {
		this.direction = (direction && direction instanceof Vector) ? direction.normalise() : new Vector(0, 0, 1);

		this.origin = (origin && origin instanceof Vector) ? origin : new Vector(0, 0, 0);
	};

	Line.prototype.intersect = function (plane) {
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

	Line.prototype.reflect = function (plane) {
		if (!(plane instanceof Plane)) {
			return undefined;
		}

		var direction = this.direction.reflect(plane),
			origin = this.intersect(plane);

		return new Line(direction, origin);
	};

	return Line;

});