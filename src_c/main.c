#include <stdio.h>
#include <stdbool.h>
// Importamos la matriz
#include "matrix.h"

// int ary[10][10],completed[10],n,cost=0;

void matrix_test(int size, int* list)
{
  // REVISA MATRIX.H Y MATRIX.C
  Matrix* mat = matrix_init(size, list);

  printf("La matriz vale:\n");

  matrix_print(mat);

  // Liberamos ambas matrices
  matrix_destroy(mat);
}

int least(int c, int n, int cost, int* completed, Matrix* mat)
{
	int i , nc = 999;
	int min = 999, kmin;
 
	for(int i = 0;i < n;i++)
	{
		if((mat -> matrix[c][i] != 0) && (completed[i] == 0))
			if(mat -> matrix[c][i] + mat -> matrix[i][c] < min)
			{
				min = mat -> matrix[i][0] + mat -> matrix[c][i];
				kmin = mat -> matrix[c][i];
				nc = i;
			}
	}
 
	if(min!=999)
		cost+=kmin;
 
	return nc;
}

void mincost(int city, int n, int cost, int* completed, Matrix* mat, int* solution, int counter)
{
	int i, ncity;
 
	completed[city] = 1;
	// printf("city = %i\n", city);
	solution[counter] = city + 1;
	printf("%d--->",city+1);
	ncity=least(city, n, cost, completed, mat);
	printf("TSP cost in counter(%i)= %i\n",counter, cost);
	if(ncity == 999)
	{
		ncity = 0;
		printf("%d\n",ncity+1);
		cost += mat -> matrix[city][ncity];
		printf("TSP cost = %i\n", cost);
		return;
	}
 
	mincost(ncity, n, cost, completed, mat, solution, counter+1);
}

int main(int argc, char** argv)
{
	int n=4, cost=0;
	int completed[5];
	int solution[5];
	int counter = 0;
	// int list[16] = {0,4,1,3,4,0,2,1,1,2,0,0,3,1,0,0};
	int list[16] = {0,4,1,3,4,0,2,1,1,2,0,5,3,1,5,0};
	// int list[9] = {0,1,1,1,0,2,1,2,0};
  // matrix_test(3, list);
	Matrix* mat = matrix_init(n, list);
	matrix_print(mat);
	mincost(0, n, cost, completed, mat, solution, counter);
	for(int i = 0; i < 5; i++){
		printf("%i--->", solution[i]);
	}

  return 0;
}