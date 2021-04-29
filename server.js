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
    response.send(api.search(
        request.query['name'],
        request.query['region'],
        request.query['preview'] === '1',
    ))
})

app.get('/', (request, response) => {
    response.render('index', {
        clinics: api.search(null, null, true)
    })
})

app.get('/modal', (request, response) => {
    response.render('modal', api.search(null, null, false)[0])
})

app.listen(process.env.PORT)