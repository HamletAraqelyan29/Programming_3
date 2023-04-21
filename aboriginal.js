let LivingCreature = require("./LivingCreature")
module.exports = class Aboriginal extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 14
        this.directions = [];
    };


    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }



    chooseCell(char, char2, char3, char4) {
        this.getNewCoordinates()
        let found = []


        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char || matrix[y][x] == char2 || char3 || char4) {
                    found.push(this.directions[i])
                }
            }
        }


        return found

    }


    mul() {
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 7

            let aboEat = new Aboriginal(newX, newY)

            aboriginalArr.push(aboEat)


        }
    }


    eat() {
        let emptyCell = this.chooseCell(4, 5)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell) {
            this.energy += 5
            let newX = newCell[0]
            let newY = newCell[1]

            for (let i in hunterArr) {
                if (newX == hunterArr[i].x && newY == hunterArr[i].y) {
                    hunterArr.splice(i, 1)
                }
            }


            for (let i in environmentalistArr) {
                if (newX == environmentalistArr[i].x && newY == environmentalistArr[i].y) {
                    environmentalistArr.splice(i, 1)
                }
            }


            matrix[newY][newX] = 7
            matrix[this.y][this.x] = 0


            this.x = newX
            this.y = newY

            if (this.energy > 120) {
                this.mul()
            }

        } else {
            this.move()
        }
    }

    move() {
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 7
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY

            this.energy--
            if (this.energy < 0) {
                this.die()
            }
        }
    }


    die() {
        matrix[this.y][this.x] = 0

        for (let i in aboriginalArr) {
            if (this.x == aboriginalArr[i].x && this.y == aboriginalArr[i].y) {
                aboriginalArr.splice(i, 1);
            }
        }
    }



}
