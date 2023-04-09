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

let matrix = matrixGenerator(20, 17, 9, 4, 8, 6, 8, 2)
let side = 23

var grassArr = []
var grassEaterArr = []
var predatorArr = []
let environmentalistArr = []
var hunterArr = []
var mineArr = []
var aboriginalArr = []


function setup() {
        frameRate(15)
        createCanvas(matrix[0].length * side, matrix.length * side)
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

}


function draw() {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                fill("green")
                        } else if (matrix[y][x] == 2) {
                                fill("yellow")
                        }
                        else if (matrix[y][x] == 3) {
                                fill("red")
                        }
                        else if (matrix[y][x] == 4) {
                                fill("blue")
                        }
                        else if (matrix[y][x] == 5) {
                                fill("white")
                        } else if (matrix[y][x] == 6) {
                                fill("#964f03")
                        }
                        else if (matrix[y][x] == 7) {
                                fill("black")
                        }
                        else {
                                fill("gray")
                        }
                        rect(x * side, y * side, side, side)

                }
        }



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






}

//fsfregrege