$(document).ready(function() {
  //Load quotes on page load
  generator();
  //Set random colors to elements
  colChanger();
  //Add event listener
  $("#new-quote").click(function () {
    $("#quote-box").fadeOut(1000, function(){
      generator();
      colChanger();
    });
  });
});

// Call API to retrieve quotes
function generator(){
  $.ajax({
    url: "https://talaikis.com/api/quotes/random/",
    //Note: result is already formatted as Js Object
    success: function(result) {
      giphy(result.cat);
      $("#text").text(`${result.quote}`);
      $("#author").text(result.author);
      console.log(result.cat);
      //Contruct tweet intent href
      let twQuery = `https://twitter.com/intent/tweet?text="${result.quote}" - ${result.author}`;
      //Add href for tweet intent button
      $("#tweet-quote").attr("href", twQuery);
    }
  });
}

// Call API to retrieve GIF from given category
function giphy(category){
  $.ajax({
    url: `https://api.giphy.com/v1/gifs/search?q=${category}&api_key=dZoZrLhDZyEJq50LeQI2OayqqqVL3Yvb`,
    success: function(result){
      let random = randomNum(0, 4);
      //Select random top 5 gif object
      let gifObj = result.data[random].images.original;
      //Change dimensions of img element to match incoming gif
      $("#gif").css({ "height": gifObj.height + "px", width: gifObj.width + "px"}).attr("src", gifObj.url);
      //fade in text div - so content div only loads when all APIs have been queried
      $("#quote-box").fadeIn(1000);
    }
  });
}

//Change colors of elements
function colChanger(){
  let newHex = hex();

  //Set color of each loaded particle on page - https://github.com/VincentGarreau/particles.js/issues/71
  $.each(pJSDom[0].pJS.particles.array, function (i, p) {
    //Access color properties of particles current in DOM - note tha both value and rgb values must be set
    pJSDom[0].pJS.particles.array[i].color.value = newHex;
    //convert hextoRGB - from particles JS library
    pJSDom[0].pJS.particles.array[i].color.rgb = hexToRgb(newHex);
  });

  $(".color-change").css("color", newHex);
  $(".btn").css("background-color", newHex);
  $("#gif").css("border-color", newHex);
}

// Generate random number
function randomNum(maxNum, minNum) {
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

// Generate random lowercase letter
function randomLett(){
  return String.fromCharCode(randomNum(102, 97));
}

// Generate random hex digit
function randomDig(){
  var number = randomNum(0,1);
  //format hex in "numLetter" format
  if (number === 0){
    return `${randomNum(0,9)}${randomLett()}`;
  }
  // format hex digit in 'letterNumber' format
  else if (number === 1) {
    return `${randomLett()}${randomNum(0,9)}`;
  }
}

//Generate new hex code in #xxxxxx format
function hex(){
  return `#${randomDig()}${randomDig()}${randomDig()}`;
}




