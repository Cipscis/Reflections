require([
	'Vector/Vector',
	'Vector/Line',
	'Vector/Plane'
], function (Vector, Line, Plane) {
	window.Vector = Vector;


	var lightSourceDistance = 200,
		lightSourceHeight = 10,
		reflectorHeight = -5,
		standardDeviationAngle = 20;




	var lightSource = new Vector(0, lightSourceHeight, lightSourceDistance),
		reflectorPlane = new Plane(
			new Vector(0, 1, 0),
			new Vector(0, reflectorHeight, 0)
		);

	var canvas = document.getElementsByTagName('canvas')[0];
	var context = canvas.getContext('2d');
	context.clearRect(0, 0, 20, 20);

	var isWithinTolerance = function (lightSource, reflectorPlane, tolerance, fillStyle) {
		// Observer at [0, 0, 0]

		var i, j,
			angleV, angleH,
			x, y, z,
			reflectionDirection, reflectionPoint,
			incidentRay,
			neededReflectorPlane,
			neededReflectorPlaneAngle;

		var smallestAngle = 180, smallestI, smallestJ;

		for (i = -45; i < 45; i += 0.1) {
			for (j = 0; j < 90; j += 0.1) {
				angleH = (i + 90) / 180*Math.PI;
				angleV = (j + 90) / 180*Math.PI;

				x = Math.cos(angleH);
				y = Math.cos(angleV);
				z = Math.sqrt(1-(x*x + y*y));

				reflectionDirection = new Vector(x, y, z);
				reflectionPoint = (new Line(reflectionDirection)).intersectPlane(reflectorPlane);

				incidentRay = new Line(lightSource.subtract(reflectionPoint));

				neededReflectorPlane = new Plane(reflectionPoint.getReflectorNormal(incidentRay.direction), reflectionPoint);

				neededReflectorPlaneAngle = neededReflectorPlane.angle(reflectorPlane) * 180/Math.PI;

				if (neededReflectorPlaneAngle < tolerance) {
					var opacity = Math.pow(1-neededReflectorPlaneAngle/tolerance, 2);
					context.fillStyle = fillStyle || 'rgba(0, 0, 0, ' + opacity + ')';
					context.fillRect(450+reflectionPoint.i/reflectionPoint.k*400, 450-reflectionPoint.j/reflectionPoint.k*400, 1, 1);
				}

				if (neededReflectorPlaneAngle < smallestAngle) {
					smallestI = i;
					smallestJ = j;
					smallestAngle = neededReflectorPlaneAngle;
				}
			}
		}
	};

	isWithinTolerance(lightSource, reflectorPlane, standardDeviationAngle);

	isWithinTolerance(lightSource, reflectorPlane, 0.1, '#f00');

	context.fillRect(450+lightSource.i/lightSource.k*400-0.5, 450-lightSource.j/lightSource.k*400-0.5, 2, 2);

	context.strokeStyle = '#000';
	context.beginPath();
	context.moveTo(0, 450);
	context.lineTo(900, 450);
	context.stroke();

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

	// console.log(line.intersectPoint(new Vector(0, 1, 1)));

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



	// Example of finding line intersection

	/*var l1 = new Line(new Vector(0, 0, 1), new Vector(0, 0, 0)),
		l2 = new Line(new Vector(0, 1, 1), new Vector(0, -1, 0));

	console.log(l1.intersectLine(l2));*/
});