
var express = require("express")
var app = express()
var server = require("http").Server(app)
var io = require("socket.io")(server)
var fs = require("fs")

app.use(express.static("."))

app.get("/", function (req, res) {
    res.redirect("play.html")
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

Grass = require("./grass")
GrassEater = require("./grassEater")
Predator = require("./predator")
Environmentalist = require("./environmentalist")
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
                let envEat = new Environmentalist(x, y)
                environmentalistArr.push(envEat)
            }
            else if (matrix[y][x] == 5) {
                let hunEat = new Hunter(x, y)
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
setInterval(game, 300)

io.on("connection", function () {
    createObject()
})

function AddGrass() {
    for (var i = 0; i < 10; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
            var gr = new Grass(x, y);
            grassArr.push(gr);
        }
    }
}
io.sockets.emit("send matrix", matrix)

function AddGrassEater() {
    for (var i = 0; i < 4; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
            var grEat = new GrassEater(x, y);
            grassEaterArr.push(grEat);
        }
    }
}
io.sockets.emit("send matrix", matrix)

function AddPredator() {
    for (var i = 0; i < 4; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
            var Pr = new Predator(x, y);
            predatorArr.push(Pr);
        }
    }
}
io.sockets.emit("send matrix", matrix)

function AddAboriginal() {
    for (var i = 0; i < 4; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 7;
            var Ab = new Aboriginal(x, y);
            aboriginalArr.push(Ab);
        }
    }
}
io.sockets.emit("send matrix", matrix)

function AddHunter() {
    for (var i = 0; i < 4; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
            var Hu = new Hunter(x, y);
            hunterArr.push(Hu);
        }
    }
}
io.sockets.emit("send matrix", matrix)

function AddEnviromentalist() {
    for (var i = 0; i < 4; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
            var En = new Environmentalist(x, y);
            environmentalistArr.push(En);
        }
    }
}
io.sockets.emit("send matrix", matrix)

var statistics = {}

setInterval(function () {

    statistics.grass = grassArr.length
    statistics.grassEater = grassEaterArr.length
    statistics.predator = predatorArr.length
    statistics.hunter = hunterArr.length
    statistics.aboriginal = aboriginalArr.length
    statistics.environmentalist = environmentalistArr.length
    fs.writeFile("statistics.json",JSON.stringify(statistics),function(){
  console.log("Statistics")
    })
}, 1000) 