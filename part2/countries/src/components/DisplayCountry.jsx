import axios from "axios"
import { useEffect, useState } from "react"


const DisplayCountry = ({ country }) => {
    const [weather, setWeather] = useState([])

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + country.capital + '&units=metric&appid=' + api_key
        axios
            .get(url)
            .then(response => {
                setWeather(response.data)
        })
    }, [country.capital])

    if (weather.main) {
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital - {country.capital}<br/> Population - {country.population}</p>
                <h3>Spoken Languages</h3>
                <ul>
                    {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={country.flags.png} alt="flag" width="150" height="100"/>
                <h3>Weather in {country.capital}</h3>
                <b>Temperature:</b> {weather.main.temp} Celcius <br />
                <b>Wind</b>: Speed of {weather.wind.speed} at {weather.wind.deg} degrees
                <p>Here's a guide for wind direction based on degrees: </p>
                <img src="https://slash2.getwindsurffit.com/wp-content/uploads/compass-wind-direction.jpg" alt="wind-direction" width="400" height="400" />
            </div>
        )
    } else {
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital - {country.capital}<br/> Population - {country.population}</p>
                <h3>Spoken Languages</h3>
                <ul>
                    {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={country.flags.png} alt="flag" width="150" height="100"/>
                <h3>Weather in {country.capital}</h3>
            </div>
        )
    }
    
}

export default DisplayCountry