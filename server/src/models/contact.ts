import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'UserModel'
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    pic: {
      type: String,
      required: false,
      default:
        'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  },
  {
    timestamps: true
  }
);

const Note = mongoose.model('Note', noteSchema);

export default Note;
