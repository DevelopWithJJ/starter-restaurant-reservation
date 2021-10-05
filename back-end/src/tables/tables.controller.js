const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const hasRequiredProperties = hasProperties("table_name", "capacity");

function validateTable(req, res, next) {
  const table = req.body.data.table_name;
  console.log(table.length);
  if (table.length) {
    return next();
  }
  next({ status: 400, message: `table_name must be more than one character` });
}

function capacityIsNumber(req, res, next) {
  const capacity = req.body.data.capacity;
  if (typeof capacity === "number") {
    return next();
  }
  next({ status: 400, message: `capacity must be number` });
}

async function list(req, res) {
  const data = await service.list();
  res.json({
    data,
  });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasRequiredProperties,
    validateTable,
    capacityIsNumber,
    asyncErrorBoundary(create),
  ],
};
