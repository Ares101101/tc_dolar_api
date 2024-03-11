import mysql from 'mysql2/promise'

const config = {
  host: 'bzhbzdydjqzwllwameeb-mysql.services.clever-cloud.com',
  user: 'uurty3pevpwxzcnw',
  port: 3306,
  password: 'sppJzTEJhOVmSfeZV4je',
  database: 'bzhbzdydjqzwllwameeb'
}

const connection = await mysql.createConnection(config)

export class TCDOLARModel {
  static async getAll ({ initial, final }) {
    const result = await connection.query(
      'SELECT * FROM bzhbzdydjqzwllwameeb.TC_DOLAR;'
    )
    if (initial && final) {
      return result[0].filter(
        tc =>
          new Date(tc.fecha_tcd.split('/').reverse().join('/')) >=
        new Date(initial.split('/').reverse().join('/')) &&
        new Date(tc.fecha_tcd.split('/').reverse().join('/')) <=
        new Date(final.split('/').reverse().join('/'))
      )
    }
    return result[0]
  }

  static async getById ({ id }) {

  }

  static async create ({ input }) {

  }

  static async delete ({ id }) {

  }

  static async update ({ id, input }) {

  }
}
