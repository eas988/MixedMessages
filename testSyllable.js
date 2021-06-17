import poemgen from 'poem-gen';
import path from 'path';
import poemGen from 'poem-gen';
import rhymes from 'rhymes';

const __dirname = path.resolve(path.dirname(''));
const jsonPath = path.join(__dirname, 'node_modules', 'poem-gen', 'data', 'all.json');


async function generateRandomPoem(syllableCount, callBack) {
    const poemArgs = {
        repeats: 1,
        scheme: `a${syllableCount}`,
        verbose: false
    };

    return poemgen(jsonPath, poemArgs, callBack);
}

export { generateRandomPoem };

