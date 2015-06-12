define([], function () {

	var Vector = function (i, j, k) {
		this.i = i || 0;
		this.j = j || 0;
		this.k = k || 0;
	};

	Vector.prototype.dot = function (that) {
		if (!(that instanceof Vector)) {
			return undefined;
		}

		return this.i*that.i + this.j*that.j + this.k*that.k;
	};

	Vector.prototype.angle = function (that) {
		if (!(that instanceof Vector)) {
			return undefined;
		}

		// Dot product = |a||b|*cos(theta)

		var dotProduct = this.dot(that),
			magA = this.magnitude(),
			magB = that.magnitude(),
			angle = Math.acos(dotProduct/(magA*magB));

		if (angle > Math.PI/2) {
			angle = Math.PI - angle;
		}

		return angle;
	};

	Vector.prototype.magnitude = function () {
		return Math.sqrt(this.i*this.i + this.j*this.j + this.k*this.k);
	};

	Vector.prototype.multiply = function (a) {
		if (typeof a !== 'number') {
			return undefined;
		}

		return new Vector(this.i*a, this.j*a, this.k*a);
	};

	Vector.prototype.plus = function (that) {
		if (!(that instanceof Vector)) {
			return undefined;
		}

		return new Vector(this.i+that.i, this.j+that.j, this.k+that.k);
	};

	Vector.prototype.minus = function (that) {
		if (!(that instanceof Vector)) {
			return undefined;
		}

		return this.plus(that.multiply(-1));
	};

	Vector.prototype.normalise = function () {
		var magnitude = this.magnitude();

		return new Vector(this.i/magnitude, this.j/magnitude, this.k/magnitude);
	};

	Vector.prototype.reflect = function (normal) {
		if (!(normal instanceof Vector)) {
			return undefined;
		}

		// r = d - 2(d.n)n
		return this.minus(normal.multiply(2*this.dot(normal)));
	};

	return Vector;

});