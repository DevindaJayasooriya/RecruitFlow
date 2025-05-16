const db = require('../config/dbConfig');

const getAllCandidates = async () =>{
    try{

        const { stage, page = 1, limit = 10, sortBy = 'id' } = query;
        const offset = (page - 1) * limit;

        let sql = 'SELECT * FROM candidates';
        const params = [];

        if (stage) {
            sql += ' WHERE stage = ?';
            params.push(stage);
        }

        sql += ' LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));

        const validSortFields = ['id', 'name', 'applicationDate', 'overallScore'];
        const sortField = validSortFields.includes(sortBy) ? sortBy : 'id';
        sql += ` ORDER BY ${sortField} ASC`;

        const candidates = await new Promise ((resolve, reject) =>{
            db.all(sql , params , (err, rows) =>{
                if(err){
                    return reject(new Error('Failed to fetch candidates: ' + err.message));
                }
                resolve(rows); 
            });
        });
        return candidates;
    }catch (err){
        console.error('Error fetching candidates:', err.message);
        throw new Error('Failed to fetch candidates: '+ err.message);
    }
}

const getCandidateById = async (id) =>{
    try{
        let sql = 'SELECT * FROM candidates WHERE id = ?';
        const params = [id];
        const candidate = await new Promise ((resolve, reject) => {
            db.get(sql, params , (err, row) =>{
                if (err){
                    return reject(new Error('Failed to fetch candidate by ID: ' + err.message));
                }
                resolve(row);
            });
        });

        if (!candidate) {
            throw new Error('Candidate not found with ID: ' + id);
        }

        return candidate;

    }catch (err){
        console.error('Error fetching candidate by ID: ', err.message);
        throw new Error('Failed to fetch candidate by ID: '+ err.message);
    }
};

const createCandidate = async (candidateData) =>{
    try{
        const { name , stage, applicationDate, overallScore, referralStatus, assessmentStatus } = candidateData;
        const requiredFields = ['name', 'stage', 'applicationDate', 'overallScore', 'referralStatus', 'assessmentStatus'];
        const missingField = requiredFields.find(field => candidateData[field] === undefined || candidateData[field] === null);

        if (missingField) {
            throw new Error(`Missing required field: ${missingField}`);
        }

        const validStages = ['Applying Period', 'Screening', 'Interview', 'Test'];
        if (!validStages.includes(candidateData.stage)) {
            throw new Error(`Invalid stage: ${stage}. Valid stages are: ${validStages.join(', ')}`);
        }

        if (typeof overallScore !== 'number' || isNaN(overallScore)) {
            throw new Error('overallScore must be a valid number');
        }

        const validReferralStatuses = ['Referred', 'Not Referred'];
        if (!validReferralStatuses.includes(referralStatus)) {
            throw new Error(`Invalid referralStatus: ${referralStatus}. Valid values are: ${validReferralStatuses.join(', ')}`);
        }

        const validAssessmentStatuses = ['Pending', 'Completed'];
        if (!validAssessmentStatuses.includes(assessmentStatus)) {
            throw new Error(`Invalid assessmentStatus: ${assessmentStatus}. Valid values are: ${validAssessmentStatuses.join(', ')}`);
        }

        const sql = 'INSERT INTO candidates (name, stage, applicationDate, overallScore, referralStatus, assessmentStatus) VALUES (?, ?, ?, ?, ?, ?)';
        const params = [
            String(name),
            String(stage),
            String(applicationDate),
            overallScore,
            String(referralStatus),
            String(assessmentStatus)
        ];
        
        const result = await new Promise ((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) {
                    return reject(new Error('Failed to create candidate: ' + err.message));
                }
                resolve(this.lastID);
            });
        });
        return result;

    } catch (err) {
        console.error('Error creating candidate: ', err.message);
        throw new Error('Failed to create candidate: '+ err.message);
    }
}

const updateCandidate = async (id, candidateData) =>{
    try{
        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            throw new Error('Invalid ID: ID must be a positive integer');
        }

        const { name, stage, applicationDate, overallScore, referralStatus, assessmentStatus } = candidateData;
        const requiredFields = ['name', 'stage', 'applicationDate', 'overallScore', 'referralStatus', 'assessmentStatus'];
        const missingField = requiredFields.find(field => candidateData[field] === undefined || candidateData[field] === null);

        if (missingField) {
            throw new Error(`Missing required field: ${missingField}`);
        }

        const validStages = ['Applying Period', 'Screening', 'Interview', 'Test'];
        if (!validStages.includes(candidateData.stage)) {
            throw new Error(`Invalid stage: ${candidateData.stage}. Valid stages are: ${validStages.join(', ')}`);
        }

        if (typeof overallScore !== 'number' || isNaN(overallScore)) {
            throw new Error('overallScore must be a valid number');
        }

        const validReferralStatuses = ['Referred', 'Not Referred'];
        if (!validReferralStatuses.includes(referralStatus)) {
            throw new Error(`Invalid referralStatus: ${referralStatus}. Valid values are: ${validReferralStatuses.join(', ')}`);
        }

        const validAssessmentStatuses = ['Pending', 'Completed'];
        if (!validAssessmentStatuses.includes(assessmentStatus)) {
            throw new Error(`Invalid assessmentStatus: ${assessmentStatus}. Valid values are: ${validAssessmentStatuses.join(', ')}`);
        }

        const sql = `UPDATE candidates SET name = ?, stage = ?, applicationDate = ?, overallScore = ?, referralStatus = ?, assessmentStatus = ? WHERE id = ?`;
        const params = [
            String(name),
            String(stage),
            String(applicationDate),
            overallScore,
            String(referralStatus),
            String(assessmentStatus),
            id
        ];

        const result = await new Promise ((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) {
                    return reject(new Error('Failed to update candidate: ' + err.message));
                }
                resolve(this.changes);
            });
        });

        if (result === 0) {
            throw new Error('Candidate not found with ID: ' + id);
        }

        return result;

    } catch (err) {
        console.error('Error updating candidate: ', err.message);
        throw new Error('Failed to update candidate: '+ err.message);
    }
}

const deleteCandidate = async (id) =>{
    try{

    } catch (err){
        console.error ('Error deleting candidate:', err.message);
        throw new Error ('Failed to deelete candidate:'+ err.message)
    }
}