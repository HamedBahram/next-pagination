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
  query,
  page = 1,
  limit = 10
}: {
  query?: string
  page?: number
  limit?: number
}) => {
  try {
    if (!movies) await init()

    const skip = (page - 1) * limit

    const pipeline: PipelineStage[] = [{ $skip: skip }, { $limit: limit }]

    if (query) {
      pipeline.unshift({
        $search: {
          index: 'search',
          text: {
            query,
            fuzzy: {
              maxEdits: 1,
              prefixLength: 3,
              maxExpansions: 50
            },
            path: {
              wildcard: '*'
            }
          }
        }
      })
    }

    const result = await movies.aggregate(pipeline).toArray()

    await new Promise(resolve => setTimeout(resolve, 750))

    return { movies: JSON.parse(JSON.stringify(result)) }
  } catch (error) {
    return { error }
  }
}

type PipelineStage =
  | {
      $search: {
        index: string
        text: {
          query: string
          fuzzy: {}
          path: {
            wildcard: string
          }
        }
      }
    }
  | {
      $skip: number
    }
  | {
      $limit: number
    }
