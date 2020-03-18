module.exports = (instance) => (state) => (req, res, next) => {
    if(!req.tools) req.tools = {}
    const notify = instance()
    notify.stateTo(state)
    req.tools[state] = (code, data, key) => code ? notify.load(code, data, key) : notify
    next()
}