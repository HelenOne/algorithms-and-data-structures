#include <iostream>

using namespace std;

template <typename T>
class ArrayList
{
 private:
    int arraySize;
    int arrayCapacity;
    T * arrayData;

 public:
    ArrayList()
    {
        arraySize = 0;
        arrayCapacity = 0;
        arrayData = null;
    }

    ArrayList(const ArrayList<T> & a)
    {
        arraySize = a.arraySize;
        arrayCapacity = arraySize;
        arrayData = NULL;
        if (arraySize != 0)
            arrayData = new T[arraySize];
        else
            arrayData = 0;
        for (int i = 0; i < arraySize; ++i)
            arrayData[i] = a.arrayData[i];
    }

    ArrayList(int size)
    {
        arraySize = size;
        arrayCapacity = size;
        if (size != 0)
            arrayData = new T[size];
        else
            arrayData = 0;
    }

    ~ArrayList()
    {
        if (arrayData)
            delete[] arrayData;
    }

    int resize(int size)
    {
        if (size > arrayCapacity)
        {
            int new_capacity = max(size, arraySize * 2);
            T * new_data = new T[new_capacity];
            for (int i = 0; i < arraySize; ++i)
                new_data[i] = arrayData[i];
            delete[] arrayData;
            arrayData = new_data;
            arrayCapacity = new_capacity;
        }
        arraySize = size;
    }

    void push(T val)
    {
        resize(arraySize + 1);
        arrayData[arraySize - 1] = val;
    }

    int size() const
    {
        return arraySize;
    }

    T & operator[] (int i)
    {
        return arrayData[i];
    }
};

template<typename T>
ostream & operator << (ostream & out, ArrayList<T> a)
{
    for (int i = 0; i < a.size(); ++i)
        out << a[i] << " ";
    return out;
}
