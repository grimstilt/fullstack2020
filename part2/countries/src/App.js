import axios from 'axios'
import React, { useState, useEffect } from 'react'
import DisplayCountry from './components/DisplayCountry'


const App = () => {
    const [countries, setCountries] = useState([])
    const [text, setText] = useState('')
    const [showCountry, setShowCountry] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleText = (event) => {
        setText(event.target.value)
        setShowCountry('')
    }

    const handleShow = ({ country }) => {
        setShowCountry(country.name.common)
    }

    const handleHide = () => {
        setShowCountry('')
    }

    const DisplayCountries = ({ countries }) => {
        if (countries.length === 1) {
            return(
                <div>
                    <DisplayCountry country={countries[0]} />
                </div>
            )
        } else if (countries.length < 10) {
            return(
                countries.map(country => 
                showCountry === country.name.common
                ? <div key={country.name.common}>
                    <button onClick={() => handleHide()}> hide</button> 
                    <DisplayCountry country={country} />
                  </div>
                : <div key={country.name.common}>
                    <button onClick={() => handleShow({country})}> show</button>
                    {country.name.common}
                  </div>)
            )
        } else {
            return (
                <div>
                    Too many matches
                </div>
            )
        }
    }

    const CountryList = ({ countries }) => {
        if (text === '') {
            return(
                <></>
            )
        } else {
            return(
                <div>
                    <DisplayCountries countries={countries.filter(country => country.name.common.toLowerCase().includes(text.toLowerCase()))} />
                </div>
            )
        }
    }

    return (
        <div>
            find countries <input type="text" value={text} onChange={handleText} />
            <CountryList countries={countries} text={text} />
        </div>
    )

}

export default App;