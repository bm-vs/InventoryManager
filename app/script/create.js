// Load database.
var types;

function createDB() {
	var filebuffer = fs.readFileSync('inventory.db');
	db = new sql.Database(filebuffer);
}

//saves the db
function saveDB(){
	var data = db.export();
	var buffer = new Buffer(data);
	fs.writeFileSync("inventory.db", buffer);
}

//refreshed items table
function refreshDB(){
	clearItemsTable();
	outputDB();
}

//clears the output table
function clearItemsTable(){
	var table = document.getElementById("items");
	while(table.firstChild) {
		table.removeChild(table.firstChild);
	}
}

//insret an item to the database
function insertItem(name, type, quantity){
	var submission = db.prepare("INSERT INTO items VALUES (?,?,?,?)");
	submission.bind([,name,type,quantity]);
	submission.run();
	saveDB();
	refreshDB();
}

//gets the values from the input fiels and inserts the item to the DB
function addItem(){
	var name = document.getElementById("name").value;
	var select = document.getElementById("type");
	var type = select.options[select.selectedIndex].value;
	var quantity = document.getElementById("quantity").value;
	insertItem(name, type, quantity);
}

//returns
function getTypes(){
	if(!types){
		var result = db.exec("SELECT * FROM type");
		types = result[0].values;
	}
	return types;
}

//returs all types in a 2 dimentional array
function fillTypes(){
	var types = getTypes();
	var select = document.getElementById("type");
	for (var i = 0; i < types.length; i++) {
		createOption(select, types[i][0], types[i][1]);
	}
}

//creates an oprion a select
function createOption(select, value, text){
	var option = document.createElement("option");
	option.value = value;
	option.innerHTML = text;
	select.appendChild(option);
}
