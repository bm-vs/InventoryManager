(function(){
  window.addEventListener("load", function(){
    createDB();
    refreshDB();

    //add types to comboboxes AKA selects
    fillTypes(document.getElementById("type"));
  	fillTypes(document.getElementById("search_type"));

    //search buttons click
    $("#search_button").on("click", searchItems);
    $("#search_clear").on("click", clearSearch);

    //dropdown for adding items
    $("#addButton").click(function() {
        $("#addForm").toggle();
    });
  });
})();
