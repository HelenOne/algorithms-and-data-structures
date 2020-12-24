#include "./ArrayList.cpp"
#include <assert.h>

int main() {
    ArrayList<int> array;
    array.push(2);
    assert(array.size() == 1);
    assert(array[0] == 2);
    array.resize(5);
    assert(array.size() == 5);
    return 0;
}