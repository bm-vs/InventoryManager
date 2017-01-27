var editingRow = null;

function editItem(){
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
	var id =  parseInt(editingRow.children().eq(0).html());

	var nameEl = editingRow.children().eq(1);
	var name = nameEl.children().val();

	var typeEl = editingRow.children().eq(2);
	var type = parseInt(typeEl.children().find(":selected").val());

	var quantityEl = editingRow.children().eq(3);
	var quantity =  parseInt(quantityEl.children().first().val());

	var referenceEl = editingRow.children().eq(4);
	var reference = referenceEl.children().first().val();

	if (id && name && type && quantity) {
		updateItem(id, name, type, quantity, reference)

		nameEl.html(name);
		typeEl.html(getTypeName(type));
		quantityEl.html(quantity);
		referenceEl.html(reference);
		srcButton.html("Edit");
		editingRow = null;
	}
	else{
		confirm("Insira dados válidos")
	}
}

function updateItem(id, name, type, quantity, reference){
	var querry = db.prepare("UPDATE items SET name = ?, type = ?, quantity = ?, reference = ? WHERE id = ?");
	querry.bind([name,type,quantity,reference, id]);
	querry.run();
	saveDB();
}
