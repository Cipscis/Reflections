define([
	'Vector/Vector',
	'Vector/Line',
	'Vector/Plane'
], function (Vector, Line, Plane) {
	var lightSourceDistance = 200,
		lightSourceHeight = 10,
		reflectorHeight = -5,
		maxAngle = 20,
		stepSize = 0.1,

		lightSource,
		reflectorPlane,
		canvas, context;

	var init = function (lightSourceDistanceParam, lightSourceHeightParam, reflectorHeightParam, maxAngleParam, stepSizeParam) {
		lightSourceDistance = lightSourceDistanceParam || lightSourceDistance;
		lightSourceHeight = lightSourceHeightParam || lightSourceHeight;
		reflectorHeight = reflectorHeightParam || reflectorHeight;
		maxAngle = maxAngleParam || maxAngle;
		stepSize = stepSizeParam || stepSize;

		lightSource = new Vector(0, lightSourceHeight, lightSourceDistance);
		reflectorPlane = new Plane(
			new Vector(0, 1, 0),
			new Vector(0, reflectorHeight, 0)
		);

		canvas = document.getElementsByTagName('canvas')[0];
		context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);

		drawBackground();
		drawLightSource();

		projectReflection(lightSource, reflectorPlane, maxAngle);
		drawLightSourceReflection('#f00');
	};

	var drawBackground = function (fillStyle) {
		context.save();

		context.fillStyle = fillStyle || '#000';
		context.fillRect(0, canvas.height/2, canvas.width, canvas.height/2);

		context.restore();
	};

	var drawLightSource = function (fillStyle) {
		context.save();
		context.fillStyle = fillStyle || '#f00';

		context.fillRect(canvas.width/2+lightSource.i/lightSource.k*400-0.5, canvas.height/2-lightSource.j/lightSource.k*400-0.5, 2, 2);

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

		for (i = -30; i < 30; i += stepSize) {
			for (j = 0; j < 50; j += stepSize) {
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
					var strength = Math.pow(1-neededReflectorPlaneAngle/tolerance, 2);
					context.fillStyle = fillStyle || 'rgba(255, 255, 0, ' + strength + ')';
					context.fillRect(canvas.width/2+reflectionPoint.i/reflectionPoint.k*400-5*stepSize, canvas.height/2-reflectionPoint.j/reflectionPoint.k*400-5*stepSize, 10*stepSize, 10*stepSize);
				}
			}
		}
	};

	return {
		init: init
	};
});