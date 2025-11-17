const express = require('express');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
  toggleTaskStatus
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);
router.route('/:id')
  .get(protect, getTaskById) 
  .put(protect, updateTask)
  .delete(protect, deleteTask);
router.put("/:id/toggle", protect, toggleTaskStatus);

module.exports = router;
