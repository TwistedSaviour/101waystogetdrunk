$(function () {
  //document ready
  console.log("LET'S DO THIS... ");
  //hides elements that aren't to be shown yet
  $('#egg').hide();
  $('#egg2').hide();
  $('#codePanel').hide();
  $('.view').show();
  $('.ingredientCard').hide();
  $('.drinkCard').hide();

  //toggle cheat codes
  $('.codes').click(function () {
    $('#codePanel').toggle();
    $('.view').toggle();
  });
  
  //search ingredients input parameter
  $('#ingredientSearch').submit(function () {
    //get current value and add to items list
    var searchterm = $("#searchterm").val();
    if ($('#searchterm').val() == '') { // if no input give, pop alert.
      alert('Please enter a searchable ingredient');
    } else { //call search function 
      ingredientsSearch(searchterm);
			return false;
    }
  });


  //search drinks input parameter
  $('#drinkSearch').submit(function () {
    //get current value and add to items list
    var searchterm2 = $("#searchterm2").val();
    if ($('#searchterm2').val() == '') { // if no input give, pop alert.
      alert('Please enter a searchable drink name.');
    } else { //call search function    
      drinkSearch(searchterm2);    
			return false;
    }

  });


  //Searches drink by ingredients in API
  function ingredientsSearch(searchterm) {
    //call API data using AJAX
    //build urls for the request and add searchterm
    var ingSearchTerm = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + searchterm;
   
    //call urls
    $.when(
      $.getJSON(ingSearchTerm)
    ).done(function (ingredientsData) {
      ingredientResults(ingredientsData);
    });
  }

  //Show drinks by ingredient results
  function ingredientResults(ingredientsData) {
    //console.log(ingredientsData);
    //iterate over the collection of results
	var count =0;
	$(".ingredientCard").empty();
    ingredientsData.drinks.forEach(function(drink){
		var htmlstring = "";

		var drinkId = drink.idDrink;			
     
		var ingSearchTerm2 = "http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+drinkId ;
			$.getJSON(ingSearchTerm2, function( otherData){				
			var drinkName = drink.strDrink;
			var drinkImg = drink.strDrinkThumb;
			var recipestring = "";
			for (r = 1; r < 15; r++) {
			recipestring = recipestring + "<p>" + (otherData.drinks["0"]['strIngredient' + r]) + "</p>";
			}
			var measurestring = "";
			for (m = 1; m < 15; m++) {
			measurestring = measurestring + "<p>" + (otherData.drinks["0"]['strMeasure' + m]) + "</p>";
			}
			var drinkMethod = otherData.drinks["0"].strInstructions;

			htmlstring +=
			"<li class='card'><h3 class='drink_h3'>" + drinkName + "</h3><img class='drinkThumbs' src=" + drinkImg + " alt='A picture of the " + drinkName + "'><h3 class='drink_h3'>Recipe</h3><span class='ingredients'>" + recipestring + "</span><span class='measure'>" + measurestring + "</span><br /><h3 class='drink_h3'>Method</h3><p>" + drinkMethod + "</p></li>";
				
			//console.log(htmlstring);
			//create string to contain HTML to inject
			$(".ingredientCard").append(htmlstring);
			count++;
			});
		});
    
    //inject the HTML into list
    $('.ingredientCard').show();
	
  }

  //Searches drinks by name in API
  function drinkSearch(searchterm2) {
    //call API using AJAX
    //build url for the request and add searchterm2
    var drinkSearchTerm = "http://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchterm2;
    //call urls
    $.getJSON(drinkSearchTerm, function (drinksData) {
      //handle the results
      drinkResults(drinksData);
    });
  }

  //Show drinks by name results
  function drinkResults(drinksData) {
    //create string to contain HTML to inject
    var htmlstring = "";
    //iterate over the collection of results
    for (i = 0; i < drinksData.drinks.length; i++) {
      var drinkName = drinksData.drinks[i].strDrink;
      var drinkImg = drinksData.drinks[i].strDrinkThumb;

      var recipestring = "";
      for (r = 1; r < 15; r++) {
        recipestring = recipestring + "<p>" + (drinksData.drinks[i]['strIngredient' + r]) + "</p>";
      }
      var measurestring = "";
      for (m = 1; m < 15; m++) {
        measurestring = measurestring + "<p>" + (drinksData.drinks[i]['strMeasure' + m]) + "</p>";
      }
      var drinkMethod = drinksData.drinks[i].strInstructions;

      htmlstring +=
        "<li class='card'><h3 class='drink_h3'>" + drinkName + "</h3><img class='drinkThumbs' src=" + drinkImg + " alt='A picture of the " + drinkName + " '><h3 class='drink_h3'>Recipe</h3><span class='ingredients'>" + recipestring + "</span><span class='measure'>" + measurestring + "</span><br /><h3 class='drink_h3'>Method</h3><p>" + drinkMethod + "</p></li>";
    }
    //inject the HTML into list
    $('.drinkCard').show();
    $(".drinkCard").html(htmlstring);
  }

});