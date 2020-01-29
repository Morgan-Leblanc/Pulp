// REQUIRE what we need :
const express = require("express")
const connection = require('../../config/config')
const router = express.Router()

//GET
router.get('/', (req, res) => {
    res.send("Route = /user").status(200)
})

// get all user
router.get('/all', (req, res)=> {
    connection.query('SELECT * FROM user', (err, results) => {
        if (err) {
            res.send(`Erreur lors de la récupération de la liste des users !!`).status(500)
        } else {
            res.send(results).status(200)
        }
    })
})

// get user (by params id) 
router.get('/:id', (req, res)=> {
    const id = req.params.id
    connection.query('SELECT * FROM user Where id = ?', id, (err, results) => {
        if (err) {
            res.send(`Erreur lors de la récupération de l'utilisateur !!`).status(500)
        } else {
            res.send(results).status(200)
        }
    })
})

//POST

// post new user (Objet/Body)
router.post('/', (req, res)=> {
    const user = req.body
    connection.query('INSERT INTO user SET ? ', user, (err, results) => {
        if (err) {
            res.send(`Erreur lors de la création de l'utilisateur !!`).status(500)
        } else {
            res.send(results).status(200)
        }
    })
})


//UPTATE
// update user (by params id) 
router.put('/:id', (req, res)=> {
    const id = req.params.id
    const user = req.body
    connection.query('UPDATE user SET ? WHERE id = ?', [user, id], (err, results) => {
        if (err) {
            res.send(`Erreur lors de la création de l'utilisateur !!`).status(500)
        } else {
            res.send(results).status(200)
        }
    })
})

//DELETE
// delete user (by params id) 
router.delete('/:id', (req, res)=> {
    const id = req.params.id
    connection.query('DELETE FROM user WHERE id = ?', id, (err, results) => {
        if (err) {
            res.send(`Erreur lors de la suppression de l'utilisateur !!`).status(500)
        } else {
            res.send(results).status(200)
        }
    })
})

module.exports = router
