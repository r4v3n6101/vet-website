const path = require('path'),
    express = require('express'),
    exphbs = require('express-handlebars'),
    api = require('./lib/api')

const app = express()

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))

app.get('/api/contact', (request, response) => {
    // TODO : verify data (number & messenger)
    api.newContact(
        request.query['name'],
        request.query['number'],
        request.query['messenger']
    ).then(
        () => response.send({}),
        err => response.send({err: err})
    )
})

app.get('/api/time', (request, response) => {
    // TODO : verify data (name  & date)
    api.getFreeTime(
        request.query['name'],
        request.query['date']
    ).then(
        data => response.send(data),
        err => response.send({err: err})
    )
})

app.get('/api/appointment', (request, response) => {
    // TODO : make appointment with api & check parameters
})

app.get('/catalog', (request, response) => {
    response.render('catalog', {
        clinics: api.getClinics(null, request.query['region']),
        helpers: {
            preview:
                (data, idx, options) => options.fn(Object.fromEntries(Object.entries(data).slice(0, idx)))
        },
        layout: false
    })
})

app.get('/modal', (request, response) => {
    response.render('modal', {
        data: api.getClinics(request.query['name'], null)[0],
        layout: false
    })
})

app.get('/', (request, response) => {
    response.render('index')
})

app.listen(process.env.PORT)