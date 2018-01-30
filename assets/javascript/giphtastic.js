 $(document).ready(function(){
/////////////////////////////////////////////////////////////////////////////    
// GLOBAL VARIABLES
var passQuery = '';
var giphyQuery = '';
var giphyArray = []; 
/////////////////////////////////////////////////////////////////////////////
//Step 1: STORE QUERY VALUES ON CLICK        
$(document).on('click', '.submitQuery', function() {
    // By using form, the user can hit enter instead of clicking on the button  
    event.preventDefault();
    
    //passQuery is assigned with the user's entry(form input value from element #inputQuery)
    var passQuery = $('#inputQuery').val().trim();
    
    //Passes(pushed) the value of the users entry (form input-->passQuery) into the query array, giphyArray
    var queryCheck = giphyArray.indexOf(passQuery);

    //Cross-check for duplicate queries
    console.log(queryCheck);

    //If it is a new query, add query to array
    if (queryCheck == -1 && passQuery != '') {
    giphyArray.push(passQuery);
    }
    
    $('#inputQuery').val('');
    console.log(giphyArray);

    renderQueryButton();
});
/////////////////////////////////////////////////////////////////////////////
//Step 2: RENDER BUTTON
function renderQueryButton() {   
  // debugger;
  $('#giphyButtons').empty(); 

  for (var i = 0; i <= giphyArray.length - 1; i++) {

      var newButton = $('<button>');
      
      newButton.addClass('queryResult');
      
      newButton.attr('data-name', giphyArray[i]);
      
      newButton.text(giphyArray[i]);

      $('#giphyButtons').append(newButton);
  }
}    
/////////////////////////////////////////////////////////////////////////////
//Step 3: Connect to Giphy API using Ajax
$(document).on('click', '.queryResult', function() {
  // debugger;
  var giphyQuery = $(this).attr('data-name');
  
  var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + giphyQuery + '&api_key=dc6zaTOxFJmzC&limit=12';
  var url = "";

  $.ajax({
    url: queryURL,
    method: 'GET' 
  }).done(function(response) {
    // console.log(response);
/////////////////////////////////////////////////////////////////////////////    
  //Step 4: CREATE IMG & RATING 
  for (var i = 0; i <= response.data.length - 1; i++) {
      url = response.data[i].images.original_still.url;      
      
      //Add new Div
      var newDiv = $("<div class='newDiv'>");

      //Add rating text
      var ratingText = $("<p class='rating'>");
      var rating = JSON.stringify(response.data[i].rating);
      ratingText.text('Rating: ' + rating);
      console.log(ratingText)
      
      //Add rating text to new div
      newDiv.append(ratingText);

      //Add new image
      var newImage = $('<img class="gif notPlaying">');
      newImage.attr('alt', 'Image not found');

      var url = response.data[i].images.original_still.url;

      newImage.attr('src', url);
      
      newDiv.append(newImage);

      $('#gifArea').append(newDiv);
  }          
});
//////////////////////////////////////////////////////////////////////////////
  //Step 5: ON IMG CLICK, ALTERNATE BETWEEN STILL AND GIF    
  $(document).on('click', '.gif', function() {
    console.log($(this));
       // debugger;
    if($(this).hasClass("notPlaying")){
       
      $(this).removeClass("notPlaying");
     
      // $(this).attr('src', replace(/\_s.gif/i, '.gif'));
      this.src = this.src.replace(/\_s.gif/i, '.gif');
  //console.log(url);
    }
    else{
       
     $(this).addClass('notPlaying');
   
     this.src = this.src.replace(/\.gif/i, '_s.gif');
    }
  });
 });
});