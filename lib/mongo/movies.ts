import { Collection, Db, Document, MongoClient } from 'mongodb'
import clientPromise from '@/lib/mongo/client'

let client: MongoClient
let db: Db
let movies: Collection<Document>

async function init() {
  if (db) return
  try {
    client = await clientPromise
    db = client.db()
    movies = db.collection('movies')
  } catch (error) {
    throw new Error('Failed to connect to the database.')
  }
}

;(async () => {
  await init()
})()

/// Movies ///

export const getMovies = async ({
  page = 1,
  limit = 10
}: {
  page?: number
  limit?: number
}) => {
  try {
    if (!movies) await init()

    const skip = (page - 1) * limit

    const result = await movies
      .find({
        poster: {
          $exists: true
        }
      })
      .limit(limit)
      .skip(skip)
      .toArray()

    return { movies: result }
  } catch (error) {
    return { error }
  }
}
