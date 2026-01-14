const Task = require("../models/task.model");

exports.createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    userId: req.user.id,
  });
  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

// TASK STATISTICS
exports.getTaskStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const total = await Task.countDocuments({ userId });
    const completed = await Task.countDocuments({
      userId,
      status: "Completed",
    });
    const pending = await Task.countDocuments({
      userId,
      status: "Pending",
    });
    const inProgress = await Task.countDocuments({
      userId,
      status: "In Progress",
    });

    res.json({
      total,
      completed,
      pending,
      inProgress,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

