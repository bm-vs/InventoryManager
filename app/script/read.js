var SQL_ITEMS_SELALL = "SELECT items.id, items.name, type.name, items.quantity FROM items INNER JOIN type ON type.id = items.type";
var SQL_ITEMS_SEARCH = SQL_ITEMS_SELALL + " WHERE name LIKE ?";

// Output all items
function outputItems() {
	// Get all items from database
	var result = db.exec(SQL_ITEMS_SELALL);
	var columns = result[0].columns;
	var values = result[0].values;

  outputRows(columns, values);
}

// Output search items
function searchItems() {
  clearItemsTable();

	// Get columns
	var result = db.exec();
	var columns = result[0].columns;

	// Get rows
	var search = document.getElementById("search").value.trim();
	var stmt = db.prepare(SQL_ITEMS_SEARCH);
	stmt.bind(['%' + search + '%']);
	var result = [];
	while(stmt.step()) {
		result.push(stmt.get());
	}
  outputRows(columns, result);
}

function outputRows(columns, values) {
    // Create columns
    var row = document.createElement("tr");
    for (var i = 0; i < columns.length; i++) {
        createTextCell(row, columns[i], "th");
    }
    for (var i = 0; i < 2; i++) {
        createTextCell(row, "", "th");
    }
    document.getElementById("items").appendChild(row);

    // Create rows
    for (var i = 0; i < values.length; i++) {
        // Create new row for each item
        var row = document.createElement("tr");
        for (var j = 0; j < columns.length; j++) {
            createTextCell(row, values[i][j], "td");
        }

        // Add edit and delete button
        createButtonCell(row, "edit");
        createButtonCell(row, "delete");
        document.getElementById("items").appendChild(row);
    }
}

function createTextCell(row, value, type) {
    var cell = document.createElement(type);
    var textnode = document.createTextNode(value);
    cell.appendChild(textnode);
    row.appendChild(cell);
}

function createButtonCell(row, value) {
    var cell = document.createElement("td");
    var button = document.createElement("button");
    button.innerHTML = value;
    button.className = value;
    cell.appendChild(button);
    row.appendChild(cell);
}
