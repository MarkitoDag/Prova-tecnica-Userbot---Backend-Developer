"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var file_reader_1 = require("./file_reader");
var readline = require("readline");
function run() {
    return __awaiter(this, void 0, void 0, function () {
        // create a function that returns a promise that resolves with the user input
        function ask(question) {
            return new Promise(function (resolve) {
                rl.question(question, function (answer) {
                    resolve(answer);
                });
            });
        }
        var rl, repeat, input, fileReader, command, file, stats, word, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rl = readline.createInterface({
                        input: process.stdin,
                        output: process.stdout,
                    });
                    repeat = true;
                    console.log();
                    _a.label = 1;
                case 1:
                    if (!repeat) return [3 /*break*/, 9];
                    return [4 /*yield*/, ask('Enter a command, a path, or “help” for options: ')];
                case 2:
                    input = _a.sent();
                    fileReader = file_reader_1.FileReader.getInstance();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 7, , 8]);
                    command = input.split(' ');
                    if (command.includes('-c')) {
                        repeat = false;
                        return [3 /*break*/, 1];
                    }
                    if (!command.includes('help')) return [3 /*break*/, 4];
                    console.log("\n\nTo analyze a text in a web page or file, enter its URL as the last argument of the command.\n\nYou can also use some optional flags to modify the output:\n\n-rt   This flag removes all HTML tags from the web page. \n      Use it if you want to see the statistics of the words that are visible on the page not the raw HTML.\n-sa   This flag sorts the words that appear more than ten times in alphabetical order.\n-sn   This flag sorts the words that appear more than ten times from the most frequent to the least frequent.   \n-c    This flag terminates the execution of the program.\n            \nIf you use both -sa and -sn flags, the output will be sorted by frequency.\n      \nExample: -rt -rp -sa https://it.wikipedia.org/wiki/Pagina_principale\n      \n      ");
                    repeat = true;
                    return [3 /*break*/, 6];
                case 4:
                    repeat = false;
                    return [4 /*yield*/, fileReader.readFile(command[command.length - 1])];
                case 5:
                    file = _a.sent();
                    command.pop();
                    if (command.includes('-rt')) {
                        console.log('-rt');
                        file = fileReader.removeTag(file);
                    }
                    stats = fileReader.calculateWords(file);
                    if (command.includes('-sa')) {
                        console.log('-sa');
                        stats.repeatedWords = fileReader.sortAlpha(stats.repeatedWords);
                    }
                    if (command.includes('-sn')) {
                        console.log('-sn');
                        stats.repeatedWords = fileReader.sortNum(stats.repeatedWords);
                    }
                    console.log('Total number of words in the file:', stats.wordCount);
                    console.log('Number of letters in the file:', stats.letterCount);
                    console.log('Number of spaces in the file', stats.spaceCount);
                    console.log('Words that repeat more than 10 times and the number of times they repeat:');
                    for (word in stats.repeatedWords) {
                        console.log(word, ':', stats.repeatedWords[word]);
                    }
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_1 = _a.sent();
                    console.error("\nI could not read the path because of an error,\nmake sure you have written the path correctly and have the necessary permissions.\n\nType help to view the commands or -c to terminate.\n\n      ");
                    repeat = true;
                    return [3 /*break*/, 8];
                case 8: return [3 /*break*/, 1];
                case 9:
                    rl.close();
                    return [2 /*return*/];
            }
        });
    });
}
run();
