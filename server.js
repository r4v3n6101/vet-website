const path = require('path'),
    express = require('express'),
    exphbs = require('express-handlebars'),
    search_clinics = require('./lib/search')

const app = express()

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))

app.get('/', (request, response) => {
    response.render('index', {
        clinics: search_clinics(null, null, true)
    })
})

app.get('/modal', (request, response) => {
    response.render('modal', search_clinics(null, null, false)[0])
})

app.listen(process.env.PORT)