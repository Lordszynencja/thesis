class Drawing {
	draw() {
		draw(this.pos, this.color, this.pointSize, this.drawType);
	}
	
	constructor(points, color, pointSize, drawType) {
		this.pos = points;
		this.color = [];
		this.pointSize = [];
		for (var i=0;i<points.length/2;i++) {
			this.color[4*i] = color[0];
			this.color[4*i+1] = color[1];
			this.color[4*i+2] = color[2];
			this.color[4*i+3] = color[3];
			this.pointSize[i] = pointSize;
		}
		this.drawType = drawType;
	}
}