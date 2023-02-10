module.exports = {
    verbose: true,
    rootDir: 'src',
    preset: 'ts-jest',
    moduleNameMapper:{
        "^@src/(.*)$": "<rootDir>/$1",
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
        "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
    }
  };
