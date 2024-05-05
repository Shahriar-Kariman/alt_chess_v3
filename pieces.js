import * as THREE from 'three'

class pieces{
  constructor(){
    this.pieceList = []
    this.pieces = new THREE.Group()
  }
  checkSquare(s_notation){
    const {column, row} = s_notation
    let piece
    this.pieceList.forEach(
      (p) => {
        if(p.current_square.column===column && p.current_square.row==row){
          piece = p
        }
      }
    )
    return piece  
  }
}

export default pieces