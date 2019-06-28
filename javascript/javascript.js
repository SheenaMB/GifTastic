//Part 1
//create variable "topics" that is an array of strings within your topic
//using jquery create buttons in HTML- forEach string, append button (working movie app)
//on"click" of button - page grabes 10 static, data-status "still" gif images (pausing-gifs day 5)
//on"click" of image --> data-status should change from still to animate etc.
//also pull the rating of GIF - disply under each GIF

var topics = ["Dolphin", "Doxie", "Otter", "Penguin", "Monkey", "Koala", "Chinchilla",];

//create buttons based off of the names in the array
function makeButtons() {
    $("#btn").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("animal");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#btn").append(a);
    }
    $(".animal").on("click", function (event) {
        event.preventDefault();
        displayGif(this);
    });
}

makeButtons();


function displayGif(button) {

    var animal = $(button).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
            // $("#gifs-here").text(JSON.stringify(response));
            console.log(response);


            // Storing an array of results in the results variable
            var results = response.data;

            results.forEach(function (element, index) {
                var gifDiv = $("<div>");
                var animalImage = $("<img>");
                animalImage.addClass("gif-image");
                animalImage.attr(`data-id`, index);
                animalImage.attr("data-state", "still")
                animalImage.attr('data-still', element.images.fixed_width_still.url);
                animalImage.attr('data-animated', results[index].images.fixed_width.url);

                //get rating and put into text
                var rating = element.rating;
                var p = $("<p>").text("Rating: " + rating);

                //pull gif src url 
                animalImage.attr("src", element.images.fixed_width_still.url);

                // Appending the paragraph and animalImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(animalImage);

                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#gifs-here").prepend(gifDiv);
            });

            //element in html (gif here) event listener on parent component
            $("#gifs-here").on("click", '.gif-image', function () {
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("data-state");

                //need to update our URL using .fixed_height_still etc.
                var imgIndex = parseInt($(this).attr('data-id'));
                
                
                if (state === "still") {
                    $(this).attr("src", $(this).attr('data-animated'));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr('data-still'));
                    $(this).attr("data-state", "still");
                }
            });
        });
}


//             });
//         });
// }
//                 // Does this go at the end??? Adding a click event listener to all elements with a class of "animal-btn"
// $(document).on("click", "#animal-btn", displayGifs);


//Part 2

//create a form that takes a value .val().trim(), add it to your topics array (working Movie app)
//function that takes each topic and remakes the buttons on the page (resets the page with the new one so you don't have repeat buttons)

// This function handles events where a movie button is clicked
$("#add-animal").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();

    // Adding movie from the textbox to our array
    topics.push(animal);

    // Calling renderButtons which handles the processing of our movie array
    makeButtons();
    //    displayGif();
});



