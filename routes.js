const express = require('express');

const routes = express.Router();
//Get all posts
routes.get('/', (request, response) => {
    request.getConnection((err, conn) =>{
        if(err) return response.send(err);

        conn.query('select * from Entradas', (err,rows) =>{
            if(err) return response.send(err);
            response.json(rows);
        })
    })
})

//Filter for title, autor or content
routes.get('/:filter', (request, response) => {
    request.getConnection((err, conn) =>{
        if(err) return response.send(err);

        const { filter } = request.params;
        const validFilters = ['title', 'content', 'autor']; // list of valid columns

        if (!validFilters.includes(filter)) {
            return response.status(400).json({ error: 'Invalid filter provided' });
        }
        conn.query( `select * from Entradas order by ${conn.escapeId(filter)} asc `, [request.params.filter], (err,rows) => {
            if(err) return response.send(err);
            response.json(rows);
        })
    })
})

// Add new post
routes.post('/', (request, response) => {
    request.getConnection((err, conn) =>{
        if(err) return response.send(err);

        conn.query('insert into Entradas set ?', [request.body] , (err,rows) =>{
            if(err) return response.send(err);
            response.json(rows);
        })
    })
})

//Delete a post by id
routes.delete('/:id', (request, response) => {
    request.getConnection((err, conn) =>{
        if(err) return response.send(err);

        conn.query('delete from Entradas where id = ?', [request.params.id] , (err) =>{
            if(err) return response.send(err);
            response.send("Deleted");
        })
    })
})

//Update post 
routes.put('/:id', (request, response) => {
    request.getConnection((err, conn) =>{
        if(err) return response.send(err);

        conn.query('update Entradas set ? where id = ?', [request.body, request.params.id] , (err) =>{
            if(err) return response.send(err);
            response.send("updated");
        })
    })
})

module.exports = routes;