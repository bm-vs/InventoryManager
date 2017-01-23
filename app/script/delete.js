$(document).ready(function() {
	$("#items").on("click", ".delete", function() {
		var confirmation = confirm("De certeza que pretende apagar este item?");
		if (!confirmation) {
			return;
		}
		
		var id = $(this).parent().siblings()[0].innerHTML;
		$(this).parent().parent().remove();
		
		var submission=db.prepare("DELETE FROM items WHERE id=?");
		submission.bind([id]);
		submission.run();
		
		var data = db.export();
		var buffer = new Buffer(data);
		fs.writeFileSync("inventory.db", buffer);
		//"refreshes the screen"
		refreshDB();
	});
});