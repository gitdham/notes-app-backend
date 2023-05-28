const { nanoid } = require("nanoid")
const notes = require("./notes")

const getAllNotesHanlder = () => ({
  status: 'success',
  data: { notes }
})

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params
  const note = notes.filter((note) => note.id === id)[0]

  if (!note) {
    const response = h.response({
      status: 'fail',
      message: 'Note tidak ditemukan'
    })
    response.code(404)
    return response
  }

  return {
    status: 'success',
    data: { note }
  }
}

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload
  const id = nanoid(16)
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt
  }

  notes.push(newNote)

  const isSuccess = notes.filter((note) => note.id === id).length > 0

  if (!isSuccess) {
    const response = h.response({
      status: 'fail',
      message: 'Note gagal ditambahkan'
    })
    response.code(500)
    return response
  }

  const response = h.response({
    status: 'success',
    message: 'Note berhasil ditambahkan',
    data: {
      noteId: id,
    }
  })
  response.code(201)
  return response
}

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params
  const { title, tags, body } = request.payload
  const updatedAt = new Date().toISOString()

  const index = notes.findIndex((note) => note.id === id)

  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui note, Id tidak ditemukan'
    })
    response.code(404)
    return response
  }

  notes[index] = {
    ...notes[index],
    title,
    tags,
    body,
    updatedAt
  }

  const response = h.response({
    status: 'success',
    message: 'Note berhasil diperbarui'
  })
  response.code(200)
  return response
}

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params

  const index = notes.findIndex((note) => note.id === id)


  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menghapus note, Id tidak ditemukan'
    })
    response.code(404)
    return response
  }

  notes.splice(index, 1)
  const response = h.response({
    status: 'success',
    message: 'Note berhasil dihapus'
  })
  response.code(200)
  return response
}

module.exports = { getAllNotesHanlder, getNoteByIdHandler, addNoteHandler, editNoteByIdHandler, deleteNoteByIdHandler }
