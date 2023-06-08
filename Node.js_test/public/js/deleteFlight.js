function deleteFlight(flightID) {
  // Put our data we want to send in a javascript object
  let data = {
    id: flightID
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "/delete-flights-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {

      // Delete the flight from the table
      deleteRow(flightID);

    }
    else if (xhttp.readyState == 4 && xhttp.status != 204) {
      console.log("There was an error with the input.")
    }
  }
  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
}


function deleteRow(flightID) {

  let table = document.getElementById("flightsTable");
  for (let i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute("data-value") == flightID) {
      table.deleteRow(i);
      break;
    }
  }
  alert('Flight DELETED successfully');
}