import { 
    getObjPath as get, 
    unionArrays as union, 
    uniqArray as uniq,
    firstArray as first,
    dropArray as drop
} from "../src/utils/arrays.js";
import assert from 'assert';
import { expect } from 'chai';


describe('Arrays Util', () => {

    describe('get', () => {

        const obj1 = {
            "foo": "foo",
            "bar": {
                "baz": [
                    "A",
                    "B",
                    "C"
                ]
            },
            5: "Test"
        };
        const objWithSpaces = {
            "stations": {
                'MTA NYCT_4': { "stations": { 'Mn414-420': 'Bowling Green' } },
                'MTA NYCT_5': { "stations": { 'Mn414-420': 'Bowling Green' } }
            }
        }



        console.log('Hi dad!');

        describe('Should return simple path', () => {
            expect(get(obj1, 'foo', false)).to.equal(obj1["foo"]);
        });    
        describe('Should return numeric path', () => {
            expect(get(obj1, 5, false)).to.equal("Test");
        });
        describe("Should return default for bad simple path", () => {
            expect(get(obj1, 'baz', false)).to.equal(false);
        });
        describe("Should return nested array from path", () => {
            expect(get(obj1, 'bar.baz')).to.equal(obj1.bar.baz);
        });
        describe('Should return complex path with spaces in key', () => {
            expect(get(objWithSpaces, 'stations.MTA NYCT_4.stations', false)).to.deep.equal({ 'Mn414-420': 'Bowling Green' });
            expect(get(objWithSpaces, 'stations.MTA NYCT_4.stations.Mn414-420', false)).to.equal('Bowling Green');
        });    
   });

   describe('union', () => {
        const arr1 = [0,1,2];
        const arr2 = [2,3,4];
        const arr3 = ["A", "B", "C"];
        const arr4 = ["C", "D", "E"];
        const arr5 = ["C", "D", 2, 3];
        const arr6 = [{
            "name": "hi dad",
            "value": 3
        }];
        const arr7 = [{
            "name": "foo bar",
            "value": "baz",
            "rando": 76
        }];

        const expect_obj = [{
            "name": "hi dad",
            "value": 3
        },{
            "name": "foo bar",
            "value": "baz",
            "rando": 76
        }];

        expect(union(arr1, arr2), "Should union numbers without duplicates").to.deep.equal([0,1,2,3,4]);
        expect(union(arr3, arr4), "Should union letters without duplicates").to.deep.equal(["A", "B", "C", "D", "E"]);
        expect(union(arr1, arr4), "Should union letters and numbers without duplicates").to.deep.equal([0, 1, 2, "C", "D", "E"]);
        expect(union(arr1, arr5), "Should union letters and numbers without duplicates").to.deep.equal([0, 1, 2, "C", "D", 3]);
        expect(union(arr6, arr7), "Should union objects without duplicates").to.deep.equal(expect_obj);
        expect(union(arr1, ""), "Should return undefined when bad values passed").to.equal(arr1);
        expect(union("", arr2), "Should return undefined when bad values passed").to.equal(arr2);
        expect(union("", ""), "Should return undefined when bad values passed").to.equal(undefined);
   });
   describe('uniq', () => {
    const arr1 = [1,2,3,4,5];
    const arr2 = [1,1,2,3,4,5,5];
    const arr3 = ["A", "B", "C", "D"];
    const arr4 = ["A", 3, "B", "C", "C", "B", "D", 3, 2, 4];

    expect(uniq(arr1), "An already unique array should return as is").to.deep.equal(arr1);
    expect(uniq(arr2), "An array with dupes should return just uniques").to.deep.equal([1,2,3,4,5]);
    expect(uniq(arr3), "An array with unique letters should return as-is").to.deep.equal(arr3);
    expect(uniq(arr4), "An array with mixed dupes should return just uniques").to.deep.equal(["A", 3, "B", "C", "D", 2, 4]);
    expect(uniq({ "hi dad": 23 }), "A non array should return undefined").to.equal(undefined);

   });

   describe('first', () => {
    const arr1 = [1,2,3,4,5];
    const arr2 = ["A", "B", "C", "D"];
    const arr3 = ["A", 3, "B", "C"];

    expect(first(arr1), "An array with numbers should return as expected").to.deep.equal(1);
    expect(first(arr2), "An array with dupes should return as expected").to.deep.equal("A");
    expect(first(arr3), "An array with mixed types should return as expected").to.equal("A");
    expect(first([]), "An array with no elements should return undefined").to.equal(undefined);
    expect(first({ "hi dad": 23 }), "A non array should return undefined").to.equal(undefined);

   });

   describe('drop', () => {
    const arr1 = [1,2,3,4,5];
    const arr2 = ["A", "B", "C", "D"];
    const arr3 = ["A", 3, "B", "C"];

    expect(drop(arr1,2), "An array with numbers should return as expected").to.deep.equal([3,4,5]);
    expect(drop(arr2,2), "An array with dupes should return as expected").to.deep.equal(["C", "D"]);
    expect(drop(arr3,1), "An array with mixed types should return as expected").to.deep.equal([3, "B", "C"]);
    expect(drop(arr3,10), "An array with less elements than requested should return empty").to.deep.equal([]);
    expect(drop([],3), "An array with no elements should return an empty array").to.deep.equal([]);
    expect(drop({ "hi dad": 23 },1), "A non array should return undefined").to.equal(undefined);

   });

});