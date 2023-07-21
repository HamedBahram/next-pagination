import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI as string
const options = {}

declare global {
  var _mongoClientPromise: Promise<MongoClient>
}

class Singleton {
  private static _instance: Singleton
  private client: MongoClient
  private clientPromise: Promise<MongoClient>
  private constructor() {
    this.client = new MongoClient(uri, options)
    this.clientPromise = this.client.connect()
    if (process.env.NODE_ENV === 'development') {
      global._mongoClientPromise = this.clientPromise
    }
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new Singleton()
    }
    return this._instance.clientPromise
  }
}
const clientPromise = Singleton.instance

export default clientPromise
