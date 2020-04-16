//1. search
var UI = {};

UI.SubmitClick = document.querySelector(".search").addEventListener('click',function(){
  var searchInput = document.querySelector("input").value;
  soundCloudAPI.getTrack(searchInput);

  //clear previous search results
  /*var searchResults = docuement.querySelector(".js-search-results");
  searchResults.innerHTML = "";*/
});

UI.EnterPress = document.querySelector(".input-search").addEventListener('keyup',function(e){
  if(e.which === 13){
    var searchInput = document.querySelector("input").value;
    soundCloudAPI.getTrack(searchInput);

    //clear previous search searchResults
  /*  var searchResults = document.querySelector(".js-search-results");
    searchResults.innerHTML = "";*/
  }
});

//function searchInput(){
  //var input = document.querySelector(".input-search");}

//2. SoundCloud api
var soundCloudAPI = {};

soundCloudAPI.init = function(){
  SC.initialize({
    client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
  });
}

soundCloudAPI.init();

soundCloudAPI.getTrack = function(searchInput){ //inputValue
  // find all sounds of buskers licensed under 'creative commons share alike'
  SC.get('/tracks', {
    q: searchInput  //inputValue
  }).then(function(tracks) {
    console.log(tracks);
    soundCloudAPI.renderTracks(tracks); //if there are tracks, then log to the console.
  });
}

//3. Display the cards
//soundCloudAPI.getTrack(searchInput);

  soundCloudAPI.renderTracks = function(tracks){

    tracks.forEach(function(track){ //it can be e/track/anything for the event

    //card
    var card = document.createElement("div");
    card.classList.add("card"); //this is to add class to card variable

    //image div
    var imageDiv = document.createElement("div");
    imageDiv.classList.add("image");
    card.appendChild(imageDiv); //this is to append imageDiv under card


    var image_img = document.createElement("img");
    image_img.classList.add("image_img");
    image_img.src = track.artwork_url || 'https://loremflickr.com/320/240';

    imageDiv.appendChild(image_img); //this is to append image_img to imageDiv. Because this is nested under imageDiv.

    //content
    var content = document.createElement("div");
    content.classList.add("content");
    card.appendChild(content); //this is to append content under card div.

    //header
    var header = document.createElement("div");
    header.classList.add("header");
    header.innerHTML = '<a href='+ track.permalink_url +'" target="_blank">' + track.title +'</a>';
    content.appendChild(header); //this is to append header under content div.

    //button
    var button = document.createElement("div");
    button.classList.add("ui", "bottom", "attached", "button", "js-button");
    card.appendChild(button); //this is to append button under card div.

    var icon = document.createElement("i");
    icon.classList.add("add", "icon");
    button.appendChild(icon); //this is to append icon under button as it is nested under it.

    var buttonText = document.createElement("span");
    buttonText.innerHTML = 'Add to Playlist';
    button.appendChild(buttonText);

    button.addEventListener('click',function(){
    soundCloudAPI.getEmbed(track.permalink_url);
  });

//append child

    /*content.appendChild(header);

    card.appendChild(button);
    card.appendChild(content);
    card.appendChild(imageDiv);

    button.appendChild(icon);
    button.appendChild(buttonText);*/

    var searchResults = document.querySelector(".js-search-results");
    searchResults.appendChild(card); //this is to append searchResults under card div
  });
}


//4. Add to playlist and play
//the idea of this is you want to grab the player to html and get it play dynamically.
//but it is unlikely you can do that. So the easiest way is to (1) create a variable, (2) QuerySelector the Class, (3)innerHTML the variable to grab that source <iframe>
soundCloudAPI.getEmbed = function(trackURL){
  //console.log("Click I'm in getEmbed");
  SC.oEmbed(trackURL, {
  auto_play: true
}).then(function(embed){
  console.log('oEmbed response: ', embed);

  var sidebar = document.querySelector('.js-playlist');
  console.log(embed.html);
  sidebar.innerHTML = embed.html;

  var box = document.createElement('div'); //new variable for a box div. and create a new div
  box.innerHTML = embed.html; //add the new div in html


  sidebar.insertBefore(box, sidebar.firstChild); //put the new box in front of the existing item.
  localStorage.setItem("key", sidebar.innerHTML);

});
}

var sidebar = document.querySelector('.col-left'); //we need to declare sidebar again because it is in the local scope, if we want to use it again, then we need to declare again here.
sidebar.innerHTML = localStorage.getItem("key");

//clear the playlist of all songs

UI.ClearPlaylist = document.querySelector('.btn-reset').addEventListener('click',function(){
  localStorage.clear();
  location.reload();
});
