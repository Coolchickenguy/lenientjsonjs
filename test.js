const {parse} = require(".");
const {readFileSync} = require("fs");
const {resolve} = require("path");
const assert = require("assert");
const testLocations = ["comments","gson","standard_ascii","unicode"];
const testStrings = testLocations.map((value) => resolve("./tests",value + ".json")).map((value) => readFileSync(value)).map((value) => value.toString());
const expected = testLocations.map((value) => resolve("./tests",value + ".expected.js")).map((value) => require(value));
const tests = testStrings.map((value,index) => [value,expected[index],testLocations[index]]);
for (const [testCase,expected,name] of tests){
    try{
    console.log(`Testing test case ${name}`);
    const parsed = parse(testCase);
    assert.deepStrictEqual(parsed,expected,`Test case ${name} has unexpected value`);
    console.log(`Test case ${name} passed`);
    }catch(e){
        console.error(e);
    }
}