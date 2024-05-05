import * as THREE from 'three'
import { checkSquare, darkPieceMaterial, lightPieceMaterial, queenPieceGeometry } from '../global'
import { rockMovement } from './rock'
import { bishopMovement } from './bishop'

class queen extends piece{
  constructor(is_light, start_square, queen_number){
    this.type = 'Q_'+queen_number
    super(
      is_light,
      start_square,
      new THREE.Mesh(
        queenPieceGeometry,
        is_light ? lightPieceMaterial : darkPieceMaterial
      )
    )
    this.object.name = this.type
    this.legal_moves = []
  }
  getLegalMoves(){
    const {column, row} = this.current_square
    const currentColCharCode = column.charCodeAt(0)
    const squares = []
    rockMovement(currentColCharCode, row, squares)
    bishopMovement(currentColCharCode, row, squares)
    return squares
  }
  updateLegalMoves(){
    this.legal_moves = this.getLegalMoves()
  }
}