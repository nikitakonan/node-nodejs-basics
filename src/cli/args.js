const parseArgs = () => {
  const args = process.argv
    .slice(2)
    .reduce((acc, arg, index, array) => {
      if (arg.startsWith('--')) {
        const key = arg.slice(2);
        const value = array[index + 1];
        acc.push([key, value]);
      }
      return acc;
    }, [])
    .map(([key, value]) => `${key} is ${value}`)
    .join(', ');
  console.log(args);
};

parseArgs();
