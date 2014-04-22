#boolean-search

[![Build Status](https://travis-ci.org/artemgrygor/boolean-search.svg?branch=master)](https://travis-ci.org/artemgrygor/boolean-search)

A javascript library for evaluating boolean search terms provider for [Angular.js](http://angularjs.org/) applications.
ngBooleanSearch is small (~7Kb), has minimalistic API and has only [Angular.js](http://angularjs.org/) as a dependency.

> You can use following strings to filter objects (where title is a property of object):
> search me title: awesome and cool or great

## Install
You can download all necessary ngBooleanSearch files manually or install it with bower:

```bash
bower install ngBooleanSearch
```

## Usage
You need only to include ``ngBooleanSearch.js`` to your project and then you can start using ``ngBooleanSearch`` provider in your directives, controllers and services.

Register ngBooleanSearch module at your application

```javascript
var app = angular.module('exampleApp', ['ngBooleanSearch']);

app.controller('MainCtrl', function ($scope, ngBooleanSearch) {
});
```
and then at your filter function

```javascript
$scope.searchTextFn = function(actual, search){

	return ngBooleanSearch.filterBookmark(item, search);
};
```

## API

ngBooleanSearch service provides easy to use and minimalistic API, but in the same time it's powerful enough. Here is the list of accessible methods that you can use:

##### ``.generateExpressionTree(searchText)``

Method allows to generate expression tree by a search string and allows not to create a new instance on each call. It accepts ``searchText`` string as the only argument.

##### ``.filterBookmark(bookmark, searchText)``

Method allows to filter object by search text with boolean expression. It accepts ``bookmark`` object as the first argument and ``searchText`` string as the second one.

## How to build
> You need this section only if you are interesting in updating current docset or build your own docset generator based on this.

1. Clone this repository.
2. Install [node.js](http://nodejs.org/).
2. Install [bower.io](http://bower.io/) `npm install -g bower`.
3. Download all npm dependencies with `npm install` (invoking from root project folder).
4. Download all bower dependencies with `bower install` (invoking from root project folder).
5. Launch `gulp test` command to run all test and check that everything is correct.

## License
Apache License, Version 2.0

***
