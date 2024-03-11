import { TCDOLARModel } from '../models/mysql/models.js'
import { validateMovie, validatePartialMovie } from '../schemas/tcDolar.js'

export class routeController {
  static async getAll (req, res) {
    const { initial, final } = req.query
    const tcDolar = await TCDOLARModel.getAll({ initial, final })
    res.json(tcDolar)
  }

  static async getById (req, res) {
    // path-to-regexp
    const { id } = req.params
    const movie = await TCDOLARModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
  }

  static async create (req, res) {
    const result = validateMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await TCDOLARModel.create({ input: result.data })
    res.status(201).json(newMovie)
  }

  static async delete (req, res) {
    const { id } = req.params

    const result = await TCDOLARModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }

  static async update (req, res) {
    const result = validatePartialMovie(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedMovie = await TCDOLARModel.update({ id, input: result.data })
    return res.json(updatedMovie)
  }
}
