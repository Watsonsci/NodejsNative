(function webpackUniversalModuleDefinition(root, factory) {
	if (typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if (typeof define === 'function' && define.amd)
		define([], factory);
	else if (typeof exports === 'object')
		exports["Mock"] = factory();
	else
		root["Mock"] = factory();
})(this, function () {
	return /******/ (function (modules) { // webpackBootstrap
	/******/ // The module cache
	/******/ var installedModules = {};

	/******/ // The require function
	/******/ function __webpack_require__(moduleId) {

	/******/ // Check if module is in cache
	/******/ if (installedModules[moduleId])
	/******/ return installedModules[moduleId].exports;

	/******/ // Create a new module (and put it into the cache)
	/******/ var module = installedModules[moduleId] = {
	/******/ exports: {},
	/******/ id: moduleId,
	/******/ loaded: false
				/******/
};

	/******/ // Execute the module function
	/******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ // Flag the module as loaded
	/******/ module.loaded = true;

	/******/ // Return the exports of the module
	/******/ return module.exports;
			/******/
}


	/******/ // expose the modules object (__webpack_modules__)
	/******/ __webpack_require__.m = modules;

	/******/ // expose the module cache
	/******/ __webpack_require__.c = installedModules;

	/******/ // __webpack_public_path__
	/******/ __webpack_require__.p = "";

	/******/ // Load entry module and return exports
	/******/ return __webpack_require__(0);
		/******/
})
	/****************************************************** *************************/
	/******/([
	/* 0 */
	/***/ function (module, exports, __webpack_require__) {

			/* global require, module, window */
			var Handler = __webpack_require__(1)
			var Util = __webpack_require__(3)
			var Random = __webpack_require__(5)
			var RE = __webpack_require__(20)
			var toJSONSchema = __webpack_require__(23)
			var valid = __webpack_require__(25)

			varXHR
			if (typeof window !== 'undefined') XHR = __webpack_require__(27)

			/*!
			Mock - Mock requests & mock data
			https://github.com/nuysoft/Mock
			Mo Zhi mozhi.gyy@taobao.com nuysoft@gmail.com
			*/
			varMock = {
				Handler: Handler,
				Random: Random,
				Util: Util,
				XHR: XHR,
				RE: RE,
				toJSONSchema: toJSONSchema,
				valid: valid,
				heredoc: Util.heredoc,
				setup: function (settings) {
					return XHR.setup(settings)
				},
				_mocked: {}
			}

			Mock.version = '1.0.1-beta2'

			// avoid circular dependencies
			if (XHR) XHR.Mock = Mock

			/*
			* Mock.mock(template)
			* Mock.mock( function() )
			* Mock.mock(rurl, template)
			* Mock.mock( rurl, function(options) )
			* Mock.mock(rurl, rtype, template)
			* Mock.mock(rurl, rtype, function(options))
			
			Generate simulation data based on data templates.
			*/
			Mock.mock = function (rurl, rtype, template) {
				// Mock.mock(template)
				if (arguments.length === 1) {
					return Handler.gen(rurl)
				}
				// Mock.mock(rurl, template)
				if (arguments.length === 2) {
					template = rtype
					rtype = undefined
				}
				//Intercept XHR
				if (XHR) window.XMLHttpRequest = XHR
				Mock._mocked[rurl + (rtype || '')] = {
					rurl: rurl,
					rtype: rtype,
					template: template
				}
				return Mock
			}

			module.exports = Mock

			/***/
},
	/* 1 */
	/***/ function (module, exports, __webpack_require__) {

			/*
			## Handler
			
			Process data templates.
					
			* Handler.gen( template, name?, context? )
			
			Entry method.
			
			* Data Template Definition, DTD
						
			Process data template definitions.
			
			* Handler.array( options )
			* Handler.object(options)
			* Handler.number(options)
			* Handler.boolean(options)
			* Handler.string(options)
			* Handler.function(options)
			* Handler.regexp(options)
						
			Handle paths (relative and absolute).
			
			* Handler.getValueByKeyPath(key, options)
			
			* Data Placeholder Definition, DPD
			
			Handling data placeholder definitions
			
			* Handler.placeholder( placeholder, context, templateContext, options )
			
			*/

			var Constant = __webpack_require__(2)
			var Util = __webpack_require__(3)
			var Parser = __webpack_require__(4)
			var Random = __webpack_require__(5)
			var RE = __webpack_require__(20)

			var Handler = {
				extend: Util.extend
			}

			/*
			template attribute value (i.e. data template)
			name attribute name
			context data context, generated data
			templateContext template context,
			
			Handle.gen(template, name, options)
			context
			currentContext, templateCurrentContext,
			path, templatePath
			root, templateRoot
			*/
			Handler.gen = function (template, name, context) {
				/* jshint -W041 */
				name = name == undefined ? '' : (name + '')

				context = context || {}
				context = {
					//The current access path, only the attribute name, does not include the generation rules
					path: context.path || [Constant.GUID],
					templatePath: context.templatePath || [Constant.GUID++],
					//Context for the final property value
					currentContext: context.currentContext,