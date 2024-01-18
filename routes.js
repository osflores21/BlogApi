import express from 'express';

const routes = express.Router();
//Get all posts
routes.get('/', (request, response) => {
    request.getConnection((err, conn) =>{
        if(err) return response.send(err);

        conn.query('select * from Entries', (err,rows) =>{
            if(err) return response.send(err);
            response.json(rows);
        })
    })
})

/* //Filter for title, autor or content and order by desc/asc
routes.get('/:filter', (request, response) => {
    request.getConnection((err, conn) =>{
        if(err) return response.send(err);

        const { filter } = request.params;
        const validFilters = ['title', 'content', 'autor']; // list of valid columns

        if (!validFilters.includes(filter)) {
            return response.status(400).json({ error: 'Invalid filter provided' });
        }
        conn.query( `select * from Entries order by ${conn.escapeId(filter)} desc `, [request.params.filter], (err,rows) => {
            if(err) return response.send(err);
            response.json(rows);
        })
    })
}) */
// search by autor, content or title %search% 
routes.get('/:search', (request, response) => {
    request.getConnection((err, conn) =>{
        if(err) return response.send(err);

        const { search } = request.params;
console.log("search",request.params)
        conn.query(
            `SELECT * FROM Entries 
            WHERE autor LIKE '%${search}%' OR content LIKE '%${search}%' OR title LIKE '%${search}%'`,
            (err, rows) =>{
                if(err) return response.send(err);
                response.json(rows);
            }
        );
    });
});
routes.get('/id', (request, response) => {
    request.getConnection((err, conn) =>{
        if(err) return response.send(err);

        conn.query('select * from Entries WHERE id = ', [request.params.id]  ,(err,rows) =>{
            if(err) return response.send(err);
            response.json(rows);
        })
    })
})


// Add new post
routes.post('/', (request, response) => {
    request.getConnection((err, conn) =>{
        if(err) return response.send(err);

        conn.query('insert into Entries set ?', [request.body] , (err,rows) =>{
            if(err) return response.send(err);
            response.json(rows);
        })
    })
})

//Delete a post by id
routes.delete('/:id', (request, response) => {
    request.getConnection((err, conn) =>{
        if(err) return response.send(err);

        conn.query('delete from Entries where id = ?', [request.params.id] , (err) =>{
            if(err) return response.send(err);
            response.send("Deleted");
        })
    })
})

//Update post 
routes.put('/:id', (request, response) => {
    request.getConnection((err, conn) =>{
        if(err) return response.send(err);

        conn.query('update Entries set ? where id = ?', [request.body, request.params.id] , (err) =>{
            if(err) return response.send(err);
            response.send("updated");
        })
    })
})

export default routes;