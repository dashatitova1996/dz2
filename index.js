const  fs = require('fs');
require('sugar')();
const  prompt = require('prompt');
var  answer;


let gnrNum = (function () {
    let toGnrNum = [1, 2].sample();
    if (toGnrNum == 1) {
        return {
            number: toGnrNum,
            result: 'orel'
        }
    } else if (toGnrNum == 2) {
        return {
            number: toGnrNum,
            result: 'reshka'
        }
    }
}());


let num = {
    properties: {
        inpNum: {
            description: 'Enter 1 or 2, where 1 is for orel and 2 is for reshka',
            type: 'number',
            maxLengh: 1,
            pattern: /(1|2)/,
            message: 'You may enter only 1 or 2',
            required: true
        },


    }
};

let comparingNums = function (enteredNum, generatedNum, file) {
    let result;
    if (enteredNum == generatedNum) {
        console.log('You\'ve guessed!!!');
        result = 1;
        fs.appendFile(file, '\nResult: ' + result +'\n', function (err) {
            if (err) throw err;
        });
    } else {
        console.log('You\'re wrong :( \nTry again')
        result = 0;
        fs.appendFile(file, '\nResult: ' + result+'\n', function (err) {
            if (err) throw err;
        });
    };
    return result
};

prompt.start();


prompt.get(num, function (err, res) {
    if (err) {
        console.log(err);
    } else {
        let str = '\nResults of a game'+'\nYour number: ' + res.inpNum + '\nHere\'s: ' + gnrNum.result;
        console.log('Have you guessed orel or reshka?');
        console.log('your number is ' + res.inpNum);
        console.log('And here\'s a ' + gnrNum.result);
        fs.appendFile('log.txt', str, function (err) {
            if (err) throw err;
        });
        console.log(comparingNums(res.inpNum, gnrNum.number, 'log.txt'));
    }
});