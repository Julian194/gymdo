const spicedPg = require('spiced-pg');
const db = spicedPg(process.env.DATABASE_URL || "postgres:juliankaiser:password@localhost:5432/gymdo");

module.exports.loginUser = function(email){
  const select = "SELECT * FROM users WHERE email = $1"
  return db.query(select, [email])
}

module.exports.addUser = function(first, last, email, password) {
  const insert = "INSERT INTO users (first, last, email, password) VALUES ($1,$2,$3,$4) RETURNING id"
  return db.query(insert, [first, last, email, password]);
}

module.exports.getUser = function(userId){
  const select = "SELECT * FROM users WHERE users.id = $1"
  return db.query(select, [userId])
}

module.exports.updateUserImg = function(imgURL, userId){
  const update = "UPDATE users SET profilepicurl = $1 WHERE users.id = $2"
  return db.query(update, [imgURL, userId])
}

module.exports.updateTitleImg = function(imgURL, userId){
  const update = "UPDATE users SET titleimageurl = $1 WHERE users.id = $2"
  return db.query(update, [imgURL, userId])
}
