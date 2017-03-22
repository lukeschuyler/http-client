const { get, createServer } = require('http');
const { readFile } = require('fs');
const [,,...args] = process.argv;
const url = `http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters={"Normalized":false,"NumberOfDays":365,"DataPeriod":"Day","Elements":[{"Symbol":"${args[0]}","Type":"price","Params":["c"]}]}`


get(url, res => {
	const statusCode = res.statusCode;
    const contentType = res.headers['content-type'];
    // console.log(res)

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
    	res.resume();
    return;
    }
    let body = '';
	  res.on('data', (buff) => {
	    body += buff.toString()
	  });
	  res.on('end', () => {
	    const data = JSON.parse(body);
	    let quoteArray = data.Elements[0].DataSeries.close.values
	    let sum = quoteArray.reduce((a, b) => {
	    	return a + b
	    })
	    console.log((sum / quoteArray.length).toFixed(2))
	  });

})
