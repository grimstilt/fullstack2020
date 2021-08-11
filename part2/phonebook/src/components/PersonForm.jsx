const PersonForm = (props) => {
    return (
      <div>
        <form onSubmit={props.addObj} >
          <div>
            Name: <input 
            value={props.newName}
            onChange={props.handleNewName} />
          </div>
          <div>
            Number: <input 
            value={props.newNum}
            onChange={props.handleNewNum} />
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    )
  }

  export default PersonForm