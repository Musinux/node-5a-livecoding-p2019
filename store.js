/**
 * this is our database handler
 * it takes time.
 */
async function findUser (id) {
  console.log('** costly call to db for', id, '**')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: id
      })
    }, 2000)
  })
}

class Store {
  constructor () {
    this._users = []
  }

  /**
   * Step 1: if the user is already in our
   * _users array, don't get it another time
   * Step 2: if we don't, get it, and store
   * it in our _users array
   * Step 3: return it
   */
  async get (id) {
    // check in our local cache
    const existingUser = this._users
      .find(u => u.id === id)

    if (existingUser) {
      return existingUser
    }
    // check in the database
    const newUser = await findUser(id)

    this._users.push(newUser)
    return newUser
  }
}

module.exports = Store
