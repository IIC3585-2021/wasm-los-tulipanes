#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <limits.h>
struct SubSet
{
	uint32_t data;
	struct SubSet *next;
}**S;

void tableA(uint32_t **A,uint32_t n)
{
    uint32_t i,j;
    for(i=0;i<pow(2,n-1);i++)
    {
        for(j=0;j<n;j++)
        {
            printf("%d ",A[i][j]);
        }
        printf("\n");
    }
}

void tableS(uint32_t n)
{
    uint32_t i;
    struct SubSet *temp;
    for(i=0;i<pow(2,n-1);i++)
	{
		temp = S[i];
		while(temp!= NULL)
		{
			printf("k-%d ",temp->data);
			temp = temp->next;
		}
		printf("f\n");
	}
}

struct SubSet *Create_element_SubSet(uint32_t i)	//function to Create an element in a subset		returns {i}
{
	struct SubSet *temp;
	temp = (struct SubSet*)malloc(sizeof(struct SubSet));
	temp->data = i;
	temp->next = NULL;
	return temp;
}

uint32_t isHit(uint32_t i,uint32_t j)				//function to Check if j'th bit is one in i		returns 1/0
{
	while(j > 0)
	{
		i = i/2;
		--j;
	}
	if(i%2 == 1)
		return 1;
	return 0;
}

void Create_SubSet(uint32_t n)			//function to create all 2^n subsets
{
	S = (struct SubSet**)malloc(sizeof(struct SubSet*)*pow(2,n-1));
	struct SubSet *temp,*Head = NULL,*Tail = NULL;
	uint32_t i,j,k,flag = 0;
	for(i=0;i<pow(2,n-1);i++)
	{
		for(j=0;j<n;j++)
		{
			if(isHit(i,j))
			{
				temp = Create_element_SubSet(j+1);
				if(Head == NULL)
					Head = Tail = temp;
				else
				{
					Tail->next = temp;
					Tail = temp;
				}
			}
		}
		S[i] = Head;
		Head = Tail = NULL;
	}
	//uncomment the below line for printing contents of table S
	//tableS(n);
}

void Solution(uint32_t **Sol,uint32_t i,uint32_t j, uint32_t *Solution_formated, uint32_t counter)		//function to pruint32_t the Travelling Salesman Optimum path
{
	counter ++;
	if(i==0)
	{
		printf("0\n");
		// printf("\nWTF\n");
		Solution_formated[counter] = 0;
		return;
	}
	// printf("\nValor = %d, counter = %i",Sol[i][j], counter);
	Solution_formated[counter] = Sol[i][j];
	printf("%d->",Sol[i][j]);
	Solution(Sol,i-(uint32_t)pow(2,Sol[i][j]-1),Sol[i][j], Solution_formated, counter);
}

void DP_tsp(uint32_t **D,uint32_t n, uint32_t *Solution_formated)			//function which uses dynamic programming technique to solve Travelling Salesman problem
{
	uint32_t counter = 0;
	uint32_t i,j,**A,**Sol,minval,x;
	struct SubSet *temp;
	A = (uint32_t**)malloc(sizeof(uint32_t*)*pow(2,n-1));
	for(i=0;i<pow(2,n);i++)
		A[i] = (uint32_t*)malloc(sizeof(uint32_t)*n);
	Sol = (uint32_t**)malloc(sizeof(uint32_t*)*pow(2,n-1));
	for(i=0;i<pow(2,n);i++)
		Sol[i] = (uint32_t*)malloc(sizeof(uint32_t)*n);
	Create_SubSet(n);
	for(i=0;i<pow(2,n-1);i++)
	{
		for(j=0;j<n;j++)
		{
			if(i==0)
				A[i][j] = D[i][j];
			else
			{
				temp = S[i];
				minval = INT_MAX;
				Sol[i][j] = -1;
				while(temp != NULL)
				{
					x = D[temp->data][j] + A[i-(uint32_t)pow(2,temp->data-1)][temp->data];
					if(x < minval)
					{
						minval = x;
						Sol[i][j] = temp->data;
					}
					temp = temp->next;
				}
				A[i][j] = minval;
			}
		}
	}
	//uncomment the below line for printing table entries in A
    //tableA(A,n);
	printf("the shortest possible route that visits every city exactly once and returns to the starting pouint32_t is:-\n");
	printf("0->");
	Solution_formated[0] = 0;
	Solution(Sol,(uint32_t)pow(2,n-1)-1,0, Solution_formated, counter);
}

int main()
{
	uint32_t n,**D,i,j;
	printf("Enter the number of cities\n");
	scanf("%d",&n);
	printf("Enter the distance between each cities\n");
	D = (uint32_t**)malloc(sizeof(uint32_t*)*n);
	for(i=0;i<n;i++)
		D[i] = (uint32_t*)malloc(sizeof(uint32_t)*n);
	for(i=0;i<n;i++)
		for(j=0;j<n;j++)
			scanf("%d",&D[i][j]);
	uint32_t Solution_formated[4];
	DP_tsp(D,n, Solution_formated);
	for(uint32_t k = 0; k < n+1; k++){
		printf("%i,",Solution_formated[k]);
	}
	return 0;
}
