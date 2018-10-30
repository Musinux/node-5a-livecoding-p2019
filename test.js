const Store = require('./store.js')

async function shouldGetUser () {
  const store = new Store()
  const user = await store.get(1)

  if (!user) {
    throw new Error('User is not returned')
  }
  console.log('✓ shouldGetUser succeded')
}

async function shouldGetUserTwice () {
  const store = new Store()

  // should take 2seconds
  const user = await store.get(1)
  if (!user) {
    throw new Error('User is not returned')
  }
  const before = Date.now()
  // should take < 2seconds
  const user1 = await store.get(1)
  if (!user1) {
    throw new Error('User is not returned')
  }
  const now = Date.now()
  if (now - before > 2000) {
    throw new Error('Request takes too long')
  }
  console.log('✓ shouldGetUserTwice succeded')
}

async function shouldGetUserInInterval () {
  const store = new Store()

  const promises = []
  const initialTime = Date.now()
  let firstCallEnded, secondCallEnded

  // should take 2seconds
  const prom1 = store.get(1)
  .then((user) => {
    firstCallEnded = Date.now()
    return user
  })
  promises.push(prom1)

  // wait 1 second
  await waitFor(1000)
  // make the second call
  const secondTime = Date.now()
  const prom2 = store.get(1)
  .then((user) => {
    secondCallEnded = Date.now()
    return user
  })
  promises.push(prom2)

  const [user1, user2] = await Promise.all(promises)

  const firstCallDuration = firstCallEnded - initialTime
  const secondCallDuration = secondCallEnded - secondTime

  if (firstCallDuration > 2010) {
    throw new Error('first call took too much time')
  }

  if (secondCallDuration > 1100) {
    throw new Error('second call took too much time')
  }

  if (user1 !== user2) {
    throw new Error('user1 != user2')
  }

  console.log('✓ shouldGetUserInInterval succeded')
}

async function runTests () {
  try {
    // await shouldGetUser()
    // await shouldGetUserTwice()
    await shouldGetUserInInterval()
  } catch (err) {
    console.log('Tests failed', err)
  }
}
runTests()

async function waitFor (ms) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}
