const result = document.querySelector(".result");

const fetchPeople = async() => {
 try {
  const people = await axios.get('/api/people');
  await axios.get('/api/tasks')
    .then(async(res) => {
      
      console.log(people.data.answer)
      console.log(res)
      const tasks = res.data.answer.map((x) => {
       return `
        <h5>${x.name}</h5>
        <p>${x.description}</p>
        <button type="button" class="btn delete-btn" onclick="remove(${x.id})">Delete</button>
        <button type="button" class="btn edit-btn" onclick="editName('${x.name}','${x.description}', ${x.id})">Edit</button>
        <select name="people">
        ${people()}
        </select>
        `
      })

         result.innerHTML = tasks.join("")
         options = ``
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

let options = ``

const people = async() => {
  await axios.get('/api/people')
    .then(async(res) => {
      for(let i = 0; i < res.data.answer.length; i++) {
        options += `<option value="people">${people.data.answer[i].name}</option>`
      }
    })
    return options
}



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
  const {data} = await axios.get('/api/tasks');
  console.log(data);
}
 } catch(error) {
  console.log(error)
 }

 input.value = ''
 inputTasks.value = ''
})

