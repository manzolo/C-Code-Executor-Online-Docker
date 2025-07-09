#include <stdio.h>
#include <unistd.h> // Per sleep

int main() {
    printf("Ciao dal tuo programma C!\n");
    for (int i = 0; i < 5; i++) {
        printf("Contatore: %d\n", i);
        fflush(stdout); // Forza l'output
        sleep(1); // Aspetta 1 secondo
    }
    return 0;
}