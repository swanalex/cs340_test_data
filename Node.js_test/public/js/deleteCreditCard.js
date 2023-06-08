function deleteCreditCard(creditCardID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: creditCardID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-creditCards-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Delete the credit card from the table
            deleteRow(creditCardID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(creditCardID){

    let table = document.getElementById("creditCardsTable");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == creditCardID) {
            table.deleteRow(i);
            break;
       }
    }
    alert('Credit card DELETED successfully!');
    location.reload()
}