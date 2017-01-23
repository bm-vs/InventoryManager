(function(){
  window.addEventListener("load", function(){
    createDB();
    outputItems();

    //add types to comboboxes AKA selects
    fillTypes(document.getElementById("type"));
  	fillTypes(document.getElementById("search_type"));

    //search buttons click
    $("#search_button").on("click", searchItems);
    $("#search_clear").on("click", clearSearch);

    //delete item on delete button
  	$("#items").on("click", ".delete", deleteItem);

    //dropdown for adding items
    $("#addButton").click(function() {
        $("#addForm").toggle();
    });
  });
})();
