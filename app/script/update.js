var editingRow = null;

function editItem(){
	console.log(this);
	var srcButton = $(this);
	var targetRow = srcButton.parent().parent();
	if(editingRow == null){
		editingRow = targetRow;
		startEditingItem(srcButton, editingRow);
	}
	else if(targetRow.is(editingRow)){
		finishEditingItem(srcButton);
	}
}

function startEditingItem(srcButton, row){
	srcButton.html("Save");

	var name = row.children().eq(1);
	name.html($("<input value='" + name.html() + "'>"));

	//this mess is mostly because we are using jquerry and plain javascrip
	var type = row.children().eq(2);
	var select = $(fillTypes(document.createElement("select")));
	type.html(select.val(select.find("option:contains(" + type.html() + ")").val()));

	var quantity = row.children().eq(3);
	quantity.html($("<input type='number' value='" + quantity.html() + "'>"));

	var reference = row.children().eq(4);
	reference.html($("<input value='" + reference.html() + "'>"));
}


function finishEditingItem(srcButton){
	var id = editingRow.children().eq(0).html();
	console.log(id);

	var nameEl = editingRow.children().eq(1);
	var name = nameEl.children().val();
	nameEl.html(name);

	var typeEl = editingRow.children().eq(2);
	var type = typeEl.children().find(":selected").text();
	typeEl.html(type);

	var quantityEl = editingRow.children().eq(3);
	var quantity = quantityEl.children().first().val();
	quantityEl.html(quantity);

	var referenceEl = editingRow.children().eq(4);
	var reference = referenceEl.children().first().val();
	referenceEl.html(reference);

	updateItem(id, name, type, quantity, reference);

	editingRow = null;
	srcButton.html("Edit");
}


function updateItem(id, name, type, quantity, reference){
	var querry = db.prepare("UPDATE items SET name = ?, type = ?, quantity = ?, reference = ? WHERE id = ?");
	querry.bind([name,type,quantity,reference, id]);
	querry.run();

	saveDB();
	refreshDB();
}
