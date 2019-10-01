var config = {
    apiKey: "AIzaSyDHm-e0gAt2nQw5ixfYPR16SGNYZqqTpnk",
    authDomain: "trilogy-d5c54.firebaseapp.com",
    databaseURL: "https://trilogy-d5c54.firebaseio.com",
    projectId: "trilogy-d5c54",
    storageBucket: "trilogy-d5c54.appspot.com",
    messagingSenderId: "881326920481"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function (event) {
    console.log("test");
    event.preventDefault();

    var inputName = $("#inputName").val().trim();
    var inputDest = $("#inputDest").val().trim();
    var inputTime = $("#inputTime").val().trim();
    var inputFrequency = $("#inputFrequency").val().trim();

    console.log(inputName);
    console.log(inputDest);
    console.log(inputTime);
    console.log(inputFrequency);

    var trainObj = {
        name: inputName,
        destination: inputDest,
        time: inputTime,
        frequency: inputFrequency
    };
    database.ref().push(trainObj);

    $("#inputName").val('');
    $("#inputDest").val('');
    $("#inputTime").val('');
    $("#inputFrequency").val('');
});

database.ref().on("child_added", function (child) {
    console.log(child.val());
    var inputName = child.val().name;
    var inputDest = child.val().destination;
    var inputFrequency = child.val().frequency;
    var firstTrainNew = moment(child.val().time, "hh:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTrainNew), "minutes");
    var remainder = diffTime % inputFrequency;
    var minAway = inputFrequency - remainder;
    var nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm")

    var name = $("<td>").text(inputName);
    var destination = $("<td>").text(inputDest);
    var frequency = $("<td>").text(inputFrequency);
    var arrival = $("<td>").text(minAway);
    var train = $("<td>").text(nextTrain);


    var tRow = $("<tr>");
    tRow.append(name, destination, frequency, train, arrival);

    //add row to body
    var tBody = $("tbody");
    tBody.append(tRow);
});