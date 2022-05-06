class ChessBoard extends HTMLElement {
    constructor() {
        super();
        this.internalPosition = [[]]
    }
    #orientation = 'white'
    #position = 'start'
    #notation = false
    get orientation() {
        return this.#orientation
    }
    set orientation(o) {
        this.#orientation = o
        this.setAttribute('orientation', o)
    }
    get position() {
        return this.#position
    }
    set position(p) {
        this.#position = p
        this.setAttribute('position', p)
    }
    get notation() {
        return this.#notation
    }
    set notation(n) {
        this.#notation = n
        this.setAttribute('notation', n)
    }
    static get observedAttributes() {
        return ["position", "orientation", "notation"]
    }
    interpretPosition() {
        if (this.#position === 'start') {
            this.internalPosition =
            [["r", "n", "b", "k", "q", "b", "n", "r"],
             ["p", "p", "p", "p", "p", "p", "p", "p"],
             [" ", " ", " ", " ", " ", " ", " ", " "],
             [" ", " ", " ", " ", " ", " ", " ", " "],
             [" ", " ", " ", " ", " ", " ", " ", " "],
             [" ", " ", " ", " ", " ", " ", " ", " "],
             ["P", "P", "P", "P", "P", "P", "P", "P"],
             ["R", "N", "B", "K", "Q", "B", "N", "R"],
            ]
        } else {
            let fen_str = this.#position
            // interpret fen string
            this.internalPosition = []
            let row = []
            for (let i = 0; i < fen_str.length; i++) {
                let char = fen_str[i]
                if ('12345678'.includes(char)) {
                    let num_empty = parseInt(char)
                    for (let j = 0; j < num_empty; j++) {
                        row.push(" ")
                    }
                } else if (char === '/') {
                    this.internalPosition.push(row)
                    row = []
                } else {
                    row.push(char)
                }
            }
            this.internalPosition.push(row)
        }

    }
    getPieceImage(p) {
        let piece_image = document.createElement('img')
        piece_image.classList.add('piece-img')
        if (p === 'r') {
            piece_image.setAttribute("src", "images/b_rook.png")
            piece_image.setAttribute("alt", "black rook")
        }
        else if (p === 'n') {
            piece_image.setAttribute("src", "images/b_horse.png")
            piece_image.setAttribute("alt", "black horse")
        }
        else if (p === 'k') {
            piece_image.setAttribute("src", "images/b_king.png")
            piece_image.setAttribute("alt", "black king")
        }
        else if (p === 'q') {
            piece_image.setAttribute("src", "images/b_queen.png")
            piece_image.setAttribute("alt", "black queen")
        }
        else if (p === 'p') {
            piece_image.setAttribute("src", "images/b_pawn.png")
            piece_image.setAttribute("alt", "black pawn")
        }
        else if (p === 'b') {
            piece_image.setAttribute("src", "images/b_bishop.png")
            piece_image.setAttribute("alt", "black bishop")
        }
        else if (p === 'R') {
            piece_image.setAttribute("src", "images/w_rook.png")
            piece_image.setAttribute("alt", "white rook")
        }
        else if (p === 'N') {
            piece_image.setAttribute("src", "images/w_horse.png")
            piece_image.setAttribute("alt", "white knight")
        }
        else if (p === 'K') {
            piece_image.setAttribute("src", "images/w_king.png")
            piece_image.setAttribute("alt", "white king")
        }
        else if (p === 'Q') {
            piece_image.setAttribute("src", "images/w_queen.png")
            piece_image.setAttribute("alt", "white queen")
        }
        else if (p === 'P') {
            piece_image.setAttribute("src", "images/w_pawn.png")
            piece_image.setAttribute("alt", "white pawn")
        }
        else if (p === 'B') {
            piece_image.setAttribute("src", "images/w_bishop.png")
            piece_image.setAttribute("alt", "white bishop")
        }
        return piece_image
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'position') this.#position = newValue
        if (name === 'orientation') this.#orientation = newValue
        if (name === 'notation') this.#notation = newValue
    }
    connectedCallback() {
        let board_container = document.createElement('div')
        board_container.classList.add('board_container')
        this.appendChild(board_container)
        let board = document.createElement('div')
        board.classList.add('board')
        console.log(this.#notation)
        let notationY_axis = document.createElement('div')
        notationY_axis.classList.add('y-axis')
        let notationX_axis = document.createElement('div')
        notationX_axis.classList.add('x-axis')
        let x_axis_str = 'abcdefgh'
        for (let i = 0; i < 8; i++) {
            let y_square = document.createElement('div')
            let x_square = document.createElement('div')
            y_square.classList.add('y-axis-square')
            x_square.classList.add('x-axis-square')
            y_square.innerText = (i+1).toString()
            x_square.innerText = x_axis_str[i]
            notationY_axis.appendChild(y_square)
            notationX_axis.appendChild(x_square)
        }
        if (this.#notation) {
            board_container.appendChild(notationY_axis)
        }
        board_container.appendChild(board)
        this.interpretPosition()
        if (this.#orientation == 'black') {
            for (var i = 7; i >= 0; i--) {
                for (var j = 7; j >= 0; j--) {
                    let square = document.createElement('div')
                    let piece = this.internalPosition[i][j]
                    if (piece !== ' ') {
                        square.appendChild(this.getPieceImage(piece))
                    }
                    board.appendChild(square)
                    square.classList.add('square')
                    if ((i+j) % 2 == 0) {
                        // even
                        square.classList.add('even')
                    } else {
                        // odd
                        square.classList.add('odd')
                    }
                }
            }
        } else {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                let square = document.createElement('div')
                let piece = this.internalPosition[i][j]
                if (piece !== ' ') {
                    square.appendChild(this.getPieceImage(piece))
                }
                board.appendChild(square)
                square.classList.add('square')
                if ((i+j) % 2 == 0) {
                    // even
                    square.classList.add('even')
                } else {
                    // odd
                    square.classList.add('odd')
                }
            }
        }

        }
        if (this.#notation) {
            this.appendChild(notationX_axis)
        }
    }
}

customElements.define("chess-board", ChessBoard)