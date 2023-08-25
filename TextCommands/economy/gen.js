const { generate } = require('../../Utils/generateUtil')

module.exports = {
    name: 'gen',

    run: async(client, message, args) => {
        generate(client, message)
    }
}