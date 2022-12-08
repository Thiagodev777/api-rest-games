const express = require('express');
const app = express();

const port = 8089;
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const Helpers = require('./Helpers');
const helpers = new Helpers();

const DB = require('./database/jogos.json');


app.get('/games', (req, res) => {
    res.statusCode = 200;
    res.json(DB);
});

app.get('/game/:id', (req, res)=> {
    let {id} = req.params;
    if(isNaN(id)){
        res.sendStatus(400);
    } else {
        id = parseInt(id);
        let game = DB.find((game)=> game.id === id);
        if(game){
            res.statusCode = 200;
            res.json(game)
        } else {
            res.sendStatus(404)
        }
    }
});

app.post('/game', (req, res) => {
    let {title, price, year} = req.body;
    if(title && price && year){
        if(helpers.verifyType(title, price, year)){
            res.statusCode = 200;
            let newGame = {
                id: helpers.geraId(),
                title,
                price: parseInt(price),
                year: parseInt(year)
            }
            DB.push(newGame)
            res.json(newGame)
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(400)
    }
})

app.put('/game/:id', (req, res) => {
    let {id} = req.params;
    if(isNaN(id)){
        res.sendStatus(400);
    } else {
        id = parseInt(id);
        let game = DB.find((game)=> game.id === id);
        if(game){
            let {title, price, year} = req.body;
            if(title === undefined && price === undefined && year === undefined){
                res.sendStatus(400)
            }
            if(title){
                if(typeof(title) === 'string'){
                    res.statusCode = 200;
                    game.title = title;
                    res.json(game)
                } else {
                    res.sendStatus(400)
                }
            }
            if(price){
                if(typeof(price) === 'number'){
                    res.statusCode = 200;
                    game.price = price;
                    res.json(game)
                } else {
                    res.sendStatus(400)
                }
            }
            if(year){
                if(typeof(year) === 'number'){
                    res.statusCode = 200;
                    game.year = year;
                    res.json(game)
                } else {
                    res.sendStatus(400)
                }
            }
        } else {
            res.sendStatus(404)
        }
    }
})

app.delete('/game/:id', (req, res) => {
    let {id} = req.params;
    if(isNaN(id)){
        res.sendStatus(400);
    } else {
        id = parseInt(id);
        let index = DB.findIndex((game)=> game.id === id);
        if(index === -1){
            res.sendStatus(404)
        } else {
            res.statusCode = 200;
            res.json(DB[index])
            DB.splice(index, 1)
        }
    }
})

app.listen(port, () => {console.log(`server running on port http://localhost:${port}/games`)})