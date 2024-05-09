import * as THREE from 'three'
import king from './pieces/king'

class pieces{
  constructor(){
    this.pieceList = []
    this.objects = new THREE.Group()
    const white_king = new king(true)
    const black_king = new king(false)
    this.pieceList.push(
      white_king,
      black_king,
    )
    this.pieceList.forEach(p => {
      this.objects.add(p.object)
    })
    this.captured = []
  }
  checkSquare(col,row){
    let piece
    this.pieceList.forEach(
      (p) => {
        if(p.current_square.column===col && p.current_square.row==row){
          piece = p
        }
      }
    )
    return piece  
  }
  removePiece(piece){
    var i = this.pieceList.indexOf(piece)
    this.pieceList.splice(i,1)
    piece.object.removeFromParent()
    this.captured.push(piece)
  }
}

export default pieces