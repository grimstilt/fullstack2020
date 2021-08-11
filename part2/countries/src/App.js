import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'

const App = () => {
  const [countries, setCountries] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  

  const handleText = (event) => setText(event.target.value)
  
  return (
    <div>
      Find countries filter: <input  
        value={text} 
        onChange={handleText}
        />
      <CountryList countries={countries} text={text}/> 
    </div>
  )
}

export default App;
