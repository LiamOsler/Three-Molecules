const molFileToJSON = (molFile) => {
    let molObj = {};
    const split = molFile.split('\n');

    molObj.header = {};
    molObj.header.title = split[0];
    molObj.header.program = split[1].split('  ')[1];
    molObj.header.timeStamp = split[1].split('  ')[2];
    molObj.header.comment = split[2];

    molObj.counts = {};
    
    const countChunks = [];
    for (let i = 0; i < split[3].length; i+=3) {
        countChunks.push(split[3].slice(i, i+3));
    }

    molObj.counts.molecules = countChunks[0].trim();
    molObj.counts.bonds = countChunks[1].trim();
    molObj.counts.lists = countChunks[2].trim();
    molObj.counts.chiral = countChunks[4].trim() == 1 ? true : false;
    molObj.counts.stext = countChunks[5];

    const atomsArray = [];
    for (let i = 4; i < 4 + parseInt(molObj.counts.molecules); i++) {
        const atom = {};
        atom.position = {};
        atom.position.x = split[i].slice(0, 10).trim();
        atom.position.y = split[i].slice(10, 20).trim();
        atom.position.z = split[i].slice(20, 30).trim();
        atom.type = split[i].slice(31, 33).trim();
        atomsArray.push(atom);
    }
    molObj.atoms = atomsArray;

    const bondsArray = [];
    for (let i = 4+parseInt(molObj.counts.molecules); i < 4 +parseInt(molObj.counts.molecules)+ parseInt(molObj.counts.bonds); i++) {
        const bond = [split[i].slice(0, 3).trim(), split[i].slice(3, 6).trim(), split[i].slice(6, 9).trim()];
        bondsArray.push(bond)
    }
    molObj.bonds = bondsArray;


    return molObj;
}