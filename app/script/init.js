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
  	$("#items .Delete").on("click", deleteItem);
    //edit item on click
    $("#items .Edit").on("click", editItem);

    //dropdown for adding items
    $("#addButton").click(function() {
        $("#addForm").toggle();
    });
  });
})();
