const result = document.querySelector(".result");

const fetchPeople = async() => {
 try {
  const { people } = await axios.get('../models/Person')
  console.log(people)
  const person = people.data.map((person) => {
   return `
   <h5>${person.name}</h5>
   <p>${person.description}</p>
   <s>
   <button type="button" class="btn delete-btn" id=${person.id} onclick="done(${person.id}, ${person.done}, '${person.name}', '${person.description}')">Submit</button>
   <button type="button" class="btn delete-btn" id=${person.id} onclick="remove(${person.id})">Delete</button>
   <button type="button" class="btn edit-btn" onclick="editName('${person.name}','${person.description}', ${person.id})">Edit</button>
   </s>`
    })
  result.innerHTML = person.join("")
 } catch (error) {
  formAlert.textContent = error.response.data.msg
 }
}
fetchPeople()

// HTML
const btn = document.querySelector('.submit-btn')
const input = document.querySelector('.form-input')
const formAlert = document.querySelector('.form-alert')
const inputDescription = document.querySelector('.form-input-description')

function done(id, status, name, description) {
  if (status === false){
  fetch(`/api/people/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: name, description: description, done: true})
    })
  } else if (status === true){
    fetch(`/api/people/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: name, description: description, done: false}),
    })
  }
  fetchPeople()
}

function remove(id) {
    fetch(`/api/people/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
  fetchPeople()
}

 let editmode = false
 let currentId = '';

function editName(name, description,  id) {
  editmode = true
  input.value = name
  inputDescription.value = description
  currentId = id;
}

btn.addEventListener('click', async(e) => {
 e.preventDefault()
 const nameValue = input.value
 const descriptionValue = inputDescription.value
 console.log(nameValue, descriptionValue)

 try{
  if(!editmode){
  const { data } = await axios.post('/api/people', {name: nameValue, description: descriptionValue})
  const h5 = document.createElement('h5')
  const p = document.createElement('p')
  h5.textContent = data.person
  result.appendChild(h5)
  fetchPeople()
  } else {
    console.log('help')
    fetch(`/api/people/${currentId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: nameValue, description: descriptionValue, done: false})
    })
    fetchPeople()
    editmode = false
  }
 } catch(error) {
  console.log(error)
 }
 input.value = ''
 inputDescription.value = ''
})