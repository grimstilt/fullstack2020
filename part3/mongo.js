const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://gus:${password}@cluster0.9i1e0.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema =  new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}
else {
  Person
    .find({})
    .then(result => {
      console.log('phonebook:')
      result.forEach(person => console.log(person.name, person.number))
      mongoose.connection.close()
    })
}