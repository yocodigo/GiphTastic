$(document).ready(function(){

  // Global variables
  let passQuery = '';
  var giphyQuery = '';
  var giphyArray = []; 
  
  // Store query value on click
  $(document).on('click', '.submitQuery', function() {
      event.preventDefault();
      let passQuery = $('#inputQuery').val().trim(); // user's entry
      let queryCheck = giphyArray.indexOf(passQuery); // returns the index of the users entry from giphyArray

      if (queryCheck == -1 && passQuery != '') { // checks whether there's an element in the array and that the element is not a blank string
        giphyArray.push(passQuery); // stores the entry in the array
      }

      renderQueryButton();
  });
  
  // Render button
  function renderQueryButton() {   
    $('#giphyButtons').empty(); 
    
    for (var i = 0; i <= giphyArray.length - 1; i++) {
      var newButton = $('<button>');
      newButton.addClass('queryResult');
      newButton.attr('data-name', giphyArray[i]);
      newButton.text(giphyArray[i]);
      $('#giphyButtons').append(newButton);
    }
  }    
  
  // Connect to giphy API using ajax
  $(document).on('click', '.queryResult', function() {
    
    const giphyQuery = $(this).attr('data-name');
    const queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + giphyQuery + '&api_key=dc6zaTOxFJmzC&limit=12';
    const url = "";

    $.ajax({
      url: queryURL,
      method: 'GET' 
    }).done(function(response) {
      
      // Create image & rating 
      for (var i = 0; i <= response.data.length - 1; i++) {
        url = response.data[i].images.original_still.url;      
        var newDiv = $("<div class='newDiv'>"); 
        var ratingText = $("<p class='rating'>");
        var rating = JSON.stringify(response.data[i].rating);
        ratingText.text('Rating: ' + rating);
        
        // Add rating text to new div
        newDiv.append(ratingText);

        // Add new image
        var newImage = $('<img class="gif notPlaying">');
        newImage.attr('alt', 'Image not found');
        var url = response.data[i].images.original_still.url;
        newImage.attr('src', url);
        newDiv.append(newImage);
        $('#gifArea').append(newDiv);
      }          
    });

    // On image click, alternate between still and gif
    $(document).on('click', '.gif', function() {
      if($(this).hasClass("notPlaying")){
        $(this).removeClass("notPlaying");
        this.src = this.src.replace(/\_s.gif/i, '.gif');
      }
      else {
        $(this).addClass('notPlaying');
        this.src = this.src.replace(/\.gif/i, '_s.gif');
      }
    });
  });
});