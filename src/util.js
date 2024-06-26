const got = require("got");
const { writeFileSync, writeFile } = require("fs");
const { execSync } = require('child_process');
const { getWidgetsInformation } = require("./loader");

// Fetch version number from master brach and compare it with current version
const checkIfLatestVersion = async currentVersion => {

    return await got('https://raw.githubusercontent.com/YasserYka/enOne/0d5a5f4985dad26cceea4293e54e15ee1ee61eda/package.json?token=ALEO7DFOE67YFLHIHOD2H2TALDQDQ').then(response => {

        if(response.statusCode == 200){

            let remoteVersion = JSON.parse(response.body).version;

            if(!remoteVersion)
                throw Error("Regex's version pattern can't find version in returned Githubusercontent's body");

            remoteVersion = parseFloat(remoteVersion);

            if (currentVersion < remoteVersion)
                console.log(colors.yellow("A new version is avaliable, your current version is " + currentVersion + " lates version is " + remoteVersion));
                
        }
        else
            console.error(colors.red(Error("Githubusercontent returned non-200 status code!")));
    }).catch(error => {

      console.error(colors.red(error));
    });
}

const generateDefaultUserdataFile = userdataPath => {

    writeFileSync(userdataPath, JSON.stringify({widgets: getWidgetsInformation()}));
}

const ANSI_CODES = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    white: "\x1b[37m"
};

const colors = {
    red: (message) => (ANSI_CODES.red + message + ANSI_CODES.reset),
    green: (message) => (ANSI_CODES.green + message + ANSI_CODES.reset),
    yellow: (message) => (ANSI_CODES.yellow + message + ANSI_CODES.reset),
    blue: (message) => (ANSI_CODES.blue + message + ANSI_CODES.reset),
    white: (message) => (ANSI_CODES.white + message + ANSI_CODES.reset)
}

const persistUserdata = userdata => {

    writeFile(__dirname + "/../userdata.json", JSON.stringify(userdata), (err) => {
        if (err)
            console.error(err);
    })
}

module.exports = {
    color: colors,
    persistUserdata: persistUserdata,
    checkLatestVersion: checkIfLatestVersion,
    generateDefaultUserdataFile: generateDefaultUserdataFile,
}
