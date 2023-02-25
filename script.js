const http = require('http')
const fs = require('fs')
const path = require('path') // для формирования корректных путей

const PORT = 3000

const server = http.createServer((req, res) => {
    console.log('server req')

    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Content-Type: application/json')

    const createPath = (page) => path.resolve(__dirname, 'pages', `${page}.html`)
    //некоторые файловые системы используют прямую косую черту, а некоторые обратную!
    let basePath = ''

    // базовая имплементация роутинга
    switch (req.url) {
        case '/':
        case '/main':
        case '/home':
        case '/index':
            basePath = createPath('index')
            res.statusCode = 200
            break
        // case '/page4':
        //     res.statusCode = 301
        //     res.setHeader('Location', 'index')
        //     res.end()
        case '/page1':
            basePath = createPath('page1')
            res.statusCode = 200
            break
        case '/page2':
            basePath = createPath('page2')
            res.statusCode = 200
            break
        case '/page3':
            basePath = createPath('page3')
            res.statusCode = 200
            break
        default:
            basePath = createPath('error')
            res.statusCode = 404
            break
    }

    fs.readFile(basePath, (err, data) => {
        if (err) {
            console.log(err)
            res.statusCode = 500 //Внутренняя серверная ошибка
            res.end()
        }
        else {
            res.write(data)
            res.end()
        }
    })

})

server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
})