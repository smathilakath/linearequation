//WARNING the code you are about to see may cause cardiac arrest.

//You must have data when you call the grid constructor
//Everything else is optional
function Grid(data, graph, maxWidth, maxHeight, padding) {
	//This initialization allows for multiple constructors - how cool is that?!
	this.padding = padding ? padding : 10;
	this.maxWidth = maxWidth ? maxWidth : 500;
	this.maxHeight = maxHeight ? maxHeight : 500;
	this.graph = graph ? graph : $('#graph');
	this.midX = 250 + this.padding;
	this.midY = 250 + this.padding;
	this.data = data;
	//Determines the largest positive or negative y value out of a data series.
	this.calculateRange = function() 
	{
		if (this.data.length < 2)
			return 5;
		else 
		{
			var largeY = data[1];
			for ( var i = 1; i < data.length; i=i+2) {
				if ( Math.abs(data[i]) > Math.abs(largeY))
					largeY = data[i];
			}
			return Math.abs( Math.ceil(largeY) ) +1;
		}
	};
	//Determines the largest positive or negative x value out of data series.
	this.calculateDomain = function() 
	{
		if (this.data.length < 2)
			return 5;
		else 
		{
			var largeX = data[0];
			for ( var i = 0; i < data.length; i=i+2) {
				if ( Math.abs(data[i]) > Math.abs(largeX))
					largeX = data[i];
			}
			return Math.abs( Math.ceil(largeX)) +1;
		}
	};
	//Adds all of the data points to the grid from our data array
 	this.plotData = function() {
 		var group = document.createElementNS("http://www.w3.org/2000/svg", "g");
		group.setAttribute("id", "data");
		this.graph.append(group);
		
		for (var i = 0; i < this.data.length; i=i+2 ) 
		{
			var xPos = this.data[i]*(this.maxWidth/(this.domain*2))+this.midX;
			var yPos = (-1*this.data[i+1]*(this.maxHeight/(this.range*2)))+this.midY;

			var point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			point.setAttribute("r", 3);
			point.setAttribute("cx", xPos);
			point.setAttribute("cy", yPos);
			point.setAttribute("style", "stroke:rgb(70,70,200);stroke-width:1;");
			group.appendChild(point);

			var lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
			lbl.setAttribute("x", xPos-23);
			lbl.setAttribute("y", yPos-5);
			lbl.setAttribute('fill', '#000');
			lbl.textContent = "("+this.data[i].toFixed(1)+","+this.data[i+1].toFixed(1)+")";
			group.appendChild(lbl);
		}
 	};
 	//Constructs the y axis tick marks.
	this.buildAxisY = function() {
		//BUILD Y AXIS
		var startY = this.padding;
		var endY = this.maxHeight + this.padding;

		group = document.createElementNS("http://www.w3.org/2000/svg", "g");
		group.setAttribute("id", "yAxis");
		this.graph.append(group);

		//Add Main Y line
		var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		line.setAttribute("x1", this.midX);
		line.setAttribute("y1", startY);
		line.setAttribute("x2", this.midX);
		line.setAttribute("y2", endY);
		line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:1;");
		group.appendChild(line);

		var y = startY;
		while ( y <= endY ) 
		{
			line = document.createElementNS("http://www.w3.org/2000/svg", "line");
			line.setAttribute("x1", this.midX-10);
			line.setAttribute("y1", y);
			line.setAttribute("x2", this.midX+10);
			line.setAttribute("y2", y);
			line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:1;");
			group.appendChild(line);

			y += this.maxHeight/(this.range*2); 
		}

		//Add labels
		var lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
		lbl.setAttribute("x", this.midX-25);
		lbl.setAttribute("y", startY+10);
		lbl.setAttribute('fill', '#000');
		lbl.textContent = this.range;
		group.appendChild(lbl);

		lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
		lbl.setAttribute("x", this.midX-25);
		lbl.setAttribute("y", endY+10);
		lbl.setAttribute('fill', '#000');
		lbl.textContent = this.range*-1;
		group.appendChild(lbl);
	};
	//Constructs the x axis tick marks
	this.buildAxisX = function() {
		//BUILD X AXIS
		var startX = this.padding;
		var endX = this.maxWidth + this.padding;
		
		var group = document.createElementNS("http://www.w3.org/2000/svg", "g");
		group.setAttribute("id", "xAxis");
		this.graph.append(group);

		//Add Main X line
		var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		line.setAttribute("x1", startX);
		line.setAttribute("y1", this.midY);
		line.setAttribute("x2", endX);
		line.setAttribute("y2", this.midY);
		line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:1;");
		group.appendChild(line);

		//Add cross lines of x
		var x = startX;
		while ( x <= endX ) 
		{
			line = document.createElementNS("http://www.w3.org/2000/svg", "line");
			line.setAttribute("x1", x);
			line.setAttribute("y1", this.midY-10);
			line.setAttribute("x2", x);
			line.setAttribute("y2", this.midY+10);
			line.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:1;");
			group.appendChild(line);

			x += this.maxWidth/(this.domain*2); 
		}

		//Add labels
		var lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
		lbl.setAttribute("x", startX-10);
		lbl.setAttribute("y", this.midY+25);
		lbl.setAttribute('fill', '#000');
		lbl.textContent = this.domain*-1;
		group.appendChild(lbl);

		lbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
		lbl.setAttribute("x", endX-10);
		lbl.setAttribute("y", this.midY+25);
		lbl.setAttribute('fill', '#000');
		lbl.textContent = this.domain;
		group.appendChild(lbl);
	};
	//Clears out the data in the svg
	this.clearGrid = function() {
		$('#xAxis').remove();
		$('#yAxis').remove();
		$('#data').remove();
	};
	/*Setup the lines for a basic graph*/
	this.setupGrid = function() {
		this.clearGrid();
		//Set dimensions of svg
		this.graph.width(this.maxWidth+this.padding*2);
		this.graph.height(this.maxHeight+this.padding*2);

		this.range = this.calculateRange();
		this.domain = this.calculateDomain();
		this.buildAxisX();
		this.buildAxisY();
		this.plotData();
	};
	this.setupGrid();
}