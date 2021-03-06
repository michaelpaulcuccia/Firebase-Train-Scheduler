// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyCcKCuRm3QBdTqkrOk7nkWrTll6aP7CJlo",
    authDomain: "njtransit-91b8f.firebaseapp.com",
    databaseURL: "https://njtransit-91b8f.firebaseio.com",
    projectId: "njtransit-91b8f",
    storageBucket: "njtransit-91b8f.appspot.com",
    messagingSenderId: "764352270825",
    appId: "1:764352270825:web:487b86cb68fc71b9163b78",
    measurementId: "G-WF7BS0XHLD"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding TRAINS
$("#addTrain-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#trainName-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#firstTrain-input").val().trim()
    firstTrain=(moment(firstTrain, "HH:mm").format("X"));
    var frequency = parseInt($("#frequency-input").val().trim());
    console.log(frequency)

    // Creates local "temporary" object for holding new Train data
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    // Uploads Train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#trainName-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = parseInt(childSnapshot.val().frequency);

    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

   
    var diffTime = moment().diff(moment(firstTrain, "X"), "minutes");
    console.log(diffTime);

    // Calculate the total "time until next train"
    //modulo is remainder when you divide by a number
    var timeSinceLast= (diffTime%frequency)
    var timeTilNext = frequency-timeSinceLast;
    console.log(timeTilNext);
    let nextArrival = moment().add(timeTilNext, 'minutes').format("HH:mm")
    console.log(nextArrival);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(timeTilNext)
    );
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});