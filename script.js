var socket = io()

var side = 23

function setup() {

        createCanvas(25 * side, 25 * side)

}


function nkarel(matrix) {
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



}

socket.on("send matrix", nkarel)