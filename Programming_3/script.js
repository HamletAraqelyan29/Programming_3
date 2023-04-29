var socket = io()

var side = 23

function setup() {

        createCanvas(25 * side, 25 * side)

}

let ses = ["green", "yellow", "red", "blue", "white", "brown", "black"]

function Back(color) {

        if (color == 1) {
                scolors = ["green", "yellow", "red", "blue", "white", "#964f03", "black"]
        } else if (color == 2) {
                scolors = ["#43ff00", "#1a5f02", "#d9ead3", "aqua", "gold", "brown", "purple"]
        } else if (color == 3) {
                scolors = ["#7c5c00", "#ffc210", "#fce5cd", "purple", "brown", "aqua", "gold"]
        } else if (color == 4) {
                scolors = ["#0087ff", "#003564", "#cfe2f3", "gold", "purple", "white", "orange"]
        } else if (color == 0) {
                scolors = ["green", "yellow", "red", "blue", "white", "#964f03", "black"]
        }
        ses = scolors

        return ses
}


function change(matrix) {

        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {



                        if (matrix[y][x] == 1) {
                                fill(ses[0])
                        } else if (matrix[y][x] == 2) {
                                fill(ses[1])
                        } else if (matrix[y][x] == 3) {
                                fill(ses[2])
                        } else if (matrix[y][x] == 4) {
                                fill(ses[3])
                        } else if (matrix[y][x] == 5) {
                                fill(ses[4])
                        }
                        else if (matrix[y][x] == 6) {
                                fill(ses[5])
                        }
                        else if (matrix[y][x] == 7) {
                                fill(ses[6])
                        }
                        else {
                                fill("gray")
                        }
                        rect(x * side, y * side, side, side)
                }

        }

}


socket.on("send matrix", change)

// socket.on ("send datas",function(counst){
//         document.getElementById("grass").innerHTML = counst.grass;
//         document.getElementById("grassEater").innerHTML = counst.grassEater;
//         document.getElementById("Predator").innerHTML = counst.Predator;

//         myChart.data.datasets[0].data = [counst.grass,counst.grassEater,counst.Predator]
//         myChart.update()
// })

const ButtonForAddChar = document.getElementsByClassName(" button ")


ButtonForAddChar[0].addEventListener('click', function () {
        socket.emit("send button", 1)


})
ButtonForAddChar[1].addEventListener('click', function () {
        socket.emit("send button", 2)


})
ButtonForAddChar[2].addEventListener('click', function () {
        socket.emit("send button", 3)


})
ButtonForAddChar[3].addEventListener('click', function () {
        socket.emit("send button", 4)


})
ButtonForAddChar[4].addEventListener('click', function () {
        socket.emit("send button", 5)


})

ButtonForAddChar[5].addEventListener('click', function () {
        socket.emit("send button", 6)


})
ButtonForAddChar[6].addEventListener('click', function () {
        socket.emit("send button", 7)


})
