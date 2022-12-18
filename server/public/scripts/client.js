$(document).ready(onReady);


// OnReady functions holding all the click listners. Submit/Delete/Complete buttons.
function onReady() {
  console.log('DOM ready');
  getAndRenderList();
  $('#addTask').on('click', newTask);
  $('body').on('click', '.deleteButton', deleteButton);
  $('body').on('click', '.markCompleteButton', markComplete);
}
// This function is our main function. It has many things it does.
// First of all it is starting the route to get data from DB and server
// then it appends that data into specific rows
// It also contains the buttons we need to click and has an 
// if/else statement for when something is completed or not resulting in the emoji signs ✅ for completed 
// and 🛑 for not completed 
// I tried to append the rows to different colors in that process but the .css method did not work
function getAndRenderList() {
  console.log('rendering List');
  // ajax call to server to GET tasks
  $.ajax({
    method: 'GET',
    url: '/task'
  }).then((response) => {
    console.log(response);
    $('#theListItems').empty();
    for (let tasks of response) {
      console.log(`Response ${response}`)
      if (tasks.markComplete === true) {
        $('#theListItems').append(`
          <tr class="completed" data-id=${tasks.id}>
            <td>${tasks.task}</td>
            <td>${tasks.mark_complete ? '✅' : '🛑'}</td>
            <td><button class="deleteButton">Delete</button></td>
          </tr>
          `).css("background-color", "green");
      } else {
        $('#theListItems').append(`
          <tr data-id=${tasks.id}>
            <td>${tasks.task}</td>
            <td>${tasks.mark_complete ? '✅' : '🛑'}</td>
            <td><button class="markCompleteButton">Complete</button></td>
            <td><button class="deleteButton">Delete</button></td>
          </tr>
          `)
      };
    }
  }
  )
}

// This function targets is a POST route that sends new data to the server and DB
function newTask() {
  console.log('button is being clicked')
  console.log('in newTask');
  // ajax call to server to POST koalas
  let newInput = $('#theTask').val();
  let markComplete = $('#notDone').val();

  let tasksToSend = {
    task: newInput,
    markComplete: markComplete
  };

  $.ajax({
    method: 'POST',
    url: '/task',
    data: tasksToSend
  }).then((response) => {
    console.log(response);
    getAndRenderList()
  }).catch((error) => {
    console.log('something broke in task POST', error);
  })
}

// This function targets a specific ID to delete that row
function deleteButton() {
  console.log('task removed');
  let idToDelete = $(this).parent().parent().data().id;
  console.log(idToDelete);
  $.ajax({
    method: 'DELETE',
    url: `/task/${idToDelete}`
  }).then((response) => {
    console.log(response);
    getAndRenderList();
  }).catch((error) => {
    console.log('deleteTask not working', error);
  })
}

// This function targets a specific ID to update that row
function markComplete() {
  console.log('task updated');
  let idToUpdate = $(this).parent().parent().data().id;
  console.log(idToUpdate);
  $.ajax({
    method: 'PUT',
    url: `/task/${idToUpdate}`,
    data: {
      markComplete: true
    }
  }).then((response) => {
    console.log(response);
    getAndRenderList();
  }).catch((error) => {
    console.log('markComplete not working', error);
  })
}






