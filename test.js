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

  console.log('start', Date.now() / 1000)
  // should take 2seconds
  store.get(1)
  .then(() => console.log('first call', Date.now() / 1000))

  // wait 1 second
  await waitFor(1000)
  // make the second call
  store.get(1)
  .then(() => console.log('2nd call', Date.now() / 1000))
}

async function runTests () {
  try {
    await shouldGetUser()
    await shouldGetUserTwice()
    await shouldGetUserInInterval()
  } catch (err) {
    console.log('Tests failed', err)
  }
}
runTests()

async function waitFor (ms) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}
