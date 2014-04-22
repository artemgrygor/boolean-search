(function (window, angular, undefined) {
	'use strict';

	var module = angular.module('ngBooleanSearch', []);
	module.provider('ngBooleanSearch', function(){

		var exTree;

		var andExpression = 'and';
		var orExpression = 'or';
		var nonePattern = 'none';

		var patterns = ['tag:', 'url:', 'title:'];

		this.$get = [function () {

				// Trims defined characters from begining and ending of the string. Defaults to whitespace characters.
				var trim = function(input, characters){

				   if (!angular.isString(input)) return input;
				   
				   if (!characters) characters = '\\s';
				   
				   return String(input).replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '');
				};

				// Checks if string is blank or not.
				var isBlank = function(str){

				    if (str === null) str = '';
				    return (/^\s*$/).test(str);
				};

				var values = function (obj) {
				    var vals = [];
				    for( var key in obj ) {
				        if ( obj.hasOwnProperty(key) ) {
				            vals.push(obj[key]);
				        }
				    }
				    return vals;
				};

				// Find element by condition.
				var find = function(data, condition){

					var foundItems = [];
					angular.forEach(data, function(item){
						if(condition(item)){
							foundItems.push(item);
							return;
						}
					});

					return foundItems[0] || undefined;
				};
								
				// Check that tag collection contains search.
				var containsTag = function(tags, patternText){

				    var tag = find(tags, function(item){
				        return item.text.indexOf(patternText) !== -1;
				    });

				    return angular.isDefined(tag);
				};

				// Check that title contains search.
				var containsTitle = function(title, patternText){

				    return title.indexOf(trim(patternText)) !== -1;
				};

				// Check that url contains search.
				var containsUrl = function(url, patternText){

				    return url.indexOf(trim(patternText)) !== -1;
				};

				// Check that bookmark could be reached by following expression.
				var evaluateExpression = function(bookmark, node){
				    if(node.pattern === nonePattern && node.literals.length === 1){
				        var literal = node.literals[0];
				        var filteredValue = find(values(bookmark), function(propertyValue){
				            return propertyValue.toString().indexOf(trim(literal.text)) !== -1;
				        });
				        return angular.isDefined(filteredValue);
				    }

				    var evaluateFunc;
				    if(node.pattern === 'tag:'){
				        evaluateFunc = function(word){ return containsTag(bookmark.tag, word); };
				    }
				    else if(node.pattern === 'title:'){
				        evaluateFunc = function(word){ return containsTitle(bookmark.title, word); };
				    }
				    else if(node.pattern === 'url:'){
				        evaluateFunc = function(word){ return containsUrl(bookmark.url, word); };
				    }

				    if(node.literals.length === 1){
				        return evaluateFunc(node.literals[0].text);
				    }

				    var result = true;
				    var exp = andExpression;
				    angular.forEach(node.literals, function(literal){

				        var literalResult = evaluateFunc(literal.text);
				        if(exp === andExpression)
				        {
				            result = result && literalResult;
				        }
				        else if(exp === orExpression){
				            result = result || literalResult;
				        }
				        exp = literal.expression;
				    });

				    return result;
				};

				var publicMethods = {

					testMyPlease: function(){
						return 42;
					},

					generateExpressionTree: function(searchText, callback){

				        if(isBlank(searchText)) return exTree;

				        var searchWords = searchText.split(/(tag:|title:|url:)/);
				        if(searchWords.length === 0)
				            return exTree;

				        exTree = [];
				        var node = { pattern: nonePattern, literals:[] };
				        var literal = { text: '', expression: nonePattern};
				        
				        angular.forEach(searchWords, function(word){
				            if(isBlank(word)) return;

				            if(word === andExpression){
				                
				                literal.expression = andExpression;
				                return;
				            }
				            
				            var pattern = find(patterns, function(it){ return word.indexOf(it) !== -1; });
				            if(angular.isDefined(pattern)){
				                // flush node
				                if(node.literals.length !== 0) exTree.push(node);

				                // create a new node
				                node = {                    
				                    pattern: pattern,
				                    literals:[]
				                };

				                return;
				            }

				            var exps = word.toLowerCase().split(/(and|or)/);
				            angular.forEach(exps, function(item){
				                if(isBlank(word)) return;

				                if(item === andExpression){
				                    if(isBlank(literal.text)) return;

				                    literal.expression = andExpression;
				                    node.literals.push(literal);

				                    literal = null;
				                }
				                else if(item === orExpression){
				                    if(isBlank(literal.text)) return;

				                    literal.expression = orExpression;
				                    node.literals.push(literal);

				                    literal = null;
				                }
				                else{
				                    literal = {
				                        expression: nonePattern,
				                        text: trim(item)
				                    };
				                }
				            });

				            if(!isBlank(literal.text)) node.literals.push(literal);
				        });

				        exTree.push(node);

				        return exTree;
				    },

					// Check that bookmark could be reached by following search text.
					filterBookmark: function(bookmark, searchText){
					    
					    if(!searchText) return true;

					    if(this.search !== searchText){
					        this.search = searchText;
					        this.generateExpressionTree(this.search);
					    }
					    
					    var failureNode = find(exTree, function(node){
					        return !evaluateExpression(bookmark, node);
					    });

					    return !angular.isDefined(failureNode);
					}
				};

				return publicMethods;
			}];

	});	
})(window, window.angular);
