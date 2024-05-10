import * as THREE from 'three'
import piece from '../piece'
import { darkPieceMaterial, lightPieceMaterial, pawnGeometry } from '../global'
import { notation } from '../square'

class pawn extends piece{
  constructor(is_light, start_square){
    super(
      is_light,
      start_square,
      new THREE.Mesh(
        pawnGeometry,
        is_light ? lightPieceMaterial : darkPieceMaterial
      )
    )
    this.type = 'p_'+start_square.column+is_light ? '_white' : '_black'
    this.object.name = this.type
    this.legal_moves = []
  }
  getLegalMoves(){
    const {column, row} = this.current_square
    const currentColCharCode = column.charCodeAt(0)
    const direction = this.is_light ? 1 : -1
    const squares = [new notation(column, row+1*direction)]
    if(this.move_count==0){
      squares.push(new notation(column,row+2*direction))
    }
    // consider saptures and special moves later
    return squares
  }
  updateLegalMoves(){
    this.legal_moves = this.getLegalMoves()
  }
}

export default pawn