const result = document.querySelector(".result");

const fetchPeople = async() => {
 try {
  await axios.get('/api/people')
    .then((res) => {
      console.log(res.data)
      const person = res.data.answer.map((x) => {
       return `
        <h5>${x.name}</h5>
        <p>${x.tasks}</p>
        <button type="button" class="btn delete-btn" onclick="remove(${x.id})">Delete</button>
        <button type="button" class="btn edit-btn" onclick="editName('${x.name}','${x.tasks}', ${x.id})">Edit</button>`
      })

         result.innerHTML = person.join("")
    });
 
 } catch (error) {
  // formAlert.textContent = error.response.data.msg
 }
}
fetchPeople()

// HTML
const btn = document.querySelector('.submit-btn')
const input = document.querySelector('.form-input')
const formAlert = document.querySelector('.form-alert')
const inputTasks = document.querySelector('.form-input-description')



function remove(id) {
    fetch(`/api/people/${id}`, {
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
  const { data } = await axios.post('/api/people', {name: nameValue, tasks: assignedTasks})
  const h5 = document.createElement('h5')
  h5.textContent = data.person
  result.appendChild(h5)
  fetchPeople()
  } else {
     let changes = change(input.value, inputTasks.value);
     if(changes){
    fetch(`/api/people/${currentId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: nameValue, tasks: assignedTasks})
  })

  fetchPeople();
  const {data} = await axios.get('/api/people');
  console.log(data);
} else {
  fetchPeople();
  inputTasks = 'That task does not exist'
  return
}
}
 } catch(error) {
  console.log(error)
 }

 input.value = ''
 inputTasks.value = ''
})

const change = async(personName, taskName) => {
  const {data} = await axios.get('/api/people')
  console.log(data)
  data.answer.map((tasks) => {
    if(taskName == tasks.name) {
      fetch(`/api/tasks/${tasks.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({assigned: personName})
      })
      return true
    } else {
      console.log('task does not exist', taskName)
      return false
    }
  })
}