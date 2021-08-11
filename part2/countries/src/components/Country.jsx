import View from './View'

const Country = ({ countries }) => {
    if (countries.length === 1) {
      return (
        <div>
          <View country={countries[0]} />
        </div>
      )
    } else if (countries.length > 10) {
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    } else {
      return (
        countries.map(country => 
          <div key={country.alpha2Code}>
             {country.name} <button>show</button> 
          </div>)
      )
    } 
  }  

  export default Country