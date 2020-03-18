module.exports = (notify) => (state) => (req, res, next) => {
    if(!req.tools) req.tools = {}
    notify.stateTo(state)
    req.tools[state] = (code, data, key) => code ? notify.load(code, data, key) : notify
    next()
}