//載入express
const express = require('express')
const app = express()

const port = 3000

//載入express-handlebars
const exphbs = require('express-handlebars')

//載入movies.json外部資料
const restaurantList = require('./restaurant.json')


app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

// 設置靜態檔案
app.use(express.static('public'))

//首頁
app.get('/', (req, res) => {

    // past the number list into 'index' partial template
    res.render('index', { restaurants: restaurantList.results })

})

//restaurant information 
app.get('/restaurants/:restaurant_id', (req, res) => {

    console.log('id:', req.params.restaurant_id)
    const restaurant_des = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
    res.render('show', { restaurants: restaurant_des })
})

//search
app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const restaurantSearch = restaurantList.results.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
    })

    res.render('index', {
        restaurants: restaurantSearch,
        keyword: keyword
    })
})

app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`)
})