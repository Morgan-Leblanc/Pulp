// REQUIRE what we need :
const express = require("express")
const connection = require('../../config/config')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("Route = /combat").status(200)
})

// GET ALL COMBAT
router.get('/all', (req, res)=> {
    connection.query('SELECT * FROM combat', (err, results) => {
        if (err) {
            res.status(500).send(`Erreur lors de la récupération de la liste des combats !!`)
        } else {
            res.status(200).send(results)
        }
    })
})

// GET ONE COMBAT
router.get('/:id', (req, res)=> {
    const id = req.params.id
    connection.query('SELECT * FROM combat WHERE id = ?', id, (err, results) => {
        if (err) {
            res.status(500).send(`Erreur lors de la récupération du combat !!`)
        } else if(results.length >= 1) {
            res.status(200).send(results)
        } else {
            res.status(200).send('No results')
        }
    })
})

// POST / CREATE COMBAT - (Objet/Body)
router.post('/', (req, res)=> {
    const combat = req.body
    connection.query('INSERT INTO combat SET ? ', combat, (err, results) => {
        if (err) {
            res.send(`Erreur lors de la création du combat !!`).status(500)
        } else {
            res.send(results).status(200)
        }
    })
})

// UPTATE COMBAT
router.put('/:id', (req, res)=> {
    const id = req.params.id
    const combat = req.body
    connection.query('UPDATE combat SET ? WHERE id = ?', [combat, id], (err, results) => {
        if (err) {
            res.send(`Erreur lors de la modification du combat !!`).status(500)
        } else {
            res.send(results).status(200)
        }
    })
})

// DELETE COMBAT BY ID
router.delete('/:id', (req, res)=> {
    const id = req.params.id
    connection.query('DELETE FROM combat WHERE id = ?', id, (err, results) => {
        if (err) {
            res.send(`Erreur lors de la suppression du combat !!`).status(500)
        } else {
            res.send('Le combat a bien été supprimé de la base de donnée').status(200)
        }
    })
})

module.exports = router