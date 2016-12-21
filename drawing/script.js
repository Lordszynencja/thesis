function makeVertShader() {
	var vertShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertShader, vertCode);
	gl.compileShader(vertShader);
	
	if(!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
		var error = gl.getShaderInfoLog(vertShader);
		console.log(vertCode);
		console.log("VERT SHADER ERROR\n"+error);
	}
	return vertShader;
}

function makeFragShader() {
	var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragShader, fragCode);
	gl.compileShader(fragShader);
	
	if(!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
		var error = gl.getShaderInfoLog(fragShader);
		console.log(fragCode);
		console.log("FRAG SHADER ERROR\n"+error);
	}
	return fragShader;
}

function bindBuffers(shader) {
	gl.bindBuffer(gl.ARRAY_BUFFER, bPos);
	var aPos = gl.getAttribLocation(shader, "pos");
	gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(aPos);

	gl.bindBuffer(gl.ARRAY_BUFFER, bColor);
	var aColor = gl.getAttribLocation(shader, "color");
	gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(aColor);

	gl.bindBuffer(gl.ARRAY_BUFFER, bPointSize);
	var aPointSize = gl.getAttribLocation(shader, "point_size");
	gl.vertexAttribPointer(aPointSize, 1, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(aPointSize);
}

function clear() {
	gl.clearColor(1, 1, 1, 1);
	gl.clear(gl.COLOR_BUFFER_BIT);
}

function restart() {
	objects = [];
	clear();
}

function createShader() {
	var shader = gl.createProgram();
	gl.attachShader(shader, makeVertShader());
	gl.attachShader(shader, makeFragShader());
	gl.linkProgram(shader);
	gl.useProgram(shader);
	bindBuffers(shader);
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	clear();
}

function buf(pos, color, pointSize) {
	gl.bindBuffer(gl.ARRAY_BUFFER, bPos);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STREAM_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, bColor);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STREAM_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, bPointSize);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointSize), gl.STREAM_DRAW);
}

function draw(pos, color, pointSize, drawType) {
	buf(pos, color, pointSize);
	gl.drawArrays(drawType, 0, pointSize.length);
}

function drawObjects() {
	clear();
	for (var i in objects) objects[i].draw();
}

createShader();

function drawShape(model, position, scale, angle, color, drawType, pointSize = 1) {
	var pos = moveModel(rotateModel(scaleModel(model, scale), angle), position[0], position[1]);
	objects.push(new Drawing(pos, color, pointSize, drawType));
	drawObjects();
	return objects[objects.length-1];
}

function drawShip(position, scale, angle, color) {
	var model = [1,0, 0.5,0.5, -0.5,0.5, -0.5,1, -1,0, -0.5,-1, -0.5,-0.5, 0.5,-0.5];
	return drawShape(model, position, scale, angle, color, drawTypes.lineLoop);
}

function drawBullet(position, scale, angle, color) {
	var model = [-1,-0.5, 0.5,-0.5, 1,0, 0.5,0.5, -1,0.5];
	return drawShape(model, position, scale, angle, color, drawTypes.lineLoop);
}

function drawAABB(x1, x2, y1, y2, color) {
	return drawBox(x1, x2, y1, y2, [0, 0], 1, 0, color);
}

function drawBox(x1, x2, y1, y2, position, scale, angle, color) {
	var model = [x1,y1, x2,y1, x2,y2, x1,y2];
	return drawShape(model, position, scale, angle, color, drawTypes.lineLoop);
}

function drawCircle(position, scale, color) {
	var model = [];
	var points = (scale>0.01 ? Math.ceil(1000*scale) : 10);
	for (var i=0;i<points;i++) {
		var angle = Math.PI*2*i/points;
		model.push(Math.cos(angle)*scale);
		model.push(Math.sin(angle)*scale);
	}
	return drawShape(model, position, 1, 0, color, drawTypes.lineLoop);
}

function drawArrow(position, scale, tailLength, angle, color) {
	var arrow = [-tailLength/scale,1/4, 1,1/4, 1,-1/4, -tailLength/scale,1/4, -tailLength/scale,-1/4, 1,-1/4,
		3/4,1/4, 0,1, 1/4,1, 3/4,1/4, 1,1/4, 1/4,1,
		3/4,-1/4, 0,-1, 1/4,-1, 3/4,-1/4, 1,-1/4, 1/4,-1];
	return drawShape(arrow, position, scale, angle, color, drawTypes.triangles);
}

function drawSimpleLine(position, color) {
	drawShape(position, [0, 0], 1, 0, color, drawTypes.lines);
}

function drawHorizontalLine(x1, x2, y, color) {
	drawSimpleLine([x1,y, x2,y], color);
}

function drawVerticalLine(x, y1, y2, color) {
	drawSimpleLine([x,y1, x,y2], color);
}

function drawBins(binsN = 20) {
	var w = 2/binsN;
	for (var i=1;i<binsN;i++) {
		drawShape([-1+w,0, 1-w,0], [0, i*w-1], 1, 0, [0, 0, 0, 1], drawTypes.lines);
		drawShape([0,-1+w, 0,1-w], [i*w-1, 0], 1, 0, [0, 0, 0, 1], drawTypes.lines);
	}
}

function fillBin(x, y, strength, binsN = 20) {
	if (strength>0) {
		var width = 2/binsN;
		drawShape([0,0, 0,width, width,width, width,0], [x*width-1, y*width-1], 1, 0, [0, 0, 0, strength], drawTypes.triangleFan);
	}
}

function fillBinWithColor(x, y, color, binsN = 20) {
	var width = 2/binsN;
	drawShape([0,0, 0,width, width,width, width,0], [x*width-1, y*width-1], 1, 0, color, drawTypes.triangleFan);
}

function drawBinary(x, y, m, c0, c1, binsN = 20) {
	for (var i=0;i<m.length;i++) {
		for (var j=0;j<m[i].length;j++) {
			fillBinWithColor(x+j, binsN-y-i+1, m[i][j] == 1 ? c1 : c0, binsN);
		}
	}
}

function drawBasedOnColor(x, y, m, c, binsN) {
	for (var i=0;i<m.length;i++) {
		for (var j=0;j<m[i].length;j++) {
			fillBinWithColor(x+j, binsN-y-i-1, c[m[i][j]], binsN);
		}
	}
}

var red = [1, 0, 0, 1];
var blue = [0, 0, 1, 1];
var black = [0, 0, 0, 1];
