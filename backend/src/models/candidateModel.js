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
        throw new Error('Failed to fetch candidates', err.message);
    }
}