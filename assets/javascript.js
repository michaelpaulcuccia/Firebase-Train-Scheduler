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

$("#addTrain-btn").on("click", function (event) {
            event.preventDefault();

            var trainName = $("#trainName-input").val().trim();
            var destination = $("#destination-input").val().trim();
            var firstTrain = $("#firstTrain-input").val().trim();
            var frequency = $("#frequency-input").val().trim();

            var newTrain = {
                name: trainName,
                destination: destination,
                firstTrain: firstTrain,
                frequency: frequency
            };

            database.ref().push(newTrain);

            console.log("#trainName-input").val("");
            console.log("#destination-input").val("");
            console.log("#firstTrain-input").val("");
            console.log("#frequency-input").val("");

            $("#traiName-input").val("");

        });

        database.ref().on("child_added", function (childSnapshot, prevChildKey) {

            console.log(childSnapshot.val());

            var childName = childSnapshot.val().name;
            var childDestination = childSnapshot.val().destination;
            var childfirstTrain = childSnapshot.val().firstTrain;
            var childFrequencey = childSnapshot.val().frequency;

            var timeArr = tFirstTrain.split(":");
            var trainTime = moment()
                .hours(timeArr[0])
                .minutes(timeArr[1]);
            var maxMoment = moment.max(moment(), trainTime);
            var tMinutes;
            var tArrival;
    

        } )