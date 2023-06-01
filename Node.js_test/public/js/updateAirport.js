
// Get the objects we need to modify
let updateAirportForm = document.getElementById('update-airport-form-ajax');

// Modify the objects we need
updateAirportForm.addEventListener("submit", function (e) {

  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputAirportID = document.getElementById("update-airports-airportID")
  let inputCity = document.getElementById("update-airports-city");
  let inputState = document.getElementById("update-airports-state");
  let inputCountry = document.getElementById("update-airports-country");
  let inputName = document.getElementById("update-airports-name");
  let inputCode = document.getElementById("update-airports-code");

  // Get the values from the form fields
  let airportIDValue = inputAirportID.value
  let cityValue = inputCity.value;
  let stateValue = inputState.value;
  let countryValue = inputCountry.value;
  let nameValue = inputName.value;
  let codeValue = inputCode.value;


  // currently the database table for airports not allow updating FK values to NULL
  // so we must abort if NULL for passengerID or airportID

  //  if (isNaN(flightIDValue) || isNaN(passengerIDValue)) {
  //  return;
  // }


  // Put our data we want to send in a javascript object
  let data = {
    airportID: airportIDValue,
    city: cityValue,
    state: stateValue,
    country: countryValue,
    name: nameValue,
    code: codeValue
  }
  console.log('data = ', data);

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/put-airports-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {

      // Add the new data to the table
      updateRow(xhttp.response, airportIDValue);

    }
    else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.")
    }
  }

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));

})

function updateRow(data, airportID) {
  let parsedData = JSON.parse(data);
  console.log('parsedData = ', parsedData);

  let table = document.getElementById("airportsTable");

  for (let i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute("data-value") == airportID) {

      // Get the location of the row where we found the matching person ID
      let updateRowIndex = table.getElementsByTagName("tr")[i];

      // Get td of airport value
      let td_city = updateRowIndex.getElementsByTagName("td")[1];
      let td_state = updateRowIndex.getElementsByTagName("td")[2];
      let td_country = updateRowIndex.getElementsByTagName("td")[3];
      let td_name = updateRowIndex.getElementsByTagName("td")[4];
      let td_code = updateRowIndex.getElementsByTagName("td")[5];

      // Reassign airport to our value we updated to
      td_city.innerHTML = parsedData[0].city;
      td_state.innerHTML = parsedData[0].state;
      td_country.innerHTML = parsedData[0].country;
      td_name.innerHTML = parsedData[0].name;
      td_code.innerHTML = parsedData[0].code;
    }
  }
}