
const { count } = require("console")
var express = require("express")
var app = express()
var server = require("http").Server(app)
var io = require("socket.io")(server)
var fs = require("fs")
const Aboriginal = require("./aboriginal")
const Environmentalist = require("./environmentalist")
const Grass = require("./grass")
const GrassEater = require("./grassEater")
const Hunter = require("./hunter")
const Mine = require("./Mine")
const Predator = require("./predator")


app.use(express.static("."))

app.get("/", function (req, res) {
    res.redirect("home.html")
})

server.listen(3001)




function matrixGenerator(matrixSize, grass, grassEater, predator, environmentalist, hunter, mine, aboriginal) {
    var matrix = []
    for (let i = 0; i < matrixSize; i++) {
        matrix.push([])
        for (let j = 0; j < matrixSize; j++) {
            matrix[i].push(0)
        }
    }


    for (let i = 0; i < grass; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)
        matrix[y][x] = 1
    }


    for (let i = 0; i < grassEater; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)
        matrix[y][x] = 2
    }

    for (let i = 0; i < predator; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)
        matrix[y][x] = 3
    }
    for (let i = 0; i < environmentalist; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)
        matrix[y][x] = 4
    }
    for (let i = 0; i < hunter; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)
        matrix[y][x] = 5
    }
    for (let i = 0; i < mine; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)
        matrix[y][x] = 6
    }
    for (let i = 0; i < aboriginal; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)
        matrix[y][x] = 7
    }
    return matrix
}


matrix = matrixGenerator(20, 17, 9, 4, 8, 6, 4, 2)
io.sockets.emit("send matrix", matrix)


grassArr = []
grassEaterArr = []
predatorArr = []
environmentalistArr = []
hunterArr = []
mineArr = []
aboriginalArr = []

// //Grass = require("./grass")
// GrassEater = require("./grassEater")
// Predator = require("./predator")
// Environmentalist = require("./environmentalist")
// Hunter = require("./hunter")
// Mine = require("./Mine")
// Aboriginal = require("./aboriginal")



function createObject() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y)

                grassArr.push(grass)


            } else if (matrix[y][x] == 2) {
                let grEat = new GrassEater(x, y)
                grassEaterArr.push(grEat)
            }
            else if (matrix[y][x] == 3) {
                let prEat = new Predator(x, y)
                predatorArr.push(prEat)
            }
            else if (matrix[y][x] == 4) {
                let envEat = new Environmentalist(x, y)
                environmentalistArr.push(envEat)
            }
            else if (matrix[y][x] == 5) {
                let hunEat = new Hunter(x, y)
                hunterArr.push(hunEat)
            }

            else if (matrix[y][x] == 6) {
                let MinE = new Mine(x, y)
                mineArr.push(MinE)
            }
            else if (matrix[y][x] == 7) {
                let aboEat = new Aboriginal(x, y)
                aboriginalArr.push(aboEat)
            }

        }
    }
    io.sockets.emit("send matrix", matrix)
}
function game() {

    for (let i in grassArr) {
        grassArr[i].mul()
    }


    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }

    for (let i in predatorArr) {

        predatorArr[i].eat()
    }
    for (let i in environmentalistArr) {
        environmentalistArr[i].eat()
    }
    for (let i in hunterArr) {
        hunterArr[i].eat()
    }
    for (let i in aboriginalArr) {
        aboriginalArr[i].eat()
    }

    for (let i in mineArr) {
        mineArr[i].mul()
    }

    io.sockets.emit("send matrix", matrix)

}
setInterval(game, 250)

io.on("connection", function () {
    createObject()
})


io.sockets.emit("send matrix", matrix)


function AddCharr(n) {

    let x = Math.floor(Math.random() * matrix[0].length)
    let y = Math.floor(Math.random() * matrix.length)

    matrix[y][x] = n

    if (n == 1) {
        var gr = new Grass(x, y)
        grassArr.push(gr)

    }

    else if (n == 2) {
        var grEat = new GrassEater(x, y)
        grassEaterArr.push(grEat)
    }
    else if (n == 3) {
        var Pr = new Predator(x, y)
        predatorArr.push(Pr)
    }
    else if (n == 4) {
        let envEat = new Environmentalist(x, y)
        environmentalistArr.push(envEat)
    }

    else if (n == 5) {
        var hunEat = new Hunter(x, y)
        hunterArr.push(hunEat)
    }

    else if (n == 6) {

        var MinE = new Mine(x, y)
        mineArr.push(MinE)

    }
    else if (n == 7) {
        var aboEat = new Aboriginal(x, y)
        aboriginalArr.push(aboEat)
    }
    else if (n == 8) {
        let y = -1
        let x = -1
        let xa = 20
        let ya = -1
        for (let i = 0; i < 20; i++) {
            x++
            y++
            matrix[y][x] = 10

            xa--
            ya++
            matrix[ya][xa] = 10

        }




    }
    io.sockets.emit("send matrix", matrix)
}
io.on('connection', function (socket) {
    socket.on("send button", AddCharr)
})

io.sockets.emit("send matrix", matrix)
var statistics = {}

setInterval(function () {

    statistics.grass = grassArr.length
    statistics.grassEater = grassEaterArr.length
    statistics.predator = predatorArr.length
    statistics.hunter = hunterArr.length
    statistics.aboriginal = aboriginalArr.length
    statistics.environmentalist = environmentalistArr.length

    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
        io.emit("send datas", statistics)
        console.log("Statistics")

    })
}, 250)

function Spring() {
    clearInterval(i)
    setInterval(game, 300)
    weather = "spring";
    io.sockets.emit('Spring', weather);
}

function Summer() {
    clearInterval(i)
    setInterval(game, 500)
    weather = "summer";
    io.sockets.emit('Summer', weather);
}

function Autumn() {
    clearInterval(i)
    setInterval(game, 500)
    weather = "autumn";
    io.sockets.emit('Autumn', weather);
}

function Winter() {
    clearInterval(i)
    setInterval(game, 1000)
    weather = "winter";
    io.sockets.emit('Winter', weather);
}
