import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [searchText, setSearchText] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNum = (event) => setNewNum(event.target.value)
  const handleText = (event) => setSearchText(event.target.value)
  const handleDelete = (id) => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(id)
      setPersons(persons.filter(n => n.id !== id))
    }
  }
  
  const addObj = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNum
    }
    
    if (persons.map(person => person.name).includes(newName)) {
      const person = persons.find(n => n.name === newName)
      if (person.number === newNum) {
        window.alert( `${newName} is already present`)
      }
      else {
        if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
          personService
            .update(person.id, personObject)
            .then(returnedPerson => {
              setMessage(`Updated ${returnedPerson.name}`)
              setTimeout(() => setMessage(null), 5000)
              setNewName('')
              setNewNum('')
            })
            
            .catch(error => {
              setErrorMessage(`Information for ${person.name} has already been removed from the server`)
            })
            .then(personService.getAll().then(modifiedPersons => {setPersons(modifiedPersons)}))

        }
      }
      
    } else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => setMessage(null), 5000)
        setNewName('')
        setNewNum('')
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorMessage={errorMessage} />

      <Filter searchText={searchText} handleText={handleText} />
      
      <h3>Add a new person</h3>
      
      <PersonForm 
        addObj={addObj} newName={newName} handleNewName={handleNewName} 
        newNum={newNum} handleNewNum={handleNewNum} 
      />
      
      <h3>Numbers</h3>
      
      <Persons persons={persons} searchText={searchText} handleDelete={handleDelete} />
    </div>
  )
}


export default App;
