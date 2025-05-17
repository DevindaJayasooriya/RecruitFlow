const { getAllCandidates, getCandidateById, createCandidate, updateCandidate, deleteCandidate } = require('../models/candidateModel');

const getAllCandidatesController = async (req, res) => {
    try {
        const { stage, page = 1, limit = 10, sortBy = 'id' } = req.query;
        
        const query = {
            stage,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            sortBy
        };

        const candidates = await getAllCandidates(query);
        res.status(200).json(candidates);
    } catch (err) {
        console.error('Error fetching candidates:', err.message);
        res.status(500).json({ error: err.message });
    }
};

const getCandidateByIdController = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'Invalid candidate ID: ID must be a positive integer' });
    }

    try {
        const candidate = await getCandidateById(id);
        res.status(200).json(candidate);

    } catch (err) {
        if (err.message.includes('Candidate not found')) {
            return res.status(404).json({ error: err.message });
        }
        console.error('Error fetching candidate by ID:', err.message);
        res.status(500).json({ error: err.message });
    }
};

const createCandidateController = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Invalid request body: missing candidate data' });
    }
    try{
        const newCandidateId = await createCandidate(req.body)
        res.status(201).json({id: newCandidateId, message: 'Candidate created successfully'});

    } catch (err) {
        console.error ('Error creating candidate: ', err.message);

        if(err.message.includes('Missing required field') || err.message.includes('Invalid stage') || err.message.includes('overallScore must be a valid number') || err.message.includes('Invalid referralStatus') || err.message.includes('Invalid assessmentStatus')){
            return res.status(400).json({ error: err.message });
        }

        res.status(500).json({ error: err.message });
    }
} 

const updateCandidateController = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'Invalid candidate ID: ID must be a positive integer' });
    }
    if (!req.body || Object.keys(req.body).length === 0){
        res.status(400).json({error: 'Invalid request body: missing candidate data'});
    }
    try{
        const changes = await updateCandidate(id, req.body);
        res.status(200).json({ changes : changes , message: 'Candidate updated successfully' });
    } catch (err){
        console.error('Error updating candidate:', err.message);
        if(err.message.includes('Candidate not found with ID')){
            return res.status(404).json({ error: err.message });
        }

        if(err.message.includes('Missing required field') || err.message.includes('Invalid stage') || err.message.includes('Invalid referralStatus') || err.message.includes('Invalid assessmentStatus') || err.message.includes('overallScore must be a valid number')){
            return res.status(400).json({ error: err.message });
        }

        res.status(500).json({ error: err.message });
    }
}

const deleteCandidateController = async (req, res) => {

}

module.exports = { getAllCandidatesController, getCandidateByIdController, createCandidateController, updateCandidateController, deleteCandidateController };