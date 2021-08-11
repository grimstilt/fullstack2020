const Filter = (props) => {
    return (
      <div>
        Filter persons by letter: <input 
        value={props.searchText} 
        onChange={props.handleText}
        />
      </div>
    )
}

export default Filter