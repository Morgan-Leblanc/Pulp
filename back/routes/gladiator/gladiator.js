// REQUIRE what we need :
const express = require("express")
const connection = require('../../config/config')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("Route = /gladiator").status(200)
})

// GET ALL GLADIATOR
router.get('/all-cosmetic', (req, res)=> {
    connection.query('SELECT * FROM gladiator', (err, results) => {
        if (err) {
            res.status(500).send(`Erreur lors de la récupération de la liste des gladiateurs !!`)
        } else {
            res.status(200).send(results)
        }
    })
})

// GET ONE GLADIATOR BY ID
router.get('/:id', (req, res)=> {
    const id = req.params.id
    connection.query('SELECT * FROM gladiator WHERE id = ?', id, (err, results) => {
        if (err) {
            res.send(`Erreur lors de la récupération du gladiateur !!`).status(500)
        } else {
            res.send(results).status(200)
        }
    })
})

// POST / CREATE GLADIATOR - (Objet/Body)
router.post('/', (req, res)=> {
    const gladiator = req.body
    connection.query('INSERT INTO gladiator SET ? ', gladiator, (err, results) => {
        if (err) {
            res.send(`Erreur lors de la création du gladiateur !!`).status(500)
        } else {
            res.send(results).status(200)
        }
    })
})

// UPTATE GLADIATOR
router.put('/:id', (req, res)=> {
    const id = req.params.id
    const gladiator = req.body
    connection.query('UPDATE gladiator SET ? WHERE id = ?', [gladiator, id], (err, results) => {
        if (err) {
            res.send(`Erreur lors de la modification du gladiator !!`).status(500)
        } else {
            res.send(results).status(200)
        }
    })
})

// DELETE GLADIATOR BY ID
router.delete('/:id', (req, res)=> {
    const id = req.params.id
    connection.query('DELETE FROM gladiator WHERE id = ?', id, (err, results) => {
        if (err) {
            res.send(`Erreur lors de la suppression du gladiateur !!`).status(500)
        } else {
            res.send('Le gladiateur a bien été supprimé de la base de donnée').status(200)
        }
    })
})

module.exports = router