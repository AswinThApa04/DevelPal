const express = require('express');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
  toggleTaskStatus,
  getTaskStats,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router.get("/stats", protect, getTaskStats);

router.route('/:id')
  .get(protect, getTaskById) 
  .put(protect, updateTask)
  .delete(protect, deleteTask);
router.put("/:id/toggle", protect, toggleTaskStatus);



module.exports = router;
