# Express Notify-IO
Easy to setup middleware for notify-io.

### Getting Started:

#### Initial Setup

```js
const { SchemaBuilder, Notify } = require('notify-io')

const schema = new SchemaBuilder()

schema.create('unknown', {
    en: () =>`something went wrong`,
    zh: () =>`服务器有误`,
})

const notifyStatusTo = require('express-notify-io')(schema)

app.use(notifyStatusTo('error'))
app.use(notifyStatusTo('validation'))

```

#### Usage in routes

```js
    app.use((req, res, next) => {
        const { error, validation } = req.tools
        error(name, data, key)
        if(false) next(error())

        // or directly call error in your next function

        if(false) next(error(name, data, key)())

        // in no errors then continue to process code ...
    })
```

#### Usage in validation middleware

```js
    app.use((req, res, next) => {
        const { validation } = req.tools
        const { validationErrors } = req.body

        if(validationErrors.length > 0){

            for(let err of validationErrors){
                const = { name, data, key } = err
                validation(name, data, key)
            }

            next(validation())
        }else{
            next()
        }
    })

```

#### Handle in errorHandler route

```js
    app.use((err, req, res, next) => {
        
        let _error = null

        if(err instanceof Notify) {
            _error = err
        }else {
            const { error } = req.tools
            _error = error('unknown')
        }

        const msg = _error.langTo('zh').render()
        res.status(500).json(msg)
    })
```
output: 

```js
{
    "lang": "zh",
    "state": "error",
    "messages": [
        {
            "message": "服务器有误"
        }
    ]
}
```