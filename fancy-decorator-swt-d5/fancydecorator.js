const http = require('http')

// TODO: implement function debugDecorator here

const debugDecorator = f => {
	let times = 0;
	
	return (x) => {
		console.log(`function ${f.name} called ${++times} times (p = ${x})`);
		f(x);
	}
}

// TODO: implement class RandomDelayDecorator here

const RandomDelayDecorator = function() {
	this.max = 500;

	this.setMaxDelay = ms => this.max = (0.5 + 0.5 * Math.random()) * ms;
	this.decorate = f => p => setTimeout(f,this.max,p);
}

// TODO: implement server function

/*

Should do something like this, but waiting between 5 and 10 milliseconds between printing each dot.

const serverFunction = (request, response) => {
	//Sending HTTP Response headers
	response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
	response.write('Loading')
	
	for (var count = 0; count < 1024; count++) {
		response.write('.')
	}

	response.write(' done!')
	response.end()
}
*/

const serverFunction = (request, response) => {
	//Sending HTTP Response headers
	response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
	response.write('Loading')
	
	// ...
}

//http.createServer(serverFunction).listen(8081);

console.log('Server running at http://localhost:8081/');
// Tests:


console.log("--------------------------------------------------")
console.log("Tests for debugDecorator")
console.log("--------------------------------------------------")

const test1 = debugDecorator(function f1(x) { console.log("  f1 function called with x = " + x); return -2 * x })

console.log("  Is return value -6? " + (test1(3) === -6) + "\n")
console.log("  Is return value -8? " + (test1(4) === -8) + "\n")
console.log("  Is return value NaN? " + (isNaN(test1())) + "\n")

const test2 = debugDecorator(function f2(x) { console.log("  f2 function called with x = " + x); })

console.log("  Is return value undefined? " + (test2(1) === undefined) + "\n")
console.log("  Is return value undefined? " + (test2() === undefined) + "\n")

console.log("--------------------------------------------------")
console.log("Tests for RandomDelayDecorator")
console.log("--------------------------------------------------")

const rdd1 = new RandomDelayDecorator()
const rdd2 = new RandomDelayDecorator()

const f3 = x => { console.log("  f3 function called with " + x); return "f3: " + x };
const f4 = x => { console.log("  f4 function called with " + x); return "f4: " + x };

rdd1.setMaxDelay(200)

const test4 = rdd1.decorate(f3)
const test5 = rdd2.decorate(f3)
const test6 = debugDecorator(rdd2.decorate(debugDecorator(f4)))

console.log("launching test4 ok? " + (test4("at [100, 200)") === undefined))
console.log("launching test4 ok? " + (test4("at [100, 200)") === undefined))
console.log("launching test5 ok? " + (test5("at [0, 0]") === undefined))
console.log("launching test6 ok? " + (test6("at [0, 0]") === undefined))

rdd1.setMaxDelay(0)
rdd2.setMaxDelay(500)

console.log("launching test4 ok? " + (test4("at [0, 0)") === undefined))
console.log("launching test6 ok? " + (test6("at [250, 500]") === undefined))

console.log("waiting...\n")
