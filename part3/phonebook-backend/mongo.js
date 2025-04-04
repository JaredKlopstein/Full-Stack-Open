const mongoose = require("mongoose");
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.a76iyzq.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (!name || !number) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}
