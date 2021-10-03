const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(result => {
    console.log('connected to Mongo DB')
  })
  .catch(error => {
    console.log(`error in connecting to mongo DB: ${error.message}`)

  })

const personSchema = new mongoose.Schema({
  name: {
    type: 'string',
    minLength: 3,
    unique: true,
    required: true
  },
  number: {
    type: 'Number',
    min: 8,
    unique: true,
    required: true
  }

})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)