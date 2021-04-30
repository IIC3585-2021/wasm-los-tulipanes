#include "matrix.h"
#include <stdio.h>
#include <stdlib.h>

/** Inicializa una matriz aleatoria con las dimensiones especificadas */
Matrix* matrix_init(int size, int* list)
{
  Matrix* mat = malloc(sizeof(Matrix));
  mat -> size = size;
  // La definimos como un arreglo de filas: cada fila es un arreglo de ints
  mat -> matrix = malloc(size * sizeof(int*));
  for(int row = 0; row < size; row++)
  {
    // Cada fila tiene el ancho de la matriz
    mat -> matrix[row] = malloc(size * sizeof(int));
    for(int col = 0; col < size; col++)
    {
      // A cada celda le asignamos un numero aleatorio entre 0 y 9
      mat -> matrix[row][col] = list[row*size + col];
    }
  }
  return mat;
}

/** Imprime la matriz en consola */
void matrix_print(Matrix* mat)
{
  for(int row = 0; row < mat -> size; row++)
  {
    for(int col = 0; col < mat -> size; col++)
    {
      printf("%i ",mat -> matrix[row][col]);
    }
    printf("\n");
  }
}
/** Libera los recursos asociados a esta matriz */
void matrix_destroy(Matrix* mat)
{
  for(int row = 0; row < mat -> size; row++)
  {
    // Primero liberamos las filas una por una
    free(mat -> matrix[row]);
  }
  // Luego el arreglo de filas
  free(mat -> matrix);
  // Y por ultimo el struct en si
  free(mat);
}