//When document is fully ready
$(document).ready( function() {
	//Create a place holder grid
	var grid = new Grid([]);
	
	//Add in the event on change
	$('#equation').change( function () {
		var valid = validateEquation(this.value);
		if ( valid ) alert(valid);
		else grid = new Grid(generateGraphData(this.value)); //constructs a new grid
	});
});

//Validates the text input to get something that looks like an equation
function validateEquation (equation) {
	if ( equation.length > 25 ) 
		return "Must not contain more than 25 symbols."; 
	else if ( equation.match(/[^\dxy\.\-+=*\/\(\)]+/) )
		return "Does not contain valid equation symbols: 0123456789xy.-+=*/()";
	else if ( equation.match(/[\dx*\-+\/]y=/)) //no garbage before y= (why force the user to enter y=...)
		return "Must start with y=";
	else if ( equation.match(/[^y]*y[^y]*y[^y]*/))  //only one y
		return "Must contain one y.";
	else if ( equation.match(/[^=]*=[^=]*=[^=]*/))  //only one =
		return "Must contain one equals sign.";
	else if ( equation.match(/[^x]*x[^x]*x[^x]*/))  //only one x
		return "Must contain one x.";
	else if ( equation.match(/([^\dxy][+*\/][\dxy])|([\dxy][-+\/*][^\dxy])|([\d][xy])/)) //symbol placement
		return "Operators must be between variables or numbers";
	else
		return;
}

/*Determine the graph data for the equation*/
function generateGraphData(equation) {
	var data = [];
	var domain = Math.round(Math.random()*7)+3; //create a domain somewhere around 3-10 characters.
	for ( var x = -1*domain; x < domain+1; x++)
	{
		/* jshint ignore:start */
		var y = eval(equation); //will solve for equation!
		/* jshint ignore:end */
		data.push(x);
		data.push(y);
	}
	return data;
}