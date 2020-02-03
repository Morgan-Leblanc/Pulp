// REQUIRE what we need :
const express = require("express");
const connection = require("../../config/config");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Route = /combat").status(200);
});

// GET ALL COMBAT
router.get("/all", (req, res) => {
  connection.query("SELECT * FROM combat", (err, results) => {
    if (err) {
      res
        .status(500)
        .send(`Erreur lors de la récupération de la liste des combats !!`);
    } else {
      res.status(200).send(results);
    }
  });
});

// GET ALL COMBAT
router.get("/all-combat-by-type", (req, res) => {
  connection.query("SELECT * FROM combat_type", (err, results) => {
    if (err) {
      res
        .status(500)
        .send(
          `Erreur lors de la récupération de la liste des combats par leur type!!`
        );
    } else {
      res.status(200).send(results);
    }
  });
});

//GET SKILL
router.get("/allskill", (req, res) => {
  connection.query("SELECT * FROM skill", (err, results) => {
    if (err) {
      res
        .status(500)
        .send(`Erreur lors de la récupération de la liste des skills !!`);
    } else {
      res.status(200).send(results);
    }
  });
});
//GET SKILL BY GLADIATOR
router.get("/skill-by-gladiator", (req, res) => {
  connection.query(
    "SELECT * FROM `skill` join gladiator on skill.id=gladiator.id where gladiator.is_skillable = 1",
    (err, results) => {
      if (err) {
        res
          .status(500)
          .send(
            `Erreur lors de la récupération de la liste des skills des gladiateurs !!`
          );
      } else {
        res.status(200).send(results);
      }
    }
  );
});
// GET ONE COMBAT
router.get("/:id", (req, res) => {
  const id = req.params.id;
  connection.query("SELECT * FROM combat WHERE id = ?", id, (err, results) => {
    if (err) {
      res.status(500).send(`Erreur lors de la récupération du combat !!`);
    } else if (results.length >= 1) {
      res.status(200).send(results);
    } else {
      res.status(200).send("No results");
    }
  });
});

// POST GLADIATOR_COMBAT
router.post("/add-gladiator", (req, res) => {
  const objet = req.body;
  console.log(objet);
  connection.query(
    `SELECT * from gladiator_combat WHERE id_gladiator = ${objet.id_gladiator} AND id_combat = ${objet.id_combat}`,
    (err, results) => {
      if (err) {
        console.log(err);
        res.send(`Erreur lors de l'ajout des types au combat !!`).status(500);
      } else if (results.length > 0) {
        res.send("Le gladiateur est deja assigné au combat ").status(500);
      } else {
        connection.query(
          "INSERT INTO gladiator_combat SET ?",
          objet,
          (err, results) => {
            if (err) {
              console.log(err);
              res
                .send(`Erreur lors de l'ajout des gladiateurs au combat !!`)
                .status(500);
            } else {
              res
                .send("Le gladiateur à  bien été assigné au combat")
                .status(200);
            }
          }
        );
      }
    }
  );
});

///ADD SKILL///
router.post("/add-skill", (req, res) => {
  const objet = req.body;
  console.log(objet);
  connection.query(
    `SELECT * from gladiator_skill WHERE id_gladiator = ${objet.id_gladiator} AND id_skill = ${objet.id_skill}`,
    (err, results) => {
      if (err) {
        console.log(err);
        res.send(`Erreur lors de l'ajout des skills !!`).status(500);
      } else if (results.length > 0) {
        console.log("else if", results);
        res.send(`L'arme utilisé est deja assigné au combat `).status(200);
      } else {
        connection.query(
          "INSERT INTO gladiator_skill SET ?",
          objet,
          (err, results) => {
            if (err) {
              console.log(err);
              res
                .send(`Erreur lors de l'ajout des skills au combat !!`)
                .status(500);
            } else {
              res
                .send("Le gladiateur et son skill ont  bien été ajouté !")
                .status(200);
            }
          }
        );
      }
    }
  );
});

///POST  CREATE COMBAT ///délai message d'erreur [async await] mettre en place.
router.post("/", (req, res) => {
  let error;
  const types = req.body.types;
  let id_types = [];
  for (let i = 0; i < types.length; i++) {
    id_types.push(types[i].id);
  }
  const id_combat = req.body.id_combat;
  for (let i = 0; i < id_types.length; i++) {
    const objet = {
      id_combat: id_combat,
      id_type: id_types[i]
    };
    connection.query(
      `SELECT * from combat_type WHERE id_combat = ${objet.id_combat} AND id_type = ${objet.id_type}`,
      (err, results) => {
        if (err) {
          console.log(err);
          res.send(`Erreur lors de l'ajout des types au combat !!`).status(500);
        } else if (results.length > 0) {
          error = "Le type existe deja pour ce combat";
        } else {
          connection.query("INSERT INTO combat_type SET ?", objet, err => {
            if (err) {
              console.log(err);
              res
                .send(`Erreur lors de l'ajout des types au combat !!`)
                .status(500);
            }
          });
        }
      }
    );
  }

  setTimeout(function() {
    ///Remplacer par async await.
    console.log(error);
    if (error) {
      res.send("error").status(500);
    } else {
      res.send("Post OK").status(200);
    }
  }, 1000);
});

// GET ALL GLADIATOR
router.get("/types/:id_combat", (req, res) => {
  const id = req.params.id_combat;
  console.log(req.params);
  connection.query(
    "SELECT * FROM type join combat_type on type.id=combat_type.id_type where id_combat = ?",
    id,
    (err, results) => {
      if (err) {
        res
          .status(500)
          .send(
            `Erreur lors de la récupération de la liste des gladiateurs !!`
          );
      } else {
        res.status(200).send(results);
      }
    }
  );
});

// GET GLADIATOR BY TYPES
router.get("/gladiators/:id_type", (req, res) => {
  const id = req.params.id_type;
  console.log(req.params);
  connection.query(
    "SELECT * FROM gladiator join gladiator_type on gladiator.id=gladiator_type.id_gladiator where id_type = ?",
    id,
    (err, results) => {
      if (err) {
        res
          .status(500)
          .send(
            `Erreur lors de la récupération de la liste des gladiateurs !!`
          );
      } else {
        res.status(200).send(results);
      }
    }
  );
});
// GET ALL type
router.get("/type/all", (req, res) => {
  connection.query("SELECT * FROM type", (err, results) => {
    if (err) {
      res
        .status(500)
        .send(`Erreur lors de la récupération de la liste des types !!`);
    } else {
      res.status(200).send(results);
    }
  });
});
module.exports = router;
