var canvas = document.getElementById('canv');
var gl = canvas.getContext('experimental-webgl', {preserveDrawingBuffer: true});

var bPos = gl.createBuffer();
var bColor = gl.createBuffer();
var bPointSize = gl.createBuffer();

drawTypes = {
	points: gl.POINTS,
	lines: gl.LINES,
	lineLoop: gl.LINE_LOOP,
	lineStrip: gl.LINE_STRIP,
	triangles: gl.TRIANGLES,
	triangleStrip: gl.TRIANGLE_STRIP,
	triangleFan: gl.TRIANGLE_FAN
};

var vertCode = `
attribute vec2 pos;
attribute vec4 color;
attribute float point_size;

varying vec4 c;

void main(void) {
	gl_PointSize = point_size;
	gl_Position = vec4(pos, 0.0, 1.0);
	c = color;
}
`;

var fragCode = `
precision highp float;

varying vec4 c;

void main(void) {
	gl_FragColor = c;
}
`;

var objects = [];

function scaleModel(m, scale) {
	var newM = [];
	for (var i in m) newM[i] = m[i]*scale;
	return newM;
}

function moveModel(m, x, y) {
	var newM = [];
	for (var i=0;i<m.length/2;i++) {
		newM[2*i] = m[2*i]+x;
		newM[2*i+1] = m[2*i+1]+y;
	}
	return newM;
}

function rotateModel(m, angle) {
	var s = Math.sin(angle);
	var c = Math.cos(angle);
	var newM = [];
	for (var i=0;i<m.length/2;i++) {
		newM[2*i] = m[2*i]*c-m[2*i+1]*s;
		newM[2*i+1] = m[2*i]*s+m[2*i+1]*c;
	}
	return newM;
}

function findMinMax(m) {
	var values = [1, -1, 1, -1];
	for (var i=0;i<m.length/2;i++) {
		var x = m[2*i];
		if (x<values[0]) values[0] = x;
		if (x>values[1]) values[1] = x;
		var y = m[2*i+1];
		if (y<values[2]) values[2] = y;
		if (y>values[3]) values[3] = y;
	}
	return values;
}
