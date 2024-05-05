import * as THREE from 'three'
import piece from '../piece'
import { darkPieceMaterial, lightPieceMaterial, pawnGeometry } from '../global'
import { notation } from '../square'

class pawn extends piece{
  constructor(is_light, start_square){
    this.type = 'p_'+start_square.column
    super(
      is_light,
      start_square,
      new THREE.Mesh(
        pawnGeometry,
        is_light ? lightPieceMaterial : darkPieceMaterial
      )
    )
    this.object.name = this.type
    this.legaMoves = this.getLegalMoves()
  }
  getLegalMoves(){
    const {column, row} = this.current_square
    const currentColCharCode = column.charCodeAt(0)
    const squares = [new notation(column, row+1)]
    if(this.move_count==0){
      squares.push(new notation(column,row+2))
    }
    // consider saptures and special moves later
    return squares
  }
  updateLegalMoves(){
    this.legaMoves = this.getLegalMoves()
  }
}

export default pawn