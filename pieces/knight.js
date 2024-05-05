import * as THREE from 'three'
import { darkPieceMaterial, knightPieceGeometry, lightPieceMaterial } from '../global'
import { notation } from '../square'
import piece from '../piece'

class knight extends piece{
  constructor(is_light, start_square){
    this.type = 'N_'+start_square.column
    super(
      is_light,
      start_square,
      new THREE.Mesh(
        knightPieceGeometry,
        is_light ? lightPieceMaterial : darkPieceMaterial
      )
    )
    this.object.name = this.type
    this.legaMoves = this.getLegalMoves()
  }
  getLegalMoves(){
    const {column,row} = this.current_square
    const currentColCharCode = column.charCodeAt(0)
    const squares = [
      new notation(
        String.fromCharCode(currentColCharCode+2),
        row+1
      ),
      new notation(
        String.fromCharCode(currentColCharCode+2),
        row-1
      ),
      new notation(
        String.fromCharCode(currentColCharCode-2),
        row+1
      ),
      new notation(
        String.fromCharCode(currentColCharCode-2),
        row-1
      ),
      new notation(
        String.fromCharCode(currentColCharCode+1),
        row+2
      ),
      new notation(
        String.fromCharCode(currentColCharCode-1),
        row+2
      ),
      new notation(
        String.fromCharCode(currentColCharCode+1),
        row-2
      ),
      new notation(
        String.fromCharCode(currentColCharCode-1),
        row-2
      ),
    ]
    return squares
  }
  updateLegalMoves(){
    this.legalMoves = this.getLegalMoves()
  }
}

export default knight