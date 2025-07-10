const codeExamples = [
    // --- Existing Example 1 (All English) ---
    {
        id: 1,
        title: "Basic Variables and Memory Addresses",
        difficulty: "beginner",
        category: "fundamentals",
        keyconcepts: ["variables", "data types", "memory addresses", "sizeof"],
        learningObjectives: [
            "Understand fundamental data types in C",
            "Visualize how variables occupy space in memory",
            "Learn to use the & operator to get addresses",
            "Grasp the importance of memory management"
        ],
        commonMistakes: [
            "Confusing a variable's value with its address",
            "Not understanding that each variable has a unique address",
            "Forgetting that sizeof returns the size in bytes"
        ],
        code: `// Introduction to fundamental data types and their memory addresses
#include <stdio.h> // Standard input/output library

int main() {
    // Declaration and initialization of variables of different types
    int integerNumber = 42;
    char singleCharacter = 'X';
    float decimalNumber = 3.14f;    // 'f' suffix indicates a float literal
    double doubleNumber = 2.718281828;
    
    printf("=== BASIC VARIABLES AND MEMORY ===\\n\\n");
    
    // Detailed analysis of the int variable
    printf("Variable 'integerNumber':\\n");
    printf("  Value: %d\\n", integerNumber);
    printf("  Size: %zu bytes\\n", sizeof(integerNumber));
    printf("  Address: %p\\n", (void*)&integerNumber); // Cast to void* for generic pointer printing
    printf("  Type: int\\n\\n");
    
    // Detailed analysis of the char variable
    printf("Variable 'singleCharacter':\\n");
    printf("  Value: '%c'\\n", singleCharacter);
    printf("  ASCII Value: %d\\n", singleCharacter);
    printf("  Size: %zu bytes\\n", sizeof(singleCharacter));
    printf("  Address: %p\\n", (void*)&singleCharacter);
    printf("  Type: char\\n\\n");
    
    // Detailed analysis of the float variable
    printf("Variable 'decimalNumber':\\n");
    printf("  Value: %.2f\\n", decimalNumber);
    printf("  Size: %zu bytes\\n", sizeof(decimalNumber));
    printf("  Address: %p\\n", (void*)&decimalNumber);
    printf("  Type: float\\n\\n");
    
    // Detailed analysis of the double variable
    printf("Variable 'doubleNumber':\\n");
    printf("  Value: %.9f\\n", doubleNumber);
    printf("  Size: %zu bytes\\n", sizeof(doubleNumber));
    printf("  Address: %p\\n", (void*)&doubleNumber);
    printf("  Type: double\\n\\n");
    
    // Demonstration that each variable has a unique address
    printf("OBSERVATION: Every variable occupies a unique space in memory!\\n");
    
    return 0; // Program exits successfully
}`,
        output: `=== BASIC VARIABLES AND MEMORY ===

Variable 'integerNumber':
  Value: 42
  Size: 4 bytes
  Address: 0x7fff5fbff6ac
  Type: int

Variable 'singleCharacter':
  Value: 'X'
  ASCII Value: 88
  Size: 1 bytes
  Address: 0x7fff5fbff6ab
  Type: char

Variable 'decimalNumber':
  Value: 3.14
  Size: 4 bytes
  Address: 0x7fff5fbff6a4
  Type: float

Variable 'doubleNumber':
  Value: 2.718281828
  Size: 8 bytes
  Address: 0x7fff5fbff698
  Type: double

OBSERVATION: Every variable occupies a unique space in memory!`
    },
    // --- Existing Example 2 (All English) ---
    {
        id: 2,
        title: "Pointers: Declaration, Assignment, Dereferencing",
        difficulty: "beginner",
        category: "pointers",
        keyconcepts: ["pointer declaration", "address-of operator (&)", "dereference operator (*)", "dereferencing"],
        learningObjectives: [
            "Understand what a pointer is",
            "Learn to declare and initialize pointers",
            "Master the use of & and * operators",
            "Understand the difference between an address and the pointed-to value"
        ],
        commonMistakes: [
            "Confusing * in declaration with * in dereferencing",
            "Forgetting to initialize pointers",
            "Not understanding that a pointer is also a variable with its own address"
        ],
        code: `// Exploring how pointers 'point' to variables and how to access their values
#include <stdio.h> // Standard input/output library

int main() {
    // Declaration and initialization of a regular variable
    int myNumber = 150;
    
    // Declaration of a pointer (not yet initialized)
    int *pointerToNumber;
    
    // Assignment: the pointer now 'points' to myNumber
    pointerToNumber = &myNumber;
    
    printf("=== UNDERSTANDING POINTERS ===\\n\\n");
    
    // Analysis of the original variable
    printf("Variable 'myNumber':\\n");
    printf("  Value: %d\\n", myNumber);
    printf("  Address: %p\\n", (void*)&myNumber);
    printf("  Size: %zu bytes\\n\\n", sizeof(myNumber));
    
    // Analysis of the pointer
    printf("Pointer 'pointerToNumber':\\n");
    printf("  Value (address it holds): %p\\n", (void*)pointerToNumber);
    printf("  Address of the pointer itself: %p\\n", (void*)&pointerToNumber);
    printf("  Size of the pointer: %zu bytes\\n", sizeof(pointerToNumber));
    printf("  Dereferenced value (*pointerToNumber): %d\\n\\n", *pointerToNumber);
    
    // Verify that they point to the same location
    printf("VERIFICATION: pointerToNumber == &myNumber? %s\\n\\n", 
           (pointerToNumber == &myNumber) ? "YES" : "NO");
    
    // Modify the variable's value through the pointer
    printf("Modifying 'myNumber' via the pointer...\\n");
    *pointerToNumber = 250;
    
    printf("After modification via pointer:\\n");
    printf("  Value of myNumber: %d\\n", myNumber);
    printf("  Dereferenced value (*pointerToNumber): %d\\n", *pointerToNumber);
    
    printf("\\nKEY CONCEPT: A pointer is a variable that holds the address of another variable!\\n");
    
    return 0; // Program exits successfully
}`,
        output: `=== UNDERSTANDING POINTERS ===

Variable 'myNumber':
  Value: 150
  Address: 0x7fff5fbff6ac
  Size: 4 bytes

Pointer 'pointerToNumber':
  Value (address it holds): 0x7fff5fbff6ac
  Address of the pointer itself: 0x7fff5fbff6a0
  Size of the pointer: 8 bytes
  Dereferenced value (*pointerToNumber): 150

VERIFICATION: pointerToNumber == &myNumber? YES

Modifying 'myNumber' via the pointer...
After modification via pointer:
  Value of myNumber: 250
  Dereferenced value (*pointerToNumber): 250

KEY CONCEPT: A pointer is a variable that holds the address of another variable!`
    },
    // --- New Example 3 (All English) ---
    {
        id: 3,
        title: "Pointers and Arrays: Relationship and Arithmetic",
        difficulty: "intermediate",
        category: "pointers",
        keyconcepts: ["arrays and pointers", "pointer arithmetic", "indexing", "array[i] and *(array+i) equivalence"],
        learningObjectives: [
            "Understand the intrinsic relationship between arrays and pointers in C",
            "Learn how pointer arithmetic works (e.g., `ptr + N`)",
            "Grasp the equivalence between array indexing (`array[i]`) and pointer dereferencing (`*(array + i)`)",
            "Visualize how array elements are laid out contiguously in memory"
        ],
        commonMistakes: [
            "Confusing arrays and pointers as if they are the same thing (an array name is a *constant* pointer)",
            "Not understanding how pointer arithmetic scales by the size of the data type",
            "Forgetting that `array[i]` is just syntactic sugar for `*(array + i)`"
        ],
        code: `// Explore how arrays are intrinsically linked to pointers and pointer arithmetic.
#include <stdio.h>  // Include standard input/output library
#include <stddef.h> // For ptrdiff_t

int main() {
    // Declare and initialize an array of integers
    int scores[] = {85, 92, 78, 95, 88};
    // Calculate the number of elements in the array
    int size = sizeof(scores) / sizeof(scores[0]); 
    
    // The name of an array (without brackets) decays to a pointer to its first element.
    int *ptrScores = scores; 
    
    printf("=== POINTERS AND ARRAYS ===\\n\\n");
    
    // Demonstrate the fundamental equivalence
    printf("Fundamental Equivalence:\\n");
    printf("  Base address of array 'scores': %p\\n", (void*)scores);
    printf("  Address of first element (&scores[0]): %p\\n", (void*)&scores[0]);
    printf("  Value of pointer 'ptrScores': %p\\n", (void*)ptrScores);
    printf("  Are they all equal? %s\\n\\n", 
           (scores == &scores[0] && scores == ptrScores) ? "YES" : "NO");
    
    // Access elements using array indexing notation
    printf("Accessing elements with array indexing:\\n");
    for (int i = 0; i < size; i++) {
        printf("  scores[%d] = %d (Address: %p)\\n", 
               i, scores[i], (void*)&scores[i]);
    }
    
    // Access elements using pointer arithmetic and dereferencing
    printf("\\nAccessing elements with pointer arithmetic:\\n");
    for (int i = 0; i < size; i++) {
        // (ptrScores + i) moves the pointer 'i' positions forward, scaling by sizeof(int).
        // *(ptrScores + i) then dereferences that address.
        printf("  *(ptrScores + %d) = %d (Address: %p)\\n", 
               i, *(ptrScores + i), (void*)(ptrScores + i));
    }
    
    // Demonstrate the difference between consecutive element addresses
    printf("\\nDifference between consecutive element addresses:\\n");
    for (int i = 0; i < size - 1; i++) {
        ptrdiff_t diff = (ptrScores + i + 1) - (ptrScores + i);
        printf("  (ptrScores + %d) - (ptrScores + %d) = %td (elements)\\n", 
               i+1, i, diff);
        printf("  Difference in bytes: %zu (which is sizeof(int))\\n", sizeof(int));
    }
    
    // Modify an element using a pointer
    printf("\\nModifying scores[2] from %d to 80 via pointer:\\n", scores[2]);
    *(ptrScores + 2) = 80; // Access and modify the third element (index 2)
    printf("  New scores[2] value: %d\\n", scores[2]);
    
    printf("\\nKEY CONCEPT: array[i] is equivalent to *(array + i)!\\n");
    
    return 0; // Program exits successfully
}`,
        output: `=== POINTERS AND ARRAYS ===

Fundamental Equivalence:
  Base address of array 'scores': 0x7fff5fbff690
  Address of first element (&scores[0]): 0x7fff5fbff690
  Value of pointer 'ptrScores': 0x7fff5fbff690
  Are they all equal? YES

Accessing elements with array indexing:
  scores[0] = 85 (Address: 0x7fff5fbff690)
  scores[1] = 92 (Address: 0x7fff5fbff694)
  scores[2] = 78 (Address: 0x7fff5fbff698)
  scores[3] = 95 (Address: 0x7fff5fbff69c)
  scores[4] = 88 (Address: 0x7fff5fbff6a0)

Accessing elements with pointer arithmetic:
  *(ptrScores + 0) = 85 (Address: 0x7fff5fbff690)
  *(ptrScores + 1) = 92 (Address: 0x7fff5fbff694)
  *(ptrScores + 2) = 78 (Address: 0x7fff5fbff698)
  *(ptrScores + 3) = 95 (Address: 0x7fff5fbff69c)
  *(ptrScores + 4) = 88 (Address: 0x7fff5fbff6a0)

Difference between consecutive element addresses:
  (ptrScores + 1) - (ptrScores + 0) = 1 (elements)
  Difference in bytes: 4 (which is sizeof(int))
  (ptrScores + 2) - (ptrScores + 1) = 1 (elements)
  Difference in bytes: 4 (which is sizeof(int))
  (ptrScores + 3) - (ptrScores + 2) = 1 (elements)
  Difference in bytes: 4 (which is sizeof(int))
  (ptrScores + 4) - (ptrScores + 3) = 1 (elements)
  Difference in bytes: 4 (which is sizeof(int))

Modifying scores[2] from 78 to 80 via pointer:
  New scores[2] value: 80

KEY CONCEPT: array[i] is equivalent to *(array + i)!`
    },
    // --- New Example 4 (All English) ---
    {
        id: 4,
        title: "Pointers and Strings",
        difficulty: "intermediate",
        category: "strings",
        keyconcepts: ["C strings", "null terminator", "character pointers", "string iteration", "string copying"],
        learningObjectives: [
            "Understand how strings are represented and manipulated in C",
            "Learn the crucial role of the null terminator (`\\0`) in C strings",
            "Master iterating through strings using character pointers",
            "Implement basic string operations manually (e.g., copying)"
        ],
        commonMistakes: [
            "Forgetting the null terminator when creating/manipulating strings",
            "Not handling pointer increments correctly, leading to out-of-bounds access",
            "Confusing `char array[]` with `char *ptr` for string literals (modifiability differences)",
            "Buffer overflows when copying strings without adequate size checks"
        ],
        code: `// This example shows how pointers are used to manipulate strings in C.
#include <stdio.h>  // For printf
#include <string.h> // For strlen (demonstrative purposes)

int main() {
    // Declare a string as a character array. C strings are null-terminated.
    char message[] = "Hello, Pointers!"; // Automatically null-terminated
    char *ptrMessage = message;         // Pointer to the first character of the string
    
    printf("=== POINTERS AND STRINGS ===\\n\\n");
    
    // Basic string information
    printf("Original string: \\"%s\\"\\n", message);
    printf("String length (excluding null): %zu characters\\n", strlen(message));
    printf("Array size (including null): %zu bytes\\n", sizeof(message));
    printf("Starting address of string: %p\\n\\n", (void*)message);
    
    // Iterate through the string character by character using a pointer
    printf("Iterating character by character:\\n");
    int position = 0;
    char *tempPtr = ptrMessage; // Use a temporary pointer to preserve original ptrMessage
    
    while (*tempPtr != '\\0') { // Loop until the null terminator is found
        printf("  Position %2d: '%c' (ASCII: %3d, Address: %p)\\n", 
               position, *tempPtr, *tempPtr, (void*)tempPtr);
        tempPtr++;    // Move the pointer to the next character
        position++;
    }
    
    // Show the null terminator explicitly
    printf("  Position %2d: '\\0' (ASCII: %3d, Address: %p) <- NULL TERMINATOR\\n\\n", 
           position, *tempPtr, (void*)tempPtr);
    
    // Manually copy a string using pointers (similar to strcpy)
    printf("Manual string copy using pointers:\\n");
    char destination[50]; // Destination buffer, ensure it's large enough
    char *sourcePtr = message;
    char *destPtr = destination;
    
    // Copy loop: dereference source, assign to destination, then increment both pointers
    while ((*destPtr++ = *sourcePtr++) != '\\0') {
        // Loop body is empty, all work is done in the condition
    }
    
    printf("  Original string: \\"%s\\"\\n", message);
    printf("  Copied string:   \\"%s\\"\\n", destination);
    printf("  Are addresses different? %s\\n\\n", 
           (message != destination) ? "YES" : "NO"); // They should be different
    
    // Search for a character in the string
    printf("Searching for character 'o' in the string:\\n");
    char *searchPtr = message;
    int found = 0;
    position = 0;
    
    while (*searchPtr != '\\0') {
        if (*searchPtr == 'o') {
            printf("  Character 'o' found at position %d (address: %p)\\n", 
                   position, (void*)searchPtr);
            found = 1;
            break; // Stop after finding the first occurrence
        }
        searchPtr++;
        position++;
    }
    
    if (!found) {
        printf("  Character 'o' not found.\\n");
    }
    
    printf("\\nKEY CONCEPT: C strings are character arrays terminated by a '\\0' (null character)!\\n");
    
    return 0; // Program exits successfully
}`,
        output: `=== POINTERS AND STRINGS ===

Original string: "Hello, Pointers!"
String length (excluding null): 16 characters
Array size (including null): 17 bytes
Starting address of string: 0x7fff5fbff680

Iterating character by character:
  Position  0: 'H' (ASCII: 72, Address: 0x7fff5fbff680)
  Position  1: 'e' (ASCII: 101, Address: 0x7fff5fbff681)
  Position  2: 'l' (ASCII: 108, Address: 0x7fff5fbff682)
  Position  3: 'l' (ASCII: 108, Address: 0x7fff5fbff683)
  Position  4: 'o' (ASCII: 111, Address: 0x7fff5fbff684)
  Position  5: ',' (ASCII: 44, Address: 0x7fff5fbff685)
  Position  6: ' ' (ASCII: 32, Address: 0x7fff5fbff686)
  Position  7: 'P' (ASCII: 80, Address: 0x7fff5fbff687)
  Position  8: 'o' (ASCII: 111, Address: 0x7fff5fbff688)
  Position  9: 'i' (ASCII: 105, Address: 0x7fff5fbff689)
  Position 10: 'n' (ASCII: 110, Address: 0x7fff5fbff68a)
  Position 11: 't' (ASCII: 116, Address: 0x7fff5fbff68b)
  Position 12: 'e' (ASCII: 101, Address: 0x7fff5fbff68c)
  Position 13: 'r' (ASCII: 114, Address: 0x7fff5fbff68d)
  Position 14: 's' (ASCII: 115, Address: 0x7fff5fbff68e)
  Position 15: '!' (ASCII: 33, Address: 0x7fff5fbff68f)
  Position 16: '\\0' (ASCII: 0, Address: 0x7fff5fbff690) <- NULL TERMINATOR

Manual string copy using pointers:
  Original string: "Hello, Pointers!"
  Copied string:   "Hello, Pointers!"
  Are addresses different? YES

Searching for character 'o' in the string:
  Character 'o' found at position 4 (address: 0x7fff5fbff684)

KEY CONCEPT: C strings are character arrays terminated by a '\\0' (null character)!`
    },
    // --- New Example 5 (All English) ---
    {
        id: 5,
        title: "NULL Pointers and Dangling Pointers",
        difficulty: "beginner",
        category: "pointer_safety",
        keyconcepts: ["NULL", "null pointer", "dangling pointer", "initialization", "memory safety", "segmentation fault"],
        learningObjectives: [
            "Understand the purpose and importance of a `NULL` pointer",
            "Learn to initialize pointers to `NULL` for safety",
            "Identify the risks of dereferencing a `NULL` pointer (e.g., segmentation fault)",
            "Grasp the concept of a 'dangling pointer' and how to avoid it",
            "Learn to set pointers to `NULL` after freeing memory"
        ],
        commonMistakes: [
            "Forgetting to initialize pointers (leading to wild pointers)",
            "Attempting to dereference a `NULL` pointer",
            "Using a pointer after the memory it pointed to has been freed (use-after-free vulnerability)",
            "Not checking `malloc()`'s return value for `NULL`"
        ],
        code: `// This example demonstrates the importance of NULL pointers and the danger of dangling pointers.
#include <stdio.h>  // For printf
#include <stdlib.h> // For malloc and free (used to demonstrate dangling pointers)

int main() {
    printf("=== NULL POINTERS AND SAFETY ===\\n\\n");

    // 1. NULL Pointer: Points to no valid memory location.
    //    It's good practice to initialize pointers to NULL if they are not assigned immediately.
    int *initializedNullPtr = NULL; 
    
    printf("Pointer 'initializedNullPtr':\\n");
    printf("  Value (address it holds): %p\\n", (void*)initializedNullPtr);
    
    if (initializedNullPtr == NULL) {
        printf("  The pointer is NULL. It's safe; it points to nothing valid.\\n");
    } else {
        printf("  The pointer is NOT NULL.\\n");
    }
    
    // Attempting to dereference a NULL pointer is DANGEROUS!
    // THIS WILL LIKELY CAUSE A SEGMENTATION FAULT (PROGRAM CRASH) AT RUNTIME!
    // For safety, the following line is COMMENTED OUT.
    // printf("  Attempting to dereference *initializedNullPtr: %d\\n", *initializedNullPtr);
    printf("  NOTE: Dereferencing a NULL pointer (e.g., *initializedNullPtr) causes crashes!\\n\\n");

    // 2. Uninitialized Pointer (Wild Pointer): Contains "garbage" values.
    //    This is an EXTREMELY DANGEROUS practice and MUST BE AVOIDED.
    int *uninitializedPtr; // Uninitialized: Its value is indeterminate
    printf("Pointer 'uninitializedPtr' (UNINITIALIZED):\\n");
    printf("  Value (could be a random address): %p\\n", (void*)uninitializedPtr);
    printf("  NOTE: This pointer contains a random (garbage) value from memory.\\n");
    printf("  Using it without a valid assignment is highly dangerous and unpredictable!\\n\\n");

    // 3. Dangling Pointer: Points to memory that has been freed.
    int *danglingPtr = (int*)malloc(sizeof(int)); // Allocate memory
    if (danglingPtr == NULL) {
        printf("Error: Could not allocate memory.\\n");
        return 1; // Exit with an error
    }
    *danglingPtr = 100; // Assign a value to the allocated memory
    printf("Pointer 'danglingPtr' (before free):\\n");
    printf("  Value pointed to: %d (Address: %p)\\n", *danglingPtr, (void*)danglingPtr);

    free(danglingPtr); // Free the memory that 'danglingPtr' points to
    // Now 'danglingPtr' is a "dangling" pointer - it points to memory that is no longer valid.
    printf("  After free(): 'danglingPtr' is now a DANGLING POINTER.\\n");
    printf("  Its value (%p) is the same, but the memory is NO LONGER YOURS!\\n", (void*)danglingPtr);

    // It's good practice to set the pointer to NULL after freeing memory
    danglingPtr = NULL; 
    printf("  After setting danglingPtr = NULL: %p (Now it's safe!)\\n", (void*)danglingPtr);
    
    printf("\\nKEY CONCEPT: Always initialize pointers, and set them to NULL after use or free!\\n");

    return 0; // Program exits successfully
}`,
        output: `=== NULL POINTERS AND SAFETY ===

Pointer 'initializedNullPtr':
  Value (address it holds): 0x0
  The pointer is NULL. It's safe; it points to nothing valid.
  NOTE: Dereferencing a NULL pointer (e.g., *initializedNullPtr) causes crashes!

Pointer 'uninitializedPtr' (UNINITIALIZED):
  Value (could be a random address): 0x7ffeefbff600 (This value is random and unpredictable)
  NOTE: This pointer contains a random (garbage) value from memory.
  Using it without a valid assignment is highly dangerous and unpredictable!

Pointer 'danglingPtr' (before free):
  Value pointed to: 100 (Address: 0x7f8d6c000a60)
  After free(): 'danglingPtr' is now a DANGLING POINTER.
  Its value (0x7f8d6c000a60) is the same, but the memory is NO LONGER YOURS!
  After setting danglingPtr = NULL: 0x0 (Now it's safe!)

KEY CONCEPT: Always initialize pointers, and set them to NULL after use or free!`
    },
    // --- New Example 6 (All English) ---
    {
        id: 6,
        title: "The `void*` (Generic) Pointer",
        difficulty: "intermediate",
        category: "pointers",
        keyconcepts: ["void pointer", "generic pointer", "pointer casting", "flexibility", "memory allocation"],
        learningObjectives: [
            "Understand the role of `void*` as a generic pointer that can point to data of any type",
            "Learn when and why to use a `void*` (e.g., for functions that handle any data type)",
            "Understand the necessity of an explicit cast when dereferencing a `void*`",
            "Identify common use cases for `void*` (e.g., `malloc`, `memcpy`, `qsort`)"
        ],
        commonMistakes: [
            "Attempting to dereference a `void*` without first explicitly casting it to the correct type",
            "Performing arithmetic on a `void*` directly (this is not allowed by the C standard)",
            "Not understanding that `void*` does not 'know' the size of the data it points to"
        ],
        code: `// This example demonstrates the 'void*' pointer, a generic pointer type.
#include <stdio.h>  // For printf
#include <stdlib.h> // For malloc (common usage of void*)

int main() {
    int    number = 10;
    char   character = 'A';
    float  floatVal = 3.14f;
    
    // Declare a void pointer. It can point to any data type.
    void *genericPtr; 
    
    printf("=== THE VOID* (GENERIC) POINTER ===\\n\\n");
    
    // 1. Generic pointer pointing to an int
    genericPtr = &number;
    printf("Generic pointer pointing to an INT (value: %d):\\n", number);
    printf("  Address stored: %p\\n", (void*)genericPtr);
    // TO DEREFERENCE a void*, you MUST EXPLICITLY CAST it to the original type.
    printf("  Dereferenced value (after cast to int*): %d\\n\\n", *(int*)genericPtr);
    
    // 2. Generic pointer pointing to a char
    genericPtr = &character;
    printf("Generic pointer pointing to a CHAR (value: '%c'):\\n", character);
    printf("  Address stored: %p\\n", (void*)genericPtr);
    printf("  Dereferenced value (after cast to char*): '%c'\\n\\n", *(char*)genericPtr);
    
    // 3. Generic pointer pointing to a float
    genericPtr = &floatVal;
    printf("Generic pointer pointing to a FLOAT (value: %.2f):\\n", floatVal);
    printf("  Address stored: %p\\n", (void*)genericPtr);
    printf("  Dereferenced value (after cast to float*): %.2f\\n\\n", *(float*)genericPtr);
    
    // 4. \`void*\` and pointer arithmetic (NOT allowed directly!)
    // This would result in a compilation error:
    // genericPtr++; // Error: illegal operation on 'void*'
    printf("NOTE: You cannot perform pointer arithmetic directly on a \`void*\`.\\n");
    printf("  You must first cast it to a specific type (e.g., \`char*\`) to do so.\\n");
    printf("  Example: ((char*)genericPtr) + 1; (to advance by 1 byte)\\n\\n");

    // Common use of void* in \`malloc\` (memory allocation)
    printf("Common use of \`void*\` with \`malloc()\`:\\n");
    int *mallocPtr = (int*)malloc(sizeof(int)); // malloc returns \`void*\`, then cast to \`int*\`
    if (mallocPtr != NULL) {
        *mallocPtr = 77;
        printf("  Dynamically allocated memory with malloc (address: %p, value: %d)\\n", 
               (void*)mallocPtr, *mallocPtr);
        free(mallocPtr); // Always free allocated memory!
    } else {
        printf("  Memory allocation failed!\\n");
    }
    
    printf("\\nKEY CONCEPT: \`void*\` is versatile but requires explicit casts and care!\\n");

    return 0; // Program exits successfully
}`,
        output: `=== THE VOID* (GENERIC) POINTER ===

Generic pointer pointing to an INT (value: 10):
  Address stored: 0x7fff5fbff6ac
  Dereferenced value (after cast to int*): 10

Generic pointer pointing to a CHAR (value: 'A'):
  Address stored: 0x7fff5fbff6ab
  Dereferenced value (after cast to char*): 'A'

Generic pointer pointing to a FLOAT (value: 3.14):
  Address stored: 0x7fff5fbff6a4
  Dereferenced value (after cast to float*): 3.14

NOTE: You cannot perform pointer arithmetic directly on a \`void*\`.
  You must first cast it to a specific type (e.g., \`char*\`) to do so.
  Example: ((char*)genericPtr) + 1; (to advance by 1 byte)

Common use of \`void*\` with \`malloc()\`:` +
        // Note: Actual malloc output address will vary
        `  Dynamically allocated memory with malloc (address: 0x7f8d6c000a60, value: 77)

KEY CONCEPT: \`void*\` is versatile but requires explicit casts and care!`
    },
    // --- New Example 7 (All English) ---
    {
        id: 7,
        title: "Pointer to Pointer (Double Pointer)",
        difficulty: "advanced",
        category: "pointers",
        keyconcepts: ["double pointer", "address of a pointer", "multiple dereferencing", "passing a pointer by address"],
        learningObjectives: [
            "Understand the syntax and meaning of a pointer to a pointer (`**`)",
            "Learn to navigate and dereference through multiple levels of pointers",
            "Grasp when a double pointer is useful (e.g., modifying a pointer inside a function, arrays of pointers)",
            "Visualize the chain of addresses in memory"
        ],
        commonMistakes: [
            "Confusing `*ptr` with `**pptr` during dereferencing",
            "Errors in assigning values or addresses to the correct level of indirection",
            "Forgetting the levels of indirection when trying to access the final value"
        ],
        code: `// This example demonstrates a pointer to a pointer, also known as a double pointer.
#include <stdio.h> // For printf

int main() {
    int originalValue = 100; // Our "data" variable
    
    // 1. Single pointer: 'singlePtr' stores the address of 'originalValue'.
    int *singlePtr = &originalValue; 
    
    // 2. Double pointer: 'doublePtr' stores the address of 'singlePtr'.
    //    \`int **\` means "pointer to a pointer to an integer".
    int **doublePtr = &singlePtr;
    
    printf("=== POINTER TO POINTER (DOUBLE POINTER) ===\\n\\n");
    
    // Analysis of the original variable
    printf("Variable 'originalValue':\\n");
    printf("  Value: %d\\n", originalValue);
    printf("  Address: %p\\n\\n", (void*)&originalValue);
    
    // Analysis of the single pointer
    printf("Single pointer 'singlePtr':\\n");
    printf("  Value (address of 'originalValue'): %p\\n", (void*)singlePtr);
    printf("  Address of the 'singlePtr' itself: %p\\n", (void*)&singlePtr);
    printf("  Dereferenced value (*singlePtr): %d\\n\\n", *singlePtr); // Accesses 'originalValue'
    
    // Analysis of the double pointer
    printf("Double pointer 'doublePtr':\\n");
    printf("  Value (address of 'singlePtr'): %p\\n", (void*)doublePtr);
    printf("  Address of the 'doublePtr' itself: %p\\n", (void*)&doublePtr);
    printf("  Value dereferenced (*doublePtr): %p\\n", (void*)*doublePtr); // Accesses the value of 'singlePtr' (an address)
    printf("  Value double-dereferenced (**doublePtr): %d\\n\\n", **doublePtr); // Accesses the value pointed to by 'singlePtr' (i.e., 'originalValue')
    
    // Modify 'originalValue' through the double pointer
    printf("Modifying 'originalValue' to 200 via the double pointer...\\n");
    **doublePtr = 200; // Modifies the final value in the chain
    
    printf("After modification via double pointer:\\n");
    printf("  New value of 'originalValue': %d\\n", originalValue);
    printf("  New dereferenced value (*singlePtr): %d\\n", *singlePtr);
    printf("  New double-dereferenced value (**doublePtr): %d\\n", **doublePtr);
    
    printf("\\nKEY CONCEPT: A double pointer adds a level of indirection,\\n");
    printf("  useful for modifying pointers themselves or for complex data structures.\\n");

    return 0; // Program exits successfully
}`,
        output: `=== POINTER TO POINTER (DOUBLE POINTER) ===

Variable 'originalValue':
  Value: 100
  Address: 0x7fff5fbff6ac

Single pointer 'singlePtr':
  Value (address of 'originalValue'): 0x7fff5fbff6ac
  Address of the 'singlePtr' itself: 0x7fff5fbff6a0
  Dereferenced value (*singlePtr): 100

Double pointer 'doublePtr':
  Value (address of 'singlePtr'): 0x7fff5fbff6a0
  Address of the 'doublePtr' itself: 0x7fff5fbff698
  Value dereferenced (*doublePtr): 0x7fff5fbff6ac
  Value double-dereferenced (**doublePtr): 100

Modifying 'originalValue' to 200 via the double pointer...
After modification via double pointer:
  New value of 'originalValue': 200
  New dereferenced value (*singlePtr): 200
  New double-dereferenced value (**doublePtr): 200

KEY CONCEPT: A double pointer adds a level of indirection,
  useful for modifying pointers themselves or for complex data structures.`
    },
    // --- New Example 8 (All English) ---
    {
        id: 8,
        title: "Dynamic Memory Allocation: `malloc` and `free`",
        difficulty: "intermediate",
        category: "memory_management",
        keyconcepts: ["dynamic memory", "heap", "malloc", "free", "memory leak", "NULL check"],
        learningObjectives: [
            "Understand the concept of dynamic memory allocation and its necessity",
            "Learn how to allocate memory using `malloc()`",
            "Learn how to release allocated memory using `free()`",
            "Recognize the importance of `NULL` checks after `malloc()` calls",
            "Identify and prevent memory leaks"
        ],
        commonMistakes: [
            "Forgetting to call `free()` on allocated memory, leading to memory leaks",
            "Attempting to use memory that has already been freed (use-after-free vulnerability)",
            "Not checking `malloc()`'s return value for `NULL`",
            "Allocating insufficient memory for the data type or expected number of elements"
        ],
        code: `// This example demonstrates dynamic memory allocation using malloc and its release using free.
#include <stdio.h>  // For printf
#include <stdlib.h> // For malloc and free

int main() {
    int *dynamicIntPtr; // A pointer to an integer that will point to dynamically allocated memory
    
    printf("=== DYNAMIC MEMORY ALLOCATION (malloc/free) ===\\n\\n");
    
    // 1. Allocate memory for a single integer on the heap
    // malloc returns a void* pointer, which is then cast to int*.
    // sizeof(int) determines how many bytes to allocate (e.g., 4 bytes).
    dynamicIntPtr = (int*)malloc(sizeof(int)); 
    
    // ALWAYS check if malloc was successful!
    if (dynamicIntPtr == NULL) {
        printf("Error: Failed to allocate memory for an integer!\\n");
        return 1; // Exit with an error code
    }
    
    printf("Successfully allocated memory for an integer.\\n");
    printf("  Allocated address: %p\\n", (void*)dynamicIntPtr);
    
    // 2. Assign a value to the dynamically allocated memory
    *dynamicIntPtr = 123; 
    printf("  Value stored at allocated address: %d\\n\\n", *dynamicIntPtr);
    
    // 3. Allocate memory for an array of integers
    int numElements = 5;
    int *dynamicArrayPtr = (int*)malloc(numElements * sizeof(int));
    
    if (dynamicArrayPtr == NULL) {
        printf("Error: Failed to allocate memory for an array!\\n");
        free(dynamicIntPtr); // Clean up previously allocated memory
        return 1;
    }
    
    printf("Successfully allocated memory for an array of %d integers.\\n", numElements);
    printf("  Array starting address: %p\\n", (void*)dynamicArrayPtr);
    
    // Initialize and print array elements
    printf("  Initializing and printing array elements:\\n");
    for (int i = 0; i < numElements; i++) {
        dynamicArrayPtr[i] = (i + 1) * 100; // Assign values
        printf("    Element %d: %d (Address: %p)\\n", 
               i, dynamicArrayPtr[i], (void*)&dynamicArrayPtr[i]);
    }
    printf("\\n");

    // 4. Free the allocated memory to prevent memory leaks
    // It's crucial to free memory when it's no longer needed.
    free(dynamicIntPtr);
    printf("Memory for single integer freed.\\n");
    // Good practice: Set the pointer to NULL after freeing to avoid dangling pointer issues.
    dynamicIntPtr = NULL; 
    
    free(dynamicArrayPtr);
    printf("Memory for array freed.\\n");
    dynamicArrayPtr = NULL; 
    
    printf("\\nKEY CONCEPT: \`malloc\` requests memory, \`free\` releases it! Always pair them!\\n");

    return 0; // Program exits successfully
}`,
        output: `=== DYNAMIC MEMORY ALLOCATION (malloc/free) ===

Successfully allocated memory for an integer.
  Allocated address: 0x7f8d6c000a60 (Address will vary)
  Value stored at allocated address: 123

Successfully allocated memory for an array of 5 integers.
  Array starting address: 0x7f8d6c000a80 (Address will vary)
  Initializing and printing array elements:
    Element 0: 100 (Address: 0x7f8d6c000a80)
    Element 1: 200 (Address: 0x7f8d6c000a84)
    Element 2: 300 (Address: 0x7f8d6c000a88)
    Element 3: 400 (Address: 0x7f8d6c000a8c)
    Element 4: 500 (Address: 0x7f8d6c000a90)

Memory for single integer freed.
Memory for array freed.

KEY CONCEPT: \`malloc\` requests memory, \`free\` releases it! Always pair them!`
    }
    // You can add more examples here following this structure!
];