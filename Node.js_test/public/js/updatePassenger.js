
// Get the objects we need to modify
let updatePassengerForm = document.getElementById('update-passenger-form-ajax');

// Modify the objects we need
updatePassengerForm.addEventListener("submit", function (e) {

  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputPassengerID = document.getElementById("update-passenger-passengerID");
  let inputFirstName = document.getElementById("update-passenger-firstName");
  let inputLastName = document.getElementById("update-passenger-lastName");
  let inputStreetAddress = document.getElementById("update-passenger-streetAddress");
  let inputCity = document.getElementById("update-passenger-city");
  let inputState = document.getElementById("update-passenger-state");
  let inputCountry = document.getElementById("update-passenger-country");

  // Get the values from the form fields
  let passengerIDValue = inputPassengerID.value
  let firstNameValue = inputFirstName.value;
  let lastNameValue = inputLastName.value;
  let streetAddressValue = inputStreetAddress.value;
  let cityValue = inputCity.value;
  let stateValue = inputState.value;
  let countryValue = inputCountry.value;

  // currently the database table for tickets not allow updating FK values to NULL
  // so we must abort if NULL for passengerID or ticketID

  if (isNaN(passengerIDValue)) {
    return;
  }


  // Put our data we want to send in a javascript object
  let data = {
    passengerID: passengerIDValue,
    firstName: firstNameValue,
    lastName: lastNameValue,
    streetAddress: streetAddressValue,
    city: cityValue,
    state: stateValue,
    country: countryValue
  }

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/put-passengers-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {

      // Update the table row with the new data
      updateRow(xhttp.response, passengerIDValue);

    }
    else if (xhttp.readyState == 4 && xhttp.status != 200) {
    }
  }

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));

})

function updateRow(data, passengerID) {
  let parsedData = JSON.parse(data);

  let table = document.getElementById("passengersTable");

  for (let i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute("data-value") == passengerID) {

      // Get the location of the row where we found the matching passengerID
      let updateRowIndex = table.getElementsByTagName("tr")[i];

      // Get td of each passenger attribute
      let td_firstName = updateRowIndex.getElementsByTagName("td")[1];
      let td_lastName = updateRowIndex.getElementsByTagName("td")[2];
      let td_streetAddress = updateRowIndex.getElementsByTagName("td")[3];
      let td_city = updateRowIndex.getElementsByTagName("td")[4];
      let td_state = updateRowIndex.getElementsByTagName("td")[5];
      let td_country = updateRowIndex.getElementsByTagName("td")[6];

      // Reassign each passenger attribute to the new updated values
      td_firstName.innerHTML = parsedData[0].firstName;
      td_lastName.innerHTML = parsedData[0].lastName;
      td_streetAddress.innerHTML = parsedData[0].streetAddress;
      td_city.innerHTML = parsedData[0].city;
      td_state.innerHTML = parsedData[0].state;
      td_country.innerHTML = parsedData[0].country;
    }
  }
  alert('Passenger updated successfully!');
  location.reload()
}