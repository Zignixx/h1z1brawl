let accounts = {}

if (process.env.NODE_ENV === "production") {
  accounts = {
    'csgocactus_bot01': {
      accountName: 'csgocactus_bot01',
      password: 'CACTUSBOT_01',
      sharedSecret: 'X8hN09X7BKjc1ot6vl6Q2Pa5Emw=',
      identitySecret: 'YLGs9zSZoWtWsIHKN5neuCe8av4='
    },
    'csgocactus_bot02': {
      accountName: 'csgocactus_bot02',
      password: 'CACTUSBOT__02',
      sharedSecret: 'mTQWy5hTu9WRz4smJZfCi018nXU=',
      identitySecret: 'Uk3JSxQGDvUgp5epkKBk/tYaY1M'
    },
    'csgocactus_bot03': {
      accountName: 'csgocactus_bot03',
      password: 'CACTUSBOT___03',
      sharedSecret: 'yWZO+I4q9BqCgNnULV5F+G0Hurw=',
      identitySecret: 'HM9SkOSVBnSrbWwmH897tyO+SdE='
    },
    'csgocactus_bot04': {
      accountName: 'csgocactus_bot04',
      password: 'CACTUSBOT____04',
      sharedSecret: 'pP9w6ovmE8v4fEUL/VfYIaANrhM=',
      identitySecret: 'b2YlAtz+/NtpSXeUMb55lBJq6Xg='
    },
    'csgocactus_bot05': {
      accountName: 'csgocactus_bot05',
      password: 'CACTUSBOT_05',
      sharedSecret: '9UUOph97QSb4C4ZRBl2QB8Je9Kk=',
      identitySecret: 'COTyaWv4hPVE2+PQGcfvrt71QgI='
    }
  }
} else {
  accounts = {
    'h1z1brawl_testbot001': {
      accountName: 'h1z1brawl_testbot001',
      password: 'TESTBOT_01',
      sharedSecret: 'GQPd41FUEgFz7ZMKTybFKqCDo8M=',
      identitySecret: 'AAOs92MrHDsV7JPoQx9KY+cDphU='
    }
  }
}

const settings = {
  adminIDs: [76561198309370875, 76561198123588820],
  domain: 'h1z1brawl.com',
  pollTime: 10 * 1000, /* 10 seconds */
  cancelTime: 2 * 60 * 1000, /* 2 minutes */
  confirmationTime: 15 * 1000 /* 15 seconds */
}

module.exports = {
  accounts: accounts,
  settings: settings
}
