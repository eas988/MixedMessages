import poemgen from 'poem-gen';
import path from 'path';

const __dirname = path.resolve(path.dirname(''));
const jsonPath = path.join(__dirname, 'node_modules', 'poem-gen', 'data', 'all.json');


async function generateRandomPoem(syllableCount, callBack) {
    const poemArgs = {
        repeats: 4,
        scheme: `a${syllableCount}`,
        verbose: false
    };

    return poemgen(jsonPath, poemArgs, callBack);
}

export { generateRandomPoem };