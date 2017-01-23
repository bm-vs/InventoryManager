// Load database.
function createDB() {
	var filebuffer = fs.readFileSync('inventory.db');
	db = new sql.Database(filebuffer);
}

//adds an item to the database
function addItem(){
	var name = document.getElementById("name").value;
	var select = document.getElementById("type");
	var type = select.options[select.selectedIndex].value;
	var quantity = document.getElementById("quantity").value;
	var submission=db.prepare("INSERT INTO items VALUES (?,?,?,?)");
	submission.bind([,name,type,quantity]);
	submission.run();
	var data = db.export();
	var buffer = new Buffer(data);
	fs.writeFileSync("inventory.db", buffer);
	//"refreshes the screen"
	refreshDB();
}

function refreshDB(){
	var table = document.getElementById("items");
	while(table.firstChild) {
		table.removeChild(table.firstChild);
	}
	outputDB();
}

function fillTypes(){
	var result = db.exec("SELECT * FROM type");
	var types = result[0].values;

	var select = document.getElementById("type");
	for (var i = 0; i < types.length; i++) {
		createOption(select, types[i][0], types[i][1]);
	}
}

function createOption(select, value, text){
	var option = document.createElement("option");
	option.value = value;
	option.innerHTML = text;
	select.appendChild(option);
}