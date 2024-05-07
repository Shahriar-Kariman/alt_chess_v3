import * as THREE from 'three'
import { bishopPieceGeometry, darkPieceMaterial, lightPieceMaterial } from '../global'
import { notation } from '../square'
import { b1_pieces } from '../chess_experiance'


const bishopMovement = (current_col_code, row, squares)=>{
  let up_left = true, up_right = true, down_left = true, down_right = true
  for (let i = 1; i < 8; i++) {
    if(up_left){
      const s = new notation(
        String.fromCharCode(current_col_code-i),
        row+i
      )
      squares.push(s)
      if(b1_pieces.checkSquare(s) !== undefined) up_left=false
    }
    if(up_right){
      const s = new notation(
        String.fromCharCode(current_col_code+i),
        row+i
      )
      squares.push(s)
      if(b1_pieces.checkSquare(s) !== undefined) up_right=false
    }
    if(down_left){
      const s = new notation(
        String.fromCharCode(current_col_code-i),
        row-i
      )
      squares.push(s)
      if(b1_pieces.checkSquare(s) !== undefined) down_left=false
    }
    if(down_right){
      const s = new notation(
        String.fromCharCode(current_col_code+i),
        row-i
      )
      squares.push(s)
      if(b1_pieces.checkSquare(s) !== undefined) down_right=false
    }
  }
  squares.push(new notation(column, row))
}

class bishop{
  constructor(is_light, start_square){
    this.type = 'B_'+start_square.column
    super(
      is_light,
      start_square,
      new THREE.Mesh(
        bishopPieceGeometry,
        is_light ? lightPieceMaterial : darkPieceMaterial
      )
    )
    this.object.name = this.type
    this.legal_moves = []
  }
  getLegalMoves(){
    const {column,row} = this.currentSquare
    const currentColCharCode = column.charCodeAt(0)
    const squares = []
    bishopMovement(currentColCharCode, row, squares)
    return squares
  }
  updateLegalMoves(){
    this.legal_moves = this.getLegalMoves()
  }
}

export default bishop
export { bishopMovement }