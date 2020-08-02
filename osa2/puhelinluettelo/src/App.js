import React, { useState, useEffect } from 'react'
import './index.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from'./components/Notifications'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [filter, setFilter ] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [className, setClassName] = useState('')

  useEffect(() => {
    console.log('effect')
    personService.getAll().then(initalsPersons => {
      setPersons(initalsPersons)
    })
  },[])

  const notification = (message, classN) => {
    setClassName(classN)
    console.log('tänne päästiin')
    setNotificationMessage(message)
    setTimeout(() => {setNotificationMessage(null)},5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('submit clicked ', event.target)
    
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person =  persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
        const personUpdated = { ...person, number:  newNumber}
        
        personService.update(personUpdated.id, personUpdated).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== personUpdated.id ? person : returnedPerson))
        notification(`updated ${personUpdated.name} phone number`, 'notification')
        })
        .catch(error => {
          notification(`the person ${personUpdated.name} was already deleted from server`, 'error')
          setPersons(persons.filter(p => p.id !== personUpdated.id))
        })
      } else return
      
      setNewName('')
      setNewNumber('')
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    }).catch(error => {
      // TODO: tee jos jaksatif (error.response.data.error.match(/name/g)) notification(error.response.data.error, 'error')
      //console.log(error.response.data)
      notification(error.response.data.error, 'error')
    })

    notification(`added ${personObject.name}`, 'notification')
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value) 
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  // if no filtering then shows all numbers, otherwise can look up names by first or last name /hence
  // showing in alphabetical order by first name
  const personsToShow = () => {
    if (filter === '')  return persons.sort((person1, person2) => person1.name.localeCompare(person2.name))
    return  (persons.filter(person => person.name.toLowerCase().match((`^${filter.toLowerCase()}| ${filter.toLowerCase()}`))))
  }
  
  const deletePerson = (id) => {
    console.log(`delete person: ${id}`)
    const personDelete = persons.find(p => p.id === id)
    if (!window.confirm(`Delete ${personDelete.name} ?`)) {console.log("pushed cancel"); return}
    personService.remove(personDelete.id).then(response =>
      {
        console.log(response.data)
        setPersons(persons.filter(p => p.id !== id))
    })
    .catch(error => {
      notification(`the person ${personDelete.name} was already deleted from server`, 'error')
      setPersons(persons.filter(p => p.id !== personDelete.id))
    })
    notification(`person ${personDelete.name} was deleted`, 'notification')
  }  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} classN={className} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      {personsToShow().map((person) =>
        <Persons key={person.name} person={person} deletePerson={() => deletePerson(person.id)} /> )}
    </div>
  )

}

export default App
