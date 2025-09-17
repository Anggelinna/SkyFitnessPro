
function getIndex(x: number, y: number, rowLength: number): number {
  return x + y * rowLength
}

export function getOrderList(length: number) {
  const arr = Array<number>(length)

  const rowsCount = Math.floor((length + 2) / 3)
  let remainder = length % 3

  const list = [...arr.keys()]

  for (let col = 0; col < 3; ++col) {
    for (let row = 0; row < rowsCount; ++row) {
      if (row === 0) {
        arr[getIndex(col, row, 3)] = list.shift()
      } else if (remainder) {
        arr[getIndex(col, row, 3)] = list.shift()
        remainder -= 1
      }
    }
  }

  return arr
}