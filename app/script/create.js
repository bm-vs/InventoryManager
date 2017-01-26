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
	outputItems();

	//delete item on delete button
	$("#items .Delete").on("click", deleteItem);
	//edit item on click
	$("#items .Edit").on("click", editItem);
}

//clears the output table
function clearItemsTable(){
	var table = document.getElementById("items");
	while(table.firstChild) {
		table.removeChild(table.firstChild);
	}
}

//insret an item to the database
function insertItem(name, type, quantity, reference){
	var submission = db.prepare("INSERT INTO items VALUES (?,?,?,?,?)");
	submission.bind([,name,type,quantity,reference]);
	submission.run();
	saveDB();
	refreshDB();
}

//gets the values from the input fiels and inserts the item to the DB
function addItem(){
	var name = document.getElementById("name");
	var select = document.getElementById("type");
	var type = select.options[select.selectedIndex].value;
	var quantity = document.getElementById("quantity");
	var reference = document.getElementById("reference");
	insertItem(name.value, type, quantity.value,reference.value);
	name.value = "";
	quantity.value = "";
	reference.value="";
}

//returs all types in a 2 dimentional array
function getTypes(){
	if(!types){
		var result = db.exec("SELECT * FROM type");
		types = result[0].values;
	}
	return types;
}

//returns the type name of a given type id
function getTypeName(id){
	var types = getTypes()
	var i = 0;
	while(i < types.length && id != types[i][0]){
		i++;
	}
	if(i < types.length){
		return types[i][1];
	}
	return "Type not found";
}

//fills the givven slect with all types
function fillTypes(element){
	var types = getTypes();
	for (var i = 0; i < types.length; i++) {
		createOption(element, types[i][0], types[i][1]);
	}
	return element;
}

//creates an oprion a select
function createOption(select, value, text){
	var option = document.createElement("option");
	option.value = value;
	option.innerHTML = text;
	select.appendChild(option);
}
