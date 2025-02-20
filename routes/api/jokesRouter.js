const express = require("express")
const validateBody = require("../../middlewares/validateBody")
const isValidId = require("../../middlewares/isValidId")
const {shemas} = require("../../models/jokeDataBaseModel");
const router = express.Router();
const ctrl = require("../../controllers/jokes");
router.get("/", ctrl.getAll);
router.post("/", validateBody(shemas.addJokeSchema), ctrl.add);
router.get("/:id", isValidId, ctrl.getById);
router.delete("/:id", isValidId, ctrl.deleteById);
router.put(
  "/:id",
  isValidId,
  validateBody(shemas.updateJokeSchema),
  ctrl.updateById
);
router.patch(
  "/:id/votes",
  isValidId,
  validateBody(shemas.updateVotesSchema),
  ctrl.updateVotes
);
module.exports = router;