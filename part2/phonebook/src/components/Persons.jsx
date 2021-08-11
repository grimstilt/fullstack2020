const Person = ({ persons, handleDelete }) => persons.map(person => 
<div key={person.id}>
  {person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button>
</div>
)

const Persons = ({ persons, searchText, handleDelete }) => {

    if (searchText === '') {
      return (
        <Person persons={persons} handleDelete={handleDelete} />
      )
    } else {
      return (
        <Person persons={persons.filter(person => 
            person.name.toLowerCase().includes(searchText)
            )
          } handleDelete={handleDelete} 
        />
      )
    }
}

  export default Persons