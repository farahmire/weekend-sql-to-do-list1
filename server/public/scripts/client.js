$(document).ready(onReady);

function onReady() {
  console.log('DOM ready');
  getAndRenderList();
  $('#addTask').on('click', newTask);
  $('body').on('click','.deleteButton', deleteButton);
  // $('body').on('click', '.markCompleteButton', markComplete);
}

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
      $('#theListItems').append(`
          <tr>
            <td>${tasks.task}</td>
            <td>${tasks.mark_complete}</td>
            <td><button class="markCompleteButton">Complete</button></td>
            <td><button class="deleteButton">Delete</button></td>
          </tr>
          `);
    }
  }
  )
}


function newTask() {
  console.log('button is being clicked')
  console.log('in newTask');
  // ajax call to server to POST koalas
  let newInput = $('#theTask').val();
  // let markcomplete = $('#isItComplete').val();
  let tasksToSend = {
    task: newInput
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



function deleteButton()  {
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




function markComplete() {
  // console.log('koala updated');
  // let idToUpdate = $(this).parent().parent().data().id;
  // console.log(idToUpdate);

  // $.ajax({
  //   method: 'PUT',
  //   url: `/koalas/${idToUpdate}`,
  //   data: {
  //     readyForTransfer: 'Y'
  //   }
  // }).then((response) => {
  //   console.log(response);
  //   getAndRenderKoalas();
  // }).catch((error) => {
  //   console.log('readyKoalaForTransfer not working', error);
  // })
}





