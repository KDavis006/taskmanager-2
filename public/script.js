const result = document.querySelector(".result");

const fetchPeople = async() => {
 try {
  await axios.get('/api/people')
    .then((res) => {
      const person = res.data.answer.map((x) => {
       return `
        <h5>${x.name}</h5>
        <p>AGE: ${x.age}</p>
        <button type="button" class="btn delete-btn" onclick="remove(${x.id})">Delete</button>
        <button type="button" class="btn edit-btn" onclick="editName('${x.name}',${x.age}, ${x.id})">Edit</button>
        <a href="./tasks.html"><button type="button" class="btn assign-btn">Assign/Remove Tasks</button></a>`
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
const ageInput = document.querySelector('.form-input-description')



function remove(id) {
    fetch(`/api/people/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
  fetchPeople()
}

function editName(name, age,  id) {
  editmode = true
  input.value = name
  ageInput.value = age
  currentId = id;
}


btn.addEventListener('click', async(e) => {
 e.preventDefault()
 const nameValue = input.value
 const ageInputs = ageInput.value

 try{
  if(!editmode){
  const { data } = await axios.post('/api/people', {name: nameValue, age: ageInputs})
  const h5 = document.createElement('h5')
  h5.textContent = data.person
  result.appendChild(h5)
  fetchPeople()
  } else {
    fetch(`/api/people/${currentId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: nameValue, age: ageInputs})
  })

  fetchPeople();
}
 } catch(error) {
  console.log(error)
 }

 input.value = ''
 ageInput.value = ''
})

// const change = async(personName, taskName) => {
//   const {data} = await axios.get('/api/people')
//   console.log(data)
//   data.answer.map((tasks) => {
//     if(taskName == tasks.name) {
//       fetch(`/api/tasks/${tasks.id}`, {
//         method: 'PUT',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({assigned: personName})
//       })
//       return true
//     } else {
//       console.log('task does not exist', taskName)
//       return false
//     }
//   })
// }