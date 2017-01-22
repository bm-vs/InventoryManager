// Module for database
var fs = require('fs');
var sql = require('sql.js');

// Load database.
function createDB() {
	var filebuffer = fs.readFileSync('inventory.db');
	db = new sql.Database(filebuffer);
}

// Output all items
function outputDB() {
	// Get all items from database
	var result = db.exec("SELECT * FROM items");
	var columns = result[0].columns;
	var values = result[0].values;
	
	// Create columns
	var row = document.createElement("tr");
	for (var i = 0; i < columns.length; i++) {
		createRow(row, columns[i], "th");
	}
	document.getElementById("items").appendChild(row);
	
	// Create rows
	for (var i = 0; i < values.length; i++) {
		// Create new row for each item
		var row = document.createElement("tr");
		for (var j = 0; j < columns.length; j++) {
			createRow(row, values[i][j], "td");
		}
		document.getElementById("items").appendChild(row);
	}
}

function createRow(row, value, type) {
	var cell = document.createElement(type);
	var textnode = document.createTextNode(value);
	cell.appendChild(textnode);
	row.appendChild(cell);
}