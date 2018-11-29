var queryURL = "http://api.giphy.com/v1/gifs/search?q=disney&api_key=N1QdJyleGrp27NbEcROUIgiTyBHlE3Gd&limit=30&rating=r&offset=0";
            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                console.log(response);
                for (var i =0; i < 30; i++) {
                imageSrc = response.data[i].images.fixed_height.url;
                console.log(imageSrc);
                var image = $("<img>");
                image.addClass("m-2");
                image.attr("src", imageSrc);
                console.log(image);
                $("#imageBox").append(image);
                }
            });