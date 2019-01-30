

function join_same_polynoms(arr)
{
	console.table(arr)
	let result = [];
	let temp = clone_poly_array(arr);
	for (const poly of arr) {
		let exp = poly.exponent;
		let constant = 0;
		for (const temp_poly of temp) {
			if (temp_poly && temp_poly.exponent === exp)
				constant += temp_poly.constant;
		}

		for (let i = 0; i < temp.length; i++) {
			if (temp[i] && temp[i].exponent == exp)
				delete temp[i];
		}

		if (constant !== 0)
			result.push(new Polynom(constant, exp));
	}

	return result;
}

function parse_input(input)
{
	if (input.length == 0)
		return;
	result = [];
	let polynom_rgx = new RegExp(/([+-]?[^-+]+)/, "g");
	let alpha_rgx = new RegExp(/(^[+-]?\d+)|(\d+$)/, "g");

	let match;

	while ((match = polynom_rgx.exec(input)) !== null){
		let parts = match[0].split("x");
		console.log(match[0]);
		let constant = 1;
		if (parts[0])
		{
			constant = Number(parts[0]);
			if (isNaN(constant))
			{
				if (parts[0].length == 1)
					if (parts[0].match(/[+-]?/))
						if (parts[0] == "-")
							constant = -1;
						else
							constant = 1;
			}
		}
		let exponent = 0;
		if (parts[1] != undefined)
		{
			if (parts[1].length == 0)
				exponent = 1;
			else
				exponent = Number(parts[1].slice(1));
		}

		if (isNaN(constant) || isNaN(exponent))
		{
			throw new Error("Constant or Exponent is NaN");
		}
		result.push(new Polynom(constant, exponent));
	}

	return join_same_polynoms(result);
}