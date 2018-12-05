var gifOptions = ["borat", "bugs bunny", "randy newman"];
var offsetValue = 0;
var gifSelector = "";

function generateBtns () {    
    $("#gifButtonHolder").empty();
    for(var i = 0; i < gifOptions.length; i++) {
        var buttonObj = $("<button>");
        buttonObj.append(titleCase(gifOptions[i]));
        buttonObj.addClass("m-2 rounded");
        buttonObj.attr("id", "gifButton");
        buttonObj.attr("data-name", gifOptions[i]);
        $("#gifButtonHolder").append(buttonObj);
    }
}

function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    return str.join(' ');
  }

function imageGenerator (response) {
    for (var i =0; i < 10; i++) {
        imageSrc = response.data[i].images.fixed_height_still.url;
        // console.log(imageSrc);
        var imageBox = $("<div>");
        imageBox.addClass("col-xs-6 p-2");
        var image = $("<img>");
        image.addClass("m-2 rounded");
        image.attr("src", imageSrc);
        image.attr("id", "generatedImage");
        image.attr("data-still", response.data[i].images.fixed_height_still.url);
        image.attr("data-active", response.data[i].images.fixed_height.url);
        image.attr("data-state", "still");
        // console.log(image);
        imageBox.append(image);
        var rating = $("<div>");
        rating.addClass("rounded p-2 m-2")
        rating.attr("id", "imageCaption");
        console.log(response.data[i].rating);
        rating.text("Rating: " + response.data[i].rating);
        imageBox.append(rating);
        $("#imageHolder").prepend(imageBox);
    }
}

  $("#addGif").on("click", function(event) {
    event.preventDefault();
    var newGif = $("#gifInput").val().trim();
    var newGifT = titleCase(newGif);
    if (gifOptions.indexOf(newGifT) == -1) {
        gifOptions.push(newGifT);
        console.log(gifOptions);
        generateBtns();
        $("#gifInput").val("");
    }
  });

  $("#gifButtonHolder").on("click", "#gifButton", function() {
    offsetValue = 0;
    gifSelector = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifSelector + "&api_key=N1QdJyleGrp27NbEcROUIgiTyBHlE3Gd&limit=10&rating=r&offset="+ offsetValue;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        imageGenerator(response);
        $("#background").css({"background-size": "cover", "background-repeat":"no-repeat", "height": "100%"});
        $("#add-more-btn").show();
        $("#add-more-btn").text("Add more " + titleCase(gifSelector) + " GIFs!");
    });
  });

  $("#add-more-btn").on("click", function () {
    offsetValue += 10;
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifSelector + "&api_key=N1QdJyleGrp27NbEcROUIgiTyBHlE3Gd&limit=10&rating=r&offset="+ offsetValue;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        imageGenerator(response);
        $("#background").css({"background-size": "cover", "background-repeat":"no-repeat", "height": "100%"});
        $("#add-more-btn").show();
    });
  });

  $("#imageHolder").on("click", "#generatedImage", function() {
        var state = $(this).attr("data-state");
        if (state == "still") {
            $(this).attr("src", $(this).attr("data-active"));
            $(this).attr("data-state", "active");
        } else if (state == "active") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
  });

$("#add-more-btn").hide();
generateBtns();