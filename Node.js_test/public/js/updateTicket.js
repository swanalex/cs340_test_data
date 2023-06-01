
// Get the objects we need to modify
let updateTicketForm = document.getElementById('update-ticket-form-ajax');

// Modify the objects we need
updateTicketForm.addEventListener("submit", function (e) {

  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputTicketID = document.getElementById("update-ticket-ticketID")
  let inputPassengerID = document.getElementById("update-ticket-passengerID");
  let inputFlightID = document.getElementById("update-ticket-flightID");
  let inputPrice = document.getElementById("update-tickets-price");
  let inputSeatNumber = document.getElementById("update-tickets-seatNumber");

  // Get the values from the form fields
  let ticketIDValue = inputTicketID.value
  let passengerIDValue = inputPassengerID.value;
  let flightIDValue = inputFlightID.value;
  let priceValue = inputPrice.value;
  let seatNumberValue = inputSeatNumber.value;

  // currently the database table for tickets not allow updating FK values to NULL
  // so we must abort if NULL for passengerID or ticketID

  if (isNaN(flightIDValue) || isNaN(passengerIDValue)) {
    return;
  }


  // Put our data we want to send in a javascript object
  let data = {
    ticketID: ticketIDValue,
    passengerID: passengerIDValue,
    flightID: flightIDValue,
    price: priceValue,
    seatNumber: seatNumberValue
  }
  console.log('data = ', data);

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/put-tickets-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {

      // Add the new data to the table
      updateRow(xhttp.response, ticketIDValue);

    }
    else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.")
    }
  }

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));

})

function updateRow(data, ticketID) {
  let parsedData = JSON.parse(data);
  console.log('parsedData = ', parsedData);

  let table = document.getElementById("ticketsTable");

  for (let i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute("data-value") == ticketID) {

      // Get the location of the row where we found the matching person ID
      let updateRowIndex = table.getElementsByTagName("tr")[i];

      // Get td of ticket value
      let td_passengerID = updateRowIndex.getElementsByTagName("td")[1];
      let td_flightID = updateRowIndex.getElementsByTagName("td")[2];
      let td_price = updateRowIndex.getElementsByTagName("td")[3];
      let td_seatNumber = updateRowIndex.getElementsByTagName("td")[4];

      // Reassign ticket to our value we updated to
      td_passengerID.innerHTML = parsedData[0].passengerID;
      td_flightID.innerHTML = parsedData[0].flightID;
      td_price.innerHTML = parsedData[0].price;
      td_seatNumber.innerHTML = parsedData[0].seatNumber;
    }
  }

  location.reload()
}