'use strict';

describe('Tests functionality of the ngBooleanSearch module', function() {

	var engine;

	beforeEach(mocks.module('ngBooleanSearch'));

	beforeEach(inject(function (ngBooleanSearch) {
        engine = ngBooleanSearch;
    }));

    it('Should be defined', function(){
        expect(engine).to.not.be.undefined;
    });

});