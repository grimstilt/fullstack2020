import Country from './Country'

const CountryList = ({ countries, text }) => {
    if (text === '') {
      return (
        <div></div>
      )
    } else {
      return (
        <div>
          <Country countries={countries.filter(country => country.name.toLowerCase().includes(text.toLowerCase()))} />
        </div>
      )
    }
  }

  export default CountryList