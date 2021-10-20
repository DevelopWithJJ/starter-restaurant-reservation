const knex = require("../db/connection");

function list(date, mobile_number) {
  if (date) {
    return knex("reservations")
      .select()
      .where({ reservation_date: date })
      .orderBy("reservation_time");
  }
  if (mobile_number) {
    return knex("reservations")
      .select()
      .where("mobile_number", "like", `${mobile_number}%`);
  }
  return knex("reservations").select();
}

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function update(reservation_id, status) {
  return knex("reservations")
    .where({ reservation_id })
    .update({ status: status });
}

function read(reservation_id) {
  return knex("reservations").select().where({ reservation_id }).first();
}

function edit(reservation_id, reservation) {
  return knex("reservations")
    .where({ reservation_id })
    .update({ ...reservation })
    .returning()
    .then((updatedRecords) => updatedRecords[0]);
}

module.exports = { list, create, read, update, edit };
