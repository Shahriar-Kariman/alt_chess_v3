import { translate } from "./global"

class piece{
  constructor(is_light, start_square, object){
    this.is_light = is_light
    this.current_square = start_square
    this.object = object
    const {x,z} = translate(start_square)
    this.object.position.x = x
    this.object.position.z = z
    this.move_count = 0
  }
  move(new_square){
    this.current_square = new_square
    const {x,z} = translate(this.current_square)
    this.object.position.x = x
    this.object.position.z = z
    this.move_count++
  }
}

export default piece