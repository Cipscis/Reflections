require([
	'Vector/Vector',
	'Vector/Line',
	'Vector/Plane'
], function (Vector, Line, Plane) {
	var lightSourceDistance = 200,
		lightSourceHeight = 10,
		reflectorHeight = -5,
		maxAngle = 20,

		lightSource,
		reflectorPlane,
		canvas, context;

	var init = function () {
		lightSource = new Vector(0, lightSourceHeight, lightSourceDistance);
		reflectorPlane = new Plane(
			new Vector(0, 1, 0),
			new Vector(0, reflectorHeight, 0)
		);

		canvas = document.getElementsByTagName('canvas')[0];
		context = canvas.getContext('2d');
		context.clearRect(0, 0, 20, 20);

		drawHorizon();
		drawLightSource();

		projectReflection(lightSource, reflectorPlane, maxAngle);
		drawLightSourceReflection('#f00');
	};

	var drawHorizon = function (strokeStyle) {
		context.save();
		context.strokeStyle = strokeStyle || '#000';

		context.beginPath();
		context.moveTo(0, 450);
		context.lineTo(900, 450);
		context.stroke();

		context.restore();
	};

	var drawLightSource = function (fillStyle) {
		context.save();
		context.fillStyle = fillStyle || '#f00';

		context.fillRect(450+lightSource.i/lightSource.k*400-0.5, 450-lightSource.j/lightSource.k*400-0.5, 2, 2);

		context.restore();
	};

	var drawLightSourceReflection = function (fillStyle) {
		projectReflection(lightSource, reflectorPlane, 0.1, fillStyle);
	};

	var projectReflection = function (lightSource, reflectorPlane, tolerance, fillStyle) {
		// Observer at [0, 0, 0]

		var i, j,
			angleV, angleH,
			x, y, z,
			reflectionDirection, reflectionPoint,
			incidentRay,
			neededReflectorPlane,
			neededReflectorPlaneAngle;

		var smallestAngle = 180, smallestI, smallestJ;

		for (i = -45; i < 45; i += 0.05) {
			for (j = 0; j < 90; j += 0.05) {
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
					var strength = Math.pow(1-neededReflectorPlaneAngle/tolerance, 2)/5;
					context.fillStyle = fillStyle || 'rgba(0, 0, 0, ' + strength + ')';
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

	init();
});