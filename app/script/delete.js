function deleteItem(){
	var confirmation = confirm("De certeza que pretende apagar este item?");
	if (!confirmation) {
		return;
	}

	var id = $(this).parent().siblings()[0].innerHTML;
	$(this).parent().parent().remove();

	var submission = db.prepare("DELETE FROM items WHERE id=?");
	submission.bind([id]);
	submission.run();

	saveDB();
	refreshDB();
}
