import * as THREE from 'three'
import piece from '../piece';
import { checkSquare, darkPieceMaterial, lightPieceMaterial, rockPieceGeometry } from '../global';
import { notation } from '../square';

const traverse = (max, is_vertical, direction, current_col_code, current_row, squares)=>{
  if(is_vertical){
    for (let i = 0; i < max; i++) {
      const s = new notation(
        String.fromCharCode(current_col_code+i*direction),
        row
      )
      const p = checkSquare(s.column,s.row)
      if(p===undefined){
        squares.push(s)
      }
      else if (p.is_light==p.is_light){
        break
      }
      else {
        squares.push(s)
        break
      }
    }
  }
  else{
    for (let i = 0; i < max; i++) {
      const s = new notation(
        String.fromCharCode(current_col_code),
        row+i*direction
      )
      const p = checkSquare(s.column,s.row)
      if(p===undefined){
        squares.push(s)
      }
      else if (p.is_light==p.is_light){
        break
      }
      else {
        squares.push(s)
        break
      }
    }
  }
}

class rock extends piece{
  constructor(is_light, start_square){
    this.type = 'R_'+start_square.column
    super(
      is_light,
      start_square,
      new THREE.Mesh(
        rockPieceGeometry,
        is_light ? lightPieceMaterial : darkPieceMaterial
      )
    )
    this.object.name = this.type
    this.legal_moves = []
  }
  getLegalMoves(){
    const {column,row} = this.current_square
    const currentColCharCode = column.charCodeAt(0)
    const squares = []
    const left = currentColCharCode-'a'.charCodeAt(0)+1
    const right = 'h'.charCodeAt(0)-currentColCharCode+1
    traverse(left, false, -1, currentColCharCode, row, squares)
    traverse(right, false, 1, currentColCharCode, row, squares)
    const down = row
    const up = (8-row)+1
    traverse(down, true, -1, currentColCharCode, row, squares)
    traverse(up, true, 1, currentColCharCode, row, squares)
    return squares
  }
  updateLegalMoves(){
    this.legal_moves = this.getLegalMoves()
  }
}

export default rock