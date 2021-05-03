import Module from './pf'


const makePtrOfMatrix = (myModule, matrix, num) => {
  // seteamos memoria del array N * bytes (lista de N int32)
  const arrayPtr = myModule._calloc(num, 4);
  for (let i = 0; i < num; i++) {
    let rowsPtr = myModule._calloc(num, 4);
    // seteamos una fila en nuestro puntero
    myModule.setValue(arrayPtr + i * 4, rowsPtr, 'i32');
    for (let j = 0; j < num; j++) {
      // seteamos valores al puntero
      myModule.setValue(rowsPtr + j * 4, matrix[i][j], 'i32');
    }
  }
  return arrayPtr;
};

const makePtrSimple = (myModule, num) => {
  // seteamos memoria del array N * bytes (lista de N int32)
  const arrayPtr = myModule._calloc(num, 4);
  return arrayPtr;
};

// Función para obtener solución
const getSolutionFromPtr = (myModule, ptr, num) => {
  const result = [];
  for (let i = 0; i < num; i++) {
    result.push(myModule.getValue(ptr + i * 4, 'i32'));
  }
  return result;
};

const getShortestPath = (matrix) => {
  return Module().then(function (mymod) {
    let N = matrix.length;
    let matrixPtr = makePtrOfMatrix(mymod, matrix, N);
    let solutionPtr = makePtrSimple(mymod, N);
    mymod._DP_tsp(matrixPtr, N, solutionPtr);
    let result = getSolutionFromPtr(mymod, solutionPtr, N);
    return result;
  });
}

export default getShortestPath;

