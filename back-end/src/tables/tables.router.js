const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const reservationsRouter = require("../reservations/reservations.controller");

router
  .route("/:table_id([0-9]+)/seat")
  .put(controller.update)
  .delete(controller.delete);

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

module.exports = router;
