import React, {useEffect, useState } from 'react'

const XLSX = require("xlsx");

export default function Tester() {
	
	const urlll = "https://vedant080102.github.io/mum-portfoliio-data/mum_portfolio_data.xlsx";

	const getSheetFromURL = async () => {
		var req = new XMLHttpRequest();
		req.open("GET", urlll, true);
		req.responseType = "arraybuffer";

		req.onload = function(e) {
		var workbook = XLSX.read(req.response);

		let worksheets = workbook.SheetNames.map(sheetName => {
			return { sheetName, data: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]) };
		});
		console.log("json:\n", worksheets, "\n\n");
		};

		req.send();

		// await $.get(urlll, (text, status) => {
		// 	console.log("Data Status: " + status);

		// 	// Get document, or throw exception on error
		// 	try {
		// 		// console.log(text);
		// 		// var dataa = new Uint8Array(text);
		// 		// var arr = new Array();
		// 		// for (var i = 0; i != dataa.length; ++i) {
		// 		// 	arr[i] = String.fromCharCode(dataa[i]);
		// 		// }
		// 		// var bstr = arr.join("");

		// 		const workbook = XLSX.read(text.arrayBuffer());
    
		// 		let worksheets = workbook.SheetNames.map(sheetName => {
		// 			return { sheetName, data: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]) };
		// 		});
		// 		console.log("json:\n", JSON.stringify(worksheets), "\n\n");
		// 		// // worksheets.forEach((data) => console.log(data.data));
		// 		// console.log(XLSX.utils.sheet_to_json(worksheets, {
		// 		// 	raw: true
		// 		// }));




		// 		console.log("rs: ", result);

		// 		// var workbook = XLSX.read(text, {type : 'binary'});
        //         // var result = {};
        //         // workbook.SheetNames.forEach(function(sheetName) {
		// 		// 	var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
		// 		// 	if (roa.length > 0) {
		// 		// 		result[sheetName] = roa;
		// 		// 	}
		// 		// });
		// 		// console.log("res: ", result);
				
		// 	} catch (e) {
		// 		console.log(e);
		// 	}
		// });
	}

	// const reader = require("g-sheets-api");
	// const readerOptions = {
	// 	apiKey: process.env.REACT_APP_GSHEET_API,
	// 	sheetId: process.env.REACT_APP_SHEET_ID,
	// 	sheetNumber: 1,
	// 	returnAllResults: false,
	// 	// filter: {
	// 	// 	"key to filter on": "value to match",
	// 	// },
	// };


	useEffect(() => {
		try {
			// getSheetFromURL();
			// reader(readerOptions, (results) => {
			// 	/* Do something amazing with the results */
			// 	console.log("data:", results);
			// });
		} catch (e) {
			console.log(e);
		}
	}, [1]);

	// const testAxiosXlsx = async (url) => {
    //     const options = { 
    //         url,
    //         responseType: "arraybuffer",
	// 		mode:"cors"
    //     }
    //     try {
    //         let axiosResponse = await axios(options);
    //         const workbook = XLSX.read(axiosResponse.data);
    
    //         let worksheets = workbook.SheetNames.map(sheetName => {
    //             return { sheetName, data: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]) };
    //         });
    //         console.log("json:\n", JSON.stringify(worksheets), "\n\n");
    //         // console.log("xml:\n", jsontoxml(worksheets, {}));
            
    //     } catch (error) {
    //         console.log(error);
    //     }


    //     // var request = new XMLHttpRequest();
    //     // request.open('GET', url, true);
    //     // // request.send(null);
    //     // request.onreadystatechange = function () {
    //     //     if (request.readyState === 4 && request.status === 200) {
    //     //         // var type = request.getResponseHeader('Content-Type');
    //     //         // if (type.indexOf("text") !== 1) {
    //     //             console.log("op: ", request.responseText);
    //     //         // }
    //     //     }
    //     // }


	// 	// try {
	// 	// 	const workbook = new Excel.Workbook();
	// 	// 	await workbook.xlsx.readFile(url);
	
	// 	// 	console.log(workbook);
	// 	// } catch (error) {
	// 	// 	console.log(error);
	// 	// }

	// 	// const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(url);

	// 	// for await (const worksheetReader of workbookReader) {
	// 	// 	for await (const row of worksheetReader) {
	// 	// 		console.log(row);	
	// 	// 	}
	// 	// }
    // }

    // useEffect(() => testAxiosXlsx("https://1drv.ms/x/s!Asj-nCVWZWrugQp-Afy7zNjQHBN5?download=1"), [1]);
    // useEffect(() => testAxiosXlsx("https://cors-anywhere.herokuapp.com/https://somaiya0-my.sharepoint.com/:x:/g/personal/vedant_sarnobat_somaiya_edu1/EWWQgfWRMZ9NuEeGK913NFABqxiPU9XawgOAfZRX4YXrZA?download=1"), [1]);
	// useEffect(()=> testAxiosXlsx("https://1drv.ms/x/s!Asj-nCVWZWrugQohTghskfM9Js9y"), [1]);

	return <>
		<h1>hiya</h1>
	</>
}

