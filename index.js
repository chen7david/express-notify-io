const { Notify } = require('notify-io')

module.exports = (schema) => (state) => (req, res, next) => {
    if(!req.tools) req.tools = {}
    const notify = new Notify(schema)
    notify.stateTo(state)
    req.tools[state] = (code, data, key) => code ? notify.load(code, data, key) : notify
    next()
}