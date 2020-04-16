/*1. grad the input value */


/*var button = document.getElementsByClassName("js-go container-button");
button.addEventListener('Click',function()){
  var input=document.querySelector("input").value
}
*/
document.querySelector(".js-go").addEventListener('click',function(){
  var input = document.querySelector("input").value;

  pushToAPI(input); //create a function to loop through input variable


});


document.querySelector(".js-userinput").addEventListener('keyup',function(e){
if(e.which === 13){
  var input = document.querySelector("input").value;
  //var userInput = getUserInput();
  pushToAPI(input); //create a funtion to loop through input variable
    //this is the Event, keycode 13 for Enter. Every key on your keyboard has a code
  }
  });

/*2. do the data stuff with the API*/
/*function getUserInput(){
  var input = document.querySelector(".js-userinput").value;
  return input;
}*/

function pushToAPI(input){ //define what is pushToAPI(input) function where you need to connect the API URL to the search
  var url = "http://api.giphy.com/v1/gifs/search?q="+ input +"&api_key=XqTSUbV29XPqP5qr49JrcQc7SBigIWLh&limit=20";

//console.log(url);


//AJAX request
 var GiphyAJAXCall = new XMLHttpRequest();
 GiphyAJAXCall.open('GET',url); //this is to get the url variable for JSON to parse data
 GiphyAJAXCall.send();

 GiphyAJAXCall.addEventListener('load', function(e) {
   var data = e.target.response; //point where to find the data we need to show - should be within function e or anything you define e.g. api > target data level > response data level
   pushToDOM(data); //define another function you are going to connect grabbed data to to step 3
   //console.log(data);
 });
}



/* 3. show me the gifs*/
function pushToDOM(data){

  var response = JSON.parse(data);
  //use array.prototype.forEach() function to loop through all related gifs
  var container = document.querySelector(".js-container");

  var imageUrls = response.data;

  container.innerHTML = ""; //this is to clear the input search data, and you can input another value again. must put in here not in the forEach() if not only one gif will show at a time

  imageUrls.forEach(function(image){

  var gifurl = image.images.fixed_height.url;

  container.innerHTML += "<img src=\"" + gifurl +"\" class=\"container-image\">";
  });

  }
