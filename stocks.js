const { get, createServer } = require('http');
const { readFile } = require('fs');
const [,,...args] = process.argv;


get(`http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${args[0]}`, res => {
	const statusCode = res.statusCode;
    const contentType = res.headers['content-type'];


    let error;
    if (statusCode !== 200) {
    	error = new Error(`Request Failed.\n` +
                      `Status Code: ${statusCode}`);
    } else if (!/^text\/javascript/.test(contentType)) {
   	    error = new Error(`Invalid content-type.\n` +
                      `Expected text/javascript but received ${contentType}`);
    }
    if (error) {
    	console.log(error.message);
    	// consume response data to free up memory, since we won't use the request body. Until the data is consumed, the 'end' event will not fire. Also, until the data is read it will consume memory that can eventually lead to a 'process out of memory' error.
    	res.resume();
    return;
    }
})
