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

    it('Should have a testMyPlease function with 42 as a result', function(){
        expect(engine.testMyPlease).to.be.a('function');
        expect(engine.testMyPlease()).to.equal(42);
    });

    it('Should have a find function with 42 as a result', function(){
        // expect(engine.containsTitle).to.be.a('function');

        // var data = [
        // 	{title: 'asdf'},
        // 	{title: 'qwe'}, 
        // 	{title: '123'}, 
        // ];
        // var item = engine.find(data, function(item){ return item.title === 'qwe'});

        // expect(item).to.equal({title: 'qwe'});
    });

});