const { defineConfig } = require('cypress')
const { Pool } = require('pg')

module.exports = defineConfig({
  projectId: 'y1na7j',
  e2e: {
    video: true,
    baseUrl: 'http://localhost:3000',
    apiServer: 'http://localhost:3333',
    viewportWidth: 1440,
    viewportHeight: 900,
    defaultCommandTimeout: 30000,
    setupNodeEvents(on, config) {
      // implement node event listeners here

      const pool = new Pool({
        host: 'batyr.db.elephantsql.com',
        user: 'szarvzeb',
        password: 'AAVPRMYyXxSASeQiD0Pi-S0REgs5pa4A',
        database: 'szarvzeb',
        port: 5432,
      })

      on('task', {
        removeUser(email) {
          return new Promise(function (resolve) {
            pool.query(
              'DELETE FROM public.users WHERE email = $1',
              [email],
              function (error, result) {
                if (error) {
                  throw error
                }
                resolve({ success: result })
              }
            )
          })
        },
        findToken(email) {
          return new Promise(function (resolve) {
            pool.query(
              'select B.token from ' +
                'public.users A ' +
                'INNER JOIN public.user_tokens B ' +
                'ON A.id = B.user_id ' +
                'WHERE A.email = $1 ' +
                'ORDER BY B.created_at',
              [email],
              function (error, result) {
                if (error) {
                  throw error
                }
                resolve({ token: result.rows[0].token })
              }
            )
          })
        },
      })
    },
  },
})
