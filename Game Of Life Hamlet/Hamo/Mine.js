let LivingCreature = require("./LivingCreature")
module.exports = class Mine extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.multiply = 0
        this.directions = [
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x - 2, this.y + 2],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y]
        ];
        this.energy = 10
    }


    chooseCell(char) {
        let found = []


        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }


        return found

    }


    mul() {

        this.multiply++
        let emptyCell = this.chooseCell(0)
        let newCell = random(emptyCell)

        if (newCell && this.multiply >= 20) {
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 6

            let Min = new Mine(newX, newY)
            mineArr.push(Min)


            this.multiply = 0

            this.energy -= 10
            if (this.energy <= 10) {
                this.die()
            }
        }

    }

    die() {
        matrix[this.y][this.x] = 0

        for (let i in mineArr) {
            if (this.x == mineArr[i].x && this.y == mineArr[i].y) {
                mineArr.splice(i, 1)
            }
        }
    }
}


