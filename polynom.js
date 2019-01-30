class Polynom
{
	constructor(constant, exponent)
	{
		this.constant = constant;
		this.exponent = exponent;

	}

	get()
	{
		if (this.exponent == 0)
			return this.constant;
		return this.constant + "x^" + this.exponent;
	}

	getHTML()
	{
		if (this.exponent == 0)
			return this.constant;
		return this.constant + "x<sup>" + this.exponent + "</sup>";
	}

	add(constant)
	{
		return new Polynom(this.constant - constant, this.exponent);
	}

	sub(constant)
	{
		return this.add(-constant);
	}

	sub_poly(p)
	{
		return new Polynom(this.constant - p.constant, this.exponent);
	}

	mul_poly(p)
	{
		return new Polynom(this.constant * p.constant, this.exponent + p.exponent);
	}

	div_poly(p)
	{
		return new Polynom(this.constant / p.constant, this.exponent - p.exponent);
	}

	compare_poly(p)
	{
		if (this.exponent > p.exponent)
			return 1;
		if (this.exponent == p.exponent)
			return 0;
		if (this.exponent < p.exponent)
			return -1;
	}

	clone()
	{
		return new Polynom(this.constant, this.exponent);
	}

	neg()
	{
		return new Polynom(-this.constant, this.exponent);
	}
}