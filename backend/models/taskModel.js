const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',   
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    dueDate: {
      type: Date,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    }
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
