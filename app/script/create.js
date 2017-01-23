// Load database.
function createDB() {
	var filebuffer = fs.readFileSync('inventory.db');
	db = new sql.Database(filebuffer);
	/*
	var stmt = db.prepare("INSERT INTO items VALUES (?,?,?,?)");
	stmt.bind([6,"parafuso 2mm","parafuso",]);
	stmt.run();
	
	var data = db.export();
	var buffer = new Buffer(data);
	fs.writeFileSync("inventory.db", buffer);
	*/
}