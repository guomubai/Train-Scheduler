// Firebase initialized
var config = {
	apiKey: "AIzaSyAl-K1hosMz_Np8lLlxZR8Ll-pBcAbq_ZU",
	authDomain: "trainstrainstrains-506cb.firebaseapp.com",
	databaseURL: "https://trainstrainstrains-506cb.firebaseio.com",
	projectId: "trainstrainstrains-506cb",
	storageBucket: "trainstrainstrains-506cb.appspot.com",
	messagingSenderId: "358378763125"
};
firebase.initializeApp(config);

// Setting out the variable that will be the reference to our firebase database
var trainData = firebase.database();

// Setting out jQuery to input into Firebase database. 
$("#addTrainBtn").on("click", function () {
	event.preventDefault(); //prevent page from reloading
	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");//turning it into Unix time!
	var frequency = $("#frequencyInput").val().trim();

	console.log(firstTrain) //checking that I got the time into Unix time

	// w\We will enter this into Firebase
	var newTrain = {
		name: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	}

	// push it into Firebase database
	trainData.ref().push(newTrain);

	
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");

	




	})

	// Now are we getting the data from firebase onto our site
	trainData.ref().on("child_added", function (snapshot) {
		var name = snapshot.val().name;
		var destination = snapshot.val().destination;
		var frequency = snapshot.val().frequency;
		var firstTrain = snapshot.val().firstTrain;

		// the math for the next train arriving
		var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
		var minutes = frequency - remainder;
		var arrival = moment().add(minutes, "m").format("hh:mm A");

		//console log it!
		console.log(remainder);
		console.log(minutes);
		console.log(arrival);

	// finally - take all of that data and put it into jQuery
		$("#trainTable > tBody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");



})
