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

app.get('/api/search', (request, response) => {
    response.send(api.getClinics(
        request.query['name'],
        request.query['region'],
        request.query['preview'] === '1',
    ))
})

app.get('/catalog', (request, response) => {
    response.render('catalog', {
        clinics: api.getClinics(null, request.query['region'], true)
    })
})

app.get('/modal', (request, response) => {
    response.render('modal', api.getClinics(null, null, false)[0])
})

app.get('/', (request, response) => {
    response.render('index')
})
app.listen(process.env.PORT)