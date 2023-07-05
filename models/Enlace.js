const mongoose = require("mongoose")

const EnlaceSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  nombre:{
    type: String,
    required: true
  },
  nombre_original:{
    type: String,
    required: true
  },
  descargas: {
    type: Number
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    default: null
  },
  password: {
    type: String,
    default: null
  },
  creado: {
    type: Date,
    default: Date.now()
  }
})

const Enlace = mongoose.model("Enlace", EnlaceSchema)

module.exports = Enlace