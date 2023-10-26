const result = document.querySelector(".result");

const fetchPeople = async() => {
 try {
  let {data} = await axios.get('/api/people')
  let inputs = document.getElementById('people').innerHTML = data.answer.map(x=>{
          return `<option value="people">${x.name}</option>`
         })

  let taskIDs = [];
  await axios.get('/api/tasks')
    .then(async(res) => {
      const tasks = res.data.answer.map((x) => {
        taskIDs.push(x.id);
        // if(taskEditmode == true){

        // } else {
       return `
        <h5>${x.name}</h5>
        <p>${x.description}</p>
        <h4>Assigned To: None</h4> 
        <button type="button" class="btn delete-btn" onclick="remove(${x.id})">Delete</button>
        <button type="button" class="btn edit-btn" onclick="editName('${x.name}','${x.description}', ${x.id})">Edit</button>
        `
        // }
      })
         result.innerHTML = tasks.join("")

         for(let i=0; i < taskIDs.length; i++){
          let input = document.querySelector(`#task${taskIDs[i]}`)
          input.innerHTML = inputs.join('')
         }
    });
 } catch (error) {
 }
}
fetchPeople()

// HTML
const btn = document.querySelector('.submit-btn')
const input = document.querySelector('.form-input')
const formAlert = document.querySelector('.form-alert')
const inputTasks = document.querySelector('.form-input-description')





function remove(id) {
    fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
  fetchPeople()
}

function editName(name, tasks,  id) {
  editmode = true
  input.value = name
  inputTasks.value = tasks
  currentId = id;
}


btn.addEventListener('click', async(e) => {
 e.preventDefault()
 const nameValue = input.value
 const assignedTasks = inputTasks.value

 try{
  if(!editmode){
  const { data } = await axios.post('/api/tasks', {name: nameValue, description: assignedTasks})
  const h5 = document.createElement('h5')
  h5.textContent = data.person
  result.appendChild(h5)
  fetchPeople()
  } else {
    fetch(`/api/tasks/${currentId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: nameValue, description: assignedTasks})
  })
  fetchPeople();
}
 } catch(error) {
  console.log(error)
 }

 input.value = ''
 inputTasks.value = ''
})

