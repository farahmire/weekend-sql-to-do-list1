$( document ).ready(onReady);

function onReady() {
  console.log('DOM ready');
  getAndRenderList();
  $('#addButton').on('click', newTask);
  $('body').on('click', '.deleteButton', deleteButton);
  $('body').on('click', '.markCompleteButton', markComplete);
}

function getAndRenderList(){
    console.log( 'rendering List');
    // ajax call to server to GET koalas
    $.ajax({
      method: 'GET',
      url: '/task'
    }).then((response) => { 
      console.log(response);
      $('#theListItems').empty();
      for (let tasks of response) {
          $('#viewKoalas').append(`
          <tr>
            <td>${tasks.task}</td>
            <td>${tasks.mark_complete}</td>
            <td><button class="markCompleteButton">Complete</button></td>
            <td><button class="deleteButton">Delete</button></td>
          </tr>
          `);
        }
    }
    )}


    function newTask() {
    //     let newTask = $('#theTask')
     }
    

     function deleteButton(){

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





