'use strict';

describe('Tests functionality of the ngBooleanSearch module', function() {

	var engine;

	beforeEach(module('ngBooleanSearch'));

	beforeEach(inject(function (ngBooleanSearch) {
        engine = ngBooleanSearch;
    }));

    it('Should be defined', function(){
        expect(engine).to.not.be.undefined;
    });

    it('Should have a testMyPlease function', function(){
        expect(engine.testMyPlease).to.be.a('function');
    });

});