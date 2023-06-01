
// Get the objects we need to modify
let updateFlightForm = document.getElementById('update-flight-form-ajax');

// Modify the objects we need
updateFlightForm.addEventListener("submit", function (e) {

  // Prevent the form from submitting
  e.preventDefault();

  console.log(document.getElementById("update-flights-duration"))
  // Get form fields we need to get data from
  let inputFlightID = document.getElementById("update-flights-flightID");
  let inputOrigin = document.getElementById("update-flights-origin");
  let inputDestination = document.getElementById("update-flights-destination");
  let inputAirline = document.getElementById("update-flights-airline");
  let inputDuration = document.getElementById("update-flights-duration");
  let inputNumberOfSeats = document.getElementById("update-flights-seatNumber");
  let inputDate = document.getElementById("update-flights-date");
  let inputDeparture = document.getElementById("update-flights-departureTime");
  let inputArrival = document.getElementById("update-flights-arrivalTime");

  // Get the values from the form fields
  let flightIDValue = inputFlightID.value
  let originIDValue = inputOrigin.value
  let destinationIDValue = inputDestination.value;
  let airlineValue = inputAirline.value;
  let durationValue = inputDuration.value;
  let numberOfSeatsValue = inputNumberOfSeats.value;
  let dateValue = inputDate.value;
  let departureValue = inputDeparture.value;
  let arrivalValue = inputArrival.value;

  // currently the database table for flights not allow updating FK values to NULL
  // so we must abort if NULL for passengerID or flightID

  //  if (isNaN(flightIDValue) || isNaN(passengerIDValue)) {
  //  return;
  // }


  // Put our data we want to send in a javascript object
  let data = {
    flightID: flightIDValue,
    originAirportID: originIDValue,
    destinationAirportID: destinationIDValue,
    airline: airlineValue,
    duration: durationValue,
    numberOfSeats: numberOfSeatsValue,
    date: dateValue,
    departureTime: departureValue,
    arrivalTime: arrivalValue
  }
  console.log('data = ', data);

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/put-flights-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {

      // Add the new data to the table
      updateRow(xhttp.response, flightIDValue);

    }
    else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.")
    }
  }

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));

})

function updateRow(data, flightID) {
  let parsedData = JSON.parse(data);
  console.log('parsedData = ', parsedData);

  let table = document.getElementById("flightsTable");

  for (let i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute("data-value") == flightID) {

      // Get the location of the row where we found the matching person ID
      let updateRowIndex = table.getElementsByTagName("tr")[i];

      // Get td of flight value
      let td_origin = updateRowIndex.getElementsByTagName("td")[1];
      let td_destination = updateRowIndex.getElementsByTagName("td")[2];
      let td_airline = updateRowIndex.getElementsByTagName("td")[3];
      let td_duration = updateRowIndex.getElementsByTagName("td")[4];
      let td_numberOfSeats = updateRowIndex.getElementsByTagName("td")[5];
      let td_date = updateRowIndex.getElementsByTagName("td")[6];
      let td_departure = updateRowIndex.getElementsByTagName("td")[7];
      let td_arrival = updateRowIndex.getElementsByTagName("td")[8];

      // Reassign flight to our value we updated to
      td_origin.innerHTML = parsedData[0].originAirportID;
      td_destination.innerHTML = parsedData[0].destinationAirportID;
      td_airline.innerHTML = parsedData[0].airline;
      td_duration.innerHTML = parsedData[0].duration;
      td_numberOfSeats.innerHTML = parsedData[0].numberOfSeats;
      td_date.innerHTML = parsedData[0].date;
      td_departure.innerHTML = parsedData[0].departureTime;
      td_arrival.innerHTML = parsedData[0].arrivalTime;
    }
  }
}