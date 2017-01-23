var SQL_ITEMS_SELALL = "SELECT items.id, items.name, type.name, items.quantity, items.reference " +
												"FROM items INNER JOIN type ON type.id = items.type";
var SQL_ITEMS_SEARCH = SQL_ITEMS_SELALL + " WHERE items.name LIKE ? AND (? = '-1' OR items.type = ?)";

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

	var name = document.getElementById("search_name").value.trim();
	var select = document.getElementById("search_type");
	var type = select.options[select.selectedIndex].value;

	var result = db.prepare(SQL_ITEMS_SEARCH);
	stmt.bind(['%' + name + '%', type, type]);

	var columns = result[0].columns
	var result = [];
	while(result.step()) {
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

function clearSearch(){
	refreshDB();

	$("#search_name").val("");
	$("#search_type").val('2');
}
