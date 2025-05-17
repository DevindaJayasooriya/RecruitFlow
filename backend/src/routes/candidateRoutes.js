const express = require("express");
const router = express.Router();

const {
  getAllCandidatesController,
  getCandidateByIdController,
  createCandidateController,
  updateCandidateController,
  deleteCandidateController,
} = require("../controllers/candidateController");

// Route to get all candidates with optional query parameters
router.get("/", getAllCandidatesController);

// Route to get a candidate by ID
router.get("/:id", getCandidateByIdController);

// Route to create a new candidate
router.post("/", createCandidateController);

// Route to update a candidate by ID
router.put("/:id", updateCandidateController);

// Route to delete a candidate by ID
router.delete("/:id", deleteCandidateController);

module.exports = router;
