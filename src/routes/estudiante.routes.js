const router = require("express").Router();

const controller = require("../controllers/estudiante.controller");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.get("/:id/cursos", controller.getCursos);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.deleted);

module.exports = router;