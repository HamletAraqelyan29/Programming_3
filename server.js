
let express = require("express")
let app = express()
let server = require9("http").Server(app)
let io = require("socket.io")(server)
let fs = require("fs")

app.use(express.static("."))

app.get("/", function (req, res) {
    res.redirect("play.html")
})

server.listen(3000, function () {
    console.log("server is run");

})



let LivingCreature = require("./LivingCreature")
module.exports = function matrixGenerator(matrixSize, grass, grassEater, predator, environmentalist, hunter, mine, aboriginal) {
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


matrix = matrixGenerator(20, 17, 9, 4, 8, 6, 8, 2)

io.sockets.emit("send matrix", matrix)


grassArr = []
grassEaterArr = []
predatorArr = []
environmentalistArr = []
hunterArr = []
mineArr = []
aboriginalArr = []

Grass = require("./grass")
GrassEater  = require("./grassEater")
Predator  = require("./predator")
Enviromentalist  = require("./environmentalist")
Hunter = require("./hunter")
Mine = require("./Mine")
Aboriginal = require("./aboriginal")



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
                let envEat = new environmentalist(x, y)
                environmentalistArr.push(envEat)
            }
            else if (matrix[y][x] == 5) {
                let hunEat = new hunter(x, y)
                hunterArr.push(hunEat)
            }
            else if (matrix[y][x] == 7) {
                let aboEat = new Aboriginal(x, y)
                aboriginalArr.push(aboEat)
            }
            else if (matrix[y][x] == 6) {
                let MinE = new Mine(x, y)
                mineArr.push(MinE)
            }

        }
    }
    io.sockets.emit("send matrix", matrix)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
}

