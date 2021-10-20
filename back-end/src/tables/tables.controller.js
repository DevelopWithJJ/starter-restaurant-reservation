const service = require("./tables.service");
const resService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const hasRequiredProperties = hasProperties("table_name", "capacity");

function validateName(req, res, next) {
  const { table_name } = req.body.data;
  if (!table_name || table_name === "" || table_name.length < 2) {
    next({
      status: 400,
      message: `The table must have a table_name property that is at least two characters long.`,
    });
  }
  next();
}

function validCapacity(req, res, next) {
  const { capacity } = req.body.data;
  if (!capacity || capacity < 1 || typeof capacity !== "number") {
    next({
      status: 400,
      message: `The table must have a capacity of at least 1.`,
    });
  }
  next();
}

function hasData(req, res, next) {
  const data = req.body.data;
  if (data) {
    next();
  } else {
    next({
      status: 400,
      message: `Request is missing 'data'.`,
    });
  }
}

//checks for reservation id and if it matches..... if no reservation is found throws error
async function resExists(req, res, next) {
  const { reservation_id } = req.body.data;
  if (!reservation_id) {
    next({
      status: 400,
      message: `A reservation_id is required`,
    });
  }
  const reservation = await resService.read(reservation_id);
  if (reservation) {
    res.locals.res = reservation;
    next();
  } else {
    next({
      status: 404,
      message: `A reservation with the id ${reservation_id} was not found.`,
    });
  }
}

//checks for table id and if it matches..... if no table is found throws error
async function tableExists(req, res, next) {
  const table_id = Number(req.params.table_id);
  const table = await service.read(table_id);
  if (table) {
    res.locals.table = table;
    next();
  } else {
    next({
      status: 404,
      message: `Table with id ${table_id} does not exist.`,
    });
  }
}

function tableOpen(req, res, next) {
  const occupied = res.locals.table.reservation_id;
  //console.log("occupied ======>", occupied);
  if (occupied) {
    next({
      status: 400,
      message: `Table ${res.locals.table.table_id} is currently occupied. Please select another table.`,
    });
  }
  next();
}

function validateSeated(req, res, next) {
  const { status } = res.locals.res;
  if (status === "seated") {
    next({
      status: 400,
      message: `This reservation is already seated at at table!`,
    });
  }
  next();
}

async function validatePeople(req, res, next) {
  const people = res.locals.res.people;
  if (people) {
    res.locals.partySize = people;
    next();
  } else {
    next({
      status: 400,
      message: `People is not defined`,
    });
  }
}

function validatePartyWithTable(req, res, next) {
  const partySize = res.locals.partySize;
  const capacity = res.locals.table.capacity;
  if (partySize > capacity) {
    next({
      status: 400,
      message: `The party size is greater than the table capacity. Please select another table.`,
    });
  }
  next();
}

async function create(req, res, next) {
  const newTable = { ...req.body.data };
  newTable.status = "booked";
  const data = await service.create(newTable);
  res.status(201).json({ data });
}

async function updateTable(req, res, next) {
  const { reservation_id } = req.body.data;
  const table_id = req.body.data.table_id || Number(req.params.table_id);
  const data = await service.update(reservation_id, table_id);
  res.json({ data });
}

async function list(req, res, next) {
  const data = await service.list();
  res.json({ data });
}

async function validateAvailability(req, res, next) {
  const table_id = Number(req.params.table_id);
  const table = await service.read(table_id);

  if (table.reservation_id) {
    res.locals.table = table;
    next();
  } else {
    next({
      status: 400,
      message: `Table is not occupied.`,
    });
  }
}

//clears table when it has been finished with previous reservation
async function destroy(req, res) {
  const table_id = req.params.table_id;
  const reservation_id = res.locals.table.reservation_id;
  const data = await service.clearTable(table_id, reservation_id);
  res.json({ data });
}

module.exports = {
  create: [
    hasRequiredProperties,
    asyncErrorBoundary(validateName),
    asyncErrorBoundary(validCapacity),
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(hasData),
    asyncErrorBoundary(resExists),
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(tableOpen),
    asyncErrorBoundary(validateSeated),
    asyncErrorBoundary(validatePeople),
    asyncErrorBoundary(validatePartyWithTable),
    asyncErrorBoundary(updateTable),
  ],
  delete: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(validateAvailability),
    asyncErrorBoundary(destroy),
  ],
  list: asyncErrorBoundary(list),
};
