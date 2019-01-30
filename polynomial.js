let P = (a, x) => {
	return new Polynom(a, x)
};

function print_polygon(pol, html = false) {
	output = '';
	for (const p of pol) {
		if (p.constant < 0)
			output += " - " + (html ? p.neg().getHTML() : p.neg().get());
		else
			output += " + " + (html ? p.getHTML() : p.get());
	}
	return output.slice(1);
}

function clone_poly_array(arr)
{
	output = [];
	for (const p of arr) {
		output.push(p.clone())
	}

	return output;
}

function index_of_poly_exponent(arr, exp)
{
	for (let i = 0; i < arr.length; i++) {
		const element = arr[i];
		if (element.exponent == exp)
			return i;
	}
	return -1;
}

function divide(a, b) {
	let result = [];
	let reminder = [];
	let divider = clone_poly_array(b);
	do {
		if (a[0].compare_poly(b[0]) >= 0) {
			reminder = [];
			result.push(a[0].div_poly(b[0]));

			for (let i = 0; i < divider.length; i++) {
				divider[i] = divider[i].mul_poly(result[result.length - 1]);
			}

			let len = a[0].exponent + 1
			for (let i = 0; i < len; i++) {
				const aidx = index_of_poly_exponent(a, i);
				const didx = index_of_poly_exponent(divider, i);

				if (didx == -1)
				{
					reminder.push(a[aidx])
					continue;
				}

				if (aidx == -1)
				{
					reminder.push(divider[didx].neg())
					continue;
				}

				let sub_result = a[aidx].sub_poly(divider[didx]);
				if (sub_result.constant != 0)
					reminder.push(sub_result)
			}

			a = clone_poly_array(reminder).reverse();
			divider = clone_poly_array(b);
		} else
			break;
	} while (true);
	reminder.reverse();
	return {reminder, result};
}

let a = [P(4, 4), P(3, 3), P(2, 2), P(1, 1), P(1, 0)];
let b = [P(2, 2), P(3, 1), P(1, 0)];
let r = divide(a, b);
$("#inputCalc").val(print_polygon(a) + " / " + print_polygon(b))
$("#outputCalc").html(print_polygon(r.result, true) + " | " + print_polygon(r.reminder, true));
console.table({Result: print_polygon(r.result), Reminder: print_polygon(r.reminder)});