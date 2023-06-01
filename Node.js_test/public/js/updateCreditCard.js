
// Get the objects we need to modify
let updateCreditCardForm = document.getElementById('update-creditCards-form-ajax');

// Modify the objects we need
updateCreditCardForm.addEventListener("submit", function (e) {

  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputCreditCardID = document.getElementById("update-creditCard-creditCardID");
  let inputPassengerID = document.getElementById("update-creditCard-passengerID");
  let inputNumber = document.getElementById("update-creditCard-number");
  let inputExpiration = document.getElementById("update-creditCard-expiration");
  let inputSecurityCode = document.getElementById("update-creditCard-securityCode");

  // Get the values from the form fields
  let creditCardIDValue = inputCreditCardID.value;
  let passengerIDValue = inputPassengerID.value;
  let numberValue = inputNumber.value;
  let expirationValue = inputExpiration.value;
  let securityCodeValue = inputSecurityCode.value;

  // currently the database table for tickets not allow updating FK values to NULL
  // so we must abort if NULL for passengerID or ticketID

  if (isNaN(creditCardIDValue) || isNaN(passengerIDValue)) {
    return;
  }


  // Put our data we want to send in a javascript object
  let data = {
    creditCardID: creditCardIDValue,
    passengerID: passengerIDValue,
    number: numberValue,
    expiration: expirationValue,
    securityCode: securityCodeValue
  }
  console.log('data = ', data);

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/put-creditCards-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {

      // Add the new data to the table
      updateRow(xhttp.response, creditCardIDValue);

    }
    else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.")
    }
  }

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));

})

function updateRow(data, creditCardID) {
  let parsedData = JSON.parse(data);
  console.log('parsedData = ', parsedData);

  let table = document.getElementById("creditCardsTable");

  for (let i = 0, row; row = table.rows[i]; i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute("data-value") == creditCardID) {

      // Get the location of the row where we found the matching person ID
      let updateRowIndex = table.getElementsByTagName("tr")[i];

      // Get td of ticket value
      let td_passengerID = updateRowIndex.getElementsByTagName("td")[1];
      let td_number = updateRowIndex.getElementsByTagName("td")[2];
      let td_expiration = updateRowIndex.getElementsByTagName("td")[3];
      let td_securityCode = updateRowIndex.getElementsByTagName("td")[4];

      // Reassign ticket to our value we updated to
      td_passengerID.innerHTML = parsedData[0].passengerID;
      td_number.innerHTML = parsedData[0].number;
      td_expiration.innerHTML = parsedData[0].expiration;
      td_securityCode.innerHTML = parsedData[0].securityCode;
    }
  }
  alert('Credit card UPDATED successfully!');
  location.reload()
}