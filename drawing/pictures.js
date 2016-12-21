function drawContinuous() {
	restart();
	
	var hitTime = 60.947;
	var hitEndTime = 66.563;
	var bulletAngle = Math.PI*0.08;
	var bulletScale = 0.05;
	var initialSpeed = 0.02;
	var vx = initialSpeed*Math.cos(bulletAngle);
	var vy = initialSpeed*Math.sin(bulletAngle);
	var x = -0.7377;
	var y = 0;
	var gravity = 0.0000981;
	var airDrag = 0.9995;
	
	drawBullet([x, y], bulletScale, bulletAngle, [0, 0, 0, 1]);
	drawBox(-1, 1, -0.02, 0.02, [0.5, 0.1], 0.4, Math.PI*0.4, [0, 0, 0, 1])
	var v = [x, y];
	for (var i=0;i<=hitTime;i++) {
		vy -= gravity;
		vx *= airDrag;
		vy *= airDrag;
		x += vx;
		y += vy;
		v.push(x);
		v.push(y);
	}
	
	var part1 = hitTime-Math.floor(hitTime);
	var position1 = [x + part1*vx, y + part1*vy];
	var hitBulletAngle = -Math.acos(vx/Math.sqrt(vx*vx+vy*vy));
	
	for (var i=Math.floor(hitTime);i<=hitEndTime;i++) {
		vy -= gravity;
		vx *= airDrag;
		vy *= airDrag;
		x += vx;
		y += vy;
		v.push(x);
		v.push(y);
	}
	
	var part2 = hitEndTime-Math.floor(hitEndTime);
	var position2 = [x + part2*vx, y + part2*vy];
	var hitEndBulletAngle = -Math.acos(vx/Math.sqrt(vx*vx+vy*vy));
	
	drawShape(v, [0, 0], 1, 0, [0, 0, 0, 1], drawTypes.lineStrip);
	drawBullet(position1, bulletScale, hitBulletAngle, [1, 0, 0, 0.75]);
	drawBullet(position2, bulletScale, hitEndBulletAngle, [1, 0, 0, 0.75]);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawDiscrete() {
	restart();
	
	var hitTime = 61;
	var hitEndTime = 68;
	var bulletAngle = Math.PI*0.08;
	var bulletScale = 0.05;
	var initialSpeed = 0.02;
	var vx = initialSpeed*Math.cos(bulletAngle);
	var vy = initialSpeed*Math.sin(bulletAngle);
	var x = -0.7377;
	var y = 0;
	var gravity = 0.0000981;
	var airDrag = 0.9995;
	
	
	drawBullet([x, y], bulletScale, bulletAngle, [0, 0, 0, 1]);
	drawBox(-1, 1, -0.02, 0.02, [0.5, 0.1], 0.4, Math.PI*0.4, [0, 0, 0, 1])
	var v = [x, y];
	for (var i=0;i<hitTime;i++) {
		vy -= gravity;
		vx *= airDrag;
		vy *= airDrag;
		x += vx;
		y += vy;
		v.push(x);
		v.push(y);
	}
	
	var bulletData = [[[x, y], [-Math.acos(vx/Math.sqrt(vx*vx+vy*vy))]]];
	vy -= gravity;
	vx *= airDrag;
	vy *= airDrag;
	x += vx;
	y += vy;
	v.push(x);
	v.push(y);
	bulletData.push([[x, y], [-Math.acos(vx/Math.sqrt(vx*vx+vy*vy))]]);
	
	for (var i=hitTime+1;i<=hitEndTime-1;i++) {
		vy -= gravity;
		vx *= airDrag;
		vy *= airDrag;
		x += vx;
		y += vy;
		v.push(x);
		v.push(y);
	}
	
	bulletData.push([[x, y], [-Math.acos(vx/Math.sqrt(vx*vx+vy*vy))]]);
	vy -= gravity;
	vx *= airDrag;
	vy *= airDrag;
	x += vx;
	y += vy;
	v.push(x);
	v.push(y);
	bulletData.push([[x, y], [-Math.acos(vx/Math.sqrt(vx*vx+vy*vy))]]);
	
	drawShape(v, [0, 0], 1, 0, [0, 0, 0, 1], drawTypes.lineStrip);
	drawBullet(bulletData[0][0], bulletScale, bulletData[0][1], [0, 0, 0, 0.75]);
	drawBullet(bulletData[1][0], bulletScale, bulletData[1][1], [1, 0, 0, 0.75]);
	drawBullet(bulletData[2][0], bulletScale, bulletData[2][1], [1, 0, 0, 0.75]);
	drawBullet(bulletData[3][0], bulletScale, bulletData[3][1], [0, 0, 0, 0.75]);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawDiscreteProblem() {
	restart();
	
	var hitTime = 6;
	var bulletAngle = Math.PI*0.08;
	var bulletScale = 0.05;
	var initialSpeed = 0.2;
	var vx = initialSpeed*Math.cos(bulletAngle);
	var vy = initialSpeed*Math.sin(bulletAngle);
	var x = -0.7377;
	var y = 0;
	var gravity = 0.00981;
	var airDrag = 0.995;
	
	drawBullet([x, y], bulletScale, bulletAngle, [0, 0, 0, 1]);
	drawBox(-1, 1, -0.02, 0.02, [0.5, 0.1], 0.4, Math.PI*0.4, [0, 0, 0, 1])
	var v = [x, y];
	for (var i=0;i<hitTime;i++) {
		vy -= gravity;
		vx *= airDrag;
		vy *= airDrag;
		x += vx;
		y += vy;
		v.push(x);
		v.push(y);
	}
	
	var bulletData = [[[x, y], [-Math.acos(vx/Math.sqrt(vx*vx+vy*vy))]]];
	vy -= gravity;
	vx *= airDrag;
	vy *= airDrag;
	x += vx;
	y += vy;
	v.push(x);
	v.push(y);
	bulletData.push([[x, y], [-Math.acos(vx/Math.sqrt(vx*vx+vy*vy))]]);
	
	drawShape(v, [0, 0], 1, 0, [0, 0, 0, 1], drawTypes.lineStrip);
	drawBullet(bulletData[0][0], bulletScale, bulletData[0][1], [0, 0, 0, 1]);
	drawBullet(bulletData[1][0], bulletScale, bulletData[1][1], [0, 0, 0, 1]);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawBroadBasicPicture() {
	drawShip([-0.625, 0.625], 1/4, 0, [0, 0, 0, 1]);
	drawShip([-0.5, 0.25], 1/8, Math.PI/4, [0, 0, 0, 1]);
	
	drawShip([0.5, 0.5], 3/8, Math.PI, [0, 0, 0, 1]);
	drawShip([0.125, 0.125], 1/8, 0, [0, 0, 0, 1]);
	drawShip([0.625, 0.125], 1/8, 0, [0, 0, 0, 1]);
	drawBullet([0.2, 0.8], 1/8, 0, [0, 0, 0, 1]);
	
	var shape1 = [-1,-0.875, 0.875,1, 1,0.875, -0.875,-1];
	drawShape(shape1, [-0.625, -0.375], 1/4, 0, [0, 0, 0, 1], drawTypes.lineLoop);
	drawShape(shape1, [-0.375, -0.625], 1/4, 0, [0, 0, 0, 1], drawTypes.lineLoop);
	
	var shape2 = [-1,-1, 1,-0.975, 0.98,1, -1,0.95, -0.678,0.89, 0.96,0.98, 0.88,-0.92, -0.85,-0.85];
	drawShape(shape2, [0.5, -0.5], 3/8, 0, [0, 0, 0, 1], drawTypes.lineLoop);
	drawShip([0.5, -0.5], 1/4, 0, [0, 0, 0, 1]);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawAABBpicture() {
	restart();
	drawBroadBasicPicture();
	
	drawAABB(-0.875, -0.375, 0.375, 0.875, [0, 0, 0, 1]);
	drawAABB(-0.5-Math.sqrt(2)*3/32, -0.5+Math.sqrt(2)/16, 0.25-Math.sqrt(2)*3/32, 0.25+Math.sqrt(2)/16, [0, 0, 0, 1]);
	
	drawAABB(0.125, 0.875, 0.125, 0.875, [1, 0, 0, 1]);
	drawAABB(0, 0.25, 0, 0.25, [1, 0, 0, 1]);
	drawAABB(0.5, 0.75, 0, 0.25, [1, 0, 0, 1]);
	drawAABB(0.075, 0.325, 0.7375, 0.8625, [1, 0, 0, 1]);
	
	drawAABB(-0.875, -0.375, -0.625, -0.125, [1, 0, 0, 1]);
	drawAABB(-0.625, -0.125, -0.875, -0.375, [1, 0, 0, 1]);
	
	drawAABB(0.125, 0.875, -0.875, -0.125, [1, 0, 0, 1]);
	drawAABB(0.25, 0.75, -0.75, -0.25, [1, 0, 0, 1]);
	
	drawObjects();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawRotatedBoxesPicture() {
	restart();
	drawBroadBasicPicture();
	
	drawAABB(-0.875, -0.375, 0.375, 0.875, [1, 0, 0, 1]);
	drawBox(-1, 1, -1, 1, [-0.5, 0.25], 1/8, Math.PI/4, [1, 0, 0, 1]);
	
	drawAABB(0.125, 0.875, 0.125, 0.875, [1, 0, 0, 1]);
	drawAABB(0, 0.25, 0, 0.25, [1, 0, 0, 1]);
	drawAABB(0.5, 0.75, 0, 0.25, [1, 0, 0, 1]);
	drawAABB(0.075, 0.325, 0.7375, 0.8625, [1, 0, 0, 1]);
	
	drawAABB(0.125, 0.875, -0.875, -0.125, [1, 0, 0, 1]);
	drawAABB(0.25, 0.75, -0.75, -0.25, [1, 0, 0, 1]);
	
	drawObjects();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawCirclesPicture() {
	restart();
	drawBroadBasicPicture();
	
	drawCircle([-0.65, 0.625], 11/40, [1, 0, 0, 1]);
	drawCircle([-0.5-Math.sqrt(2)*0.00675, 0.25-Math.sqrt(2)*0.00675], 11/80, [1, 0, 0, 1]);
	
	drawCircle([0.5375, 0.5], 33/80, [1, 0, 0, 1]);
	drawCircle([0.1125, 0.125], 11/80, [0, 0, 0, 1]);
	drawCircle([0.6125, 0.125], 11/80, [1, 0, 0, 1]);
	drawCircle([0.2-1/128, 0.8], 17/128, [1, 0, 0, 1]);
	
	drawCircle([-0.625, -0.375], 1/4*Math.sqrt(113/64), [1, 0, 0, 1]);
	drawCircle([-0.375, -0.625], 1/4*Math.sqrt(113/64), [1, 0, 0, 1]);
	
	drawCircle([0.475, -0.5], 11/40, [1, 0, 0, 1]);
	drawCircle([0.4985, -0.5015], 0.528, [1, 0, 0, 1]);
	
	drawObjects();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawCollissionBins() {
	restart();
	drawBroadBasicPicture();
	
	
	var bins = [
	[1,1,1,1,1,1,0,0,0,1,2,2,2,1,1,1,1,1],
	[1,1,1,1,1,1,0,0,0,1,2,2,2,1,1,1,1,1],
	[1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1],
	[1,1,2,2,2,1,0,0,0,0,1,1,1,1,1,1,1,1],
	[0,0,1,1,1,0,0,0,0,1,2,2,1,1,2,2,2,1],
	[0,0,1,1,1,0,0,0,0,1,2,2,1,1,2,2,2,1],
	[0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,0,0,0,0,1,2,2,2,2,2,2,1],
	[1,1,2,2,2,2,1,1,0,0,1,2,2,2,2,2,2,1],
	[1,1,2,2,2,2,1,1,0,0,1,2,2,2,2,2,2,1],
	[1,1,2,2,2,2,1,1,0,0,1,2,2,2,2,2,2,1],
	[1,1,2,2,2,2,1,1,0,0,1,2,2,2,2,2,2,1],
	[0,0,1,1,1,1,1,1,0,0,1,2,2,2,2,2,2,1],
	[0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1]];
	
	var binsN = 20;
	drawBins(binsN);
	drawBasedOnColor(1, 1, bins, [[0, 0, 0, 0], [0, 0, 0, 0.5], [0, 0, 0, 0.75]], binsN);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawSomething(n = 10, scale = 0.9) {
	restart();
	
	var v = [];
	for (var i=0;i<n;i++) {
		var x = 2*scale*i/(n-1)-scale;
		v.push(x);
		v.push(-scale);
		v.push(-scale);
		v.push(-x);
	}
	drawShape(v, [0, 0], 1, 0, [0, 0, 0, 1], drawTypes.lines);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawVertexShaderExample() {
	restart();
	
	var scale = 0.15;
	
	var shape1 = [-1,-1, 1,-1, 1,1, -1,-1, -1,1, 1,1];
	
	var shape2 = [-1,-1, 0.5,-1, 0.5,0.5, -1,-1, -1,1, 0.5,0.5];
	for (var i=0;i<4;i++) {
		for (var j=0;j<shape1.length/2;j++) {
			shape1[2*j+1] *= -1;
			if (i == 2) shape1[2*j] *= -1;
		}
		drawShape(shape1, [-0.75+0.4*Math.floor(i/2), 0.5+scale*(i%2==0 ? -1 : 1)], scale, 0, [0, 0, 0, 1], drawTypes.lineStrip);
		for (var j=0;j<shape2.length/2;j++) {
			shape2[2*j+1] *= -1;
			if (i == 2) shape2[2*j] *= -1;
		}
		drawShape(shape2, [0.3+0.4*Math.floor(i/2), 0.5+scale*(i%2==0 ? -1 : 1)], scale, 0, [0, 0, 0, 1], drawTypes.lineStrip);
	}
	drawArrow([0, 0.5], 0.05, 0.1, 0, [0,0,0,1]);
	
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawCell(x, y, gridSize = 20) {
	fillBin(x, y, 0.5, gridSize);
}

function drawPixelShaderExample() {
	restart();
	
	var gridSize = 20;
	for (var i=1;i<gridSize;i++) {
		drawShape([-0.9,0, 0.9,0], [0, 2*i/gridSize-1], 1, 0, [0, 0, 0, 1], drawTypes.lines);
		drawShape([0,-0.9, 0,0.9], [2*i/gridSize-1, 0], 1, 0, [0, 0, 0, 1], drawTypes.lines);
	}
	
	drawShape([-0.85,-0.85, -0.15,0.85, 0.85,-0.55], [0, 0], 1, 0, [0, 0, 0, 1], drawTypes.lineLoop);
	
	var cells = [];
	for (var i=0;i<gridSize;i++) {
		cells[i] = [];
		for (var j=0;j<gridSize;j++) cells[i][j] = false;
	}
	
	for (var i=1;i<5;i++) cells[1][i] = true;
	for (var i=1;i<10;i++) cells[2][i] = true;
	for (var i=2;i<16;i++) cells[3][i] = true;
	for (var i=2;i<19;i++) cells[4][i] = true;
	for (var i=2;i<19;i++) cells[5][i] = true;
	for (var i=3;i<18;i++) cells[6][i] = true;
	for (var i=3;i<17;i++) cells[7][i] = true;
	for (var i=4;i<16;i++) cells[8][i] = true;
	for (var i=4;i<16;i++) cells[9][i] = true;
	for (var i=5;i<15;i++) cells[10][i] = true;
	for (var i=5;i<14;i++) cells[11][i] = true;
	for (var i=5;i<14;i++) cells[12][i] = true;
	for (var i=6;i<13;i++) cells[13][i] = true;
	for (var i=6;i<12;i++) cells[14][i] = true;
	for (var i=7;i<11;i++) cells[15][i] = true;
	for (var i=7;i<11;i++) cells[16][i] = true;
	for (var i=7;i<10;i++) cells[17][i] = true;
	for (var i=8;i<9;i++) cells[18][i] = true;
	
	for (var i=0;i<gridSize;i++) {
		for (var j=0;j<gridSize;j++) {
			if (cells[i][j]) drawCell(j, i);
		}
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawSweepAndPrune() {
	restart();
	drawBroadBasicPicture();
	var c1 = [1, 0, 0, 0.5];
	drawSimpleLine([-0.95,-0.95, -0.95,0.95], [1, 0, 0, 1]);
	drawHorizontalLine(-0.75, -0.95, 0.875, c1);
	drawHorizontalLine(-0.75, -0.95, 0.375, c1);
	
	drawHorizontalLine(-0.5, -0.95, 0.338, c1);
	drawHorizontalLine(-0.46, -0.95, 0.117, c1);
	
	drawHorizontalLine(0.075, -0.95, 0.862, c1);
	drawHorizontalLine(0.075, -0.95, 0.738, c1);
	
	drawHorizontalLine(0.6875, -0.95, 0.875, c1);
	drawHorizontalLine(0.6875, -0.95, 0.125, c1);
	
	drawHorizontalLine(0.0625, -0.95, 0.25, c1);
	drawHorizontalLine(0.0625, -0.95, 0, c1);
	
	drawHorizontalLine(0.5625, -0.95, 0.25, c1);
	drawHorizontalLine(0.5625, -0.95, 0, c1);
	
	drawHorizontalLine(-0.405, -0.95, -0.125, c1);
	drawHorizontalLine(-0.845, -0.95, -0.625, c1);
	
	drawHorizontalLine(-0.155, -0.95, -0.375, c1);
	drawHorizontalLine(-0.595, -0.95, -0.875, c1);
	
	drawHorizontalLine(0.865, -0.95, -0.125, c1);
	drawHorizontalLine(0.125, -0.95, -0.875, c1);
	
	drawHorizontalLine(0.375, -0.95, -0.25, c1);
	drawHorizontalLine(0.375, -0.95, -0.75, c1);
	
	var c2 = [0, 0, 1, 0.5];
	drawSimpleLine([-0.95,-0.95, 0.95,-0.95], [0, 0, 1, 1]);
	drawVerticalLine(-0.875, 0.625, -0.95, c2);
	drawVerticalLine(-0.375, 0.625, -0.95, c2);
	
	drawVerticalLine(-0.6325, 0.2925, -0.95, c2);
	drawVerticalLine(-0.412, 0.252, -0.95, c2);
	
	drawVerticalLine(0.075, 0.75, -0.95, c2);
	drawVerticalLine(0.325, 0.8, -0.95, c2);
	
	drawVerticalLine(0.125, 0.5, -0.95, c2);
	drawVerticalLine(0.875, 0.5, -0.95, c2);
	
	drawVerticalLine(0, 0.125, -0.95, c2);
	drawVerticalLine(0.25, 0.125, -0.95, c2);
	
	drawVerticalLine(0.5, 0.125, -0.95, c2);
	drawVerticalLine(0.75, 0.125, -0.95, c2);
	
	drawVerticalLine(-0.875, -0.595, -0.95, c2);
	drawVerticalLine(-0.375, -0.155, -0.95, c2);
	
	drawVerticalLine(-0.625, -0.845, -0.95, c2);
	drawVerticalLine(-0.125, -0.405, -0.95, c2);
	
	drawVerticalLine(0.125, -0.875, -0.95, c2);
	drawVerticalLine(0.875, -0.866, -0.95, c2);
	
	drawVerticalLine(0.25, -0.5, -0.95, c2);
	drawVerticalLine(0.75, -0.5, -0.95, c2);
	
	drawSimpleLine([0.5, 0.5, 0.2, 0.8], [1, 0, 0, 1]);
	drawSimpleLine([0.125, 0.125, 0.5, 0.5], [1, 0, 0, 1]);
	drawSimpleLine([0.625, 0.125, 0.5, 0.5], [1, 0, 0, 1]);
	
	drawSimpleLine([-0.625, -0.375, -0.375, -0.625], [1, 0, 0, 1]);
	
	drawSimpleLine([0.5, -0.5, 0.85, -0.5], [1, 0, 0, 1]);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawQuadtree() {
	restart();
	drawBroadBasicPicture();
	
	drawSimpleLine([-1, 0, 1, 0], [0, 0, 0, 1]);
	drawSimpleLine([0, -1, 0, 1], [0, 0, 0, 1]);
	drawSimpleLine([0.5, 0, 0.5, 1], [0, 0, 0, 1]);
	drawSimpleLine([0, 0.5, 1, 0.5], [0, 0, 0, 1]);
	drawSimpleLine([0.25, 0, 0.25, 0.5], [0, 0, 0, 1]);
	drawSimpleLine([0, 0.25, 0.5, 0.25], [0, 0, 0, 1]);
	drawSimpleLine([0.75, 0, 0.75, 0.5], [0, 0, 0, 1]);
	drawSimpleLine([0.5, 0.25, 1, 0.25], [0, 0, 0, 1]);
	
	fillBin(0, 0, 0.75, 2);
	fillBin(1, 0, 0.75, 2);
	
	fillBin(0, 1, 0.75, 2);
	
	fillBin(4, 4, 0.75, 8);
	fillBin(4, 5, 0.5, 8);
	fillBin(5, 4, 0.5, 8);
	fillBin(5, 5, 0.5, 8);
	
	fillBin(6, 4, 0.75, 8);
	fillBin(6, 5, 0.5, 8);
	fillBin(7, 4, 0.5, 8);
	fillBin(7, 5, 0.5, 8);
	
	fillBin(2, 3, 0.75, 4);
	fillBin(3, 3, 0.5, 4);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawBoundingVolumesHierarchy() {
	restart();
	drawBroadBasicPicture();
	
	var tc = [[1, 0, 0, 1], [0.875, 0, 0, 1], [0.75, 0, 0, 1],[0.5, 0, 0, 1]];
	
	drawAABB(-0.875, -0.375, 0.375, 0.875, black);
	drawAABB(-0.5-Math.sqrt(2)*3/32, -0.5+Math.sqrt(2)/16, 0.25-Math.sqrt(2)*3/32, 0.25+Math.sqrt(2)/16, black);
	drawAABB(-0.875, -0.375, 0.25-Math.sqrt(2)*3/32, 0.875, red);
	
	drawAABB(-0.875, -0.375, -0.625, -0.125, black);
	drawAABB(-0.625, -0.125, -0.875, -0.375, black);
	drawAABB(-0.875, -0.125, -0.875, -0.125, red);
	drawAABB(-0.875, -0.125, -0.875, 0.875, red);
	
	drawAABB(0.075, 0.325, 0.7375, 0.8625, black);
	drawAABB(0.125, 0.875, 0.125, 0.875, black);
	drawAABB(0.075, 0.875, 0.125, 0.875, red);
	
	drawAABB(0, 0.25, 0, 0.25, black);
	drawAABB(0.5, 0.75, 0, 0.25, black);
	drawAABB(0, 0.75, 0, 0.25, red);
	drawAABB(0, 0.875, 0, 0.875, red);
	
	drawAABB(0.125, 0.875, -0.875, -0.125, red);
	drawAABB(0.25, 0.75, -0.75, -0.25, black);
	drawAABB(0, 0.875, -0.875, 0.875, red);
	
	drawAABB(-0.875, 0.875, -0.875, 0.875, red);
	
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawPixelPerfect() {
	restart();
	var binsN = 27;
	drawBins(binsN);
	
	var mario = [
		[0,0,0,1,1,1,1,1,0,0,0,0],
		[0,0,1,1,1,1,1,1,1,1,1,0],
		[0,0,1,1,1,1,1,1,1,0,0,0],
		[0,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1],
		[0,1,1,1,1,1,1,1,1,1,1,0],
		[0,0,0,1,1,1,1,1,1,1,0,0],
		[0,0,1,1,1,1,1,1,0,0,0,0],
		[0,1,1,1,1,1,1,1,1,1,1,0],
		[1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1],
		[0,0,1,1,1,0,0,1,1,1,0,0],
		[0,1,1,1,0,0,0,0,1,1,1,0],
		[1,1,1,1,0,0,0,0,1,1,1,1]];
	
	drawBinary(1, 3, mario, [0, 0, 0, 0], [1, 0, 0, 1], binsN);
	
	var goomba = [
		[0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
		[0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
		[0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
		[0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
		[0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
		[0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0],
		[0,0,1,1,1,1,1,0,0,1,1,1,1,1,0,0]];
		
	drawBinary(10, 12, goomba, [0, 0, 0, 0], [0, 0, 1, 0.5], binsN);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function toLines(model, f) {
	var newModel = [];
	for (var i=0;i<model.length/2;i++) {
		newModel[4*i] = model[2*i];
		newModel[4*i+1] = model[2*i+1];
		var p = f(model[2*i], model[2*i+1]);
		newModel[4*i+2] = p[0];
		newModel[4*i+3] = p[1];
	}
	return newModel;
}

function drawNarrow() {
	restart();
	
	var shape1 = [-0.6,0.8,
		0, 0.8,
		-0.4,0.4,
		-0.8,0];
	drawShape(shape1, [0, 0], 1, 0, black, drawTypes.lineLoop);
	drawShape(shape1, [0, 0], 1, 0, black, drawTypes.points, 5);
	
	var shape2 = [-0.8,0,
		-0.4,-0.4,
		0,-0.2,
		-0.2,0.2,
		-0.4,0.4];
	drawShape(shape2, [0, 0], 1, 0, black, drawTypes.lineLoop);
	drawShape(shape2, [0, 0], 1, 0, black, drawTypes.points, 5);
	
	var shape3 = [0,0.2,
		0.2,-0.4,
		0.4,-0.6,
		0.6,0.4,
		0.4,0.6];
	drawShape(shape3, [0, 0], 1, 0, black, drawTypes.lineLoop);
	drawShape(shape3, [0, 0], 1, 0, black, drawTypes.points, 5);
	
	drawShape([0,0.2, 0,0, 0,0.2, 0.13,0.04], [0, 0], 1, 0, blue, drawTypes.lines);
	drawShape(toLines([-0.8,0, 0,0.8, 0,-0.2, 0,0.2, 0.6,0.4], function(x,y) { return [x+(-y-0.8)/(-3), -0.8];}), [0, 0], 1, 0, blue, drawTypes.lines);
	drawHorizontalLine(-0.8, 1, -0.8, black);
	drawHorizontalLine(0.333, 1, -0.81, blue);
	drawHorizontalLine(-0.533, 0.2, -0.81, blue);
	drawHorizontalLine(-0.533, 0.533, -0.82, red);
}drawNarrow();