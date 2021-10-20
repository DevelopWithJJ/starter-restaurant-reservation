/**
 * List handler for reservation resources
 */

//Imports for our controller
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

function validateData(req, res, next) {
  if (!req.body.data) {
    return next({ status: 400, message: "Body must include a data object" });
  }

  next();
}

function validateBody(req, res, next) {
  if (typeof req.body.data.people !== "number") {
    return next({ status: 400, message: `people must be a numeber` });
  }
  if (req.body.data.people < 1) {
    return next({ status: 400, message: `people must have at least 1` });
  }
  if (req.body.data.status && req.body.data.status !== "booked") {
    return next({
      status: 400,
      message: `status fields cannot be ${req.body.data.status}`,
    });
  }
  next();
}

function validateDate(req, res, next) {
  const date = req.body.data.reservation_date;
  const time = req.body.data.reservation_time;
  const reservedDate = new Date(`${date} ${time}`);
  const current = new Date();
  //Check if reservation_time and reservation_date is valid
  if (!Date.parse(`${date} ${time}`)) {
    return next({
      status: 400,
      message: `reservation_date and reservation_time must be valid`,
    });
  }
  //Check if trying to set reservation on a Tuesday
  if (reservedDate.getDay() === 2) {
    return next({ status: 400, message: "Restaurant is closed on Tuesdays" });
  }
  //Check if setting reservation date before today's date
  if (Date.parse(`${date} ${time}`) < current) {
    return next({
      status: 400,
      message: "reservation_date and reservation_time must be in the future",
    });
  }
  if (
    reservedDate.getHours() < 10 ||
    (reservedDate.getHours() === 10 && reservedDate.getMinutes() < 30)
  ) {
    return next({
      status: 400,
      message: "Reservation cannot be before 10:30AM",
    });
  }
  if (
    reservedDate.getHours() > 22 ||
    (reservedDate.getHours() === 22 && reservedDate.getMinutes() >= 30)
  ) {
    return next({
      status: 400,
      message: "Reservation cannot be after 10:30PM",
    });
  }
  if (
    reservedDate.getHours() > 21 ||
    (reservedDate.getHours() === 21 && reservedDate.getMinutes() > 30)
  ) {
    return next({
      status: 400,
      message: "Reservation must be made an hour before closing",
    });
  }
  next();
}

async function reservationExists(req, res, next) {
  const reservation = await service.read(req.params.reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `reservation_id ${req.params.reservation_id} does not exist`,
  });
}

function validateUpdateBody(req, res, next) {
  if (!req.body.data.status) {
    return next({ status: 400, message: "body must include a status field" });
  }
  if (
    req.body.data.status !== "booked" &&
    req.body.data.status !== "seated" &&
    req.body.data.status !== "finished" &&
    req.body.data.status !== "cancelled"
  ) {
    return next({
      status: 400,
      message: `status field cannot be ${req.body.data.status}`,
    });
  }
  if (res.locals.reservation.status === "finished") {
    return next({
      status: 400,
      message: `a finished reservation cannot be updated`,
    });
  }
  next();
}

async function list(req, res) {
  const date = req.query.date;
  const mobile_number = req.query.mobile_number;
  const reservations = await service.list(date, mobile_number);
  const data = reservations.filter(
    (reservation) => reservation.status !== "finished"
  );
  res.json({
    data,
  });
}

async function edit(req, res) {
  const data = await service.edit(
    res.locals.resevation.reservation_id,
    req.body.data
  );
  res.json({ data });
}

async function create(req, res) {
  req.body.data.status = "booked";
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

function read(req, res) {
  const { reservation: data } = res.locals;
  res.json({ data });
}

async function update(req, res) {
  await service.update(
    res.locals.reservation.reservation_id,
    req.body.data.status
  );
  res.json({ data: { status: req.body.data.status } });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasRequiredProperties,
    validateBody,
    validateDate,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), read],
  edit: [
    asyncErrorBoundary(reservationExists),
    hasRequiredProperties,
    validateBody,
    validateDate,
    asyncErrorBoundary(edit),
  ],
  update: [
    validateData,
    asyncErrorBoundary(reservationExists),
    validateUpdateBody,
    asyncErrorBoundary(update),
  ],
};
