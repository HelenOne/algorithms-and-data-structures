const swap = (arr: any[], first: number, second: number) => {
  const tmpValueContainer = arr[first];
  arr[first] = arr[second];
  arr[second] = tmpValueContainer;
};
const reverse = (toReverse: any[]): any[] => {
  for (let i = 0; i < toReverse.length / 2; i++) {
    swap(toReverse, i, toReverse.length - 1 - i);
  }
  return toReverse;
};

const merge = (src1: number[], src2: number[]): number[] => {
  const result = [];
  let index1 = 0,
    index2 = 0;
  while (index1 < src1.length || index2 < src2.length) {
    if (index1 >= src1.length) {
      result.push(src2[index2]);
      index2++;
    } else if (index2 >= src2.length) {
      result.push(src1[index1]);
      index1++;
    }
    if (src1[index1] > src2[index2]) {
      result.push(src2[index2]);
      index2++;
    } else if (index1 < src1.length) {
      result.push(src1[index1]);
      index1++;
    }
  }
  return result;
};

const insertionSort = (toSort: number[]): number[] => {
  toSort.push(toSort[0]);
  toSort[0] = -Infinity;
  for (let i = 2; i < toSort.length; i++) {
    let j = i;
    while (j > 0 && toSort[j] < toSort[j - 1]) {
      swap(toSort, j, j - 1);
      j = j - 1;
    }
  }
  toSort.shift();
  return toSort;
};

const getMinrun = (n: number) => {
  let additionalIncrementation = false;
  let minrun = n;
  const binaryN = n.toString(2);
  for (let i = 0; i < 6 && i < binaryN.length; i++) {
    if (binaryN !== '0') additionalIncrementation = true;
    minrun >>= 1;
  }
  if (additionalIncrementation) minrun++;
  return minrun;
};

type RunDirection = 'incrementation' | 'decrementation' | null;
type MergeStack = { runIndex: number; runSize: number }[];

export const timsort = (toSort: number[]): number[] => {
  if (!Array.isArray(toSort) || toSort.length === 0) {
    return toSort;
  }

  // step 0
  const minrun: number = getMinrun(toSort.length);
  // step 1
  let runs: number[][] = [[]];
  let runDirection: RunDirection = null;
  for (let i = 0; i < toSort.length; i++) {
    const run: number[] = runs[runs.length - 1];
    let isNextNumberPartOfRun: boolean = false;
    if (runDirection === null) {
      runDirection = toSort[i] < toSort[i + 1] ? 'incrementation' : 'decrementation';
    }
    if (i < toSort.length - 1) {
      if (run.length === 0) {
        isNextNumberPartOfRun = true;
      } else if (runDirection === 'incrementation' && toSort[i] < toSort[i + 1]) {
        isNextNumberPartOfRun = true;
      } else if (runDirection === 'decrementation' && toSort[i] > toSort[i + 1]) {
        isNextNumberPartOfRun = true;
      }
    }
    if (run.length === 0) {
      run.push(toSort[i]);
    }
    if (isNextNumberPartOfRun) {
      run.push(toSort[i + 1]);
    } else {
      if (runDirection === 'decrementation') reverse(run);
      while (run.length < minrun && i < toSort.length - 1) {
        run.push(toSort[i + 1]);
        i++;
      }

      insertionSort(run);
      if (i < toSort.length - 1) runs.push([]);
      runDirection = null;
    }
  }
  insertionSort(runs[runs.length - 1]);
  // step 2
  const mergeStack: MergeStack = [];
  for (let i = 0; i < runs.length; i++) {
    mergeStack.push({
      runIndex: i,
      runSize: runs[i].length
    });

    if (mergeStack.length >= 3) {
      const x = mergeStack[mergeStack.length - 1];
      const y = mergeStack[mergeStack.length - 2];
      const z = mergeStack[mergeStack.length - 3];
      if (x.runSize > y.runSize + z.runSize || y.runSize > z.runSize) {
        const toMergeIndex = x.runSize <= z.runSize ? x.runIndex : z.runIndex;
        runs[y.runIndex] = merge(runs[y.runIndex], runs[toMergeIndex]);
        runs[toMergeIndex] = [];
        if (x.runSize <= z.runSize) {
          mergeStack.pop();
        } else {
          mergeStack.pop();
          mergeStack.pop();
          mergeStack.pop();
          mergeStack.push(y);
          mergeStack.push(x);
        }
      }
    }
  }
  while (mergeStack.length > 1) {
    const firstRunIndex = mergeStack.pop()!.runIndex;
    const secondRunIndex = mergeStack.pop()!.runIndex;

    runs[secondRunIndex] = merge(runs[firstRunIndex], runs[secondRunIndex]);
    mergeStack.push({
      runIndex: secondRunIndex,
      runSize: runs[secondRunIndex].length
    });
  }

  return runs[mergeStack.pop()!.runIndex];
};
