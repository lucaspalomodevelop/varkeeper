
let chai = require("chai");
let assert = chai.assert;
let expect = chai.expect;
const assertArrays = require('chai-arrays');
chai.use(assertArrays);
let varkeeper = require("../src/index.js");

describe('varkeeper', () => {
    describe('setprop', () => {
        it('will set a prop', () => {
            varkeeper.setprop('test', 'value');
            assert.equal(varkeeper.getprop('test'), 'value');
        });
        it('will set a prop as array', () => {
            varkeeper.setprop('array', []);
            expect(varkeeper.getprop('array')).to.be.an('array');
        });
        it('will set a prop as array with funtion return', () => {
            varkeeper.setprop('array', () => {
                return [];
            }
            );
            expect(varkeeper.getprop('array')).to.be.an('array');
        });
        it('will slice a array-prop', () => {
            varkeeper.setprop('array', [1,2,3,4]);
            let x = varkeeper.getprop('array');
            let y = x.slice(0,2);
            expect(y).to.be.eql([1,2]);
        });

    });
    describe('getprop', () => {
        it('will get prop from first test', () => {
            assert.equal(varkeeper.getprop('test'), 'value');
        });
        it('will get not init prop', () => {
            assert.equal(varkeeper.getprop('test1'), undefined);
        });
    });
    describe('onchange', () => {
        it('will call funtion by change prop value', () => {
            let a = false;
            varkeeper.onchange('test', () => {a = true});
            varkeeper.setprop('test', 'value');
            assert.equal(a, true);
        });
    });
});