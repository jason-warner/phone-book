import mongoose, { Schema} from 'mongoose'
mongoose.pluralize(null);
const contactSchema = new Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String
});

const Contact = mongoose.model('contact', contactSchema, 'contacts');

export { Contact }