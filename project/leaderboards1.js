function display1(){
    fetch('returnLeaderboards.php')
    .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
      const table = createTable(data);
      document.body.appendChild(table);
  })
}
function display2() {
    fetch('returnHistory.php')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.length === 0) {
       
          const messageElement = document.createElement('p');
          messageElement.textContent = 'no account history.';
          document.body.appendChild(messageElement);
        } else {
          const table = createTable(data);
          document.body.appendChild(table);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
        // Handle errors, e.g., display an error message to the user
      });
  }
function createTable(data) {
    const table = document.createElement('table');

    if (data.length > 0) {
        const headerRow = table.insertRow();
        const columns = Object.keys(data[0]); // Extract column names from the first row of data

        columns.forEach(columnName => {
            const th = document.createElement('th');
            
            if(th != "password"){
                th.innerHTML = columnName;
                headerRow.appendChild(th);
            }
       
        });

        data.forEach(rowData => {
            const row = table.insertRow();

            columns.forEach(columnName => {
                const cell = row.insertCell();
                cell.innerHTML = rowData[columnName];
            });
        });
    }

    return table;
}

function display3(orderBy, orderType) {
    fetch(`sort.php?leaderboard=${orderBy}&orderType=${orderType}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                const messageElement = document.createElement('p');
                messageElement.textContent = 'no account history.';
                document.body.appendChild(messageElement);
            } else {
                const table = createTable(data);
                document.body.appendChild(table);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error.message);
            // Handle errors, e.g., display an error message to the user
        });
}
