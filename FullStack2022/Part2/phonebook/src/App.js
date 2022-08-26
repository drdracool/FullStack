import { useState,useEffect } from 'react'
import Filter from './Component/Filter'
import PersonForm from './Component/PersonForm'
import Persons from './Component/Persons'
import axios from 'axios'
import personService from './sercives/persons'
import Notification from './Component/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searching, setSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = event => {
    event.preventDefault();
    setNewName(event.target.value);
  }

  const handleNumberChange = event => {
    event.preventDefault();
    setNewNumber(event.target.value);
  }

  const handleSearchChange = event => {
    event.preventDefault();
    const query = event.target.value;
    if (query.trim().length > 0){
      setSearching(true);
    }else{
      setSearching(false);
    }
    setSearchQuery(query);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());

    if (existingPerson && existingPerson.number === newNumber){
      alert(`${newName} is already added to phonebook`)
      setNewName("")
      setNewNumber("")
      return
    }

    if (existingPerson && existingPerson.number !== newNumber) {
    if(window.confirm(newName + '\'s name is already added to phonebook, replace the old number with a new one?')) {
        const changedPerson = {...existingPerson, number: newNumber}
        personService
          .update(existingPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) => (person.id === existingPerson.id ? returnedPerson : person))
            )
            setSuccessMessage(`Updated ${changedPerson.name}'s number`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000);
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            if (error.response.data) {
              setErrorMessage(error.response.data.error)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000);
            } else {
              setErrorMessage (`Information of ${changedPerson.name} has already been removed from the server`)
              setPersons(persons.filter((p => p.name !== changedPerson.name)))
              setNewName("")
              setNewNumber("")
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            }
            }
          )
      }
    } else {
    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date()
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setSuccessMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    };
  }

  const handleDelete = (id) => {
    if(window.confirm('Do you really want to delete this person?')) {
      personService
        .remove(id)
        .then(() => {
              setSuccessMessage(`Deleted ${persons.find((person) => person.id === id).name}`)
              setPersons(persons.filter((person) => person.id !== id))
            .catch((err) => alert(err))
            })
        }
    } 
  

  const getContent = () => {
    let currentPersons = null;
    if (searching) {
      currentPersons = persons.filter(person => {
        return (
          person.name.toLowerCase().includes(searchQuery.toLowerCase()) || person.number.includes(searchQuery)
        )
      })
    }else{
      currentPersons = [...persons];
    }
    
    return currentPersons.map(person => 
      <>
      <li>{person.name}: {person.number} <button onClick={() => handleDelete(person.id)}>Delete</button></li>
      </>
      )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      <Filter handleSearchChange={handleSearchChange} searchQuery={searchQuery}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons getContent={getContent}/>
    </div>
  )

}
export default App