/*!
 * @license
 * 
 * dhtmlxScheduler v.6.0.2 Standard
 * 
 * To use dhtmlxScheduler in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxScheduler/#licensing or contact us at sales@dhtmlx.com
 * 
 * (c) XB Software Ltd.
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("dhtmlxscheduler", [], factory);
	else if(typeof exports === 'object')
		exports["dhtmlxscheduler"] = factory();
	else
		root["dhtmlxscheduler"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/codebase/sources/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./sources/dhtmlxscheduler.gpl.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/bluebird/js/browser/bluebird.core.js":
/*!***********************************************************!*\
  !*** ./node_modules/bluebird/js/browser/bluebird.core.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* @preserve
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013-2018 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */

/**
 * bluebird build version 3.7.2
 * Features enabled: core
 * Features disabled: race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
*/
!function (e) {
  if ("object" == ( false ? undefined : _typeof(exports)) && "undefined" != typeof module) module.exports = e();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else { var f; }
}(function () {
  var define, module, exports;
  return function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof _dereq_ == "function" && _dereq_;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f;
        }

        var l = n[o] = {
          exports: {}
        };
        t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }

      return n[o].exports;
    }

    var i = typeof _dereq_ == "function" && _dereq_;

    for (var o = 0; o < r.length; o++) {
      s(r[o]);
    }

    return s;
  }({
    1: [function (_dereq_, module, exports) {
      "use strict";

      var firstLineError;

      try {
        throw new Error();
      } catch (e) {
        firstLineError = e;
      }

      var schedule = _dereq_("./schedule");

      var Queue = _dereq_("./queue");

      function Async() {
        this._customScheduler = false;
        this._isTickUsed = false;
        this._lateQueue = new Queue(16);
        this._normalQueue = new Queue(16);
        this._haveDrainedQueues = false;
        var self = this;

        this.drainQueues = function () {
          self._drainQueues();
        };

        this._schedule = schedule;
      }

      Async.prototype.setScheduler = function (fn) {
        var prev = this._schedule;
        this._schedule = fn;
        this._customScheduler = true;
        return prev;
      };

      Async.prototype.hasCustomScheduler = function () {
        return this._customScheduler;
      };

      Async.prototype.haveItemsQueued = function () {
        return this._isTickUsed || this._haveDrainedQueues;
      };

      Async.prototype.fatalError = function (e, isNode) {
        if (isNode) {
          process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) + "\n");
          process.exit(2);
        } else {
          this.throwLater(e);
        }
      };

      Async.prototype.throwLater = function (fn, arg) {
        if (arguments.length === 1) {
          arg = fn;

          fn = function fn() {
            throw arg;
          };
        }

        if (typeof setTimeout !== "undefined") {
          setTimeout(function () {
            fn(arg);
          }, 0);
        } else try {
          this._schedule(function () {
            fn(arg);
          });
        } catch (e) {
          throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
        }
      };

      function AsyncInvokeLater(fn, receiver, arg) {
        this._lateQueue.push(fn, receiver, arg);

        this._queueTick();
      }

      function AsyncInvoke(fn, receiver, arg) {
        this._normalQueue.push(fn, receiver, arg);

        this._queueTick();
      }

      function AsyncSettlePromises(promise) {
        this._normalQueue._pushOne(promise);

        this._queueTick();
      }

      Async.prototype.invokeLater = AsyncInvokeLater;
      Async.prototype.invoke = AsyncInvoke;
      Async.prototype.settlePromises = AsyncSettlePromises;

      function _drainQueue(queue) {
        while (queue.length() > 0) {
          _drainQueueStep(queue);
        }
      }

      function _drainQueueStep(queue) {
        var fn = queue.shift();

        if (typeof fn !== "function") {
          fn._settlePromises();
        } else {
          var receiver = queue.shift();
          var arg = queue.shift();
          fn.call(receiver, arg);
        }
      }

      Async.prototype._drainQueues = function () {
        _drainQueue(this._normalQueue);

        this._reset();

        this._haveDrainedQueues = true;

        _drainQueue(this._lateQueue);
      };

      Async.prototype._queueTick = function () {
        if (!this._isTickUsed) {
          this._isTickUsed = true;

          this._schedule(this.drainQueues);
        }
      };

      Async.prototype._reset = function () {
        this._isTickUsed = false;
      };

      module.exports = Async;
      module.exports.firstLineError = firstLineError;
    }, {
      "./queue": 17,
      "./schedule": 18
    }],
    2: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, INTERNAL, tryConvertToPromise, debug) {
        var calledBind = false;

        var rejectThis = function rejectThis(_, e) {
          this._reject(e);
        };

        var targetRejected = function targetRejected(e, context) {
          context.promiseRejectionQueued = true;

          context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
        };

        var bindingResolved = function bindingResolved(thisArg, context) {
          if ((this._bitField & 50397184) === 0) {
            this._resolveCallback(context.target);
          }
        };

        var bindingRejected = function bindingRejected(e, context) {
          if (!context.promiseRejectionQueued) this._reject(e);
        };

        Promise.prototype.bind = function (thisArg) {
          if (!calledBind) {
            calledBind = true;
            Promise.prototype._propagateFrom = debug.propagateFromFunction();
            Promise.prototype._boundValue = debug.boundValueFunction();
          }

          var maybePromise = tryConvertToPromise(thisArg);
          var ret = new Promise(INTERNAL);

          ret._propagateFrom(this, 1);

          var target = this._target();

          ret._setBoundTo(maybePromise);

          if (maybePromise instanceof Promise) {
            var context = {
              promiseRejectionQueued: false,
              promise: ret,
              target: target,
              bindingPromise: maybePromise
            };

            target._then(INTERNAL, targetRejected, undefined, ret, context);

            maybePromise._then(bindingResolved, bindingRejected, undefined, ret, context);

            ret._setOnCancel(maybePromise);
          } else {
            ret._resolveCallback(target);
          }

          return ret;
        };

        Promise.prototype._setBoundTo = function (obj) {
          if (obj !== undefined) {
            this._bitField = this._bitField | 2097152;
            this._boundTo = obj;
          } else {
            this._bitField = this._bitField & ~2097152;
          }
        };

        Promise.prototype._isBound = function () {
          return (this._bitField & 2097152) === 2097152;
        };

        Promise.bind = function (thisArg, value) {
          return Promise.resolve(value).bind(thisArg);
        };
      };
    }, {}],
    3: [function (_dereq_, module, exports) {
      "use strict";

      var old;
      if (typeof Promise !== "undefined") old = Promise;

      function noConflict() {
        try {
          if (Promise === bluebird) Promise = old;
        } catch (e) {}

        return bluebird;
      }

      var bluebird = _dereq_("./promise")();

      bluebird.noConflict = noConflict;
      module.exports = bluebird;
    }, {
      "./promise": 15
    }],
    4: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, PromiseArray, apiRejection, debug) {
        var util = _dereq_("./util");

        var tryCatch = util.tryCatch;
        var errorObj = util.errorObj;
        var async = Promise._async;

        Promise.prototype["break"] = Promise.prototype.cancel = function () {
          if (!debug.cancellation()) return this._warn("cancellation is disabled");
          var promise = this;
          var child = promise;

          while (promise._isCancellable()) {
            if (!promise._cancelBy(child)) {
              if (child._isFollowing()) {
                child._followee().cancel();
              } else {
                child._cancelBranched();
              }

              break;
            }

            var parent = promise._cancellationParent;

            if (parent == null || !parent._isCancellable()) {
              if (promise._isFollowing()) {
                promise._followee().cancel();
              } else {
                promise._cancelBranched();
              }

              break;
            } else {
              if (promise._isFollowing()) promise._followee().cancel();

              promise._setWillBeCancelled();

              child = promise;
              promise = parent;
            }
          }
        };

        Promise.prototype._branchHasCancelled = function () {
          this._branchesRemainingToCancel--;
        };

        Promise.prototype._enoughBranchesHaveCancelled = function () {
          return this._branchesRemainingToCancel === undefined || this._branchesRemainingToCancel <= 0;
        };

        Promise.prototype._cancelBy = function (canceller) {
          if (canceller === this) {
            this._branchesRemainingToCancel = 0;

            this._invokeOnCancel();

            return true;
          } else {
            this._branchHasCancelled();

            if (this._enoughBranchesHaveCancelled()) {
              this._invokeOnCancel();

              return true;
            }
          }

          return false;
        };

        Promise.prototype._cancelBranched = function () {
          if (this._enoughBranchesHaveCancelled()) {
            this._cancel();
          }
        };

        Promise.prototype._cancel = function () {
          if (!this._isCancellable()) return;

          this._setCancelled();

          async.invoke(this._cancelPromises, this, undefined);
        };

        Promise.prototype._cancelPromises = function () {
          if (this._length() > 0) this._settlePromises();
        };

        Promise.prototype._unsetOnCancel = function () {
          this._onCancelField = undefined;
        };

        Promise.prototype._isCancellable = function () {
          return this.isPending() && !this._isCancelled();
        };

        Promise.prototype.isCancellable = function () {
          return this.isPending() && !this.isCancelled();
        };

        Promise.prototype._doInvokeOnCancel = function (onCancelCallback, internalOnly) {
          if (util.isArray(onCancelCallback)) {
            for (var i = 0; i < onCancelCallback.length; ++i) {
              this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
            }
          } else if (onCancelCallback !== undefined) {
            if (typeof onCancelCallback === "function") {
              if (!internalOnly) {
                var e = tryCatch(onCancelCallback).call(this._boundValue());

                if (e === errorObj) {
                  this._attachExtraTrace(e.e);

                  async.throwLater(e.e);
                }
              }
            } else {
              onCancelCallback._resultCancelled(this);
            }
          }
        };

        Promise.prototype._invokeOnCancel = function () {
          var onCancelCallback = this._onCancel();

          this._unsetOnCancel();

          async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
        };

        Promise.prototype._invokeInternalOnCancel = function () {
          if (this._isCancellable()) {
            this._doInvokeOnCancel(this._onCancel(), true);

            this._unsetOnCancel();
          }
        };

        Promise.prototype._resultCancelled = function () {
          this.cancel();
        };
      };
    }, {
      "./util": 21
    }],
    5: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (NEXT_FILTER) {
        var util = _dereq_("./util");

        var getKeys = _dereq_("./es5").keys;

        var tryCatch = util.tryCatch;
        var errorObj = util.errorObj;

        function catchFilter(instances, cb, promise) {
          return function (e) {
            var boundTo = promise._boundValue();

            predicateLoop: for (var i = 0; i < instances.length; ++i) {
              var item = instances[i];

              if (item === Error || item != null && item.prototype instanceof Error) {
                if (e instanceof item) {
                  return tryCatch(cb).call(boundTo, e);
                }
              } else if (typeof item === "function") {
                var matchesPredicate = tryCatch(item).call(boundTo, e);

                if (matchesPredicate === errorObj) {
                  return matchesPredicate;
                } else if (matchesPredicate) {
                  return tryCatch(cb).call(boundTo, e);
                }
              } else if (util.isObject(e)) {
                var keys = getKeys(item);

                for (var j = 0; j < keys.length; ++j) {
                  var key = keys[j];

                  if (item[key] != e[key]) {
                    continue predicateLoop;
                  }
                }

                return tryCatch(cb).call(boundTo, e);
              }
            }

            return NEXT_FILTER;
          };
        }

        return catchFilter;
      };
    }, {
      "./es5": 10,
      "./util": 21
    }],
    6: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise) {
        var longStackTraces = false;
        var contextStack = [];

        Promise.prototype._promiseCreated = function () {};

        Promise.prototype._pushContext = function () {};

        Promise.prototype._popContext = function () {
          return null;
        };

        Promise._peekContext = Promise.prototype._peekContext = function () {};

        function Context() {
          this._trace = new Context.CapturedTrace(peekContext());
        }

        Context.prototype._pushContext = function () {
          if (this._trace !== undefined) {
            this._trace._promiseCreated = null;
            contextStack.push(this._trace);
          }
        };

        Context.prototype._popContext = function () {
          if (this._trace !== undefined) {
            var trace = contextStack.pop();
            var ret = trace._promiseCreated;
            trace._promiseCreated = null;
            return ret;
          }

          return null;
        };

        function createContext() {
          if (longStackTraces) return new Context();
        }

        function peekContext() {
          var lastIndex = contextStack.length - 1;

          if (lastIndex >= 0) {
            return contextStack[lastIndex];
          }

          return undefined;
        }

        Context.CapturedTrace = null;
        Context.create = createContext;

        Context.deactivateLongStackTraces = function () {};

        Context.activateLongStackTraces = function () {
          var Promise_pushContext = Promise.prototype._pushContext;
          var Promise_popContext = Promise.prototype._popContext;
          var Promise_PeekContext = Promise._peekContext;
          var Promise_peekContext = Promise.prototype._peekContext;
          var Promise_promiseCreated = Promise.prototype._promiseCreated;

          Context.deactivateLongStackTraces = function () {
            Promise.prototype._pushContext = Promise_pushContext;
            Promise.prototype._popContext = Promise_popContext;
            Promise._peekContext = Promise_PeekContext;
            Promise.prototype._peekContext = Promise_peekContext;
            Promise.prototype._promiseCreated = Promise_promiseCreated;
            longStackTraces = false;
          };

          longStackTraces = true;
          Promise.prototype._pushContext = Context.prototype._pushContext;
          Promise.prototype._popContext = Context.prototype._popContext;
          Promise._peekContext = Promise.prototype._peekContext = peekContext;

          Promise.prototype._promiseCreated = function () {
            var ctx = this._peekContext();

            if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
          };
        };

        return Context;
      };
    }, {}],
    7: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, Context, enableAsyncHooks, disableAsyncHooks) {
        var async = Promise._async;

        var Warning = _dereq_("./errors").Warning;

        var util = _dereq_("./util");

        var es5 = _dereq_("./es5");

        var canAttachTrace = util.canAttachTrace;
        var unhandledRejectionHandled;
        var possiblyUnhandledRejection;
        var bluebirdFramePattern = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
        var nodeFramePattern = /\((?:timers\.js):\d+:\d+\)/;
        var parseLinePattern = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
        var stackFramePattern = null;
        var formatStack = null;
        var indentStackFrames = false;
        var printWarning;
        var debugging = !!(util.env("BLUEBIRD_DEBUG") != 0 && ( true || false));
        var warnings = !!(util.env("BLUEBIRD_WARNINGS") != 0 && (debugging || util.env("BLUEBIRD_WARNINGS")));
        var longStackTraces = !!(util.env("BLUEBIRD_LONG_STACK_TRACES") != 0 && (debugging || util.env("BLUEBIRD_LONG_STACK_TRACES")));
        var wForgottenReturn = util.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 && (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
        var deferUnhandledRejectionCheck;

        (function () {
          var promises = [];

          function unhandledRejectionCheck() {
            for (var i = 0; i < promises.length; ++i) {
              promises[i]._notifyUnhandledRejection();
            }

            unhandledRejectionClear();
          }

          function unhandledRejectionClear() {
            promises.length = 0;
          }

          deferUnhandledRejectionCheck = function deferUnhandledRejectionCheck(promise) {
            promises.push(promise);
            setTimeout(unhandledRejectionCheck, 1);
          };

          es5.defineProperty(Promise, "_unhandledRejectionCheck", {
            value: unhandledRejectionCheck
          });
          es5.defineProperty(Promise, "_unhandledRejectionClear", {
            value: unhandledRejectionClear
          });
        })();

        Promise.prototype.suppressUnhandledRejections = function () {
          var target = this._target();

          target._bitField = target._bitField & ~1048576 | 524288;
        };

        Promise.prototype._ensurePossibleRejectionHandled = function () {
          if ((this._bitField & 524288) !== 0) return;

          this._setRejectionIsUnhandled();

          deferUnhandledRejectionCheck(this);
        };

        Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
          fireRejectionEvent("rejectionHandled", unhandledRejectionHandled, undefined, this);
        };

        Promise.prototype._setReturnedNonUndefined = function () {
          this._bitField = this._bitField | 268435456;
        };

        Promise.prototype._returnedNonUndefined = function () {
          return (this._bitField & 268435456) !== 0;
        };

        Promise.prototype._notifyUnhandledRejection = function () {
          if (this._isRejectionUnhandled()) {
            var reason = this._settledValue();

            this._setUnhandledRejectionIsNotified();

            fireRejectionEvent("unhandledRejection", possiblyUnhandledRejection, reason, this);
          }
        };

        Promise.prototype._setUnhandledRejectionIsNotified = function () {
          this._bitField = this._bitField | 262144;
        };

        Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
          this._bitField = this._bitField & ~262144;
        };

        Promise.prototype._isUnhandledRejectionNotified = function () {
          return (this._bitField & 262144) > 0;
        };

        Promise.prototype._setRejectionIsUnhandled = function () {
          this._bitField = this._bitField | 1048576;
        };

        Promise.prototype._unsetRejectionIsUnhandled = function () {
          this._bitField = this._bitField & ~1048576;

          if (this._isUnhandledRejectionNotified()) {
            this._unsetUnhandledRejectionIsNotified();

            this._notifyUnhandledRejectionIsHandled();
          }
        };

        Promise.prototype._isRejectionUnhandled = function () {
          return (this._bitField & 1048576) > 0;
        };

        Promise.prototype._warn = function (message, shouldUseOwnTrace, promise) {
          return warn(message, shouldUseOwnTrace, promise || this);
        };

        Promise.onPossiblyUnhandledRejection = function (fn) {
          var context = Promise._getContext();

          possiblyUnhandledRejection = util.contextBind(context, fn);
        };

        Promise.onUnhandledRejectionHandled = function (fn) {
          var context = Promise._getContext();

          unhandledRejectionHandled = util.contextBind(context, fn);
        };

        var disableLongStackTraces = function disableLongStackTraces() {};

        Promise.longStackTraces = function () {
          if (async.haveItemsQueued() && !config.longStackTraces) {
            throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
          }

          if (!config.longStackTraces && longStackTracesIsSupported()) {
            var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
            var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
            var Promise_dereferenceTrace = Promise.prototype._dereferenceTrace;
            config.longStackTraces = true;

            disableLongStackTraces = function disableLongStackTraces() {
              if (async.haveItemsQueued() && !config.longStackTraces) {
                throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
              }

              Promise.prototype._captureStackTrace = Promise_captureStackTrace;
              Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
              Promise.prototype._dereferenceTrace = Promise_dereferenceTrace;
              Context.deactivateLongStackTraces();
              config.longStackTraces = false;
            };

            Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
            Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
            Promise.prototype._dereferenceTrace = longStackTracesDereferenceTrace;
            Context.activateLongStackTraces();
          }
        };

        Promise.hasLongStackTraces = function () {
          return config.longStackTraces && longStackTracesIsSupported();
        };

        var legacyHandlers = {
          unhandledrejection: {
            before: function before() {
              var ret = util.global.onunhandledrejection;
              util.global.onunhandledrejection = null;
              return ret;
            },
            after: function after(fn) {
              util.global.onunhandledrejection = fn;
            }
          },
          rejectionhandled: {
            before: function before() {
              var ret = util.global.onrejectionhandled;
              util.global.onrejectionhandled = null;
              return ret;
            },
            after: function after(fn) {
              util.global.onrejectionhandled = fn;
            }
          }
        };

        var fireDomEvent = function () {
          var dispatch = function dispatch(legacy, e) {
            if (legacy) {
              var fn;

              try {
                fn = legacy.before();
                return !util.global.dispatchEvent(e);
              } finally {
                legacy.after(fn);
              }
            } else {
              return !util.global.dispatchEvent(e);
            }
          };

          try {
            if (typeof CustomEvent === "function") {
              var event = new CustomEvent("CustomEvent");
              util.global.dispatchEvent(event);
              return function (name, event) {
                name = name.toLowerCase();
                var eventData = {
                  detail: event,
                  cancelable: true
                };
                var domEvent = new CustomEvent(name, eventData);
                es5.defineProperty(domEvent, "promise", {
                  value: event.promise
                });
                es5.defineProperty(domEvent, "reason", {
                  value: event.reason
                });
                return dispatch(legacyHandlers[name], domEvent);
              };
            } else if (typeof Event === "function") {
              var event = new Event("CustomEvent");
              util.global.dispatchEvent(event);
              return function (name, event) {
                name = name.toLowerCase();
                var domEvent = new Event(name, {
                  cancelable: true
                });
                domEvent.detail = event;
                es5.defineProperty(domEvent, "promise", {
                  value: event.promise
                });
                es5.defineProperty(domEvent, "reason", {
                  value: event.reason
                });
                return dispatch(legacyHandlers[name], domEvent);
              };
            } else {
              var event = document.createEvent("CustomEvent");
              event.initCustomEvent("testingtheevent", false, true, {});
              util.global.dispatchEvent(event);
              return function (name, event) {
                name = name.toLowerCase();
                var domEvent = document.createEvent("CustomEvent");
                domEvent.initCustomEvent(name, false, true, event);
                return dispatch(legacyHandlers[name], domEvent);
              };
            }
          } catch (e) {}

          return function () {
            return false;
          };
        }();

        var fireGlobalEvent = function () {
          if (util.isNode) {
            return function () {
              return process.emit.apply(process, arguments);
            };
          } else {
            if (!util.global) {
              return function () {
                return false;
              };
            }

            return function (name) {
              var methodName = "on" + name.toLowerCase();
              var method = util.global[methodName];
              if (!method) return false;
              method.apply(util.global, [].slice.call(arguments, 1));
              return true;
            };
          }
        }();

        function generatePromiseLifecycleEventObject(name, promise) {
          return {
            promise: promise
          };
        }

        var eventToObjectGenerator = {
          promiseCreated: generatePromiseLifecycleEventObject,
          promiseFulfilled: generatePromiseLifecycleEventObject,
          promiseRejected: generatePromiseLifecycleEventObject,
          promiseResolved: generatePromiseLifecycleEventObject,
          promiseCancelled: generatePromiseLifecycleEventObject,
          promiseChained: function promiseChained(name, promise, child) {
            return {
              promise: promise,
              child: child
            };
          },
          warning: function warning(name, _warning) {
            return {
              warning: _warning
            };
          },
          unhandledRejection: function unhandledRejection(name, reason, promise) {
            return {
              reason: reason,
              promise: promise
            };
          },
          rejectionHandled: generatePromiseLifecycleEventObject
        };

        var activeFireEvent = function activeFireEvent(name) {
          var globalEventFired = false;

          try {
            globalEventFired = fireGlobalEvent.apply(null, arguments);
          } catch (e) {
            async.throwLater(e);
            globalEventFired = true;
          }

          var domEventFired = false;

          try {
            domEventFired = fireDomEvent(name, eventToObjectGenerator[name].apply(null, arguments));
          } catch (e) {
            async.throwLater(e);
            domEventFired = true;
          }

          return domEventFired || globalEventFired;
        };

        Promise.config = function (opts) {
          opts = Object(opts);

          if ("longStackTraces" in opts) {
            if (opts.longStackTraces) {
              Promise.longStackTraces();
            } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
              disableLongStackTraces();
            }
          }

          if ("warnings" in opts) {
            var warningsOption = opts.warnings;
            config.warnings = !!warningsOption;
            wForgottenReturn = config.warnings;

            if (util.isObject(warningsOption)) {
              if ("wForgottenReturn" in warningsOption) {
                wForgottenReturn = !!warningsOption.wForgottenReturn;
              }
            }
          }

          if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
            if (async.haveItemsQueued()) {
              throw new Error("cannot enable cancellation after promises are in use");
            }

            Promise.prototype._clearCancellationData = cancellationClearCancellationData;
            Promise.prototype._propagateFrom = cancellationPropagateFrom;
            Promise.prototype._onCancel = cancellationOnCancel;
            Promise.prototype._setOnCancel = cancellationSetOnCancel;
            Promise.prototype._attachCancellationCallback = cancellationAttachCancellationCallback;
            Promise.prototype._execute = cancellationExecute;
            _propagateFromFunction = cancellationPropagateFrom;
            config.cancellation = true;
          }

          if ("monitoring" in opts) {
            if (opts.monitoring && !config.monitoring) {
              config.monitoring = true;
              Promise.prototype._fireEvent = activeFireEvent;
            } else if (!opts.monitoring && config.monitoring) {
              config.monitoring = false;
              Promise.prototype._fireEvent = defaultFireEvent;
            }
          }

          if ("asyncHooks" in opts && util.nodeSupportsAsyncResource) {
            var prev = config.asyncHooks;
            var cur = !!opts.asyncHooks;

            if (prev !== cur) {
              config.asyncHooks = cur;

              if (cur) {
                enableAsyncHooks();
              } else {
                disableAsyncHooks();
              }
            }
          }

          return Promise;
        };

        function defaultFireEvent() {
          return false;
        }

        Promise.prototype._fireEvent = defaultFireEvent;

        Promise.prototype._execute = function (executor, resolve, reject) {
          try {
            executor(resolve, reject);
          } catch (e) {
            return e;
          }
        };

        Promise.prototype._onCancel = function () {};

        Promise.prototype._setOnCancel = function (handler) {
          ;
        };

        Promise.prototype._attachCancellationCallback = function (onCancel) {
          ;
        };

        Promise.prototype._captureStackTrace = function () {};

        Promise.prototype._attachExtraTrace = function () {};

        Promise.prototype._dereferenceTrace = function () {};

        Promise.prototype._clearCancellationData = function () {};

        Promise.prototype._propagateFrom = function (parent, flags) {
          ;
          ;
        };

        function cancellationExecute(executor, resolve, reject) {
          var promise = this;

          try {
            executor(resolve, reject, function (onCancel) {
              if (typeof onCancel !== "function") {
                throw new TypeError("onCancel must be a function, got: " + util.toString(onCancel));
              }

              promise._attachCancellationCallback(onCancel);
            });
          } catch (e) {
            return e;
          }
        }

        function cancellationAttachCancellationCallback(onCancel) {
          if (!this._isCancellable()) return this;

          var previousOnCancel = this._onCancel();

          if (previousOnCancel !== undefined) {
            if (util.isArray(previousOnCancel)) {
              previousOnCancel.push(onCancel);
            } else {
              this._setOnCancel([previousOnCancel, onCancel]);
            }
          } else {
            this._setOnCancel(onCancel);
          }
        }

        function cancellationOnCancel() {
          return this._onCancelField;
        }

        function cancellationSetOnCancel(onCancel) {
          this._onCancelField = onCancel;
        }

        function cancellationClearCancellationData() {
          this._cancellationParent = undefined;
          this._onCancelField = undefined;
        }

        function cancellationPropagateFrom(parent, flags) {
          if ((flags & 1) !== 0) {
            this._cancellationParent = parent;
            var branchesRemainingToCancel = parent._branchesRemainingToCancel;

            if (branchesRemainingToCancel === undefined) {
              branchesRemainingToCancel = 0;
            }

            parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
          }

          if ((flags & 2) !== 0 && parent._isBound()) {
            this._setBoundTo(parent._boundTo);
          }
        }

        function bindingPropagateFrom(parent, flags) {
          if ((flags & 2) !== 0 && parent._isBound()) {
            this._setBoundTo(parent._boundTo);
          }
        }

        var _propagateFromFunction = bindingPropagateFrom;

        function _boundValueFunction() {
          var ret = this._boundTo;

          if (ret !== undefined) {
            if (ret instanceof Promise) {
              if (ret.isFulfilled()) {
                return ret.value();
              } else {
                return undefined;
              }
            }
          }

          return ret;
        }

        function longStackTracesCaptureStackTrace() {
          this._trace = new CapturedTrace(this._peekContext());
        }

        function longStackTracesAttachExtraTrace(error, ignoreSelf) {
          if (canAttachTrace(error)) {
            var trace = this._trace;

            if (trace !== undefined) {
              if (ignoreSelf) trace = trace._parent;
            }

            if (trace !== undefined) {
              trace.attachExtraTrace(error);
            } else if (!error.__stackCleaned__) {
              var parsed = parseStackAndMessage(error);
              util.notEnumerableProp(error, "stack", parsed.message + "\n" + parsed.stack.join("\n"));
              util.notEnumerableProp(error, "__stackCleaned__", true);
            }
          }
        }

        function longStackTracesDereferenceTrace() {
          this._trace = undefined;
        }

        function checkForgottenReturns(returnValue, promiseCreated, name, promise, parent) {
          if (returnValue === undefined && promiseCreated !== null && wForgottenReturn) {
            if (parent !== undefined && parent._returnedNonUndefined()) return;
            if ((promise._bitField & 65535) === 0) return;
            if (name) name = name + " ";
            var handlerLine = "";
            var creatorLine = "";

            if (promiseCreated._trace) {
              var traceLines = promiseCreated._trace.stack.split("\n");

              var stack = cleanStack(traceLines);

              for (var i = stack.length - 1; i >= 0; --i) {
                var line = stack[i];

                if (!nodeFramePattern.test(line)) {
                  var lineMatches = line.match(parseLinePattern);

                  if (lineMatches) {
                    handlerLine = "at " + lineMatches[1] + ":" + lineMatches[2] + ":" + lineMatches[3] + " ";
                  }

                  break;
                }
              }

              if (stack.length > 0) {
                var firstUserLine = stack[0];

                for (var i = 0; i < traceLines.length; ++i) {
                  if (traceLines[i] === firstUserLine) {
                    if (i > 0) {
                      creatorLine = "\n" + traceLines[i - 1];
                    }

                    break;
                  }
                }
              }
            }

            var msg = "a promise was created in a " + name + "handler " + handlerLine + "but was not returned from it, " + "see http://goo.gl/rRqMUw" + creatorLine;

            promise._warn(msg, true, promiseCreated);
          }
        }

        function deprecated(name, replacement) {
          var message = name + " is deprecated and will be removed in a future version.";
          if (replacement) message += " Use " + replacement + " instead.";
          return warn(message);
        }

        function warn(message, shouldUseOwnTrace, promise) {
          if (!config.warnings) return;
          var warning = new Warning(message);
          var ctx;

          if (shouldUseOwnTrace) {
            promise._attachExtraTrace(warning);
          } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
            ctx.attachExtraTrace(warning);
          } else {
            var parsed = parseStackAndMessage(warning);
            warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
          }

          if (!activeFireEvent("warning", warning)) {
            formatAndLogError(warning, "", true);
          }
        }

        function reconstructStack(message, stacks) {
          for (var i = 0; i < stacks.length - 1; ++i) {
            stacks[i].push("From previous event:");
            stacks[i] = stacks[i].join("\n");
          }

          if (i < stacks.length) {
            stacks[i] = stacks[i].join("\n");
          }

          return message + "\n" + stacks.join("\n");
        }

        function removeDuplicateOrEmptyJumps(stacks) {
          for (var i = 0; i < stacks.length; ++i) {
            if (stacks[i].length === 0 || i + 1 < stacks.length && stacks[i][0] === stacks[i + 1][0]) {
              stacks.splice(i, 1);
              i--;
            }
          }
        }

        function removeCommonRoots(stacks) {
          var current = stacks[0];

          for (var i = 1; i < stacks.length; ++i) {
            var prev = stacks[i];
            var currentLastIndex = current.length - 1;
            var currentLastLine = current[currentLastIndex];
            var commonRootMeetPoint = -1;

            for (var j = prev.length - 1; j >= 0; --j) {
              if (prev[j] === currentLastLine) {
                commonRootMeetPoint = j;
                break;
              }
            }

            for (var j = commonRootMeetPoint; j >= 0; --j) {
              var line = prev[j];

              if (current[currentLastIndex] === line) {
                current.pop();
                currentLastIndex--;
              } else {
                break;
              }
            }

            current = prev;
          }
        }

        function cleanStack(stack) {
          var ret = [];

          for (var i = 0; i < stack.length; ++i) {
            var line = stack[i];
            var isTraceLine = "    (No stack trace)" === line || stackFramePattern.test(line);
            var isInternalFrame = isTraceLine && shouldIgnore(line);

            if (isTraceLine && !isInternalFrame) {
              if (indentStackFrames && line.charAt(0) !== " ") {
                line = "    " + line;
              }

              ret.push(line);
            }
          }

          return ret;
        }

        function stackFramesAsArray(error) {
          var stack = error.stack.replace(/\s+$/g, "").split("\n");

          for (var i = 0; i < stack.length; ++i) {
            var line = stack[i];

            if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
              break;
            }
          }

          if (i > 0 && error.name != "SyntaxError") {
            stack = stack.slice(i);
          }

          return stack;
        }

        function parseStackAndMessage(error) {
          var stack = error.stack;
          var message = error.toString();
          stack = typeof stack === "string" && stack.length > 0 ? stackFramesAsArray(error) : ["    (No stack trace)"];
          return {
            message: message,
            stack: error.name == "SyntaxError" ? stack : cleanStack(stack)
          };
        }

        function formatAndLogError(error, title, isSoft) {
          if (typeof console !== "undefined") {
            var message;

            if (util.isObject(error)) {
              var stack = error.stack;
              message = title + formatStack(stack, error);
            } else {
              message = title + String(error);
            }

            if (typeof printWarning === "function") {
              printWarning(message, isSoft);
            } else if (typeof console.log === "function" || _typeof(console.log) === "object") {
              console.log(message);
            }
          }
        }

        function fireRejectionEvent(name, localHandler, reason, promise) {
          var localEventFired = false;

          try {
            if (typeof localHandler === "function") {
              localEventFired = true;

              if (name === "rejectionHandled") {
                localHandler(promise);
              } else {
                localHandler(reason, promise);
              }
            }
          } catch (e) {
            async.throwLater(e);
          }

          if (name === "unhandledRejection") {
            if (!activeFireEvent(name, reason, promise) && !localEventFired) {
              formatAndLogError(reason, "Unhandled rejection ");
            }
          } else {
            activeFireEvent(name, promise);
          }
        }

        function formatNonError(obj) {
          var str;

          if (typeof obj === "function") {
            str = "[function " + (obj.name || "anonymous") + "]";
          } else {
            str = obj && typeof obj.toString === "function" ? obj.toString() : util.toString(obj);
            var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;

            if (ruselessToString.test(str)) {
              try {
                var newStr = JSON.stringify(obj);
                str = newStr;
              } catch (e) {}
            }

            if (str.length === 0) {
              str = "(empty array)";
            }
          }

          return "(<" + snip(str) + ">, no stack trace)";
        }

        function snip(str) {
          var maxChars = 41;

          if (str.length < maxChars) {
            return str;
          }

          return str.substr(0, maxChars - 3) + "...";
        }

        function longStackTracesIsSupported() {
          return typeof captureStackTrace === "function";
        }

        var shouldIgnore = function shouldIgnore() {
          return false;
        };

        var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;

        function parseLineInfo(line) {
          var matches = line.match(parseLineInfoRegex);

          if (matches) {
            return {
              fileName: matches[1],
              line: parseInt(matches[2], 10)
            };
          }
        }

        function setBounds(firstLineError, lastLineError) {
          if (!longStackTracesIsSupported()) return;
          var firstStackLines = (firstLineError.stack || "").split("\n");
          var lastStackLines = (lastLineError.stack || "").split("\n");
          var firstIndex = -1;
          var lastIndex = -1;
          var firstFileName;
          var lastFileName;

          for (var i = 0; i < firstStackLines.length; ++i) {
            var result = parseLineInfo(firstStackLines[i]);

            if (result) {
              firstFileName = result.fileName;
              firstIndex = result.line;
              break;
            }
          }

          for (var i = 0; i < lastStackLines.length; ++i) {
            var result = parseLineInfo(lastStackLines[i]);

            if (result) {
              lastFileName = result.fileName;
              lastIndex = result.line;
              break;
            }
          }

          if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName || firstFileName !== lastFileName || firstIndex >= lastIndex) {
            return;
          }

          shouldIgnore = function shouldIgnore(line) {
            if (bluebirdFramePattern.test(line)) return true;
            var info = parseLineInfo(line);

            if (info) {
              if (info.fileName === firstFileName && firstIndex <= info.line && info.line <= lastIndex) {
                return true;
              }
            }

            return false;
          };
        }

        function CapturedTrace(parent) {
          this._parent = parent;
          this._promisesCreated = 0;
          var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
          captureStackTrace(this, CapturedTrace);
          if (length > 32) this.uncycle();
        }

        util.inherits(CapturedTrace, Error);
        Context.CapturedTrace = CapturedTrace;

        CapturedTrace.prototype.uncycle = function () {
          var length = this._length;
          if (length < 2) return;
          var nodes = [];
          var stackToIndex = {};

          for (var i = 0, node = this; node !== undefined; ++i) {
            nodes.push(node);
            node = node._parent;
          }

          length = this._length = i;

          for (var i = length - 1; i >= 0; --i) {
            var stack = nodes[i].stack;

            if (stackToIndex[stack] === undefined) {
              stackToIndex[stack] = i;
            }
          }

          for (var i = 0; i < length; ++i) {
            var currentStack = nodes[i].stack;
            var index = stackToIndex[currentStack];

            if (index !== undefined && index !== i) {
              if (index > 0) {
                nodes[index - 1]._parent = undefined;
                nodes[index - 1]._length = 1;
              }

              nodes[i]._parent = undefined;
              nodes[i]._length = 1;
              var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;

              if (index < length - 1) {
                cycleEdgeNode._parent = nodes[index + 1];

                cycleEdgeNode._parent.uncycle();

                cycleEdgeNode._length = cycleEdgeNode._parent._length + 1;
              } else {
                cycleEdgeNode._parent = undefined;
                cycleEdgeNode._length = 1;
              }

              var currentChildLength = cycleEdgeNode._length + 1;

              for (var j = i - 2; j >= 0; --j) {
                nodes[j]._length = currentChildLength;
                currentChildLength++;
              }

              return;
            }
          }
        };

        CapturedTrace.prototype.attachExtraTrace = function (error) {
          if (error.__stackCleaned__) return;
          this.uncycle();
          var parsed = parseStackAndMessage(error);
          var message = parsed.message;
          var stacks = [parsed.stack];
          var trace = this;

          while (trace !== undefined) {
            stacks.push(cleanStack(trace.stack.split("\n")));
            trace = trace._parent;
          }

          removeCommonRoots(stacks);
          removeDuplicateOrEmptyJumps(stacks);
          util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
          util.notEnumerableProp(error, "__stackCleaned__", true);
        };

        var captureStackTrace = function stackDetection() {
          var v8stackFramePattern = /^\s*at\s*/;

          var v8stackFormatter = function v8stackFormatter(stack, error) {
            if (typeof stack === "string") return stack;

            if (error.name !== undefined && error.message !== undefined) {
              return error.toString();
            }

            return formatNonError(error);
          };

          if (typeof Error.stackTraceLimit === "number" && typeof Error.captureStackTrace === "function") {
            Error.stackTraceLimit += 6;
            stackFramePattern = v8stackFramePattern;
            formatStack = v8stackFormatter;
            var captureStackTrace = Error.captureStackTrace;

            shouldIgnore = function shouldIgnore(line) {
              return bluebirdFramePattern.test(line);
            };

            return function (receiver, ignoreUntil) {
              Error.stackTraceLimit += 6;
              captureStackTrace(receiver, ignoreUntil);
              Error.stackTraceLimit -= 6;
            };
          }

          var err = new Error();

          if (typeof err.stack === "string" && err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
            stackFramePattern = /@/;
            formatStack = v8stackFormatter;
            indentStackFrames = true;
            return function captureStackTrace(o) {
              o.stack = new Error().stack;
            };
          }

          var hasStackAfterThrow;

          try {
            throw new Error();
          } catch (e) {
            hasStackAfterThrow = "stack" in e;
          }

          if (!("stack" in err) && hasStackAfterThrow && typeof Error.stackTraceLimit === "number") {
            stackFramePattern = v8stackFramePattern;
            formatStack = v8stackFormatter;
            return function captureStackTrace(o) {
              Error.stackTraceLimit += 6;

              try {
                throw new Error();
              } catch (e) {
                o.stack = e.stack;
              }

              Error.stackTraceLimit -= 6;
            };
          }

          formatStack = function formatStack(stack, error) {
            if (typeof stack === "string") return stack;

            if ((_typeof(error) === "object" || typeof error === "function") && error.name !== undefined && error.message !== undefined) {
              return error.toString();
            }

            return formatNonError(error);
          };

          return null;
        }([]);

        if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
          printWarning = function printWarning(message) {
            console.warn(message);
          };

          if (util.isNode && process.stderr.isTTY) {
            printWarning = function printWarning(message, isSoft) {
              var color = isSoft ? "\x1B[33m" : "\x1B[31m";
              console.warn(color + message + "\x1B[0m\n");
            };
          } else if (!util.isNode && typeof new Error().stack === "string") {
            printWarning = function printWarning(message, isSoft) {
              console.warn("%c" + message, isSoft ? "color: darkorange" : "color: red");
            };
          }
        }

        var config = {
          warnings: warnings,
          longStackTraces: false,
          cancellation: false,
          monitoring: false,
          asyncHooks: false
        };
        if (longStackTraces) Promise.longStackTraces();
        return {
          asyncHooks: function asyncHooks() {
            return config.asyncHooks;
          },
          longStackTraces: function longStackTraces() {
            return config.longStackTraces;
          },
          warnings: function warnings() {
            return config.warnings;
          },
          cancellation: function cancellation() {
            return config.cancellation;
          },
          monitoring: function monitoring() {
            return config.monitoring;
          },
          propagateFromFunction: function propagateFromFunction() {
            return _propagateFromFunction;
          },
          boundValueFunction: function boundValueFunction() {
            return _boundValueFunction;
          },
          checkForgottenReturns: checkForgottenReturns,
          setBounds: setBounds,
          warn: warn,
          deprecated: deprecated,
          CapturedTrace: CapturedTrace,
          fireDomEvent: fireDomEvent,
          fireGlobalEvent: fireGlobalEvent
        };
      };
    }, {
      "./errors": 9,
      "./es5": 10,
      "./util": 21
    }],
    8: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise) {
        function returner() {
          return this.value;
        }

        function thrower() {
          throw this.reason;
        }

        Promise.prototype["return"] = Promise.prototype.thenReturn = function (value) {
          if (value instanceof Promise) value.suppressUnhandledRejections();
          return this._then(returner, undefined, undefined, {
            value: value
          }, undefined);
        };

        Promise.prototype["throw"] = Promise.prototype.thenThrow = function (reason) {
          return this._then(thrower, undefined, undefined, {
            reason: reason
          }, undefined);
        };

        Promise.prototype.catchThrow = function (reason) {
          if (arguments.length <= 1) {
            return this._then(undefined, thrower, undefined, {
              reason: reason
            }, undefined);
          } else {
            var _reason = arguments[1];

            var handler = function handler() {
              throw _reason;
            };

            return this.caught(reason, handler);
          }
        };

        Promise.prototype.catchReturn = function (value) {
          if (arguments.length <= 1) {
            if (value instanceof Promise) value.suppressUnhandledRejections();
            return this._then(undefined, returner, undefined, {
              value: value
            }, undefined);
          } else {
            var _value = arguments[1];
            if (_value instanceof Promise) _value.suppressUnhandledRejections();

            var handler = function handler() {
              return _value;
            };

            return this.caught(value, handler);
          }
        };
      };
    }, {}],
    9: [function (_dereq_, module, exports) {
      "use strict";

      var es5 = _dereq_("./es5");

      var Objectfreeze = es5.freeze;

      var util = _dereq_("./util");

      var inherits = util.inherits;
      var notEnumerableProp = util.notEnumerableProp;

      function subError(nameProperty, defaultMessage) {
        function SubError(message) {
          if (!(this instanceof SubError)) return new SubError(message);
          notEnumerableProp(this, "message", typeof message === "string" ? message : defaultMessage);
          notEnumerableProp(this, "name", nameProperty);

          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          } else {
            Error.call(this);
          }
        }

        inherits(SubError, Error);
        return SubError;
      }

      var _TypeError, _RangeError;

      var Warning = subError("Warning", "warning");
      var CancellationError = subError("CancellationError", "cancellation error");
      var TimeoutError = subError("TimeoutError", "timeout error");
      var AggregateError = subError("AggregateError", "aggregate error");

      try {
        _TypeError = TypeError;
        _RangeError = RangeError;
      } catch (e) {
        _TypeError = subError("TypeError", "type error");
        _RangeError = subError("RangeError", "range error");
      }

      var methods = ("join pop push shift unshift slice filter forEach some " + "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

      for (var i = 0; i < methods.length; ++i) {
        if (typeof Array.prototype[methods[i]] === "function") {
          AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
        }
      }

      es5.defineProperty(AggregateError.prototype, "length", {
        value: 0,
        configurable: false,
        writable: true,
        enumerable: true
      });
      AggregateError.prototype["isOperational"] = true;
      var level = 0;

      AggregateError.prototype.toString = function () {
        var indent = Array(level * 4 + 1).join(" ");
        var ret = "\n" + indent + "AggregateError of:" + "\n";
        level++;
        indent = Array(level * 4 + 1).join(" ");

        for (var i = 0; i < this.length; ++i) {
          var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
          var lines = str.split("\n");

          for (var j = 0; j < lines.length; ++j) {
            lines[j] = indent + lines[j];
          }

          str = lines.join("\n");
          ret += str + "\n";
        }

        level--;
        return ret;
      };

      function OperationalError(message) {
        if (!(this instanceof OperationalError)) return new OperationalError(message);
        notEnumerableProp(this, "name", "OperationalError");
        notEnumerableProp(this, "message", message);
        this.cause = message;
        this["isOperational"] = true;

        if (message instanceof Error) {
          notEnumerableProp(this, "message", message.message);
          notEnumerableProp(this, "stack", message.stack);
        } else if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
      }

      inherits(OperationalError, Error);
      var errorTypes = Error["__BluebirdErrorTypes__"];

      if (!errorTypes) {
        errorTypes = Objectfreeze({
          CancellationError: CancellationError,
          TimeoutError: TimeoutError,
          OperationalError: OperationalError,
          RejectionError: OperationalError,
          AggregateError: AggregateError
        });
        es5.defineProperty(Error, "__BluebirdErrorTypes__", {
          value: errorTypes,
          writable: false,
          enumerable: false,
          configurable: false
        });
      }

      module.exports = {
        Error: Error,
        TypeError: _TypeError,
        RangeError: _RangeError,
        CancellationError: errorTypes.CancellationError,
        OperationalError: errorTypes.OperationalError,
        TimeoutError: errorTypes.TimeoutError,
        AggregateError: errorTypes.AggregateError,
        Warning: Warning
      };
    }, {
      "./es5": 10,
      "./util": 21
    }],
    10: [function (_dereq_, module, exports) {
      var isES5 = function () {
        "use strict";

        return this === undefined;
      }();

      if (isES5) {
        module.exports = {
          freeze: Object.freeze,
          defineProperty: Object.defineProperty,
          getDescriptor: Object.getOwnPropertyDescriptor,
          keys: Object.keys,
          names: Object.getOwnPropertyNames,
          getPrototypeOf: Object.getPrototypeOf,
          isArray: Array.isArray,
          isES5: isES5,
          propertyIsWritable: function propertyIsWritable(obj, prop) {
            var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
            return !!(!descriptor || descriptor.writable || descriptor.set);
          }
        };
      } else {
        var has = {}.hasOwnProperty;
        var str = {}.toString;
        var proto = {}.constructor.prototype;

        var ObjectKeys = function ObjectKeys(o) {
          var ret = [];

          for (var key in o) {
            if (has.call(o, key)) {
              ret.push(key);
            }
          }

          return ret;
        };

        var ObjectGetDescriptor = function ObjectGetDescriptor(o, key) {
          return {
            value: o[key]
          };
        };

        var ObjectDefineProperty = function ObjectDefineProperty(o, key, desc) {
          o[key] = desc.value;
          return o;
        };

        var ObjectFreeze = function ObjectFreeze(obj) {
          return obj;
        };

        var ObjectGetPrototypeOf = function ObjectGetPrototypeOf(obj) {
          try {
            return Object(obj).constructor.prototype;
          } catch (e) {
            return proto;
          }
        };

        var ArrayIsArray = function ArrayIsArray(obj) {
          try {
            return str.call(obj) === "[object Array]";
          } catch (e) {
            return false;
          }
        };

        module.exports = {
          isArray: ArrayIsArray,
          keys: ObjectKeys,
          names: ObjectKeys,
          defineProperty: ObjectDefineProperty,
          getDescriptor: ObjectGetDescriptor,
          freeze: ObjectFreeze,
          getPrototypeOf: ObjectGetPrototypeOf,
          isES5: isES5,
          propertyIsWritable: function propertyIsWritable() {
            return true;
          }
        };
      }
    }, {}],
    11: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, tryConvertToPromise, NEXT_FILTER) {
        var util = _dereq_("./util");

        var CancellationError = Promise.CancellationError;
        var errorObj = util.errorObj;

        var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);

        function PassThroughHandlerContext(promise, type, handler) {
          this.promise = promise;
          this.type = type;
          this.handler = handler;
          this.called = false;
          this.cancelPromise = null;
        }

        PassThroughHandlerContext.prototype.isFinallyHandler = function () {
          return this.type === 0;
        };

        function FinallyHandlerCancelReaction(finallyHandler) {
          this.finallyHandler = finallyHandler;
        }

        FinallyHandlerCancelReaction.prototype._resultCancelled = function () {
          checkCancel(this.finallyHandler);
        };

        function checkCancel(ctx, reason) {
          if (ctx.cancelPromise != null) {
            if (arguments.length > 1) {
              ctx.cancelPromise._reject(reason);
            } else {
              ctx.cancelPromise._cancel();
            }

            ctx.cancelPromise = null;
            return true;
          }

          return false;
        }

        function succeed() {
          return finallyHandler.call(this, this.promise._target()._settledValue());
        }

        function fail(reason) {
          if (checkCancel(this, reason)) return;
          errorObj.e = reason;
          return errorObj;
        }

        function finallyHandler(reasonOrValue) {
          var promise = this.promise;
          var handler = this.handler;

          if (!this.called) {
            this.called = true;
            var ret = this.isFinallyHandler() ? handler.call(promise._boundValue()) : handler.call(promise._boundValue(), reasonOrValue);

            if (ret === NEXT_FILTER) {
              return ret;
            } else if (ret !== undefined) {
              promise._setReturnedNonUndefined();

              var maybePromise = tryConvertToPromise(ret, promise);

              if (maybePromise instanceof Promise) {
                if (this.cancelPromise != null) {
                  if (maybePromise._isCancelled()) {
                    var reason = new CancellationError("late cancellation observer");

                    promise._attachExtraTrace(reason);

                    errorObj.e = reason;
                    return errorObj;
                  } else if (maybePromise.isPending()) {
                    maybePromise._attachCancellationCallback(new FinallyHandlerCancelReaction(this));
                  }
                }

                return maybePromise._then(succeed, fail, undefined, this, undefined);
              }
            }
          }

          if (promise.isRejected()) {
            checkCancel(this);
            errorObj.e = reasonOrValue;
            return errorObj;
          } else {
            checkCancel(this);
            return reasonOrValue;
          }
        }

        Promise.prototype._passThrough = function (handler, type, success, fail) {
          if (typeof handler !== "function") return this.then();
          return this._then(success, fail, undefined, new PassThroughHandlerContext(this, type, handler), undefined);
        };

        Promise.prototype.lastly = Promise.prototype["finally"] = function (handler) {
          return this._passThrough(handler, 0, finallyHandler, finallyHandler);
        };

        Promise.prototype.tap = function (handler) {
          return this._passThrough(handler, 1, finallyHandler);
        };

        Promise.prototype.tapCatch = function (handlerOrPredicate) {
          var len = arguments.length;

          if (len === 1) {
            return this._passThrough(handlerOrPredicate, 1, undefined, finallyHandler);
          } else {
            var catchInstances = new Array(len - 1),
                j = 0,
                i;

            for (i = 0; i < len - 1; ++i) {
              var item = arguments[i];

              if (util.isObject(item)) {
                catchInstances[j++] = item;
              } else {
                return Promise.reject(new TypeError("tapCatch statement predicate: " + "expecting an object but got " + util.classString(item)));
              }
            }

            catchInstances.length = j;
            var handler = arguments[i];
            return this._passThrough(catchFilter(catchInstances, handler, this), 1, undefined, finallyHandler);
          }
        };

        return PassThroughHandlerContext;
      };
    }, {
      "./catch_filter": 5,
      "./util": 21
    }],
    12: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, PromiseArray, tryConvertToPromise, INTERNAL, async) {
        var util = _dereq_("./util");

        var canEvaluate = util.canEvaluate;
        var tryCatch = util.tryCatch;
        var errorObj = util.errorObj;
        var reject;

        if (false) { var i, promiseSetters, thenCallbacks, holderClasses, generateHolderClass, promiseSetter, thenCallback; }

        Promise.join = function () {
          var last = arguments.length - 1;
          var fn;

          if (last > 0 && typeof arguments[last] === "function") {
            fn = arguments[last];

            if (false) { var context, bitField, maybePromise, i, callbacks, holder, HolderClass, ret; }
          }

          var args = [].slice.call(arguments);
          ;
          if (fn) args.pop();
          var ret = new PromiseArray(args).promise();
          return fn !== undefined ? ret.spread(fn) : ret;
        };
      };
    }, {
      "./util": 21
    }],
    13: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
        var util = _dereq_("./util");

        var tryCatch = util.tryCatch;

        Promise.method = function (fn) {
          if (typeof fn !== "function") {
            throw new Promise.TypeError("expecting a function but got " + util.classString(fn));
          }

          return function () {
            var ret = new Promise(INTERNAL);

            ret._captureStackTrace();

            ret._pushContext();

            var value = tryCatch(fn).apply(this, arguments);

            var promiseCreated = ret._popContext();

            debug.checkForgottenReturns(value, promiseCreated, "Promise.method", ret);

            ret._resolveFromSyncValue(value);

            return ret;
          };
        };

        Promise.attempt = Promise["try"] = function (fn) {
          if (typeof fn !== "function") {
            return apiRejection("expecting a function but got " + util.classString(fn));
          }

          var ret = new Promise(INTERNAL);

          ret._captureStackTrace();

          ret._pushContext();

          var value;

          if (arguments.length > 1) {
            debug.deprecated("calling Promise.try with more than 1 argument");
            var arg = arguments[1];
            var ctx = arguments[2];
            value = util.isArray(arg) ? tryCatch(fn).apply(ctx, arg) : tryCatch(fn).call(ctx, arg);
          } else {
            value = tryCatch(fn)();
          }

          var promiseCreated = ret._popContext();

          debug.checkForgottenReturns(value, promiseCreated, "Promise.try", ret);

          ret._resolveFromSyncValue(value);

          return ret;
        };

        Promise.prototype._resolveFromSyncValue = function (value) {
          if (value === util.errorObj) {
            this._rejectCallback(value.e, false);
          } else {
            this._resolveCallback(value, true);
          }
        };
      };
    }, {
      "./util": 21
    }],
    14: [function (_dereq_, module, exports) {
      "use strict";

      var util = _dereq_("./util");

      var maybeWrapAsError = util.maybeWrapAsError;

      var errors = _dereq_("./errors");

      var OperationalError = errors.OperationalError;

      var es5 = _dereq_("./es5");

      function isUntypedError(obj) {
        return obj instanceof Error && es5.getPrototypeOf(obj) === Error.prototype;
      }

      var rErrorKey = /^(?:name|message|stack|cause)$/;

      function wrapAsOperationalError(obj) {
        var ret;

        if (isUntypedError(obj)) {
          ret = new OperationalError(obj);
          ret.name = obj.name;
          ret.message = obj.message;
          ret.stack = obj.stack;
          var keys = es5.keys(obj);

          for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];

            if (!rErrorKey.test(key)) {
              ret[key] = obj[key];
            }
          }

          return ret;
        }

        util.markAsOriginatingFromRejection(obj);
        return obj;
      }

      function nodebackForPromise(promise, multiArgs) {
        return function (err, value) {
          if (promise === null) return;

          if (err) {
            var wrapped = wrapAsOperationalError(maybeWrapAsError(err));

            promise._attachExtraTrace(wrapped);

            promise._reject(wrapped);
          } else if (!multiArgs) {
            promise._fulfill(value);
          } else {
            var args = [].slice.call(arguments, 1);
            ;

            promise._fulfill(args);
          }

          promise = null;
        };
      }

      module.exports = nodebackForPromise;
    }, {
      "./errors": 9,
      "./es5": 10,
      "./util": 21
    }],
    15: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function () {
        var makeSelfResolutionError = function makeSelfResolutionError() {
          return new TypeError("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n");
        };

        var reflectHandler = function reflectHandler() {
          return new Promise.PromiseInspection(this._target());
        };

        var apiRejection = function apiRejection(msg) {
          return Promise.reject(new TypeError(msg));
        };

        function Proxyable() {}

        var UNDEFINED_BINDING = {};

        var util = _dereq_("./util");

        util.setReflectHandler(reflectHandler);

        var getDomain = function getDomain() {
          var domain = process.domain;

          if (domain === undefined) {
            return null;
          }

          return domain;
        };

        var getContextDefault = function getContextDefault() {
          return null;
        };

        var getContextDomain = function getContextDomain() {
          return {
            domain: getDomain(),
            async: null
          };
        };

        var AsyncResource = util.isNode && util.nodeSupportsAsyncResource ? _dereq_("async_hooks").AsyncResource : null;

        var getContextAsyncHooks = function getContextAsyncHooks() {
          return {
            domain: getDomain(),
            async: new AsyncResource("Bluebird::Promise")
          };
        };

        var getContext = util.isNode ? getContextDomain : getContextDefault;
        util.notEnumerableProp(Promise, "_getContext", getContext);

        var enableAsyncHooks = function enableAsyncHooks() {
          getContext = getContextAsyncHooks;
          util.notEnumerableProp(Promise, "_getContext", getContextAsyncHooks);
        };

        var disableAsyncHooks = function disableAsyncHooks() {
          getContext = getContextDomain;
          util.notEnumerableProp(Promise, "_getContext", getContextDomain);
        };

        var es5 = _dereq_("./es5");

        var Async = _dereq_("./async");

        var async = new Async();
        es5.defineProperty(Promise, "_async", {
          value: async
        });

        var errors = _dereq_("./errors");

        var TypeError = Promise.TypeError = errors.TypeError;
        Promise.RangeError = errors.RangeError;
        var CancellationError = Promise.CancellationError = errors.CancellationError;
        Promise.TimeoutError = errors.TimeoutError;
        Promise.OperationalError = errors.OperationalError;
        Promise.RejectionError = errors.OperationalError;
        Promise.AggregateError = errors.AggregateError;

        var INTERNAL = function INTERNAL() {};

        var APPLY = {};
        var NEXT_FILTER = {};

        var tryConvertToPromise = _dereq_("./thenables")(Promise, INTERNAL);

        var PromiseArray = _dereq_("./promise_array")(Promise, INTERNAL, tryConvertToPromise, apiRejection, Proxyable);

        var Context = _dereq_("./context")(Promise);
        /*jshint unused:false*/


        var createContext = Context.create;

        var debug = _dereq_("./debuggability")(Promise, Context, enableAsyncHooks, disableAsyncHooks);

        var CapturedTrace = debug.CapturedTrace;

        var PassThroughHandlerContext = _dereq_("./finally")(Promise, tryConvertToPromise, NEXT_FILTER);

        var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);

        var nodebackForPromise = _dereq_("./nodeback");

        var errorObj = util.errorObj;
        var tryCatch = util.tryCatch;

        function check(self, executor) {
          if (self == null || self.constructor !== Promise) {
            throw new TypeError("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");
          }

          if (typeof executor !== "function") {
            throw new TypeError("expecting a function but got " + util.classString(executor));
          }
        }

        function Promise(executor) {
          if (executor !== INTERNAL) {
            check(this, executor);
          }

          this._bitField = 0;
          this._fulfillmentHandler0 = undefined;
          this._rejectionHandler0 = undefined;
          this._promise0 = undefined;
          this._receiver0 = undefined;

          this._resolveFromExecutor(executor);

          this._promiseCreated();

          this._fireEvent("promiseCreated", this);
        }

        Promise.prototype.toString = function () {
          return "[object Promise]";
        };

        Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
          var len = arguments.length;

          if (len > 1) {
            var catchInstances = new Array(len - 1),
                j = 0,
                i;

            for (i = 0; i < len - 1; ++i) {
              var item = arguments[i];

              if (util.isObject(item)) {
                catchInstances[j++] = item;
              } else {
                return apiRejection("Catch statement predicate: " + "expecting an object but got " + util.classString(item));
              }
            }

            catchInstances.length = j;
            fn = arguments[i];

            if (typeof fn !== "function") {
              throw new TypeError("The last argument to .catch() " + "must be a function, got " + util.toString(fn));
            }

            return this.then(undefined, catchFilter(catchInstances, fn, this));
          }

          return this.then(undefined, fn);
        };

        Promise.prototype.reflect = function () {
          return this._then(reflectHandler, reflectHandler, undefined, this, undefined);
        };

        Promise.prototype.then = function (didFulfill, didReject) {
          if (debug.warnings() && arguments.length > 0 && typeof didFulfill !== "function" && typeof didReject !== "function") {
            var msg = ".then() only accepts functions but was passed: " + util.classString(didFulfill);

            if (arguments.length > 1) {
              msg += ", " + util.classString(didReject);
            }

            this._warn(msg);
          }

          return this._then(didFulfill, didReject, undefined, undefined, undefined);
        };

        Promise.prototype.done = function (didFulfill, didReject) {
          var promise = this._then(didFulfill, didReject, undefined, undefined, undefined);

          promise._setIsFinal();
        };

        Promise.prototype.spread = function (fn) {
          if (typeof fn !== "function") {
            return apiRejection("expecting a function but got " + util.classString(fn));
          }

          return this.all()._then(fn, undefined, undefined, APPLY, undefined);
        };

        Promise.prototype.toJSON = function () {
          var ret = {
            isFulfilled: false,
            isRejected: false,
            fulfillmentValue: undefined,
            rejectionReason: undefined
          };

          if (this.isFulfilled()) {
            ret.fulfillmentValue = this.value();
            ret.isFulfilled = true;
          } else if (this.isRejected()) {
            ret.rejectionReason = this.reason();
            ret.isRejected = true;
          }

          return ret;
        };

        Promise.prototype.all = function () {
          if (arguments.length > 0) {
            this._warn(".all() was passed arguments but it does not take any");
          }

          return new PromiseArray(this).promise();
        };

        Promise.prototype.error = function (fn) {
          return this.caught(util.originatesFromRejection, fn);
        };

        Promise.getNewLibraryCopy = module.exports;

        Promise.is = function (val) {
          return val instanceof Promise;
        };

        Promise.fromNode = Promise.fromCallback = function (fn) {
          var ret = new Promise(INTERNAL);

          ret._captureStackTrace();

          var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs : false;
          var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));

          if (result === errorObj) {
            ret._rejectCallback(result.e, true);
          }

          if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
          return ret;
        };

        Promise.all = function (promises) {
          return new PromiseArray(promises).promise();
        };

        Promise.cast = function (obj) {
          var ret = tryConvertToPromise(obj);

          if (!(ret instanceof Promise)) {
            ret = new Promise(INTERNAL);

            ret._captureStackTrace();

            ret._setFulfilled();

            ret._rejectionHandler0 = obj;
          }

          return ret;
        };

        Promise.resolve = Promise.fulfilled = Promise.cast;

        Promise.reject = Promise.rejected = function (reason) {
          var ret = new Promise(INTERNAL);

          ret._captureStackTrace();

          ret._rejectCallback(reason, true);

          return ret;
        };

        Promise.setScheduler = function (fn) {
          if (typeof fn !== "function") {
            throw new TypeError("expecting a function but got " + util.classString(fn));
          }

          return async.setScheduler(fn);
        };

        Promise.prototype._then = function (didFulfill, didReject, _, receiver, internalData) {
          var haveInternalData = internalData !== undefined;
          var promise = haveInternalData ? internalData : new Promise(INTERNAL);

          var target = this._target();

          var bitField = target._bitField;

          if (!haveInternalData) {
            promise._propagateFrom(this, 3);

            promise._captureStackTrace();

            if (receiver === undefined && (this._bitField & 2097152) !== 0) {
              if (!((bitField & 50397184) === 0)) {
                receiver = this._boundValue();
              } else {
                receiver = target === this ? undefined : this._boundTo;
              }
            }

            this._fireEvent("promiseChained", this, promise);
          }

          var context = getContext();

          if (!((bitField & 50397184) === 0)) {
            var handler,
                value,
                settler = target._settlePromiseCtx;

            if ((bitField & 33554432) !== 0) {
              value = target._rejectionHandler0;
              handler = didFulfill;
            } else if ((bitField & 16777216) !== 0) {
              value = target._fulfillmentHandler0;
              handler = didReject;

              target._unsetRejectionIsUnhandled();
            } else {
              settler = target._settlePromiseLateCancellationObserver;
              value = new CancellationError("late cancellation observer");

              target._attachExtraTrace(value);

              handler = didReject;
            }

            async.invoke(settler, target, {
              handler: util.contextBind(context, handler),
              promise: promise,
              receiver: receiver,
              value: value
            });
          } else {
            target._addCallbacks(didFulfill, didReject, promise, receiver, context);
          }

          return promise;
        };

        Promise.prototype._length = function () {
          return this._bitField & 65535;
        };

        Promise.prototype._isFateSealed = function () {
          return (this._bitField & 117506048) !== 0;
        };

        Promise.prototype._isFollowing = function () {
          return (this._bitField & 67108864) === 67108864;
        };

        Promise.prototype._setLength = function (len) {
          this._bitField = this._bitField & -65536 | len & 65535;
        };

        Promise.prototype._setFulfilled = function () {
          this._bitField = this._bitField | 33554432;

          this._fireEvent("promiseFulfilled", this);
        };

        Promise.prototype._setRejected = function () {
          this._bitField = this._bitField | 16777216;

          this._fireEvent("promiseRejected", this);
        };

        Promise.prototype._setFollowing = function () {
          this._bitField = this._bitField | 67108864;

          this._fireEvent("promiseResolved", this);
        };

        Promise.prototype._setIsFinal = function () {
          this._bitField = this._bitField | 4194304;
        };

        Promise.prototype._isFinal = function () {
          return (this._bitField & 4194304) > 0;
        };

        Promise.prototype._unsetCancelled = function () {
          this._bitField = this._bitField & ~65536;
        };

        Promise.prototype._setCancelled = function () {
          this._bitField = this._bitField | 65536;

          this._fireEvent("promiseCancelled", this);
        };

        Promise.prototype._setWillBeCancelled = function () {
          this._bitField = this._bitField | 8388608;
        };

        Promise.prototype._setAsyncGuaranteed = function () {
          if (async.hasCustomScheduler()) return;
          var bitField = this._bitField;
          this._bitField = bitField | (bitField & 536870912) >> 2 ^ 134217728;
        };

        Promise.prototype._setNoAsyncGuarantee = function () {
          this._bitField = (this._bitField | 536870912) & ~134217728;
        };

        Promise.prototype._receiverAt = function (index) {
          var ret = index === 0 ? this._receiver0 : this[index * 4 - 4 + 3];

          if (ret === UNDEFINED_BINDING) {
            return undefined;
          } else if (ret === undefined && this._isBound()) {
            return this._boundValue();
          }

          return ret;
        };

        Promise.prototype._promiseAt = function (index) {
          return this[index * 4 - 4 + 2];
        };

        Promise.prototype._fulfillmentHandlerAt = function (index) {
          return this[index * 4 - 4 + 0];
        };

        Promise.prototype._rejectionHandlerAt = function (index) {
          return this[index * 4 - 4 + 1];
        };

        Promise.prototype._boundValue = function () {};

        Promise.prototype._migrateCallback0 = function (follower) {
          var bitField = follower._bitField;
          var fulfill = follower._fulfillmentHandler0;
          var reject = follower._rejectionHandler0;
          var promise = follower._promise0;

          var receiver = follower._receiverAt(0);

          if (receiver === undefined) receiver = UNDEFINED_BINDING;

          this._addCallbacks(fulfill, reject, promise, receiver, null);
        };

        Promise.prototype._migrateCallbackAt = function (follower, index) {
          var fulfill = follower._fulfillmentHandlerAt(index);

          var reject = follower._rejectionHandlerAt(index);

          var promise = follower._promiseAt(index);

          var receiver = follower._receiverAt(index);

          if (receiver === undefined) receiver = UNDEFINED_BINDING;

          this._addCallbacks(fulfill, reject, promise, receiver, null);
        };

        Promise.prototype._addCallbacks = function (fulfill, reject, promise, receiver, context) {
          var index = this._length();

          if (index >= 65535 - 4) {
            index = 0;

            this._setLength(0);
          }

          if (index === 0) {
            this._promise0 = promise;
            this._receiver0 = receiver;

            if (typeof fulfill === "function") {
              this._fulfillmentHandler0 = util.contextBind(context, fulfill);
            }

            if (typeof reject === "function") {
              this._rejectionHandler0 = util.contextBind(context, reject);
            }
          } else {
            var base = index * 4 - 4;
            this[base + 2] = promise;
            this[base + 3] = receiver;

            if (typeof fulfill === "function") {
              this[base + 0] = util.contextBind(context, fulfill);
            }

            if (typeof reject === "function") {
              this[base + 1] = util.contextBind(context, reject);
            }
          }

          this._setLength(index + 1);

          return index;
        };

        Promise.prototype._proxy = function (proxyable, arg) {
          this._addCallbacks(undefined, undefined, arg, proxyable, null);
        };

        Promise.prototype._resolveCallback = function (value, shouldBind) {
          if ((this._bitField & 117506048) !== 0) return;
          if (value === this) return this._rejectCallback(makeSelfResolutionError(), false);
          var maybePromise = tryConvertToPromise(value, this);
          if (!(maybePromise instanceof Promise)) return this._fulfill(value);
          if (shouldBind) this._propagateFrom(maybePromise, 2);

          var promise = maybePromise._target();

          if (promise === this) {
            this._reject(makeSelfResolutionError());

            return;
          }

          var bitField = promise._bitField;

          if ((bitField & 50397184) === 0) {
            var len = this._length();

            if (len > 0) promise._migrateCallback0(this);

            for (var i = 1; i < len; ++i) {
              promise._migrateCallbackAt(this, i);
            }

            this._setFollowing();

            this._setLength(0);

            this._setFollowee(maybePromise);
          } else if ((bitField & 33554432) !== 0) {
            this._fulfill(promise._value());
          } else if ((bitField & 16777216) !== 0) {
            this._reject(promise._reason());
          } else {
            var reason = new CancellationError("late cancellation observer");

            promise._attachExtraTrace(reason);

            this._reject(reason);
          }
        };

        Promise.prototype._rejectCallback = function (reason, synchronous, ignoreNonErrorWarnings) {
          var trace = util.ensureErrorObject(reason);
          var hasStack = trace === reason;

          if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
            var message = "a promise was rejected with a non-error: " + util.classString(reason);

            this._warn(message, true);
          }

          this._attachExtraTrace(trace, synchronous ? hasStack : false);

          this._reject(reason);
        };

        Promise.prototype._resolveFromExecutor = function (executor) {
          if (executor === INTERNAL) return;
          var promise = this;

          this._captureStackTrace();

          this._pushContext();

          var synchronous = true;

          var r = this._execute(executor, function (value) {
            promise._resolveCallback(value);
          }, function (reason) {
            promise._rejectCallback(reason, synchronous);
          });

          synchronous = false;

          this._popContext();

          if (r !== undefined) {
            promise._rejectCallback(r, true);
          }
        };

        Promise.prototype._settlePromiseFromHandler = function (handler, receiver, value, promise) {
          var bitField = promise._bitField;
          if ((bitField & 65536) !== 0) return;

          promise._pushContext();

          var x;

          if (receiver === APPLY) {
            if (!value || typeof value.length !== "number") {
              x = errorObj;
              x.e = new TypeError("cannot .spread() a non-array: " + util.classString(value));
            } else {
              x = tryCatch(handler).apply(this._boundValue(), value);
            }
          } else {
            x = tryCatch(handler).call(receiver, value);
          }

          var promiseCreated = promise._popContext();

          bitField = promise._bitField;
          if ((bitField & 65536) !== 0) return;

          if (x === NEXT_FILTER) {
            promise._reject(value);
          } else if (x === errorObj) {
            promise._rejectCallback(x.e, false);
          } else {
            debug.checkForgottenReturns(x, promiseCreated, "", promise, this);

            promise._resolveCallback(x);
          }
        };

        Promise.prototype._target = function () {
          var ret = this;

          while (ret._isFollowing()) {
            ret = ret._followee();
          }

          return ret;
        };

        Promise.prototype._followee = function () {
          return this._rejectionHandler0;
        };

        Promise.prototype._setFollowee = function (promise) {
          this._rejectionHandler0 = promise;
        };

        Promise.prototype._settlePromise = function (promise, handler, receiver, value) {
          var isPromise = promise instanceof Promise;
          var bitField = this._bitField;
          var asyncGuaranteed = (bitField & 134217728) !== 0;

          if ((bitField & 65536) !== 0) {
            if (isPromise) promise._invokeInternalOnCancel();

            if (receiver instanceof PassThroughHandlerContext && receiver.isFinallyHandler()) {
              receiver.cancelPromise = promise;

              if (tryCatch(handler).call(receiver, value) === errorObj) {
                promise._reject(errorObj.e);
              }
            } else if (handler === reflectHandler) {
              promise._fulfill(reflectHandler.call(receiver));
            } else if (receiver instanceof Proxyable) {
              receiver._promiseCancelled(promise);
            } else if (isPromise || promise instanceof PromiseArray) {
              promise._cancel();
            } else {
              receiver.cancel();
            }
          } else if (typeof handler === "function") {
            if (!isPromise) {
              handler.call(receiver, value, promise);
            } else {
              if (asyncGuaranteed) promise._setAsyncGuaranteed();

              this._settlePromiseFromHandler(handler, receiver, value, promise);
            }
          } else if (receiver instanceof Proxyable) {
            if (!receiver._isResolved()) {
              if ((bitField & 33554432) !== 0) {
                receiver._promiseFulfilled(value, promise);
              } else {
                receiver._promiseRejected(value, promise);
              }
            }
          } else if (isPromise) {
            if (asyncGuaranteed) promise._setAsyncGuaranteed();

            if ((bitField & 33554432) !== 0) {
              promise._fulfill(value);
            } else {
              promise._reject(value);
            }
          }
        };

        Promise.prototype._settlePromiseLateCancellationObserver = function (ctx) {
          var handler = ctx.handler;
          var promise = ctx.promise;
          var receiver = ctx.receiver;
          var value = ctx.value;

          if (typeof handler === "function") {
            if (!(promise instanceof Promise)) {
              handler.call(receiver, value, promise);
            } else {
              this._settlePromiseFromHandler(handler, receiver, value, promise);
            }
          } else if (promise instanceof Promise) {
            promise._reject(value);
          }
        };

        Promise.prototype._settlePromiseCtx = function (ctx) {
          this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
        };

        Promise.prototype._settlePromise0 = function (handler, value, bitField) {
          var promise = this._promise0;

          var receiver = this._receiverAt(0);

          this._promise0 = undefined;
          this._receiver0 = undefined;

          this._settlePromise(promise, handler, receiver, value);
        };

        Promise.prototype._clearCallbackDataAtIndex = function (index) {
          var base = index * 4 - 4;
          this[base + 2] = this[base + 3] = this[base + 0] = this[base + 1] = undefined;
        };

        Promise.prototype._fulfill = function (value) {
          var bitField = this._bitField;
          if ((bitField & 117506048) >>> 16) return;

          if (value === this) {
            var err = makeSelfResolutionError();

            this._attachExtraTrace(err);

            return this._reject(err);
          }

          this._setFulfilled();

          this._rejectionHandler0 = value;

          if ((bitField & 65535) > 0) {
            if ((bitField & 134217728) !== 0) {
              this._settlePromises();
            } else {
              async.settlePromises(this);
            }

            this._dereferenceTrace();
          }
        };

        Promise.prototype._reject = function (reason) {
          var bitField = this._bitField;
          if ((bitField & 117506048) >>> 16) return;

          this._setRejected();

          this._fulfillmentHandler0 = reason;

          if (this._isFinal()) {
            return async.fatalError(reason, util.isNode);
          }

          if ((bitField & 65535) > 0) {
            async.settlePromises(this);
          } else {
            this._ensurePossibleRejectionHandled();
          }
        };

        Promise.prototype._fulfillPromises = function (len, value) {
          for (var i = 1; i < len; i++) {
            var handler = this._fulfillmentHandlerAt(i);

            var promise = this._promiseAt(i);

            var receiver = this._receiverAt(i);

            this._clearCallbackDataAtIndex(i);

            this._settlePromise(promise, handler, receiver, value);
          }
        };

        Promise.prototype._rejectPromises = function (len, reason) {
          for (var i = 1; i < len; i++) {
            var handler = this._rejectionHandlerAt(i);

            var promise = this._promiseAt(i);

            var receiver = this._receiverAt(i);

            this._clearCallbackDataAtIndex(i);

            this._settlePromise(promise, handler, receiver, reason);
          }
        };

        Promise.prototype._settlePromises = function () {
          var bitField = this._bitField;
          var len = bitField & 65535;

          if (len > 0) {
            if ((bitField & 16842752) !== 0) {
              var reason = this._fulfillmentHandler0;

              this._settlePromise0(this._rejectionHandler0, reason, bitField);

              this._rejectPromises(len, reason);
            } else {
              var value = this._rejectionHandler0;

              this._settlePromise0(this._fulfillmentHandler0, value, bitField);

              this._fulfillPromises(len, value);
            }

            this._setLength(0);
          }

          this._clearCancellationData();
        };

        Promise.prototype._settledValue = function () {
          var bitField = this._bitField;

          if ((bitField & 33554432) !== 0) {
            return this._rejectionHandler0;
          } else if ((bitField & 16777216) !== 0) {
            return this._fulfillmentHandler0;
          }
        };

        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
          es5.defineProperty(Promise.prototype, Symbol.toStringTag, {
            get: function get() {
              return "Object";
            }
          });
        }

        function deferResolve(v) {
          this.promise._resolveCallback(v);
        }

        function deferReject(v) {
          this.promise._rejectCallback(v, false);
        }

        Promise.defer = Promise.pending = function () {
          debug.deprecated("Promise.defer", "new Promise");
          var promise = new Promise(INTERNAL);
          return {
            promise: promise,
            resolve: deferResolve,
            reject: deferReject
          };
        };

        util.notEnumerableProp(Promise, "_makeSelfResolutionError", makeSelfResolutionError);

        _dereq_("./method")(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug);

        _dereq_("./bind")(Promise, INTERNAL, tryConvertToPromise, debug);

        _dereq_("./cancel")(Promise, PromiseArray, apiRejection, debug);

        _dereq_("./direct_resolve")(Promise);

        _dereq_("./synchronous_inspection")(Promise);

        _dereq_("./join")(Promise, PromiseArray, tryConvertToPromise, INTERNAL, async);

        Promise.Promise = Promise;
        Promise.version = "3.7.2";
        util.toFastProperties(Promise);
        util.toFastProperties(Promise.prototype);

        function fillTypes(value) {
          var p = new Promise(INTERNAL);
          p._fulfillmentHandler0 = value;
          p._rejectionHandler0 = value;
          p._promise0 = value;
          p._receiver0 = value;
        } // Complete slack tracking, opt out of field-type tracking and           
        // stabilize map                                                         


        fillTypes({
          a: 1
        });
        fillTypes({
          b: 2
        });
        fillTypes({
          c: 3
        });
        fillTypes(1);
        fillTypes(function () {});
        fillTypes(undefined);
        fillTypes(false);
        fillTypes(new Promise(INTERNAL));
        debug.setBounds(Async.firstLineError, util.lastLineError);
        return Promise;
      };
    }, {
      "./async": 1,
      "./bind": 2,
      "./cancel": 4,
      "./catch_filter": 5,
      "./context": 6,
      "./debuggability": 7,
      "./direct_resolve": 8,
      "./errors": 9,
      "./es5": 10,
      "./finally": 11,
      "./join": 12,
      "./method": 13,
      "./nodeback": 14,
      "./promise_array": 16,
      "./synchronous_inspection": 19,
      "./thenables": 20,
      "./util": 21,
      "async_hooks": undefined
    }],
    16: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, INTERNAL, tryConvertToPromise, apiRejection, Proxyable) {
        var util = _dereq_("./util");

        var isArray = util.isArray;

        function toResolutionValue(val) {
          switch (val) {
            case -2:
              return [];

            case -3:
              return {};

            case -6:
              return new Map();
          }
        }

        function PromiseArray(values) {
          var promise = this._promise = new Promise(INTERNAL);

          if (values instanceof Promise) {
            promise._propagateFrom(values, 3);

            values.suppressUnhandledRejections();
          }

          promise._setOnCancel(this);

          this._values = values;
          this._length = 0;
          this._totalResolved = 0;

          this._init(undefined, -2);
        }

        util.inherits(PromiseArray, Proxyable);

        PromiseArray.prototype.length = function () {
          return this._length;
        };

        PromiseArray.prototype.promise = function () {
          return this._promise;
        };

        PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
          var values = tryConvertToPromise(this._values, this._promise);

          if (values instanceof Promise) {
            values = values._target();
            var bitField = values._bitField;
            ;
            this._values = values;

            if ((bitField & 50397184) === 0) {
              this._promise._setAsyncGuaranteed();

              return values._then(init, this._reject, undefined, this, resolveValueIfEmpty);
            } else if ((bitField & 33554432) !== 0) {
              values = values._value();
            } else if ((bitField & 16777216) !== 0) {
              return this._reject(values._reason());
            } else {
              return this._cancel();
            }
          }

          values = util.asArray(values);

          if (values === null) {
            var err = apiRejection("expecting an array or an iterable object but got " + util.classString(values)).reason();

            this._promise._rejectCallback(err, false);

            return;
          }

          if (values.length === 0) {
            if (resolveValueIfEmpty === -5) {
              this._resolveEmptyArray();
            } else {
              this._resolve(toResolutionValue(resolveValueIfEmpty));
            }

            return;
          }

          this._iterate(values);
        };

        PromiseArray.prototype._iterate = function (values) {
          var len = this.getActualLength(values.length);
          this._length = len;
          this._values = this.shouldCopyValues() ? new Array(len) : this._values;
          var result = this._promise;
          var isResolved = false;
          var bitField = null;

          for (var i = 0; i < len; ++i) {
            var maybePromise = tryConvertToPromise(values[i], result);

            if (maybePromise instanceof Promise) {
              maybePromise = maybePromise._target();
              bitField = maybePromise._bitField;
            } else {
              bitField = null;
            }

            if (isResolved) {
              if (bitField !== null) {
                maybePromise.suppressUnhandledRejections();
              }
            } else if (bitField !== null) {
              if ((bitField & 50397184) === 0) {
                maybePromise._proxy(this, i);

                this._values[i] = maybePromise;
              } else if ((bitField & 33554432) !== 0) {
                isResolved = this._promiseFulfilled(maybePromise._value(), i);
              } else if ((bitField & 16777216) !== 0) {
                isResolved = this._promiseRejected(maybePromise._reason(), i);
              } else {
                isResolved = this._promiseCancelled(i);
              }
            } else {
              isResolved = this._promiseFulfilled(maybePromise, i);
            }
          }

          if (!isResolved) result._setAsyncGuaranteed();
        };

        PromiseArray.prototype._isResolved = function () {
          return this._values === null;
        };

        PromiseArray.prototype._resolve = function (value) {
          this._values = null;

          this._promise._fulfill(value);
        };

        PromiseArray.prototype._cancel = function () {
          if (this._isResolved() || !this._promise._isCancellable()) return;
          this._values = null;

          this._promise._cancel();
        };

        PromiseArray.prototype._reject = function (reason) {
          this._values = null;

          this._promise._rejectCallback(reason, false);
        };

        PromiseArray.prototype._promiseFulfilled = function (value, index) {
          this._values[index] = value;
          var totalResolved = ++this._totalResolved;

          if (totalResolved >= this._length) {
            this._resolve(this._values);

            return true;
          }

          return false;
        };

        PromiseArray.prototype._promiseCancelled = function () {
          this._cancel();

          return true;
        };

        PromiseArray.prototype._promiseRejected = function (reason) {
          this._totalResolved++;

          this._reject(reason);

          return true;
        };

        PromiseArray.prototype._resultCancelled = function () {
          if (this._isResolved()) return;
          var values = this._values;

          this._cancel();

          if (values instanceof Promise) {
            values.cancel();
          } else {
            for (var i = 0; i < values.length; ++i) {
              if (values[i] instanceof Promise) {
                values[i].cancel();
              }
            }
          }
        };

        PromiseArray.prototype.shouldCopyValues = function () {
          return true;
        };

        PromiseArray.prototype.getActualLength = function (len) {
          return len;
        };

        return PromiseArray;
      };
    }, {
      "./util": 21
    }],
    17: [function (_dereq_, module, exports) {
      "use strict";

      function arrayMove(src, srcIndex, dst, dstIndex, len) {
        for (var j = 0; j < len; ++j) {
          dst[j + dstIndex] = src[j + srcIndex];
          src[j + srcIndex] = void 0;
        }
      }

      function Queue(capacity) {
        this._capacity = capacity;
        this._length = 0;
        this._front = 0;
      }

      Queue.prototype._willBeOverCapacity = function (size) {
        return this._capacity < size;
      };

      Queue.prototype._pushOne = function (arg) {
        var length = this.length();

        this._checkCapacity(length + 1);

        var i = this._front + length & this._capacity - 1;
        this[i] = arg;
        this._length = length + 1;
      };

      Queue.prototype.push = function (fn, receiver, arg) {
        var length = this.length() + 3;

        if (this._willBeOverCapacity(length)) {
          this._pushOne(fn);

          this._pushOne(receiver);

          this._pushOne(arg);

          return;
        }

        var j = this._front + length - 3;

        this._checkCapacity(length);

        var wrapMask = this._capacity - 1;
        this[j + 0 & wrapMask] = fn;
        this[j + 1 & wrapMask] = receiver;
        this[j + 2 & wrapMask] = arg;
        this._length = length;
      };

      Queue.prototype.shift = function () {
        var front = this._front,
            ret = this[front];
        this[front] = undefined;
        this._front = front + 1 & this._capacity - 1;
        this._length--;
        return ret;
      };

      Queue.prototype.length = function () {
        return this._length;
      };

      Queue.prototype._checkCapacity = function (size) {
        if (this._capacity < size) {
          this._resizeTo(this._capacity << 1);
        }
      };

      Queue.prototype._resizeTo = function (capacity) {
        var oldCapacity = this._capacity;
        this._capacity = capacity;
        var front = this._front;
        var length = this._length;
        var moveItemsCount = front + length & oldCapacity - 1;
        arrayMove(this, 0, this, oldCapacity, moveItemsCount);
      };

      module.exports = Queue;
    }, {}],
    18: [function (_dereq_, module, exports) {
      "use strict";

      var util = _dereq_("./util");

      var schedule;

      var noAsyncScheduler = function noAsyncScheduler() {
        throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
      };

      var NativePromise = util.getNativePromise();

      if (util.isNode && typeof MutationObserver === "undefined") {
        var GlobalSetImmediate = global.setImmediate;
        var ProcessNextTick = process.nextTick;
        schedule = util.isRecentNode ? function (fn) {
          GlobalSetImmediate.call(global, fn);
        } : function (fn) {
          ProcessNextTick.call(process, fn);
        };
      } else if (typeof NativePromise === "function" && typeof NativePromise.resolve === "function") {
        var nativePromise = NativePromise.resolve();

        schedule = function schedule(fn) {
          nativePromise.then(fn);
        };
      } else if (typeof MutationObserver !== "undefined" && !(typeof window !== "undefined" && window.navigator && (window.navigator.standalone || window.cordova)) && "classList" in document.documentElement) {
        schedule = function () {
          var div = document.createElement("div");
          var opts = {
            attributes: true
          };
          var toggleScheduled = false;
          var div2 = document.createElement("div");
          var o2 = new MutationObserver(function () {
            div.classList.toggle("foo");
            toggleScheduled = false;
          });
          o2.observe(div2, opts);

          var scheduleToggle = function scheduleToggle() {
            if (toggleScheduled) return;
            toggleScheduled = true;
            div2.classList.toggle("foo");
          };

          return function schedule(fn) {
            var o = new MutationObserver(function () {
              o.disconnect();
              fn();
            });
            o.observe(div, opts);
            scheduleToggle();
          };
        }();
      } else if (typeof setImmediate !== "undefined") {
        schedule = function schedule(fn) {
          setImmediate(fn);
        };
      } else if (typeof setTimeout !== "undefined") {
        schedule = function schedule(fn) {
          setTimeout(fn, 0);
        };
      } else {
        schedule = noAsyncScheduler;
      }

      module.exports = schedule;
    }, {
      "./util": 21
    }],
    19: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise) {
        function PromiseInspection(promise) {
          if (promise !== undefined) {
            promise = promise._target();
            this._bitField = promise._bitField;
            this._settledValueField = promise._isFateSealed() ? promise._settledValue() : undefined;
          } else {
            this._bitField = 0;
            this._settledValueField = undefined;
          }
        }

        PromiseInspection.prototype._settledValue = function () {
          return this._settledValueField;
        };

        var value = PromiseInspection.prototype.value = function () {
          if (!this.isFulfilled()) {
            throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");
          }

          return this._settledValue();
        };

        var reason = PromiseInspection.prototype.error = PromiseInspection.prototype.reason = function () {
          if (!this.isRejected()) {
            throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");
          }

          return this._settledValue();
        };

        var isFulfilled = PromiseInspection.prototype.isFulfilled = function () {
          return (this._bitField & 33554432) !== 0;
        };

        var isRejected = PromiseInspection.prototype.isRejected = function () {
          return (this._bitField & 16777216) !== 0;
        };

        var isPending = PromiseInspection.prototype.isPending = function () {
          return (this._bitField & 50397184) === 0;
        };

        var isResolved = PromiseInspection.prototype.isResolved = function () {
          return (this._bitField & 50331648) !== 0;
        };

        PromiseInspection.prototype.isCancelled = function () {
          return (this._bitField & 8454144) !== 0;
        };

        Promise.prototype.__isCancelled = function () {
          return (this._bitField & 65536) === 65536;
        };

        Promise.prototype._isCancelled = function () {
          return this._target().__isCancelled();
        };

        Promise.prototype.isCancelled = function () {
          return (this._target()._bitField & 8454144) !== 0;
        };

        Promise.prototype.isPending = function () {
          return isPending.call(this._target());
        };

        Promise.prototype.isRejected = function () {
          return isRejected.call(this._target());
        };

        Promise.prototype.isFulfilled = function () {
          return isFulfilled.call(this._target());
        };

        Promise.prototype.isResolved = function () {
          return isResolved.call(this._target());
        };

        Promise.prototype.value = function () {
          return value.call(this._target());
        };

        Promise.prototype.reason = function () {
          var target = this._target();

          target._unsetRejectionIsUnhandled();

          return reason.call(target);
        };

        Promise.prototype._value = function () {
          return this._settledValue();
        };

        Promise.prototype._reason = function () {
          this._unsetRejectionIsUnhandled();

          return this._settledValue();
        };

        Promise.PromiseInspection = PromiseInspection;
      };
    }, {}],
    20: [function (_dereq_, module, exports) {
      "use strict";

      module.exports = function (Promise, INTERNAL) {
        var util = _dereq_("./util");

        var errorObj = util.errorObj;
        var isObject = util.isObject;

        function tryConvertToPromise(obj, context) {
          if (isObject(obj)) {
            if (obj instanceof Promise) return obj;
            var then = getThen(obj);

            if (then === errorObj) {
              if (context) context._pushContext();
              var ret = Promise.reject(then.e);
              if (context) context._popContext();
              return ret;
            } else if (typeof then === "function") {
              if (isAnyBluebirdPromise(obj)) {
                var ret = new Promise(INTERNAL);

                obj._then(ret._fulfill, ret._reject, undefined, ret, null);

                return ret;
              }

              return doThenable(obj, then, context);
            }
          }

          return obj;
        }

        function doGetThen(obj) {
          return obj.then;
        }

        function getThen(obj) {
          try {
            return doGetThen(obj);
          } catch (e) {
            errorObj.e = e;
            return errorObj;
          }
        }

        var hasProp = {}.hasOwnProperty;

        function isAnyBluebirdPromise(obj) {
          try {
            return hasProp.call(obj, "_promise0");
          } catch (e) {
            return false;
          }
        }

        function doThenable(x, then, context) {
          var promise = new Promise(INTERNAL);
          var ret = promise;
          if (context) context._pushContext();

          promise._captureStackTrace();

          if (context) context._popContext();
          var synchronous = true;
          var result = util.tryCatch(then).call(x, resolve, reject);
          synchronous = false;

          if (promise && result === errorObj) {
            promise._rejectCallback(result.e, true, true);

            promise = null;
          }

          function resolve(value) {
            if (!promise) return;

            promise._resolveCallback(value);

            promise = null;
          }

          function reject(reason) {
            if (!promise) return;

            promise._rejectCallback(reason, synchronous, true);

            promise = null;
          }

          return ret;
        }

        return tryConvertToPromise;
      };
    }, {
      "./util": 21
    }],
    21: [function (_dereq_, module, exports) {
      "use strict";

      var es5 = _dereq_("./es5");

      var canEvaluate = typeof navigator == "undefined";
      var errorObj = {
        e: {}
      };
      var tryCatchTarget;
      var globalObject = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this !== undefined ? this : null;

      function tryCatcher() {
        try {
          var target = tryCatchTarget;
          tryCatchTarget = null;
          return target.apply(this, arguments);
        } catch (e) {
          errorObj.e = e;
          return errorObj;
        }
      }

      function tryCatch(fn) {
        tryCatchTarget = fn;
        return tryCatcher;
      }

      var inherits = function inherits(Child, Parent) {
        var hasProp = {}.hasOwnProperty;

        function T() {
          this.constructor = Child;
          this.constructor$ = Parent;

          for (var propertyName in Parent.prototype) {
            if (hasProp.call(Parent.prototype, propertyName) && propertyName.charAt(propertyName.length - 1) !== "$") {
              this[propertyName + "$"] = Parent.prototype[propertyName];
            }
          }
        }

        T.prototype = Parent.prototype;
        Child.prototype = new T();
        return Child.prototype;
      };

      function isPrimitive(val) {
        return val == null || val === true || val === false || typeof val === "string" || typeof val === "number";
      }

      function isObject(value) {
        return typeof value === "function" || _typeof(value) === "object" && value !== null;
      }

      function maybeWrapAsError(maybeError) {
        if (!isPrimitive(maybeError)) return maybeError;
        return new Error(safeToString(maybeError));
      }

      function withAppended(target, appendee) {
        var len = target.length;
        var ret = new Array(len + 1);
        var i;

        for (i = 0; i < len; ++i) {
          ret[i] = target[i];
        }

        ret[i] = appendee;
        return ret;
      }

      function getDataPropertyOrDefault(obj, key, defaultValue) {
        if (es5.isES5) {
          var desc = Object.getOwnPropertyDescriptor(obj, key);

          if (desc != null) {
            return desc.get == null && desc.set == null ? desc.value : defaultValue;
          }
        } else {
          return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
        }
      }

      function notEnumerableProp(obj, name, value) {
        if (isPrimitive(obj)) return obj;
        var descriptor = {
          value: value,
          configurable: true,
          enumerable: false,
          writable: true
        };
        es5.defineProperty(obj, name, descriptor);
        return obj;
      }

      function thrower(r) {
        throw r;
      }

      var inheritedDataKeys = function () {
        var excludedPrototypes = [Array.prototype, Object.prototype, Function.prototype];

        var isExcludedProto = function isExcludedProto(val) {
          for (var i = 0; i < excludedPrototypes.length; ++i) {
            if (excludedPrototypes[i] === val) {
              return true;
            }
          }

          return false;
        };

        if (es5.isES5) {
          var getKeys = Object.getOwnPropertyNames;
          return function (obj) {
            var ret = [];
            var visitedKeys = Object.create(null);

            while (obj != null && !isExcludedProto(obj)) {
              var keys;

              try {
                keys = getKeys(obj);
              } catch (e) {
                return ret;
              }

              for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                if (visitedKeys[key]) continue;
                visitedKeys[key] = true;
                var desc = Object.getOwnPropertyDescriptor(obj, key);

                if (desc != null && desc.get == null && desc.set == null) {
                  ret.push(key);
                }
              }

              obj = es5.getPrototypeOf(obj);
            }

            return ret;
          };
        } else {
          var hasProp = {}.hasOwnProperty;
          return function (obj) {
            if (isExcludedProto(obj)) return [];
            var ret = [];
            /*jshint forin:false */

            enumeration: for (var key in obj) {
              if (hasProp.call(obj, key)) {
                ret.push(key);
              } else {
                for (var i = 0; i < excludedPrototypes.length; ++i) {
                  if (hasProp.call(excludedPrototypes[i], key)) {
                    continue enumeration;
                  }
                }

                ret.push(key);
              }
            }

            return ret;
          };
        }
      }();

      var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;

      function isClass(fn) {
        try {
          if (typeof fn === "function") {
            var keys = es5.names(fn.prototype);
            var hasMethods = es5.isES5 && keys.length > 1;
            var hasMethodsOtherThanConstructor = keys.length > 0 && !(keys.length === 1 && keys[0] === "constructor");
            var hasThisAssignmentAndStaticMethods = thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;

            if (hasMethods || hasMethodsOtherThanConstructor || hasThisAssignmentAndStaticMethods) {
              return true;
            }
          }

          return false;
        } catch (e) {
          return false;
        }
      }

      function toFastProperties(obj) {
        /*jshint -W027,-W055,-W031*/
        function FakeConstructor() {}

        FakeConstructor.prototype = obj;
        var receiver = new FakeConstructor();

        function ic() {
          return _typeof(receiver.foo);
        }

        ic();
        ic();
        return obj;
        eval(obj);
      }

      var rident = /^[a-z$_][a-z$_0-9]*$/i;

      function isIdentifier(str) {
        return rident.test(str);
      }

      function filledRange(count, prefix, suffix) {
        var ret = new Array(count);

        for (var i = 0; i < count; ++i) {
          ret[i] = prefix + i + suffix;
        }

        return ret;
      }

      function safeToString(obj) {
        try {
          return obj + "";
        } catch (e) {
          return "[no string representation]";
        }
      }

      function isError(obj) {
        return obj instanceof Error || obj !== null && _typeof(obj) === "object" && typeof obj.message === "string" && typeof obj.name === "string";
      }

      function markAsOriginatingFromRejection(e) {
        try {
          notEnumerableProp(e, "isOperational", true);
        } catch (ignore) {}
      }

      function originatesFromRejection(e) {
        if (e == null) return false;
        return e instanceof Error["__BluebirdErrorTypes__"].OperationalError || e["isOperational"] === true;
      }

      function canAttachTrace(obj) {
        return isError(obj) && es5.propertyIsWritable(obj, "stack");
      }

      var ensureErrorObject = function () {
        if (!("stack" in new Error())) {
          return function (value) {
            if (canAttachTrace(value)) return value;

            try {
              throw new Error(safeToString(value));
            } catch (err) {
              return err;
            }
          };
        } else {
          return function (value) {
            if (canAttachTrace(value)) return value;
            return new Error(safeToString(value));
          };
        }
      }();

      function classString(obj) {
        return {}.toString.call(obj);
      }

      function copyDescriptors(from, to, filter) {
        var keys = es5.names(from);

        for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];

          if (filter(key)) {
            try {
              es5.defineProperty(to, key, es5.getDescriptor(from, key));
            } catch (ignore) {}
          }
        }
      }

      var asArray = function asArray(v) {
        if (es5.isArray(v)) {
          return v;
        }

        return null;
      };

      if (typeof Symbol !== "undefined" && Symbol.iterator) {
        var ArrayFrom = typeof Array.from === "function" ? function (v) {
          return Array.from(v);
        } : function (v) {
          var ret = [];
          var it = v[Symbol.iterator]();
          var itResult;

          while (!(itResult = it.next()).done) {
            ret.push(itResult.value);
          }

          return ret;
        };

        asArray = function asArray(v) {
          if (es5.isArray(v)) {
            return v;
          } else if (v != null && typeof v[Symbol.iterator] === "function") {
            return ArrayFrom(v);
          }

          return null;
        };
      }

      var isNode = typeof process !== "undefined" && classString(process).toLowerCase() === "[object process]";
      var hasEnvVariables = typeof process !== "undefined" && typeof process.env !== "undefined";

      function env(key) {
        return hasEnvVariables ? process.env[key] : undefined;
      }

      function getNativePromise() {
        if (typeof Promise === "function") {
          try {
            var promise = new Promise(function () {});

            if (classString(promise) === "[object Promise]") {
              return Promise;
            }
          } catch (e) {}
        }
      }

      var reflectHandler;

      function contextBind(ctx, cb) {
        if (ctx === null || typeof cb !== "function" || cb === reflectHandler) {
          return cb;
        }

        if (ctx.domain !== null) {
          cb = ctx.domain.bind(cb);
        }

        var async = ctx.async;

        if (async !== null) {
          var old = cb;

          cb = function cb() {
            var args = new Array(2).concat([].slice.call(arguments));
            ;
            args[0] = old;
            args[1] = this;
            return async.runInAsyncScope.apply(async, args);
          };
        }

        return cb;
      }

      var ret = {
        setReflectHandler: function setReflectHandler(fn) {
          reflectHandler = fn;
        },
        isClass: isClass,
        isIdentifier: isIdentifier,
        inheritedDataKeys: inheritedDataKeys,
        getDataPropertyOrDefault: getDataPropertyOrDefault,
        thrower: thrower,
        isArray: es5.isArray,
        asArray: asArray,
        notEnumerableProp: notEnumerableProp,
        isPrimitive: isPrimitive,
        isObject: isObject,
        isError: isError,
        canEvaluate: canEvaluate,
        errorObj: errorObj,
        tryCatch: tryCatch,
        inherits: inherits,
        withAppended: withAppended,
        maybeWrapAsError: maybeWrapAsError,
        toFastProperties: toFastProperties,
        filledRange: filledRange,
        toString: safeToString,
        canAttachTrace: canAttachTrace,
        ensureErrorObject: ensureErrorObject,
        originatesFromRejection: originatesFromRejection,
        markAsOriginatingFromRejection: markAsOriginatingFromRejection,
        classString: classString,
        copyDescriptors: copyDescriptors,
        isNode: isNode,
        hasEnvVariables: hasEnvVariables,
        env: env,
        global: globalObject,
        getNativePromise: getNativePromise,
        contextBind: contextBind
      };

      ret.isRecentNode = ret.isNode && function () {
        var version;

        if (process.versions && process.versions.node) {
          version = process.versions.node.split(".").map(Number);
        } else if (process.version) {
          version = process.version.split(".").map(Number);
        }

        return version[0] === 0 && version[1] > 10 || version[0] > 0;
      }();

      ret.nodeSupportsAsyncResource = ret.isNode && function () {
        var supportsAsync = false;

        try {
          var res = _dereq_("async_hooks").AsyncResource;

          supportsAsync = typeof res.prototype.runInAsyncScope === "function";
        } catch (e) {
          supportsAsync = false;
        }

        return supportsAsync;
      }();

      if (ret.isNode) ret.toFastProperties(process);

      try {
        throw new Error();
      } catch (e) {
        ret.lastLineError = e;
      }

      module.exports = ret;
    }, {
      "./es5": 10,
      "async_hooks": undefined
    }]
  }, {}, [3])(3);
});
;

if (typeof window !== 'undefined' && window !== null) {
  window.P = window.Promise;
} else if (typeof self !== 'undefined' && self !== null) {
  self.P = self.Promise;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
  "use strict";

  if (global.setImmediate) {
    return;
  }

  var nextHandle = 1; // Spec says greater than zero

  var tasksByHandle = {};
  var currentlyRunningATask = false;
  var doc = global.document;
  var registerImmediate;

  function setImmediate(callback) {
    // Callback can either be a function or a string
    if (typeof callback !== "function") {
      callback = new Function("" + callback);
    } // Copy function arguments


    var args = new Array(arguments.length - 1);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i + 1];
    } // Store and register the task


    var task = {
      callback: callback,
      args: args
    };
    tasksByHandle[nextHandle] = task;
    registerImmediate(nextHandle);
    return nextHandle++;
  }

  function clearImmediate(handle) {
    delete tasksByHandle[handle];
  }

  function run(task) {
    var callback = task.callback;
    var args = task.args;

    switch (args.length) {
      case 0:
        callback();
        break;

      case 1:
        callback(args[0]);
        break;

      case 2:
        callback(args[0], args[1]);
        break;

      case 3:
        callback(args[0], args[1], args[2]);
        break;

      default:
        callback.apply(undefined, args);
        break;
    }
  }

  function runIfPresent(handle) {
    // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
    // So if we're currently running a task, we'll need to delay this invocation.
    if (currentlyRunningATask) {
      // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
      // "too much recursion" error.
      setTimeout(runIfPresent, 0, handle);
    } else {
      var task = tasksByHandle[handle];

      if (task) {
        currentlyRunningATask = true;

        try {
          run(task);
        } finally {
          clearImmediate(handle);
          currentlyRunningATask = false;
        }
      }
    }
  }

  function installNextTickImplementation() {
    registerImmediate = function registerImmediate(handle) {
      process.nextTick(function () {
        runIfPresent(handle);
      });
    };
  }

  function canUsePostMessage() {
    // The test against `importScripts` prevents this implementation from being installed inside a web worker,
    // where `global.postMessage` means something completely different and can't be used for this purpose.
    if (global.postMessage && !global.importScripts) {
      var postMessageIsAsynchronous = true;
      var oldOnMessage = global.onmessage;

      global.onmessage = function () {
        postMessageIsAsynchronous = false;
      };

      global.postMessage("", "*");
      global.onmessage = oldOnMessage;
      return postMessageIsAsynchronous;
    }
  }

  function installPostMessageImplementation() {
    // Installs an event handler on `global` for the `message` event: see
    // * https://developer.mozilla.org/en/DOM/window.postMessage
    // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
    var messagePrefix = "setImmediate$" + Math.random() + "$";

    var onGlobalMessage = function onGlobalMessage(event) {
      if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
        runIfPresent(+event.data.slice(messagePrefix.length));
      }
    };

    if (global.addEventListener) {
      global.addEventListener("message", onGlobalMessage, false);
    } else {
      global.attachEvent("onmessage", onGlobalMessage);
    }

    registerImmediate = function registerImmediate(handle) {
      global.postMessage(messagePrefix + handle, "*");
    };
  }

  function installMessageChannelImplementation() {
    var channel = new MessageChannel();

    channel.port1.onmessage = function (event) {
      var handle = event.data;
      runIfPresent(handle);
    };

    registerImmediate = function registerImmediate(handle) {
      channel.port2.postMessage(handle);
    };
  }

  function installReadyStateChangeImplementation() {
    var html = doc.documentElement;

    registerImmediate = function registerImmediate(handle) {
      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var script = doc.createElement("script");

      script.onreadystatechange = function () {
        runIfPresent(handle);
        script.onreadystatechange = null;
        html.removeChild(script);
        script = null;
      };

      html.appendChild(script);
    };
  }

  function installSetTimeoutImplementation() {
    registerImmediate = function registerImmediate(handle) {
      setTimeout(runIfPresent, 0, handle);
    };
  } // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.


  var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
  attachTo = attachTo && attachTo.setTimeout ? attachTo : global; // Don't get fooled by e.g. browserify environments.

  if ({}.toString.call(global.process) === "[object process]") {
    // For Node.js before 0.9
    installNextTickImplementation();
  } else if (canUsePostMessage()) {
    // For non-IE10 modern browsers
    installPostMessageImplementation();
  } else if (global.MessageChannel) {
    // For web workers, where supported
    installMessageChannelImplementation();
  } else if (doc && "onreadystatechange" in doc.createElement("script")) {
    // For IE 6–8
    installReadyStateChangeImplementation();
  } else {
    // For older browsers
    installSetTimeoutImplementation();
  }

  attachTo.setImmediate = setImmediate;
  attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = typeof global !== "undefined" && global || typeof self !== "undefined" && self || window;
var apply = Function.prototype.apply; // DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};

exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};

exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}

Timeout.prototype.unref = Timeout.prototype.ref = function () {};

Timeout.prototype.close = function () {
  this._clearFn.call(scope, this._id);
}; // Does not start the time, just sets up the members needed.


exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);
  var msecs = item._idleTimeout;

  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
}; // setimmediate attaches itself to the global object


__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js"); // On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.


exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || this && this.setImmediate;
exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || this && this.clearImmediate;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),

/***/ "./sources/core/base.js":
/*!******************************!*\
  !*** ./sources/core/base.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
function extend(scheduler) {
  var generateStringToDate = function generateStringToDate(format, utc) {
    var splt = "var temp=date.match(/[a-zA-Z]+|[0-9]+/g);";
    var mask = format.match(/%[a-zA-Z]/g);

    for (var i = 0; i < mask.length; i++) {
      switch (mask[i]) {
        case "%j":
        case "%d":
          splt += "set[2]=temp[" + i + "]||1;";
          break;

        case "%n":
        case "%m":
          splt += "set[1]=(temp[" + i + "]||1)-1;";
          break;

        case "%y":
          splt += "set[0]=temp[" + i + "]*1+(temp[" + i + "]>50?1900:2000);";
          break;

        case "%g":
        case "%G":
        case "%h":
        case "%H":
          splt += "set[3]=temp[" + i + "]||0;";
          break;

        case "%i":
          splt += "set[4]=temp[" + i + "]||0;";
          break;

        case "%Y":
          splt += "set[0]=temp[" + i + "]||0;";
          break;

        case "%a":
        case "%A":
          splt += "set[3]=set[3]%12+((temp[" + i + "]||'').toLowerCase()=='am'?0:12);";
          break;

        case "%s":
          splt += "set[5]=temp[" + i + "]||0;";
          break;

        case "%M":
          splt += "set[1]=this.locale.date.month_short_hash[temp[" + i + "]]||0;";
          break;

        case "%F":
          splt += "set[1]=this.locale.date.month_full_hash[temp[" + i + "]]||0;";
          break;

        default:
          break;
      }
    }

    var code = "set[0],set[1],set[2],set[3],set[4],set[5]";
    if (utc) code = " Date.UTC(" + code + ")";
    return new Function("date", "var set=[0,0,1,0,0,0]; " + splt + " return new Date(" + code + ");");
  };

  var csp_date_to_str = function csp_date_to_str(format, utc) {
    return function (date) {
      return format.replace(/%[a-zA-Z]/g, function (a) {
        switch (a) {
          case "%d":
            return utc ? scheduler.date.to_fixed(date.getUTCDate()) : scheduler.date.to_fixed(date.getDate());

          case "%m":
            return utc ? scheduler.date.to_fixed(date.getUTCMonth() + 1) : scheduler.date.to_fixed(date.getMonth() + 1);

          case "%j":
            return utc ? date.getUTCDate() : date.getDate();

          case "%n":
            return utc ? date.getUTCMonth() + 1 : date.getMonth() + 1;

          case "%y":
            return utc ? scheduler.date.to_fixed(date.getUTCFullYear() % 100) : scheduler.date.to_fixed(date.getFullYear() % 100);

          case "%Y":
            return utc ? date.getUTCFullYear() : date.getFullYear();

          case "%D":
            return utc ? scheduler.locale.date.day_short[date.getUTCDay()] : scheduler.locale.date.day_short[date.getDay()];

          case "%l":
            return utc ? scheduler.locale.date.day_full[date.getUTCDay()] : scheduler.locale.date.day_full[date.getDay()];

          case "%M":
            return utc ? scheduler.locale.date.month_short[date.getUTCMonth()] : scheduler.locale.date.month_short[date.getMonth()];

          case "%F":
            return utc ? scheduler.locale.date.month_full[date.getUTCMonth()] : scheduler.locale.date.month_full[date.getMonth()];

          case "%h":
            return utc ? scheduler.date.to_fixed((date.getUTCHours() + 11) % 12 + 1) : scheduler.date.to_fixed((date.getHours() + 11) % 12 + 1);

          case "%g":
            return utc ? (date.getUTCHours() + 11) % 12 + 1 : (date.getHours() + 11) % 12 + 1;

          case "%G":
            return utc ? date.getUTCHours() : date.getHours();

          case "%H":
            return utc ? scheduler.date.to_fixed(date.getUTCHours()) : scheduler.date.to_fixed(date.getHours());

          case "%i":
            return utc ? scheduler.date.to_fixed(date.getUTCMinutes()) : scheduler.date.to_fixed(date.getMinutes());

          case "%a":
            return utc ? date.getUTCHours() > 11 ? "pm" : "am" : date.getHours() > 11 ? "pm" : "am";

          case "%A":
            return utc ? date.getUTCHours() > 11 ? "PM" : "AM" : date.getHours() > 11 ? "PM" : "AM";

          case "%s":
            return utc ? scheduler.date.to_fixed(date.getUTCSeconds()) : scheduler.date.to_fixed(date.getSeconds());

          case "%W":
            return utc ? scheduler.date.to_fixed(scheduler.date.getUTCISOWeek(date)) : scheduler.date.to_fixed(scheduler.date.getISOWeek(date));

          default:
            return a;
        }
      });
    };
  };

  var csp_str_to_date = function csp_str_to_date(format, utc) {
    return function (date) {
      var set = [0, 0, 1, 0, 0, 0];
      var temp = date.match(/[a-zA-Z]+|[0-9]+/g);
      var mask = format.match(/%[a-zA-Z]/g);

      for (var i = 0; i < mask.length; i++) {
        switch (mask[i]) {
          case "%j":
          case "%d":
            set[2] = temp[i] || 1;
            break;

          case "%n":
          case "%m":
            set[1] = (temp[i] || 1) - 1;
            break;

          case "%y":
            set[0] = temp[i] * 1 + (temp[i] > 50 ? 1900 : 2000);
            break;

          case "%g":
          case "%G":
          case "%h":
          case "%H":
            set[3] = temp[i] || 0;
            break;

          case "%i":
            set[4] = temp[i] || 0;
            break;

          case "%Y":
            set[0] = temp[i] || 0;
            break;

          case "%a":
          case "%A":
            set[3] = set[3] % 12 + ((temp[i] || '').toLowerCase() == 'am' ? 0 : 12);
            break;

          case "%s":
            set[5] = temp[i] || 0;
            break;

          case "%M":
            set[1] = scheduler.locale.date.month_short_hash[temp[i]] || 0;
            break;

          case "%F":
            set[1] = scheduler.locale.date.month_full_hash[temp[i]] || 0;
            break;

          default:
            break;
        }
      }

      if (utc) {
        return new Date(Date.UTC(set[0], set[1], set[2], set[3], set[4], set[5]));
      }

      return new Date(set[0], set[1], set[2], set[3], set[4], set[5]);
    };
  };

  var canUseCsp = false;

  (function () {
    try {
      new Function("canUseCsp = false;");
    } catch (e) {
      canUseCsp = true;
    }
  })();

  function useCsp() {
    var result = false;

    if (scheduler.config.csp === "auto") {
      result = canUseCsp;
    } else {
      result = scheduler.config.csp;
    }

    return result;
  }

  scheduler.date = {
    init: function init() {
      var s = scheduler.locale.date.month_short;
      var t = scheduler.locale.date.month_short_hash = {};

      for (var i = 0; i < s.length; i++) {
        t[s[i]] = i;
      }

      var s = scheduler.locale.date.month_full;
      var t = scheduler.locale.date.month_full_hash = {};

      for (var i = 0; i < s.length; i++) {
        t[s[i]] = i;
      }
    },
    _bind_host_object: function _bind_host_object(method) {
      if (method.bind) {
        return method.bind(scheduler);
      } else {
        return function () {
          return method.apply(scheduler, arguments);
        };
      }
    },
    date_part: function date_part(date) {
      var old = new Date(date);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      if (date.getHours() && ( //shift to yesterday on dst
      date.getDate() < old.getDate() || date.getMonth() < old.getMonth() || date.getFullYear() < old.getFullYear())) date.setTime(date.getTime() + 60 * 60 * 1000 * (24 - date.getHours()));
      return date;
    },
    time_part: function time_part(date) {
      return (date.valueOf() / 1000 - date.getTimezoneOffset() * 60) % 86400;
    },
    week_start: function week_start(date) {
      var shift = date.getDay();

      if (scheduler.config.start_on_monday) {
        if (shift === 0) shift = 6;else shift--;
      }

      return this.date_part(this.add(date, -1 * shift, "day"));
    },
    month_start: function month_start(date) {
      date.setDate(1);
      return this.date_part(date);
    },
    year_start: function year_start(date) {
      date.setMonth(0);
      return this.month_start(date);
    },
    day_start: function day_start(date) {
      return this.date_part(date);
    },
    _add_days: function _add_days(date, inc) {
      var ndate = new Date(date.valueOf());
      ndate.setDate(ndate.getDate() + inc); // Workaround for Safari/iOS timezone bug, ref:OKZ-149693

      if (inc == Math.round(inc) && inc > 0) {
        var datesDiff = +ndate - +date,
            rest = datesDiff % (24 * 60 * 60 * 1000);

        if (rest && date.getTimezoneOffset() == ndate.getTimezoneOffset()) {
          var hours = rest / (60 * 60 * 1000);
          ndate.setTime(ndate.getTime() + (24 - hours) * 60 * 60 * 1000);
        }
      }

      if (inc >= 0 && !date.getHours() && ndate.getHours() && ( //shift to yesterday on dst
      ndate.getDate() < date.getDate() || ndate.getMonth() < date.getMonth() || ndate.getFullYear() < date.getFullYear())) ndate.setTime(ndate.getTime() + 60 * 60 * 1000 * (24 - ndate.getHours()));
      return ndate;
    },
    add: function add(date, inc, mode) {
      var ndate = new Date(date.valueOf());

      switch (mode) {
        case "day":
          ndate = scheduler.date._add_days(ndate, inc);
          break;

        case "week":
          ndate = scheduler.date._add_days(ndate, inc * 7);
          break;

        case "month":
          ndate.setMonth(ndate.getMonth() + inc);
          break;

        case "year":
          ndate.setYear(ndate.getFullYear() + inc);
          break;

        case "hour":
          /*
           setHour(getHour() + inc) and setMinutes gives weird result when is applied on a Daylight Saving time switch
           setTime seems working as expected
          */
          ndate.setTime(ndate.getTime() + inc * 60 * 60 * 1000);
          break;

        case "minute":
          ndate.setTime(ndate.getTime() + inc * 60 * 1000);
          break;

        default:
          return scheduler.date["add_" + mode](date, inc, mode);
      }

      return ndate;
    },
    to_fixed: function to_fixed(num) {
      if (num < 10) return "0" + num;
      return num;
    },
    copy: function copy(date) {
      return new Date(date.valueOf());
    },
    date_to_str: function date_to_str(format, utc) {
      if (useCsp()) {
        return csp_date_to_str(format, utc);
      }

      format = format.replace(/%[a-zA-Z]/g, function (a) {
        switch (a) {
          case "%d":
            return "\"+this.date.to_fixed(date.getDate())+\"";

          case "%m":
            return "\"+this.date.to_fixed((date.getMonth()+1))+\"";

          case "%j":
            return "\"+date.getDate()+\"";

          case "%n":
            return "\"+(date.getMonth()+1)+\"";

          case "%y":
            return "\"+this.date.to_fixed(date.getFullYear()%100)+\"";

          case "%Y":
            return "\"+date.getFullYear()+\"";

          case "%D":
            return "\"+this.locale.date.day_short[date.getDay()]+\"";

          case "%l":
            return "\"+this.locale.date.day_full[date.getDay()]+\"";

          case "%M":
            return "\"+this.locale.date.month_short[date.getMonth()]+\"";

          case "%F":
            return "\"+this.locale.date.month_full[date.getMonth()]+\"";

          case "%h":
            return "\"+this.date.to_fixed((date.getHours()+11)%12+1)+\"";

          case "%g":
            return "\"+((date.getHours()+11)%12+1)+\"";

          case "%G":
            return "\"+date.getHours()+\"";

          case "%H":
            return "\"+this.date.to_fixed(date.getHours())+\"";

          case "%i":
            return "\"+this.date.to_fixed(date.getMinutes())+\"";

          case "%a":
            return "\"+(date.getHours()>11?\"pm\":\"am\")+\"";

          case "%A":
            return "\"+(date.getHours()>11?\"PM\":\"AM\")+\"";

          case "%s":
            return "\"+this.date.to_fixed(date.getSeconds())+\"";

          case "%W":
            return "\"+this.date.to_fixed(this.date.getISOWeek(date))+\"";

          default:
            return a;
        }
      });
      if (utc) format = format.replace(/date\.get/g, "date.getUTC");
      var func = new Function("date", "return \"" + format + "\";");
      return scheduler.date._bind_host_object(func);
    },
    str_to_date: function str_to_date(format, utc, exactFormat) {
      var stringToDateMethod = useCsp() ? csp_str_to_date : generateStringToDate;
      var parseExactFormat = stringToDateMethod(format, utc); //return scheduler.date._bind_host_object(func);
      // eslint-disable-next-line

      var yyyyMMddhhIIss = /^[0-9]{4}(\-|\/)[0-9]{2}(\-|\/)[0-9]{2} ?(([0-9]{1,2}:[0-9]{1,2})(:[0-9]{1,2})?)?$/; // MM/dd/yyyy - default old format for xml-date
      // eslint-disable-next-line

      var MMddyyyyhhIIss = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4} ?(([0-9]{1,2}:[0-9]{2})(:[0-9]{1,2})?)?$/; // dd-MM-yyyy - default old format for api-date
      // eslint-disable-next-line

      var ddMMyyyyhhIIss = /^[0-9]{2}\-[0-9]{2}\-[0-9]{4} ?(([0-9]{1,2}:[0-9]{1,2})(:[0-9]{1,2})?)?$/; // eslint-disable-next-line

      var ISO8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

      var isYMDDate = function isYMDDate(datestr) {
        return yyyyMMddhhIIss.test(String(datestr));
      };

      var isMDYDate = function isMDYDate(datestr) {
        return MMddyyyyhhIIss.test(String(datestr));
      };

      var isDMYDate = function isDMYDate(datestr) {
        return ddMMyyyyhhIIss.test(String(datestr));
      };

      var isISO8601 = function isISO8601(datestr) {
        return ISO8601.test(datestr);
      };

      var parseYMD = stringToDateMethod("%Y-%m-%d %H:%i:%s", utc);
      var parseMDY = stringToDateMethod("%m/%d/%Y %H:%i:%s", utc);
      var parseDMY = stringToDateMethod("%d-%m-%Y %H:%i:%s", utc);
      return function (dateString) {
        if (!exactFormat && !scheduler.config.parse_exact_format) {
          if (dateString && dateString.getISOWeek) {
            return new Date(dateString);
          } else if (typeof dateString === "number") {
            return new Date(dateString);
          } else if (isYMDDate(dateString)) {
            return parseYMD(dateString);
          } else if (isMDYDate(dateString)) {
            return parseMDY(dateString);
          } else if (isDMYDate(dateString)) {
            return parseDMY(dateString);
          } else if (isISO8601(dateString)) {
            return new Date(dateString);
          }
        }

        return parseExactFormat.call(scheduler, dateString);
      };
    },
    getISOWeek: function getISOWeek(ndate) {
      if (!ndate) return false;
      ndate = this.date_part(new Date(ndate));
      var nday = ndate.getDay();

      if (nday === 0) {
        nday = 7;
      }

      var first_thursday = new Date(ndate.valueOf());
      first_thursday.setDate(ndate.getDate() + (4 - nday));
      var year_number = first_thursday.getFullYear(); // year of the first Thursday

      var ordinal_date = Math.round((first_thursday.getTime() - new Date(year_number, 0, 1).getTime()) / 86400000); //ordinal date of the first Thursday - 1 (so not really ordinal date)

      var week_number = 1 + Math.floor(ordinal_date / 7);
      return week_number;
    },
    getUTCISOWeek: function getUTCISOWeek(ndate) {
      return this.getISOWeek(this.convert_to_utc(ndate));
    },
    convert_to_utc: function convert_to_utc(date) {
      return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    }
  };
}

/***/ }),

/***/ "./sources/core/common.js":
/*!********************************!*\
  !*** ./sources/core/common.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
/* harmony import */ var _utils_scoped_event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/scoped_event */ "./sources/core/utils/scoped_event.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


function extend(scheduler) {
  var domEvents = Object(_utils_scoped_event__WEBPACK_IMPORTED_MODULE_0__["default"])();
  scheduler.event = domEvents.attach;
  scheduler.eventRemove = domEvents.detach;
  scheduler._eventRemoveAll = domEvents.detachAll;
  scheduler._createDomEventScope = domEvents.extend;

  scheduler._trim = function (str) {
    var func = String.prototype.trim || function () {
      return this.replace(/^\s+|\s+$/g, "");
    };

    return func.apply(str);
  };

  scheduler._isDate = function (obj) {
    if (obj && _typeof(obj) == "object") {
      return !!(obj.getFullYear && obj.getMonth && obj.getDate);
    } else {
      return false;
    }
  };

  scheduler._isObject = function (obj) {
    return obj && _typeof(obj) == "object";
  };
}

/***/ }),

/***/ "./sources/core/common/assert.js":
/*!***************************************!*\
  !*** ./sources/core/common/assert.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  return function assert(check, message) {
    if (!check) {
      if (scheduler.config.show_errors && scheduler.callEvent("onError", [message]) !== false) {
        if (scheduler.message) {
          scheduler.message({
            type: "error",
            text: message,
            expire: -1
          });
        } else {
          // eslint-disable-next-line
          console.log(message);
        } // eslint-disable-next-line no-debugger


        debugger;
      }
    }
  };
});

/***/ }),

/***/ "./sources/core/common/get_serializable_events.js":
/*!********************************************************!*\
  !*** ./sources/core/common/get_serializable_events.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (scheduler) {
  return function () {
    var res = {};

    for (var a in this._events) {
      var ev = this._events[a];

      if (ev.id.toString().indexOf("#") == -1) {
        res[ev.id] = ev;
      }
    }

    return res;
  }.bind(scheduler);
};

/***/ }),

/***/ "./sources/core/common/url_serialize.js":
/*!**********************************************!*\
  !*** ./sources/core/common/url_serialize.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (data) {
  if (typeof data === "string" || typeof data === "number") {
    return data;
  }

  var result = "";

  for (var key in data) {
    var serialized = "";

    if (data.hasOwnProperty(key)) {
      if (typeof data[key] === "string") {
        serialized = encodeURIComponent(data[key]);
      } else if (typeof data[key] === "number") {
        serialized = data[key];
      } else {
        serialized = encodeURIComponent(JSON.stringify(data[key]));
      }

      serialized = key + "=" + serialized;

      if (result.length) {
        serialized = "&" + serialized;
      }

      result += serialized;
    }
  }

  return result;
};

/***/ }),

/***/ "./sources/core/common_errors.js":
/*!***************************************!*\
  !*** ./sources/core/common_errors.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
function extend(scheduler) {
  var commonViews = {
    agenda: "https://docs.dhtmlx.com/scheduler/agenda_view.html",
    grid: "https://docs.dhtmlx.com/scheduler/grid_view.html",
    map: "https://docs.dhtmlx.com/scheduler/map_view.html",
    unit: "https://docs.dhtmlx.com/scheduler/units_view.html",
    timeline: "https://docs.dhtmlx.com/scheduler/timeline_view.html",
    week_agenda: "https://docs.dhtmlx.com/scheduler/weekagenda_view.html",
    year: "https://docs.dhtmlx.com/scheduler/year_view.html",
    anythingElse: "https://docs.dhtmlx.com/scheduler/views.html"
  };
  var requiredExtensions = {
    agenda: "ext/dhtmlxscheduler_agenda_view.js",
    grid: "ext/dhtmlxscheduler_grid_view.js",
    map: "ext/dhtmlxscheduler_map_view.js",
    unit: "ext/dhtmlxscheduler_units.js",
    timeline: "ext/dhtmlxscheduler_timeline.js, ext/dhtmlxscheduler_treetimeline.js, ext/dhtmlxscheduler_daytimeline.js",
    week_agenda: "ext/dhtmlxscheduler_week_agenda.js",
    year: "ext/dhtmlxscheduler_year_view.js",
    limit: "ext/dhtmlxscheduler_limit.js"
  };
  scheduler._commonErrorMessages = {
    unknownView: function unknownView(view) {
      var relatedDoc = "Related docs: " + (commonViews[view] || commonViews.anythingElse);
      var relatedExtension = requiredExtensions[view] ? "You're probably missing " + requiredExtensions[view] + "." : "";
      return "`" + view + "` view is not defined. \n" + "Please check parameters you pass to `scheduler.init` or `scheduler.setCurrentView` in your code and ensure you've imported appropriate extensions. \n" + relatedDoc + "\n" + (relatedExtension ? relatedExtension + "\n" : "");
    },
    collapsedContainer: function collapsedContainer(div) {
      return "Scheduler container height is set to *100%* but the rendered height is zero and the scheduler is not visible. \n" + "Make sure that the container has some initial height or use different units. For example:\n" + "<div id='scheduler_here' class='dhx_cal_container' style='width:100%; height:600px;'> \n";
    }
  };

  scheduler.createTimelineView = function () {
    throw new Error("scheduler.createTimelineView is not implemented. Be sure to add the required extension: " + requiredExtensions.timeline + "\n" + "Related docs: " + commonViews.timeline);
  };

  scheduler.createUnitsView = function () {
    throw new Error("scheduler.createUnitsView is not implemented. Be sure to add the required extension: " + requiredExtensions.unit + "\n" + "Related docs: " + commonViews.unit);
  };

  scheduler.createGridView = function () {
    throw new Error("scheduler.createGridView is not implemented. Be sure to add the required extension: " + requiredExtensions.grid + "\n" + "Related docs: " + commonViews.grid);
  };

  scheduler.addMarkedTimespan = function () {
    throw new Error("scheduler.addMarkedTimespan is not implemented. Be sure to add the required extension: ext/dhtmlxscheduler_limit.js" + "\n" + "Related docs: https://docs.dhtmlx.com/scheduler/limits.html");
  };

  scheduler.renderCalendar = function () {
    throw new Error("scheduler.renderCalendar is not implemented. Be sure to add the required extension: ext/dhtmlxscheduler_minical.js" + "\n" + "https://docs.dhtmlx.com/scheduler/minicalendar.html");
  };

  scheduler.exportToPNG = function () {
    throw new Error(["scheduler.exportToPNG is not implemented.", "This feature requires an additional module, be sure to check the related doc here https://docs.dhtmlx.com/scheduler/png.html", "Licensing info: https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml"].join("\n"));
  };

  scheduler.exportToPDF = function () {
    throw new Error(["scheduler.exportToPDF is not implemented.", "This feature requires an additional module, be sure to check the related doc here https://docs.dhtmlx.com/scheduler/pdf.html", "Licensing info: https://dhtmlx.com/docs/products/dhtmlxScheduler/export.shtml"].join("\n"));
  };
}

/***/ }),

/***/ "./sources/core/config.js":
/*!********************************!*\
  !*** ./sources/core/config.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
function extend(scheduler) {
  /*
  %e	Day of the month without leading zeros (01..31)
  %d	Day of the month, 2 digits with leading zeros (01..31)
  %j	Day of the year, 3 digits with leading zeros (001..366)
  %a	A textual representation of a day, two letters
  %W	A full textual representation of the day of the week
  
  %c	Numeric representation of a month, without leading zeros (0..12)
  %m	Numeric representation of a month, with leading zeros (00..12)
  %b	A short textual representation of a month, three letters (Jan..Dec)
  %M	A full textual representation of a month, such as January or March (January..December)
  
  %y	A two digit representation of a year (93..03)
  %Y	A full numeric representation of a year, 4 digits (1993..03)
  */
  scheduler.config = {
    default_date: "%j %M %Y",
    month_date: "%F %Y",
    load_date: "%Y-%m-%d",
    week_date: "%l",
    day_date: "%D, %F %j",
    hour_date: "%H:%i",
    month_day: "%d",
    //xml_date: "%m/%d/%Y %H:%i",
    date_format: "%Y-%m-%d %H:%i",
    api_date: "%d-%m-%Y %H:%i",
    parse_exact_format: false,
    preserve_length: true,
    time_step: 5,
    start_on_monday: true,
    first_hour: 0,
    last_hour: 24,
    readonly: false,
    drag_resize: true,
    drag_move: true,
    drag_create: true,
    drag_event_body: true,
    dblclick_create: true,
    edit_on_create: true,
    details_on_create: false,
    header: null,
    resize_month_events: false,
    resize_month_timed: false,
    responsive_lightbox: false,
    rtl: false,
    cascade_event_display: false,
    cascade_event_count: 4,
    cascade_event_margin: 30,
    multi_day: true,
    multi_day_height_limit: 0,
    drag_lightbox: true,
    preserve_scroll: true,
    select: true,
    server_utc: false,
    touch: true,
    touch_tip: true,
    touch_drag: 500,
    touch_swipe_dates: false,
    quick_info_detached: true,
    positive_closing: false,
    drag_highlight: true,
    limit_drag_out: false,
    icons_edit: ["icon_save", "icon_cancel"],
    icons_select: ["icon_details", "icon_edit", "icon_delete"],
    buttons_left: ["dhx_save_btn", "dhx_cancel_btn"],
    buttons_right: ["dhx_delete_btn"],
    lightbox: {
      sections: [{
        name: "description",
        map_to: "text",
        type: "textarea",
        focus: true
      }, {
        name: "time",
        height: 72,
        type: "time",
        map_to: "auto"
      }]
    },
    highlight_displayed_event: true,
    left_border: false,
    ajax_error: "alert",
    //"ignore"|"console"
    delay_render: 0,
    timeline_swap_resize: true,
    wai_aria_attributes: true,
    wai_aria_application_role: true,
    csp: "auto",
    event_attribute: "data-event-id",
    show_errors: true
  };
  scheduler.config.buttons_left.$initial = scheduler.config.buttons_left.join();
  scheduler.config.buttons_right.$initial = scheduler.config.buttons_right.join();
  scheduler._helpers = {
    parseDate: function parseDate(date) {
      var parse = scheduler.templates.xml_date || scheduler.templates.parse_date;
      return parse(date);
    },
    formatDate: function formatDate(date) {
      var format = scheduler.templates.xml_format || scheduler.templates.format_date;
      return format(date);
    }
  };
  scheduler.templates = {};

  scheduler.init_templates = function () {
    var labels = scheduler.locale.labels;
    labels.dhx_save_btn = labels.icon_save;
    labels.dhx_cancel_btn = labels.icon_cancel;
    labels.dhx_delete_btn = labels.icon_delete;
    var d = scheduler.date.date_to_str;
    var c = scheduler.config;

    var f = function f(a, b) {
      for (var c in b) {
        if (!a[c]) a[c] = b[c];
      }
    };

    f(scheduler.templates, {
      day_date: d(c.default_date),
      month_date: d(c.month_date),
      week_date: function week_date(d1, d2) {
        if (c.rtl) {
          return scheduler.templates.day_date(scheduler.date.add(d2, -1, "day")) + " &ndash; " + scheduler.templates.day_date(d1);
        }

        return scheduler.templates.day_date(d1) + " &ndash; " + scheduler.templates.day_date(scheduler.date.add(d2, -1, "day"));
      },
      day_scale_date: d(c.default_date),
      month_scale_date: d(c.week_date),
      week_scale_date: d(c.day_date),
      hour_scale: d(c.hour_date),
      time_picker: d(c.hour_date),
      event_date: d(c.hour_date),
      month_day: d(c.month_day),
      load_format: d(c.load_date),
      //	xml_date:scheduler.date.str_to_date(c.xml_date,c.server_utc),
      //	xml_format:d(c.date_format,c.server_utc),
      format_date: d(c.date_format, c.server_utc),
      parse_date: scheduler.date.str_to_date(c.date_format, c.server_utc),
      api_date: scheduler.date.str_to_date(c.api_date, false, false),
      event_header: function event_header(start, end, ev) {
        // if (scheduler.config.rtl) {
        // 	return scheduler.templates.event_date(end)+" - "+scheduler.templates.event_date(start);
        // }
        return scheduler.templates.event_date(start) + " - " + scheduler.templates.event_date(end);
      },
      event_text: function event_text(start, end, ev) {
        return ev.text;
      },
      event_class: function event_class(start, end, ev) {
        return "";
      },
      month_date_class: function month_date_class(d) {
        return "";
      },
      week_date_class: function week_date_class(d) {
        return "";
      },
      event_bar_date: function event_bar_date(start, end, ev) {
        return scheduler.templates.event_date(start) + " ";
      },
      event_bar_text: function event_bar_text(start, end, ev) {
        return ev.text;
      },
      month_events_link: function month_events_link(date, count) {
        return "<a>View more(" + count + " events)</a>";
      },
      drag_marker_class: function drag_marker_class(start, end, event) {
        return "";
      },
      drag_marker_content: function drag_marker_content(start, end, event) {
        return "";
      },

      /* Could be redifined */
      tooltip_date_format: scheduler.date.date_to_str("%Y-%m-%d %H:%i"),
      tooltip_text: function tooltip_text(start, end, event) {
        return "<b>Event:</b> " + event.text + "<br/><b>Start date:</b> " + scheduler.templates.tooltip_date_format(start) + "<br/><b>End date:</b> " + scheduler.templates.tooltip_date_format(end);
      }
    });
    this.callEvent("onTemplatesReady", []);
  };
}

/***/ }),

/***/ "./sources/core/connector.js":
/*!***********************************!*\
  !*** ./sources/core/connector.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../global */ "./sources/global.js");

function extend(scheduler) {
  /*
  if (global.dataProcessor && !dataProcessor.prototype.init_original){
  	dataProcessor.prototype.init_original=dataProcessor.prototype.init;
  	dataProcessor.prototype.init=function(obj){
  		this.init_original(obj);
  		obj._dataprocessor=this;
  
  		this.setTransactionMode("POST",true);
  		this.serverProcessor+=(this.serverProcessor.indexOf("?")!=-1?"&":"?")+"editing=true";
  	};
  }*/
  scheduler.attachEvent("onSchedulerReady", function () {
    if (typeof dhtmlxError !== "undefined") {
      window.dhtmlxError.catchError("LoadXML", function (a, b, c) {
        var message = c[0].responseText;

        switch (scheduler.config.ajax_error) {
          case "alert":
            _global__WEBPACK_IMPORTED_MODULE_0__["default"].alert(message);
            break;

          case "console":
            _global__WEBPACK_IMPORTED_MODULE_0__["default"].console.log(message);
            break;

          default:
            break;
        }
      });
    }
  });
}

/***/ }),

/***/ "./sources/core/dataprocessor/dataprocessor.js":
/*!*****************************************************!*\
  !*** ./sources/core/dataprocessor/dataprocessor.js ***!
  \*****************************************************/
/*! exports provided: DataProcessor, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataProcessor", function() { return DataProcessor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
/* harmony import */ var _dataprocessor_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataprocessor_hooks */ "./sources/core/dataprocessor/dataprocessor_hooks.js");
/* harmony import */ var _utils_eventable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/eventable */ "./sources/utils/eventable.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../global */ "./sources/global.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }





/**
 *	@desc: constructor, data processor object
 *	@param: serverProcessorURL - url used for update
 *	@type: public
 */

function DataProcessor(serverProcessorURL) {
  this.serverProcessor = serverProcessorURL;
  this.action_param = "!nativeeditor_status";
  this.object = null;
  this.updatedRows = []; // ids of updated rows

  this.autoUpdate = true;
  this.updateMode = "cell";
  this._tMode = "GET";
  this._headers = null;
  this._payload = null;
  this.post_delim = "_";
  this._waitMode = 0;
  this._in_progress = {};
  this._invalid = {};
  this.messages = [];
  this.styles = {
    updated: "font-weight:bold;",
    inserted: "font-weight:bold;",
    deleted: "text-decoration : line-through;",
    invalid: "background-color:FFE0E0;",
    invalid_cell: "border-bottom:2px solid red;",
    error: "color:red;",
    clear: "font-weight:normal;text-decoration:none;"
  };
  this.enableUTFencoding(true);
  Object(_utils_eventable__WEBPACK_IMPORTED_MODULE_1__["default"])(this); // TODO: need to update

  return this;
}
DataProcessor.prototype = {
  setTransactionMode: function setTransactionMode(mode, total) {
    if (_typeof(mode) == "object") {
      this._tMode = mode.mode || this._tMode;

      if (mode.headers !== undefined) {
        this._headers = mode.headers;
      }

      if (mode.payload !== undefined) {
        this._payload = mode.payload;
      }

      this._tSend = !!total;
    } else {
      this._tMode = mode;
      this._tSend = total;
    }

    if (this._tMode == "REST") {
      this._tSend = false;
      this._endnm = true;
    }

    if (this._tMode === "JSON" || this._tMode === "REST-JSON") {
      this._tSend = false;
      this._endnm = true;
      this._serializeAsJson = true;
      this._headers = this._headers || {};
      this._headers["Content-Type"] = "application/json";
    } else {
      if (this._headers && !this._headers["Content-Type"]) {
        this._headers["Content-Type"] = "application/x-www-form-urlencoded";
      }
    }

    if (this._tMode === "CUSTOM") {
      this._tSend = false;
      this._endnm = true;
      this._router = mode.router;
    }
  },
  escape: function (_escape) {
    function escape(_x) {
      return _escape.apply(this, arguments);
    }

    escape.toString = function () {
      return _escape.toString();
    };

    return escape;
  }(function (data) {
    if (this._utf) return encodeURIComponent(data);else return escape(data);
  }),

  /**
   *	@desc: allows to set escaping mode
   *	@param: true - utf based escaping, simple - use current page encoding
   *	@type: public
   */
  enableUTFencoding: function enableUTFencoding(mode) {
    this._utf = !!mode;
  },

  /**
   *	@desc: allows to define, which column may trigger update
   *	@param: val - array or list of true/false values
   *	@type: public
   */
  setDataColumns: function setDataColumns(val) {
    this._columns = typeof val == "string" ? val.split(",") : val;
  },

  /**
   *	@desc: get state of updating
   *	@returns:   true - all in sync with server, false - some items not updated yet.
   *	@type: public
   */
  getSyncState: function getSyncState() {
    return !this.updatedRows.length;
  },

  /**
   *	@desc: enable/disable named field for data syncing, will use column ids for grid
   *	@param:   mode - true/false
   *	@type: public
   */
  enableDataNames: function enableDataNames(mode) {
    this._endnm = !!mode;
  },

  /**
   *	@desc: enable/disable mode , when only changed fields and row id send to the server side, instead of all fields in default mode
   *	@param:   mode - true/false
   *	@type: public
   */
  enablePartialDataSend: function enablePartialDataSend(mode) {
    this._changed = !!mode;
  },

  /**
   *	@desc: set if rows should be send to server automatically
   *	@param: mode - "row" - based on row selection changed, "cell" - based on cell editing finished, "off" - manual data sending
   *	@type: public
   */
  setUpdateMode: function setUpdateMode(mode, dnd) {
    this.autoUpdate = mode == "cell";
    this.updateMode = mode;
    this.dnd = dnd;
  },
  ignore: function ignore(code, master) {
    this._silent_mode = true;
    code.call(master || window);
    this._silent_mode = false;
  },

  /**
   *	@desc: mark row as updated/normal. check mandatory fields,initiate autoupdate (if turned on)
   *	@param: rowId - id of row to set update-status for
   *	@param: state - true for "updated", false for "not updated"
   *	@param: mode - update mode name
   *	@type: public
   */
  setUpdated: function setUpdated(rowId, state, mode) {
    if (this._silent_mode) return;
    var ind = this.findRow(rowId);
    mode = mode || "updated";
    var existing = this.$scheduler.getUserData(rowId, this.action_param);
    if (existing && mode == "updated") mode = existing;

    if (state) {
      this.set_invalid(rowId, false); //clear previous error flag

      this.updatedRows[ind] = rowId;
      this.$scheduler.setUserData(rowId, this.action_param, mode);
      if (this._in_progress[rowId]) this._in_progress[rowId] = "wait";
    } else {
      if (!this.is_invalid(rowId)) {
        this.updatedRows.splice(ind, 1);
        this.$scheduler.setUserData(rowId, this.action_param, "");
      }
    }

    this.markRow(rowId, state, mode);
    if (state && this.autoUpdate) this.sendData(rowId);
  },
  markRow: function markRow(id, state, mode) {
    var str = "";
    var invalid = this.is_invalid(id);

    if (invalid) {
      str = this.styles[invalid];
      state = true;
    }

    if (this.callEvent("onRowMark", [id, state, mode, invalid])) {
      //default logic
      str = this.styles[state ? mode : "clear"] + str;

      this.$scheduler[this._methods[0]](id, str);

      if (invalid && invalid.details) {
        str += this.styles[invalid + "_cell"];

        for (var i = 0; i < invalid.details.length; i++) {
          if (invalid.details[i]) this.$scheduler[this._methods[1]](id, i, str);
        }
      }
    }
  },
  getActionByState: function getActionByState(state) {
    if (state === "inserted") {
      return "create";
    }

    if (state === "updated") {
      return "update";
    }

    if (state === "deleted") {
      return "delete";
    }

    return "update";
  },
  getState: function getState(id) {
    return this.$scheduler.getUserData(id, this.action_param);
  },
  is_invalid: function is_invalid(id) {
    return this._invalid[id];
  },
  set_invalid: function set_invalid(id, mode, details) {
    if (details) mode = {
      value: mode,
      details: details,
      toString: function toString() {
        return this.value.toString();
      }
    };
    this._invalid[id] = mode;
  },

  /**
   *	@desc: check mandatory fields and varify values of cells, initiate update (if specified)
   *	@param: rowId - id of row to set update-status for
   *	@type: public
   */
  checkBeforeUpdate: function checkBeforeUpdate(rowId) {
    return true;
  },

  /**
   *	@desc: send row(s) values to server
   *	@param: rowId - id of row which data to send. If not specified, then all "updated" rows will be send
   *	@type: public
   */
  sendData: function sendData(rowId) {
    if (this.$scheduler.editStop) this.$scheduler.editStop();
    if (typeof rowId == "undefined" || this._tSend) return this.sendAllData();
    if (this._in_progress[rowId]) return false;
    this.messages = [];
    if (!this.checkBeforeUpdate(rowId) && this.callEvent("onValidationError", [rowId, this.messages])) return false;

    this._beforeSendData(this._getRowData(rowId), rowId);
  },
  _beforeSendData: function _beforeSendData(data, rowId) {
    if (!this.callEvent("onBeforeUpdate", [rowId, this.getState(rowId), data])) return false;

    this._sendData(data, rowId);
  },
  serialize: function serialize(data, id) {
    if (this._serializeAsJson) {
      return this._serializeAsJSON(data);
    }

    if (typeof data == "string") return data;
    if (typeof id != "undefined") return this.serialize_one(data, "");else {
      var stack = [];
      var keys = [];

      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          stack.push(this.serialize_one(data[key], key + this.post_delim));
          keys.push(key);
        }
      }

      stack.push("ids=" + this.escape(keys.join(",")));
      if (this.$scheduler.security_key) stack.push("dhx_security=" + this.$scheduler.security_key);
      return stack.join("&");
    }
  },
  serialize_one: function serialize_one(data, pref) {
    if (typeof data == "string") return data;
    var stack = [];
    var serialized = "";

    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        if ((key == "id" || key == this.action_param) && this._tMode == "REST") continue;

        if (typeof data[key] === "string" || typeof data[key] === "number") {
          serialized = data[key];
        } else {
          serialized = JSON.stringify(data[key]);
        }

        stack.push(this.escape((pref || "") + key) + "=" + this.escape(serialized));
      }
    }

    return stack.join("&");
  },
  _applyPayload: function _applyPayload(url) {
    var ajax = this.$scheduler.ajax;
    if (this._payload) for (var key in this._payload) {
      url = url + ajax.urlSeparator(url) + this.escape(key) + "=" + this.escape(this._payload[key]);
    }
    return url;
  },
  _sendData: function _sendData(dataToSend, rowId) {
    if (!dataToSend) {
      return; // nothing to send
    }

    if (!this.callEvent("onBeforeDataSending", rowId ? [rowId, this.getState(rowId), dataToSend] : [null, null, dataToSend])) {
      return false;
    }

    if (rowId) {
      this._in_progress[rowId] = new Date().valueOf();
    }

    var self = this;
    var ajax = this.$scheduler.ajax;

    if (this._tMode === "CUSTOM") {
      var state = this.getState(rowId);
      var action = this.getActionByState(state);

      var _onResolvedCreateUpdate = function _onResolvedCreateUpdate(tag) {
        var resultState = state;

        if (tag && tag.responseText && tag.setRequestHeader) {
          if (tag.status !== 200) {
            resultState = "error";
          }

          try {
            tag = JSON.parse(tag.responseText);
          } catch (e) {}
        }

        resultState = resultState || "updated";
        var sid = rowId;
        var tid = rowId;

        if (tag) {
          resultState = tag.action || resultState;
          sid = tag.sid || sid;
          tid = tag.id || tag.tid || tid;
        }

        self.afterUpdateCallback(sid, tid, resultState, tag);
      };

      var routerMode = "event";
      var actionPromise;

      if (this._router instanceof Function) {
        actionPromise = this._router(routerMode, action, dataToSend, rowId);
      } else {
        switch (state) {
          case "inserted":
            actionPromise = this._router[routerMode].create(dataToSend);
            break;

          case "deleted":
            actionPromise = this._router[routerMode]["delete"](rowId);
            break;

          default:
            actionPromise = this._router[routerMode].update(dataToSend, rowId);
            break;
        }
      }

      if (actionPromise) {
        // neither promise nor {tid: newId} response object
        if (!actionPromise.then && actionPromise.id === undefined && actionPromise.tid === undefined && actionPromise.action === undefined) {
          throw new Error("Incorrect router return value. A Promise or a response object is expected");
        }

        if (actionPromise.then) {
          actionPromise.then(_onResolvedCreateUpdate)["catch"](function (error) {
            if (error && error.action) {
              _onResolvedCreateUpdate(error);
            } else {
              _onResolvedCreateUpdate({
                action: "error",
                value: error
              });
            }
          });
        } else {
          // custom method may return a response object in case of sync action
          _onResolvedCreateUpdate(actionPromise);
        }
      } else {
        _onResolvedCreateUpdate(null);
      }

      return;
    }

    var queryParams = {
      callback: function callback(xml) {
        var ids = [];

        if (rowId) {
          ids.push(rowId);
        } else if (dataToSend) {
          for (var key in dataToSend) {
            ids.push(key);
          }
        }

        return self.afterUpdate(self, xml, ids);
      },
      headers: self._headers
    };
    var urlParams = this.serverProcessor + (this._user ? ajax.urlSeparator(this.serverProcessor) + ["dhx_user=" + this._user, "dhx_version=" + this.$scheduler.getUserData(0, "version")].join("&") : "");

    var url = this._applyPayload(urlParams);

    var data;

    switch (this._tMode) {
      case "GET":
        data = this._cleanupArgumentsBeforeSend(dataToSend);
        queryParams.url = url + ajax.urlSeparator(url) + this.serialize(data, rowId);
        queryParams.method = "GET";
        break;

      case "POST":
        data = this._cleanupArgumentsBeforeSend(dataToSend);
        queryParams.url = url;
        queryParams.method = "POST";
        queryParams.data = this.serialize(data, rowId);
        break;

      case "JSON":
        data = {};

        var preprocessedData = this._cleanupItemBeforeSend(dataToSend);

        for (var key in preprocessedData) {
          if (key === this.action_param || key === "id" || key === "gr_id") {
            continue;
          }

          data[key] = preprocessedData[key];
        }

        queryParams.url = url;
        queryParams.method = "POST";
        queryParams.data = JSON.stringify({
          id: rowId,
          action: dataToSend[this.action_param],
          data: data
        });
        break;

      case "REST":
      case "REST-JSON":
        url = urlParams.replace(/(&|\?)editing=true/, "");
        data = "";

        switch (this.getState(rowId)) {
          case "inserted":
            queryParams.method = "POST";
            queryParams.data = this.serialize(dataToSend, rowId);
            break;

          case "deleted":
            queryParams.method = "DELETE";
            url = url + (url.slice(-1) === "/" ? "" : "/") + rowId;
            break;

          default:
            queryParams.method = "PUT";
            queryParams.data = this.serialize(dataToSend, rowId);
            url = url + (url.slice(-1) === "/" ? "" : "/") + rowId;
            break;
        }

        queryParams.url = this._applyPayload(url);
        break;
    }

    this._waitMode++;
    return ajax.query(queryParams);
  },
  sendAllData: function sendAllData() {
    if (!this.updatedRows.length || this.updateMode === "off") {
      // FIXME: need to leave checking 'this.updateMode === "off"'?
      return;
    }

    this.messages = [];
    var valid = true;

    this._forEachUpdatedRow(function (rowId) {
      valid = valid && this.checkBeforeUpdate(rowId);
    });

    if (!valid && !this.callEvent("onValidationError", ["", this.messages])) {
      return false;
    }

    if (this._tSend) {
      this._sendData(this._getAllData());
    } else {
      this._forEachUpdatedRow(function (rowId) {
        if (!this._in_progress[rowId]) {
          if (this.is_invalid(rowId)) {
            return;
          }

          this._beforeSendData(this._getRowData(rowId), rowId);
        }
      });
    }
  },
  _getAllData: function _getAllData(rowId) {
    var out = {};
    var has_one = false;

    this._forEachUpdatedRow(function (id) {
      if (this._in_progress[id] || this.is_invalid(id)) {
        return;
      }

      var row = this._getRowData(id);

      if (!this.callEvent("onBeforeUpdate", [id, this.getState(id), row])) {
        return;
      }

      out[id] = row;
      has_one = true;
      this._in_progress[id] = new Date().valueOf();
    });

    return has_one ? out : null;
  },
  findRow: function findRow(pattern) {
    var i = 0;

    for (i = 0; i < this.updatedRows.length; i++) {
      if (pattern == this.updatedRows[i]) break;
    }

    return i;
  },

  /**
   *	@desc: define custom actions
   *	@param: name - name of action, same as value of action attribute
   *	@param: handler - custom function, which receives a XMl response content for action
   *	@type: private
   */
  defineAction: function defineAction(name, handler) {
    if (!this._uActions) this._uActions = {};
    this._uActions[name] = handler;
  },

  /**
   *	 @desc: used in combination with setOnBeforeUpdateHandler to create custom client-server transport system
   *	 @param: sid - id of item before update
   *	 @param: tid - id of item after up0ate
   *	 @param: action - action name
   *	 @type: public
   *	 @topic: 0
   */
  afterUpdateCallback: function afterUpdateCallback(sid, tid, action, btag) {
    if (!this.$scheduler) {
      // destructor has been called before the callback
      return;
    }

    var marker = sid;
    var correct = action !== "error" && action !== "invalid";

    if (!correct) {
      this.set_invalid(sid, action);
    }

    if (this._uActions && this._uActions[action] && !this._uActions[action](btag)) {
      return delete this._in_progress[marker];
    }

    if (this._in_progress[marker] !== "wait") {
      this.setUpdated(sid, false);
    }

    var originalSid = sid;

    switch (action) {
      case "inserted":
      case "insert":
        if (tid != sid) {
          this.setUpdated(sid, false);

          this.$scheduler[this._methods[2]](sid, tid);

          sid = tid;
        }

        break;

      case "delete":
      case "deleted":
        this.$scheduler.setUserData(sid, this.action_param, "true_deleted");

        this.$scheduler[this._methods[3]](sid, tid);

        delete this._in_progress[marker];
        return this.callEvent("onAfterUpdate", [sid, action, tid, btag]);
    }

    if (this._in_progress[marker] !== "wait") {
      if (correct) {
        this.$scheduler.setUserData(sid, this.action_param, "");
      }

      delete this._in_progress[marker];
    } else {
      delete this._in_progress[marker];
      this.setUpdated(tid, true, this.$scheduler.getUserData(sid, this.action_param));
    }

    this.callEvent("onAfterUpdate", [originalSid, action, tid, btag]);
  },
  _errorResponse: function _errorResponse(xml, id) {
    if (this.$scheduler && this.$scheduler.callEvent) {
      this.$scheduler.callEvent("onSaveError", [id, xml.xmlDoc]);
    }

    return this.cleanUpdate(id);
  },
  _setDefaultTransactionMode: function _setDefaultTransactionMode() {
    if (this.serverProcessor) {
      this.setTransactionMode("POST", true);
      this.serverProcessor += (this.serverProcessor.indexOf("?") !== -1 ? "&" : "?") + "editing=true";
      this._serverProcessor = this.serverProcessor;
    }
  },

  /**
   *	@desc: response from server
   *	@param: xml - XMLLoader object with response XML
   *	@type: private
   */
  afterUpdate: function afterUpdate(that, xml, id) {
    var ajax = this.$scheduler.ajax;

    if (xml.xmlDoc.status !== 200) {
      this._errorResponse(xml, id);

      return;
    } // try to use json first


    var tag;

    try {
      tag = JSON.parse(xml.xmlDoc.responseText);
    } catch (e) {
      // empty response also can be processed by json handler
      if (!xml.xmlDoc.responseText.length) {
        tag = {};
      }
    }

    if (tag) {
      var action = tag.action || this.getState(id) || "updated";
      var sid = tag.sid || id[0];
      var tid = tag.tid || id[0];
      that.afterUpdateCallback(sid, tid, action, tag);
      that.finalizeUpdate();
      return;
    } // xml response


    var top = ajax.xmltop("data", xml.xmlDoc); // fix incorrect content type in IE

    if (!top) {
      return this._errorResponse(xml, id);
    }

    var atag = ajax.xpath("//data/action", top);

    if (!atag.length) {
      return this._errorResponse(xml, id);
    }

    for (var i = 0; i < atag.length; i++) {
      var btag = atag[i];
      var action = btag.getAttribute("type");
      var sid = btag.getAttribute("sid");
      var tid = btag.getAttribute("tid");
      that.afterUpdateCallback(sid, tid, action, btag);
    }

    that.finalizeUpdate();
  },
  cleanUpdate: function cleanUpdate(id) {
    if (id) for (var i = 0; i < id.length; i++) {
      delete this._in_progress[id[i]];
    }
  },
  finalizeUpdate: function finalizeUpdate() {
    if (this._waitMode) this._waitMode--;
    this.callEvent("onAfterUpdateFinish", []);
    if (!this.updatedRows.length) this.callEvent("onFullSync", []);
  },

  /**
   *	@desc: initializes data-processor
   *	@param: scheduler - dhtmlxScheduler object to attach this data-processor to
   *	@type: public
   */
  init: function init(scheduler) {
    if (this._initialized) {
      return;
    }

    this.$scheduler = scheduler;

    if (this.$scheduler._dp_init) {
      this.$scheduler._dp_init(this);
    }

    this._setDefaultTransactionMode();

    this._methods = this._methods || ["_set_event_text_style", "", "_dp_change_event_id", "_dp_hook_delete"];
    Object(_dataprocessor_hooks__WEBPACK_IMPORTED_MODULE_0__["extendScheduler"])(this.$scheduler, this);
    var dataProcessorEvents = new _dataprocessor_hooks__WEBPACK_IMPORTED_MODULE_0__["default"](this.$scheduler, this);
    dataProcessorEvents.attach();
    this.attachEvent("onDestroy", function () {
      delete this._getRowData;
      delete this.$scheduler._dp;
      delete this.$scheduler._dataprocessor;
      delete this.$scheduler._set_event_text_style;
      delete this.$scheduler._dp_change_event_id;
      delete this.$scheduler._dp_hook_delete;
      delete this.$scheduler;
      dataProcessorEvents.detach();
    });
    this.$scheduler.callEvent("onDataProcessorReady", [this]);
    this._initialized = true;
    scheduler._dataprocessor = this;
  },
  setOnAfterUpdate: function setOnAfterUpdate(ev) {
    this.attachEvent("onAfterUpdate", ev);
  },
  setOnBeforeUpdateHandler: function setOnBeforeUpdateHandler(func) {
    this.attachEvent("onBeforeDataSending", func);
  },

  /* starts autoupdate mode
  	@param interval time interval for sending update requests
  */
  setAutoUpdate: function setAutoUpdate(interval, user) {
    interval = interval || 2000;
    this._user = user || new Date().valueOf();
    this._need_update = false; //this._loader = null;

    this._update_busy = false;
    this.attachEvent("onAfterUpdate", function (sid, action, tid, xml_node) {
      this.afterAutoUpdate(sid, action, tid, xml_node);
    });
    this.attachEvent("onFullSync", function () {
      this.fullSync();
    });
    var self = this;
    _global__WEBPACK_IMPORTED_MODULE_2__["default"].setInterval(function () {
      self.loadUpdate();
    }, interval);
  },

  /* process updating request answer
  	if status == collision version is deprecated
  	set flag for autoupdating immediately
  */
  afterAutoUpdate: function afterAutoUpdate(sid, action, tid, xml_node) {
    if (action == 'collision') {
      this._need_update = true;
      return false;
    } else {
      return true;
    }
  },

  /* callback function for onFillSync event
  	call update function if it's need
  */
  fullSync: function fullSync() {
    if (this._need_update) {
      this._need_update = false;
      this.loadUpdate();
    }

    return true;
  },

  /* sends query to the server and call callback function
  */
  getUpdates: function getUpdates(url, callback) {
    var ajax = this.$scheduler.ajax;
    if (this._update_busy) return false;else this._update_busy = true;
    ajax.get(url, callback);
  },

  /* returns xml node value
  	@param node
  		xml node
  */
  _getXmlNodeValue: function _getXmlNodeValue(node) {
    if (node.firstChild) {
      return node.firstChild.nodeValue;
    }

    return "";
  },

  /* loads updates and processes them
  */
  loadUpdate: function loadUpdate() {
    var self = this;
    var ajax = this.$scheduler.ajax;
    var version = this.$scheduler.getUserData(0, "version");
    var url = this.serverProcessor + ajax.urlSeparator(this.serverProcessor) + ["dhx_user=" + this._user, "dhx_version=" + version].join("&");
    url = url.replace("editing=true&", "");
    this.getUpdates(url, function (xml) {
      var vers = ajax.xpath("//userdata", xml);
      self.$scheduler.setUserData(0, "version", self._getXmlNodeValue(vers[0]));
      var updates = ajax.xpath("//update", xml);

      if (updates.length) {
        self._silent_mode = true;

        for (var i = 0; i < updates.length; i++) {
          var status = updates[i].getAttribute("status");
          var id = updates[i].getAttribute("id");
          var parent = updates[i].getAttribute("parent");

          switch (status) {
            case "inserted":
              this.callEvent("insertCallback", [updates[i], id, parent]);
              break;

            case "updated":
              this.callEvent("updateCallback", [updates[i], id, parent]);
              break;

            case "deleted":
              this.callEvent("deleteCallback", [updates[i], id, parent]);
              break;
          }
        }

        self._silent_mode = false;
      }

      self._update_busy = false;
      self = null;
    });
  },
  destructor: function destructor() {
    this.callEvent("onDestroy", []);
    this.detachAllEvents();
    this.updatedRows = [];
    this._in_progress = {};
    this._invalid = {};
    this._headers = null;
    this._payload = null;
    delete this._initialized;
  },
  url: function url(_url) {
    this.serverProcessor = this._serverProcessor = _url;
  },
  _serializeAsJSON: function _serializeAsJSON(data) {
    if (typeof data === "string") {
      return data;
    }

    var copy = this.$scheduler.utils.copy(data);

    if (this._tMode === "REST-JSON") {
      delete copy.id;
      delete copy[this.action_param];
    }

    return JSON.stringify(copy);
  },
  // GET/POST/JSON modes of the dataProcessor didn't send the whole data items in 'delete' requests
  // clear extra info from the data in order not to change the request format
  _cleanupArgumentsBeforeSend: function _cleanupArgumentsBeforeSend(dataToSend) {
    var processedData;

    if (dataToSend[this.action_param] === undefined) {
      // hash of updated items, and not an individual item
      processedData = {};

      for (var i in dataToSend) {
        processedData[i] = this._cleanupArgumentsBeforeSend(dataToSend[i]);
      }
    } else {
      processedData = this._cleanupItemBeforeSend(dataToSend);
    }

    return processedData;
  },
  _cleanupItemBeforeSend: function _cleanupItemBeforeSend(updatedItem) {
    var output = null;

    if (updatedItem) {
      if (updatedItem[this.action_param] === "deleted") {
        output = {};
        output.id = updatedItem.id;
        output[this.action_param] = updatedItem[this.action_param];
      } else {
        output = updatedItem;
      }
    }

    return output;
  },
  _forEachUpdatedRow: function _forEachUpdatedRow(code) {
    var updatedRows = this.updatedRows.slice();

    for (var i = 0; i < updatedRows.length; i++) {
      var rowId = updatedRows[i];

      if (this.$scheduler.getUserData(rowId, this.action_param)) {
        code.call(this, rowId);
      }
    }
  },
  _prepareDataItem: function _prepareDataItem(item) {
    var processedItem = {};
    var scheduler = this.$scheduler;
    var copy = scheduler.utils.copy(item);

    for (var i in copy) {
      if (i.indexOf("_") === 0) {
        continue;
      } else if (copy[i]) {
        if (copy[i].getUTCFullYear) {
          processedItem[i] = scheduler._helpers.formatDate(copy[i]);
        } else if (_typeof(copy[i]) == "object") {
          processedItem[i] = this._prepareDataItem(copy[i]);
        } else if (copy[i] === null) {
          processedItem[i] = "";
        } else {
          processedItem[i] = copy[i];
        }
      }
    }

    processedItem[this.action_param] = scheduler.getUserData(item.id, this.action_param);
    return processedItem;
  },
  _getRowData: function _getRowData(id) {
    var dataItem = this.$scheduler.getEvent(id);

    if (!dataItem) {
      dataItem = {
        id: id
      };
    }

    return this._prepareDataItem(dataItem);
  }
};
function extend(scheduler) {
  scheduler.createDataProcessor = function (config) {
    var router;
    var tMode;

    if (config instanceof Function) {
      router = config;
    } else if (config.hasOwnProperty("router")) {
      router = config.router;
    } else if (config.hasOwnProperty("event")) {
      router = config;
    }

    if (router) {
      tMode = "CUSTOM";
    } else {
      tMode = config.mode || "REST-JSON";
    }

    var dp = new DataProcessor(config.url);
    dp.init(scheduler);
    dp.setTransactionMode({
      mode: tMode,
      router: router
    }, config.batchUpdate); // FIXME: config.batchUpdate where it is explained?

    return dp;
  };

  scheduler.DataProcessor = DataProcessor;
} //var dataProcessor = global.dataProcessor = DataProcessor; // for old

/***/ }),

/***/ "./sources/core/dataprocessor/dataprocessor_hooks.js":
/*!***********************************************************!*\
  !*** ./sources/core/dataprocessor/dataprocessor_hooks.js ***!
  \***********************************************************/
/*! exports provided: default, extendScheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DataProcessorEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extendScheduler", function() { return extendScheduler; });
function DataProcessorEvents(scheduler, dp) {
  this.$scheduler = scheduler;
  this.$dp = dp;
  this._dataProcessorHandlers = [];

  this.attach = function () {
    var dp = this.$dp;
    var scheduler = this.$scheduler;

    this._dataProcessorHandlers.push(scheduler.attachEvent("onEventAdded", function (id) {
      if (!this._loading && this._validId(id)) dp.setUpdated(id, true, "inserted");
    }));

    this._dataProcessorHandlers.push(scheduler.attachEvent("onConfirmedBeforeEventDelete", function (id) {
      if (!this._validId(id)) return;
      var z = dp.getState(id);

      if (z == "inserted" || this._new_event) {
        dp.setUpdated(id, false);
        return true;
      }

      if (z == "deleted") return false;
      if (z == "true_deleted") return true;
      dp.setUpdated(id, true, "deleted");
      return false;
    }));

    this._dataProcessorHandlers.push(scheduler.attachEvent("onEventChanged", function (id) {
      if (!this._loading && this._validId(id)) dp.setUpdated(id, true, "updated");
    }));

    this._dataProcessorHandlers.push(scheduler.attachEvent("onClearAll", function () {
      // clear dataprocessor state when scheduler is reset
      dp._in_progress = {};
      dp._invalid = {};
      dp.updatedRows = [];
      dp._waitMode = 0;
    }));

    dp.attachEvent("insertCallback", scheduler._update_callback);
    dp.attachEvent("updateCallback", scheduler._update_callback);
    dp.attachEvent("deleteCallback", function (upd, id) {
      if (scheduler.getEvent(id)) {
        scheduler.setUserData(id, this.action_param, "true_deleted");
        scheduler.deleteEvent(id);
      } else if (scheduler._add_rec_marker) scheduler._update_callback(upd, id);
    });
  };

  this.detach = function () {
    for (var key in this._dataProcessorHandlers) {
      var handler = this._dataProcessorHandlers[key];
      this.$scheduler.detachEvent(handler);
    }

    this._dataProcessorHandlers = [];
  };
}
function extendScheduler(scheduler, dp) {
  scheduler._validId = function (id) {
    return true;
  };

  scheduler.setUserData = function (id, name, value) {
    if (id) {
      var ev = this.getEvent(id);
      if (ev) ev[name] = value;
    } else {
      this._userdata[name] = value;
    }
  };

  scheduler.getUserData = function (id, name) {
    if (id) {
      var ev = this.getEvent(id);
      if (ev) return ev[name];else return null;
    } else {
      return this._userdata[name];
    }
  };

  scheduler._set_event_text_style = function (id, style) {
    if (!scheduler.getEvent(id)) return;
    this.for_rendered(id, function (r) {
      r.style.cssText += ";" + style;
    });
    var ev = this.getEvent(id);
    ev["_text_style"] = style;
    this.event_updated(ev);
  };

  scheduler._update_callback = function (upd, id) {
    var data = scheduler._xmlNodeToJSON(upd.firstChild); //fix for updates of recurring events


    if (data.rec_type == "none") data.rec_pattern = "none";
    data.text = data.text || data._tagvalue;
    data.start_date = scheduler._helpers.parseDate(data.start_date);
    data.end_date = scheduler._helpers.parseDate(data.end_date);
    scheduler.addEvent(data);
    if (scheduler._add_rec_marker) scheduler.setCurrentView();
  };

  scheduler._dp_change_event_id = function (id, new_id) {
    if (!scheduler.getEvent(id)) return;
    scheduler.changeEventId(id, new_id);
  };

  scheduler._dp_hook_delete = function (id, new_id) {
    if (!scheduler.getEvent(id)) return;

    if (new_id && id != new_id) {
      if (this.getUserData(id, dp.action_param) == "true_deleted") this.setUserData(id, dp.action_param, "updated");
      this.changeEventId(id, new_id);
    }

    return this.deleteEvent(new_id, true);
  };

  scheduler.setDp = function () {
    this._dp = dp;
  };

  scheduler.setDp();
}

/***/ }),

/***/ "./sources/core/delay_render.js":
/*!**************************************!*\
  !*** ./sources/core/delay_render.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../global */ "./sources/global.js");

function extend(scheduler) {
  (function () {
    var setCurrentView = scheduler.setCurrentView,
        updateView = scheduler.updateView;
    var update_view_timer = null,
        curr_view_timer = null;

    var lazy_setCurrentView = function lazy_setCurrentView(date, mode) {
      var self = this;
      _global__WEBPACK_IMPORTED_MODULE_0__["default"].clearTimeout(curr_view_timer);
      _global__WEBPACK_IMPORTED_MODULE_0__["default"].clearTimeout(update_view_timer);
      var oldDate = self._date,
          oldMode = self._mode;
      updateFlags(this, date, mode);
      curr_view_timer = setTimeout(function () {
        if (!self.callEvent("onBeforeViewChange", [oldMode, oldDate, mode || self._mode, date || self._date])) {
          updateFlags(self, oldDate, oldMode);
          return;
        }

        updateView.call(self, date, mode);
        self.callEvent("onViewChange", [self._mode, self._date]);
        _global__WEBPACK_IMPORTED_MODULE_0__["default"].clearTimeout(update_view_timer);
        curr_view_timer = 0;
      }, scheduler.config.delay_render);
    };

    var lazy_updateView = function lazy_updateView(date, mode) {
      var self = this,
          ars = arguments;
      updateFlags(this, date, mode);
      _global__WEBPACK_IMPORTED_MODULE_0__["default"].clearTimeout(update_view_timer);
      update_view_timer = setTimeout(function () {
        if (curr_view_timer) return;
        updateView.apply(self, ars);
      }, scheduler.config.delay_render);
    };

    function updateFlags(scheduler, date, mode) {
      if (date) scheduler._date = date;
      if (mode) scheduler._mode = mode;
    }

    scheduler.attachEvent("onSchedulerReady", function () {
      if (scheduler.config.delay_render) {
        scheduler.setCurrentView = lazy_setCurrentView;
        scheduler.updateView = lazy_updateView;
      } else {
        scheduler.setCurrentView = setCurrentView;
        scheduler.updateView = updateView;
      }
    });
  })();
}

/***/ }),

/***/ "./sources/core/destructor.js":
/*!************************************!*\
  !*** ./sources/core/destructor.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
function extend(scheduler) {
  scheduler.destructor = function () {
    scheduler.callEvent("onDestroy", []);
    this.clearAll();

    if (this.$container) {
      // FIXME: clear container or remove container
      this.$container.innerHTML = ""; // scheduler.$domHelpers.remove(this.$container);
    }

    if (this._eventRemoveAll) {
      this._eventRemoveAll();
    }

    if (this.resetLightbox) {
      this.resetLightbox();
    }

    if (this._dp && this._dp.destructor) {
      this._dp.destructor();
    } // detachAllEvents should be called last, because in components may be attached events


    this.detachAllEvents();

    for (var i in this) {
      if (i.indexOf("$") === 0) {
        delete this[i];
      }
    }

    scheduler.$destroyed = true;
  };
}

/***/ }),

/***/ "./sources/core/dhtmlx/dhtmlx_suite_hooks.js":
/*!***************************************************!*\
  !*** ./sources/core/dhtmlx/dhtmlx_suite_hooks.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
function extend(scheduler) {
  scheduler.getRootView = function () {
    return {
      view: {
        render: function render() {
          return {
            tag: "div",
            type: 1,
            attrs: {
              style: "width:100%;height:100%;"
            },
            hooks: {
              "didInsert": function didInsert() {
                scheduler.setCurrentView();
              }
            },
            body: [{
              el: this.el,
              type: 1
            }]
          };
        },
        init: function init() {
          var container = document.createElement("DIV");
          container.id = "scheduler_" + scheduler.uid();
          container.style.width = "100%";
          container.style.height = "100%";
          container.classList.add("dhx_cal_container");
          container.cmp = "grid";
          container.innerHTML = '<div class="dhx_cal_navline">' + '<div class="dhx_cal_prev_button">&nbsp;</div>' + '<div class="dhx_cal_next_button">&nbsp;</div>' + '<div class="dhx_cal_today_button"></div>' + '<div class="dhx_cal_date"></div>' + '<div class="dhx_cal_tab" data-tab="day"></div>' + '<div class="dhx_cal_tab" data-tab="week"></div>' + '<div class="dhx_cal_tab" data-tab="month"></div>' + '</div>' + '<div class="dhx_cal_header">' + '</div>' + '<div class="dhx_cal_data">' + '</div>';
          scheduler.init(container);
          this.el = container;
        }
      },
      type: 4
    };
  };
}

/***/ }),

/***/ "./sources/core/event.js":
/*!*******************************!*\
  !*** ./sources/core/event.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function extend(scheduler) {
  scheduler._events = {};

  scheduler.clearAll = function () {
    this._events = {};
    this._loaded = {};
    this._edit_id = null;
    this._select_id = null;
    this._drag_id = null;
    this._drag_mode = null;
    this._drag_pos = null;
    this._new_event = null;
    this.clear_view();
    this.callEvent("onClearAll", []);
  };

  scheduler.addEvent = function (start_date, end_date, text, id, extra_data) {
    if (!arguments.length) return this.addEventNow();
    var ev = start_date;

    if (arguments.length != 1) {
      ev = extra_data || {};
      ev.start_date = start_date;
      ev.end_date = end_date;
      ev.text = text;
      ev.id = id;
    }

    ev.id = ev.id || scheduler.uid();
    ev.text = ev.text || "";
    if (typeof ev.start_date == "string") ev.start_date = this.templates.api_date(ev.start_date);
    if (typeof ev.end_date == "string") ev.end_date = this.templates.api_date(ev.end_date);
    var d = (this.config.event_duration || this.config.time_step) * 60000;
    if (ev.start_date.valueOf() == ev.end_date.valueOf()) ev.end_date.setTime(ev.end_date.valueOf() + d);
    ev.start_date.setMilliseconds(0);
    ev.end_date.setMilliseconds(0);
    ev._timed = this.isOneDayEvent(ev);
    var is_new = !this._events[ev.id];
    this._events[ev.id] = ev;
    this.event_updated(ev);
    if (!this._loading) this.callEvent(is_new ? "onEventAdded" : "onEventChanged", [ev.id, ev]);
    return ev.id;
  };

  scheduler.deleteEvent = function (id, silent) {
    var ev = this._events[id];
    if (!silent && (!this.callEvent("onBeforeEventDelete", [id, ev]) || !this.callEvent("onConfirmedBeforeEventDelete", [id, ev]))) return;

    if (ev) {
      if (scheduler.getState().select_id == id) {
        scheduler.unselect();
      }

      delete this._events[id];
      this.event_updated(ev);

      if (this._drag_id == ev.id) {
        this._drag_id = null;
        this._drag_mode = null;
        this._drag_pos = null;
      }
    }

    this.callEvent("onEventDeleted", [id, ev]);
  };

  scheduler.getEvent = function (id) {
    return this._events[id];
  };

  scheduler.setEvent = function (id, hash) {
    if (!hash.id) hash.id = id;
    this._events[id] = hash;
  };

  scheduler.for_rendered = function (id, method) {
    for (var i = this._rendered.length - 1; i >= 0; i--) {
      if (this._rendered[i].getAttribute(this.config.event_attribute) == id) method(this._rendered[i], i);
    }
  };

  scheduler.changeEventId = function (id, new_id) {
    if (id == new_id) return;
    var ev = this._events[id];

    if (ev) {
      ev.id = new_id;
      this._events[new_id] = ev;
      delete this._events[id];
    }

    this.for_rendered(id, function (r) {
      r.setAttribute("event_id", new_id); // for backward compatibility

      r.setAttribute(scheduler.config.event_attribute, new_id);
    });
    if (this._select_id == id) this._select_id = new_id;
    if (this._edit_id == id) this._edit_id = new_id; //if (this._drag_id==id) this._drag_id=new_id;

    this.callEvent("onEventIdChange", [id, new_id]);
  };

  (function () {
    var attrs = ["text", "Text", "start_date", "StartDate", "end_date", "EndDate"];

    var create_getter = function create_getter(name) {
      return function (id) {
        return scheduler.getEvent(id)[name];
      };
    };

    var create_setter = function create_setter(name) {
      return function (id, value) {
        var ev = scheduler.getEvent(id);
        ev[name] = value;
        ev._changed = true;
        ev._timed = this.isOneDayEvent(ev);
        scheduler.event_updated(ev, true);
      };
    };

    for (var i = 0; i < attrs.length; i += 2) {
      scheduler["getEvent" + attrs[i + 1]] = create_getter(attrs[i]);
      scheduler["setEvent" + attrs[i + 1]] = create_setter(attrs[i]);
    }
  })();

  scheduler.event_updated = function (ev, force) {
    if (this.is_visible_events(ev)) this.render_view_data();else this.clear_event(ev.id);
  };

  scheduler.is_visible_events = function (ev) {
    if (!this._min_date || !this._max_date) {
      return false;
    } //if in displayed dates


    var in_visible_range = ev.start_date.valueOf() < this._max_date.valueOf() && this._min_date.valueOf() < ev.end_date.valueOf();

    if (in_visible_range) {
      //end dates are not between last/first hours
      var evFirstHour = ev.start_date.getHours(),
          evLastHour = ev.end_date.getHours() + ev.end_date.getMinutes() / 60,
          lastHour = this.config.last_hour,
          firstHour = this.config.first_hour;
      var end_dates_visible = this._table_view || !((evLastHour > lastHour || evLastHour <= firstHour) && (evFirstHour >= lastHour || evFirstHour < firstHour));

      if (end_dates_visible) {
        return true;
      } else {
        //event is bigger than area hidden between last/first hours
        var event_duration = (ev.end_date.valueOf() - ev.start_date.valueOf()) / (1000 * 60 * 60),
            //hours
        hidden_duration = 24 - (this.config.last_hour - this.config.first_hour);
        return !!(event_duration > hidden_duration || evFirstHour < lastHour && evLastHour > firstHour);
      }
    } else {
      return false;
    }
  };

  scheduler.isOneDayEvent = function (ev) {
    // decrease by one ms so events that ends on midnight on the next day were still considered one day events
    // e.g. (09-02-2018 19:00 - 10-02-2018 00:00)
    // events >= 24h long are considered multiday
    var checkEndDate = new Date(ev.end_date.valueOf() - 1);
    return ev.start_date.getFullYear() === checkEndDate.getFullYear() && ev.start_date.getMonth() === checkEndDate.getMonth() && ev.start_date.getDate() === checkEndDate.getDate() && ev.end_date.valueOf() - ev.start_date.valueOf() < 1000 * 60 * 60 * 24;
  };

  scheduler.get_visible_events = function (only_timed) {
    //not the best strategy for sure
    var stack = [];

    for (var id in this._events) {
      if (this.is_visible_events(this._events[id])) if (!only_timed || this._events[id]._timed) if (this.filter_event(id, this._events[id])) stack.push(this._events[id]);
    }

    return stack;
  };

  scheduler.filter_event = function (id, ev) {
    var filter = this["filter_" + this._mode];
    return filter ? filter(id, ev) : true;
  };

  scheduler._is_main_area_event = function (ev) {
    return !!ev._timed;
  };

  scheduler.render_view_data = function (evs, hold) {
    var full = false;

    if (!evs) {
      full = true;

      if (this._not_render) {
        this._render_wait = true;
        return;
      }

      this._render_wait = false;
      this.clear_view();
      evs = this.get_visible_events(!(this._table_view || this.config.multi_day));
    }

    for (var i = 0, len = evs.length; i < len; i++) {
      this._recalculate_timed(evs[i]);
    }

    if (this.config.multi_day && !this._table_view) {
      var tvs = [];
      var tvd = [];

      for (var i = 0; i < evs.length; i++) {
        if (this._is_main_area_event(evs[i])) tvs.push(evs[i]);else tvd.push(evs[i]);
      }

      if (!this._els['dhx_multi_day']) {
        var message = scheduler._commonErrorMessages.unknownView(this._mode);

        throw new Error(message);
      } // multiday events


      this._rendered_location = this._els['dhx_multi_day'][0];
      this._table_view = true;
      this.render_data(tvd, hold);
      this._table_view = false; // normal events

      this._rendered_location = this._els['dhx_cal_data'][0];
      this._table_view = false;
      this.render_data(tvs, hold);
    } else {
      var buffer = document.createDocumentFragment();
      var renderedLocation = this._els['dhx_cal_data'][0];
      this._rendered_location = buffer;
      this.render_data(evs, hold);
      renderedLocation.appendChild(buffer);
      this._rendered_location = renderedLocation;
    }

    if (full) {
      this.callEvent("onDataRender", []);
    }
  };

  scheduler._view_month_day = function (e) {
    var date = scheduler.getActionData(e).date;
    if (!scheduler.callEvent("onViewMoreClick", [date])) return;
    scheduler.setCurrentView(date, "day");
  };

  scheduler._render_month_link = function (ev) {
    var parent = this._rendered_location;

    var toRender = this._lame_clone(ev); //render links in each cell of multiday events


    for (var d = ev._sday; d < ev._eday; d++) {
      toRender._sday = d;
      toRender._eday = d + 1;
      var date = scheduler.date;
      var curr = scheduler._min_date;
      curr = date.add(curr, toRender._sweek, "week");
      curr = date.add(curr, toRender._sday, "day");
      var count = scheduler.getEvents(curr, date.add(curr, 1, "day")).length;

      var pos = this._get_event_bar_pos(toRender);

      var widt = pos.x2 - pos.x;
      var el = document.createElement("div");
      scheduler.event(el, "click", function (e) {
        scheduler._view_month_day(e);
      });
      el.className = "dhx_month_link";
      el.style.top = pos.y + "px";
      el.style.left = pos.x + "px";
      el.style.width = widt + "px";
      el.innerHTML = scheduler.templates.month_events_link(curr, count);

      this._rendered.push(el);

      parent.appendChild(el);
    }
  };

  scheduler._recalculate_timed = function (id) {
    if (!id) return;
    var ev;
    if (_typeof(id) != "object") ev = this._events[id];else ev = id;
    if (!ev) return;
    ev._timed = scheduler.isOneDayEvent(ev);
  };

  scheduler.attachEvent("onEventChanged", scheduler._recalculate_timed);
  scheduler.attachEvent("onEventAdded", scheduler._recalculate_timed);

  scheduler.render_data = function (evs, hold) {
    evs = this._pre_render_events(evs, hold);
    var containers = {};

    for (var i = 0; i < evs.length; i++) {
      if (this._table_view) {
        if (scheduler._mode != 'month') {
          this.render_event_bar(evs[i]); //may be multiday section on other views
        } else {
          var max_evs = scheduler.config.max_month_events;

          if (max_evs !== max_evs * 1 || evs[i]._sorder < max_evs) {
            //of max number events per month cell is set and event can be rendered
            this.render_event_bar(evs[i]);
          } else if (max_evs !== undefined && evs[i]._sorder == max_evs) {
            //render 'view more' links
            scheduler._render_month_link(evs[i]);
          } else {//do not render events with ordinal number > maximum events per cell
          }
        }
      } else {
        var ev = evs[i];
        var parent = scheduler.locate_holder(ev._sday);
        if (!parent) continue; //attempt to render non-visible event

        if (!containers[ev._sday]) {
          containers[ev._sday] = {
            real: parent,
            buffer: document.createDocumentFragment(),
            width: parent.clientWidth
          };
        }

        var container = containers[ev._sday];
        this.render_event(ev, container.buffer, container.width);
      }
    }

    for (var i in containers) {
      var container = containers[i];

      if (container.real && container.buffer) {
        container.real.appendChild(container.buffer);
      }
    }
  };

  scheduler._get_first_visible_cell = function (cells) {
    for (var i = 0; i < cells.length; i++) {
      if ((cells[i].className || "").indexOf("dhx_scale_ignore") == -1) {
        return cells[i];
      }
    } // if no visible cell found, return cells[0] to be more tolerant, since it's the original logic


    return cells[0];
  };

  scheduler._pre_render_events = function (evs, hold) {
    var hb = this.xy.bar_height;
    var h_old = this._colsS.heights;
    var h = this._colsS.heights = [0, 0, 0, 0, 0, 0, 0];
    var data = this._els["dhx_cal_data"][0];

    if (!this._table_view) {
      evs = this._pre_render_events_line(evs, hold); //ignore long events for now
    } else {
      evs = this._pre_render_events_table(evs, hold);
    }

    if (this._table_view) {
      if (hold) this._colsS.heights = h_old;else {
        var evl = data.firstChild;

        if (evl.rows) {
          for (var i = 0; i < evl.rows.length; i++) {
            h[i]++;
            var cells = evl.rows[i].cells;
            var cellHeight = this._colsS.height - this.xy.month_head_height;

            if (h[i] * hb > cellHeight) {
              // 22 - height of cell's header
              //we have overflow, update heights
              var cHeight = cellHeight;

              if (this.config.max_month_events * 1 !== this.config.max_month_events || h[i] <= this.config.max_month_events) {
                cHeight = h[i] * hb;
              } else if ((this.config.max_month_events + 1) * hb > cellHeight) {
                cHeight = (this.config.max_month_events + 1) * hb;
              }

              for (var j = 0; j < cells.length; j++) {
                cells[j].childNodes[1].style.height = cHeight + "px";
              } //	h[i] = (h[i - 1] || 0) + cells[0].offsetHeight;

            }

            h[i] = (h[i - 1] || 0) + scheduler._get_first_visible_cell(cells).offsetHeight;
          }

          h.unshift(0);

          if (evl.parentNode.offsetHeight < evl.parentNode.scrollHeight && !scheduler._colsS.scroll_fix && scheduler.xy.scroll_width) {
            var scale_settings = scheduler._colsS,
                sum_width = scale_settings[scale_settings.col_length],
                row_heights = scale_settings.heights.slice();
            sum_width -= scheduler.xy.scroll_width || 0;

            this._calc_scale_sizes(sum_width, this._min_date, this._max_date);

            scheduler._colsS.heights = row_heights;
            this.set_xy(this._els["dhx_cal_header"][0], sum_width, this.xy.scale_height);

            scheduler._render_scales(this._els["dhx_cal_header"][0]);

            scheduler._render_month_scale(this._els["dhx_cal_data"][0], this._get_timeunit_start(), this._min_date);

            scale_settings.scroll_fix = true;
          }
        } else {
          if (!evs.length && this._els["dhx_multi_day"][0].style.visibility == "visible") h[0] = -1;

          if (evs.length || h[0] == -1) {
            //shift days to have space for multiday events
            //var childs = evl.parentNode.childNodes;
            // +1 so multiday events would have 2px from top and 2px from bottom by default
            var full_multi_day_height = (h[0] + 1) * hb + 1;
            var used_multi_day_height = full_multi_day_height;
            var used_multi_day_height_css = full_multi_day_height + "px";

            if (this.config.multi_day_height_limit) {
              used_multi_day_height = Math.min(full_multi_day_height, this.config.multi_day_height_limit);
              used_multi_day_height_css = used_multi_day_height + "px";
            }

            data.style.top = this._els["dhx_cal_navline"][0].offsetHeight + this._els["dhx_cal_header"][0].offsetHeight + used_multi_day_height + 'px';
            data.style.height = this._obj.offsetHeight - parseInt(data.style.top, 10) - (this.xy.margin_top || 0) + 'px';
            var multi_day_section = this._els["dhx_multi_day"][0];
            multi_day_section.style.height = used_multi_day_height_css;
            multi_day_section.style.visibility = h[0] == -1 ? "hidden" : "visible"; // icon

            var multi_day_icon = this._els["dhx_multi_day"][1];
            multi_day_icon.style.height = used_multi_day_height_css;
            multi_day_icon.style.visibility = h[0] == -1 ? "hidden" : "visible";
            multi_day_icon.className = h[0] ? "dhx_multi_day_icon" : "dhx_multi_day_icon_small";
            this._dy_shift = (h[0] + 1) * hb;

            if (this.config.multi_day_height_limit) {
              this._dy_shift = Math.min(this.config.multi_day_height_limit, this._dy_shift);
            }

            h[0] = 0;

            if (used_multi_day_height != full_multi_day_height) {
              data.style.top = parseInt(data.style.top) + 2 + "px";
              multi_day_section.style.overflowY = "auto"; //	multi_day_section.style.width = (parseInt(this._els["dhx_cal_navline"][0].style.width)) + "px";

              multi_day_icon.style.position = "fixed";
              multi_day_icon.style.top = "";
              multi_day_icon.style.left = "";
            }
          }
        }
      }
    }

    return evs;
  };

  scheduler._get_event_sday = function (ev) {
    // get day in current view
    // use rounding for 23 or 25 hour days on DST
    var datePart = this.date.day_start(new Date(ev.start_date));
    return Math.round((datePart.valueOf() - this._min_date.valueOf()) / (24 * 60 * 60 * 1000));
  };

  scheduler._get_event_mapped_end_date = function (ev) {
    var end_date = ev.end_date;

    if (this.config.separate_short_events) {
      var ev_duration = (ev.end_date - ev.start_date) / 60000; // minutes

      if (ev_duration < this._min_mapped_duration) {
        end_date = this.date.add(end_date, this._min_mapped_duration - ev_duration, "minute");
      }
    }

    return end_date;
  };

  scheduler._pre_render_events_line = function (evs, hold) {
    evs.sort(function (a, b) {
      if (a.start_date.valueOf() == b.start_date.valueOf()) return a.id > b.id ? 1 : -1;
      return a.start_date > b.start_date ? 1 : -1;
    });
    var days = []; //events by weeks

    var evs_originals = [];
    this._min_mapped_duration = Math.ceil(this.xy.min_event_height * 60 / this.config.hour_size_px); // values could change along the way

    for (var i = 0; i < evs.length; i++) {
      var ev = evs[i]; //check date overflow

      var sd = ev.start_date;
      var ed = ev.end_date; //check scale overflow

      var sh = sd.getHours();
      var eh = ed.getHours();
      ev._sday = this._get_event_sday(ev); // sday based on event start_date

      if (this._ignores[ev._sday]) {
        //ignore event
        evs.splice(i, 1);
        i--;
        continue;
      }

      if (!days[ev._sday]) days[ev._sday] = [];

      if (!hold) {
        ev._inner = false;
        var stack = days[ev._sday];

        while (stack.length) {
          var t_ev = stack[stack.length - 1];

          var t_end_date = this._get_event_mapped_end_date(t_ev);

          if (t_end_date.valueOf() <= ev.start_date.valueOf()) {
            stack.splice(stack.length - 1, 1);
          } else {
            break;
          }
        }

        var slot_index = stack.length;
        var sorderSet = false;

        for (var j = 0; j < stack.length; j++) {
          var t_ev = stack[j];

          var t_end_date = this._get_event_mapped_end_date(t_ev);

          if (t_end_date.valueOf() <= ev.start_date.valueOf()) {
            sorderSet = true;
            ev._sorder = t_ev._sorder;
            slot_index = j;
            ev._inner = true;
            break;
          }
        }

        if (stack.length) stack[stack.length - 1]._inner = true;

        if (!sorderSet) {
          if (stack.length) {
            if (stack.length <= stack[stack.length - 1]._sorder) {
              if (!stack[stack.length - 1]._sorder) ev._sorder = 0;else for (j = 0; j < stack.length; j++) {
                var _is_sorder = false;

                for (var k = 0; k < stack.length; k++) {
                  if (stack[k]._sorder == j) {
                    _is_sorder = true;
                    break;
                  }
                }

                if (!_is_sorder) {
                  ev._sorder = j;
                  break;
                }
              }
              ev._inner = true;
            } else {
              var _max_sorder = stack[0]._sorder;

              for (j = 1; j < stack.length; j++) {
                if (stack[j]._sorder > _max_sorder) _max_sorder = stack[j]._sorder;
              }

              ev._sorder = _max_sorder + 1;
              ev._inner = false;
            }
          } else ev._sorder = 0;
        }

        stack.splice(slot_index, slot_index == stack.length ? 0 : 1, ev);

        if (stack.length > (stack.max_count || 0)) {
          stack.max_count = stack.length;
          ev._count = stack.length;
        } else {
          ev._count = ev._count ? ev._count : 1;
        }
      }

      if (sh < this.config.first_hour || eh >= this.config.last_hour) {
        // Need to create copy of event as we will be changing it's start/end date
        // e.g. first_hour = 11 and event.start_date hours = 9. Need to preserve that info
        evs_originals.push(ev);
        evs[i] = ev = this._copy_event(ev);

        if (sh < this.config.first_hour) {
          ev.start_date.setHours(this.config.first_hour);
          ev.start_date.setMinutes(0);
        }

        if (eh >= this.config.last_hour) {
          ev.end_date.setMinutes(0);
          ev.end_date.setHours(this.config.last_hour);
        }

        if (ev.start_date > ev.end_date || sh == this.config.last_hour) {
          evs.splice(i, 1);
          i--;
          continue;
        }
      }
    }

    if (!hold) {
      for (var i = 0; i < evs.length; i++) {
        evs[i]._count = days[evs[i]._sday].max_count;
      }

      for (var i = 0; i < evs_originals.length; i++) {
        evs_originals[i]._count = days[evs_originals[i]._sday].max_count;
      }
    }

    return evs;
  };

  scheduler._time_order = function (evs) {
    evs.sort(function (a, b) {
      if (a.start_date.valueOf() == b.start_date.valueOf()) {
        if (a._timed && !b._timed) return 1;
        if (!a._timed && b._timed) return -1;
        return a.id > b.id ? 1 : -1;
      }

      return a.start_date > b.start_date ? 1 : -1;
    });
  };

  scheduler._is_any_multiday_cell_visible = function (from, to, event) {
    var cols = this._cols.length;
    var isAnyCellVisible = false;
    var checkDate = from;
    var noCells = true;
    var lastDayEnd = new Date(to);

    if (scheduler.date.day_start(new Date(to)).valueOf() != to.valueOf()) {
      lastDayEnd = scheduler.date.day_start(lastDayEnd);
      lastDayEnd = scheduler.date.add(lastDayEnd, 1, "day");
    }

    while (checkDate < lastDayEnd) {
      noCells = false;
      var cellIndex = this.locate_holder_day(checkDate, false, event);
      var weekCellIndex = cellIndex % cols;

      if (!this._ignores[weekCellIndex]) {
        isAnyCellVisible = true;
        break;
      }

      checkDate = scheduler.date.add(checkDate, 1, "day");
    }

    return noCells || isAnyCellVisible;
  };

  scheduler._pre_render_events_table = function (evs, hold) {
    // max - max height of week slot
    this._time_order(evs);

    var out = [];
    var weeks = [[], [], [], [], [], [], []]; //events by weeks

    var max = this._colsS.heights;
    var start_date;
    var cols = this._cols.length;
    var chunks_info = {};

    for (var i = 0; i < evs.length; i++) {
      var ev = evs[i];
      var id = ev.id;

      if (!chunks_info[id]) {
        chunks_info[id] = {
          first_chunk: true,
          last_chunk: true
        };
      }

      var chunk_info = chunks_info[id];
      var sd = start_date || ev.start_date;
      var ed = ev.end_date; //trim events which are crossing through current view

      if (sd < this._min_date) {
        chunk_info.first_chunk = false;
        sd = this._min_date;
      }

      if (ed > this._max_date) {
        chunk_info.last_chunk = false;
        ed = this._max_date;
      }

      var locate_s = this.locate_holder_day(sd, false, ev);
      ev._sday = locate_s % cols; //skip single day events for ignored dates

      if (this._ignores[ev._sday] && ev._timed) continue;
      var locate_e = this.locate_holder_day(ed, true, ev) || cols;
      ev._eday = locate_e % cols || cols; //cols used to fill full week, when event end on monday

      ev._length = locate_e - locate_s; //3600000 - compensate 1 hour during winter|summer time shift

      ev._sweek = Math.floor((this._correct_shift(sd.valueOf(), 1) - this._min_date.valueOf()) / (60 * 60 * 1000 * 24 * cols));

      var isAnyCellVisible = scheduler._is_any_multiday_cell_visible(sd, ed, ev);

      if (!isAnyCellVisible) {
        continue;
      } //current slot


      var stack = weeks[ev._sweek]; //check order position

      var stack_line;

      for (stack_line = 0; stack_line < stack.length; stack_line++) {
        if (stack[stack_line]._eday <= ev._sday) break;
      }

      if (!ev._sorder || !hold) {
        ev._sorder = stack_line;
      }

      if (ev._sday + ev._length <= cols) {
        start_date = null;
        out.push(ev);
        stack[stack_line] = ev; //get max height of slot

        max[ev._sweek] = stack.length - 1;
        ev._first_chunk = chunk_info.first_chunk;
        ev._last_chunk = chunk_info.last_chunk;
      } else {
        // split long event in chunks
        var copy = this._copy_event(ev);

        copy.id = ev.id;
        copy._length = cols - ev._sday;
        copy._eday = cols;
        copy._sday = ev._sday;
        copy._sweek = ev._sweek;
        copy._sorder = ev._sorder;
        copy.end_date = this.date.add(sd, copy._length, "day");
        copy._first_chunk = chunk_info.first_chunk;

        if (chunk_info.first_chunk) {
          chunk_info.first_chunk = false;
        }

        out.push(copy);
        stack[stack_line] = copy;
        start_date = copy.end_date; //get max height of slot

        max[ev._sweek] = stack.length - 1;
        i--;
        continue; //repeat same step
      }
    }

    return out;
  };

  scheduler._copy_dummy = function () {
    var a = new Date(this.start_date);
    var b = new Date(this.end_date);
    this.start_date = a;
    this.end_date = b;
  };

  scheduler._copy_event = function (ev) {
    this._copy_dummy.prototype = ev;
    return new this._copy_dummy(); //return {start_date:ev.start_date, end_date:ev.end_date, text:ev.text, id:ev.id}
  };

  scheduler._rendered = [];

  scheduler.clear_view = function () {
    for (var i = 0; i < this._rendered.length; i++) {
      var obj = this._rendered[i];
      if (obj.parentNode) obj.parentNode.removeChild(obj);
    }

    this._rendered = [];
  };

  scheduler.updateEvent = function (id) {
    var ev = this.getEvent(id);
    this.clear_event(id);

    if (ev && this.is_visible_events(ev) && this.filter_event(id, ev) && (this._table_view || this.config.multi_day || ev._timed)) {
      if (this.config.update_render) {
        this.render_view_data();
      } else {
        if (this.getState().mode == "month" && !this.getState().drag_id && !this.isOneDayEvent(ev)) {
          this.render_view_data();
        } else {
          this.render_view_data([ev], true);
        }
      }
    }
  };

  scheduler.clear_event = function (id) {
    this.for_rendered(id, function (node, i) {
      if (node.parentNode) node.parentNode.removeChild(node);

      scheduler._rendered.splice(i, 1);
    });
  };

  scheduler._y_from_date = function (date) {
    var sm = date.getHours() * 60 + date.getMinutes();
    return Math.round((sm * 60 * 1000 - this.config.first_hour * 60 * 60 * 1000) * this.config.hour_size_px / (60 * 60 * 1000)) % (this.config.hour_size_px * 24); //42px/hour
  };

  scheduler._calc_event_y = function (ev, min_height) {
    min_height = min_height || 0;
    var sm = ev.start_date.getHours() * 60 + ev.start_date.getMinutes();
    var em = ev.end_date.getHours() * 60 + ev.end_date.getMinutes() || scheduler.config.last_hour * 60;

    var top = this._y_from_date(ev.start_date);

    var height = Math.max(min_height, (em - sm) * this.config.hour_size_px / 60); //42px/hour

    return {
      top: top,
      height: height
    };
  };

  scheduler.render_event = function (ev, buffer, parentWidth) {
    var menu = scheduler.xy.menu_width;
    var menu_offset = this.config.use_select_menu_space ? 0 : menu;
    if (ev._sday < 0) return; //can occur in case of recurring event during time shift

    var parent = scheduler.locate_holder(ev._sday);
    if (!parent) return; //attempt to render non-visible event

    buffer = buffer || parent;

    var pos_y = this._calc_event_y(ev, scheduler.xy.min_event_height);

    var top = pos_y.top,
        height = pos_y.height;
    var ev_count = ev._count || 1;
    var ev_sorder = ev._sorder || 0;
    parentWidth = parentWidth || parent.clientWidth;
    var width = Math.floor((parentWidth - menu_offset) / ev_count);
    var left = ev_sorder * width + 1;
    if (!ev._inner) width = width * (ev_count - ev_sorder);

    if (this.config.cascade_event_display) {
      var limit = this.config.cascade_event_count;
      var margin = this.config.cascade_event_margin;
      left = ev_sorder % limit * margin;
      var right = ev._inner ? (ev_count - ev_sorder - 1) % limit * margin / 2 : 0;
      width = Math.floor(parentWidth - menu_offset - left - right);
    }

    var d = this._render_v_bar(ev, menu_offset + left, top, width, height, ev._text_style, scheduler.templates.event_header(ev.start_date, ev.end_date, ev), scheduler.templates.event_text(ev.start_date, ev.end_date, ev));

    this._waiAria.eventAttr(ev, d);

    this._rendered.push(d);

    buffer.appendChild(d);
    var parentPosition = parseInt(this.config.rtl ? parent.style.right : parent.style.left, 10);
    left = left + parentPosition + menu_offset;

    if (this._edit_id == ev.id) {
      d.style.zIndex = 1; //fix overlapping issue

      width = Math.max(width - 4, scheduler.xy.editor_width);
      d = document.createElement("div");
      d.setAttribute("event_id", ev.id); // for backward compatibility

      d.setAttribute(this.config.event_attribute, ev.id);

      this._waiAria.eventAttr(ev, d);

      d.className = "dhx_cal_event dhx_cal_editor";
      if (this.config.rtl) left++;
      this.set_xy(d, width, height - 20, left, top + (scheduler.xy.event_header_height || 14));

      if (ev.color) {
        d.style.backgroundColor = ev.color;
      }

      var tplClass = scheduler.templates.event_class(ev.start_date, ev.end_date, ev);

      if (tplClass) {
        d.className += " " + tplClass;
      }

      var d2 = document.createElement("div");
      this.set_xy(d2, width - 6, height - 26);
      d2.style.cssText += ";margin:2px 2px 2px 2px;overflow:hidden;";
      d.appendChild(d2);

      this._els["dhx_cal_data"][0].appendChild(d);

      this._rendered.push(d);

      d2.innerHTML = "<textarea class='dhx_cal_editor'>" + ev.text + "</textarea>";
      this._editor = d2.querySelector("textarea");
      if (this._quirks7) this._editor.style.height = height - 12 + "px"; //IEFIX

      scheduler.event(this._editor, "keydown", function (e) {
        if (e.shiftKey) return true;
        var code = e.keyCode;
        if (code == scheduler.keys.edit_save) scheduler.editStop(true);
        if (code == scheduler.keys.edit_cancel) scheduler.editStop(false);

        if (code == scheduler.keys.edit_save || code == scheduler.keys.edit_cancel) {
          if (e.preventDefault) e.preventDefault();
        }
      });
      scheduler.event(this._editor, "selectstart", function (e) {
        e.cancelBubble = true;
        return true;
      });

      scheduler._focus(this._editor, true); //IE and opera can add x-scroll during focusing


      this._els["dhx_cal_data"][0].scrollLeft = 0;
    }

    if (this.xy.menu_width !== 0 && this._select_id == ev.id) {
      if (this.config.cascade_event_display && this._drag_mode) d.style.zIndex = 1; //fix overlapping issue for cascade view in case of dnd of selected event

      var icons = this.config["icons_" + (this._edit_id == ev.id ? "edit" : "select")];
      var icons_str = "";
      var bg_color = ev.color ? "background-color: " + ev.color + ";" : "";
      var color = ev.textColor ? "color: " + ev.textColor + ";" : "";
      var ariaAttr;

      for (var i = 0; i < icons.length; i++) {
        ariaAttr = this._waiAria.eventMenuAttrString(icons[i]);
        icons_str += "<div class='dhx_menu_icon " + icons[i] + "' style='" + bg_color + "" + color + "' title='" + this.locale.labels[icons[i]] + "'" + ariaAttr + "></div>";
      }

      var obj = this._render_v_bar(ev, left - menu + 1, top, menu, icons.length * 20 + 26 - 2, "", "<div style='" + bg_color + "" + color + "' class='dhx_menu_head'></div>", icons_str, true);

      obj.style.left = left - menu + 1;

      this._els["dhx_cal_data"][0].appendChild(obj);

      this._rendered.push(obj);
    }

    if (this.config.drag_highlight && this._drag_id == ev.id) {
      this.highlightEventPosition(ev);
    }
  };

  scheduler._render_v_bar = function (ev, x, y, w, h, style, contentA, contentB, bottom) {
    var d = document.createElement("div");
    var id = ev.id;
    var cs = bottom ? "dhx_cal_event dhx_cal_select_menu" : "dhx_cal_event";
    var state = scheduler.getState();

    if (state.drag_id == ev.id) {
      cs += " dhx_cal_event_drag";
    }

    if (state.select_id == ev.id) {
      cs += " dhx_cal_event_selected";
    }

    var cse = scheduler.templates.event_class(ev.start_date, ev.end_date, ev);
    if (cse) cs = cs + " " + cse;

    if (this.config.cascade_event_display) {
      cs += " dhx_cal_event_cascade";
    }

    var bg_color = ev.color ? "background-color:" + ev.color + ";" : "";
    var color = ev.textColor ? "color:" + ev.textColor + ";" : "";

    var borderBox = scheduler._border_box_events();

    var borderBoxWidth = w - 2;
    var boxWidth = borderBox ? borderBoxWidth : w - 4,
        headerWidth = borderBox ? borderBoxWidth : w - 6,
        bodyWidth = borderBox ? borderBoxWidth : w - (this._quirks ? 4 : 14),
        footerWidth = borderBox ? borderBoxWidth - 2 : w - 8;
    var bodyHeight = borderBox ? h - this.xy.event_header_height - 1 : h - (this._quirks ? 20 : 30) + 1;
    var html = '<div event_id="' + id + '" ' + this.config.event_attribute + '="' + id + '" class="' + cs + '" style="position:absolute; top:' + y + 'px; ' + (this.config.rtl ? 'right:' : 'left:') + x + 'px; width:' + boxWidth + 'px; height:' + h + 'px;' + (style || "") + '"></div>';
    d.innerHTML = html;
    var container = d.cloneNode(true).firstChild;

    if (!bottom && scheduler.renderEvent(container, ev, w, h, contentA, contentB)) {
      return container;
    } else {
      container = d.firstChild;
      var inner_html = '<div class="dhx_event_move dhx_header" style=" width:' + headerWidth + 'px;' + bg_color + '" >&nbsp;</div>';
      inner_html += '<div class="dhx_event_move dhx_title" style="' + bg_color + '' + color + '">' + contentA + '</div>';
      inner_html += '<div class="dhx_body" style=" width:' + bodyWidth + 'px; height:' + bodyHeight + 'px;' + bg_color + '' + color + '">' + contentB + '</div>'; // +2 css specific, moved from render_event

      var footer_class = "dhx_event_resize dhx_footer";
      if (bottom || ev._drag_resize === false) footer_class = "dhx_resize_denied " + footer_class;
      inner_html += '<div class="' + footer_class + '" style=" width:' + footerWidth + 'px;' + (bottom ? ' margin-top:-1px;' : '') + '' + bg_color + '' + color + '" ></div>';
      container.innerHTML = inner_html;
    }

    return container;
  };

  scheduler.renderEvent = function () {
    return false;
  };

  scheduler.locate_holder = function (day) {
    if (this._mode == "day") return this._els["dhx_cal_data"][0].firstChild; //dirty

    return this._els["dhx_cal_data"][0].childNodes[day];
  };

  scheduler.locate_holder_day = function (date, past) {
    var day = Math.floor((this._correct_shift(date, 1) - this._min_date) / (60 * 60 * 24 * 1000)); //when locating end data of event , we need to use next day if time part was defined

    if (past && this.date.time_part(date)) day++;
    return day;
  };

  scheduler._get_dnd_order = function (order, ev_height, max_height) {
    if (!this._drag_event) return order;
    if (!this._drag_event._orig_sorder) this._drag_event._orig_sorder = order;else order = this._drag_event._orig_sorder;
    var evTop = ev_height * order;

    while (evTop + ev_height > max_height) {
      order--;
      evTop -= ev_height;
    }

    order = Math.max(order, 0);
    return order;
  }; //scheduler._get_event_bar_pos = function(sday, eday, week, drag){


  scheduler._get_event_bar_pos = function (ev) {
    var rtl = this.config.rtl;
    var columns = this._colsS;
    var x = columns[ev._sday];
    var x2 = columns[ev._eday];

    if (rtl) {
      x = columns[columns.col_length] - columns[ev._eday] + columns[0];
      x2 = columns[columns.col_length] - columns[ev._sday] + columns[0];
    }

    if (x2 == x) x2 = columns[ev._eday + 1];
    var hb = this.xy.bar_height;
    var order = ev._sorder;

    if (ev.id == this._drag_id) {
      var cellHeight = columns.heights[ev._sweek + 1] - columns.heights[ev._sweek] - this.xy.month_head_height; //22 for month head height

      order = scheduler._get_dnd_order(order, hb, cellHeight);
    }

    var y_event_offset = order * hb;
    var y = columns.heights[ev._sweek] + (columns.height ? this.xy.month_scale_height + 2 : 2) + y_event_offset;
    return {
      x: x,
      x2: x2,
      y: y
    };
  };

  scheduler.render_event_bar = function (ev) {
    var parent = this._rendered_location;

    var pos = this._get_event_bar_pos(ev);

    var y = pos.y;
    var x = pos.x;
    var x2 = pos.x2; // resize for month mutliday events

    var resize_handle = ""; //events in ignored dates

    if (!x2) return;
    var resizable = scheduler.config.resize_month_events && this._mode == "month" && (!ev._timed || scheduler.config.resize_month_timed);
    var d = document.createElement("div");

    var left_chunk = ev.hasOwnProperty("_first_chunk") && ev._first_chunk,
        right_chunk = ev.hasOwnProperty("_last_chunk") && ev._last_chunk;

    var resize_left = resizable && (ev._timed || left_chunk);
    var resize_right = resizable && (ev._timed || right_chunk);
    var timed = true;
    var cs = "dhx_cal_event_clear";

    if (!ev._timed || resizable) {
      timed = false;
      cs = "dhx_cal_event_line";
    }

    if (left_chunk) {
      cs += " dhx_cal_event_line_start";
    }

    if (right_chunk) {
      cs += " dhx_cal_event_line_end";
    }

    if (resize_left) {
      resize_handle += "<div class='dhx_event_resize dhx_event_resize_start'></div>";
    }

    if (resize_right) {
      resize_handle += "<div class='dhx_event_resize dhx_event_resize_end'></div>";
    }

    var cse = scheduler.templates.event_class(ev.start_date, ev.end_date, ev);

    if (cse) {
      cs += " " + cse;
    }

    var bg_color = ev.color ? "background:" + ev.color + ";" : "";
    var color = ev.textColor ? "color:" + ev.textColor + ";" : "";
    var style_text = ["position:absolute", "top:" + y + "px", "left:" + x + "px", "width:" + (x2 - x - 3 - (timed ? 1 : 0)) + "px", color, bg_color, ev._text_style || ""].join(";");
    var html = "<div event_id='" + ev.id + "' " + this.config.event_attribute + "='" + ev.id + "' class='" + cs + "' style='" + style_text + "'" + this._waiAria.eventBarAttrString(ev) + ">";

    if (resizable) {
      html += resize_handle;
    }

    if (scheduler.getState().mode == "month") {
      ev = scheduler.getEvent(ev.id); // ev at this point could be a part (row in a month view) of a larger event
    }

    if (ev._timed) html += scheduler.templates.event_bar_date(ev.start_date, ev.end_date, ev);
    html += scheduler.templates.event_bar_text(ev.start_date, ev.end_date, ev) + '</div>';
    html += '</div>';
    d.innerHTML = html;

    this._rendered.push(d.firstChild);

    parent.appendChild(d.firstChild);
  };

  scheduler._locate_event = function (node) {
    var id = null;

    while (node && !id && node.getAttribute) {
      id = node.getAttribute(this.config.event_attribute);
      node = node.parentNode;
    }

    return id;
  };

  scheduler.edit = function (id) {
    if (this._edit_id == id) return;
    this.editStop(false, id);
    this._edit_id = id;
    this.updateEvent(id);
  };

  scheduler.editStop = function (mode, id) {
    if (id && this._edit_id == id) return;
    var ev = this.getEvent(this._edit_id);

    if (ev) {
      if (mode) ev.text = this._editor.value;
      this._edit_id = null;
      this._editor = null;
      this.updateEvent(ev.id);

      this._edit_stop_event(ev, mode);
    }
  };

  scheduler._edit_stop_event = function (ev, mode) {
    if (this._new_event) {
      if (!mode) {
        if (ev) // in case of custom lightbox user can already delete event
          this.deleteEvent(ev.id, true);
      } else {
        this.callEvent("onEventAdded", [ev.id, ev]);
      }

      this._new_event = null;
    } else {
      if (mode) {
        this.callEvent("onEventChanged", [ev.id, ev]);
      }
    }
  };

  scheduler.getEvents = function (from, to) {
    var result = [];

    for (var a in this._events) {
      var ev = this._events[a];
      if (ev && (!from && !to || ev.start_date < to && ev.end_date > from)) result.push(ev);
    }

    return result;
  };

  scheduler.getRenderedEvent = function (id) {
    if (!id) return;
    var rendered_events = scheduler._rendered;

    for (var i = 0; i < rendered_events.length; i++) {
      var rendered_event = rendered_events[i];

      if (rendered_event.getAttribute(scheduler.config.event_attribute) == id) {
        return rendered_event;
      }
    }

    return null;
  };

  scheduler.showEvent = function (id, mode) {
    var section;

    if (id && _typeof(id) === "object") {
      mode = id.mode;
      section = id.section;
      id = id.section;
    }

    var ev = typeof id == "number" || typeof id == "string" ? scheduler.getEvent(id) : id;
    mode = mode || scheduler._mode;
    if (!ev || this.checkEvent("onBeforeEventDisplay") && !this.callEvent("onBeforeEventDisplay", [ev, mode])) return;
    var scroll_hour = scheduler.config.scroll_hour;
    scheduler.config.scroll_hour = ev.start_date.getHours();
    var preserve_scroll = scheduler.config.preserve_scroll;
    scheduler.config.preserve_scroll = false;
    var original_color = ev.color;
    var original_text_color = ev.textColor;

    if (scheduler.config.highlight_displayed_event) {
      ev.color = scheduler.config.displayed_event_color;
      ev.textColor = scheduler.config.displayed_event_text_color;
    }

    scheduler.setCurrentView(new Date(ev.start_date), mode);

    function restoreOriginalColors() {
      ev.color = original_color;
      ev.textColor = original_text_color;
    }

    scheduler.config.scroll_hour = scroll_hour;
    scheduler.config.preserve_scroll = preserve_scroll;

    if (scheduler.matrix && scheduler.matrix[mode]) {
      var timeline = scheduler.getView();
      var property = timeline.y_property;
      var event = scheduler.getEvent(ev.id);

      if (event) {
        if (!section) {
          var section = event[property];

          if (Array.isArray(section)) {
            section = section[0];
          } else if (typeof section === "string" && scheduler.config.section_delimiter && section.indexOf(scheduler.config.section_delimiter) > -1) {
            section = section.split(scheduler.config.section_delimiter)[0];
          }
        }

        var top = timeline.getSectionTop(section);
        var left = timeline.posFromDate(event.start_date);
        var container = scheduler.$container.querySelector(".dhx_timeline_data_wrapper");
        left = left - (container.offsetWidth - timeline.dx) / 2;
        top = top - container.offsetHeight / 2 + timeline.dy / 2;

        if (timeline._smartRenderingEnabled()) {
          var handlerId = timeline.attachEvent("onScroll", function () {
            restoreOriginalColors();
            timeline.detachEvent(handlerId);
          });
        }

        timeline.scrollTo({
          left: left,
          top: top
        });

        if (!timeline._smartRenderingEnabled()) {
          restoreOriginalColors();
        }
      }
    } else {
      restoreOriginalColors();
    }

    scheduler.callEvent("onAfterEventDisplay", [ev, mode]);
  };
}

/***/ }),

/***/ "./sources/core/event_highlight.js":
/*!*****************************************!*\
  !*** ./sources/core/event_highlight.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
function extend(scheduler) {
  scheduler._append_drag_marker = function (m) {
    if (m.parentNode) return;
    var zone = scheduler._els["dhx_cal_data"][0];
    var scale = zone.lastChild;

    var className = scheduler._getClassName(scale);

    if (className.indexOf("dhx_scale_holder") < 0 && scale.previousSibling) {
      scale = scale.previousSibling;
    }

    className = scheduler._getClassName(scale);

    if (scale && className.indexOf("dhx_scale_holder") === 0) {
      scale.appendChild(m);
    }
  };

  scheduler._update_marker_position = function (m, event) {
    var size = scheduler._calc_event_y(event, 0);

    m.style.top = size.top + "px";
    m.style.height = size.height + "px";
  };

  scheduler.highlightEventPosition = function (event) {
    var m = document.createElement("div");
    m.setAttribute("event_id", event.id); // for backward compatibility

    m.setAttribute(this.config.event_attribute, event.id);

    this._rendered.push(m);

    this._update_marker_position(m, event);

    var css = this.templates.drag_marker_class(event.start_date, event.end_date, event);
    var html = this.templates.drag_marker_content(event.start_date, event.end_date, event);
    m.className = "dhx_drag_marker";
    if (css) m.className += " " + css;
    if (html) m.innerHTML = html;

    this._append_drag_marker(m);
  };
}

/***/ }),

/***/ "./sources/core/jquery.js":
/*!********************************!*\
  !*** ./sources/core/jquery.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
function extend(scheduler) {
  if (window.jQuery) {
    (function ($) {
      var counter = 0;
      var methods = [];

      $.fn.dhx_scheduler = function (config) {
        if (typeof config === 'string') {
          if (methods[config]) {
            return methods[config].apply(this, []);
          } else {
            $.error('Method ' + config + ' does not exist on jQuery.dhx_scheduler');
          }
        } else {
          var views = [];
          this.each(function () {
            if (this && this.getAttribute) {
              if (!this.getAttribute("dhxscheduler")) {
                var name = "scheduler";

                if (counter) {
                  name = "scheduler" + (counter + 1);
                  window[name] = Scheduler.getSchedulerInstance();
                }

                var comp = window[name];
                this.setAttribute("dhxscheduler", name);

                for (var key in config) {
                  if (key != "data") comp.config[key] = config[key];
                }

                if (!this.getElementsByTagName("div").length) {
                  this.innerHTML = '<div class="dhx_cal_navline"><div class="dhx_cal_prev_button">&nbsp;</div><div class="dhx_cal_next_button">&nbsp;</div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div><div class="dhx_cal_tab" name="day_tab" data-tab="day" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" data-tab="week" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" data-tab="month" style="right:76px;"></div></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>';
                  this.className += " dhx_cal_container";
                }

                comp.init(this, comp.config.date, comp.config.mode);
                if (config.data) comp.parse(config.data);
                views.push(comp);
                counter++;
              } else views.push(window[this.getAttribute("dhxscheduler")]);
            }
          });
          if (views.length === 1) return views[0];
          return views;
        }
      };
    })(window.jQuery);
  }
}

/***/ }),

/***/ "./sources/core/lightbox.js":
/*!**********************************!*\
  !*** ./sources/core/lightbox.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
function extend(scheduler) {
  scheduler._lightbox_controls = {};

  scheduler.formSection = function (name) {
    var config = this.config.lightbox.sections;
    var i = 0;

    for (i; i < config.length; i++) {
      if (config[i].name == name) {
        break;
      }
    }

    if (i === config.length) {
      // GS-1662 section not found, should exit here instead of throwing an error
      return null;
    }

    var section = config[i];

    if (!scheduler._lightbox) {
      scheduler.getLightbox();
    }

    var header = document.getElementById(section.id);
    var node = header.nextSibling;
    var result = {
      section: section,
      header: header,
      node: node,
      getValue: function getValue(ev) {
        return scheduler.form_blocks[section.type].get_value(node, ev || {}, section);
      },
      setValue: function setValue(value, ev) {
        return scheduler.form_blocks[section.type].set_value(node, value, ev || {}, section);
      }
    };
    var handler = scheduler._lightbox_controls["get_" + section.type + "_control"];
    return handler ? handler(result) : result;
  };

  scheduler._lightbox_controls.get_template_control = function (result) {
    result.control = result.node;
    return result;
  };

  scheduler._lightbox_controls.get_select_control = function (result) {
    result.control = result.node.getElementsByTagName('select')[0];
    return result;
  };

  scheduler._lightbox_controls.get_textarea_control = function (result) {
    result.control = result.node.getElementsByTagName('textarea')[0];
    return result;
  };

  scheduler._lightbox_controls.get_time_control = function (result) {
    result.control = result.node.getElementsByTagName('select'); // array

    return result;
  };

  scheduler._lightbox_controls.defaults = {
    template: {
      height: 30
    },
    textarea: {
      height: 200
    },
    select: {
      height: 23
    },
    time: {
      height: 20
    }
  };
  scheduler.form_blocks = {
    template: {
      render: function render(sns) {
        var defaults = scheduler._lightbox_controls.defaults.template;
        var defaultHeight = defaults ? defaults.height : 30;
        var height = (sns.height || defaultHeight || 30) + "px";
        return "<div class='dhx_cal_ltext dhx_cal_template' style='height:" + height + ";'></div>";
      },
      set_value: function set_value(node, value, ev, config) {
        node.innerHTML = value || "";
      },
      get_value: function get_value(node, ev, config) {
        return node.innerHTML || "";
      },
      focus: function focus(node) {}
    },
    textarea: {
      render: function render(sns) {
        var defaults = scheduler._lightbox_controls.defaults.textarea;
        var defaultHeight = defaults ? defaults.height : 200;
        var height = (sns.height || defaultHeight || "130") + "px";
        return "<div class='dhx_cal_ltext' style='height:" + height + ";'><textarea></textarea></div>";
      },
      set_value: function set_value(node, value, ev) {
        scheduler.form_blocks.textarea._get_input(node).value = value || "";
      },
      get_value: function get_value(node, ev) {
        return scheduler.form_blocks.textarea._get_input(node).value;
      },
      focus: function focus(node) {
        var a = scheduler.form_blocks.textarea._get_input(node);

        scheduler._focus(a, true);
      },
      _get_input: function _get_input(node) {
        return node.getElementsByTagName("textarea")[0];
      }
    },
    select: {
      render: function render(sns) {
        var defaults = scheduler._lightbox_controls.defaults.select;
        var defaultHeight = defaults ? defaults.height : 23;
        var height = (sns.height || defaultHeight || "23") + "px";
        var html = "<div class='dhx_cal_ltext' style='height:" + height + ";'><select style='width:100%;'>";

        for (var i = 0; i < sns.options.length; i++) {
          html += "<option value='" + sns.options[i].key + "'>" + sns.options[i].label + "</option>";
        }

        html += "</select></div>";
        return html;
      },
      set_value: function set_value(node, value, ev, sns) {
        var select = node.firstChild;

        if (!select._dhx_onchange && sns.onchange) {
          scheduler.event(select, "change", sns.onchange);
          select._dhx_onchange = true;
        }

        if (typeof value == "undefined") value = (select.options[0] || {}).value;
        select.value = value || "";
      },
      get_value: function get_value(node, ev) {
        return node.firstChild.value;
      },
      focus: function focus(node) {
        var a = node.firstChild;

        scheduler._focus(a, true);
      }
    },
    time: {
      render: function render(sns) {
        if (!sns.time_format) {
          // default order
          sns.time_format = ["%H:%i", "%d", "%m", "%Y"];
        } // map: default order => real one


        sns._time_format_order = {};
        var time_format = sns.time_format;
        var cfg = scheduler.config;
        var dt = scheduler.date.date_part(scheduler._currentDate());
        var last = 24 * 60,
            first = 0;

        if (scheduler.config.limit_time_select) {
          last = 60 * cfg.last_hour + 1;
          first = 60 * cfg.first_hour;
          dt.setHours(cfg.first_hour);
        }

        var html = "";

        for (var p = 0; p < time_format.length; p++) {
          var time_option = time_format[p]; // adding spaces between selects

          if (p > 0) {
            html += " ";
          }

          var selectBoxClass = "";
          var options = "";

          switch (time_option) {
            case "%Y":
              selectBoxClass = "dhx_lightbox_year_select";
              sns._time_format_order[3] = p; //year

              var range;
              var start_year;
              var end_year;

              if (sns.year_range) {
                if (!isNaN(sns.year_range)) {
                  range = sns.year_range;
                } else if (sns.year_range.push) {
                  // if
                  start_year = sns.year_range[0];
                  end_year = sns.year_range[1];
                }
              }

              range = range || 10;
              var offset = offset || Math.floor(range / 2);
              start_year = start_year || dt.getFullYear() - offset;
              end_year = end_year || start_year + range;

              for (var i = start_year; i < end_year; i++) {
                options += "<option value='" + i + "'>" + i + "</option>";
              }

              break;

            case "%m":
              selectBoxClass = "dhx_lightbox_month_select";
              sns._time_format_order[2] = p; //month

              for (var i = 0; i < 12; i++) {
                options += "<option value='" + i + "'>" + this.locale.date.month_full[i] + "</option>";
              }

              break;

            case "%d":
              selectBoxClass = "dhx_lightbox_day_select";
              sns._time_format_order[1] = p; //days

              for (var i = 1; i < 32; i++) {
                options += "<option value='" + i + "'>" + i + "</option>";
              }

              break;

            case "%H:%i":
              selectBoxClass = "dhx_lightbox_time_select";
              sns._time_format_order[0] = p; //hours

              var i = first;
              var tdate = dt.getDate();
              sns._time_values = [];

              while (i < last) {
                var time = this.templates.time_picker(dt);
                options += "<option value='" + i + "'>" + time + "</option>";

                sns._time_values.push(i);

                dt.setTime(dt.valueOf() + this.config.time_step * 60 * 1000);
                var diff = dt.getDate() != tdate ? 1 : 0; // moved or not to the next day

                i = diff * 24 * 60 + dt.getHours() * 60 + dt.getMinutes();
              }

              break;
          }

          if (options) {
            var ariaAttrs = scheduler._waiAria.lightboxSelectAttrString(time_option);

            var readonly = sns.readonly ? "disabled='disabled'" : "";
            html += "<select class='" + selectBoxClass + "' " + readonly + ariaAttrs + ">" + options + "</select> ";
          }
        }

        var defaults = scheduler._lightbox_controls.defaults.select;
        var defaultHeight = defaults ? defaults.height : 23;
        var height = defaultHeight || 30;
        return "<div style='height:" + height + "px;padding-top:0px;font-size:inherit;' class='dhx_section_time'>" + html + "<span style='font-weight:normal; font-size:10pt;'> &nbsp;&ndash;&nbsp; </span>" + html + "</div>";
      },
      set_value: function set_value(node, value, ev, config) {
        var cfg = scheduler.config;
        var s = node.getElementsByTagName("select");
        var map = config._time_format_order;
        var start_date, end_date;

        if (cfg.full_day) {
          if (!node._full_day) {
            var html = "<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> " + scheduler.locale.labels.full_day + "&nbsp;</label></input>";
            if (!scheduler.config.wide_form) html = node.previousSibling.innerHTML + html;
            node.previousSibling.innerHTML = html;
            node._full_day = true;
          }

          var input = node.previousSibling.getElementsByTagName("input")[0];
          input.checked = scheduler.date.time_part(ev.start_date) === 0 && scheduler.date.time_part(ev.end_date) === 0;
          s[map[0]].disabled = input.checked;
          s[map[0] + s.length / 2].disabled = input.checked;

          if (!input.$_eventAttached) {
            input.$_eventAttached = true;
            scheduler.event(input, "click", function () {
              if (input.checked) {
                var obj = {};
                scheduler.form_blocks.time.get_value(node, obj, config);
                start_date = scheduler.date.date_part(obj.start_date);
                end_date = scheduler.date.date_part(obj.end_date);
                if (+end_date == +start_date || +end_date >= +start_date && (ev.end_date.getHours() !== 0 || ev.end_date.getMinutes() !== 0)) end_date = scheduler.date.add(end_date, 1, "day");
              } else {
                start_date = null;
                end_date = null;
              }

              s[map[0]].disabled = input.checked;
              s[map[0] + s.length / 2].disabled = input.checked;

              _fill_lightbox_select(s, 0, start_date || ev.start_date);

              _fill_lightbox_select(s, 4, end_date || ev.end_date);
            });
          }
        }

        if (cfg.auto_end_date && cfg.event_duration) {
          var _update_lightbox_select = function _update_lightbox_select() {
            if (!(cfg.auto_end_date && cfg.event_duration)) {
              // setting may be disabled after the handler is attached
              return;
            }

            start_date = new Date(s[map[3]].value, s[map[2]].value, s[map[1]].value, 0, s[map[0]].value);
            end_date = new Date(start_date.getTime() + scheduler.config.event_duration * 60 * 1000);

            _fill_lightbox_select(s, 4, end_date);
          };

          for (var i = 0; i < 4; i++) {
            if (!s[i].$_eventAttached) {
              s[i].$_eventAttached = true;
              scheduler.event(s[i], "change", _update_lightbox_select);
            }
          }
        }

        function _fill_lightbox_select(s, i, d) {
          var time_values = config._time_values;
          var direct_value = d.getHours() * 60 + d.getMinutes();
          var fixed_value = direct_value;
          var value_found = false;

          for (var k = 0; k < time_values.length; k++) {
            var t_v = time_values[k];

            if (t_v === direct_value) {
              value_found = true;
              break;
            }

            if (t_v < direct_value) fixed_value = t_v;
          }

          s[i + map[0]].value = value_found ? direct_value : fixed_value;

          if (!(value_found || fixed_value)) {
            s[i + map[0]].selectedIndex = -1; //show empty select in FF
          }

          s[i + map[1]].value = d.getDate();
          s[i + map[2]].value = d.getMonth();
          s[i + map[3]].value = d.getFullYear();
        }

        _fill_lightbox_select(s, 0, ev.start_date);

        _fill_lightbox_select(s, 4, ev.end_date);
      },
      get_value: function get_value(node, ev, config) {
        var s = node.getElementsByTagName("select");
        var map = config._time_format_order;
        ev.start_date = new Date(s[map[3]].value, s[map[2]].value, s[map[1]].value, 0, s[map[0]].value);
        ev.end_date = new Date(s[map[3] + 4].value, s[map[2] + 4].value, s[map[1] + 4].value, 0, s[map[0] + 4].value);

        if (!(s[map[3]].value && s[map[3] + 4].value)) {
          // use the previous date if start/end years are empty (outside lightbox range)
          var original = scheduler.getEvent(scheduler._lightbox_id);

          if (original) {
            ev.start_date = original.start_date;
            ev.end_date = original.end_date;
          }
        }

        if (ev.end_date <= ev.start_date) ev.end_date = scheduler.date.add(ev.start_date, scheduler.config.time_step, "minute");
        return {
          start_date: new Date(ev.start_date),
          end_date: new Date(ev.end_date)
        };
      },
      focus: function focus(node) {
        scheduler._focus(node.getElementsByTagName("select")[0]);
      }
    }
  };

  scheduler._setLbPosition = function (box) {
    if (!box) {
      return;
    }

    var scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
    var scrollLeft = window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft;
    var viewHeight = window.innerHeight || document.documentElement.clientHeight;
    if (scrollTop) // if vertical scroll on window
      box.style.top = Math.round(scrollTop + Math.max((viewHeight - box.offsetHeight) / 2, 0)) + "px";else // vertical scroll on body
      box.style.top = Math.round(Math.max((viewHeight - box.offsetHeight) / 2, 0) + 9) + "px"; // +9 for compatibility with auto tests
    // not quite accurate but used for compatibility reasons

    if (document.documentElement.scrollWidth > document.body.offsetWidth) // if horizontal scroll on the window
      box.style.left = Math.round(scrollLeft + (document.body.offsetWidth - box.offsetWidth) / 2) + "px";else // horizontal scroll on the body
      box.style.left = Math.round((document.body.offsetWidth - box.offsetWidth) / 2) + "px";
  };

  scheduler.showCover = function (box) {
    if (box) {
      box.style.display = "block";

      this._setLbPosition(box);
    }

    if (scheduler.config.responsive_lightbox) {
      document.documentElement.classList.add("dhx_cal_overflow_container");
      document.body.classList.add("dhx_cal_overflow_container");
    }

    this.show_cover();
  };

  scheduler.showLightbox = function (id) {
    if (!id) return;

    if (!this.callEvent("onBeforeLightbox", [id])) {
      if (this._new_event) this._new_event = null;
      return;
    }

    var box = this.getLightbox();
    this.showCover(box);

    this._fill_lightbox(id, box);

    this._waiAria.lightboxVisibleAttr(box);

    this.callEvent("onLightbox", [id]);
  };

  scheduler._fill_lightbox = function (id, box) {
    var ev = this.getEvent(id);
    var s = box.getElementsByTagName("span");
    var lightboxHeader = [];

    if (scheduler.templates.lightbox_header) {
      lightboxHeader.push("");
      var headerContent = scheduler.templates.lightbox_header(ev.start_date, ev.end_date, ev);
      lightboxHeader.push(headerContent);
      s[1].innerHTML = "";
      s[2].innerHTML = headerContent;
    } else {
      var headerDate = this.templates.event_header(ev.start_date, ev.end_date, ev);
      var headerTitle = (this.templates.event_bar_text(ev.start_date, ev.end_date, ev) || "").substr(0, 70); //IE6 fix;

      lightboxHeader.push(headerDate);
      lightboxHeader.push(headerTitle);
      s[1].innerHTML = headerDate;
      s[2].innerHTML = headerTitle;
    }

    this._waiAria.lightboxHeader(box, lightboxHeader.join(" "));

    var sns = this.config.lightbox.sections;

    for (var i = 0; i < sns.length; i++) {
      var current_sns = sns[i];

      var node = scheduler._get_lightbox_section_node(current_sns);

      var block = this.form_blocks[current_sns.type];
      var value = ev[current_sns.map_to] !== undefined ? ev[current_sns.map_to] : current_sns.default_value;
      block.set_value.call(this, node, value, ev, current_sns);
      if (sns[i].focus) block.focus.call(this, node);
    }

    scheduler._lightbox_id = id;
  };

  scheduler._get_lightbox_section_node = function (section) {
    return document.getElementById(section.id).nextSibling;
  };

  scheduler._lightbox_out = function (ev) {
    var sns = this.config.lightbox.sections;

    for (var i = 0; i < sns.length; i++) {
      var node = document.getElementById(sns[i].id);
      node = node ? node.nextSibling : node;
      var block = this.form_blocks[sns[i].type];
      var res = block.get_value.call(this, node, ev, sns[i]);
      if (sns[i].map_to != "auto") ev[sns[i].map_to] = res;
    }

    return ev;
  };

  scheduler._empty_lightbox = function (data) {
    var id = scheduler._lightbox_id;
    var ev = this.getEvent(id); //var box=this.getLightbox();

    this._lame_copy(ev, data);

    this.setEvent(ev.id, ev);

    this._edit_stop_event(ev, true);

    this.render_view_data();
  };

  scheduler.hide_lightbox = function (id) {
    scheduler.endLightbox(false, this.getLightbox());
  };

  scheduler.hideCover = function (box) {
    if (box) box.style.display = "none";
    this.hide_cover();

    if (scheduler.config.responsive_lightbox) {
      document.documentElement.classList.remove("dhx_cal_overflow_container");
      document.body.classList.remove("dhx_cal_overflow_container");
    }
  };

  scheduler.hide_cover = function () {
    if (this._cover) this._cover.parentNode.removeChild(this._cover);
    this._cover = null;
  };

  scheduler.show_cover = function () {
    if (this._cover) {
      return;
    }

    this._cover = document.createElement("div");
    this._cover.className = "dhx_cal_cover";
    document.body.appendChild(this._cover);
  };

  scheduler.save_lightbox = function () {
    var data = this._lightbox_out({}, this._lame_copy(this.getEvent(this._lightbox_id)));

    if (this.checkEvent("onEventSave") && !this.callEvent("onEventSave", [this._lightbox_id, data, this._new_event])) return;

    this._empty_lightbox(data);

    this.hide_lightbox();
  };

  scheduler.startLightbox = function (id, box) {
    this._lightbox_id = id;
    this._custom_lightbox = true;
    this._temp_lightbox = this._lightbox;
    this._lightbox = box;
    this.showCover(box);
  };

  scheduler.endLightbox = function (mode, box) {
    var box = box || scheduler.getLightbox();
    var event = scheduler.getEvent(this._lightbox_id);
    if (event) this._edit_stop_event(event, mode);
    if (mode) scheduler.render_view_data();
    this.hideCover(box);

    if (this._custom_lightbox) {
      this._lightbox = this._temp_lightbox;
      this._custom_lightbox = false;
    }

    this._temp_lightbox = this._lightbox_id = null; // in case of custom lightbox user only calls endLightbox so we need to reset _lightbox_id

    this._waiAria.lightboxHiddenAttr(box);

    this.callEvent("onAfterLightbox", []);
  };

  scheduler.resetLightbox = function () {
    if (scheduler._lightbox && !scheduler._custom_lightbox) scheduler._lightbox.parentNode.removeChild(scheduler._lightbox);
    scheduler._lightbox = null;
  };

  scheduler.cancel_lightbox = function () {
    if (this._lightbox_id) {
      this.callEvent("onEventCancel", [this._lightbox_id, this._new_event]);
    }

    this.hide_lightbox();
  };

  scheduler.hideLightbox = scheduler.cancel_lightbox; // GS-1650 need to use cancel in order to fire onEventCancel event, which is important to refresh the state of recurring series

  scheduler._init_lightbox_events = function () {
    if (this.getLightbox().$_eventAttached) {
      return;
    }

    var lightbox = this.getLightbox();
    lightbox.$_eventAttached = true;
    scheduler.event(lightbox, "click", function (e) {
      var buttonTarget = scheduler.$domHelpers.closest(e.target, ".dhx_btn_set");

      if (!buttonTarget) {
        var sectionButton = scheduler.$domHelpers.closest(e.target, ".dhx_custom_button[data-section-index]");

        if (sectionButton) {
          var index = Number(sectionButton.getAttribute("data-section-index"));
          var block = scheduler.form_blocks[scheduler.config.lightbox.sections[index].type];
          block.button_click(scheduler.$domHelpers.closest(sectionButton, ".dhx_cal_lsection"), sectionButton, e);
        }

        return;
      }

      var action = buttonTarget ? buttonTarget.getAttribute("data-action") : null;

      switch (action) {
        case "dhx_save_btn":
        case "save":
          if (scheduler.config.readonly_active) {
            return;
          }

          scheduler.save_lightbox();
          break;

        case "dhx_delete_btn":
        case "delete":
          if (scheduler.config.readonly_active) {
            return;
          }

          var c = scheduler.locale.labels.confirm_deleting;

          scheduler._dhtmlx_confirm(c, scheduler.locale.labels.title_confirm_deleting, function () {
            scheduler.deleteEvent(scheduler._lightbox_id);
            scheduler._new_event = null; //clear flag, if it was unsaved event

            scheduler.hide_lightbox();
          });

          break;

        case "dhx_cancel_btn":
        case "cancel":
          scheduler.cancel_lightbox();
          break;

        default:
          scheduler.callEvent("onLightboxButton", [action, buttonTarget, e]);
      }
    });
    scheduler.event(lightbox, "keydown", function (e) {
      var event = e || window.event;
      var target = e.target || e.srcElement;
      var buttonTarget = target.querySelector("[dhx_button]");

      if (!buttonTarget) {
        buttonTarget = target.parentNode.querySelector(".dhx_custom_button, .dhx_readonly");
      }

      switch ((e || event).keyCode) {
        case 32:
          {
            //space
            if ((e || event).shiftKey) return;

            if (buttonTarget && buttonTarget.click) {
              buttonTarget.click();
            }

            break;
          }

        case scheduler.keys.edit_save:
          if ((e || event).shiftKey) return;

          if (buttonTarget && buttonTarget.click) {
            buttonTarget.click();
          } else {
            if (scheduler.config.readonly_active) {
              return;
            }

            scheduler.save_lightbox();
          }

          break;

        case scheduler.keys.edit_cancel:
          scheduler.cancel_lightbox();
          break;

        default:
          break;
      }
    });
  };

  scheduler.setLightboxSize = function () {
    var d = this._lightbox;
    if (!d) return;
    var con = d.childNodes[1];
    con.style.height = "0px";
    con.style.height = con.scrollHeight + "px";
    d.style.height = con.scrollHeight + scheduler.xy.lightbox_additional_height + "px";
    con.style.height = con.scrollHeight + "px"; //it is incredible , how ugly IE can be
  };

  scheduler._init_dnd_events = function () {
    scheduler.event(document.body, "mousemove", scheduler._move_while_dnd);
    scheduler.event(document.body, "mouseup", scheduler._finish_dnd);

    scheduler._init_dnd_events = function () {};
  };

  scheduler._move_while_dnd = function (e) {
    if (scheduler._dnd_start_lb) {
      if (!document.dhx_unselectable) {
        document.body.className += " dhx_unselectable";
        document.dhx_unselectable = true;
      }

      var lb = scheduler.getLightbox();
      var now = [e.pageX, e.pageY];
      lb.style.top = scheduler._lb_start[1] + now[1] - scheduler._dnd_start_lb[1] + "px";
      lb.style.left = scheduler._lb_start[0] + now[0] - scheduler._dnd_start_lb[0] + "px";
    }
  };

  scheduler._ready_to_dnd = function (e) {
    var lb = scheduler.getLightbox();
    scheduler._lb_start = [parseInt(lb.style.left, 10), parseInt(lb.style.top, 10)];
    scheduler._dnd_start_lb = [e.pageX, e.pageY];
  };

  scheduler._finish_dnd = function () {
    if (scheduler._lb_start) {
      scheduler._lb_start = scheduler._dnd_start_lb = false;
      document.body.className = document.body.className.replace(" dhx_unselectable", "");
      document.dhx_unselectable = false;
    }
  };

  scheduler.getLightbox = function () {
    //scheduler.config.wide_form=true;
    if (!this._lightbox) {
      var d = document.createElement("div");
      d.className = "dhx_cal_light";
      if (scheduler.config.wide_form) d.className += " dhx_cal_light_wide";
      if (scheduler.form_blocks.recurring) d.className += " dhx_cal_light_rec";
      if (scheduler.config.rtl) d.className += " dhx_cal_light_rtl";
      if (scheduler.config.responsive_lightbox) d.className += " dhx_cal_light_responsive";
      d.style.visibility = "hidden";
      var html = this._lightbox_template;
      var buttons = this.config.buttons_left;
      var ariaAttr = "";

      for (var i = 0; i < buttons.length; i++) {
        ariaAttr = this._waiAria.lightboxButtonAttrString(buttons[i]);
        html += "<div " + ariaAttr + " data-action='" + buttons[i] + "' class='dhx_btn_set dhx_" + (scheduler.config.rtl ? "right" : "left") + "_btn_set " + buttons[i] + "_set'><div class='" + buttons[i] + "'></div><div>" + scheduler.locale.labels[buttons[i]] + "</div></div>";
      }

      buttons = this.config.buttons_right;
      var rtl = scheduler.config.rtl;

      for (var i = 0; i < buttons.length; i++) {
        ariaAttr = this._waiAria.lightboxButtonAttrString(buttons[i]);
        html += "<div " + ariaAttr + " data-action='" + buttons[i] + "' class='dhx_btn_set dhx_" + (rtl ? "left" : "right") + "_btn_set " + buttons[i] + "_set' style='float:" + (rtl ? "left" : "right") + ";'><div class='" + buttons[i] + "'></div><div>" + scheduler.locale.labels[buttons[i]] + "</div></div>";
      }

      html += "</div>";
      d.innerHTML = html;

      if (scheduler.config.drag_lightbox) {
        scheduler.event(d.firstChild, "mousedown", scheduler._ready_to_dnd);
        scheduler.event(d.firstChild, "selectstart", function (e) {
          e.preventDefault();
          return false;
        });
        d.firstChild.style.cursor = "move";

        scheduler._init_dnd_events();
      }

      this._waiAria.lightboxAttr(d);

      document.body.insertBefore(d, document.body.firstChild);
      this._lightbox = d;
      var sns = this.config.lightbox.sections;
      html = "";

      for (var i = 0; i < sns.length; i++) {
        var block = this.form_blocks[sns[i].type];
        if (!block) continue; //ignore incorrect blocks

        sns[i].id = "area_" + this.uid();
        var button = "";

        if (sns[i].button) {
          var ariaAttr = scheduler._waiAria.lightboxSectionButtonAttrString(this.locale.labels["button_" + sns[i].button]);

          button = "<div " + ariaAttr + " class='dhx_custom_button' data-section-index='" + i + "' index='" + i + "'><div class='dhx_custom_button_" + sns[i].button + "'></div><div>" + this.locale.labels["button_" + sns[i].button] + "</div></div>";
        }

        if (this.config.wide_form) {
          html += "<div class='dhx_wrap_section'>";
        }

        var label_name = this.locale.labels["section_" + sns[i].name];

        if (typeof label_name !== "string") {
          label_name = sns[i].name;
        }

        html += "<div id='" + sns[i].id + "' class='dhx_cal_lsection'>" + button + "<label>" + label_name + "</label></div>" + block.render.call(this, sns[i]);
        html += "</div>";
      }

      var ds = d.getElementsByTagName("div");

      for (var i = 0; i < ds.length; i++) {
        var t_ds = ds[i];

        var className = scheduler._getClassName(t_ds);

        if (className == "dhx_cal_larea") {
          t_ds.innerHTML = html;
          break;
        }
      } // bind labels to lightbox inputs


      scheduler._bindLightboxLabels(sns); //sizes


      this.setLightboxSize();

      this._init_lightbox_events(this);

      d.style.display = "none";
      d.style.visibility = "visible";
    }

    return this._lightbox;
  };

  scheduler._bindLightboxLabels = function (sections) {
    // link section labels to controls using label[for] attribute and label.onclick=control.focus as a fallback
    // label[for] is preferable for accessibility reasons
    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      if (!section.id || !document.getElementById(section.id)) continue;
      var labelBlock = document.getElementById(section.id);
      var label = labelBlock.querySelector("label");

      var inputBlock = scheduler._get_lightbox_section_node(section);

      while (inputBlock && !inputBlock.querySelector) {
        inputBlock = inputBlock.nextSibling;
      }

      var fallback = true;

      if (inputBlock) {
        var input = inputBlock.querySelector("input, select, textarea");

        if (input) {
          section.inputId = input.id || "input_" + scheduler.uid();
          if (!input.id) input.id = section.inputId;
          label.setAttribute("for", section.inputId);
          fallback = false;
        }
      } // use control.focus if failed to bind input using label[for]


      if (fallback) {
        var control = scheduler.form_blocks[section.type];

        if (control.focus) {
          scheduler.event(label, "click", function (section) {
            return function () {
              var block = scheduler.form_blocks[section.type];

              var node = scheduler._get_lightbox_section_node(section);

              if (block && block.focus) block.focus.call(scheduler, node);
            };
          }(section));
        }
      }
    }
  };

  scheduler.attachEvent("onEventIdChange", function (old_id, new_id) {
    if (this._lightbox_id == old_id) this._lightbox_id = new_id;
  });
  scheduler._lightbox_template = "<div class='dhx_cal_ltitle'><span class='dhx_mark'>&nbsp;</span><span class='dhx_time'></span><span class='dhx_title'></span></div><div class='dhx_cal_larea'></div>";
}

/***/ }),

/***/ "./sources/core/load.js":
/*!******************************!*\
  !*** ./sources/core/load.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
/* harmony import */ var _loaders_xml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loaders/xml */ "./sources/core/loaders/xml.js");
/* harmony import */ var _loaders_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loaders/json */ "./sources/core/loaders/json.js");
/* harmony import */ var _loaders_ical__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loaders/ical */ "./sources/core/loaders/ical.js");
/* harmony import */ var _core_common_get_serializable_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/common/get_serializable_events */ "./sources/core/common/get_serializable_events.js");
/* harmony import */ var _core_common_get_serializable_events__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_core_common_get_serializable_events__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }





function extend(scheduler) {
  scheduler._loaded = {};

  scheduler._load = function (url, from) {
    url = url || this._load_url;

    if (!url) {
      //if scheduler.setLoadMode is called before scheduler.init, initial rendering will invoke data loading while url is undefined
      return;
    }

    url += (url.indexOf("?") == -1 ? "?" : "&") + "timeshift=" + new Date().getTimezoneOffset();
    if (this.config.prevent_cache) url += "&uid=" + this.uid();
    var to;
    from = from || this._date;

    function ajaxCallback(response) {
      scheduler.on_load(response);
      scheduler.callEvent("onLoadEnd", []);
    }

    if (this._load_mode) {
      var lf = this.templates.load_format;
      from = this.date[this._load_mode + "_start"](new Date(from.valueOf()));

      while (from > this._min_date) {
        from = this.date.add(from, -1, this._load_mode);
      }

      to = from;
      var cache_line = true;

      while (to < this._max_date) {
        to = this.date.add(to, 1, this._load_mode);
        if (this._loaded[lf(from)] && cache_line) from = this.date.add(from, 1, this._load_mode);else cache_line = false;
      }

      var temp_to = to;

      do {
        to = temp_to;
        temp_to = this.date.add(to, -1, this._load_mode);
      } while (temp_to > from && this._loaded[lf(temp_to)]);

      if (to <= from) return false; //already loaded

      scheduler.ajax.get(url + "&from=" + lf(from) + "&to=" + lf(to), ajaxCallback);

      while (from < to) {
        this._loaded[lf(from)] = true;
        from = this.date.add(from, 1, this._load_mode);
      }
    } else {
      scheduler.ajax.get(url, ajaxCallback);
    } // TODO: remove onXLS


    this.callEvent("onXLS", []);
    this.callEvent("onLoadStart", []);
    return true;
  };

  scheduler._parsers = {};
  Object(_loaders_xml__WEBPACK_IMPORTED_MODULE_0__["default"])(scheduler);
  Object(_loaders_json__WEBPACK_IMPORTED_MODULE_1__["default"])(scheduler);
  Object(_loaders_ical__WEBPACK_IMPORTED_MODULE_2__["default"])(scheduler);

  scheduler.on_load = function (loader) {
    this.callEvent("onBeforeParse", []);
    var evs;
    var error = false;
    var foundParser = false;

    for (var i in this._parsers) {
      var parser = this._parsers[i];

      if (parser.canParse(loader.xmlDoc.responseText, loader.xmlDoc)) {
        try {
          var param = loader.xmlDoc.responseText;

          if (i === "xml") {
            param = loader;
          }

          evs = parser.parse(param);

          if (!evs) {
            error = true;
          }
        } catch (e) {
          error = true;
        }

        foundParser = true;
        break;
      }
    }

    if (!foundParser) {
      if (this._process && this[this._process]) {
        try {
          evs = this[this._process].parse(loader.xmlDoc.responseText);
        } catch (e) {
          error = true;
        }
      } else {
        error = true;
      }
    }

    if (error || loader.xmlDoc.status && loader.xmlDoc.status >= 400) {
      this.callEvent("onLoadError", [loader.xmlDoc]);
      evs = [];
    }

    this._process_loading(evs); // TODO: remove onXLE


    this.callEvent("onXLE", []);
    this.callEvent("onParse", []);
  };

  scheduler._process_loading = function (evs) {
    this._loading = true;
    this._not_render = true;

    for (var i = 0; i < evs.length; i++) {
      if (!this.callEvent("onEventLoading", [evs[i]])) continue;
      this.addEvent(evs[i]);
    }

    this._not_render = false;
    if (this._render_wait) this.render_view_data();
    this._loading = false;
    if (this._after_call) this._after_call();
    this._after_call = null;
  };

  scheduler._init_event = function (event) {
    event.text = event.text || event._tagvalue || "";
    event.start_date = scheduler._init_date(event.start_date);
    event.end_date = scheduler._init_date(event.end_date);
  };

  scheduler._init_date = function (date) {
    if (!date) return null;

    if (typeof date == "string") {
      return scheduler._helpers.parseDate(date);
    } else return new Date(date);
  };

  var getSerializableData = _core_common_get_serializable_events__WEBPACK_IMPORTED_MODULE_3___default()(scheduler);

  scheduler.serialize = function () {
    var dataset = [];
    var allEvents = getSerializableData();

    for (var a in allEvents) {
      var exportedEvent = {};
      var ev = allEvents[a];

      for (var key in ev) {
        if (key.charAt(0) == "$" || key.charAt(0) == "_") {
          continue;
        }

        var exportValue = void 0;
        var rawValue = ev[key];

        if (scheduler.utils.isDate(rawValue)) {
          exportValue = scheduler.defined(scheduler.templates.xml_format) ? scheduler.templates.xml_format(rawValue) : scheduler.templates.format_date(rawValue);
        } else {
          exportValue = rawValue;
        }

        exportedEvent[key] = exportValue;
      }

      dataset.push(exportedEvent);
    }

    return dataset;
  };
  /*
  scheduler.json = {};
  scheduler.json.parse = function(data) {
  
  	var events = [];
  
  	if (typeof data == "string") {
  		data = JSON.parse(data);
  	}
  	if (Object.prototype.toString.call(data) === '[object Array]') {
  		events = data;
  	} else {
  		if(data){
  			if(data.events){
  				events = data.events;
  			}else if(data.data){
  				events = data.data;
  			}
  		}
  	}
  	events = events || [];
  
  	if (data.dhx_security) {
  		if (window.dhtmlx) {
  			window.dhtmlx.security_key = data.dhx_security;
  		}
  		scheduler.security_key = data.dhx_security;
  	}
  
  	var collections = (data && data.collections) ? data.collections : {};
  	var collections_loaded = false;
  	for (var key in collections) {
  		if (collections.hasOwnProperty(key)) {
  			collections_loaded = true;
  			var collection = collections[key];
  			var arr = scheduler.serverList[key];
  			if (!arr) {
  				scheduler.serverList[key] = arr = [];
  			}
  			arr.splice(0, arr.length); //clear old options
  			for (var j = 0; j < collection.length; j++) {
  				var option = collection[j];
  				var obj = { key: option.value, label: option.label }; // resulting option object
  				for (var option_key in option) {
  					if (option.hasOwnProperty(option_key)) {
  						if (option_key == "value" || option_key == "label")
  							continue;
  						obj[option_key] = option[option_key]; // obj['value'] = option['value']
  					}
  				}
  				arr.push(obj);
  			}
  		}
  	}
  	if (collections_loaded)
  		scheduler.callEvent("onOptionsLoad", []);
  
  	var evs = [];
  	for (var i = 0; i < events.length; i++) {
  		var event = events[i];
  		scheduler._init_event(event);
  		evs.push(event);
  	}
  	return evs;
  };*/


  scheduler.parse = function (data, type) {
    this._process = type;
    this.on_load({
      xmlDoc: {
        responseText: data
      }
    });
  };

  scheduler.load = function (url, call) {
    if (typeof call == "string") {
      this._process = call;
      call = arguments[2];
    }

    this._load_url = url;
    this._after_call = call;

    this._load(url, this._date);
  }; //possible values - day,week,month,year,all


  scheduler.setLoadMode = function (mode) {
    if (mode == "all") mode = "";
    this._load_mode = mode;
  };

  scheduler.serverList = function (name, array) {
    if (array) {
      this.serverList[name] = array.slice(0);
      return this.serverList[name];
    }

    this.serverList[name] = this.serverList[name] || [];
    return this.serverList[name];
  };

  scheduler._userdata = {};

  scheduler._xmlNodeToJSON = function (node) {
    var t = {};

    for (var i = 0; i < node.attributes.length; i++) {
      t[node.attributes[i].name] = node.attributes[i].value;
    }

    for (var i = 0; i < node.childNodes.length; i++) {
      var child = node.childNodes[i];
      if (child.nodeType == 1) t[child.tagName] = child.firstChild ? child.firstChild.nodeValue : "";
    }

    if (!t.text) t.text = node.firstChild ? node.firstChild.nodeValue : "";
    return t;
  };

  scheduler.attachEvent("onXLS", function () {
    if (this.config.show_loading === true) {
      var t;
      t = this.config.show_loading = document.createElement("div");
      t.className = 'dhx_loading';
      t.style.left = Math.round((this._x - 128) / 2) + "px";
      t.style.top = Math.round((this._y - 15) / 2) + "px";

      this._obj.appendChild(t);
    }
  });
  scheduler.attachEvent("onXLE", function () {
    var t = this.config.show_loading;

    if (t && _typeof(t) == "object") {
      if (t.parentNode) {
        t.parentNode.removeChild(t);
      }

      this.config.show_loading = true;
    }
  });
}

/***/ }),

/***/ "./sources/core/loaders/ical.js":
/*!**************************************!*\
  !*** ./sources/core/loaders/ical.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
function extend(scheduler) {
  scheduler.ical = scheduler._parsers.ical = {
    canParse: function canParse(data) {
      if (typeof data === "string") {
        return new RegExp("^BEGIN:VCALENDAR").test(data);
      }

      return false;
    },
    parse: function parse(str) {
      var data = str.match(RegExp(this.c_start + "[^\f]*" + this.c_end, ""));
      if (!data.length) return; // mpl: handle bad unfolding

      data[0] = data[0].replace(/[\r\n]+ /g, ""); //unfolding 

      data[0] = data[0].replace(/[\r\n]+(?=[a-z \t])/g, " "); //drop property

      data[0] = data[0].replace(/;[^:\r\n]*:/g, ":");
      var incoming = [];
      var match;
      var event_r = RegExp("(?:" + this.e_start + ")([^\f]*?)(?:" + this.e_end + ")", "g");

      while ((match = event_r.exec(data)) !== null) {
        var e = {};
        var param;
        var param_r = /[^\r\n]+[\r\n]+/g;

        while ((param = param_r.exec(match[1])) !== null) {
          this.parse_param(param.toString(), e);
        }

        if (e.uid && !e.id) e.id = e.uid; //fallback to UID, when ID is not defined

        incoming.push(e);
      }

      return incoming;
    },
    parse_param: function parse_param(str, obj) {
      var d = str.indexOf(":");
      if (d == -1) return;
      var name = str.substr(0, d).toLowerCase();
      var value = str.substr(d + 1).replace(/\\,/g, ",").replace(/[\r\n]+$/, "");
      if (name == "summary") name = "text";else if (name == "dtstart") {
        name = "start_date";
        value = this.parse_date(value, 0, 0);
      } else if (name == "dtend") {
        name = "end_date";
        value = this.parse_date(value, 0, 0);
      }
      obj[name] = value;
    },
    parse_date: function parse_date(value, dh, dm) {
      var t = value.split("T");
      var utcMark = false;

      if (t[1]) {
        dh = t[1].substr(0, 2);
        dm = t[1].substr(2, 2);
        utcMark = !!(t[1][6] == "Z");
      }

      var dy = t[0].substr(0, 4);
      var dn = parseInt(t[0].substr(4, 2), 10) - 1;
      var dd = t[0].substr(6, 2);

      if (scheduler.config.server_utc || utcMark) {
        return new Date(Date.UTC(dy, dn, dd, dh, dm));
      } else {
        return new Date(dy, dn, dd, dh, dm);
      }
    },
    c_start: "BEGIN:VCALENDAR",
    e_start: "BEGIN:VEVENT",
    e_end: "END:VEVENT",
    c_end: "END:VCALENDAR"
  };
}

/***/ }),

/***/ "./sources/core/loaders/json.js":
/*!**************************************!*\
  !*** ./sources/core/loaders/json.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function extend(scheduler) {
  scheduler.json = scheduler._parsers.json = {
    canParse: function canParse(data) {
      if (data && _typeof(data) === "object") {
        return true;
      } else if (typeof data === "string") {
        try {
          var result = JSON.parse(data);
          return Object.prototype.toString.call(result) === '[object Object]' || Object.prototype.toString.call(result) === '[object Array]';
        } catch (err) {
          return false;
        }
      }

      return false;
    },
    parse: function parse(data) {
      var events = [];

      if (typeof data == "string") {
        data = JSON.parse(data);
      }

      if (Object.prototype.toString.call(data) === '[object Array]') {
        events = data;
      } else {
        if (data) {
          if (data.events) {
            events = data.events;
          } else if (data.data) {
            events = data.data;
          }
        }
      }

      events = events || [];

      if (data.dhx_security) {
        if (window.dhtmlx) {
          window.dhtmlx.security_key = data.dhx_security;
        }

        scheduler.security_key = data.dhx_security;
      }

      var collections = data && data.collections ? data.collections : {};
      var collections_loaded = false;

      for (var key in collections) {
        if (collections.hasOwnProperty(key)) {
          collections_loaded = true;
          var collection = collections[key];
          var arr = scheduler.serverList[key];

          if (!arr) {
            scheduler.serverList[key] = arr = [];
          }

          arr.splice(0, arr.length); //clear old options

          for (var j = 0; j < collection.length; j++) {
            var option = collection[j];
            var obj = {
              key: option.value,
              label: option.label
            }; // resulting option object

            for (var option_key in option) {
              if (option.hasOwnProperty(option_key)) {
                if (option_key == "value" || option_key == "label") continue;
                obj[option_key] = option[option_key]; // obj['value'] = option['value']
              }
            }

            arr.push(obj);
          }
        }
      }

      if (collections_loaded) scheduler.callEvent("onOptionsLoad", []);
      var evs = [];

      for (var i = 0; i < events.length; i++) {
        var event = events[i];

        scheduler._init_event(event);

        evs.push(event);
      }

      return evs;
    }
  };
}

/***/ }),

/***/ "./sources/core/loaders/xml.js":
/*!*************************************!*\
  !*** ./sources/core/loaders/xml.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
function extend(scheduler) {
  scheduler._parsers.xml = {
    canParse: function canParse(data, xhr) {
      // IE returns non-empty responseXML type regardless of actual data type
      if (xhr.responseXML && xhr.responseXML.firstChild) {
        return true;
      }

      try {
        var xmlDoc = scheduler.ajax.parse(xhr.responseText);
        var topElement = scheduler.ajax.xmltop("data", xmlDoc);

        if (topElement && topElement.tagName === "data") {
          return true;
        }
      } catch (e) {}

      return false;
    },
    parse: function parse(loader) {
      var xml;

      if (!loader.xmlDoc.responseXML) {
        //from a string
        loader.xmlDoc.responseXML = scheduler.ajax.parse(loader.xmlDoc.responseText);
      }

      xml = scheduler.ajax.xmltop("data", loader.xmlDoc);
      if (xml.tagName != "data") return null; //not an xml

      var csrfToken = xml.getAttribute("dhx_security");

      if (csrfToken) {
        if (window.dhtmlx) {
          window.dhtmlx.security_key = csrfToken;
        }

        scheduler.security_key = csrfToken;
      }

      var opts = scheduler.ajax.xpath("//coll_options", loader.xmlDoc);

      for (var i = 0; i < opts.length; i++) {
        var bind = opts[i].getAttribute("for");
        var arr = scheduler.serverList[bind];

        if (!arr) {
          scheduler.serverList[bind] = arr = [];
        }

        arr.splice(0, arr.length); //clear old options

        var itms = scheduler.ajax.xpath(".//item", opts[i]);

        for (var j = 0; j < itms.length; j++) {
          var itm = itms[j];
          var attrs = itm.attributes;
          var obj = {
            key: itms[j].getAttribute("value"),
            label: itms[j].getAttribute("label")
          };

          for (var k = 0; k < attrs.length; k++) {
            var attr = attrs[k];
            if (attr.nodeName == "value" || attr.nodeName == "label") continue;
            obj[attr.nodeName] = attr.nodeValue;
          }

          arr.push(obj);
        }
      }

      if (opts.length) scheduler.callEvent("onOptionsLoad", []);
      var ud = scheduler.ajax.xpath("//userdata", loader.xmlDoc);

      for (var i = 0; i < ud.length; i++) {
        var udx = scheduler._xmlNodeToJSON(ud[i]);

        scheduler._userdata[udx.name] = udx.text;
      }

      var evs = [];
      xml = scheduler.ajax.xpath("//event", loader.xmlDoc);

      for (var i = 0; i < xml.length; i++) {
        var ev = evs[i] = scheduler._xmlNodeToJSON(xml[i]);

        scheduler._init_event(ev);
      }

      return evs;
    }
  };
}

/***/ }),

/***/ "./sources/core/message.js":
/*!*********************************!*\
  !*** ./sources/core/message.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/utils */ "./sources/core/utils/utils.js");
/* harmony import */ var _utils_dom_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/dom_helpers */ "./sources/core/utils/dom_helpers.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  var boxAttribute = "data-dhxbox";
  var _dhx_msg_cfg = null;

  function callback(config, result) {
    var usercall = config.callback;
    modalBox.hide(config.box);
    _dhx_msg_cfg = config.box = null;
    if (usercall) usercall(result);
  }

  function modal_key(event) {
    if (_dhx_msg_cfg) {
      var code = event.which || event.keyCode;
      var preventDefault = false;

      if (messageBox.keyboard) {
        if (code == 13 || code == 32) {
          // default behavior is to confirm/submit popup on space/enter
          // if browser focus is set on button element - do button click instead of default behavior
          var target = event.target || event.srcElement;

          if (_utils_dom_helpers__WEBPACK_IMPORTED_MODULE_1__["default"].getClassName(target).indexOf("scheduler_popup_button") > -1 && target.click) {
            target.click();
          } else {
            callback(_dhx_msg_cfg, true);
            preventDefault = true;
          }
        }

        if (code == 27) {
          callback(_dhx_msg_cfg, false);
          preventDefault = true;
        }
      }

      if (preventDefault) {
        if (event.preventDefault) {
          event.preventDefault();
        }

        return !(event.cancelBubble = true);
      }

      return;
    }
  }

  scheduler.event(document, "keydown", modal_key, true);

  function modality(mode) {
    if (!modality.cover) {
      modality.cover = document.createElement("div"); //necessary for IE only

      scheduler.event(modality.cover, "keydown", modal_key);
      modality.cover.className = "dhx_modal_cover";
      document.body.appendChild(modality.cover);
    }

    modality.cover.style.display = mode ? "inline-block" : "none";
  }

  function button(text, classValue, result) {
    var buttonAriaAttrs = scheduler._waiAria.messageButtonAttrString(text);

    var name = (classValue || "").toLowerCase().replace(/ /g, "_");
    var buttonCss = "scheduler_".concat(name, "_button dhtmlx_").concat(name, "_button");
    return "<div ".concat(buttonAriaAttrs, " class='scheduler_popup_button dhtmlx_popup_button ").concat(buttonCss, "' data-result='").concat(result, "' result='").concat(result, "' ><div>").concat(text, "</div></div>");
  }

  function info(text) {
    if (!messageBox.area) {
      messageBox.area = document.createElement("div");
      messageBox.area.className = "scheduler_message_area dhtmlx_message_area";
      messageBox.area.style[messageBox.position] = "5px";
      document.body.appendChild(messageBox.area);
    }

    messageBox.hide(text.id);
    var message = document.createElement("div");
    message.innerHTML = "<div>" + text.text + "</div>";
    message.className = "scheduler-info dhtmlx-info scheduler-" + text.type + " dhtmlx-" + text.type;
    scheduler.event(message, "click", function () {
      messageBox.hide(text.id);
      text = null;
    });

    scheduler._waiAria.messageInfoAttr(message);

    if (messageBox.position == "bottom" && messageBox.area.firstChild) messageBox.area.insertBefore(message, messageBox.area.firstChild);else messageBox.area.appendChild(message);
    if (text.expire > 0) messageBox.timers[text.id] = window.setTimeout(function () {
      // GS-1213: We need that when Scheduler is destroyed
      if (messageBox) messageBox.hide(text.id);
    }, text.expire);
    messageBox.pull[text.id] = message;
    message = null;
    return text.id;
  }

  function getFirstDefined() {
    var values = [].slice.apply(arguments, [0]);

    for (var i = 0; i < values.length; i++) {
      if (values[i]) {
        return values[i];
      }
    }
  }

  function _boxStructure(config, ok, cancel) {
    var box = document.createElement("div");
    var contentId = _utils_utils__WEBPACK_IMPORTED_MODULE_0__["default"].uid();

    scheduler._waiAria.messageModalAttr(box, contentId);

    box.className = " scheduler_modal_box dhtmlx_modal_box scheduler-" + config.type + " dhtmlx-" + config.type;
    box.setAttribute(boxAttribute, 1);
    var inner = '';
    if (config.width) box.style.width = config.width;
    if (config.height) box.style.height = config.height;
    if (config.title) inner += '<div class="scheduler_popup_title dhtmlx_popup_title">' + config.title + '</div>';
    inner += '<div class="scheduler_popup_text dhtmlx_popup_text" id="' + contentId + '"><span>' + (config.content ? '' : config.text) + '</span></div><div  class="scheduler_popup_controls dhtmlx_popup_controls">';
    if (ok) inner += button(getFirstDefined(config.ok, scheduler.locale.labels.message_ok, "OK"), "ok", true);
    if (cancel) inner += button(getFirstDefined(config.cancel, scheduler.locale.labels.message_cancel, "Cancel"), "cancel", false);

    if (config.buttons) {
      for (var i = 0; i < config.buttons.length; i++) {
        var btn = config.buttons[i];

        if (_typeof(btn) == "object") {
          // Support { label:"Save", css:"main_button", value:"save" }
          var label = btn.label;
          var css = btn.css || "scheduler_" + btn.label.toLowerCase() + "_button dhtmlx_" + btn.label.toLowerCase() + "_button";
          var value = btn.value || i;
          inner += button(label, css, value);
        } else {
          inner += button(btn, btn, i);
        }
      }
    }

    inner += '</div>';
    box.innerHTML = inner;

    if (config.content) {
      var node = config.content;
      if (typeof node == "string") node = document.getElementById(node);
      if (node.style.display == 'none') node.style.display = "";
      box.childNodes[config.title ? 1 : 0].appendChild(node);
    }

    scheduler.event(box, "click", function (event) {
      var source = event.target || event.srcElement;
      if (!source.className) source = source.parentNode;

      if (_utils_dom_helpers__WEBPACK_IMPORTED_MODULE_1__["default"].closest(source, ".scheduler_popup_button")) {
        var result = source.getAttribute("data-result");
        result = result == "true" || (result == "false" ? false : result);
        callback(config, result);
      }
    });
    config.box = box;
    if (ok || cancel) _dhx_msg_cfg = config;
    return box;
  }

  function _createBox(config, ok, cancel) {
    var box = config.tagName ? config : _boxStructure(config, ok, cancel);
    if (!config.hidden) modality(true);
    document.body.appendChild(box);
    var x = Math.abs(Math.floor(((window.innerWidth || document.documentElement.offsetWidth) - box.offsetWidth) / 2));
    var y = Math.abs(Math.floor(((window.innerHeight || document.documentElement.offsetHeight) - box.offsetHeight) / 2));
    if (config.position == "top") box.style.top = "-3px";else box.style.top = y + 'px';
    box.style.left = x + 'px'; //necessary for IE only

    scheduler.event(box, "keydown", modal_key);
    modalBox.focus(box);
    if (config.hidden) modalBox.hide(box);
    scheduler.callEvent("onMessagePopup", [box]);
    return box;
  }

  function alertPopup(config) {
    return _createBox(config, true, false);
  }

  function confirmPopup(config) {
    return _createBox(config, true, true);
  }

  function boxPopup(config) {
    return _createBox(config);
  }

  function box_params(text, type, callback) {
    if (_typeof(text) != "object") {
      if (typeof type == "function") {
        callback = type;
        type = "";
      }

      text = {
        text: text,
        type: type,
        callback: callback
      };
    }

    return text;
  }

  function params(text, type, expire, id) {
    if (_typeof(text) != "object") text = {
      text: text,
      type: type,
      expire: expire,
      id: id
    };
    text.id = text.id || _utils_utils__WEBPACK_IMPORTED_MODULE_0__["default"].uid();
    text.expire = text.expire || messageBox.expire;
    return text;
  }

  var alertBox = function alertBox() {
    var text = box_params.apply(this, arguments);
    text.type = text.type || "confirm";
    return alertPopup(text);
  };

  var confirmBox = function confirmBox() {
    var text = box_params.apply(this, arguments);
    text.type = text.type || "alert";
    return confirmPopup(text);
  };

  var modalBox = function modalBox() {
    var text = box_params.apply(this, arguments);
    text.type = text.type || "alert";
    return boxPopup(text);
  };

  modalBox.hide = function (node) {
    while (node && node.getAttribute && !node.getAttribute(boxAttribute)) {
      node = node.parentNode;
    }

    if (node) {
      node.parentNode.removeChild(node);
      modality(false);
      scheduler.callEvent("onAfterMessagePopup", [node]);
    }
  };

  modalBox.focus = function (node) {
    setTimeout(function () {
      var focusable = _utils_dom_helpers__WEBPACK_IMPORTED_MODULE_1__["default"].getFocusableNodes(node);

      if (focusable.length) {
        if (focusable[0].focus) focusable[0].focus();
      }
    }, 1);
  };

  var messageBox = function messageBox(text, type, expire, id) {
    text = params.apply(this, arguments);
    text.type = text.type || "info";
    var subtype = text.type.split("-")[0];

    switch (subtype) {
      case "alert":
        return alertPopup(text);

      case "confirm":
        return confirmPopup(text);

      case "modalbox":
        return boxPopup(text);

      default:
        return info(text);
    }
  };

  messageBox.seed = new Date().valueOf();
  messageBox.uid = _utils_utils__WEBPACK_IMPORTED_MODULE_0__["default"].uid;
  messageBox.expire = 4000;
  messageBox.keyboard = true;
  messageBox.position = "top";
  messageBox.pull = {};
  messageBox.timers = {};

  messageBox.hideAll = function () {
    for (var key in messageBox.pull) {
      messageBox.hide(key);
    }
  };

  messageBox.hide = function (id) {
    var obj = messageBox.pull[id];

    if (obj && obj.parentNode) {
      window.setTimeout(function () {
        obj.parentNode.removeChild(obj);
        obj = null;
      }, 2000);
      obj.className += " hidden";
      if (messageBox.timers[id]) window.clearTimeout(messageBox.timers[id]);
      delete messageBox.pull[id];
    }
  };

  var popups = [];
  scheduler.attachEvent("onMessagePopup", function (box) {
    popups.push(box);
  });
  scheduler.attachEvent("onAfterMessagePopup", function (box) {
    for (var i = 0; i < popups.length; i++) {
      if (popups[i] === box) {
        popups.splice(i, 1);
        i--;
      }
    }
  });
  scheduler.attachEvent("onDestroy", function () {
    if (modality.cover && modality.cover.parentNode) {
      modality.cover.parentNode.removeChild(modality.cover);
    }

    for (var i = 0; i < popups.length; i++) {
      if (popups[i].parentNode) {
        popups[i].parentNode.removeChild(popups[i]);
      }
    }

    popups = null;

    if (messageBox.area && messageBox.area.parentNode) {
      messageBox.area.parentNode.removeChild(messageBox.area);
    }

    messageBox = null;
  });
  return {
    alert: alertBox,
    confirm: confirmBox,
    message: messageBox,
    modalbox: modalBox
  };
});

/***/ }),

/***/ "./sources/core/nav_bar.js":
/*!*********************************!*\
  !*** ./sources/core/nav_bar.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
function extend(scheduler) {
  function div(className) {
    var element = document.createElement("div");
    var classes = (className || "").split(" ");
    classes.forEach(function (cssClass) {
      element.classList.add(cssClass);
    });
    return element;
  }

  var itemTypes = {
    rows_container: function rows_container() {
      return div("dhx_cal_navbar_rows_container");
    },
    row: function row() {
      return div("dhx_cal_navbar_row");
    },
    view: function view(config) {
      var element = div("dhx_cal_tab");
      element.setAttribute("name", config.view + "_tab");
      element.setAttribute("data-tab", config.view); // element.setAttribute("data-viewname", config.view); // FIXME: need to remove? not used anywhere

      if (scheduler.config.fix_tab_position) {
        if (config.$firstTab) {
          element.classList.add("dhx_cal_tab_first");
        } else if (config.$lastTab) {
          element.classList.add("dhx_cal_tab_last");
        } else if (config.view !== "week") {
          element.classList.add("dhx_cal_tab_standalone");
        }
      }

      return element;
    },
    date: function date() {
      return div("dhx_cal_date");
    },
    button: function button(config) {
      return div("dhx_cal_nav_button dhx_cal_nav_button_custom dhx_cal_tab");
    },
    builtInButton: function builtInButton(config) {
      return div("dhx_cal_" + config.view + "_button dhx_cal_nav_button");
    },
    spacer: function spacer() {
      return div("dhx_cal_line_spacer");
    },
    minicalendarButton: function minicalendarButton(config) {
      var minicalendarDiv = div('dhx_minical_icon');

      if (!config.click && !minicalendarDiv.$_eventAttached) {
        scheduler.event(minicalendarDiv, "click", function () {
          if (scheduler.isCalendarVisible()) {
            scheduler.destroyCalendar();
          } else {
            scheduler.renderCalendar({
              position: this,
              date: scheduler.getState().date,
              navigation: true,
              handler: function handler(date, calendar) {
                scheduler.setCurrentView(date);
                scheduler.destroyCalendar();
              }
            });
          }
        });
      }

      return minicalendarDiv;
    },
    html_element: function html_element(config) {
      return div("dhx_cal_nav_content");
    }
  };

  function findRenderer(config) {
    var renderer;

    if (config.view) {
      switch (config.view) {
        case "today":
        case "next":
        case "prev":
          renderer = itemTypes.builtInButton;
          break;

        case "date":
          renderer = itemTypes.date;
          break;

        case "spacer":
          renderer = itemTypes.spacer;
          break;

        case "button":
          renderer = itemTypes.button;
          break;

        case "minicalendar":
          renderer = itemTypes.minicalendarButton;
          break;

        default:
          renderer = itemTypes.view;
          break;
      }
    } else if (config.rows) {
      renderer = itemTypes.rows_container;
    } else if (config.cols) {
      renderer = itemTypes.row;
    }

    return renderer;
  }

  function renderElement(config) {
    var renderer = findRenderer(config);

    if (!renderer) {
      return;
    }

    var element = renderer(config);

    if (config.css) {
      element.classList.add(config.css);
    }

    if (config.width) {
      var value = config.width;

      if (value === value * 1) {
        value += "px";
      }

      element.style.width = value;
    }

    if (config.height) {
      var value = config.height;

      if (value === value * 1) {
        value += "px";
      }

      element.style.height = value;
    }

    if (config.click) {
      element.addEventListener("click", config.click);
    }

    if (config.html) {
      element.innerHTML = config.html;
    }

    if (config.align) {
      var value = "";

      if (config.align == "right") {
        value = "flex-end";
      } else if (config.align == "left") {
        value = "flex-start";
      }

      element.style.justifyContent = value;
    }

    return element;
  }

  function prepareConfig(config) {
    if (typeof config === "string") {
      config = {
        view: config
      };
    }

    if (!config.view && !config.rows && !config.cols) {
      config.view = "button";
    }

    return config;
  }

  function renderLayout(config) {
    var fragment = document.createDocumentFragment();
    var items;

    if (Array.isArray(config)) {
      items = config;
    } else {
      items = [config];
    }

    for (var i = 0; i < items.length; i++) {
      var view = prepareConfig(items[i]);

      if (view.view === "day" && items[i + 1]) {
        var next = prepareConfig(items[i + 1]);

        if (next.view === "week" || next.view === "month") {
          view.$firstTab = true;
        }
      }

      if (view.view === "month" && items[i - 1]) {
        var next = prepareConfig(items[i - 1]);

        if (next.view === "week" || next.view === "day") {
          view.$lastTab = true;
        }
      }

      var element = renderElement(view);
      fragment.appendChild(element);

      if (view.cols || view.rows) {
        element.appendChild(renderLayout(view.cols || view.rows));
      }
    }

    return fragment;
  }

  scheduler._init_nav_bar = function (items) {
    var navBar = this.$container.querySelector(".dhx_cal_navline");

    if (!navBar) {
      navBar = document.createElement("div");
      navBar.className = "dhx_cal_navline dhx_cal_navline_flex";

      scheduler._update_nav_bar(items, navBar);

      return navBar;
    }

    return navBar;
  };

  var previousNavbar = null;
  var previousHeight = null;

  scheduler._update_nav_bar = function (config, container) {
    if (!config) {
      return;
    }

    var heightChanged = false;
    var configChanged = false;
    var newHeight = config.height || scheduler.xy.nav_height;

    if (previousHeight === null || previousHeight !== newHeight) {
      heightChanged = true;
    }

    if (!previousNavbar || JSON.stringify(config) !== previousNavbar) {
      configChanged = true;
    }

    if (heightChanged) {
      scheduler.xy.nav_height = newHeight;
    }

    if (configChanged) {
      container.innerHTML = "";
      container.appendChild(renderLayout(config));
    }

    if (heightChanged || configChanged) {
      scheduler.unset_actions();
      scheduler._els = [];
      scheduler.get_elements();
      scheduler.set_actions();
    }

    if (newHeight === 0) {
      container.style.display = "none";
    } else {
      container.style.display = "";
    }

    previousHeight = newHeight;
  };
}

/***/ }),

/***/ "./sources/core/scheduler.js":
/*!***********************************!*\
  !*** ./sources/core/scheduler.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
/* harmony import */ var _nav_bar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nav_bar */ "./sources/core/nav_bar.js");
/* harmony import */ var _scheduler_resize_listener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scheduler_resize_listener */ "./sources/core/scheduler_resize_listener.js");
/* harmony import */ var _utils_eventable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/eventable */ "./sources/utils/eventable.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




function extend(scheduler) {
  Object(_utils_eventable__WEBPACK_IMPORTED_MODULE_2__["default"])(scheduler);
  Object(_nav_bar__WEBPACK_IMPORTED_MODULE_0__["default"])(scheduler);

  scheduler._detachDomEvent = function (el, event, handler) {
    if (el.removeEventListener) {
      el.removeEventListener(event, handler, false);
    } else if (el.detachEvent) {
      el.detachEvent("on" + event, handler);
    }
  };

  scheduler._init_once = function () {
    Object(_scheduler_resize_listener__WEBPACK_IMPORTED_MODULE_1__["default"])(scheduler);

    scheduler._init_once = function () {};
  };

  var layout = {
    "navbar": {
      render: function render(config) {
        return scheduler._init_nav_bar(config);
      }
    },
    "header": {
      render: function render(config) {
        var element = document.createElement("div");
        element.className = "dhx_cal_header";
        return element;
      }
    },
    "dataArea": {
      render: function render(config) {
        var element = document.createElement("div");
        element.className = "dhx_cal_data";
        return element;
      }
    },
    "html_element": {
      render: function render(config) {
        return config.html;
      }
    }
  };

  function hasSchedulerMarkup(element) {
    return !!(element.querySelector(".dhx_cal_header") && element.querySelector(".dhx_cal_data") && element.querySelector(".dhx_cal_navline"));
  }

  function createDefaultHeader(scheduler) {
    var views = ["day", "week", "month"];
    var date = ["date"];
    var nav = ["prev", "today", "next"];

    if (scheduler.matrix) {
      for (var i in scheduler.matrix) {
        views.push(i);
      }
    }

    if (scheduler._props) {
      for (var i in scheduler._props) {
        views.push(i);
      }
    }

    if (scheduler._grid && scheduler._grid.names) {
      for (var i in scheduler._grid.names) {
        views.push(i);
      }
    }

    var optionalViews = ["map", "agenda", "week_agenda", "year"];
    optionalViews.forEach(function (viewName) {
      if (scheduler[viewName + "_view"]) {
        views.push(viewName);
      }
    });
    return views.concat(date).concat(nav);
  }

  scheduler.init = function (id, date, mode) {
    if (this.$destroyed) {
      return; // not have errors when try to reinit destroyed scheduler
    }

    date = date || scheduler._currentDate();
    mode = mode || "week";

    if (this._obj) {
      this.unset_actions();
    }

    this._obj = typeof id == "string" ? document.getElementById(id) : id;
    this.$container = this._obj;
    this.$root = this._obj;

    if (!this.$container.offsetHeight && this.$container.offsetWidth && this.$container.style.height === "100%") {
      // scheduler container has zero height and non-zero width
      window.console.error(scheduler._commonErrorMessages.collapsedContainer(), this.$container);
    }

    if (this.config.wai_aria_attributes && this.config.wai_aria_application_role) {
      this.$container.setAttribute("role", "application");
    }

    if (!this.config.header && !hasSchedulerMarkup(this.$container)) {
      // if no header config and no required markup - use the default header
      // so the scheduler could be initialized in an empty div
      this.config.header = createDefaultHeader(this);
      window.console.log([// jshint ignore:line
      "Required DOM elements are missing from the scheduler container and **scheduler.config.header** is not specified.", "Using a default header configuration: ", "scheduler.config.header = " + JSON.stringify(this.config.header, null, 2), "Check this article for the details: https://docs.dhtmlx.com/scheduler/initialization.html"].join("\n")); // jshint ignore:line
    }

    if (this.config.header) {
      this.$container.innerHTML = "";
      this.$container.classList.add("dhx_cal_container");

      if (this.config.header.height) {
        this.xy.nav_height = this.config.header.height;
      }

      this.$container.appendChild(layout.navbar.render(this.config.header));
      this.$container.appendChild(layout.header.render());
      this.$container.appendChild(layout.dataArea.render());
    } else {
      // if no header config provided - make sure scheduler container has all necessary elements
      if (!hasSchedulerMarkup(this.$container)) {
        throw new Error(["Required DOM elements are missing from the scheduler container.", "Be sure to either specify them manually in the markup: https://docs.dhtmlx.com/scheduler/initialization.html#initializingschedulerviamarkup", "Or to use **scheduler.config.header** setting so they could be created automatically: https://docs.dhtmlx.com/scheduler/initialization.html#initializingschedulerviaheaderconfig"].join("\n"));
      }
    }

    if (this.config.rtl) this.$container.className += " dhx_cal_container_rtl"; //hook for terrace skin

    if (this._skin_init) scheduler._skin_init();
    scheduler.date.init();
    this._scroll = true;
    this._quirks = this.$env.isIE && document.compatMode == "BackCompat";
    this._quirks7 = this.$env.isIE && navigator.appVersion.indexOf("MSIE 8") == -1;
    this._els = [];
    this.get_elements();
    this.init_templates();
    this.set_actions();

    this._init_once();

    this._init_touch_events();

    this.set_sizes();
    scheduler.callEvent('onSchedulerReady', []);
    this.setCurrentView(date, mode);
  };

  scheduler.xy = {
    min_event_height: 40,
    scale_width: 50,
    scroll_width: 18,
    scale_height: 20,
    month_scale_height: 20,
    menu_width: 25,
    margin_top: 0,
    margin_left: 0,
    editor_width: 140,
    month_head_height: 22,
    event_header_height: 14
  };
  scheduler.keys = {
    edit_save: 13,
    edit_cancel: 27
  };

  scheduler.bind = function bind(functor, object) {
    if (functor.bind) return functor.bind(object);else return function () {
      return functor.apply(object, arguments);
    };
  };

  scheduler.set_sizes = function () {
    var w = this._x = this._obj.clientWidth - this.xy.margin_left;
    var h = this._y = this._obj.clientHeight - this.xy.margin_top; //not-table mode always has scroll - need to be fixed in future

    var scale_x = this._table_view ? 0 : this.xy.scale_width + this.xy.scroll_width;
    var scale_s = this._table_view ? -1 : this.xy.scale_width;
    var materialScalePlaceholder = this.$container.querySelector(".dhx_cal_scale_placeholder");

    if (scheduler._is_material_skin()) {
      if (!materialScalePlaceholder) {
        materialScalePlaceholder = document.createElement("div");
        materialScalePlaceholder.className = "dhx_cal_scale_placeholder";
        this.$container.insertBefore(materialScalePlaceholder, this._els["dhx_cal_header"][0]);
      }

      materialScalePlaceholder.style.display = "block";
      this.set_xy(materialScalePlaceholder, w, this.xy.scale_height + 1, 0, this.xy.nav_height + (this._quirks ? -1 : 1));
    } else {
      if (materialScalePlaceholder) {
        materialScalePlaceholder.parentNode.removeChild(materialScalePlaceholder);
      }
    }

    if (this._lightbox) {
      if (scheduler.$container.offsetWidth < 1200) {} else {
        this._setLbPosition(document.querySelector(".dhx_cal_light"));
      }
    }

    this.set_xy(this._els["dhx_cal_navline"][0], w, this.xy.nav_height, 0, 0);
    this.set_xy(this._els["dhx_cal_header"][0], w - scale_x, this.xy.scale_height, scale_s, this.xy.nav_height + (this._quirks ? -1 : 1)); //to support alter-skin, we need a way to alter height directly from css

    var actual_height = this._els["dhx_cal_navline"][0].offsetHeight;
    if (actual_height > 0) this.xy.nav_height = actual_height;
    var data_y = this.xy.scale_height + this.xy.nav_height + (this._quirks ? -2 : 0);
    this.set_xy(this._els["dhx_cal_data"][0], w, h - (data_y + 2), 0, data_y + 2);
  };

  scheduler.set_xy = function (node, w, h, x, y) {
    var direction = 'left';
    node.style.width = Math.max(0, w) + "px";
    node.style.height = Math.max(0, h) + "px";

    if (arguments.length > 3) {
      if (this.config.rtl) direction = 'right';
      node.style[direction] = x + "px";
      node.style.top = y + "px";
    }
  };

  scheduler.get_elements = function () {
    //get all child elements as named hash
    var els = this._obj.getElementsByTagName("DIV");

    for (var i = 0; i < els.length; i++) {
      var class_name = scheduler._getClassName(els[i]);

      var attr_value = els[i].getAttribute("data-tab") || els[i].getAttribute("name") || "";
      if (class_name) class_name = class_name.split(" ")[0];
      if (!this._els[class_name]) this._els[class_name] = [];

      this._els[class_name].push(els[i]); //check if name need to be changed
      // scheduler.locale.labels[attr_value+"_tab"] - to fix getting labels for data-tab


      var label = scheduler.locale.labels[attr_value + "_tab"] || scheduler.locale.labels[attr_value || class_name];
      if (typeof label !== "string" && attr_value && !els[i].innerHTML) label = attr_value.split("_")[0];

      if (label) {
        this._waiAria.labelAttr(els[i], label);

        els[i].innerHTML = label;
      }
    }
  };

  var domEventsScope = scheduler._createDomEventScope();

  scheduler.unset_actions = function () {
    domEventsScope.detachAll();
  };

  scheduler.set_actions = function () {
    for (var a in this._els) {
      if (this._click[a]) {
        for (var i = 0; i < this._els[a].length; i++) {
          var element = this._els[a][i];

          var handler = this._click[a].bind(element);

          domEventsScope.attach(element, "click", handler);
        }
      }
    }

    domEventsScope.attach(this._obj, "selectstart", function (e) {
      e.preventDefault();
      return false;
    }); //this._obj.onselectstart=function(e){ return false; };

    domEventsScope.attach(this._obj, "mousemove", function (e) {
      if (!scheduler._temp_touch_block) scheduler._on_mouse_move(e);
    });
    domEventsScope.attach(this._obj, "mousedown", function (e) {
      if (!scheduler._ignore_next_click) scheduler._on_mouse_down(e);
    });
    domEventsScope.attach(this._obj, "mouseup", function (e) {
      if (!scheduler._ignore_next_click) scheduler._on_mouse_up(e);
    });
    domEventsScope.attach(this._obj, "dblclick", function (e) {
      scheduler._on_dbl_click(e);
    });
    domEventsScope.attach(this._obj, "contextmenu", function (e) {
      var ev = e;
      var src = ev.target || ev.srcElement;
      var returnValue = scheduler.callEvent("onContextMenu", [scheduler._locate_event(src), ev]);
      return returnValue;
    });
  };

  scheduler.select = function (id) {
    if (this._select_id == id) return;

    scheduler._close_not_saved();

    this.editStop(false);

    if (this._select_id) {
      this.unselect();
    }

    this._select_id = id;
    this.updateEvent(id);
    this.callEvent("onEventSelected", [id]);
  };

  scheduler.unselect = function (id) {
    if (id && id != this._select_id) return;
    var t = this._select_id;
    this._select_id = null;
    if (t && this.getEvent(t)) this.updateEvent(t);
    this.callEvent("onEventUnselected", [t]);
  };

  scheduler.getState = function () {
    return {
      mode: this._mode,
      date: new Date(this._date),
      min_date: new Date(this._min_date),
      max_date: new Date(this._max_date),
      editor_id: this._edit_id,
      lightbox_id: this._lightbox_id,
      new_event: this._new_event,
      select_id: this._select_id,
      expanded: this.expanded,
      drag_id: this._drag_id,
      drag_mode: this._drag_mode
    };
  };

  scheduler._click = {
    dhx_cal_data: function dhx_cal_data(e) {
      //in case of touch disable click processing
      if (scheduler._ignore_next_click) {
        if (e.preventDefault) e.preventDefault();
        e.cancelBubble = true;
        scheduler._ignore_next_click = false;
        return false;
      }

      var trg = e.target;

      var id = scheduler._locate_event(trg);

      if (!id) {
        scheduler.callEvent("onEmptyClick", [scheduler.getActionData(e).date, e]);
      } else {
        if (!scheduler.callEvent("onClick", [id, e]) || scheduler.config.readonly) return;
      }

      if (id && scheduler.config.select) {
        scheduler.select(id);

        var mask = scheduler._getClassName(trg);

        if (mask.indexOf("_icon") != -1) scheduler._click.buttons[mask.split(" ")[1].replace("icon_", "")](id);
      } else {
        scheduler._close_not_saved();

        if (scheduler.getState().select_id && new Date().valueOf() - (scheduler._new_event || 0) > 500) {
          scheduler.unselect();
        }
      }
    },
    dhx_cal_prev_button: function dhx_cal_prev_button() {
      scheduler._click.dhx_cal_next_button(0, -1);
    },
    dhx_cal_next_button: function dhx_cal_next_button(dummy, step) {
      var def_step = 1;

      if (scheduler.config.rtl) {
        step = -step;
        def_step = -def_step;
      }

      scheduler.setCurrentView(scheduler.date.add( //next line changes scheduler._date , but seems it has not side-effects
      scheduler.date[scheduler._mode + "_start"](new Date(scheduler._date)), step || def_step, scheduler._mode));
    },
    dhx_cal_today_button: function dhx_cal_today_button() {
      if (scheduler.callEvent("onBeforeTodayDisplayed", [])) {
        scheduler.setCurrentView(scheduler._currentDate());
      }
    },
    dhx_cal_tab: function dhx_cal_tab() {
      var name = this.getAttribute("data-tab");
      var deprecated_name = this.getAttribute("name");
      var mode = name || deprecated_name.substring(0, deprecated_name.search("_tab"));
      scheduler.setCurrentView(scheduler._date, mode);
    },
    buttons: {
      "delete": function _delete(id) {
        var c = scheduler.locale.labels.confirm_deleting;

        scheduler._dhtmlx_confirm(c, scheduler.locale.labels.title_confirm_deleting, function () {
          scheduler.deleteEvent(id);
        });
      },
      edit: function edit(id) {
        scheduler.edit(id);
      },
      save: function save(id) {
        scheduler.editStop(true);
      },
      details: function details(id) {
        scheduler.showLightbox(id);
      },
      cancel: function cancel(id) {
        scheduler.editStop(false);
      }
    }
  };

  scheduler._dhtmlx_confirm = function (message, title, callback) {
    if (!message) return callback();
    var opts = {
      text: message
    };
    if (title) opts.title = title;

    if (callback) {
      opts.callback = function (result) {
        if (result) callback();
      };
    }

    scheduler.confirm(opts);
  };

  scheduler.addEventNow = function (start, end, e) {
    var base = {};

    if (scheduler._isObject(start) && !scheduler._isDate(start)) {
      base = start;
      start = null;
    }

    var d = (this.config.event_duration || this.config.time_step) * 60000;
    if (!start) start = base.start_date || Math.round(scheduler._currentDate().valueOf() / d) * d;
    var start_date = new Date(start);

    if (!end) {
      var start_hour = this.config.first_hour;

      if (start_hour > start_date.getHours()) {
        start_date.setHours(start_hour);
        start = start_date.valueOf();
      }

      end = start.valueOf() + d;
    }

    var end_date = new Date(end); // scheduler.addEventNow(new Date(), new Date()) + collision though get_visible events defect (such event was not retrieved)

    if (start_date.valueOf() == end_date.valueOf()) end_date.setTime(end_date.valueOf() + d);
    base.start_date = base.start_date || start_date;
    base.end_date = base.end_date || end_date;
    base.text = base.text || this.locale.labels.new_event;
    base.id = this._drag_id = base.id || this.uid();
    this._drag_mode = "new-size";
    this._loading = true;
    var eventId = this.addEvent(base);
    this.callEvent("onEventCreated", [this._drag_id, e]);
    this._loading = false;
    this._drag_event = {}; //dummy , to trigger correct event updating logic

    this._on_mouse_up(e);

    return eventId;
  };

  scheduler._on_dbl_click = function (e, src) {
    src = src || e.target || e.srcElement;
    if (this.config.readonly) return;

    var name = scheduler._getClassName(src).split(" ")[0];

    switch (name) {
      case "dhx_scale_holder":
      case "dhx_scale_holder_now":
      case "dhx_month_body":
      case "dhx_wa_day_data":
        if (!scheduler.config.dblclick_create) break;
        this.addEventNow(this.getActionData(e).date, null, e);
        break;

      case "dhx_cal_event":
      case "dhx_wa_ev_body":
      case "dhx_agenda_line":
      case "dhx_grid_event":
      case "dhx_cal_event_line":
      case "dhx_cal_event_clear":
        var id = this._locate_event(src);

        if (!this.callEvent("onDblClick", [id, e])) return;
        if (this.config.details_on_dblclick || this._table_view || !this.getEvent(id)._timed || !this.config.select) this.showLightbox(id);else this.edit(id);
        break;

      case "dhx_time_block":
      case "dhx_cal_container":
        return;

      default:
        var t = this["dblclick_" + name];

        if (t) {
          t.call(this, e);
        } else {
          if (src.parentNode && src != this) return scheduler._on_dbl_click(e, src.parentNode);
        }

        break;
    }
  }; //column index by mouse x-coordinate


  scheduler._get_column_index = function (x_pos) {
    var column = 0;

    if (this._cols) {
      var width = 0;
      var i = 0;

      while (width + this._cols[i] < x_pos && i < this._cols.length) {
        width += this._cols[i];
        i++;
      }

      column = i + (this._cols[i] ? (x_pos - width) / this._cols[i] : 0);

      if (this._ignores) {
        if (column >= this._cols.length) {
          while (column >= 1 && this._ignores[Math.floor(column)]) {
            column--;
          }
        }
      }
    }

    return column;
  }; //transform mouse coordinates to day-time indexes of week based view


  scheduler._week_indexes_from_pos = function (pos) {
    //"get position" can be invoked before columns are loaded into the units view(e.g. by onMouseMove handler in key_nav.js)
    if (!this._cols) {
      return pos;
    } else {
      var column = this._get_column_index(pos.x);

      pos.x = Math.min(this._cols.length - 1, Math.max(0, Math.ceil(column) - 1));
      pos.y = Math.max(0, Math.ceil(pos.y * 60 / (this.config.time_step * this.config.hour_size_px)) - 1) + this.config.first_hour * (60 / this.config.time_step);
      return pos;
    }
  };

  scheduler._mouse_coords = function (ev) {
    var pos;
    var b = document.body;
    var d = document.documentElement;
    if (!this.$env.isIE && (ev.pageX || ev.pageY)) pos = {
      x: ev.pageX,
      y: ev.pageY
    };else pos = {
      x: ev.clientX + (b.scrollLeft || d.scrollLeft || 0) - b.clientLeft,
      y: ev.clientY + (b.scrollTop || d.scrollTop || 0) - b.clientTop
    }; //apply layout

    if (this.config.rtl && this._colsS) {
      pos.x = this.$container.querySelector(".dhx_cal_data").offsetWidth - pos.x;

      if (this._mode !== "month") {
        pos.x -= this.xy.scale_width;
      }
    } else {
      pos.x -= this.$domHelpers.getAbsoluteLeft(this._obj) + (this._table_view ? 0 : this.xy.scale_width);
    }

    var dataArea = this.$container.querySelector(".dhx_cal_data"); //pos.y-=this.$domHelpers.getAbsoluteTop(this._obj)+this.xy.nav_height+(this._dy_shift||0)+this.xy.scale_height-this._els["dhx_cal_data"][0].scrollTop;

    pos.y -= this.$domHelpers.getAbsoluteTop(dataArea) - this._els["dhx_cal_data"][0].scrollTop;
    pos.ev = ev;
    var handler = this["mouse_" + this._mode];

    if (handler) {
      pos = handler.call(this, pos);
    } else {
      //transform to date
      if (!this._table_view) {
        pos = this._week_indexes_from_pos(pos);
      } else {
        var column = this._get_column_index(pos.x);

        if (!this._cols || !this._colsS) // agenda/map views
          return pos;
        var dy = 0;

        for (dy = 1; dy < this._colsS.heights.length; dy++) {
          if (this._colsS.heights[dy] > pos.y) break;
        }

        pos.y = Math.ceil((Math.max(0, column) + Math.max(0, dy - 1) * 7) * 24 * 60 / this.config.time_step);
        if (scheduler._drag_mode || this._mode == "month") pos.y = (Math.max(0, Math.ceil(column) - 1) + Math.max(0, dy - 1) * 7) * 24 * 60 / this.config.time_step; //we care about ignored days only during event moving in month view

        if (this._drag_mode == "move") {
          if (scheduler._ignores_detected && scheduler.config.preserve_length) {
            pos._ignores = true; //get real lengtn of event

            if (!this._drag_event._event_length) this._drag_event._event_length = this._get_real_event_length(this._drag_event.start_date, this._drag_event.end_date, {
              x_step: 1,
              x_unit: "day"
            });
          }
        }

        pos.x = 0;
      }
    }

    pos.timestamp = +new Date();
    return pos;
  };

  scheduler._close_not_saved = function () {
    if (new Date().valueOf() - (scheduler._new_event || 0) > 500 && scheduler._edit_id) {
      var c = scheduler.locale.labels.confirm_closing;

      scheduler._dhtmlx_confirm(c, scheduler.locale.labels.title_confirm_closing, function () {
        scheduler.editStop(scheduler.config.positive_closing);
      });

      if (c) {
        this._drag_id = this._drag_pos = this._drag_mode = null;
      }
    }
  };

  scheduler._correct_shift = function (start, back) {
    return start -= (new Date(scheduler._min_date).getTimezoneOffset() - new Date(start).getTimezoneOffset()) * 60000 * (back ? -1 : 1);
  };

  scheduler._is_pos_changed = function (old_pos, new_pos) {
    function diff(old_val, new_val, acc) {
      return !!(Math.abs(old_val - new_val) > acc);
    }

    if (!(old_pos && this._drag_pos)) {
      return true;
    }

    var delay = 100,
        d_pos = 5; // start drag only if passed some time since mouse down, or if mouse position changed sufficiently

    return !!(this._drag_pos.has_moved || !this._drag_pos.timestamp || new_pos.timestamp - this._drag_pos.timestamp > delay || diff(old_pos.ev.clientX, new_pos.ev.clientX, d_pos) || diff(old_pos.ev.clientY, new_pos.ev.clientY, d_pos));
  };

  scheduler._correct_drag_start_date = function (start) {
    var obj;
    if (scheduler.matrix) obj = scheduler.matrix[scheduler._mode];
    obj = obj || {
      x_step: 1,
      x_unit: "day"
    };
    start = new Date(start);
    var len = 1;
    if (obj._start_correction || obj._end_correction) len = (obj.last_hour || 0) * 60 - (start.getHours() * 60 + start.getMinutes()) || 1;
    return start * 1 + (scheduler._get_fictional_event_length(start, len, obj) - len);
  };

  scheduler._correct_drag_end_date = function (start, duration) {
    var obj;
    if (scheduler.matrix) obj = scheduler.matrix[scheduler._mode];
    obj = obj || {
      x_step: 1,
      x_unit: "day"
    };

    var end = start * 1 + scheduler._get_fictional_event_length(start, duration, obj);

    return new Date(end * 1 - (scheduler._get_fictional_event_length(end, -1, obj, -1) + 1));
  };

  scheduler._on_mouse_move = function (e) {
    if (this._drag_mode) {
      var pos = this._mouse_coords(e);

      if (this._is_pos_changed(this._drag_pos, pos)) {
        var start, end;
        if (this._edit_id != this._drag_id) this._close_not_saved();
        if (!this._drag_mode) return;
        var mousedownPos = null;

        if (this._drag_pos && !this._drag_pos.has_moved) {
          mousedownPos = this._drag_pos;
          mousedownPos.has_moved = true;
        }

        this._drag_pos = pos;
        this._drag_pos.has_moved = true;

        if (this._drag_mode == "create") {
          // use mouse down position as a starting point for drag-create
          if (mousedownPos) {
            pos = mousedownPos;
          }

          this._close_not_saved();

          this.unselect(this._select_id);
          this._loading = true; //will be ignored by dataprocessor

          start = this._get_date_from_pos(pos).valueOf();

          if (!this._drag_start) {
            var res = this.callEvent("onBeforeEventCreated", [e, this._drag_id]);

            if (!res) {
              this._loading = false;
              return;
            }

            this._loading = false;
            this._drag_start = start;
            return;
          }

          end = start;

          if (end == this._drag_start) {}

          var start_date = new Date(this._drag_start);
          var end_date = new Date(end);

          if ((this._mode == "day" || this._mode == "week") && start_date.getHours() == end_date.getHours() && start_date.getMinutes() == end_date.getMinutes()) {
            end_date = new Date(this._drag_start + 1000);
          }

          this._drag_id = this.uid();
          this.addEvent(start_date, end_date, this.locale.labels.new_event, this._drag_id, pos.fields);
          this.callEvent("onEventCreated", [this._drag_id, e]);
          this._loading = false;
          this._drag_mode = "new-size";
        }

        var timeStep = this.config.time_step;
        var ev = this.getEvent(this._drag_id);
        var obj;
        if (scheduler.matrix) obj = scheduler.matrix[scheduler._mode];
        obj = obj || {
          x_step: 1,
          x_unit: "day"
        };

        if (this._drag_mode == "move") {
          start = this._min_date.valueOf() + (pos.y * this.config.time_step + pos.x * 24 * 60) * 60000;

          if (!pos.custom && this._table_view) {
            start += this.date.time_part(ev.start_date) * 1000;
          }

          if (!this._table_view && this._dragEventBody && this._drag_event._move_event_shift === undefined) {
            this._drag_event._move_event_shift = start - ev.start_date;
          }

          if (this._drag_event._move_event_shift) {
            start -= this._drag_event._move_event_shift;
          }

          start = this._correct_shift(start);

          if (pos._ignores && this.config.preserve_length && this._table_view) {
            start = scheduler._correct_drag_start_date(start);
            end = scheduler._correct_drag_end_date(start, this._drag_event._event_length);
          } else end = ev.end_date.valueOf() - (ev.start_date.valueOf() - start);
        } else {
          // resize
          start = ev.start_date.valueOf();
          end = ev.end_date.valueOf();

          if (this._table_view) {
            var resize_date = this._min_date.valueOf() + pos.y * this.config.time_step * 60000 + (pos.custom ? 0 : 24 * 60 * 60000);

            if (this._mode == "month") {
              resize_date = this._correct_shift(resize_date, false);

              if (this._drag_from_start) {
                var day = 24 * 60 * 60000;
                if (resize_date <= scheduler.date.date_part(new Date(end + day - 1)).valueOf()) // to get end time as 23:59:59 and then the day start
                  start = resize_date - day;
              } else {
                end = resize_date;
              }
            } else {
              if (this.config.preserve_length) {
                if (pos.resize_from_start) {
                  start = scheduler._correct_drag_start_date(resize_date);
                } else {
                  end = scheduler._correct_drag_end_date(resize_date, 0);
                }
              } else {
                if (pos.resize_from_start) {
                  start = resize_date;
                } else {
                  end = resize_date;
                }
              }
            }
          } else {
            var end_day_start = this.date.date_part(new Date(ev.end_date.valueOf() - 1)).valueOf();
            var end_day_date = new Date(end_day_start);
            var firstHour = this.config.first_hour;
            var lastHour = this.config.last_hour;
            var maxY = (lastHour - firstHour) * (60 / timeStep);
            this.config.time_step = 1;

            var precisePos = this._mouse_coords(e);

            this.config.time_step = timeStep;
            var minDate = pos.y * timeStep * 60000;
            var maxDate = Math.min(pos.y + 1, maxY) * timeStep * 60000;
            var preciseDate = precisePos.y * 60000; // rounding end date to the closest time step

            if (Math.abs(minDate - preciseDate) > Math.abs(maxDate - preciseDate)) {
              end = end_day_start + maxDate;
            } else {
              end = end_day_start + minDate;
            }

            end = end + (new Date(end).getTimezoneOffset() - end_day_date.getTimezoneOffset()) * 60000;
            this._els["dhx_cal_data"][0].style.cursor = "s-resize";
            if (this._mode == "week" || this._mode == "day") end = this._correct_shift(end);
          }

          if (this._drag_mode == "new-size") {
            if (end <= this._drag_start) {
              var shift = pos.shift || (this._table_view && !pos.custom ? 24 * 60 * 60000 : 0);
              start = end - (pos.shift ? 0 : shift);
              end = this._drag_start + (shift || timeStep * 60000);
            } else {
              start = this._drag_start;
            }
          } else {
            if (end <= start) end = start + timeStep * 60000;
          }
        }

        var new_end = new Date(end - 1);
        var new_start = new Date(start); //deny drag out of visible scheduler scale in timeline view

        if (this._drag_mode == "move" && scheduler.config.limit_drag_out && (+new_start < +scheduler._min_date || +end > +scheduler._max_date)) {
          if (+ev.start_date < +scheduler._min_date || +ev.end_date > +scheduler._max_date) {
            // not move event if it's already outside time scale
            new_start = new Date(ev.start_date);
            end = new Date(ev.end_date);
          } else {
            var duration = end - new_start;

            if (+new_start < +scheduler._min_date) {
              new_start = new Date(scheduler._min_date);

              if (pos._ignores && this.config.preserve_length && this._table_view) {
                new_start = new Date(scheduler._correct_drag_start_date(new_start));
                if (obj._start_correction) new_start = new Date(new_start.valueOf() + obj._start_correction);
                end = new Date(new_start * 1 + this._get_fictional_event_length(new_start, this._drag_event._event_length, obj));
              } else {
                end = new Date(+new_start + duration);
              }
            } else {
              end = new Date(scheduler._max_date);

              if (pos._ignores && this.config.preserve_length && this._table_view) {
                if (obj._end_correction) end = new Date(end.valueOf() - obj._end_correction);
                end = new Date(end * 1 - this._get_fictional_event_length(end, 0, obj, true));
                new_start = new Date(end * 1 - this._get_fictional_event_length(end, this._drag_event._event_length, obj, true));

                if (this._ignores_detected) {
                  new_start = scheduler.date.add(new_start, obj.x_step, obj.x_unit);
                  end = new Date(end * 1 - this._get_fictional_event_length(end, 0, obj, true));
                  end = scheduler.date.add(end, obj.x_step, obj.x_unit);
                }
              } else {
                new_start = new Date(+end - duration);
              }
            }
          }

          var new_end = new Date(end - 1);
        } // fix event dates when resized to bottom of the column (day/week views)


        if (!this._table_view && this._dragEventBody && !scheduler.config.all_timed && (!scheduler._get_section_view() && pos.x != this._get_event_sday({
          start_date: new Date(start),
          end_date: new Date(start)
        }) || new Date(start).getHours() < this.config.first_hour)) {
          var duration = end - new_start;

          if (this._drag_mode == "move") {
            var day = this._min_date.valueOf() + pos.x * 24 * 60 * 60000;
            new_start = new Date(day);
            new_start.setHours(this.config.first_hour);
            end = new Date(new_start.valueOf() + duration);
            new_end = new Date(end - 1);
          }
        } // fix event dates when resized to bottom of the column (day/week views)


        if (!this._table_view && !scheduler.config.all_timed && (!scheduler.getView() && pos.x != this._get_event_sday({
          start_date: new Date(end),
          end_date: new Date(end)
        }) || new Date(end).getHours() >= this.config.last_hour)) {
          var duration = end - new_start;
          var day = this._min_date.valueOf() + pos.x * 24 * 60 * 60000;
          end = scheduler.date.date_part(new Date(day));
          end.setHours(this.config.last_hour);
          new_end = new Date(end - 1);

          if (this._drag_mode == "move") {
            new_start = new Date(+end - duration);
          }
        } //prevent out-of-borders situation for day|week view


        if (this._table_view || new_end.getDate() == new_start.getDate() && new_end.getHours() < this.config.last_hour || scheduler._allow_dnd) {
          ev.start_date = new_start;
          ev.end_date = new Date(end);

          if (this.config.update_render) {
            //fix for repaint after dnd and scroll issue, #231
            var sx = scheduler._els["dhx_cal_data"][0].scrollTop;
            this.update_view();
            scheduler._els["dhx_cal_data"][0].scrollTop = sx;
          } else this.updateEvent(this._drag_id);
        }

        if (this._table_view) {
          this.for_rendered(this._drag_id, function (r) {
            r.className += " dhx_in_move dhx_cal_event_drag";
          });
        }

        this.callEvent("onEventDrag", [this._drag_id, this._drag_mode, e]);
      }
    } else {
      if (scheduler.checkEvent("onMouseMove")) {
        var id = this._locate_event(e.target || e.srcElement);

        this.callEvent("onMouseMove", [id, e]);
      }
    }
  };

  scheduler._on_mouse_down = function (e, src) {
    // on Mac we do not get onmouseup event when clicking right mouse button leaving us in dnd state
    // let's ignore right mouse button then
    if (e.button == 2) return;
    if (this.config.readonly || this._drag_mode) return;
    src = src || e.target || e.srcElement;

    var classname = scheduler._getClassName(src).split(" ")[0];

    if (this.config.drag_event_body && classname == "dhx_body") {
      if (src.parentNode && src.parentNode.className.indexOf("dhx_cal_select_menu") === -1) {
        classname = "dhx_event_move";
        this._dragEventBody = true;
      }
    }

    switch (classname) {
      case "dhx_cal_event_line":
      case "dhx_cal_event_clear":
        if (this._table_view) this._drag_mode = "move"; //item in table mode

        break;

      case "dhx_event_move":
      case "dhx_wa_ev_body":
        this._drag_mode = "move";
        break;

      case "dhx_event_resize":
        this._drag_mode = "resize";

        var fullClass = scheduler._getClassName(src);

        if (fullClass.indexOf("dhx_event_resize_end") < 0) {
          scheduler._drag_from_start = true;
        } else {
          scheduler._drag_from_start = false;
        }

        break;

      case "dhx_scale_holder":
      case "dhx_scale_holder_now":
      case "dhx_month_body":
      case "dhx_matrix_cell":
      case "dhx_marked_timespan":
        this._drag_mode = "create";
        break;

      case "":
        if (src.parentNode) return scheduler._on_mouse_down(e, src.parentNode);
        break;

      default:
        if (!scheduler.checkEvent("onMouseDown") || scheduler.callEvent("onMouseDown", [classname, e])) {
          if (src.parentNode && src != this && classname != "dhx_body") {
            return scheduler._on_mouse_down(e, src.parentNode);
          }
        }

        this._drag_mode = null;
        this._drag_id = null;
        break;
    }

    if (this._drag_mode) {
      var id = this._locate_event(src);

      if (!this.config["drag_" + this._drag_mode] || !this.callEvent("onBeforeDrag", [id, this._drag_mode, e])) this._drag_mode = this._drag_id = 0;else {
        this._drag_id = id;
        if (this._edit_id != this._drag_id || this._edit_id && this._drag_mode == "create") this._close_not_saved();
        if (!this._drag_mode) return;
        this._drag_event = scheduler._lame_clone(this.getEvent(this._drag_id) || {});
        this._drag_pos = this._mouse_coords(e);
      }
    }

    this._drag_start = null;
  };

  scheduler._get_private_properties = function (event) {
    var fields = {};

    for (var i in event) {
      if (i.indexOf("_") === 0) {
        fields[i] = true;
      }
    }

    return fields;
  };

  scheduler._clear_temporary_properties = function (clean, flagged_event) {
    var initial = this._get_private_properties(clean);

    var current_state = this._get_private_properties(flagged_event);

    for (var i in current_state) {
      if (!initial[i]) {
        delete flagged_event[i];
      }
    }
  };

  scheduler._on_mouse_up = function (e) {
    if (e && e.button == 2 && this._mobile) return;

    if (this._drag_mode && this._drag_id) {
      this._els["dhx_cal_data"][0].style.cursor = "default"; //drop

      var drag_id = this._drag_id;
      var mode = this._drag_mode;
      var moved = !this._drag_pos || this._drag_pos.has_moved;
      delete this._drag_event._move_event_shift;
      var ev = this.getEvent(this._drag_id);

      if (moved && (this._drag_event._dhx_changed || !this._drag_event.start_date || ev.start_date.valueOf() != this._drag_event.start_date.valueOf() || ev.end_date.valueOf() != this._drag_event.end_date.valueOf())) {
        var is_new = this._drag_mode == "new-size";

        if (!this.callEvent("onBeforeEventChanged", [ev, e, is_new, this._drag_event])) {
          if (is_new) this.deleteEvent(ev.id, true);else {
            this._drag_event._dhx_changed = false;

            this._clear_temporary_properties(ev, this._drag_event);

            scheduler._lame_copy(ev, this._drag_event);

            this.updateEvent(ev.id);
          }
        } else {
          this._drag_id = this._drag_mode = null;

          if (is_new && this.config.edit_on_create) {
            this.unselect();
            this._new_event = new Date(); //timestamp of creation
            //if selection disabled - force lightbox usage

            if (this._table_view || this.config.details_on_create || !this.config.select || !this.isOneDayEvent(this.getEvent(drag_id))) {
              scheduler.callEvent("onDragEnd", [drag_id, mode, e]);
              return this.showLightbox(drag_id);
            }

            this._drag_pos = true; //set flag to trigger full redraw

            this._select_id = this._edit_id = drag_id;
          } else {
            if (!this._new_event) this.callEvent(is_new ? "onEventAdded" : "onEventChanged", [drag_id, this.getEvent(drag_id)]);
          }
        }
      }

      if (this._drag_pos && (this._drag_pos.has_moved || this._drag_pos === true)) {
        this._drag_id = this._drag_mode = null; // set null to prevent _sorder recalculation for drag event

        this.render_view_data(); //redraw even if there is no real changes - necessary for correct positioning item after drag
      }

      scheduler.callEvent("onDragEnd", [drag_id, mode, e]);
    }

    this._drag_id = null;
    this._drag_mode = null;
    this._drag_pos = null;
  };

  scheduler._trigger_dyn_loading = function () {
    if (this._load_mode && this._load()) {
      this._render_wait = true;
      return true;
    } else {
      return false;
    }
  };

  scheduler.update_view = function () {
    this._reset_ignores();

    this._update_nav_bar(this.config.header, this.$container.querySelector(".dhx_cal_navline"));

    var view = this[this._mode + "_view"];

    if (view) {
      view.call(this, true);
    } else {
      this._reset_scale();
    }

    if (this._trigger_dyn_loading()) {
      return true;
    }

    this.render_view_data();
  };

  scheduler.isViewExists = function (mode) {
    return !!(scheduler[mode + "_view"] || scheduler.date[mode + "_start"] && scheduler.templates[mode + "_date"] && scheduler.templates[mode + "_scale_date"]);
  };

  scheduler._set_aria_buttons_attrs = function () {
    var buttonGroups = ["dhx_cal_next_button", "dhx_cal_prev_button", "dhx_cal_tab", "dhx_cal_today_button"];

    for (var i = 0; i < buttonGroups.length; i++) {
      var group = this._els[buttonGroups[i]];

      for (var j = 0; group && j < group.length; j++) {
        var name = group[j].getAttribute("data-tab") || group[j].getAttribute("name");
        var label = this.locale.labels[buttonGroups[i]];

        if (name) {
          label = this.locale.labels[name + "_tab"] || this.locale.labels[name] || label;
        }

        if (buttonGroups[i] == "dhx_cal_next_button") {
          label = this.locale.labels.next;
        } else if (buttonGroups[i] == "dhx_cal_prev_button") {
          label = this.locale.labels.prev;
        }

        this._waiAria.headerButtonsAttributes(group[j], label || "");
      }
    }
  };

  scheduler.updateView = function (date, mode) {
    if (!this.$container) {
      throw new Error("The scheduler is not initialized. \n **scheduler.updateView** or **scheduler.setCurrentView** can be called only after **scheduler.init**");
    }

    date = date || this._date;
    mode = mode || this._mode;
    var dhx_cal_data = 'dhx_cal_data';
    var container = this._obj;
    var oldClass = "dhx_scheduler_" + this._mode;
    var newClass = "dhx_scheduler_" + mode;

    if (!this._mode || container.className.indexOf(oldClass) == -1) {
      container.className += " " + newClass;
    } else {
      container.className = container.className.replace(oldClass, newClass);
    }

    var dhx_multi_day = 'dhx_multi_day';
    var prev_scroll = this._mode == mode && this.config.preserve_scroll ? this._els[dhx_cal_data][0].scrollTop : false; // saving current scroll

    var multidayScroll;

    if (this._els[dhx_multi_day] && this._els[dhx_multi_day][0]) {
      multidayScroll = this._els[dhx_multi_day][0].scrollTop;
    } //hide old custom view


    if (this[this._mode + "_view"] && mode && this._mode != mode) this[this._mode + "_view"](false);

    this._close_not_saved();

    if (this._els[dhx_multi_day]) {
      this._els[dhx_multi_day][0].parentNode.removeChild(this._els[dhx_multi_day][0]);

      this._els[dhx_multi_day] = null;
    }

    this._mode = mode;
    this._date = date;
    this._table_view = this._mode == "month";
    this._dy_shift = 0; //correction for multiday section in week/day views
    //show new view

    this.update_view();

    this._set_aria_buttons_attrs();

    var tabs = this._els["dhx_cal_tab"];

    if (tabs) {
      //calendar can work without view tabs
      for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[i];

        if (tab.getAttribute("data-tab") == this._mode || tab.getAttribute("name") == this._mode + "_tab") {
          tab.classList.add("active");

          this._waiAria.headerToggleState(tab, true);
        } else {
          tab.classList.remove("active");

          this._waiAria.headerToggleState(tab, false);
        }
      }
    }

    if (typeof prev_scroll == "number") // if we are updating or working with the same view scrollTop should be saved
      this._els[dhx_cal_data][0].scrollTop = prev_scroll; // restoring original scroll

    if (typeof multidayScroll == "number" && this._els[dhx_multi_day] && this._els[dhx_multi_day][0]) {
      this._els[dhx_multi_day][0].scrollTop = multidayScroll;
    }
  };

  scheduler.setCurrentView = function (date, mode) {
    if (!this.callEvent("onBeforeViewChange", [this._mode, this._date, mode || this._mode, date || this._date])) return;
    this.updateView(date, mode);
    this.callEvent("onViewChange", [this._mode, this._date]);
  };

  scheduler.render = function (date, mode) {
    scheduler.setCurrentView(date, mode);
  };

  scheduler._render_x_header = function (i, left, d, h, offset_top) {
    offset_top = offset_top || 0; //header scale

    var head = document.createElement("div");
    head.className = "dhx_scale_bar";

    if (this.templates[this._mode + "_scalex_class"]) {
      //'_scalex_class' - timeline already have similar template, use the same name
      head.className += ' ' + this.templates[this._mode + "_scalex_class"](d);
    }

    var width = this._cols[i] - 1;

    if (this._mode == "month" && i === 0 && this.config.left_border) {
      head.className += " dhx_scale_bar_border";
      left = left + 1;
    }

    this.set_xy(head, width, this.xy.scale_height - 2, left, offset_top); //-1 for border

    var columnHeaderText = this.templates[this._mode + "_scale_date"](d, this._mode); //TODO - move in separate method

    head.innerHTML = columnHeaderText;

    this._waiAria.dayHeaderAttr(head, columnHeaderText);

    h.appendChild(head);
  };

  scheduler._get_columns_num = function (from, to) {
    var count = 7;

    if (!scheduler._table_view) {
      var count_n = scheduler.date["get_" + scheduler._mode + "_end"];
      if (count_n) to = count_n(from);
      count = Math.round((to.valueOf() - from.valueOf()) / (1000 * 60 * 60 * 24));
    }

    return count;
  };

  scheduler._get_timeunit_start = function () {
    //start date of currently displayed time unit(day, week,...)
    return this.date[this._mode + "_start"](new Date(this._date.valueOf()));
  };

  scheduler._get_view_end = function () {
    var dd = this._get_timeunit_start();

    var ed = scheduler.date.add(dd, 1, this._mode);

    if (!scheduler._table_view) {
      var count_n = scheduler.date["get_" + scheduler._mode + "_end"];
      if (count_n) ed = count_n(dd);
    }

    return ed;
  };

  scheduler._calc_scale_sizes = function (width, from, to) {
    //
    //calculates number of displayed columns(days/units/month view cols) and their widths
    var rtl = this.config.rtl;
    var summ = width; //border delta

    var count = this._get_columns_num(from, to); //if (this.config.rtl) this._process_ignores(scheduler.date.add(to, -1, "day"), count, "day", -1);
    //else


    this._process_ignores(from, count, "day", 1);

    var realcount = count - this._ignores_detected;

    for (var i = 0; i < count; i++) {
      if (this._ignores[i]) {
        this._cols[i] = 0;
        realcount++;
      } else {
        this._cols[i] = Math.floor(summ / (realcount - i));
      }

      summ -= this._cols[i];
      this._colsS[i] = (this._cols[i - 1] || 0) + (this._colsS[i - 1] || (this._table_view ? 0 : (rtl ? this.xy.scroll_width : this.xy.scale_width) + 2)); //this._colsS[j]=(this._cols[rtl ? j+1 : (i-1)]||0)+(this._colsS[rtl ? j+1 : (i-1)]||(this._table_view?0:(rtl?this.xy.scroll_width:this.xy.scale_width)+2));
    }

    this._colsS['col_length'] = count;
    this._colsS[count] = this._cols[count - 1] + this._colsS[count - 1] || 0; //this._colsS[count] = (this._cols[rtl ? 0 : count-1]+this._colsS[rtl ? 0 : count-1]) || 0;
  };

  scheduler._set_scale_col_size = function (div, width, left) {
    var c = this.config;
    this.set_xy(div, width - 1, c.hour_size_px * (c.last_hour - c.first_hour), left + this.xy.scale_width + 1, 0); //-1 for border
  };

  scheduler._render_scales = function (header, data_area) {
    //render columns in week/units view, or header in month view
    var sd = new Date(scheduler._min_date),
        ed = new Date(scheduler._max_date),
        today = this.date.date_part(scheduler._currentDate());
    var summ = parseInt(header.style.width, 10); //border delta

    var d = new Date(this._min_date); // if (this.config.rtl) {
    // 	d = new Date(scheduler.date.add(this._max_date, -1, "day"));
    // }

    var count = this._get_columns_num(sd, ed);

    this._calc_scale_sizes(summ, sd, ed);

    var left = 0;
    header.innerHTML = "";

    for (var i = 0; i < count; i++) {
      if (!this._ignores[i]) {
        this._render_x_header(i, left, d, header);
      }

      if (!this._table_view) {
        var scales = document.createElement("div");
        var cls = "dhx_scale_holder";
        if (d.valueOf() == today.valueOf()) cls = "dhx_scale_holder_now";
        scales.setAttribute("data-column-index", i);

        if (this._ignores_detected && this._ignores[i]) {
          cls += " dhx_scale_ignore";
        }

        scales.className = cls + " " + this.templates.week_date_class(d, today);

        this._waiAria.dayColumnAttr(scales, d);

        this._set_scale_col_size(scales, this._cols[i], left);

        data_area.appendChild(scales);
        this.callEvent("onScaleAdd", [scales, d]);
      }

      left += this._cols[i]; //if (this.config.rtl) d=this.date.add(d,-1,"day");
      //else

      d = this.date.add(d, 1, "day");
      d = this.date.day_start(d);
    }
  };

  scheduler._getNavDateElement = function () {
    return this.$container.querySelector(".dhx_cal_date");
  };

  scheduler._reset_scale = function () {
    //current mode doesn't support scales
    //we mustn't call reset_scale for such modes, so it just to be sure
    if (!this.templates[this._mode + "_date"]) return;
    var h = this._els["dhx_cal_header"][0];
    var data_area = this._els["dhx_cal_data"][0];
    var c = this.config;
    h.innerHTML = ""; //data_area.scrollTop = 0; //fix flickering in FF; makes IE8 flicker instead

    data_area.innerHTML = "";
    var str = (c.readonly || !c.drag_resize ? " dhx_resize_denied" : "") + (c.readonly || !c.drag_move ? " dhx_move_denied" : "");
    data_area.className = "dhx_cal_data" + str;
    this._scales = {};
    this._cols = []; //store for data section

    this._colsS = {
      height: 0
    };
    this._dy_shift = 0;
    this.set_sizes();
    var d, sd;

    var dd = this._get_timeunit_start(),
        ed = scheduler._get_view_end();

    d = sd = this._table_view ? scheduler.date.week_start(dd) : dd;
    this._min_date = d;
    var navBarDateStr = this.templates[this._mode + "_date"](dd, ed, this._mode);

    var scaleElement = this._getNavDateElement();

    if (scaleElement) {
      scaleElement.innerHTML = navBarDateStr;

      this._waiAria.navBarDateAttr(scaleElement, navBarDateStr);
    }

    this._max_date = ed;

    scheduler._render_scales(h, data_area);

    if (this._table_view) // month view
      this._reset_month_scale(data_area, dd, sd);else {
      this._reset_hours_scale(data_area, dd, sd);

      if (c.multi_day) {
        var dhx_multi_day = 'dhx_multi_day';

        if (this._els[dhx_multi_day]) {
          this._els[dhx_multi_day][0].parentNode.removeChild(this._els[dhx_multi_day][0]);

          this._els[dhx_multi_day] = null;
        }

        var navline = this._els["dhx_cal_navline"][0];
        var top = navline.offsetHeight + this._els["dhx_cal_header"][0].offsetHeight + 1;
        var c1 = document.createElement("div");
        c1.className = dhx_multi_day;
        c1.style.visibility = "hidden";
        var totalWidth = this._colsS[this._colsS.col_length];
        var offset = c.rtl ? this.xy.scale_width : this.xy.scroll_width;
        var hiddenWidth = Math.max(totalWidth + offset - 2, 0);
        this.set_xy(c1, hiddenWidth, 0, 0, top); // 2 extra borders, dhx_header has -1 bottom margin

        data_area.parentNode.insertBefore(c1, data_area);
        var c2 = c1.cloneNode(true);
        c2.className = dhx_multi_day + "_icon";
        c2.style.visibility = "hidden";
        this.set_xy(c2, this.xy.scale_width, 0, 0, top); // dhx_header has -1 bottom margin

        c1.appendChild(c2);
        this._els[dhx_multi_day] = [c1, c2];
        scheduler.event(this._els[dhx_multi_day][0], "click", this._click.dhx_cal_data);
      }
    }
  };

  scheduler._reset_hours_scale = function (b, dd, sd) {
    var c = document.createElement("div");
    c.className = "dhx_scale_holder";
    var date = new Date(1980, 1, 1, this.config.first_hour, 0, 0);

    for (var i = this.config.first_hour * 1; i < this.config.last_hour; i++) {
      var cc = document.createElement("div");
      cc.className = "dhx_scale_hour";
      cc.style.height = this.config.hour_size_px + "px";
      var width = this.xy.scale_width;

      if (this.config.left_border) {
        cc.className += " dhx_scale_hour_border";
      }

      cc.style.width = width + "px";
      var content = scheduler.templates.hour_scale(date);
      cc.innerHTML = content;

      this._waiAria.hourScaleAttr(cc, content);

      c.appendChild(cc);
      date = this.date.add(date, 1, "hour");
    }

    b.appendChild(c);
    if (this.config.scroll_hour) b.scrollTop = this.config.hour_size_px * (this.config.scroll_hour - this.config.first_hour);
  };

  scheduler._currentDate = function () {
    if (scheduler.config.now_date) {
      return new Date(scheduler.config.now_date);
    }

    return new Date();
  };

  scheduler._reset_ignores = function () {
    this._ignores = {};
    this._ignores_detected = 0;
  };

  scheduler._process_ignores = function (sd, n, mode, step, preserve) {
    this._reset_ignores();

    var ignore = scheduler["ignore_" + this._mode];

    if (ignore) {
      var ign_date = new Date(sd);

      for (var i = 0; i < n; i++) {
        if (ignore(ign_date)) {
          this._ignores_detected += 1;
          this._ignores[i] = true;
          if (preserve) n++;
        }

        ign_date = scheduler.date.add(ign_date, step, mode);
        if (scheduler.date[mode + '_start']) ign_date = scheduler.date[mode + '_start'](ign_date);
      }
    }
  };

  scheduler._render_month_scale = function (div, dd
  /*month start*/
  , sd
  /*view start*/
  , rows) {
    //renders month view layout
    var ed = scheduler.date.add(dd, 1, "month"),
        view_start = new Date(sd);

    var cd = scheduler._currentDate();

    this.date.date_part(cd);
    this.date.date_part(sd);
    rows = rows || Math.ceil(Math.round((ed.valueOf() - sd.valueOf()) / (60 * 60 * 24 * 1000)) / 7);
    var tdwidths = [];

    for (var i = 0; i <= 7; i++) {
      var cell_width = (this._cols[i] || 0) - 1;

      if (i === 0 && this.config.left_border) {
        cell_width = cell_width - 1;
      }

      tdwidths[i] = cell_width + "px";
    }

    function getCellHeight(row) {
      var h = scheduler._colsS.height;

      if (scheduler._colsS.heights[row + 1] !== undefined) {
        h = scheduler._colsS.heights[row + 1] - (scheduler._colsS.heights[row] || 0);
      }

      return h;
    }

    var cellheight = 0;
    var table = document.createElement("table");
    table.setAttribute("cellpadding", "0");
    table.setAttribute("cellspacing", "0");
    var tableBody = document.createElement("tbody");
    table.appendChild(tableBody);
    var rendered_dates = [];

    for (var i = 0; i < rows; i++) {
      var row = document.createElement("tr");
      tableBody.appendChild(row);
      var row_height = Math.max(getCellHeight(i) - scheduler.xy.month_head_height, 0);

      for (var j = 0; j < 7; j++) {
        var cell = document.createElement("td");
        row.appendChild(cell);
        var cls = "";
        if (sd < dd) cls = 'dhx_before';else if (sd >= ed) cls = 'dhx_after';else if (sd.valueOf() == cd.valueOf()) cls = 'dhx_now';

        if (this._ignores_detected && this._ignores[j]) {
          cls += " dhx_scale_ignore";
        }

        cell.className = cls + " " + this.templates.month_date_class(sd, cd);
        cell.setAttribute("data-cell-date", scheduler.templates.format_date(sd));
        var body_class = "dhx_month_body";
        var head_class = "dhx_month_head";

        if (j === 0 && this.config.left_border) {
          body_class += " dhx_month_body_border";
          head_class += " dhx_month_head_border";
        }

        if (!this._ignores_detected || !this._ignores[j]) {
          this._waiAria.monthCellAttr(cell, sd);

          var cellHead = document.createElement("div");
          cellHead.className = head_class;
          cellHead.innerHTML = this.templates.month_day(sd);
          cell.appendChild(cellHead);
          var cellBody = document.createElement("div");
          cellBody.className = body_class;
          cellBody.style.height = row_height + "px";
          cellBody.style.width = tdwidths[j];
          cell.appendChild(cellBody);
        } else {
          cell.appendChild(document.createElement("div"));
          cell.appendChild(document.createElement("div"));
        }

        rendered_dates.push(sd);
        var bf1 = sd.getDate();
        sd = this.date.add(sd, 1, "day");
        if (sd.getDate() - bf1 > 1) sd = new Date(sd.getFullYear(), sd.getMonth(), bf1 + 1, 12, 0);
      }

      scheduler._colsS.heights[i] = cellheight;
      cellheight += getCellHeight(i);
    }

    this._min_date = view_start;
    this._max_date = sd;
    div.innerHTML = "";
    div.appendChild(table);
    this._scales = {};
    var divs = div.getElementsByTagName('div');

    for (var i = 0; i < rendered_dates.length; i++) {
      // [header, body, header, body, ...]
      var div = divs[i * 2 + 1];
      var date = rendered_dates[i];
      this._scales[+date] = div;
    }

    for (var i = 0; i < rendered_dates.length; i++) {
      var date = rendered_dates[i];
      this.callEvent("onScaleAdd", [this._scales[+date], date]);
    }

    return this._max_date;
  };

  scheduler._reset_month_scale = function (b, dd, sd, rows) {
    //recalculates rows height and redraws month layout
    var ed = scheduler.date.add(dd, 1, "month"); //trim time part for comparison reasons

    var cd = scheduler._currentDate();

    this.date.date_part(cd);
    this.date.date_part(sd);
    rows = rows || Math.ceil(Math.round((ed.valueOf() - sd.valueOf()) / (60 * 60 * 24 * 1000)) / 7);
    var height = Math.floor(b.clientHeight / rows) - this.xy.month_head_height;
    this._colsS.height = height + this.xy.month_head_height;
    this._colsS.heights = [];
    return scheduler._render_month_scale(b, dd, sd, rows);
  };

  scheduler.getView = function (viewName) {
    if (!viewName) {
      viewName = scheduler.getState().mode;
    }

    if (scheduler.matrix && scheduler.matrix[viewName]) {
      return scheduler.matrix[viewName];
    }

    if (scheduler._props && scheduler._props[viewName]) {
      return scheduler._props[viewName];
    }

    return null;
  };

  scheduler.getLabel = function (property, key) {
    var sections = this.config.lightbox.sections;

    for (var i = 0; i < sections.length; i++) {
      if (sections[i].map_to == property) {
        var options = sections[i].options;

        for (var j = 0; j < options.length; j++) {
          if (options[j].key == key) {
            return options[j].label;
          }
        }
      }
    }

    return "";
  };

  scheduler.updateCollection = function (list_name, collection) {
    var list = scheduler.serverList(list_name);
    if (!list) return false;
    list.splice(0, list.length);
    list.push.apply(list, collection || []);
    scheduler.callEvent("onOptionsLoad", []);
    scheduler.resetLightbox();
    scheduler.hideCover();
    return true;
  };

  scheduler._lame_clone = function (object, cache) {
    var i, t, result; // iterator, types array, result

    cache = cache || [];

    for (i = 0; i < cache.length; i += 2) {
      if (object === cache[i]) return cache[i + 1];
    }

    if (object && _typeof(object) == "object") {
      result = Object.create(object); // preserve prototype methods

      t = [Array, Date, Number, String, Boolean];

      for (i = 0; i < t.length; i++) {
        if (object instanceof t[i]) result = i ? new t[i](object) : new t[i](); // first one is array
      }

      cache.push(object, result);

      for (i in object) {
        if (Object.prototype.hasOwnProperty.apply(object, [i])) result[i] = scheduler._lame_clone(object[i], cache);
      }
    }

    return result || object;
  };

  scheduler._lame_copy = function (target, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }

    return target;
  };

  scheduler._get_date_from_pos = function (pos) {
    var start = this._min_date.valueOf() + (pos.y * this.config.time_step + (this._table_view ? 0 : pos.x) * 24 * 60) * 60000; //if (this.config.rtl) start=scheduler.date.add(this._max_date, -1, "day").valueOf()+(pos.y*this.config.time_step-(this._table_view?0:pos.x)*24*60)*60000;

    return new Date(this._correct_shift(start));
  }; // n_ev - native event


  scheduler.getActionData = function (n_ev) {
    var pos = this._mouse_coords(n_ev);

    return {
      date: this._get_date_from_pos(pos),
      section: pos.section
    };
  };

  scheduler._focus = function (node, select) {
    if (node && node.focus) {
      if (this._mobile) {
        window.setTimeout(function () {
          node.focus();
        }, 10);
      } else {
        try {
          if (select && node.select && node.offsetWidth) {
            node.select();
          }

          node.focus();
        } catch (e) {}
      }
    }
  }; //non-linear scales


  scheduler._get_real_event_length = function (sd, fd, obj) {
    var ev_length = fd - sd;
    var hours = obj._start_correction + obj._end_correction || 0;
    var ignore = this["ignore_" + this._mode];
    var start_slot = 0,
        end_slot;

    if (obj.render) {
      start_slot = this._get_date_index(obj, sd);
      end_slot = this._get_date_index(obj, fd);
    } else {
      end_slot = Math.round(ev_length / 60 / 60 / 1000 / 24);
    }

    var last_column = true;

    while (start_slot < end_slot) {
      var check = scheduler.date.add(fd, -obj.x_step, obj.x_unit);

      if (ignore && ignore(fd) && (!last_column || last_column && ignore(check))) {
        ev_length -= fd - check;
      } else {
        last_column = false;
        ev_length -= hours;
      }

      fd = check;
      end_slot--;
    }

    return ev_length;
  };

  scheduler._get_fictional_event_length = function (end_date, ev_length, obj, back) {
    var sd = new Date(end_date);
    var dir = back ? -1 : 1; //get difference caused by first|last hour

    if (obj._start_correction || obj._end_correction) {
      var today;
      if (back) today = sd.getHours() * 60 + sd.getMinutes() - (obj.first_hour || 0) * 60;else today = (obj.last_hour || 0) * 60 - (sd.getHours() * 60 + sd.getMinutes());
      var per_day = (obj.last_hour - obj.first_hour) * 60;
      var days = Math.ceil((ev_length / (60 * 1000) - today) / per_day);
      if (days < 0) days = 0;
      ev_length += days * (24 * 60 - per_day) * 60 * 1000;
    }

    var fd = new Date(end_date * 1 + ev_length * dir);
    var ignore = this["ignore_" + this._mode];
    var start_slot = 0,
        end_slot;

    if (obj.render) {
      start_slot = this._get_date_index(obj, sd);
      end_slot = this._get_date_index(obj, fd);
    } else {
      end_slot = Math.round(ev_length / 60 / 60 / 1000 / 24);
    }

    while (start_slot * dir <= end_slot * dir) {
      var check = scheduler.date.add(sd, obj.x_step * dir, obj.x_unit);

      if (ignore && ignore(sd)) {
        ev_length += (check - sd) * dir;
        end_slot += dir;
      }

      sd = check;
      start_slot += dir;
    }

    return ev_length;
  };

  scheduler._get_section_view = function () {
    return this.getView();
  };

  scheduler._get_section_property = function () {
    if (this.matrix && this.matrix[this._mode]) {
      return this.matrix[this._mode].y_property;
    } else if (this._props && this._props[this._mode]) {
      return this._props[this._mode].map_to;
    }

    return null;
  };

  scheduler._is_initialized = function () {
    var state = this.getState();
    return this._obj && state.date && state.mode;
  };

  scheduler._is_lightbox_open = function () {
    var state = this.getState();
    return state.lightbox_id !== null && state.lightbox_id !== undefined;
  };
}

/***/ }),

/***/ "./sources/core/scheduler_resize_listener.js":
/*!***************************************************!*\
  !*** ./sources/core/scheduler_resize_listener.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
function extend(scheduler) {
  function isAttachedNode(container) {
    var root = document.body;

    while (container && container != root) {
      container = container.parentNode;
    }

    return !!(root == container);
  }

  function getWindowSize(window) {
    return {
      w: window.innerWidth || document.documentElement.clientWidth,
      h: window.innerHeight || document.documentElement.clientHeight
    };
  }

  function equals(a, b) {
    return a.w == b.w && a.h == b.h;
  }

  function listenWindowResize(scheduler, window) {
    var oldSize = getWindowSize(window);
    var resizeDelay;
    scheduler.event(window, "resize", function () {
      clearTimeout(resizeDelay);
      resizeDelay = setTimeout(function () {
        if (!isAttachedNode(scheduler.$container)) {
          return;
        }

        var newSize = getWindowSize(window); // element may be resized by container-autoresize exteinsion
        // check if the size is actually changed in order to not to get endless loop

        if (!equals(oldSize, newSize)) {
          oldSize = newSize;
          triggerSchedulerResize(scheduler);
        }
      }, 150);
    });
  }

  function triggerSchedulerResize(scheduler) {
    if (scheduler.$destroyed || !scheduler.$root || !isAttachedNode(scheduler.$root)) {
      return;
    }

    if (scheduler.callEvent("onSchedulerResize", [])) {
      scheduler.updateView();
      scheduler.callEvent("onAfterSchedulerResize", []);
    }
  }

  function watchNodeResize(scheduler) {
    var previousHeight = scheduler.$root.offsetHeight;
    var previousWidth = scheduler.$root.offsetWidth;

    function lowlevelResizeWatcher() {
      if (scheduler.$destroyed) {
        return;
      }

      if (scheduler.$root) {
        if (scheduler.$root.offsetHeight != previousHeight || scheduler.$root.offsetWidth != previousWidth) {
          triggerSchedulerResize(scheduler);
        }

        previousHeight = scheduler.$root.offsetHeight;
        previousWidth = scheduler.$root.offsetWidth;
      }

      setTimeout(lowlevelResizeWatcher, 200);
    }

    lowlevelResizeWatcher();
  }

  function addResizeListener(scheduler) {
    var root = scheduler.$container;
    var containerStyles = window.getComputedStyle(root);

    if (containerStyles.getPropertyValue("position") == "static") {
      root.style.position = "relative";
    }

    var resizeWatcher = document.createElement('iframe');
    resizeWatcher.className = "scheduler_container_resize_watcher";
    resizeWatcher.tabIndex = -1;

    if (scheduler.config.wai_aria_attributes) {
      resizeWatcher.setAttribute("role", "none");
      resizeWatcher.setAttribute("aria-hidden", true);
    } // in some environments (namely, in SalesForce) iframe.contentWindow is not available


    var salesforce_environment = !!window["Sfdc"] || !!window["$A"] || window["Aura"];

    if (salesforce_environment) {
      watchNodeResize(scheduler);
    } else {
      root.appendChild(resizeWatcher);

      if (resizeWatcher.contentWindow) {
        listenWindowResize(scheduler, resizeWatcher.contentWindow);
      } else {
        // if so - ditch the iframe and fallback to listening the main window resize
        root.removeChild(resizeWatcher);
        listenWindowResize(scheduler, window);
      }
    }
  }

  addResizeListener(scheduler);
}

/***/ }),

/***/ "./sources/core/skins.js":
/*!*******************************!*\
  !*** ./sources/core/skins.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
function extend(scheduler) {
  scheduler._skin_settings = {
    fix_tab_position: [1, 0],
    use_select_menu_space: [1, 0],
    wide_form: [1, 0],
    hour_size_px: [44, 42],
    displayed_event_color: ["#ff4a4a", "ffc5ab"],
    displayed_event_text_color: ["#ffef80", "7e2727"]
  };
  scheduler._skin_xy = {
    lightbox_additional_height: [90, 50],
    nav_height: [59, 22],
    bar_height: [24, 20]
  }; // material skin uses a different box sizing model than other skins, and also requires some post-processing.
  // In order to render events correctly, we need to know which box sizing model is used
  // We can detect it by styles applied, taking into account that styles may be loaded after scheduler is rendered

  scheduler._is_material_skin = function () {
    if (!scheduler.skin) {
      return checkIfMaterialSkin();
    } else {
      return (scheduler.skin + "").indexOf("material") > -1;
    }
  };

  var calculatedMaterial;

  function checkIfMaterialSkin() {
    if (calculatedMaterial === undefined) {
      var probe = document.createElement("div");
      probe.style.position = "absolute";
      probe.style.left = "-9999px";
      probe.style.top = "-9999px";
      probe.innerHTML = "<div class='dhx_cal_container'>" + "<div class='dhx_cal_scale_placeholder'>" + "</div>" + "<div>";
      document.body.appendChild(probe);
      var styles = window.getComputedStyle(probe.querySelector(".dhx_cal_scale_placeholder"));
      var position = styles.getPropertyValue('position');

      if (position === "absolute") {
        // page has skins for placeholder element from material skin
        calculatedMaterial = true;
      } else {
        calculatedMaterial = false;
      }

      setTimeout(function () {
        calculatedMaterial = null;
      }, 500);
    }

    return calculatedMaterial;
  }

  var cachedBorderBoxValue;

  function checkIfBorderBoxStyling() {
    if (scheduler._is_material_skin()) {
      return true;
    } else {
      if (cachedBorderBoxValue === undefined) {
        var probe = document.createElement("div");
        probe.style.position = "absolute";
        probe.style.left = "-9999px";
        probe.style.top = "-9999px";
        probe.innerHTML = "<div class='dhx_cal_container'>" + "<div class='dhx_cal_data'>" + "<div class='dhx_cal_event'><div class='dhx_body'></div>" + "</div>" + "<div>";
        document.body.appendChild(probe);
        var styles = window.getComputedStyle(probe.querySelector(".dhx_body"));
        var boxSizing = styles.getPropertyValue('box-sizing');
        document.body.removeChild(probe);
        cachedBorderBoxValue = !!(boxSizing === "border-box");

        if (!cachedBorderBoxValue) {
          setTimeout(function () {
            cachedBorderBoxValue = undefined;
          }, 1000); // recalculate in case scheduler initialized before skin is loaded
        }
      } else {
        return cachedBorderBoxValue;
      }
    }
  }

  function refreshAfterLoad() {
    if (scheduler._is_material_skin() || scheduler._border_box_events()) {
      return;
    }

    var oldStyling = cachedBorderBoxValue;
    cachedBorderBoxValue = undefined;
    calculatedMaterial = undefined;
    var newStyling = checkIfBorderBoxStyling(); // if box styling model changed - means scheduler was rendered before stylesheet was loaded or parsed inline
    // repaint scheduler in order to apply new styles

    if (oldStyling !== newStyling && scheduler.$container && scheduler.getState().mode) {
      scheduler.setCurrentView();
    }
  }

  window.addEventListener('DOMContentLoaded', refreshAfterLoad);
  window.addEventListener('load', refreshAfterLoad);

  scheduler._border_box_events = function () {
    return checkIfBorderBoxStyling();
  };

  scheduler._configure = function (col, data, skin) {
    for (var key in data) {
      if (typeof col[key] == "undefined") col[key] = data[key][skin];
    }
  };

  scheduler._skin_init = function () {
    if (!scheduler.skin) {
      var links = document.getElementsByTagName("link");

      for (var i = 0; i < links.length; i++) {
        var res = links[i].href.match("dhtmlxscheduler_([a-z]+).css");

        if (res) {
          scheduler.skin = res[1];
          break;
        }
      }
    }

    var set = 0;
    if (scheduler.skin && (scheduler.skin === "classic" || scheduler.skin === "glossy")) set = 1;

    if (scheduler._is_material_skin()) {
      var defaultButtonsLeft = scheduler.config.buttons_left.$initial;
      var defaultButtonsRight = scheduler.config.buttons_right.$initial;

      if (defaultButtonsLeft && scheduler.config.buttons_left.slice().join() == defaultButtonsLeft && defaultButtonsRight && scheduler.config.buttons_right.slice().join() == defaultButtonsRight) {
        var tmp = scheduler.config.buttons_left.slice();
        scheduler.config.buttons_left = scheduler.config.buttons_right.slice();
        scheduler.config.buttons_right = tmp;
      }

      scheduler.xy.event_header_height = 18; //	scheduler.xy.menu_width = 25;

      scheduler.xy.week_agenda_scale_height = 35;
      scheduler.xy.map_icon_width = 38;
      scheduler._lightbox_controls.defaults.textarea.height = 64;
      scheduler._lightbox_controls.defaults.time.height = 'auto';
    } //apply skin related settings


    this._configure(scheduler.config, scheduler._skin_settings, set);

    this._configure(scheduler.xy, scheduler._skin_xy, set);

    if (scheduler.skin === "flat") {
      scheduler.xy.scale_height = 35;

      scheduler.templates.hour_scale = function (date) {
        var min = date.getMinutes();
        min = min < 10 ? "0" + min : min;
        var html = "<span class='dhx_scale_h'>" + date.getHours() + "</span>" + "<span class='dhx_scale_m'>&nbsp;" + min + "</span>";
        return html;
      };
    } //classic skin need not any further customization


    if (set) return;
    var minic = scheduler.config.minicalendar;
    if (minic) minic.padding = 14;

    scheduler.templates.event_bar_date = function (start, end, ev) {
      return "• <b>" + scheduler.templates.event_date(start) + "</b> ";
    }; //scheduler._lightbox_template="<div class='dhx_cal_ltitle'><span class='dhx_mark'>&nbsp;</span><span class='dhx_time'></span><span class='dhx_title'></span><div class='dhx_close_icon'></div></div><div class='dhx_cal_larea'></div>";


    scheduler.attachEvent("onTemplatesReady", function () {
      var date_to_str = scheduler.date.date_to_str("%d");

      if (!scheduler.templates._old_month_day) {
        scheduler.templates._old_month_day = scheduler.templates.month_day;
      }

      var old_month_day = scheduler.templates._old_month_day;

      scheduler.templates.month_day = function (date) {
        if (this._mode == "month") {
          var label = date_to_str(date);

          if (date.getDate() == 1) {
            label = scheduler.locale.date.month_full[date.getMonth()] + " " + label;
          }

          if (+date == +scheduler.date.date_part(this._currentDate())) {
            label = scheduler.locale.labels.dhx_cal_today_button + " " + label;
          }

          return label;
        } else {
          return old_month_day.call(this, date);
        }
      };

      if (scheduler.config.fix_tab_position) {
        var navline_divs = scheduler._els["dhx_cal_navline"][0].getElementsByTagName('div');

        var minical = null; //var tabs = [];

        var last = 211;
        var positions = [14, 75, 136];
        var inc = 14;

        if (scheduler._is_material_skin()) {
          positions = [16, 103, 192];
          last = 294;
          inc = -1;
        }

        for (var i = 0; i < navline_divs.length; i++) {
          var div = navline_divs[i];
          var name = div.getAttribute("data-tab") || div.getAttribute("name");

          if (name) {
            // mode tab
            div.style.right = "auto";

            switch (name) {
              case "day":
              case "day_tab":
                div.style.left = positions[0] + "px";
                div.className += " dhx_cal_tab_first";
                break;

              case "week":
              case "week_tab":
                div.style.left = positions[1] + "px";
                break;

              case "month":
              case "month_tab":
                div.style.left = positions[2] + "px";
                div.className += " dhx_cal_tab_last";
                break;

              default:
                div.style.left = last + "px";
                div.className += " dhx_cal_tab_standalone";
                last = last + inc + div.offsetWidth;
                break;
            }

            div.className += " " + name;
          } else {
            if ((div.className || "").indexOf("dhx_minical_icon") === 0 && div.parentNode == scheduler._els["dhx_cal_navline"][0]) {
              // if default minicalendar icon
              minical = div;
            }
          }
        }

        if (minical) {
          minical.style.left = last + "px";
        }
      }
    });

    scheduler._skin_init = function () {};
  };
}

/***/ }),

/***/ "./sources/core/touch.js":
/*!*******************************!*\
  !*** ./sources/core/touch.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
function extend(scheduler) {
  scheduler._init_touch_events = function () {
    var mobile = this.config.touch && (navigator.userAgent.indexOf("Mobile") != -1 || navigator.userAgent.indexOf("iPad") != -1 || navigator.userAgent.indexOf("Android") != -1 || navigator.userAgent.indexOf("Touch") != -1) && !window.MSStream || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;

    if (mobile) {
      this.xy.scroll_width = 0;
      this._mobile = true;
    }

    if (this.config.touch) {
      var touchEventsSupported = true;

      try {
        document.createEvent("TouchEvent");
      } catch (e) {
        touchEventsSupported = false;
      }

      if (touchEventsSupported) {
        this._touch_events(["touchmove", "touchstart", "touchend"], function (ev) {
          if (ev.touches && ev.touches.length > 1) return null;
          if (ev.touches[0]) return {
            target: ev.target,
            pageX: ev.touches[0].pageX,
            pageY: ev.touches[0].pageY,
            clientX: ev.touches[0].clientX,
            clientY: ev.touches[0].clientY
          };else return ev;
        }, function () {
          return false;
        });
      } else if (window.PointerEvent || window.navigator.pointerEnabled) {
        this._touch_events(["pointermove", "pointerdown", "pointerup"], function (ev) {
          if (ev.pointerType == "mouse") return null;
          return ev;
        }, function (ev) {
          return !ev || ev.pointerType == "mouse";
        });
      } else if (window.navigator.msPointerEnabled) {
        this._touch_events(["MSPointerMove", "MSPointerDown", "MSPointerUp"], function (ev) {
          if (ev.pointerType == ev.MSPOINTER_TYPE_MOUSE) return null;
          return ev;
        }, function (ev) {
          return !ev || ev.pointerType == ev.MSPOINTER_TYPE_MOUSE;
        });
      }
    }
  };

  scheduler._touch_events = function (names, accessor, ignore) {
    //webkit on android need to be handled separately
    //var a_webkit = (navigator.userAgent.indexOf("Android")!=-1) && (navigator.userAgent.indexOf("WebKit")!=-1);
    var source, tracker, timer, drag_mode, scroll_mode, action_mode;
    var dblclicktime = 0;

    function attachTouchEvent(element, name, callback) {
      //touch gestures must be disabled when ligthbox is opened
      element.addEventListener(name, function (e) {
        if (scheduler._is_lightbox_open()) {
          return true;
        } else {
          if (ignore(e)) return;
          return callback(e);
        }
      }, {
        passive: false
      });
    }

    function check_direction_swipe(s_ev, e_ev, step, max_dy) {
      if (!s_ev || !e_ev) return false;
      var t = s_ev.target;

      while (t && t != scheduler._obj) {
        t = t.parentNode;
      }

      if (t != scheduler._obj) {
        //swipe outside scheduler
        return false;
      } // ignore swipe in horizontal timeline


      if (scheduler.matrix && scheduler.matrix[scheduler.getState().mode]) {
        var timeline = scheduler.matrix[scheduler.getState().mode];

        if (timeline.scrollable) {
          return false;
        }
      }

      var dy = Math.abs(s_ev.pageY - e_ev.pageY);
      var dx = Math.abs(s_ev.pageX - e_ev.pageX);

      if (dy < max_dy && dx > step && (!dy || dx / dy > 3)) {
        if (s_ev.pageX > e_ev.pageX) {
          scheduler._click.dhx_cal_next_button();
        } else {
          scheduler._click.dhx_cal_prev_button();
        }

        return true;
      }

      return false;
    }

    function doMouseMove(e) {
      if (ignore(e)) return;
      var dnd = scheduler.getState().drag_mode,
          timeline = scheduler.matrix ? scheduler.matrix[scheduler._mode] : false;
      var original_render = scheduler.render_view_data;

      if (dnd == 'create' && timeline) {
        //suppress full redraw of timeline on creating event
        scheduler.render_view_data = function () {
          var id = scheduler.getState().drag_id;
          var ev = scheduler.getEvent(id);
          var property = timeline.y_property;
          var evs = scheduler.getEvents(ev.start_date, ev.end_date);

          for (var i = 0; i < evs.length; i++) {
            if (evs[i][property] != ev[property]) {
              evs.splice(i, 1);
              i--;
            }
          }

          ev._sorder = evs.length - 1;
          ev._count = evs.length;
          this.render_data([ev], scheduler.getState().mode);
        };
      }

      scheduler._on_mouse_move(e);

      if (dnd == 'create' && timeline) {
        scheduler.render_view_data = original_render;
      }

      if (e.preventDefault) e.preventDefault();
      e.cancelBubble = true;
      return false;
    } // touchmove


    attachTouchEvent(document.body, names[0], function (e) {
      if (ignore(e)) return;
      var acc = accessor(e);
      if (!acc) return;

      if (drag_mode) {
        doMouseMove(acc);
        if (e.preventDefault) e.preventDefault();
        e.cancelBubble = true;

        scheduler._update_global_tip();

        return false;
      } //if (tracker && a_webkit){
      //	check_direction_swipe(tracker, accessor(e), 0);
      //}


      tracker = accessor(e); //ignore common and scrolling moves

      if (!action_mode) return; //multitouch

      if (!tracker) {
        scroll_mode = true;
        return;
      } //target changed - probably in scroll mode


      if (source.target != tracker.target || Math.abs(source.pageX - tracker.pageX) > 5 || Math.abs(source.pageY - tracker.pageY) > 5) {
        scroll_mode = true;
        clearTimeout(timer);
      }
    }); //attachTouchEvent(this._els["dhx_cal_data"][0], "scroll", drag_cancel);

    attachTouchEvent(this._els["dhx_cal_data"][0], "touchcancel", drag_cancel);
    attachTouchEvent(this._els["dhx_cal_data"][0], "contextmenu", function (e) {
      if (ignore(e)) return;

      if (action_mode) {
        if (e && e.preventDefault) e.preventDefault();
        e.cancelBubble = true;
        return false;
      }
    }); // touchstart

    attachTouchEvent(this._obj, names[1], function (e) {
      // block pull-to-refresh
      if (document && document.body) {
        document.body.classList.add("dhx_cal_touch_active");
      }

      if (ignore(e)) return;
      scheduler._pointerDragId = e.pointerId;
      var fake_event;
      drag_mode = scroll_mode = false;
      action_mode = true;
      fake_event = tracker = accessor(e);

      if (!fake_event) {
        scroll_mode = true;
        return;
      } //dbl click


      var now = new Date();

      if (!scroll_mode && !drag_mode && now - dblclicktime < 250) {
        scheduler._click.dhx_cal_data(fake_event);

        window.setTimeout(function () {
          fake_event.type = "dblclick";

          scheduler._on_dbl_click(fake_event);
        }, 50);
        if (e.preventDefault) e.preventDefault();
        e.cancelBubble = true;
        scheduler._block_next_stop = true;
        return false;
      }

      dblclicktime = now; //drag

      if (scroll_mode || drag_mode || !scheduler.config.touch_drag) return;

      var actTask = scheduler._locate_event(document.activeElement);

      var fakeTask = scheduler._locate_event(fake_event.target);

      var sourceTask = source ? scheduler._locate_event(source.target) : null;

      if (actTask && fakeTask && actTask == fakeTask && actTask != sourceTask) {
        if (e.preventDefault) {
          e.preventDefault();
        }

        e.cancelBubble = true;
        scheduler._ignore_next_click = false;

        scheduler._click.dhx_cal_data(fake_event);

        source = fake_event;
        return false;
      } //there is no target


      timer = setTimeout(function () {
        drag_mode = true;
        var target = source.target;

        var className = scheduler._getClassName(target);

        if (target && className.indexOf("dhx_body") != -1) target = target.previousSibling;

        scheduler._on_mouse_down(source, target);

        if (scheduler._drag_mode && scheduler._drag_mode != "create") {
          scheduler.for_rendered(scheduler._drag_id, function (node, i) {
            node.style.display = 'none';

            scheduler._rendered.splice(i, 1);
          });
        }

        if (scheduler.config.touch_tip) {
          scheduler._show_global_tip();
        }

        scheduler.updateEvent(scheduler._drag_id);
      }, scheduler.config.touch_drag);
      source = fake_event;
    });

    function drag_cancel(e) {
      if (ignore(e)) return;

      scheduler._hide_global_tip();

      if (drag_mode) {
        scheduler._on_mouse_up(accessor(e));

        scheduler._temp_touch_block = false;
      }

      scheduler._drag_id = null;
      scheduler._drag_mode = null;
      scheduler._drag_pos = null;
      scheduler._pointerDragId = null;
      clearTimeout(timer);
      drag_mode = action_mode = false;
      scroll_mode = true;
    } // touch end


    attachTouchEvent(this._els["dhx_cal_data"][0], names[2], function (e) {
      if (document && document.body) {
        document.body.classList.remove("dhx_cal_touch_active");
      }

      if (ignore(e)) return;

      if (scheduler.config.touch_swipe_dates) {
        if (!drag_mode && check_direction_swipe(source, tracker, 200, 100)) {
          scheduler._block_next_stop = true;
        }
      }

      if (drag_mode) {
        scheduler._ignore_next_click = true;
        setTimeout(function () {
          scheduler._ignore_next_click = false;
        }, 100);
      }

      drag_cancel(e);

      if (scheduler._block_next_stop) {
        scheduler._block_next_stop = false;
        if (e.preventDefault) e.preventDefault();
        e.cancelBubble = true;
        return false;
      }
    });
    scheduler.event(document.body, names[2], drag_cancel);
  };

  scheduler._show_global_tip = function () {
    scheduler._hide_global_tip();

    var toptip = scheduler._global_tip = document.createElement("div");
    toptip.className = 'dhx_global_tip';

    scheduler._update_global_tip(1);

    document.body.appendChild(toptip);
  };

  scheduler._update_global_tip = function (init) {
    var toptip = scheduler._global_tip;

    if (toptip) {
      var time = "";

      if (scheduler._drag_id && !init) {
        var ev = scheduler.getEvent(scheduler._drag_id);
        if (ev) time = "<div>" + (ev._timed ? scheduler.templates.event_header(ev.start_date, ev.end_date, ev) : scheduler.templates.day_date(ev.start_date, ev.end_date, ev)) + "</div>";
      }

      if (scheduler._drag_mode == "create" || scheduler._drag_mode == "new-size") toptip.innerHTML = (scheduler.locale.labels.drag_to_create || "Drag to create") + time;else toptip.innerHTML = (scheduler.locale.labels.drag_to_move || "Drag to move") + time;
    }
  };

  scheduler._hide_global_tip = function () {
    var toptip = scheduler._global_tip;

    if (toptip && toptip.parentNode) {
      toptip.parentNode.removeChild(toptip);
      scheduler._global_tip = 0;
    }
  };
}

/***/ }),

/***/ "./sources/core/utils/ajax.js":
/*!************************************!*\
  !*** ./sources/core/utils/ajax.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
/* harmony import */ var _bluebird__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bluebird */ "./sources/core/utils/bluebird.js");
/* harmony import */ var _common_url_serialize_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/url_serialize.js */ "./sources/core/common/url_serialize.js");
/* harmony import */ var _common_url_serialize_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_common_url_serialize_js__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



function extend(scheduler) {
  scheduler.Promise = _bluebird__WEBPACK_IMPORTED_MODULE_0__["default"]; // bluebird package (./bluebird.js)

  function createConfig(method, args) {
    var result = {
      method: method
    };

    if (args.length === 0) {
      throw new Error("Arguments list of query is wrong.");
    }

    if (args.length === 1) {
      if (typeof args[0] === "string") {
        result.url = args[0];
        result.async = true;
      } else {
        result.url = args[0].url;
        result.async = args[0].async || true;
        result.callback = args[0].callback;
        result.headers = args[0].headers;
      }

      if (method === "POST" || "PUT") {
        if (args[0].data) {
          if (typeof args[0].data !== "string") {
            result.data = _common_url_serialize_js__WEBPACK_IMPORTED_MODULE_1___default()(args[0].data);
          } else {
            result.data = args[0].data;
          }
        } else {
          result.data = "";
        }
      }

      return result;
    }

    result.url = args[0];

    switch (method) {
      case "GET":
      case "DELETE":
        result.callback = args[1];
        result.headers = args[2];
        break;

      case "POST":
      case "PUT":
        if (args[1]) {
          if (typeof args[1] !== "string") {
            result.data = _common_url_serialize_js__WEBPACK_IMPORTED_MODULE_1___default()(args[1]);
          } else {
            result.data = args[1];
          }
        } else {
          result.data = "";
        }

        result.callback = args[2];
        result.headers = args[3];
        break;
    }

    return result;
  }

  scheduler.ajax = {
    // if false - dhxr param will added to prevent caching on client side (default),
    // if true - do not add extra params
    cache: true,
    // default method for load/loadStruct, post/get allowed
    method: "get",
    serializeRequestParams: _common_url_serialize_js__WEBPACK_IMPORTED_MODULE_1___default.a,
    parse: function parse(data) {
      if (typeof data !== "string") return data;
      var obj;
      data = data.replace(/^[\s]+/, "");

      if (typeof DOMParser !== "undefined" && !scheduler.$env.isIE) {
        // ff,ie9
        obj = new DOMParser().parseFromString(data, "text/xml");
      } else if (typeof window.ActiveXObject !== "undefined") {
        obj = new window.ActiveXObject("Microsoft.XMLDOM");
        obj.async = "false";
        obj.loadXML(data);
      }

      return obj;
    },
    xmltop: function xmltop(tagname, xhr, obj) {
      if (typeof xhr.status == "undefined" || xhr.status < 400) {
        var xml = !xhr.responseXML ? this.parse(xhr.responseText || xhr) : xhr.responseXML || xhr;

        if (xml && xml.documentElement !== null && !xml.getElementsByTagName("parsererror").length) {
          return xml.getElementsByTagName(tagname)[0];
        }
      }

      if (obj !== -1) scheduler.callEvent("onLoadXMLError", ["Incorrect XML", arguments[1], obj]);
      return document.createElement("DIV");
    },
    xpath: function xpath(xpathExp, docObj) {
      if (!docObj.nodeName) docObj = docObj.responseXML || docObj;

      if (scheduler.$env.isIE) {
        return docObj.selectNodes(xpathExp) || [];
      } else {
        var rows = [];
        var first;
        var col = (docObj.ownerDocument || docObj).evaluate(xpathExp, docObj, null, XPathResult.ANY_TYPE, null);

        while (true) {
          first = col.iterateNext();

          if (first) {
            rows.push(first);
          } else {
            break;
          }
        }

        return rows;
      }
    },
    query: function query(config) {
      return this._call(config.method || "GET", config.url, config.data || "", config.async || true, config.callback, config.headers);
    },
    get: function get(url, onLoad, headers) {
      var config = createConfig("GET", arguments);
      return this.query(config);
    },
    getSync: function getSync(url, headers) {
      var config = createConfig("GET", arguments);
      config.async = false;
      return this.query(config);
    },
    put: function put(url, postData, onLoad, headers) {
      var config = createConfig("PUT", arguments);
      return this.query(config);
    },
    del: function del(url, onLoad, headers) {
      /**
       * https://tools.ietf.org/html/rfc7231#section-4.3.5
       * A payload within a DELETE request message has no defined semantics;
       * sending a payload body on a DELETE request might cause some existing
       * implementations to reject the request.
       */
      var config = createConfig("DELETE", arguments);
      return this.query(config);
    },
    post: function post(url, postData, onLoad, headers) {
      if (arguments.length == 1) {
        postData = "";
      } else if (arguments.length == 2 && typeof postData == "function") {
        onLoad = postData;
        postData = "";
      }

      var config = createConfig("POST", arguments);
      return this.query(config);
    },
    postSync: function postSync(url, postData, headers) {
      postData = postData === null ? "" : String(postData);
      var config = createConfig("POST", arguments);
      config.async = false;
      return this.query(config);
    },
    _call: function _call(method, url, postData, async, onLoad, headers) {
      return new scheduler.Promise(function (resolve, reject) {
        var t = (typeof XMLHttpRequest === "undefined" ? "undefined" : _typeof(XMLHttpRequest)) !== undefined && !scheduler.$env.isIE ? new XMLHttpRequest() : new window.ActiveXObject("Microsoft.XMLHTTP");
        var isQt = navigator.userAgent.match(/AppleWebKit/) !== null && navigator.userAgent.match(/Qt/) !== null && navigator.userAgent.match(/Safari/) !== null;

        if (!!async) {
          t.addEventListener("readystatechange", function () {
            if (t.readyState == 4 || isQt && t.readyState == 3) {
              // what for long response and status 404?
              if (t.status != 200 || t.responseText === "") if (!scheduler.callEvent("onAjaxError", [t])) return;
              setTimeout(function () {
                if (typeof onLoad == "function") {
                  onLoad.apply(window, [{
                    xmlDoc: t,
                    filePath: url
                  }]); // dhtmlx-compat, response.xmlDoc.responseXML/responseText
                }

                resolve(t);

                if (typeof onLoad == "function") {
                  onLoad = null;
                  t = null;
                }
              }, 0);
            }
          });
        }

        if (method == "GET" && !this.cache) {
          url += (url.indexOf("?") >= 0 ? "&" : "?") + "dhxr" + new Date().getTime() + "=1";
        }

        t.open(method, url, async);

        if (headers) {
          for (var key in headers) {
            t.setRequestHeader(key, headers[key]);
          }
        } else if (method.toUpperCase() == "POST" || method == "PUT" || method == "DELETE") {
          t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        } else if (method == "GET") {
          postData = null;
        }

        t.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        t.send(postData);
        if (!async) return {
          xmlDoc: t,
          filePath: url
        }; // dhtmlx-compat, response.xmlDoc.responseXML/responseText
      }.bind(this));
    },
    urlSeparator: function urlSeparator(str) {
      if (str.indexOf("?") != -1) return "&";else return "?";
    }
  };
  scheduler.$ajax = scheduler.ajax; // for old
}

/***/ }),

/***/ "./sources/core/utils/bluebird.js":
/*!****************************************!*\
  !*** ./sources/core/utils/bluebird.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bluebird_js_browser_bluebird_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bluebird/js/browser/bluebird.core */ "./node_modules/bluebird/js/browser/bluebird.core.js");
/* harmony import */ var bluebird_js_browser_bluebird_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bluebird_js_browser_bluebird_core__WEBPACK_IMPORTED_MODULE_0__);

/** 
 * @preserve
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013-2018 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */

/**
 * bluebird build version 3.7.2
 * Features enabled: core
 * Features disabled: race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
*/

/* harmony default export */ __webpack_exports__["default"] = (bluebird_js_browser_bluebird_core__WEBPACK_IMPORTED_MODULE_0__["Promise"]);

/***/ }),

/***/ "./sources/core/utils/dom_helpers.js":
/*!*******************************************!*\
  !*** ./sources/core/utils/dom_helpers.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//returns position of html element on the page
function elementPosition(elem) {
  var top = 0,
      left = 0,
      right = 0,
      bottom = 0;

  if (elem.getBoundingClientRect) {
    //HTML5 method
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var docElem = document.documentElement || document.body.parentNode || document.body;
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;
    top = box.top + scrollTop - clientTop;
    left = box.left + scrollLeft - clientLeft;
    right = document.body.offsetWidth - box.right;
    bottom = document.body.offsetHeight - box.bottom;
  } else {
    //fallback to naive approach
    while (elem) {
      top = top + parseInt(elem.offsetTop, 10);
      left = left + parseInt(elem.offsetLeft, 10);
      elem = elem.offsetParent;
    }

    right = document.body.offsetWidth - elem.offsetWidth - left;
    bottom = document.body.offsetHeight - elem.offsetHeight - top;
  }

  return {
    y: Math.round(top),
    x: Math.round(left),
    width: elem.offsetWidth,
    height: elem.offsetHeight,
    right: Math.round(right),
    bottom: Math.round(bottom)
  };
}
/*
event position relatively to DOM element
 */


function getRelativeEventPosition(ev, node) {
  var d = document.documentElement;
  var box = elementPosition(node);
  return {
    x: ev.clientX + d.scrollLeft - d.clientLeft - box.x + node.scrollLeft,
    y: ev.clientY + d.scrollTop - d.clientTop - box.y + node.scrollTop
  };
}

function getClassName(node) {
  if (!node) return "";
  var className = node.className || "";
  if (className.baseVal) //'className' exist but not a string - IE svg element in DOM
    className = className.baseVal;
  if (!className.indexOf) className = '';
  return className || "";
}

function locateCss(e, classname, strict) {
  if (strict === undefined) strict = true;
  var trg = e.target || e.srcElement;
  var css = '';

  while (trg) {
    css = getClassName(trg);

    if (css) {
      var ind = css.indexOf(classname);

      if (ind >= 0) {
        if (!strict) return trg; //check that we have exact match

        var left = ind === 0 || !(css.charAt(ind - 1) || "").trim();
        var right = ind + classname.length >= css.length || !css.charAt(ind + classname.length).trim();
        if (left && right) return trg;
      }
    }

    trg = trg.parentNode;
  }

  return null;
} // get focusable nodes


function isVisible(node) {
  var display = false,
      visibility = false;

  if (window.getComputedStyle) {
    var style = window.getComputedStyle(node, null);
    display = style["display"];
    visibility = style["visibility"];
  } else if (node.currentStyle) {
    display = node.currentStyle["display"];
    visibility = node.currentStyle["visibility"];
  }

  var hiddenSection = false;
  var recurringSection = locateCss({
    target: node
  }, "dhx_form_repeat", false);

  if (recurringSection) {
    hiddenSection = !!(recurringSection.style.height == "0px");
  }

  hiddenSection = hiddenSection || !node.offsetHeight;
  return display != "none" && visibility != "hidden" && !hiddenSection;
}

function hasNonNegativeTabIndex(node) {
  return !isNaN(node.getAttribute("tabindex")) && node.getAttribute("tabindex") * 1 >= 0;
}

function hasHref(node) {
  var canHaveHref = {
    "a": true,
    "area": true
  };

  if (canHaveHref[node.nodeName.loLowerCase()]) {
    return !!node.getAttribute("href");
  }

  return true;
}

function isEnabled(node) {
  var canDisable = {
    "input": true,
    "select": true,
    "textarea": true,
    "button": true,
    "object": true
  };

  if (canDisable[node.nodeName.toLowerCase()]) {
    return !node.hasAttribute("disabled");
  }

  return true;
}

function getFocusableNodes(root) {
  var nodes = root.querySelectorAll(["a[href]", "area[href]", "input", "select", "textarea", "button", "iframe", "object", "embed", "[tabindex]", "[contenteditable]"].join(", "));
  var nodesArray = Array.prototype.slice.call(nodes, 0);

  for (var i = 0; i < nodesArray.length; i++) {
    nodesArray[i].$position = i; // we remember original nodes order, 
    // so when we sort them by tabindex we ensure order of nodes with same tabindex is preserved, 
    // since some browsers do unstable sort
  }

  nodesArray.sort(function (a, b) {
    if (a.tabIndex === 0 && b.tabIndex !== 0) {
      return 1;
    }

    if (a.tabIndex !== 0 && b.tabIndex === 0) {
      return -1;
    }

    if (a.tabIndex === b.tabIndex) {
      // ensure we do stable sort
      return a.$position - b.$position;
    }

    if (a.tabIndex < b.tabIndex) {
      return -1;
    }

    return 1;
  });

  for (var i = 0; i < nodesArray.length; i++) {
    var node = nodesArray[i];
    var isValid = (hasNonNegativeTabIndex(node) || isEnabled(node) || hasHref(node)) && isVisible(node);

    if (!isValid) {
      nodesArray.splice(i, 1);
      i--;
    }
  }

  return nodesArray;
}

function isShadowDomSupported() {
  return document.head.createShadowRoot || document.head.attachShadow;
}
/**
 * Returns element that has the browser focus, or null if no element has focus.
 * Works with shadow DOM, so it's prefereed to use this function instead of document.activeElement directly.
 * @returns HTMLElement
 */


function getActiveElement() {
  var activeElement = document.activeElement;

  if (activeElement.shadowRoot) {
    activeElement = activeElement.shadowRoot.activeElement;
  }

  if (activeElement === document.body && document.getSelection) {
    activeElement = document.getSelection().focusNode || document.body;
  }

  return activeElement;
}
/**
 * Returns document.body or the host node of the ShadowRoot, if the element is attached to ShadowDom
 * @param {HTMLElement} element 
 * @returns HTMLElement
 */


function getRootNode(element) {
  if (!element) {
    return document.body;
  }

  if (!isShadowDomSupported()) {
    return document.body;
  }

  while (element.parentNode && (element = element.parentNode)) {
    if (element instanceof ShadowRoot) {
      return element.host;
    }
  }

  return document.body;
}

function hasShadowParent(element) {
  return !!getRootNode(element);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  /**
   *     @desc: Calculate absolute position of html object
   *     @type: private
   *     @param: htmlObject - html object
   *     @topic: 0
   */
  getAbsoluteLeft: function getAbsoluteLeft(htmlObject) {
    return this.getOffset(htmlObject).left;
  },

  /**
   *     @desc: Calculate absolute position of html object
   *     @type: private
   *     @param: htmlObject - html object
   *     @topic: 0
   */
  getAbsoluteTop: function getAbsoluteTop(htmlObject) {
    return this.getOffset(htmlObject).top;
  },
  getOffsetSum: function getOffsetSum(elem) {
    var top = 0,
        left = 0;

    while (elem) {
      top = top + parseInt(elem.offsetTop);
      left = left + parseInt(elem.offsetLeft);
      elem = elem.offsetParent;
    }

    return {
      top: top,
      left: left
    };
  },
  getOffsetRect: function getOffsetRect(elem) {
    var box = elem.getBoundingClientRect();
    var top = 0,
        left = 0; // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#Mobile_Tablet_or_Desktop

    if (!/Mobi/.test(navigator.userAgent)) {
      var body = document.body;
      var docElem = document.documentElement;
      var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
      var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
      var clientTop = docElem.clientTop || body.clientTop || 0;
      var clientLeft = docElem.clientLeft || body.clientLeft || 0;
      top = box.top + scrollTop - clientTop;
      left = box.left + scrollLeft - clientLeft;
    } else {
      // incorrect left coordinate on mobile zoom
      // https://bugs.chromium.org/p/chromium/issues/detail?id=489206
      var dummy = document.createElement("div");
      dummy.style.position = "absolute";
      dummy.style.left = "0px";
      dummy.style.top = "0px";
      dummy.style.width = "1px";
      dummy.style.height = "1px";
      document.body.appendChild(dummy);
      var dummyBox = dummy.getBoundingClientRect();
      top = box.top - dummyBox.top;
      left = box.left - dummyBox.left;
      dummy.parentNode.removeChild(dummy);
    }

    return {
      top: Math.round(top),
      left: Math.round(left)
    };
  },
  getOffset: function getOffset(elem) {
    if (elem.getBoundingClientRect) {
      return this.getOffsetRect(elem);
    } else {
      return this.getOffsetSum(elem);
    }
  },
  closest: function closest(element, selector) {
    if (!element || !selector) {
      return null;
    }

    return _closest(element, selector);
  },
  insertAfter: function insertAfter(newNode, referenceNode) {
    if (referenceNode.nextSibling) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    } else {
      referenceNode.parentNode.appendChild(newNode);
    }
  },
  remove: function remove(node) {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  },
  getFocusableNodes: getFocusableNodes,
  getClassName: getClassName,
  locateCss: locateCss,
  getRootNode: getRootNode,
  hasShadowParent: hasShadowParent,
  isShadowDomSupported: isShadowDomSupported,
  getActiveElement: getActiveElement,
  getRelativeEventPosition: getRelativeEventPosition
});

var _closest;

if (Element.prototype.closest) {
  _closest = function _closest(element, selector) {
    return element.closest(selector);
  };
} else {
  var matches = Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

  _closest = function _closest(element, selector) {
    var el = element;

    do {
      if (matches.call(el, selector)) {
        return el;
      }

      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);

    return null;
  };
}

/***/ }),

/***/ "./sources/core/utils/event.js":
/*!*************************************!*\
  !*** ./sources/core/utils/event.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  event: function event(el, _event, handler) {
    if (el.addEventListener) el.addEventListener(_event, handler, false);else if (el.attachEvent) el.attachEvent("on" + _event, handler);
  },
  eventRemove: function eventRemove(el, event, handler) {
    if (el.removeEventListener) el.removeEventListener(event, handler, false);else if (el.detachEvent) el.detachEvent("on" + event, handler);
  }
});

/***/ }),

/***/ "./sources/core/utils/scoped_event.js":
/*!********************************************!*\
  !*** ./sources/core/utils/scoped_event.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event */ "./sources/core/utils/event.js");

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var domEvents = function domEvents(addEvent, removeEvent) {
    addEvent = addEvent || _event__WEBPACK_IMPORTED_MODULE_0__["default"].event;
    removeEvent = removeEvent || _event__WEBPACK_IMPORTED_MODULE_0__["default"].eventRemove;
    var handlers = [];
    var eventScope = {
      attach: function attach(el, event, callback, capture) {
        handlers.push({
          element: el,
          event: event,
          callback: callback,
          capture: capture
        });
        addEvent(el, event, callback, capture);
      },
      detach: function detach(el, event, callback, capture) {
        removeEvent(el, event, callback, capture);

        for (var i = 0; i < handlers.length; i++) {
          var handler = handlers[i];

          if (handler.element === el && handler.event === event && handler.callback === callback && handler.capture === capture) {
            handlers.splice(i, 1);
            i--;
          }
        }
      },
      detachAll: function detachAll() {
        var staticArray = handlers.slice(); // original handlers array can be spliced on every iteration

        for (var i = 0; i < staticArray.length; i++) {
          var handler = staticArray[i];
          eventScope.detach(handler.element, handler.event, handler.callback, handler.capture);
          eventScope.detach(handler.element, handler.event, handler.callback, undefined);
          eventScope.detach(handler.element, handler.event, handler.callback, false);
          eventScope.detach(handler.element, handler.event, handler.callback, true);
        }

        handlers.splice(0, handlers.length);
      },
      extend: function extend() {
        return domEvents(this.event, this.eventRemove);
      }
    };
    return eventScope;
  };

  return domEvents();
});

/***/ }),

/***/ "./sources/core/utils/utils.js":
/*!*************************************!*\
  !*** ./sources/core/utils/utils.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var uidSeed = Date.now();

function uid() {
  return uidSeed++;
} // iframe-safe array type check instead of using instanceof


function isArray(obj) {
  if (Array.isArray) {
    return Array.isArray(obj);
  } else {
    // close enough
    return obj && obj.length !== undefined && obj.pop && obj.push;
  }
} // non-primitive string object, e.g. new String("abc")


function isStringObject(obj) {
  return obj && _typeof(obj) === "object" && Function.prototype.toString.call(obj.constructor) === "function String() { [native code] }";
} // non-primitive number object, e.g. new Number(5)


function isNumberObject(obj) {
  return obj && _typeof(obj) === "object" && Function.prototype.toString.call(obj.constructor) === "function Number() { [native code] }";
} // non-primitive number object, e.g. new Boolean(true)


function isBooleanObject(obj) {
  return obj && _typeof(obj) === "object" && Function.prototype.toString.call(obj.constructor) === "function Boolean() { [native code] }";
}

function isDate(obj) {
  if (obj && _typeof(obj) === "object") {
    return !!(obj.getFullYear && obj.getMonth && obj.getDate);
  } else {
    return false;
  }
}

function defined(obj) {
  return typeof obj != "undefined";
}

/* harmony default export */ __webpack_exports__["default"] = ({
  uid: uid,
  mixin: function mixin(target, source, force) {
    for (var f in source) {
      if (target[f] === undefined || force) target[f] = source[f];
    }

    return target;
  },
  copy: function copy(object) {
    var i, result; // iterator, types array, result

    if (object && _typeof(object) == "object") {
      switch (true) {
        case isDate(object):
          result = new Date(object);
          break;

        case isArray(object):
          result = new Array(object.length);

          for (i = 0; i < object.length; i++) {
            result[i] = copy(object[i]);
          }

          break;

        case isStringObject(object):
          result = new String(object); // jshint ignore:line

          break;

        case isNumberObject(object):
          result = new Number(object); // jshint ignore:line

          break;

        case isBooleanObject(object):
          result = new Boolean(object); // jshint ignore:line

          break;

        default:
          result = {};

          for (i in object) {
            if (Object.prototype.hasOwnProperty.apply(object, [i])) result[i] = copy(object[i]);
          }

          break;
      }
    }

    return result || object;
  },
  defined: defined,
  isDate: isDate
});

/***/ }),

/***/ "./sources/core/wai_aria.js":
/*!**********************************!*\
  !*** ./sources/core/wai_aria.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return extend; });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function extend(scheduler) {
  (function () {
    // eslint-disable-next-line no-control-regex
    var htmlTags = new RegExp("<(?:.|\n)*?>", "gm");
    var extraSpaces = new RegExp(" +", "gm");

    function stripHTMLLite(htmlText) {
      return (htmlText + "").replace(htmlTags, " ").replace(extraSpaces, " ");
    }

    var singleQuotes = new RegExp("'", "gm");

    function escapeQuotes(text) {
      return (text + "").replace(singleQuotes, "&#39;");
    }

    scheduler._waiAria = {
      getAttributeString: function getAttributeString(attr) {
        var attributes = [" "];

        for (var i in attr) {
          if (typeof attr[i] != "function" && _typeof(attr[i]) != "object") {
            var text = escapeQuotes(stripHTMLLite(attr[i]));
            attributes.push(i + "='" + text + "'");
          }
        }

        attributes.push(" ");
        return attributes.join(" ");
      },
      setAttributes: function setAttributes(div, values) {
        for (var i in values) {
          div.setAttribute(i, stripHTMLLite(values[i]));
        }

        return div;
      },
      labelAttr: function labelAttr(div, content) {
        return this.setAttributes(div, {
          "aria-label": content
        });
      },
      label: function label(_label) {
        return scheduler._waiAria.getAttributeString({
          "aria-label": _label
        });
      },
      // day/week/units
      hourScaleAttr: function hourScaleAttr(div, content) {
        this.labelAttr(div, content);
      },
      monthCellAttr: function monthCellAttr(div, date) {
        this.labelAttr(div, scheduler.templates.day_date(date));
      },
      navBarDateAttr: function navBarDateAttr(div, content) {
        this.labelAttr(div, content);
      },
      dayHeaderAttr: function dayHeaderAttr(div, content) {
        this.labelAttr(div, content);
      },
      dayColumnAttr: function dayColumnAttr(div, date) {
        this.dayHeaderAttr(div, scheduler.templates.day_date(date));
      },
      headerButtonsAttributes: function headerButtonsAttributes(div, label) {
        return this.setAttributes(div, {
          "role": "button",
          "aria-label": label
        });
      },
      headerToggleState: function headerToggleState(div, isActive) {
        return this.setAttributes(div, {
          "aria-pressed": isActive ? "true" : "false"
        });
      },
      getHeaderCellAttr: function getHeaderCellAttr(dateString) {
        return scheduler._waiAria.getAttributeString({
          "aria-label": dateString
        });
      },
      eventAttr: function eventAttr(event, div) {
        this._eventCommonAttr(event, div);
      },
      _eventCommonAttr: function _eventCommonAttr(event, div) {
        div.setAttribute("aria-label", stripHTMLLite(scheduler.templates.event_text(event.start_date, event.end_date, event)));

        if (scheduler.config.readonly) {
          div.setAttribute("aria-readonly", true);
        }

        if (event.$dataprocessor_class) {
          div.setAttribute("aria-busy", true);
        }

        div.setAttribute("aria-selected", scheduler.getState().select_id == event.id ? "true" : "false");
      },
      setEventBarAttr: function setEventBarAttr(event, div) {
        this._eventCommonAttr(event, div);
      },
      _getAttributes: function _getAttributes(attributeSetter, arg) {
        var result = {
          setAttribute: function setAttribute(name, value) {
            this[name] = value;
          }
        };
        attributeSetter.apply(this, [arg, result]);
        return result;
      },
      eventBarAttrString: function eventBarAttrString(event) {
        return this.getAttributeString(this._getAttributes(this.setEventBarAttr, event));
      },
      agendaHeadAttrString: function agendaHeadAttrString() {
        return this.getAttributeString({
          role: "row"
        });
      },
      agendaHeadDateString: function agendaHeadDateString(label) {
        return this.getAttributeString({
          role: "columnheader",
          "aria-label": label
        });
      },
      agendaHeadDescriptionString: function agendaHeadDescriptionString(label) {
        return this.agendaHeadDateString(label);
      },
      agendaDataAttrString: function agendaDataAttrString() {
        return this.getAttributeString({
          role: "grid"
        });
      },
      agendaEventAttrString: function agendaEventAttrString(event) {
        var attrs = this._getAttributes(this._eventCommonAttr, event);

        attrs["role"] = "row";
        return this.getAttributeString(attrs);
      },
      agendaDetailsBtnString: function agendaDetailsBtnString() {
        return this.getAttributeString({
          "role": "button",
          "aria-label": scheduler.locale.labels.icon_details
        });
      },
      gridAttrString: function gridAttrString() {
        return this.getAttributeString({
          role: "grid"
        });
      },
      gridRowAttrString: function gridRowAttrString(event) {
        return this.agendaEventAttrString(event);
      },
      gridCellAttrString: function gridCellAttrString(event, column, value) {
        return this.getAttributeString({
          "role": "gridcell",
          "aria-label": [column.label === undefined ? column.id : column.label, ": ", value]
        });
      },
      mapAttrString: function mapAttrString() {
        return this.gridAttrString();
      },
      mapRowAttrString: function mapRowAttrString(event) {
        return this.gridRowAttrString(event);
      },
      mapDetailsBtnString: function mapDetailsBtnString() {
        return this.agendaDetailsBtnString();
      },
      minicalHeader: function minicalHeader(div, headerId) {
        this.setAttributes(div, {
          "id": headerId + "",
          "aria-live": "assertice",
          "aria-atomic": "true"
        });
      },
      minicalGrid: function minicalGrid(div, headerId) {
        this.setAttributes(div, {
          "aria-labelledby": headerId + "",
          "role": "grid"
        });
      },
      minicalRow: function minicalRow(div) {
        this.setAttributes(div, {
          "role": "row"
        });
      },
      minicalDayCell: function minicalDayCell(div, date) {
        var selected = date.valueOf() < scheduler._max_date.valueOf() && date.valueOf() >= scheduler._min_date.valueOf();

        this.setAttributes(div, {
          "role": "gridcell",
          "aria-label": scheduler.templates.day_date(date),
          "aria-selected": selected ? "true" : "false"
        });
      },
      minicalHeadCell: function minicalHeadCell(div) {
        this.setAttributes(div, {
          "role": "columnheader"
        });
      },
      weekAgendaDayCell: function weekAgendaDayCell(div, date) {
        var header = div.querySelector(".dhx_wa_scale_bar");
        var content = div.querySelector(".dhx_wa_day_data");
        var headerId = scheduler.uid() + "";
        this.setAttributes(header, {
          "id": headerId
        });
        this.setAttributes(content, {
          "aria-labelledby": headerId
        });
      },
      weekAgendaEvent: function weekAgendaEvent(div, event) {
        this.eventAttr(event, div);
      },
      lightboxHiddenAttr: function lightboxHiddenAttr(div) {
        div.setAttribute("aria-hidden", "true");
      },
      lightboxVisibleAttr: function lightboxVisibleAttr(div) {
        div.setAttribute("aria-hidden", "false");
      },
      lightboxSectionButtonAttrString: function lightboxSectionButtonAttrString(label) {
        return this.getAttributeString({
          "role": "button",
          "aria-label": label,
          "tabindex": "0"
        });
      },
      yearHeader: function yearHeader(div, headerId) {
        this.setAttributes(div, {
          "id": headerId + ""
        });
      },
      yearGrid: function yearGrid(div, headerId) {
        this.minicalGrid(div, headerId);
      },
      yearHeadCell: function yearHeadCell(div) {
        return this.minicalHeadCell(div);
      },
      yearRow: function yearRow(div) {
        return this.minicalRow(div);
      },
      yearDayCell: function yearDayCell(div) {
        this.setAttributes(div, {
          "role": "gridcell"
        });
      },
      lightboxAttr: function lightboxAttr(div) {
        div.setAttribute("role", "dialog");
        div.setAttribute("aria-hidden", "true");
        div.firstChild.setAttribute("role", "heading");
      },
      lightboxButtonAttrString: function lightboxButtonAttrString(buttonName) {
        return this.getAttributeString({
          "role": "button",
          "aria-label": scheduler.locale.labels[buttonName],
          "tabindex": "0"
        });
      },
      eventMenuAttrString: function eventMenuAttrString(iconName) {
        return this.getAttributeString({
          "role": "button",
          "aria-label": scheduler.locale.labels[iconName]
        });
      },
      lightboxHeader: function lightboxHeader(div, headerText) {
        div.setAttribute("aria-label", headerText);
      },
      lightboxSelectAttrString: function lightboxSelectAttrString(time_option) {
        var label = "";

        switch (time_option) {
          case "%Y":
            label = scheduler.locale.labels.year;
            break;

          case "%m":
            label = scheduler.locale.labels.month;
            break;

          case "%d":
            label = scheduler.locale.labels.day;
            break;

          case "%H:%i":
            label = scheduler.locale.labels.hour + " " + scheduler.locale.labels.minute;
            break;

          default:
            break;
        }

        return scheduler._waiAria.getAttributeString({
          "aria-label": label
        });
      },
      messageButtonAttrString: function messageButtonAttrString(buttonLabel) {
        return "tabindex='0' role='button' aria-label='" + buttonLabel + "'";
      },
      messageInfoAttr: function messageInfoAttr(div) {
        div.setAttribute("role", "alert"); //div.setAttribute("tabindex", "-1");
      },
      messageModalAttr: function messageModalAttr(div, uid) {
        div.setAttribute("role", "dialog");

        if (uid) {
          div.setAttribute("aria-labelledby", uid);
        } //	div.setAttribute("tabindex", "-1");

      },
      quickInfoAttr: function quickInfoAttr(div) {
        div.setAttribute("role", "dialog");
      },
      quickInfoHeaderAttrString: function quickInfoHeaderAttrString() {
        return " role='heading' ";
      },
      quickInfoHeader: function quickInfoHeader(div, header) {
        div.setAttribute("aria-label", header);
      },
      quickInfoButtonAttrString: function quickInfoButtonAttrString(label) {
        return scheduler._waiAria.getAttributeString({
          "role": "button",
          "aria-label": label,
          "tabindex": "0"
        });
      },
      tooltipAttr: function tooltipAttr(div) {
        div.setAttribute("role", "tooltip");
      },
      tooltipVisibleAttr: function tooltipVisibleAttr(div) {
        div.setAttribute("aria-hidden", "false");
      },
      tooltipHiddenAttr: function tooltipHiddenAttr(div) {
        div.setAttribute("aria-hidden", "true");
      }
    };

    function isDisabled() {
      return !scheduler.config.wai_aria_attributes;
    }

    for (var i in scheduler._waiAria) {
      scheduler._waiAria[i] = function (payload) {
        return function () {
          if (isDisabled()) {
            return " ";
          }

          return payload.apply(this, arguments);
        };
      }(scheduler._waiAria[i]);
    }
  })();
}

/***/ }),

/***/ "./sources/css/dhtmlxscheduler_terrace.less":
/*!**************************************************!*\
  !*** ./sources/css/dhtmlxscheduler_terrace.less ***!
  \**************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./sources/css/terrace.skin.js":
/*!*************************************!*\
  !*** ./sources/css/terrace.skin.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dhtmlxscheduler_terrace_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dhtmlxscheduler_terrace.less */ "./sources/css/dhtmlxscheduler_terrace.less");


/***/ }),

/***/ "./sources/dhtmlx_hook.js":
/*!********************************!*\
  !*** ./sources/dhtmlx_hook.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function () {
  /* global dhtmlx */
  if (typeof dhtmlx != "undefined" && dhtmlx.attaches) {
    dhtmlx.attaches.attachScheduler = function (day, mode, tabs, scheduler) {
      var tabs = tabs || '<div class="dhx_cal_tab" name="day_tab" data-tab="day" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" data-tab="week" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" data-tab="month" style="right:76px;"></div>';
      var obj = document.createElement("DIV");
      obj.id = "dhxSchedObj_" + this._genStr(12);
      obj.innerHTML = '<div id="' + obj.id + '" class="dhx_cal_container" style="width:100%; height:100%;"><div class="dhx_cal_navline"><div class="dhx_cal_prev_button">&nbsp;</div><div class="dhx_cal_next_button">&nbsp;</div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div>' + tabs + '</div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div></div>';
      document.body.appendChild(obj.firstChild);
      this.attachObject(obj.id, false, true);
      this.vs[this.av].sched = scheduler;
      this.vs[this.av].schedId = obj.id;
      scheduler.setSizes = scheduler.updateView;

      scheduler.destructor = function () {};

      scheduler.init(obj.id, day, mode);
      return this.vs[this._viewRestore()].sched;
    };
  }
});

/***/ }),

/***/ "./sources/dhtmlxscheduler.gpl.js":
/*!****************************************!*\
  !*** ./sources/dhtmlxscheduler.gpl.js ***!
  \****************************************/
/*! exports provided: default, scheduler, Scheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheduler", function() { return scheduler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scheduler", function() { return Scheduler; });
/* harmony import */ var _scheduler_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler_factory */ "./sources/scheduler_factory.js");
/* harmony import */ var _ext_extensions_gpl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ext/extensions_gpl */ "./sources/ext/extensions_gpl.js");


var factory = new _scheduler_factory__WEBPACK_IMPORTED_MODULE_0__["default"](_ext_extensions_gpl__WEBPACK_IMPORTED_MODULE_1__["default"]);
var scheduler = factory.getSchedulerInstance();
var Scheduler = {
  plugin: scheduler.bind(factory.plugin, factory)
};
window.scheduler = scheduler;
window.Scheduler = Scheduler;
/* harmony default export */ __webpack_exports__["default"] = (scheduler);


/***/ }),

/***/ "./sources/ext/active_links.js":
/*!*************************************!*\
  !*** ./sources/ext/active_links.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.config.active_link_view = "day";

  scheduler._active_link_click = function (e) {
    var start = e.target;
    var to = start.getAttribute("data-link-date");
    var s_d = scheduler.date.str_to_date(scheduler.config.api_date, false, true);

    if (to) {
      scheduler.setCurrentView(s_d(to), scheduler.config.active_link_view);
      if (e && e.preventDefault) e.preventDefault();
      return false;
    }
  };

  scheduler.attachEvent("onTemplatesReady", function () {
    var do_wrapper = function do_wrapper(key, fullname) {
      fullname = fullname || key + "_scale_date";

      if (!scheduler.templates['_active_links_old_' + fullname]) {
        scheduler.templates['_active_links_old_' + fullname] = scheduler.templates[fullname];
      }

      var week_x = scheduler.templates['_active_links_old_' + fullname];
      var d_s = scheduler.date.date_to_str(scheduler.config.api_date);

      scheduler.templates[fullname] = function (date) {
        return "<a data-link-date='" + d_s(date) + "' href='#'>" + week_x(date) + "</a>";
      };
    };

    do_wrapper("week");
    do_wrapper("", "month_day");

    if (this.matrix) {
      for (var key in this.matrix) {
        do_wrapper(key);
      }
    }

    this._detachDomEvent(this._obj, "click", scheduler._active_link_click);

    scheduler.event(this._obj, "click", scheduler._active_link_click);
  });
});

/***/ }),

/***/ "./sources/ext/agenda_view.js":
/*!************************************!*\
  !*** ./sources/ext/agenda_view.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.date.add_agenda = function (date) {
    return scheduler.date.add(date, 1, "year");
  };

  scheduler.templates.agenda_time = function (start, end, ev) {
    if (ev._timed) return this.day_date(ev.start_date, ev.end_date, ev) + " " + this.event_date(start);else return scheduler.templates.day_date(start) + " &ndash; " + scheduler.templates.day_date(end);
  };

  scheduler.templates.agenda_text = function (start, end, event) {
    return event.text;
  };

  scheduler.templates.agenda_date = function () {
    return "";
  };

  scheduler.date.agenda_start = function () {
    return scheduler.date.date_part(scheduler._currentDate());
  };

  scheduler.attachEvent("onTemplatesReady", function () {
    var old_dblclick_dhx_cal_data = scheduler.dblclick_dhx_cal_data;

    scheduler.dblclick_dhx_cal_data = function () {
      if (this._mode == "agenda") {
        if (!this.config.readonly && this.config.dblclick_create) this.addEventNow();
      } else {
        if (old_dblclick_dhx_cal_data) return old_dblclick_dhx_cal_data.apply(this, arguments);
      }
    };

    var old = scheduler.render_data;

    scheduler.render_data = function (evs) {
      if (this._mode == "agenda") fill_agenda_tab();else return old.apply(this, arguments);
    };

    var old_render_view_data = scheduler.render_view_data;

    scheduler.render_view_data = function () {
      if (this._mode == "agenda") {
        scheduler._agendaScrollTop = scheduler._els["dhx_cal_data"][0].childNodes[0].scrollTop;
        scheduler._els["dhx_cal_data"][0].childNodes[0].scrollTop = 0;
      }

      return old_render_view_data.apply(this, arguments);
    };

    function set_full_view(mode) {
      if (mode) {
        var l = scheduler.locale.labels;

        var rowAttr = scheduler._waiAria.agendaHeadAttrString();

        var dateHeader = scheduler._waiAria.agendaHeadDateString(l.date);

        var descriptionHeader = scheduler._waiAria.agendaHeadDescriptionString(l.description);

        scheduler._els["dhx_cal_header"][0].innerHTML = "<div " + rowAttr + " class='dhx_agenda_line'>" + "<div " + dateHeader + ">" + l.date + "</div>" + "<span class = 'description_header' style='padding-left:25px' " + descriptionHeader + ">" + l.description + "</span>" + "</div>";
        scheduler._table_view = true;
        scheduler.set_sizes();
      }
    }

    function fill_agenda_tab() {
      //select events for which data need to be printed
      var events = scheduler.get_visible_events();
      events.sort(function (a, b) {
        return a.start_date > b.start_date ? 1 : -1;
      });

      var tableAttr = scheduler._waiAria.agendaDataAttrString();

      var agendaEventAttrString; //generate html for the view

      var html = "<div class='dhx_agenda_area' " + tableAttr + ">";

      for (var i = 0; i < events.length; i++) {
        var ev = events[i];
        var bg_color = ev.color ? "background:" + ev.color + ";" : "";
        var color = ev.textColor ? "color:" + ev.textColor + ";" : "";
        var ev_class = scheduler.templates.event_class(ev.start_date, ev.end_date, ev);
        agendaEventAttrString = scheduler._waiAria.agendaEventAttrString(ev);

        var agendaDetailsButtonAttr = scheduler._waiAria.agendaDetailsBtnString();

        html += "<div " + agendaEventAttrString + " class='dhx_agenda_line" + (ev_class ? ' ' + ev_class : '') + "' event_id='" + ev.id + "' " + scheduler.config.event_attribute + "='" + ev.id + "' style='" + color + "" + bg_color + "" + (ev._text_style || "") + "'><div class='dhx_agenda_event_time'>" + (scheduler.config.rtl ? scheduler.templates.agenda_time(ev.end_date, ev.start_date, ev) : scheduler.templates.agenda_time(ev.start_date, ev.end_date, ev)) + "</div>";
        html += "<div " + agendaDetailsButtonAttr + " class='dhx_event_icon icon_details'>&nbsp;</div>";
        html += "<span>" + scheduler.templates.agenda_text(ev.start_date, ev.end_date, ev) + "</span></div>";
      }

      html += "<div class='dhx_v_border'></div></div>"; //render html

      scheduler._els["dhx_cal_data"][0].innerHTML = html;
      scheduler._els["dhx_cal_data"][0].childNodes[0].scrollTop = scheduler._agendaScrollTop || 0; // setting up dhx_v_border size

      var agenda_area = scheduler._els["dhx_cal_data"][0].childNodes[0];
      var v_border = agenda_area.childNodes[agenda_area.childNodes.length - 1];
      v_border.style.height = agenda_area.offsetHeight < scheduler._els["dhx_cal_data"][0].offsetHeight ? "100%" : agenda_area.offsetHeight + "px";
      var t = scheduler._els["dhx_cal_data"][0].firstChild.childNodes;

      var dateElement = scheduler._getNavDateElement();

      if (dateElement) {
        dateElement.innerHTML = scheduler.templates.agenda_date(scheduler._min_date, scheduler._max_date, scheduler._mode);
      }

      scheduler._rendered = [];

      for (var i = 0; i < t.length - 1; i++) {
        scheduler._rendered[i] = t[i];
      }
    }

    scheduler.agenda_view = function (mode) {
      scheduler._min_date = scheduler.config.agenda_start || scheduler.date.agenda_start(scheduler._date);
      scheduler._max_date = scheduler.config.agenda_end || scheduler.date.add_agenda(scheduler._min_date, 1);
      set_full_view(mode);

      if (mode) {
        scheduler._cols = null;
        scheduler._colsS = null;
        scheduler._table_view = true; //agenda tab activated

        fill_agenda_tab();
      } else {
        scheduler._table_view = false; //agenda tab de-activated
      }
    };
  });
});

/***/ }),

/***/ "./sources/ext/all_timed.js":
/*!**********************************!*\
  !*** ./sources/ext/all_timed.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.config.all_timed = "short";
  scheduler.config.all_timed_month = false;

  var is_event_short = function is_event_short(ev) {
    if (!((ev.end_date - ev.start_date) / (1000 * 60 * 60) >= 24)) {
      return true;
    } // short event shouldn't disappear to multiday area during dnd-resize


    if (scheduler._drag_mode == "resize" && scheduler._drag_id == ev.id) {
      return true;
    }

    return false;
  }; // copy of usual events and recurring instances;
  // regular copy causes problems with recurrings which have series event as a prototype


  scheduler._safe_copy = function (event) {
    var proto = null,
        copy = scheduler._copy_event(event);

    if (event.event_pid) {
      proto = scheduler.getEvent(event.event_pid);
    }

    if (proto && proto.isPrototypeOf(event)) {
      delete copy.event_length;
      delete copy.event_pid;
      delete copy.rec_pattern;
      delete copy.rec_type;
    }

    return copy;
  };

  var old_prerender_events_line = scheduler._pre_render_events_line;
  var old_prerender_events_table = scheduler._pre_render_events_table;

  var prerender_events = function prerender_events(evs, hold) {
    if (!this._table_view) {
      return old_prerender_events_line.call(this, evs, hold);
    }

    return old_prerender_events_table.call(this, evs, hold);
  };

  scheduler._pre_render_events_line = scheduler._pre_render_events_table = function (evs, hold) {
    if (!this.config.all_timed || this._table_view && this._mode != "month" || this._mode == "month" && !this.config.all_timed_month) return prerender_events.call(this, evs, hold);

    for (var i = 0; i < evs.length; i++) {
      var ev = evs[i];
      if (ev._timed) continue;

      if (this.config.all_timed == "short") {
        if (!is_event_short(ev)) {
          if (this._mode != "month") {
            evs.splice(i--, 1);
          }

          continue;
        }
      }

      var ce = this._safe_copy(ev); // current event (event for one specific day) is copy of original with modified dates


      if (!ev._virtual) {
        ce._first_chunk = true;
      } else {
        ce._first_chunk = false;
      }

      ce._drag_resize = false;
      ce._virtual = true;
      ce.start_date = new Date(ce.start_date); // as lame copy doesn't copy date objects

      if (!isOvernightEvent(ev)) {
        ce.end_date = new Date(ev.end_date);
      } else {
        ce.end_date = getNextDay(ce.start_date);

        if (this.config.last_hour != 24) {
          // if specific last_hour was set (e.g. 20)
          ce.end_date = setDateTime(ce.start_date, this.config.last_hour);
        }
      }

      var event_changed = false;

      if (ce.start_date < this._max_date && ce.end_date > this._min_date && ce.start_date < ce.end_date) {
        evs[i] = ce; // adding another event in collection

        event_changed = true;
      } //	if (ce.start_date > ce.end_date) {
      //		evs.splice(i--,1);
      //	}


      var re = this._safe_copy(ev); // remaining event, copy of original with modified start_date (making range more narrow)


      re._virtual = true;
      re.end_date = new Date(re.end_date);
      if (re.start_date < this._min_date) re.start_date = setDateTime(this._min_date, this.config.first_hour); // as we are starting only with whole hours
      else re.start_date = setDateTime(getNextDay(ev.start_date), this.config.first_hour);

      if (re.start_date < this._max_date && re.start_date < re.end_date) {
        if (event_changed) {
          evs.splice(i + 1, 0, re); //insert part
        } else {
          evs[i--] = re;
          continue;
        }

        re._last_chunk = false;
      } else {
        ce._last_chunk = true;
        ce._drag_resize = true;
      }
    } // in case of all_timed pre_render is not applied to the original event
    // so we need to force redraw in case of dnd


    var redraw = this._drag_mode == 'move' ? false : hold;
    return prerender_events.call(this, evs, redraw);

    function isOvernightEvent(ev) {
      var next_day = getNextDay(ev.start_date);
      return +ev.end_date > +next_day;
    }

    function getNextDay(date) {
      var next_day = scheduler.date.add(date, 1, "day");
      next_day = scheduler.date.date_part(next_day);
      return next_day;
    }

    function setDateTime(date, hours) {
      var val = scheduler.date.date_part(new Date(date));
      val.setHours(hours);
      return val;
    }
  };

  var old_get_visible_events = scheduler.get_visible_events;

  scheduler.get_visible_events = function (only_timed) {
    if (!(this.config.all_timed && this.config.multi_day)) return old_get_visible_events.call(this, only_timed);
    return old_get_visible_events.call(this, false); // only timed = false
  };

  scheduler.attachEvent("onBeforeViewChange", function (old_mode, old_date, mode, date) {
    scheduler._allow_dnd = mode == "day" || mode == "week";
    return true;
  });

  scheduler._is_main_area_event = function (ev) {
    return !!(ev._timed || this.config.all_timed === true || this.config.all_timed == "short" && is_event_short(ev));
  };

  var oldUpdate = scheduler.updateEvent;

  scheduler.updateEvent = function (id) {
    // full redraw(update_render=true) messes events order while dnd.
    // individual redraw(update_render=false) of multiday event, which happens on select/unselect, expands event to full width of the cell and can be fixes only with full redraw.
    // so for now full redraw is always enabled for not-dnd updates
    var ev = scheduler.getEvent(id);
    var fullRedrawNeeded;
    var initial;

    if (ev) {
      fullRedrawNeeded = scheduler.config.all_timed && !(scheduler.isOneDayEvent(scheduler._events[id]) || scheduler.getState().drag_id);

      if (fullRedrawNeeded) {
        initial = scheduler.config.update_render;
        scheduler.config.update_render = true;
      }
    }

    oldUpdate.apply(scheduler, arguments);

    if (ev) {
      if (fullRedrawNeeded) {
        scheduler.config.update_render = initial;
      }
    }
  };
});

/***/ }),

/***/ "./sources/ext/collision.js":
/*!**********************************!*\
  !*** ./sources/ext/collision.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  var temp_section;
  var before;
  scheduler.config.collision_limit = 1;

  function _setTempSection(event_id) {
    // for custom views (matrix, timeline, units)
    var checked_mode = scheduler._get_section_view();

    if (checked_mode && event_id) {
      temp_section = scheduler.getEvent(event_id)[scheduler._get_section_property()];
    }
  }

  scheduler.attachEvent("onBeforeDrag", function (id) {
    _setTempSection(id);

    return true;
  });
  scheduler.attachEvent("onBeforeLightbox", function (id) {
    var ev = scheduler.getEvent(id);
    before = [ev.start_date, ev.end_date];

    _setTempSection(id);

    return true;
  });
  scheduler.attachEvent("onEventChanged", function (id) {
    if (!id || !scheduler.getEvent(id)) return true;
    var ev = scheduler.getEvent(id);

    if (!scheduler.checkCollision(ev)) {
      if (!before) return false;
      ev.start_date = before[0];
      ev.end_date = before[1];
      ev._timed = this.isOneDayEvent(ev);
    }

    return true;
  });
  scheduler.attachEvent("onBeforeEventChanged", function (ev, e, is_new) {
    return scheduler.checkCollision(ev);
  });
  scheduler.attachEvent("onEventAdded", function (id, ev) {
    var result = scheduler.checkCollision(ev);
    if (!result) scheduler.deleteEvent(id);
  });
  scheduler.attachEvent("onEventSave", function (id, edited_ev, is_new) {
    edited_ev = scheduler._lame_clone(edited_ev);
    edited_ev.id = id; //lightbox may not have 'time' section

    if (!(edited_ev.start_date && edited_ev.end_date)) {
      var ev = scheduler.getEvent(id);
      edited_ev.start_date = new Date(ev.start_date);
      edited_ev.end_date = new Date(ev.end_date);
    }

    if (edited_ev.rec_type) {
      scheduler._roll_back_dates(edited_ev);
    }

    return scheduler.checkCollision(edited_ev); // in case user creates event on one date but then edited it another
  });

  scheduler._check_sections_collision = function (first, second) {
    var map_to = scheduler._get_section_property();

    if (first[map_to] == second[map_to] && first.id != second.id) return true;
    return false;
  };

  scheduler.checkCollision = function (ev) {
    var evs = [];
    var collision_limit = scheduler.config.collision_limit;

    if (ev.rec_type) {
      var evs_dates = scheduler.getRecDates(ev);

      for (var k = 0; k < evs_dates.length; k++) {
        var tevs = scheduler.getEvents(evs_dates[k].start_date, evs_dates[k].end_date);

        for (var j = 0; j < tevs.length; j++) {
          if ((tevs[j].event_pid || tevs[j].id) != ev.id) evs.push(tevs[j]);
        }
      }
    } else {
      evs = scheduler.getEvents(ev.start_date, ev.end_date);

      for (var i = 0; i < evs.length; i++) {
        var concurrent = evs[i];

        if (concurrent.id == ev.id || concurrent.event_length && [concurrent.event_pid, concurrent.event_length].join("#") == ev.id) {
          evs.splice(i, 1);
          break;
        }
      }
    }

    var checked_mode = scheduler._get_section_view();

    var map_to = scheduler._get_section_property();

    var single = true;

    if (checked_mode) {
      // custom view
      var count = 0;

      for (var i = 0; i < evs.length; i++) {
        if (evs[i].id != ev.id && this._check_sections_collision(evs[i], ev)) count++;
      }

      if (count >= collision_limit) {
        single = false;
      }
    } else {
      if (evs.length >= collision_limit) single = false;
    }

    if (!single) {
      var res = !scheduler.callEvent("onEventCollision", [ev, evs]);

      if (!res) {
        ev[map_to] = temp_section || ev[map_to]; // from _setTempSection for custom views
      }

      return res;
    }

    return single;
  };
});

/***/ }),

/***/ "./sources/ext/container_autoresize.js":
/*!*********************************************!*\
  !*** ./sources/ext/container_autoresize.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.config.container_autoresize = true;
  scheduler.config.month_day_min_height = 90;
  scheduler.config.min_grid_size = 25;
  scheduler.config.min_map_size = 400;
  var old_pre_render_event = scheduler._pre_render_events; //need for temporary disabling without modifying public config

  var active = true;
  var total_height = 0;
  var multiday_height = 0;

  scheduler._pre_render_events = function (evs, hold) {
    if (!(scheduler.config.container_autoresize && active)) {
      return old_pre_render_event.apply(this, arguments);
    }

    var hb = this.xy.bar_height;
    var h_old = this._colsS.heights;
    var h = this._colsS.heights = [0, 0, 0, 0, 0, 0, 0];
    var data = this._els["dhx_cal_data"][0];
    if (!this._table_view) evs = this._pre_render_events_line(evs, hold); //ignore long events for now
    else evs = this._pre_render_events_table(evs, hold);

    if (this._table_view) {
      if (hold) {
        this._colsS.heights = h_old;
      } else {
        var evl = data.firstChild;

        if (evl.rows) {
          for (var i = 0; i < evl.rows.length; i++) {
            h[i]++;

            if (h[i] * hb > this._colsS.height - this.xy.month_head_height) {
              // 22 - height of cell's header
              //we have overflow, update heights
              var cells = evl.rows[i].cells;
              var cHeight = this._colsS.height - this.xy.month_head_height;

              if (this.config.max_month_events * 1 !== this.config.max_month_events || h[i] <= this.config.max_month_events) {
                cHeight = h[i] * hb;
              } else if ((this.config.max_month_events + 1) * hb > this._colsS.height - this.xy.month_head_height) {
                cHeight = (this.config.max_month_events + 1) * hb;
              }

              for (var j = 0; j < cells.length; j++) {
                cells[j].childNodes[1].style.height = cHeight + "px";
              }

              h[i] = (h[i - 1] || 0) + cells[0].offsetHeight;
            }

            h[i] = (h[i - 1] || 0) + evl.rows[i].cells[0].offsetHeight;
          }

          h.unshift(0);

          if (evl.parentNode.offsetHeight < evl.parentNode.scrollHeight && !evl._h_fix) {//we have v-scroll, decrease last day cell
            // NO CHECK SHOULD BE MADE ON VERTICAL SCROLL
          }
        } else {
          if (!evs.length && this._els["dhx_multi_day"][0].style.visibility == "visible") h[0] = -1;

          if (evs.length || h[0] == -1) {
            //shift days to have space for multiday events
            //var childs = evl.parentNode.childNodes;
            var dh = (h[0] + 1) * hb + 1; // +1 so multiday events would have 2px from top and 2px from bottom by default

            if (multiday_height != dh + 1) {
              this._obj.style.height = total_height - multiday_height + dh - 1 + "px";
            }

            dh += "px";
            data.style.top = this._els["dhx_cal_navline"][0].offsetHeight + this._els["dhx_cal_header"][0].offsetHeight + parseInt(dh, 10) + 'px';
            data.style.height = this._obj.offsetHeight - parseInt(data.style.top, 10) - (this.xy.margin_top || 0) + 'px';
            var last = this._els["dhx_multi_day"][0];
            last.style.height = dh;
            last.style.visibility = h[0] == -1 ? "hidden" : "visible";
            last = this._els["dhx_multi_day"][1];
            last.style.height = dh;
            last.style.visibility = h[0] == -1 ? "hidden" : "visible";
            last.className = h[0] ? "dhx_multi_day_icon" : "dhx_multi_day_icon_small";
            this._dy_shift = (h[0] + 1) * hb;
            h[0] = 0;
          }
        }
      }
    }

    return evs;
  };

  var checked_divs = ["dhx_cal_navline", "dhx_cal_header", "dhx_multi_day", "dhx_cal_data"];

  var updateContainterHeight = function updateContainterHeight(is_repaint) {
    total_height = 0;

    for (var i = 0; i < checked_divs.length; i++) {
      var className = checked_divs[i];
      var checked_div = scheduler._els[className] ? scheduler._els[className][0] : null;
      var height = 0;

      switch (className) {
        case "dhx_cal_navline":
        case "dhx_cal_header":
          height = parseInt(checked_div.style.height, 10);
          break;

        case "dhx_multi_day":
          height = checked_div ? checked_div.offsetHeight - 1 : 0;
          multiday_height = height;
          break;

        case "dhx_cal_data":
          var mode = scheduler.getState().mode;

          if (checked_div.childNodes[1] && mode != "month") {
            height = checked_div.childNodes[1].offsetHeight;
          } else {
            height = Math.max(checked_div.offsetHeight - 1, checked_div.scrollHeight);
          }

          if (mode == "month") {
            if (scheduler.config.month_day_min_height && !is_repaint) {
              var rows_length = checked_div.getElementsByTagName("tr").length;
              height = rows_length * scheduler.config.month_day_min_height;
            }

            if (is_repaint) {
              checked_div.style.height = height + "px";
            }
          } else if (mode == "year") {
            height = 190 * scheduler.config.year_y;
          } else if (mode == "agenda") {
            height = 0;

            if (checked_div.childNodes && checked_div.childNodes.length) {
              for (var j = 0; j < checked_div.childNodes.length; j++) {
                height += checked_div.childNodes[j].offsetHeight;
              }
            }

            if (height + 2 < scheduler.config.min_grid_size) {
              height = scheduler.config.min_grid_size;
            } else {
              height += 2;
            }
          } else if (mode == "week_agenda") {
            var min_height = scheduler.xy.week_agenda_scale_height + scheduler.config.min_grid_size,
                cur_height;
            var column;

            for (var k = 0; k < checked_div.childNodes.length; k++) {
              column = checked_div.childNodes[k];

              for (var j = 0; j < column.childNodes.length; j++) {
                var innerHeight = 0,
                    eventsContainer = column.childNodes[j].childNodes[1];

                for (var g = 0; g < eventsContainer.childNodes.length; g++) {
                  innerHeight += eventsContainer.childNodes[g].offsetHeight;
                }

                cur_height = innerHeight + scheduler.xy.week_agenda_scale_height;
                cur_height = k == 1 && (j == 2 || j == 3) ? cur_height * 2 : cur_height; // for last two cells;

                if (cur_height > min_height) {
                  min_height = cur_height;
                }
              }
            }

            height = min_height * 3;
          } else if (mode == "map") {
            height = 0;
            var evs = checked_div.querySelectorAll(".dhx_map_line");

            for (var j = 0; j < evs.length; j++) {
              height += evs[j].offsetHeight;
            }

            if (height + 2 < scheduler.config.min_map_size) {
              height = scheduler.config.min_map_size;
            } else {
              height += 2;
            }
          } else if (scheduler._gridView) {
            height = 0;

            if (checked_div.childNodes[1].childNodes[0].childNodes && checked_div.childNodes[1].childNodes[0].childNodes.length) {
              var evs = checked_div.childNodes[1].childNodes[0].childNodes[0].childNodes;

              for (var j = 0; j < evs.length; j++) {
                height += evs[j].offsetHeight;
              }

              height += 2;

              if (height < scheduler.config.min_grid_size) {
                height = scheduler.config.min_grid_size;
              }
            } else {
              height = scheduler.config.min_grid_size;
            }
          }

          if (scheduler.matrix && scheduler.matrix[mode]) {
            if (is_repaint) {
              height += 0;
              checked_div.style.height = height + "px";
            } else {
              height = 0;
              var cfg = scheduler.matrix[mode];
              var rows = cfg.y_unit;

              for (var r = 0; r < rows.length; r++) {
                height += cfg.getSectionHeight(rows[r].key);
              } // Check and add extra height to avoid events hiding by the horizontal scrollbar


              if (scheduler.$container.clientWidth != scheduler.$container.scrollWidth) {
                height += getScrollSize();
              }
            }

            height -= 1;
          }

          if (mode == "day" || mode == "week" || scheduler._props && scheduler._props[mode]) {
            height += 2;
          }

          break;
      }

      height += 1;
      total_height += height;
    }

    scheduler._obj.style.height = total_height + "px";
    if (!is_repaint) scheduler.updateView();
  };

  function callUpdate() {
    active = false;
    scheduler.callEvent("onAfterSchedulerResize", []);
    active = true;
  }

  var conditionalUpdateContainerHeight = function conditionalUpdateContainerHeight() {
    if (!(scheduler.config.container_autoresize && active)) return true;
    var mode = scheduler.getState().mode;

    if (!mode) {
      return true;
    }

    var asyncRepaint = window.requestAnimationFrame || window.setTimeout;
    var scrollTop = document.documentElement.scrollTop;
    asyncRepaint(function () {
      updateContainterHeight();
    });

    if (scheduler.matrix && scheduler.matrix[mode] || mode == "month") {
      asyncRepaint(function () {
        updateContainterHeight(true);
        document.documentElement.scrollTop = scrollTop;
        callUpdate();
      }, 1);
    } else {
      callUpdate();
    }
  };

  scheduler.attachEvent("onBeforeViewChange", function () {
    var autosizeEnabled = scheduler.config.container_autoresize;

    if (!scheduler.xy.$original_scroll_width) {
      scheduler.xy.$original_scroll_width = scheduler.xy.scroll_width;
    }

    scheduler.xy.scroll_width = autosizeEnabled ? 0 : scheduler.xy.$original_scroll_width;

    if (scheduler.matrix) {
      for (var i in scheduler.matrix) {
        var timeline = scheduler.matrix[i];

        if (!timeline.$original_section_autoheight) {
          timeline.$original_section_autoheight = timeline.section_autoheight;
        }

        if (autosizeEnabled) {
          timeline.section_autoheight = false;
        } else {
          timeline.section_autoheight = timeline.$original_section_autoheight;
        }
      }
    }

    return true;
  });
  scheduler.attachEvent("onViewChange", conditionalUpdateContainerHeight);
  scheduler.attachEvent("onXLE", conditionalUpdateContainerHeight);
  scheduler.attachEvent("onEventChanged", conditionalUpdateContainerHeight);
  scheduler.attachEvent("onEventCreated", conditionalUpdateContainerHeight);
  scheduler.attachEvent("onEventAdded", conditionalUpdateContainerHeight);
  scheduler.attachEvent("onEventDeleted", conditionalUpdateContainerHeight);
  scheduler.attachEvent("onAfterSchedulerResize", conditionalUpdateContainerHeight);
  scheduler.attachEvent("onClearAll", conditionalUpdateContainerHeight); //disable container autoresize when expanded

  scheduler.attachEvent("onBeforeExpand", function () {
    active = false;
    return true;
  });
  scheduler.attachEvent("onBeforeCollapse", function () {
    active = true;
    return true;
  }); // helper function

  function getScrollSize() {
    var div = document.createElement("div");
    div.style.cssText = "visibility:hidden;position:absolute;left:-1000px;width:100px;padding:0px;margin:0px;height:110px;min-height:100px;overflow-y:scroll;";
    document.body.appendChild(div);
    var size = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return size;
  }
});

/***/ }),

/***/ "./sources/ext/cookie.js":
/*!*******************************!*\
  !*** ./sources/ext/cookie.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  function setCookie(name, cookie_param, value) {
    var str = name + "=" + value + (cookie_param ? "; " + cookie_param : "");
    document.cookie = str;
  }

  function getCookie(name) {
    var search = name + "=";

    if (document.cookie.length > 0) {
      var offset = document.cookie.indexOf(search);

      if (offset != -1) {
        offset += search.length;
        var end = document.cookie.indexOf(";", offset);
        if (end == -1) end = document.cookie.length;
        return document.cookie.substring(offset, end);
      }
    }

    return "";
  }

  function getCookieName(scheduler) {
    return (scheduler._obj.id || "scheduler") + "_settings";
  }

  var first = true;
  scheduler.attachEvent("onBeforeViewChange", function (oldMode, oldDate, mode, date) {
    // if Url plugin is enabled - explicit url values should have more priority than cookies
    if (first && scheduler._get_url_nav) {
      var urlNavigationPlugin = scheduler._get_url_nav();

      if (urlNavigationPlugin.date || urlNavigationPlugin.mode || urlNavigationPlugin.event) {
        first = false;
      }
    }

    var cookie = getCookieName(scheduler);

    if (first) {
      first = false;
      var schedulerCookie = getCookie(cookie);

      if (schedulerCookie) {
        if (!scheduler._min_date) {
          //otherwise scheduler will have incorrect date until timeout
          //it can cause js error with 'onMouseMove' handler of key_nav.js
          scheduler._min_date = date;
        }

        schedulerCookie = unescape(schedulerCookie).split("@");
        schedulerCookie[0] = this._helpers.parseDate(schedulerCookie[0]);
        var view = this.isViewExists(schedulerCookie[1]) ? schedulerCookie[1] : mode,
            date = !isNaN(+schedulerCookie[0]) ? schedulerCookie[0] : date;
        window.setTimeout(function () {
          scheduler.setCurrentView(date, view);
        }, 1);
        return false;
      }
    }

    return true;
  });
  scheduler.attachEvent("onViewChange", function (newMode, newDate) {
    var cookie = getCookieName(scheduler);
    var text = escape(this._helpers.formatDate(newDate) + "@" + newMode);
    setCookie(cookie, "expires=Sun, 31 Jan 9999 22:00:00 GMT", text);
  }); // As we are blocking first render above there could be a problem in case of dynamic loading and rendering of visible data in general ('from'/'to' won't be defined)

  var old_load = scheduler._load;

  scheduler._load = function () {
    var args = arguments;

    if (!scheduler._date) {
      var that = this;
      window.setTimeout(function () {
        old_load.apply(that, args);
      }, 1);
    } else {
      old_load.apply(this, args);
    }
  };
});

/***/ }),

/***/ "./sources/ext/editors.js":
/*!********************************!*\
  !*** ./sources/ext/editors.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  /* global dhtmlXCombo */
  scheduler.form_blocks['combo'] = {
    render: function render(sns) {
      if (!sns.cached_options) sns.cached_options = {};
      var res = '';
      res += "<div class='" + sns.type + "' style='height:" + (sns.height || 20) + "px;' ></div>";
      return res;
    },
    set_value: function set_value(node, value, ev, config) {
      (function () {
        resetCombo();
        var id = scheduler.attachEvent("onAfterLightbox", function () {
          // otherwise destructor will never be called after form reset(e.g. in readonly event mode)
          resetCombo();
          scheduler.detachEvent(id);
        });

        function resetCombo() {
          if (node._combo && node._combo.DOMParent) {
            var combo = node._combo;

            if (combo.unload) {
              combo.unload();
            } else if (combo.destructor) {
              combo.destructor();
            } // dhtmlxCombo 4.1.0 bug


            combo.DOMParent = combo.DOMelem = null;
          }
        }
      })();

      window.dhx_globalImgPath = config.image_path || '/';
      node._combo = new dhtmlXCombo(node, config.name, node.offsetWidth - 8);
      if (config.onchange) node._combo.attachEvent("onChange", config.onchange);
      if (config.options_height) node._combo.setOptionHeight(config.options_height);
      var combo = node._combo;
      combo.enableFilteringMode(config.filtering, config.script_path || null, !!config.cache);

      if (!config.script_path) {
        // script-side filtration is used
        var all_options = [];

        for (var i = 0; i < config.options.length; i++) {
          var option = config.options[i];
          var single_option = [option.key, option.label, option.css];
          all_options.push(single_option);
        }

        combo.addOption(all_options);

        if (ev[config.map_to]) {
          var index = combo.getIndexByValue(ev[config.map_to]);
          combo.selectOption(index);
        }
      } else {
        // server-side filtration is used
        var selected_id = ev[config.map_to];

        if (selected_id) {
          if (config.cached_options[selected_id]) {
            combo.addOption(selected_id, config.cached_options[selected_id]);
            combo.disable(1);
            combo.selectOption(0);
            combo.disable(0);
          } else {
            scheduler.ajax.get(config.script_path + "?id=" + selected_id + "&uid=" + scheduler.uid(), function (result) {
              var responseText = result.xmlDoc.responseText;
              var label;

              try {
                var res = JSON.parse(responseText);
                label = res.options[0].text;
              } catch (e) {
                var option = scheduler.ajax.xpath("//option", result.xmlDoc)[0];
                label = option.childNodes[0].nodeValue;
              }

              config.cached_options[selected_id] = label;
              combo.addOption(selected_id, label);
              combo.disable(1);
              combo.selectOption(0);
              combo.disable(0);
            });
          }
        } else {
          combo.setComboValue("");
        }
      }
    },
    get_value: function get_value(node, ev, config) {
      var selected_id = node._combo.getSelectedValue(); // value = key


      if (config.script_path) {
        config.cached_options[selected_id] = node._combo.getSelectedText();
      }

      return selected_id;
    },
    focus: function focus(node) {}
  };
  scheduler.form_blocks['radio'] = {
    render: function render(sns) {
      var res = '';
      res += "<div class='dhx_cal_ltext dhx_cal_radio" + "' style='height:" + sns.height + "px;' >";

      for (var i = 0; i < sns.options.length; i++) {
        var id = scheduler.uid();
        res += "<input id='" + id + "' type='radio' name='" + sns.name + "' value='" + sns.options[i].key + "'><label for='" + id + "'>" + " " + sns.options[i].label + "</label>";
        if (sns.vertical) res += "<br/>";
      }

      res += "</div>";
      return res;
    },
    set_value: function set_value(node, value, ev, config) {
      var radiobuttons = node.getElementsByTagName('input');

      for (var i = 0; i < radiobuttons.length; i++) {
        radiobuttons[i].checked = false;
        var checked_value = ev[config.map_to] || value;

        if (radiobuttons[i].value == checked_value) {
          radiobuttons[i].checked = true;
        }
      }
    },
    get_value: function get_value(node, ev, config) {
      var radiobuttons = node.getElementsByTagName('input');

      for (var i = 0; i < radiobuttons.length; i++) {
        if (radiobuttons[i].checked) {
          return radiobuttons[i].value;
        }
      }
    },
    focus: function focus(node) {}
  };
  scheduler.form_blocks['checkbox'] = {
    render: function render(sns) {
      if (scheduler.config.wide_form) return '<div class="dhx_cal_wide_checkbox" ' + (sns.height ? "style='height:" + sns.height + "px;'" : "") + '></div>';else return '';
    },
    set_value: function set_value(node, value, ev, config) {
      node = document.getElementById(config.id);
      var id = scheduler.uid();
      var isChecked = typeof config.checked_value != "undefined" ? value == config.checked_value : !!value;
      node.className += " dhx_cal_checkbox";
      var check_html = "<input id='" + id + "' type='checkbox' value='true' name='" + config.name + "'" + (isChecked ? "checked='true'" : '') + "'>";
      var label_html = "<label for='" + id + "'>" + (scheduler.locale.labels["section_" + config.name] || config.name) + "</label>";

      if (scheduler.config.wide_form) {
        node.innerHTML = label_html;
        node.nextSibling.innerHTML = check_html;
      } else node.innerHTML = check_html + label_html;

      if (config.handler) {
        var checkbox = node.getElementsByTagName('input')[0];

        if (checkbox.$_eventAttached) {
          return;
        }

        checkbox.$_eventAttached = true;
        scheduler.event(checkbox, "click", config.handler); //checkbox.onclick = config.handler;
      }
    },
    get_value: function get_value(node, ev, config) {
      node = document.getElementById(config.id);
      var checkbox = node.getElementsByTagName('input')[0]; // moved to the header

      if (!checkbox) checkbox = node.nextSibling.getElementsByTagName('input')[0];
      return checkbox.checked ? config.checked_value || true : config.unchecked_value || false;
    },
    focus: function focus(node) {}
  };
});

/***/ }),

/***/ "./sources/ext/expand.js":
/*!*******************************!*\
  !*** ./sources/ext/expand.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.ext.fullscreen = {
    toggleIcon: null
  };

  scheduler.expand = function () {
    if (!scheduler.callEvent("onBeforeExpand", [])) return;
    var t = scheduler._obj;

    do {
      t._position = t.style.position || "";
      t.style.position = "static";
    } while ((t = t.parentNode) && t.style);

    t = scheduler._obj;
    t.style.position = "absolute";
    t._width = t.style.width;
    t._height = t.style.height;
    t.style.width = t.style.height = "100%";
    t.style.top = t.style.left = "0px";
    var top = document.body;
    top.scrollTop = 0;
    top = top.parentNode;
    if (top) top.scrollTop = 0;
    document.body._overflow = document.body.style.overflow || "";
    document.body.style.overflow = "hidden";

    scheduler._maximize();

    scheduler.callEvent("onExpand", []);
  };

  scheduler.collapse = function () {
    if (!scheduler.callEvent("onBeforeCollapse", [])) return;
    var t = scheduler._obj;

    do {
      t.style.position = t._position;
    } while ((t = t.parentNode) && t.style);

    t = scheduler._obj;
    t.style.width = t._width;
    t.style.height = t._height;
    document.body.style.overflow = document.body._overflow;

    scheduler._maximize();

    scheduler.callEvent("onCollapse", []);
  };

  scheduler.attachEvent("onTemplatesReady", function () {
    var t = document.createElement("div");
    t.className = "dhx_expand_icon";
    scheduler.ext.fullscreen.toggleIcon = t;

    scheduler._obj.appendChild(t);

    scheduler.event(t, "click", function () {
      if (!scheduler.expanded) scheduler.expand();else scheduler.collapse();
    });
  });

  scheduler._maximize = function () {
    this.expanded = !this.expanded;
    scheduler.ext.fullscreen.toggleIcon.style.backgroundPosition = "0 " + (this.expanded ? "0" : "18") + "px";
    var directions = ['left', 'top'];

    for (var i = 0; i < directions.length; i++) {
      //var margin = scheduler.xy['margin_' + directions[i]];
      var prev_margin = scheduler['_prev_margin_' + directions[i]];

      if (scheduler.xy['margin_' + directions[i]]) {
        scheduler['_prev_margin_' + directions[i]] = scheduler.xy['margin_' + directions[i]];
        scheduler.xy['margin_' + directions[i]] = 0;
      } else {
        if (prev_margin) {
          scheduler.xy['margin_' + directions[i]] = scheduler['_prev_margin_' + directions[i]];
          delete scheduler['_prev_margin_' + directions[i]];
        }
      }
    }

    scheduler.setCurrentView();
  };
});

/***/ }),

/***/ "./sources/ext/extension_manager.js":
/*!******************************************!*\
  !*** ./sources/ext/extension_manager.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ExtensionsManager; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ExtensionsManager = /*#__PURE__*/function () {
  function ExtensionsManager(config) {
    _classCallCheck(this, ExtensionsManager);

    this._extensions = {};

    for (var i in config) {
      this._extensions[i] = config[i];
    }
  }

  _createClass(ExtensionsManager, [{
    key: "addExtension",
    value: function addExtension(name, ext) {
      this._extensions[name] = ext;
    }
  }, {
    key: "getExtension",
    value: function getExtension(name) {
      return this._extensions[name];
    }
  }]);

  return ExtensionsManager;
}();



/***/ }),

/***/ "./sources/ext/extensions_gpl.js":
/*!***************************************!*\
  !*** ./sources/ext/extensions_gpl.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _active_links__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./active_links */ "./sources/ext/active_links.js");
/* harmony import */ var _agenda_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./agenda_view */ "./sources/ext/agenda_view.js");
/* harmony import */ var _all_timed__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./all_timed */ "./sources/ext/all_timed.js");
/* harmony import */ var _collision__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./collision */ "./sources/ext/collision.js");
/* harmony import */ var _container_autoresize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./container_autoresize */ "./sources/ext/container_autoresize.js");
/* harmony import */ var _cookie__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cookie */ "./sources/ext/cookie.js");
/* harmony import */ var _restricted_extensions_daytimeline__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./restricted_extensions/daytimeline */ "./sources/ext/restricted_extensions/daytimeline.js");
/* harmony import */ var _restricted_extensions_drag_between__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./restricted_extensions/drag_between */ "./sources/ext/restricted_extensions/drag_between.js");
/* harmony import */ var _editors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./editors */ "./sources/ext/editors.js");
/* harmony import */ var _expand__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./expand */ "./sources/ext/expand.js");
/* harmony import */ var _restricted_extensions_grid_view__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./restricted_extensions/grid_view */ "./sources/ext/restricted_extensions/grid_view.js");
/* harmony import */ var _html_templates__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./html_templates */ "./sources/ext/html_templates.js");
/* harmony import */ var _key_nav__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./key_nav */ "./sources/ext/key_nav.js");
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./layer */ "./sources/ext/layer.js");
/* harmony import */ var _limit__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./limit */ "./sources/ext/limit.js");
/* harmony import */ var _map_view__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./map_view */ "./sources/ext/map_view.js");
/* harmony import */ var _minical__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./minical */ "./sources/ext/minical.js");
/* harmony import */ var _monthheight__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./monthheight */ "./sources/ext/monthheight.js");
/* harmony import */ var _restricted_extensions_multisection__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./restricted_extensions/multisection */ "./sources/ext/restricted_extensions/multisection.js");
/* harmony import */ var _multisource__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./multisource */ "./sources/ext/multisource.js");
/* harmony import */ var _mvc__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./mvc */ "./sources/ext/mvc.js");
/* harmony import */ var _outerdrag__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./outerdrag */ "./sources/ext/outerdrag.js");
/* harmony import */ var _pdf__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./pdf */ "./sources/ext/pdf.js");
/* harmony import */ var _quick_info__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./quick_info */ "./sources/ext/quick_info.js");
/* harmony import */ var _readonly__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./readonly */ "./sources/ext/readonly.js");
/* harmony import */ var _recurring__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./recurring */ "./sources/ext/recurring.js");
/* harmony import */ var _serialize__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./serialize */ "./sources/ext/serialize.js");
/* harmony import */ var _restricted_extensions_timeline__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./restricted_extensions/timeline */ "./sources/ext/restricted_extensions/timeline.js");
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./tooltip */ "./sources/ext/tooltip.js");
/* harmony import */ var _restricted_extensions_treetimeline__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./restricted_extensions/treetimeline */ "./sources/ext/restricted_extensions/treetimeline.js");
/* harmony import */ var _restricted_extensions_units__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./restricted_extensions/units */ "./sources/ext/restricted_extensions/units.js");
/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./url */ "./sources/ext/url.js");
/* harmony import */ var _restricted_extensions_week_agenda__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./restricted_extensions/week_agenda */ "./sources/ext/restricted_extensions/week_agenda.js");
/* harmony import */ var _wp__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./wp */ "./sources/ext/wp.js");
/* harmony import */ var _year_view__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./year_view */ "./sources/ext/year_view.js");



































/* harmony default export */ __webpack_exports__["default"] = ({
  active_links: _active_links__WEBPACK_IMPORTED_MODULE_0__["default"],
  agenda_view: _agenda_view__WEBPACK_IMPORTED_MODULE_1__["default"],
  all_timed: _all_timed__WEBPACK_IMPORTED_MODULE_2__["default"],
  collision: _collision__WEBPACK_IMPORTED_MODULE_3__["default"],
  container_autoresize: _container_autoresize__WEBPACK_IMPORTED_MODULE_4__["default"],
  cookie: _cookie__WEBPACK_IMPORTED_MODULE_5__["default"],
  daytimeline: _restricted_extensions_daytimeline__WEBPACK_IMPORTED_MODULE_6__["default"],
  drag_between: _restricted_extensions_drag_between__WEBPACK_IMPORTED_MODULE_7__["default"],
  editors: _editors__WEBPACK_IMPORTED_MODULE_8__["default"],
  expand: _expand__WEBPACK_IMPORTED_MODULE_9__["default"],
  grid_view: _restricted_extensions_grid_view__WEBPACK_IMPORTED_MODULE_10__["default"],
  html_templates: _html_templates__WEBPACK_IMPORTED_MODULE_11__["default"],
  key_nav: _key_nav__WEBPACK_IMPORTED_MODULE_12__["default"],
  layer: _layer__WEBPACK_IMPORTED_MODULE_13__["default"],
  limit: _limit__WEBPACK_IMPORTED_MODULE_14__["default"],
  map_view: _map_view__WEBPACK_IMPORTED_MODULE_15__["default"],
  minical: _minical__WEBPACK_IMPORTED_MODULE_16__["default"],
  monthheight: _monthheight__WEBPACK_IMPORTED_MODULE_17__["default"],
  multisection: _restricted_extensions_multisection__WEBPACK_IMPORTED_MODULE_18__["default"],
  multisource: _multisource__WEBPACK_IMPORTED_MODULE_19__["default"],
  mvc: _mvc__WEBPACK_IMPORTED_MODULE_20__["default"],
  outerdrag: _outerdrag__WEBPACK_IMPORTED_MODULE_21__["default"],
  pdf: _pdf__WEBPACK_IMPORTED_MODULE_22__["default"],
  quick_info: _quick_info__WEBPACK_IMPORTED_MODULE_23__["default"],
  readonly: _readonly__WEBPACK_IMPORTED_MODULE_24__["default"],
  recurring: _recurring__WEBPACK_IMPORTED_MODULE_25__["default"],
  serialize: _serialize__WEBPACK_IMPORTED_MODULE_26__["default"],
  timeline: _restricted_extensions_timeline__WEBPACK_IMPORTED_MODULE_27__["default"],
  tooltip: _tooltip__WEBPACK_IMPORTED_MODULE_28__["default"],
  treetimeline: _restricted_extensions_treetimeline__WEBPACK_IMPORTED_MODULE_29__["default"],
  units: _restricted_extensions_units__WEBPACK_IMPORTED_MODULE_30__["default"],
  url: _url__WEBPACK_IMPORTED_MODULE_31__["default"],
  week_agenda: _restricted_extensions_week_agenda__WEBPACK_IMPORTED_MODULE_32__["default"],
  wp: _wp__WEBPACK_IMPORTED_MODULE_33__["default"],
  year_view: _year_view__WEBPACK_IMPORTED_MODULE_34__["default"]
});

/***/ }),

/***/ "./sources/ext/html_templates.js":
/*!***************************************!*\
  !*** ./sources/ext/html_templates.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.attachEvent("onTemplatesReady", function () {
    var els = document.body.getElementsByTagName("DIV");

    for (var i = 0; i < els.length; i++) {
      var cs = els[i].className || "";
      cs = cs.split(":");

      if (cs.length == 2 && cs[0] == "template") {
        var code = "return \"" + (els[i].innerHTML || "").replace(/"/g, "\\\"").replace(/[\n\r]+/g, "") + "\";";
        code = unescape(code).replace(/\{event\.([a-z]+)\}/g, function (all, mask) {
          return '"+ev.' + mask + '+"';
        });
        scheduler.templates[cs[1]] = Function("start", "end", "ev", code);
        els[i].style.display = 'none';
      }
    }
  });
});

/***/ }),

/***/ "./sources/ext/key_nav.js":
/*!********************************!*\
  !*** ./sources/ext/key_nav.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _keyboard_navigation_common_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keyboard_navigation/common/keyboard_shortcuts */ "./sources/ext/keyboard_navigation/common/keyboard_shortcuts.js");
/* harmony import */ var _keyboard_navigation_common_eventhandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keyboard_navigation/common/eventhandler */ "./sources/ext/keyboard_navigation/common/eventhandler.js");
/* harmony import */ var _keyboard_navigation_common_trap_modal_focus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keyboard_navigation/common/trap_modal_focus */ "./sources/ext/keyboard_navigation/common/trap_modal_focus.js");
/* harmony import */ var _keyboard_navigation_marker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./keyboard_navigation/marker */ "./sources/ext/keyboard_navigation/marker.js");
/* harmony import */ var _keyboard_navigation_elements_scheduler_node__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./keyboard_navigation/elements/scheduler_node */ "./sources/ext/keyboard_navigation/elements/scheduler_node.js");
/* harmony import */ var _keyboard_navigation_elements_nav_node__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./keyboard_navigation/elements/nav_node */ "./sources/ext/keyboard_navigation/elements/nav_node.js");
/* harmony import */ var _keyboard_navigation_elements_header_cell__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./keyboard_navigation/elements/header_cell */ "./sources/ext/keyboard_navigation/elements/header_cell.js");
/* harmony import */ var _keyboard_navigation_elements_event__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./keyboard_navigation/elements/event */ "./sources/ext/keyboard_navigation/elements/event.js");
/* harmony import */ var _keyboard_navigation_elements_time_slot__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./keyboard_navigation/elements/time_slot */ "./sources/ext/keyboard_navigation/elements/time_slot.js");
/* harmony import */ var _keyboard_navigation_elements_minical_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./keyboard_navigation/elements/minical_button */ "./sources/ext/keyboard_navigation/elements/minical_button.js");
/* harmony import */ var _keyboard_navigation_elements_minical_cell__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./keyboard_navigation/elements/minical_cell */ "./sources/ext/keyboard_navigation/elements/minical_cell.js");
/* harmony import */ var _keyboard_navigation_elements_data_area__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./keyboard_navigation/elements/data_area */ "./sources/ext/keyboard_navigation/elements/data_area.js");
/* harmony import */ var _keyboard_navigation_modals__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./keyboard_navigation/modals */ "./sources/ext/keyboard_navigation/modals.js");
/* harmony import */ var _keyboard_navigation_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./keyboard_navigation/core */ "./sources/ext/keyboard_navigation/core.js");
/* harmony import */ var _keyboard_navigation_key_nav_legacy__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./keyboard_navigation/key_nav_legacy */ "./sources/ext/keyboard_navigation/key_nav_legacy.js");
/* harmony import */ var _keyboard_navigation_scheduler_handlers__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./keyboard_navigation/scheduler_handlers */ "./sources/ext/keyboard_navigation/scheduler_handlers.js");
/* harmony import */ var _keyboard_navigation_minical_handlers__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./keyboard_navigation/minical_handlers */ "./sources/ext/keyboard_navigation/minical_handlers.js");

















/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.config.key_nav = true;
  scheduler.config.key_nav_step = 30;

  scheduler.addShortcut = function (shortcut, handler, scope) {
    var scopeObject = getScope(scope);

    if (scopeObject) {
      scopeObject.prototype.bind(shortcut, handler);
    }
  };

  scheduler.getShortcutHandler = function (shortcut, scope) {
    var scopeObject = getScope(scope);

    if (scopeObject) {
      var commands = scheduler.$keyboardNavigation.shortcuts.parse(shortcut);

      if (commands.length) {
        return scopeObject.prototype.findHandler(commands[0]);
      }
    }
  };

  scheduler.removeShortcut = function (shortcut, scope) {
    var scopeObject = getScope(scope);

    if (scopeObject) {
      scopeObject.prototype.unbind(shortcut);
    }
  };

  scheduler.focus = function () {
    if (!scheduler.config.key_nav) {
      return;
    }

    var disp = scheduler.$keyboardNavigation.dispatcher;
    disp.enable();
    var activeNode = disp.getActiveNode();

    if (!activeNode || activeNode instanceof scheduler.$keyboardNavigation.MinicalButton || activeNode instanceof scheduler.$keyboardNavigation.MinicalCell) {
      disp.setDefaultNode();
    } else {
      disp.focusNode(disp.getActiveNode());
    }
  };

  function getScope(mode) {
    var scopes = {
      "minicalButton": scheduler.$keyboardNavigation.MinicalButton,
      "minicalDate": scheduler.$keyboardNavigation.MinicalCell,
      "scheduler": scheduler.$keyboardNavigation.SchedulerNode,
      "dataArea": scheduler.$keyboardNavigation.DataArea,
      "timeSlot": scheduler.$keyboardNavigation.TimeSlot,
      "event": scheduler.$keyboardNavigation.Event
    };
    var searchMap = {};

    for (var i in scopes) {
      searchMap[i.toLowerCase()] = scopes[i];
    }

    mode = (mode + "").toLowerCase();
    return searchMap[mode] || scopes.scheduler;
  }

  scheduler.$keyboardNavigation = {};

  scheduler._compose = function () {
    var parts = Array.prototype.slice.call(arguments, 0);
    var res = {};

    for (var i = 0; i < parts.length; i++) {
      var obj = parts[i];

      if (typeof obj == "function") {
        obj = new obj();
      }

      for (var p in obj) {
        res[p] = obj[p];
      }
    }

    return res;
  };

  Object(_keyboard_navigation_common_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_0__["default"])(scheduler);
  Object(_keyboard_navigation_common_eventhandler__WEBPACK_IMPORTED_MODULE_1__["default"])(scheduler);
  Object(_keyboard_navigation_common_trap_modal_focus__WEBPACK_IMPORTED_MODULE_2__["default"])(scheduler);
  Object(_keyboard_navigation_marker__WEBPACK_IMPORTED_MODULE_3__["default"])(scheduler);
  Object(_keyboard_navigation_elements_scheduler_node__WEBPACK_IMPORTED_MODULE_4__["default"])(scheduler);
  Object(_keyboard_navigation_elements_nav_node__WEBPACK_IMPORTED_MODULE_5__["default"])(scheduler);
  Object(_keyboard_navigation_elements_header_cell__WEBPACK_IMPORTED_MODULE_6__["default"])(scheduler);
  Object(_keyboard_navigation_elements_event__WEBPACK_IMPORTED_MODULE_7__["default"])(scheduler);
  Object(_keyboard_navigation_elements_time_slot__WEBPACK_IMPORTED_MODULE_8__["default"])(scheduler);
  Object(_keyboard_navigation_elements_minical_button__WEBPACK_IMPORTED_MODULE_9__["default"])(scheduler);
  Object(_keyboard_navigation_elements_minical_cell__WEBPACK_IMPORTED_MODULE_10__["default"])(scheduler);
  Object(_keyboard_navigation_elements_data_area__WEBPACK_IMPORTED_MODULE_11__["default"])(scheduler);
  Object(_keyboard_navigation_modals__WEBPACK_IMPORTED_MODULE_12__["default"])(scheduler);
  Object(_keyboard_navigation_core__WEBPACK_IMPORTED_MODULE_13__["default"])(scheduler);
  Object(_keyboard_navigation_key_nav_legacy__WEBPACK_IMPORTED_MODULE_14__["default"])(scheduler);

  (function () {
    Object(_keyboard_navigation_scheduler_handlers__WEBPACK_IMPORTED_MODULE_15__["default"])(scheduler);
    Object(_keyboard_navigation_minical_handlers__WEBPACK_IMPORTED_MODULE_16__["default"])(scheduler);
    var dispatcher = scheduler.$keyboardNavigation.dispatcher;
    scheduler.$keyboardNavigation.attachSchedulerHandlers();

    if (scheduler.renderCalendar) {
      // if minical ext loaded before key nav ext - patch it now
      scheduler.$keyboardNavigation.patchMinicalendar();
    } else {
      // otherwise - wait until everything is loaded and try again
      var attachOnce = scheduler.attachEvent("onSchedulerReady", function () {
        scheduler.detachEvent(attachOnce);
        scheduler.$keyboardNavigation.patchMinicalendar();
      });
    }

    function isSchedulerSelected() {
      if (!scheduler.config.key_nav) return;
      var enable;
      var focusElement = document.activeElement; // halt key nav when focus is outside scheduler or in quick info popup

      if (!focusElement || scheduler.utils.dom.locateCss(focusElement, "dhx_cal_quick_info", false)) {
        enable = false;
      } else {
        enable = scheduler.$keyboardNavigation.isChildOf(focusElement, scheduler.$container) || scheduler.$keyboardNavigation.isMinical(focusElement);
      }

      return enable;
    }

    function changeState(enable) {
      if (enable && !dispatcher.isEnabled()) {
        dispatcher.enable();
      } else if (!enable && dispatcher.isEnabled()) {
        dispatcher.disable();
      }
    }

    setInterval(function () {
      if (!scheduler.$container || !scheduler.$keyboardNavigation.isChildOf(scheduler.$container, document.body)) {
        return;
      }

      var enable = isSchedulerSelected();

      if (enable) {
        changeState(enable);
      } else if (!enable && dispatcher.isEnabled()) {
        setTimeout(function () {
          // doublecheck in case checking is done in handler before focus element is repainted
          if (scheduler.config.key_nav) {
            changeState(isSchedulerSelected());
          } else {
            scheduler.$container.removeAttribute("tabindex");
          }
        }, 100);
      }
    }, 500);
  })();
  /*	if(window.Scheduler && window.Scheduler.plugin){
  		window.Scheduler.plugin(setupKeyNav);
  	}else{
  		setupKeyNav(window.scheduler);
  	}*/

});

/***/ }),

/***/ "./sources/ext/keyboard_navigation/common/eventhandler.js":
/*!****************************************************************!*\
  !*** ./sources/ext/keyboard_navigation/common/eventhandler.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.$keyboardNavigation.EventHandler = {
    _handlers: null,
    findHandler: function findHandler(command) {
      if (!this._handlers) this._handlers = {};
      var shortcuts = scheduler.$keyboardNavigation.shortcuts;
      var hash = shortcuts.getHash(command);
      return this._handlers[hash];
    },
    doAction: function doAction(command, e) {
      var handler = this.findHandler(command);

      if (handler) {
        handler.call(this, e);
        if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      }
    },
    bind: function bind(shortcut, handler) {
      if (!this._handlers) this._handlers = {};
      var shortcuts = scheduler.$keyboardNavigation.shortcuts;
      var commands = shortcuts.parse(shortcut);

      for (var i = 0; i < commands.length; i++) {
        this._handlers[shortcuts.getHash(commands[i])] = handler;
      }
    },
    unbind: function unbind(shortcut) {
      var shortcuts = scheduler.$keyboardNavigation.shortcuts;
      var commands = shortcuts.parse(shortcut);

      for (var i = 0; i < commands.length; i++) {
        if (this._handlers[shortcuts.getHash(commands[i])]) {
          delete this._handlers[shortcuts.getHash(commands[i])];
        }
      }
    },
    bindAll: function bindAll(map) {
      for (var i in map) {
        this.bind(i, map[i]);
      }
    },
    initKeys: function initKeys() {
      if (!this._handlers) this._handlers = {};

      if (this.keys) {
        this.bindAll(this.keys);
      }
    }
  };
});

/***/ }),

/***/ "./sources/ext/keyboard_navigation/common/keyboard_shortcuts.js":
/*!**********************************************************************!*\
  !*** ./sources/ext/keyboard_navigation/common/keyboard_shortcuts.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.$keyboardNavigation.shortcuts = {
    createCommand: function createCommand() {
      return {
        modifiers: {
          "shift": false,
          "alt": false,
          "ctrl": false,
          "meta": false
        },
        keyCode: null
      };
    },
    parse: function parse(shortcut) {
      var commands = [];
      var expr = this.getExpressions(this.trim(shortcut));

      for (var i = 0; i < expr.length; i++) {
        var words = this.getWords(expr[i]);
        var command = this.createCommand();

        for (var j = 0; j < words.length; j++) {
          if (this.commandKeys[words[j]]) {
            command.modifiers[words[j]] = true;
          } else if (this.specialKeys[words[j]]) {
            command.keyCode = this.specialKeys[words[j]];
          } else {
            command.keyCode = words[j].charCodeAt(0);
          }
        }

        commands.push(command);
      }

      return commands;
    },
    getCommandFromEvent: function getCommandFromEvent(domEvent) {
      var command = this.createCommand();
      command.modifiers.shift = !!domEvent.shiftKey;
      command.modifiers.alt = !!domEvent.altKey;
      command.modifiers.ctrl = !!domEvent.ctrlKey;
      command.modifiers.meta = !!domEvent.metaKey;
      command.keyCode = domEvent.which || domEvent.keyCode;

      if (command.keyCode >= 96 && command.keyCode <= 105) {
        // numpad keys 96-105 -> 48-57
        command.keyCode -= 48; //convert numpad  number code to regular number code
      }

      var printableKey = String.fromCharCode(command.keyCode);

      if (printableKey) {
        command.keyCode = printableKey.toLowerCase().charCodeAt(0);
      }

      return command;
    },
    getHashFromEvent: function getHashFromEvent(domEvent) {
      return this.getHash(this.getCommandFromEvent(domEvent));
    },
    getHash: function getHash(command) {
      var parts = [];

      for (var i in command.modifiers) {
        if (command.modifiers[i]) {
          parts.push(i);
        }
      }

      parts.push(command.keyCode);
      return parts.join(this.junctionChar);
    },
    getExpressions: function getExpressions(shortcut) {
      return shortcut.split(this.junctionChar);
    },
    getWords: function getWords(term) {
      return term.split(this.combinationChar);
    },
    trim: function trim(shortcut) {
      return shortcut.replace(/\s/g, "");
    },
    junctionChar: ",",
    combinationChar: "+",
    commandKeys: {
      "shift": 16,
      "alt": 18,
      "ctrl": 17,
      "meta": true
    },
    specialKeys: {
      "backspace": 8,
      "tab": 9,
      "enter": 13,
      "esc": 27,
      "space": 32,
      "up": 38,
      "down": 40,
      "left": 37,
      "right": 39,
      "home": 36,
      "end": 35,
      "pageup": 33,
      "pagedown": 34,
      "delete": 46,
      "insert": 45,
      "plus": 107,
      "f1": 112,
      "f2": 113,
      "f3": 114,
      "f4": 115,
      "f5": 116,
      "f6": 117,
      "f7": 118,
      "f8": 119,
      "f9": 120,
      "f10": 121,
      "f11": 122,
      "f12": 123
    }
  };
});

/***/ }),

/***/ "./sources/ext/keyboard_navigation/common/trap_modal_focus.js":
/*!********************************************************************!*\
  !*** ./sources/ext/keyboard_navigation/common/trap_modal_focus.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  (function () {
    scheduler.$keyboardNavigation.getFocusableNodes = scheduler._getFocusableNodes;

    scheduler.$keyboardNavigation.trapFocus = function trapFocus(root, e) {
      if (e.keyCode != 9) return false;
      var focusable = scheduler.$keyboardNavigation.getFocusableNodes(root);
      var currentFocus = document.activeElement;
      var currentIndex = -1;

      for (var i = 0; i < focusable.length; i++) {
        if (focusable[i] == currentFocus) {
          currentIndex = i;
          break;
        }
      }

      var nextIndex, nextItem;

      if (e.shiftKey) {
        // back tab
        // go to the last element if we focused on the first
        nextIndex = currentIndex <= 0 ? focusable.length - 1 : currentIndex - 1;
        nextItem = focusable[nextIndex];

        if (nextItem) {
          nextItem.focus();
          e.preventDefault();
          return true;
        }
      } else {
        // forward tab
        // forward tab from last element should go back to the first element
        nextIndex = currentIndex >= focusable.length - 1 ? 0 : currentIndex + 1;
        nextItem = focusable[nextIndex];

        if (nextItem) {
          nextItem.focus();
          e.preventDefault();
          return true;
        }
      }

      return false;
    };
  })();
});

/***/ }),

/***/ "./sources/ext/keyboard_navigation/core.js":
/*!*************************************************!*\
  !*** ./sources/ext/keyboard_navigation/core.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.$keyboardNavigation.dispatcher = {
    isActive: false,
    activeNode: null,
    globalNode: new scheduler.$keyboardNavigation.SchedulerNode(),
    keepScrollPosition: function keepScrollPosition(callback) {
      var top, left;
      var scrollable = scheduler.$container.querySelector(".dhx_timeline_scrollable_data");

      if (!scrollable) {
        scrollable = scheduler.$container.querySelector(".dhx_cal_data");
      }

      if (scrollable) {
        top = scrollable.scrollTop;
        left = scrollable.scrollLeft;
      }

      callback();

      if (scrollable) {
        scrollable.scrollTop = top;
        scrollable.scrollLeft = left;
      }
    },
    enable: function enable() {
      if (!scheduler.$container) {
        // do nothing if not initialized
        return;
      }

      this.isActive = true;
      var self = this;
      this.keepScrollPosition(function () {
        self.globalNode.enable();
        self.setActiveNode(self.getActiveNode());
      });
    },
    disable: function disable() {
      this.isActive = false;
      this.globalNode.disable();
    },
    isEnabled: function isEnabled() {
      return !!this.isActive;
    },
    getDefaultNode: function getDefaultNode() {
      return this.globalNode.getDefaultNode();
    },
    setDefaultNode: function setDefaultNode() {
      this.setActiveNode(this.getDefaultNode());
    },
    getActiveNode: function getActiveNode() {
      var node = this.activeNode;

      if (node && !node.isValid()) {
        node = node.fallback();
      }

      return node;
    },
    focusGlobalNode: function focusGlobalNode() {
      this.blurNode(this.globalNode);
      this.focusNode(this.globalNode);
    },
    setActiveNode: function setActiveNode(el) {
      if (!el || !el.isValid()) return;

      if (this.activeNode) {
        if (this.activeNode.compareTo(el)) {
          return;
        }
      }

      if (this.isEnabled()) {
        this.blurNode(this.activeNode);
        this.activeNode = el;
        this.focusNode(this.activeNode);
      }
    },
    focusNode: function focusNode(el) {
      if (el && el.focus) {
        el.focus();

        if (el.getNode && document.activeElement != el.getNode()) {
          this.setActiveNode(new scheduler.$keyboardNavigation.DataArea());
        }
      }
    },
    blurNode: function blurNode(el) {
      if (el && el.blur) {
        el.blur();
      }
    },
    getInlineEditor: function getInlineEditor(id) {
      var editor = scheduler.$container.querySelector(".dhx_cal_editor[" + scheduler.config.event_attribute + "='" + id + "'] textarea");

      if (editor && editor.offsetWidth) {
        // if exists and visible
        return editor;
      }

      return null;
    },
    keyDownHandler: function keyDownHandler(e) {
      if (e.defaultPrevented) {
        return;
      }

      var activeElement = this.getActiveNode();
      if (scheduler.$keyboardNavigation.isModal() && !(activeElement && activeElement.container && scheduler.utils.dom.locateCss({
        target: activeElement.container
      }, "dhx_minical_popup", false))) return;
      if (scheduler.getState().editor_id && this.getInlineEditor(scheduler.getState().editor_id)) return;
      if (!this.isEnabled()) return;
      e = e || window.event;
      var schedulerNode = this.globalNode;
      var command = scheduler.$keyboardNavigation.shortcuts.getCommandFromEvent(e);

      if (!activeElement) {
        this.setDefaultNode();
      } else if (activeElement.findHandler(command)) {
        activeElement.doAction(command, e);
      } else if (schedulerNode.findHandler(command)) {
        schedulerNode.doAction(command, e);
      }
    },
    _timeout: null,
    delay: function delay(callback, _delay) {
      clearTimeout(this._timeout);
      this._timeout = setTimeout(callback, _delay || 1);
    }
  };
});

/***/ }),

/***/ "./sources/ext/keyboard_navigation/elements/data_area.js":
/*!***************************************************************!*\
  !*** ./sources/ext/keyboard_navigation/elements/data_area.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.$keyboardNavigation.DataArea = function (index) {
    this.index = index || 0;
  };

  scheduler.$keyboardNavigation.DataArea.prototype = scheduler._compose(scheduler.$keyboardNavigation.KeyNavNode, {
    getNode: function getNode(index) {
      return scheduler.$container.querySelector(".dhx_cal_data");
    },
    _handlers: null,
    isValid: function isValid() {
      return true;
    },
    fallback: function fallback() {
      return this;
    },
    keys: {
      "up,down,right,left": function upDownRightLeft() {
        this.moveTo(new scheduler.$keyboardNavigation.TimeSlot());
      }
    }
  });
  scheduler.$keyboardNavigation.DataArea.prototype.bindAll(scheduler.$keyboardNavigation.DataArea.prototype.keys);
});

/***/ }),

/***/ "./sources/ext/keyboard_navigation/elements/event.js":
/*!***********************************************************!*\
  !*** ./sources/ext/keyboard_navigation/elements/event.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.$keyboardNavigation.Event = function (id) {
    this.eventId = null;

    if (scheduler.getEvent(id)) {
      var ev = scheduler.getEvent(id);
      this.start = new Date(ev.start_date);
      this.end = new Date(ev.end_date);
      this.section = this._getSection(ev);
      this.eventId = id;
    }
  };

  scheduler.$keyboardNavigation.Event.prototype = scheduler._compose(scheduler.$keyboardNavigation.KeyNavNode, {
    _getNodes: function _getNodes() {
      return Array.prototype.slice.call(scheduler.$container.querySelectorAll("[" + scheduler.config.event_attribute + "]"));
    },
    _modes: scheduler.$keyboardNavigation.SchedulerNode.prototype._modes,
    getMode: scheduler.$keyboardNavigation.SchedulerNode.prototype.getMode,
    _handlers: null,
    isValid: function isValid() {
      return !!(scheduler.getEvent(this.eventId) && this.getNode());
    },
    fallback: function fallback() {
      var eventNode = this._getNodes()[0];

      var defaultElement = null;

      if (!eventNode || !scheduler._locate_event(eventNode)) {
        defaultElement = new scheduler.$keyboardNavigation.TimeSlot();
      } else {
        var id = scheduler._locate_event(eventNode);

        defaultElement = new scheduler.$keyboardNavigation.Event(id);
      }

      return defaultElement;
    },
    isScrolledIntoView: function isScrolledIntoView(el) {
      var eventBox = el.getBoundingClientRect();
      var viewPort = scheduler.$container.querySelector(".dhx_cal_data").getBoundingClientRect();

      if (eventBox.bottom < viewPort.top || eventBox.top > viewPort.bottom) {
        return false;
      }

      return true;
    },
    getNode: function getNode() {
      var idSelector = "[" + scheduler.config.event_attribute + "='" + this.eventId + "']";
      var inlineEditor = scheduler.$keyboardNavigation.dispatcher.getInlineEditor(this.eventId);

      if (inlineEditor) {
        // is inline editor visible
        return inlineEditor;
      } else {
        if (scheduler.isMultisectionEvent && scheduler.isMultisectionEvent(scheduler.getEvent(this.eventId))) {
          var nodes = scheduler.$container.querySelectorAll(idSelector);

          for (var i = 0; i < nodes.length; i++) {
            if (this.isScrolledIntoView(nodes[i])) {
              return nodes[i];
            }
          }

          return nodes[0];
        } else {
          return scheduler.$container.querySelector(idSelector);
        }
      }
    },
    focus: function focus() {
      var event = scheduler.getEvent(this.eventId);
      var calendar = scheduler.getState();

      if (event.start_date.valueOf() > calendar.max_date.valueOf() || event.end_date.valueOf() <= calendar.min_date.valueOf()) {
        scheduler.setCurrentView(event.start_date);
      }

      var node = this.getNode();

      if (this.isScrolledIntoView(node)) {
        scheduler.$keyboardNavigation.dispatcher.keepScrollPosition(function () {
          scheduler.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
        }.bind(this));
      } else {
        scheduler.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
      }
    },
    blur: function blur() {
      scheduler.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
    },
    _getSection: function _getSection(ev) {
      var section = null;
      var mode = scheduler.getState().mode;

      if (scheduler.matrix && scheduler.matrix[mode]) {
        var timeline = scheduler.matrix[scheduler.getState().mode];
        section = ev[timeline.y_property];
      } else if (scheduler._props && scheduler._props[mode]) {
        var unit = scheduler._props[mode];
        section = ev[unit.map_to];
      }

      return section;
    },
    _moveToSlot: function _moveToSlot(dir) {
      var ev = scheduler.getEvent(this.eventId);

      if (ev) {
        var section = this._getSection(ev);

        var slot = new scheduler.$keyboardNavigation.TimeSlot(ev.start_date, null, section);
        this.moveTo(slot.nextSlot(slot, dir));
      } else {
        this.moveTo(new scheduler.$keyboardNavigation.TimeSlot());
      }
    },
    keys: {
      "left": function left() {
        this._moveToSlot("left");
      },
      "right": function right() {
        this._moveToSlot("right");
      },
      "down": function down() {
        if (this.getMode() == this._modes.list) {
          scheduler.$keyboardNavigation.SchedulerNode.prototype.nextEventHandler();
        } else {
          this._moveToSlot("down");
        }
      },
      "space": function space() {
        var node = this.getNode();

        if (node && node.click) {
          node.click();
        } else {
          this.moveTo(new scheduler.$keyboardNavigation.TimeSlot());
        }
      },
      "up": function up() {
        if (this.getMode() == this._modes.list) {
          scheduler.$keyboardNavigation.SchedulerNode.prototype.prevEventHandler();
        } else {
          this._moveToSlot("up");
        }
      },
      "delete": function _delete() {
        if (scheduler.getEvent(this.eventId)) {
          scheduler._click.buttons["delete"](this.eventId);
        } else {
          this.moveTo(new scheduler.$keyboardNavigation.TimeSlot());
        }
      },
      // open lightbox
      "enter": function enter() {
        if (scheduler.getEvent(this.eventId)) {
          scheduler.showLightbox(this.eventId);
        } else {
          this.moveTo(new scheduler.$keyboardNavigation.TimeSlot());
        }
      }
    }
  });
  scheduler.$keyboardNavigation.Event.prototype.bindAll(scheduler.$keyboardNavigation.Event.prototype.keys);
});

/***/ }),

/***/ "./sources/ext/keyboard_navigation/elements/header_cell.js":
/*!*****************************************************************!*\
  !*** ./sources/ext/keyboard_navigation/elements/header_cell.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.$keyboardNavigation.HeaderCell = function (index) {
    this.index = index || 0;
  };

  scheduler.$keyboardNavigation.HeaderCell.prototype = scheduler._compose(scheduler.$keyboardNavigation.KeyNavNode, {
    getNode: function getNode(index) {
      index = index || this.index || 0;
      var nodes = this.getNodes();
      if (nodes[index]) return nodes[index];
    },
    getNodes: function getNodes(selector) {
      selector = selector || [".dhx_cal_navline .dhx_cal_prev_button", ".dhx_cal_navline .dhx_cal_next_button", ".dhx_cal_navline .dhx_cal_today_button", ".dhx_cal_navline .dhx_cal_tab"].join(", ");
      var nodes = Array.prototype.slice.call(scheduler.$container.querySelectorAll(selector));
      nodes.sort(function (a, b) {
        return a.offsetLeft - b.offsetLeft;
      });
      return nodes;
    },
    _handlers: null,
    isValid: function isValid() {
      return !!this.getNode(this.index);
    },
    fallback: function fallback() {
      var defaultCell = this.getNode(0);

      if (!defaultCell) {
        defaultCell = new scheduler.$keyboardNavigation.TimeSlot();
      }

      return defaultCell;
    },
    keys: {
      "left": function left() {
        var newIndex = this.index - 1;

        if (newIndex < 0) {
          newIndex = this.getNodes().length - 1;
        }

        this.moveTo(new scheduler.$keyboardNavigation.HeaderCell(newIndex));
      },
      "right": function right() {
        var newIndex = this.index + 1;

        if (newIndex >= this.getNodes().length) {
          newIndex = 0;
        }

        this.moveTo(new scheduler.$keyboardNavigation.HeaderCell(newIndex));
      },
      "down": function down() {
        this.moveTo(new scheduler.$keyboardNavigation.TimeSlot());
      },
      "enter": function enter() {
        var node = this.getNode();

        if (node) {
          node.click();
        }
      }
    }
  });
  scheduler.$keyboardNavigation.HeaderCell.prototype.bindAll(scheduler.$keyboardNavigation.HeaderCell.prototype.keys);
});

/***/ }),

/***/ "./sources/ext/keyboard_navigation/elements/minical_button.js":
/*!********************************************************************!*\
  !*** ./sources/ext/keyboard_navigation/elements/minical_button.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.$keyboardNavigation.MinicalButton = function (div, index) {
    this.container = div;
    this.index = index || 0;
  };

  scheduler.$keyboardNavigation.MinicalButton.prototype = scheduler._compose(scheduler.$keyboardNavigation.KeyNavNode, {
    isValid: function isValid() {
      var container = this.container;
      return !!container.offsetWidth; // valid if container is visible
    },
    fallback: function fallback() {
      var defaultSlot = new scheduler.$keyboardNavigation.TimeSlot();

      if (defaultSlot.isValid()) {
        return defaultSlot;
      } else {
        return new scheduler.$keyboardNavigation.DataArea();
      }
    },
    focus: function focus() {
      scheduler.$keyboardNavigation.dispatcher.globalNode.disable();
      this.container.removeAttribute("tabindex");
      scheduler.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
    },
    blur: function blur() {
      this.container.setAttribute("tabindex", "0");
      scheduler.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
    },
    getNode: function getNode() {
      if (!this.index) {
        return this.container.querySelector(".dhx_cal_prev_button");
      } else {
        return this.container.querySelector(".dhx_cal_next_button");
      }
    },
    keys: {
      "right": function right(e) {
        this.moveTo(new scheduler.$keyboardNavigation.MinicalButton(this.container, this.index ? 0 : 1));
      },
      "left": function left(e) {
        this.moveTo(new scheduler.$keyboardNavigation.MinicalButton(this.container, this.index ? 0 : 1));
      },
      "down": function down() {
        var next = new scheduler.$keyboardNavigation.MinicalCell(this.container, 0, 0);

        if (next && !next.isValid()) {
          next = next.fallback();
        }

        this.moveTo(next);
      },
      "enter": function enter(e) {
        this.getNode().click();
      }
    }
  });
  scheduler.$keyboardNavigation.MinicalButton.prototype.bindAll(scheduler.$keyboardNavigation.MinicalButton.prototype.keys);
});

/***/ }),

/***/ "./sources/ext/keyboard_navigation/elements/minical_cell.js":
/*!******************************************************************!*\
  !*** ./sources/ext/keyboard_navigation/elements/minical_cell.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.$keyboardNavigation.MinicalCell = function (div, row, col) {
    this.container = div;
    this.row = row || 0;
    this.col = col || 0;
  };

  scheduler.$keyboardNavigation.MinicalCell.prototype = scheduler._compose(scheduler.$keyboardNavigation.KeyNavNode, {
    isValid: function isValid() {
      var grid = this._getGrid();

      return !!(grid[this.row] && grid[this.row][this.col]);
    },
    fallback: function fallback() {
      var row = this.row;
      var col = this.col;

      var grid = this._getGrid();

      if (!grid[row]) {
        row = 0;
      }

      var dir = true;

      if (row > grid.length / 2) {
        dir = false;
      }

      if (!grid[row]) {
        var defaultSlot = new scheduler.$keyboardNavigation.TimeSlot();

        if (defaultSlot.isValid()) {
          return defaultSlot;
        } else {
          return new scheduler.$keyboardNavigation.DataArea();
        }
      }

      if (dir) {
        for (var c = col; grid[row] && c < grid[row].length; c++) {
          if (!grid[row][c] && c == grid[row].length - 1) {
            row++;
            col = 0;
          }

          if (grid[row][c]) {
            return new scheduler.$keyboardNavigation.MinicalCell(this.container, row, c);
          }
        }
      } else {
        for (var c = col; grid[row] && c < grid[row].length; c--) {
          if (!grid[row][c] && !c) {
            row--;
            col = grid[row].length - 1;
          }

          if (grid[row][c]) {
            return new scheduler.$keyboardNavigation.MinicalCell(this.container, row, c);
          }
        }
      }

      return new scheduler.$keyboardNavigation.MinicalButton(this.container, 0);
    },
    focus: function focus() {
      scheduler.$keyboardNavigation.dispatcher.globalNode.disable();
      this.container.removeAttribute("tabindex");
      scheduler.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
    },
    blur: function blur() {
      this.container.setAttribute("tabindex", "0");
      scheduler.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
    },
    _getNode: function _getNode(row, col) {
      return this.container.querySelector(".dhx_year_body tr:nth-child(" + (row + 1) + ") td:nth-child(" + (col + 1) + ")");
    },
    getNode: function getNode() {
      return this._getNode(this.row, this.col);
    },
    _getGrid: function _getGrid() {
      var rows = this.container.querySelectorAll(".dhx_year_body tr");
      var grid = [];

      for (var i = 0; i < rows.length; i++) {
        grid[i] = [];
        var row = rows[i];
        var cells = row.querySelectorAll("td");

        for (var c = 0; c < cells.length; c++) {
          var cell = cells[c];
          var enabled = true;

          var css = scheduler._getClassName(cell);

          if (css.indexOf("dhx_after") > -1 || css.indexOf("dhx_before") > -1 || css.indexOf("dhx_scale_ignore") > -1) {
            enabled = false;
          }

          grid[i][c] = enabled;
        }
      }

      return grid;
    },
    keys: {
      "right": function right(e) {
        var grid = this._getGrid();

        var newRow = this.row;
        var newCol = this.col + 1;

        if (!grid[newRow] || !grid[newRow][newCol]) {
          if (grid[newRow + 1]) {
            newRow = newRow + 1;
            newCol = 0;
          } else {
            newCol = this.col;
          }
        }

        var next = new scheduler.$keyboardNavigation.MinicalCell(this.container, newRow, newCol);

        if (!next.isValid()) {
          next = next.fallback();
        }

        this.moveTo(next);
      },
      "left": function left(e) {
        var grid = this._getGrid();

        var newRow = this.row;
        var newCol = this.col - 1;

        if (!grid[newRow] || !grid[newRow][newCol]) {
          if (grid[newRow - 1]) {
            newRow = newRow - 1;
            newCol = grid[newRow].length - 1;
          } else {
            newCol = this.col;
          }
        }

        var next = new scheduler.$keyboardNavigation.MinicalCell(this.container, newRow, newCol);

        if (!next.isValid()) {
          next = next.fallback();
        }

        this.moveTo(next);
      },
      "down": function down() {
        var grid = this._getGrid();

        var newRow = this.row + 1;
        var newCol = this.col;

        if (!grid[newRow] || !grid[newRow][newCol]) {
          newRow = this.row;
        }

        var next = new scheduler.$keyboardNavigation.MinicalCell(this.container, newRow, newCol);

        if (!next.isValid()) {
          next = next.fallback();
        }

        this.moveTo(next);
      },
      "up": function up() {
        var grid = this._getGrid();

        var newRow = this.row - 1;
        var newCol = this.col;

        if (!grid[newRow] || !grid[newRow][newCol]) {
          var index = 0;

          if (this.col > grid[this.row].length / 2) {
            index = 1;
          }

          this.moveTo(new scheduler.$keyboardNavigation.MinicalButton(this.container, index));
        } else {
          var next = new scheduler.$keyboardNavigation.MinicalCell(this.container, newRow, newCol);

          if (!next.isValid()) {
            next = next.fallback();
          }

          this.moveTo(next);
        }
      },
      "enter": function enter(e) {
        this.getNode().querySelector(".dhx_month_head").click();
      }
    }
  });
  scheduler.$keyboardNavigation.MinicalCell.prototype.bindAll(scheduler.$keyboardNavigation.MinicalCell.prototype.keys);
});

/***/ }),

/***/ "./sources/ext/keyboard_navigation/elements/nav_node.js":
/*!**************************************************************!*\
  !*** ./sources/ext/keyboard_navigation/elements/nav_node.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.$keyboardNavigation.KeyNavNode = function () {};

  scheduler.$keyboardNavigation.KeyNavNode.prototype = scheduler._compose(scheduler.$keyboardNavigation.EventHandler, {
    isValid: function isValid() {
      return true;
    },
    fallback: function fallback() {
      return null;
    },
    moveTo: function moveTo(element) {
      scheduler.$keyboardNavigation.dispatcher.setActiveNode(element);
    },
    compareTo: function compareTo(b) {
      // good enough comparison of two random objects
      if (!b) return false;

      for (var i in this) {
        if (!!this[i] != !!b[i]) return false;
        var canStringifyThis = !!(this[i] && this[i].toString);
        var canStringifyThat = !!(b[i] && b[i].toString);
        if (canStringifyThat != canStringifyThis) return false;

        if (!(canStringifyThat && canStringifyThis)) {
          if (b[i] != this[i]) return false;
        } else {
          if (b[i].toString() != this[i].toString()) return false;
        }
      }

      return true;
    },
    getNode: function getNode() {},
    focus: function focus() {
      var node = this.getNode();

      if (node) {
        node.setAttribute("tabindex", "-1"); //node.className += " scheduler_focused";

        if (node.focus) node.focus();
      }
    },
    blur: function blur() {
      var node = this.getNode();

      if (node) {
        node.setAttribute("tabindex", "-1"); //node.className = (node.className || "").replace(/ ?scheduler_focused/g, "");
      }
    }
  });
});

/***/ }),

/***/ "./sources/ext/keyboard_navigation/elements/scheduler_node.js":
/*!********************************************************************!*\
  !*** ./sources/ext/keyboard_navigation/elements/scheduler_node.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.$keyboardNavigation.SchedulerNode = function () {};

  scheduler.$keyboardNavigation.SchedulerNode.prototype = scheduler._compose(scheduler.$keyboardNavigation.EventHandler, {
    getDefaultNode: function getDefaultNode() {
      var node = new scheduler.$keyboardNavigation.TimeSlot();

      if (!node.isValid()) {
        node = node.fallback();
      }

      return node;
    },
    _modes: {
      month: "month",
      year: "year",
      dayColumns: "dayColumns",
      timeline: "timeline",
      units: "units",
      weekAgenda: "weekAgenda",
      list: "list"
    },
    getMode: function getMode() {
      var state = scheduler.getState();
      var mode = state.mode;

      if (scheduler.matrix && scheduler.matrix[mode]) {
        return this._modes.timeline;
      } else if (scheduler._props && scheduler._props[mode]) {
        return this._modes.units;
      } else if (mode == "month") {
        return this._modes.month;
      } else if (mode == "year") {
        return this._modes.year;
      } else if (mode == "week_agenda") {
        return this._modes.weekAgenda;
      } else if (mode == "map" || mode == "agenda" || scheduler._grid && scheduler["grid_" + mode]) {
        return this._modes.list;
      } else {
        return this._modes.dayColumns;
      }
    },
    focus: function focus() {
      scheduler.focus();
    },
    blur: function blur() {},
    disable: function disable() {
      scheduler.$container.setAttribute("tabindex", "0");
    },
    enable: function enable() {
      if (scheduler.$container) scheduler.$container.removeAttribute("tabindex");
    },
    isEnabled: function isEnabled() {
      return scheduler.$container.hasAttribute("tabindex");
    },
    _compareEvents: function _compareEvents(a, b) {
      if (a.start_date.valueOf() == b.start_date.valueOf()) return a.id > b.id ? 1 : -1;
      return a.start_date.valueOf() > b.start_date.valueOf() ? 1 : -1;
    },
    _pickEvent: function _pickEvent(from, to, startId, reverse) {
      var range = scheduler.getState();
      from = new Date(Math.max(range.min_date.valueOf(), from.valueOf()));
      to = new Date(Math.min(range.max_date.valueOf(), to.valueOf()));
      var evs = scheduler.getEvents(from, to);
      evs.sort(this._compareEvents);

      if (reverse) {
        evs = evs.reverse();
      }

      var trim = !!startId;

      for (var i = 0; i < evs.length && trim; i++) {
        if (evs[i].id == startId) {
          trim = false;
        }

        evs.splice(i, 1);
        i--;
      }

      for (var i = 0; i < evs.length; i++) {
        var eventElement = new scheduler.$keyboardNavigation.Event(evs[i].id);
        if (eventElement.getNode()) return evs[i];
      }

      return null;
    },
    nextEventHandler: function nextEventHandler(id) {
      var activeNode = scheduler.$keyboardNavigation.dispatcher.activeNode;
      var startId = id || activeNode && activeNode.eventId;
      var nextEvent = null;

      if (startId && scheduler.getEvent(startId)) {
        var currEvent = scheduler.getEvent(startId);
        nextEvent = scheduler.$keyboardNavigation.SchedulerNode.prototype._pickEvent(currEvent.start_date, scheduler.date.add(currEvent.start_date, 1, "year"), currEvent.id, false);
      }

      if (!nextEvent && !id) {
        var visibleDates = scheduler.getState();
        nextEvent = scheduler.$keyboardNavigation.SchedulerNode.prototype._pickEvent(visibleDates.min_date, scheduler.date.add(visibleDates.min_date, 1, "year"), null, false);
      }

      if (nextEvent) {
        var nextEv = new scheduler.$keyboardNavigation.Event(nextEvent.id);

        if (!nextEv.isValid()) {
          // not visible event
          this.nextEventHandler(nextEvent.id);
        } else {
          if (activeNode) {
            activeNode.blur();
          }

          scheduler.$keyboardNavigation.dispatcher.setActiveNode(nextEv);
        }
      }
    },
    prevEventHandler: function prevEventHandler(id) {
      var activeNode = scheduler.$keyboardNavigation.dispatcher.activeNode;
      var startId = id || activeNode && activeNode.eventId;
      var nextEvent = null;

      if (startId && scheduler.getEvent(startId)) {
        var currEvent = scheduler.getEvent(startId);
        nextEvent = scheduler.$keyboardNavigation.SchedulerNode.prototype._pickEvent(scheduler.date.add(currEvent.end_date, -1, "year"), currEvent.end_date, currEvent.id, true);
      }

      if (!nextEvent && !id) {
        var visibleDates = scheduler.getState();
        nextEvent = scheduler.$keyboardNavigation.SchedulerNode.prototype._pickEvent(scheduler.date.add(visibleDates.max_date, -1, "year"), visibleDates.max_date, null, true);
      }

      if (nextEvent) {
        var nextEv = new scheduler.$keyboardNavigation.Event(nextEvent.id);

        if (!nextEv.isValid()) {
          // not visible event
          this.prevEventHandler(nextEvent.id);
        } else {
          if (activeNode) {
            activeNode.blur();
          }

          scheduler.$keyboardNavigation.dispatcher.setActiveNode(nextEv);
        }
      }
    },
    keys: {
      "alt+1, alt+2, alt+3, alt+4, alt+5, alt+6, alt+7, alt+8, alt+9": function alt1Alt2Alt3Alt4Alt5Alt6Alt7Alt8Alt9(e) {
        var tabs = scheduler.$keyboardNavigation.HeaderCell.prototype.getNodes(".dhx_cal_navline .dhx_cal_tab");
        var key = e.key;

        if (key === undefined) {
          key = e.keyCode - 48;
        }

        if (tabs[key * 1 - 1]) {
          tabs[key * 1 - 1].click();
        }
      },
      "ctrl+left,meta+left": function ctrlLeftMetaLeft(e) {
        scheduler._click.dhx_cal_prev_button();
      },
      "ctrl+right,meta+right": function ctrlRightMetaRight(e) {
        scheduler._click.dhx_cal_next_button();
      },
      "ctrl+up,meta+up": function ctrlUpMetaUp(e) {
        var dataArea = scheduler.$container.querySelector(".dhx_cal_data");
        dataArea.scrollTop -= 20;
      },
      "ctrl+down,meta+down": function ctrlDownMetaDown(e) {
        var dataArea = scheduler.$container.querySelector(".dhx_cal_data");
        dataArea.scrollTop += 20;
      },
      "e": function e() {
        this.nextEventHandler();
      },
      "home": function home() {
        scheduler.setCurrentView(new Date());
      },
      "shift+e": function shiftE() {
        this.prevEventHandler();
      },
      "ctrl+enter,meta+enter": function ctrlEnterMetaEnter() {
        scheduler.addEventNow({
          start_date: new Date(scheduler.getState().date)
        });
      },
      "ctrl+c,meta+c": function ctrlCMetaC(e) {
        scheduler._key_nav_copy_paste(e);
      },
      "ctrl+v,meta+v": function ctrlVMetaV(e) {
        scheduler._key_nav_copy_paste(e);
      },
      "ctrl+x,meta+x": function ctrlXMetaX(e) {
        scheduler._key_nav_copy_paste(e);
      }
    }
  });
  scheduler.$keyboardNavigation.SchedulerNode.prototype.bindAll(scheduler.$keyboardNavigation.SchedulerNode.prototype.keys);
});

/***/ }),

/***/ "./sources/ext/keyboard_navigation/elements/time_slot.js":
/*!***************************************************************!*\
  !*** ./sources/ext/keyboard_navigation/elements/time_slot.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.$keyboardNavigation.TimeSlot = function (from, to, section, movingDate) {
    var state = scheduler.getState();
    var timeline = scheduler.matrix && scheduler.matrix[state.mode];

    if (!from) {
      from = this.getDefaultDate();
    }

    if (!to) {
      if (timeline) {
        to = scheduler.date.add(from, timeline.x_step, timeline.x_unit);
      } else {
        to = scheduler.date.add(from, scheduler.config.key_nav_step, "minute");
      }
    }

    this.section = section || this._getDefaultSection();
    this.start_date = new Date(from);
    this.end_date = new Date(to);
    this.movingDate = movingDate || null;
  };

  scheduler.$keyboardNavigation.TimeSlot.prototype = scheduler._compose(scheduler.$keyboardNavigation.KeyNavNode, {
    _handlers: null,
    getDefaultDate: function getDefaultDate() {
      var from;
      var state = scheduler.getState();
      var visibleTime = new Date(state.date);
      visibleTime.setSeconds(0);
      visibleTime.setMilliseconds(0);
      var nowTime = new Date();
      nowTime.setSeconds(0);
      nowTime.setMilliseconds(0);
      var timeline = scheduler.matrix && scheduler.matrix[state.mode];
      var showNowTime = false;

      if (visibleTime.valueOf() === nowTime.valueOf()) {
        showNowTime = true;
      }

      if (timeline) {
        if (showNowTime) {
          if (timeline.x_unit === "day") {
            nowTime.setHours(0);
            nowTime.setMinutes(0);
          } else if (timeline.x_unit === "hour") {
            nowTime.setMinutes(0);
          }

          from = nowTime;
        } else {
          from = scheduler.date[timeline.name + "_start"](new Date(state.date));
        }

        from = this.findVisibleColumn(from);
      } else {
        from = new Date(scheduler.getState().min_date);

        if (showNowTime) {
          from = nowTime;
        }

        from = this.findVisibleColumn(from);

        if (!showNowTime) {
          from.setHours(scheduler.config.first_hour);
        }

        if (!scheduler._table_view) {
          var dataContainer = scheduler.$container.querySelector(".dhx_cal_data");

          if (dataContainer.scrollTop) {
            from.setHours(scheduler.config.first_hour + Math.ceil(dataContainer.scrollTop / scheduler.config.hour_size_px));
          }
        }
      }

      return from;
    },
    clone: function clone(timeslot) {
      return new scheduler.$keyboardNavigation.TimeSlot(timeslot.start_date, timeslot.end_date, timeslot.section, timeslot.movingDate);
    },
    _getMultisectionView: function _getMultisectionView() {
      var state = scheduler.getState();
      var view;

      if (scheduler._props && scheduler._props[state.mode]) {
        view = scheduler._props[state.mode];
      } else if (scheduler.matrix && scheduler.matrix[state.mode]) {
        view = scheduler.matrix[state.mode];
      }

      return view;
    },
    _getDefaultSection: function _getDefaultSection() {
      var section = null;

      var view = this._getMultisectionView();

      if (view && !section) {
        section = this._getNextSection();
      }

      return section;
    },
    _getNextSection: function _getNextSection(sectionId, dir) {
      var view = this._getMultisectionView();

      var currentIndex = view.order[sectionId];
      var nextIndex = currentIndex;

      if (currentIndex !== undefined) {
        nextIndex = currentIndex + dir;
      } else {
        nextIndex = view.size && view.position ? view.position : 0;
      }

      nextIndex = nextIndex < 0 ? nextIndex = (view.options || view.y_unit).length - 1 : nextIndex;
      var options = view.options || view.y_unit;

      if (options[nextIndex]) {
        return options[nextIndex].key;
      } else {
        return null;
      }
    },
    isValid: function isValid() {
      var state = scheduler.getState();
      var isInRange = !(this.start_date.valueOf() < state.min_date.valueOf() || this.start_date.valueOf() >= state.max_date.valueOf());
      if (!isInRange) return false;
      if (!this.isVisible(this.start_date, this.end_date)) return false;

      var view = this._getMultisectionView();

      if (view) {
        return view.order[this.section] !== undefined;
      } else {
        return true;
      }
    },
    fallback: function fallback() {
      var defaultSlot = new scheduler.$keyboardNavigation.TimeSlot();

      if (!defaultSlot.isValid()) {
        return new scheduler.$keyboardNavigation.DataArea();
      } else {
        return defaultSlot;
      }
    },
    getNodes: function getNodes() {
      return Array.prototype.slice.call(scheduler.$container.querySelectorAll(".dhx_focus_slot"));
    },
    getNode: function getNode() {
      return this.getNodes()[0];
    },
    focus: function focus() {
      scheduler.$keyboardNavigation.marker.render(this.start_date, this.end_date, this.section);
      scheduler.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this);
      scheduler.$keyboardNavigation._pasteDate = this.start_date;
      scheduler.$keyboardNavigation._pasteSection = this.section;
    },
    blur: function blur() {
      scheduler.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this);
      scheduler.$keyboardNavigation.marker.clear();
    },
    _modes: scheduler.$keyboardNavigation.SchedulerNode.prototype._modes,
    _getMode: scheduler.$keyboardNavigation.SchedulerNode.prototype.getMode,
    addMonthDate: function addMonthDate(date, dir, extend) {
      var res;

      switch (dir) {
        case "up":
          res = scheduler.date.add(date, -1, "week");
          break;

        case "down":
          res = scheduler.date.add(date, 1, "week");
          break;

        case "left":
          res = scheduler.date.day_start(scheduler.date.add(date, -1, "day"));
          res = this.findVisibleColumn(res, -1);
          break;

        case "right":
          res = scheduler.date.day_start(scheduler.date.add(date, 1, "day"));
          res = this.findVisibleColumn(res, 1);
          break;

        default:
          res = scheduler.date.day_start(new Date(date));
          break;
      }

      var state = scheduler.getState();

      if (date.valueOf() < state.min_date.valueOf() || !extend && date.valueOf() >= state.max_date.valueOf()) {
        res = new Date(state.min_date);
      }

      return res;
    },
    nextMonthSlot: function nextMonthSlot(slot, dir, extend) {
      var start, end;
      start = this.addMonthDate(slot.start_date, dir, extend);
      start.setHours(scheduler.config.first_hour);
      end = new Date(start);
      end.setHours(scheduler.config.last_hour);
      return {
        start_date: start,
        end_date: end
      };
    },
    _alignTimeSlot: function _alignTimeSlot(date, minDate, unit, step) {
      var currentDate = new Date(minDate);

      while (currentDate.valueOf() < date.valueOf()) {
        currentDate = scheduler.date.add(currentDate, step, unit);
      }

      if (currentDate.valueOf() > date.valueOf()) {
        currentDate = scheduler.date.add(currentDate, -step, unit);
      }

      return currentDate;
    },
    nextTimelineSlot: function nextTimelineSlot(slot, dir, extend) {
      var state = scheduler.getState();
      var view = scheduler.matrix[state.mode];

      var startDate = this._alignTimeSlot(slot.start_date, scheduler.date[view.name + "_start"](new Date(slot.start_date)), view.x_unit, view.x_step);

      var endDate = this._alignTimeSlot(slot.end_date, scheduler.date[view.name + "_start"](new Date(slot.end_date)), view.x_unit, view.x_step);

      if (endDate.valueOf() <= startDate.valueOf()) {
        endDate = scheduler.date.add(startDate, view.x_step, view.x_unit);
      }

      var newPos = this.clone(slot);
      newPos.start_date = startDate;
      newPos.end_date = endDate;
      newPos.section = slot.section || this._getNextSection();

      switch (dir) {
        case "up":
          newPos.section = this._getNextSection(slot.section, -1);
          break;

        case "down":
          newPos.section = this._getNextSection(slot.section, +1);
          break;

        case "left":
          newPos.start_date = this.findVisibleColumn(scheduler.date.add(newPos.start_date, -view.x_step, view.x_unit), -1);
          newPos.end_date = scheduler.date.add(newPos.start_date, view.x_step, view.x_unit);
          break;

        case "right":
          newPos.start_date = this.findVisibleColumn(scheduler.date.add(newPos.start_date, view.x_step, view.x_unit), 1);
          newPos.end_date = scheduler.date.add(newPos.start_date, view.x_step, view.x_unit);
          break;

        default:
          break;
      }

      if (newPos.start_date.valueOf() < state.min_date.valueOf() || newPos.start_date.valueOf() >= state.max_date.valueOf()) {
        if (extend && newPos.start_date.valueOf() >= state.max_date.valueOf()) {
          newPos.start_date = new Date(state.max_date);
        } else {
          newPos.start_date = scheduler.date[state.mode + "_start"](scheduler.date.add(state.date, dir == "left" ? -1 : 1, state.mode));
          newPos.end_date = scheduler.date.add(newPos.start_date, view.x_step, view.x_unit);
        }
      }

      return newPos;
    },
    nextUnitsSlot: function nextUnitsSlot(slot, dir, extend) {
      var newPos = this.clone(slot);
      newPos.section = slot.section || this._getNextSection();

      var section = slot.section || this._getNextSection();

      var state = scheduler.getState();
      var view = scheduler._props[state.mode];

      switch (dir) {
        case "left":
          section = this._getNextSection(slot.section, -1);
          var optionsCount = view.size ? view.size - 1 : view.options.length;

          if (view.days > 1 && view.order[section] == optionsCount - 1) {
            if (scheduler.date.add(slot.start_date, -1, "day").valueOf() >= state.min_date.valueOf()) {
              newPos = this.nextDaySlot(slot, dir, extend);
            }
          }

          break;

        case "right":
          section = this._getNextSection(slot.section, 1);

          if (view.days > 1 && !view.order[section]) {
            if (scheduler.date.add(slot.start_date, 1, "day").valueOf() < state.max_date.valueOf()) {
              newPos = this.nextDaySlot(slot, dir, extend);
            }
          }

          break;

        default:
          newPos = this.nextDaySlot(slot, dir, extend);
          section = slot.section;
          break;
      }

      newPos.section = section;
      return newPos;
    },
    _moveDate: function _moveDate(oldDate, dir) {
      var newDate = this.findVisibleColumn(scheduler.date.add(oldDate, dir, "day"), dir);
      newDate.setHours(oldDate.getHours());
      newDate.setMinutes(oldDate.getMinutes());
      return newDate;
    },
    isBeforeLastHour: function isBeforeLastHour(date, isStartDate) {
      var minutes = date.getMinutes(),
          hours = date.getHours(),
          last_hour = scheduler.config.last_hour;
      return hours < last_hour || !isStartDate && (last_hour == 24 || hours == last_hour) && !minutes;
    },
    isAfterFirstHour: function isAfterFirstHour(date, isStartDate) {
      var minutes = date.getMinutes(),
          hours = date.getHours(),
          first_hour = scheduler.config.first_hour,
          last_hour = scheduler.config.last_hour;
      return hours >= first_hour || !isStartDate && !minutes && (!hours && last_hour == 24 || hours == last_hour);
    },
    isInVisibleDayTime: function isInVisibleDayTime(date, isStartDate) {
      return this.isBeforeLastHour(date, isStartDate) && this.isAfterFirstHour(date, isStartDate);
    },
    nextDaySlot: function nextDaySlot(slot, dir, extend) {
      var start, end;
      var key_nav_step = scheduler.config.key_nav_step;

      var date = this._alignTimeSlot(slot.start_date, scheduler.date.day_start(new Date(slot.start_date)), "minute", key_nav_step);

      var oldStart = slot.start_date;

      switch (dir) {
        case "up":
          start = scheduler.date.add(date, -key_nav_step, "minute");

          if (!this.isInVisibleDayTime(start, true)) {
            if (!extend || this.isInVisibleDayTime(oldStart, true)) {
              var toNextDay = true;
              if (extend && scheduler.date.date_part(new Date(start)).valueOf() != scheduler.date.date_part(new Date(oldStart)).valueOf()) toNextDay = false;
              if (toNextDay) start = this.findVisibleColumn(scheduler.date.add(slot.start_date, -1, "day"), -1);
              start.setHours(scheduler.config.last_hour);
              start.setMinutes(0);
              start = scheduler.date.add(start, -key_nav_step, "minute");
            }
          }

          end = scheduler.date.add(start, key_nav_step, "minute");
          break;

        case "down":
          start = scheduler.date.add(date, key_nav_step, "minute");
          var testEnd = extend ? start : scheduler.date.add(start, key_nav_step, "minute");

          if (!this.isInVisibleDayTime(testEnd, false)) {
            if (!extend || this.isInVisibleDayTime(oldStart, false)) {
              if (!extend) {
                start = this.findVisibleColumn(scheduler.date.add(slot.start_date, 1, "day"), 1);
                start.setHours(scheduler.config.first_hour);
                start.setMinutes(0);
              } else {
                var toNextDay = true;

                if (scheduler.date.date_part(new Date(oldStart)).valueOf() == oldStart.valueOf()) {
                  toNextDay = false;
                }

                if (toNextDay) {
                  start = this.findVisibleColumn(scheduler.date.add(slot.start_date, 1, "day"), 1);
                }

                start.setHours(scheduler.config.first_hour);
                start.setMinutes(0);
                start = scheduler.date.add(start, key_nav_step, "minute");
              }
            }
          }

          end = scheduler.date.add(start, key_nav_step, "minute");
          break;

        case "left":
          start = this._moveDate(slot.start_date, -1);
          end = this._moveDate(slot.end_date, -1);
          break;

        case "right":
          start = this._moveDate(slot.start_date, 1);
          end = this._moveDate(slot.end_date, 1);
          break;

        default:
          start = date;
          end = scheduler.date.add(start, key_nav_step, "minute");
          break;
      }

      return {
        start_date: start,
        end_date: end
      };
    },
    nextWeekAgendaSlot: function nextWeekAgendaSlot(slot, dir) {
      var start, end;
      var state = scheduler.getState();

      switch (dir) {
        case "down":
        case "left":
          start = scheduler.date.day_start(scheduler.date.add(slot.start_date, -1, "day"));
          start = this.findVisibleColumn(start, -1);
          break;

        case "up":
        case "right":
          start = scheduler.date.day_start(scheduler.date.add(slot.start_date, 1, "day"));
          start = this.findVisibleColumn(start, 1);
          break;

        default:
          start = scheduler.date.day_start(slot.start_date);
          break;
      }

      if (slot.start_date.valueOf() < state.min_date.valueOf() || slot.start_date.valueOf() >= state.max_date.valueOf()) {
        start = new Date(state.min_date);
      }

      end = new Date(start);
      end.setHours(scheduler.config.last_hour);
      return {
        start_date: start,
        end_date: end
      };
    },
    nextAgendaSlot: function nextAgendaSlot(slot, dir) {
      return {
        start_date: slot.start_date,
        end_date: slot.end_date
      };
    },
    isDateVisible: function isDateVisible(date) {
      if (!scheduler._ignores_detected) return true;
      var timeline = scheduler.matrix && scheduler.matrix[scheduler.getState().mode];
      var index;

      if (timeline) {
        index = scheduler._get_date_index(timeline, date);
      } else {
        index = scheduler.locate_holder_day(date);
      }

      return !scheduler._ignores[index];
    },
    findVisibleColumn: function findVisibleColumn(start, dir) {
      var date = start;
      dir = dir || 1;
      var range = scheduler.getState();

      while (!this.isDateVisible(date) && (dir > 0 && date.valueOf() <= range.max_date.valueOf() || dir < 0 && date.valueOf() >= range.min_date.valueOf())) {
        date = this.nextDateColumn(date, dir);
      }

      return date;
    },
    nextDateColumn: function nextDateColumn(start, dir) {
      dir = dir || 1;
      var timeline = scheduler.matrix && scheduler.matrix[scheduler.getState().mode];
      var date;

      if (timeline) {
        date = scheduler.date.add(start, dir * timeline.x_step, timeline.x_unit);
      } else {
        date = scheduler.date.day_start(scheduler.date.add(start, dir, "day"));
      }

      return date;
    },
    isVisible: function isVisible(from, to) {
      if (!scheduler._ignores_detected) return true;
      var current = new Date(from);

      while (current.valueOf() < to.valueOf()) {
        if (this.isDateVisible(current)) return true;
        current = this.nextDateColumn(current);
      }

      return false;
    },
    nextSlot: function nextSlot(slot, dir, view, extend) {
      var next;
      view = view || this._getMode();
      var tempSlot = scheduler.$keyboardNavigation.TimeSlot.prototype.clone(slot);

      switch (view) {
        case this._modes.units:
          next = this.nextUnitsSlot(tempSlot, dir, extend);
          break;

        case this._modes.timeline:
          next = this.nextTimelineSlot(tempSlot, dir, extend);
          break;

        case this._modes.year:
          next = this.nextMonthSlot(tempSlot, dir, extend);
          break;

        case this._modes.month:
          next = this.nextMonthSlot(tempSlot, dir, extend);
          break;

        case this._modes.weekAgenda:
          next = this.nextWeekAgendaSlot(tempSlot, dir, extend);
          break;

        case this._modes.list:
          next = this.nextAgendaSlot(tempSlot, dir, extend);
          break;

        case this._modes.dayColumns:
          next = this.nextDaySlot(tempSlot, dir, extend);
          break;
      }

      if (next.start_date.valueOf() >= next.end_date.valueOf()) {
        next = this.nextSlot(next, dir, view);
      }

      return scheduler.$keyboardNavigation.TimeSlot.prototype.clone(next);
    },
    extendSlot: function extendSlot(slot, dir) {
      var view = this._getMode();

      var next;

      switch (view) {
        case this._modes.units:
          if (dir == "left" || dir == "right") {
            next = this.nextUnitsSlot(slot, dir);
          } else {
            next = this.extendUnitsSlot(slot, dir);
          }

          break;

        case this._modes.timeline:
          if (dir == "down" || dir == "up") {
            next = this.nextTimelineSlot(slot, dir);
          } else {
            next = this.extendTimelineSlot(slot, dir);
          }

          break;

        case this._modes.year:
          next = this.extendMonthSlot(slot, dir);
          break;

        case this._modes.month:
          next = this.extendMonthSlot(slot, dir);
          break;

        case this._modes.dayColumns:
          next = this.extendDaySlot(slot, dir);
          break;

        case this._modes.weekAgenda:
          next = this.extendWeekAgendaSlot(slot, dir);
          break;

        default:
          next = slot;
          break;
      }

      var range = scheduler.getState();

      if (next.start_date.valueOf() < range.min_date.valueOf()) {
        next.start_date = this.findVisibleColumn(range.min_date);
        next.start_date.setHours(scheduler.config.first_hour);
      }

      if (next.end_date.valueOf() > range.max_date.valueOf()) {
        //	next.end_date =  new Date(slot.end_date);
        next.end_date = this.findVisibleColumn(range.max_date, -1);
      }

      return scheduler.$keyboardNavigation.TimeSlot.prototype.clone(next);
    },
    extendTimelineSlot: function extendTimelineSlot(slot, direction) {
      return this.extendGenericSlot({
        "left": "start_date",
        "right": "end_date"
      }, slot, direction, "timeline");
    },
    extendWeekAgendaSlot: function extendWeekAgendaSlot(slot, direction) {
      return this.extendGenericSlot({
        "left": "start_date",
        "right": "end_date"
      }, slot, direction, "weekAgenda");
    },
    extendGenericSlot: function extendGenericSlot(allowedDirections, slot, direction, type) {
      var next;
      var moveDate = slot.movingDate;

      if (!moveDate) {
        moveDate = allowedDirections[direction];
      }

      if (!moveDate || !allowedDirections[direction]) {
        return slot;
      }

      if (direction) {
        next = this.nextSlot({
          start_date: slot[moveDate],
          section: slot.section
        }, direction, type, true);

        if (next.start_date.valueOf() == slot.start_date.valueOf()) {
          next = this.nextSlot({
            start_date: next.start_date,
            section: next.section
          }, direction, type, true);
        }

        next.movingDate = moveDate;
      } else {
        return scheduler.$keyboardNavigation.TimeSlot.prototype.clone(slot);
      }

      var newDates = this.extendSlotDates(slot, next, next.movingDate);

      if (newDates.end_date.valueOf() <= newDates.start_date.valueOf()) {
        next.movingDate = next.movingDate == "end_date" ? "start_date" : "end_date";
      }

      newDates = this.extendSlotDates(slot, next, next.movingDate);
      next.start_date = newDates.start_date;
      next.end_date = newDates.end_date;
      return next;
    },
    extendSlotDates: function extendSlotDates(oldSlot, newSlot, dateDirection) {
      var res = {
        start_date: null,
        end_date: null
      };

      if (dateDirection == "start_date") {
        res.start_date = newSlot.start_date;
        res.end_date = oldSlot.end_date;
      } else {
        res.start_date = oldSlot.start_date;
        res.end_date = newSlot.start_date;
      }

      return res;
    },
    extendMonthSlot: function extendMonthSlot(slot, direction) {
      var slot = this.extendGenericSlot({
        "up": "start_date",
        "down": "end_date",
        "left": "start_date",
        "right": "end_date"
      }, slot, direction, "month");
      slot.start_date.setHours(scheduler.config.first_hour);
      slot.end_date = scheduler.date.add(slot.end_date, -1, "day");
      slot.end_date.setHours(scheduler.config.last_hour);
      return slot;
    },
    extendUnitsSlot: function extendUnitsSlot(slot, direction) {
      var next;

      switch (direction) {
        case "down":
        case "up":
          next = this.extendDaySlot(slot, direction);
          break;

        default:
          next = slot;
          break;
      }

      next.section = slot.section;
      return next;
    },
    extendDaySlot: function extendDaySlot(slot, direction) {
      return this.extendGenericSlot({
        "up": "start_date",
        "down": "end_date",
        "left": "start_date",
        "right": "end_date"
      }, slot, direction, "dayColumns");
    },
    scrollSlot: function scrollSlot(dir) {
      var state = scheduler.getState();
      var slot = this.nextSlot(this, dir);

      if (slot.start_date.valueOf() < state.min_date.valueOf() || slot.start_date.valueOf() >= state.max_date.valueOf()) {
        scheduler.setCurrentView(new Date(slot.start_date));
      }

      this.moveTo(slot);
    },
    keys: {
      "left": function left() {
        this.scrollSlot("left");
      },
      "right": function right() {
        this.scrollSlot("right");
      },
      "down": function down() {
        var mode = this._getMode();

        if (mode == this._modes.list) {
          scheduler.$keyboardNavigation.SchedulerNode.prototype.nextEventHandler();
        } else {
          this.scrollSlot("down");
        }
      },
      "up": function up() {
        var mode = this._getMode();

        if (mode == this._modes.list) {
          scheduler.$keyboardNavigation.SchedulerNode.prototype.prevEventHandler();
        } else {
          this.scrollSlot("up");
        }
      },
      "shift+down": function shiftDown() {
        this.moveTo(this.extendSlot(this, "down"));
      },
      "shift+up": function shiftUp() {
        this.moveTo(this.extendSlot(this, "up"));
      },
      "shift+right": function shiftRight() {
        this.moveTo(this.extendSlot(this, "right"));
      },
      "shift+left": function shiftLeft() {
        this.moveTo(this.extendSlot(this, "left"));
      },
      "enter": function enter() {
        var obj = {
          start_date: new Date(this.start_date),
          end_date: new Date(this.end_date)
        };
        var mode = scheduler.getState().mode;

        if (scheduler.matrix && scheduler.matrix[mode]) {
          var timeline = scheduler.matrix[scheduler.getState().mode];
          obj[timeline.y_property] = this.section;
        } else if (scheduler._props && scheduler._props[mode]) {
          var unit = scheduler._props[mode];
          obj[unit.map_to] = this.section;
        }

        scheduler.addEventNow(obj);
      }
    }
  });
  scheduler.$keyboardNavigation.TimeSlot.prototype.bindAll(scheduler.$keyboardNavigation.TimeSlot.prototype.keys);
});

/***/ }),

/***/ "./sources/ext/keyboard_navigation/key_nav_legacy.js":
/*!***********************************************************!*\
  !*** ./sources/ext/keyboard_navigation/key_nav_legacy.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  //Initial idea and implementation by Steve MC
  scheduler._temp_key_scope = function () {
    scheduler.config.key_nav = true;
    scheduler.$keyboardNavigation._pasteDate = null; // used for copy and paste operations

    scheduler.$keyboardNavigation._pasteSection = null; // used for copy and paste operations

    var isCopy = null;
    var pos = {};

    if (!document.body) {
      scheduler.event(window, "load", function () {
        scheduler.event(document.body, "mousemove", trackMousePosition);
      });
    } else {
      scheduler.event(document.body, "mousemove", trackMousePosition);
    }

    function trackMousePosition(event) {
      event = event || window.event;
      pos.x = event.clientX;
      pos.y = event.clientY;
    }

    function currentTarget() {
      var mousePointer = false;
      var keyNavPointer = false;
      var target = document.elementFromPoint(pos.x, pos.y);

      while (target && target != scheduler._obj) {
        target = target.parentNode;
      }

      mousePointer = !!(target == scheduler._obj);
      keyNavPointer = scheduler.$keyboardNavigation.dispatcher.isEnabled();
      return mousePointer || keyNavPointer;
    }

    scheduler.attachEvent("onMouseMove", function (id, e) {
      var state = scheduler.getState(); // make sure scheduler is fully initialized before calling scheduler.getActionData

      if (!(state.mode && state.min_date)) {
        return;
      }

      var position = scheduler.getActionData(e);
      scheduler.$keyboardNavigation._pasteDate = position.date;
      scheduler.$keyboardNavigation._pasteSection = position.section;
    });

    function clear_event_after(ev) {
      delete ev.rec_type;
      delete ev.rec_pattern;
      delete ev.event_pid;
      delete ev.event_length;
    }

    function copyEvent(ev) {
      return scheduler._lame_copy({}, ev);
    }

    scheduler._make_pasted_event = function (ev) {
      var date = scheduler.$keyboardNavigation._pasteDate;
      var section = scheduler.$keyboardNavigation._pasteSection;
      var event_duration = ev.end_date - ev.start_date;
      var copy = copyEvent(ev);
      clear_event_after(copy);
      copy.start_date = new Date(date);
      copy.end_date = new Date(copy.start_date.valueOf() + event_duration);

      if (section) {
        var property = scheduler._get_section_property();

        if (scheduler.config.multisection) copy[property] = ev[property]; // save initial set of resources for multisection view
        else copy[property] = section;
      }

      return copy;
    };

    scheduler._do_paste = function (is_copy, modified_ev, original_ev) {
      if (scheduler.callEvent("onBeforeEventPasted", [is_copy, modified_ev, original_ev]) === false) {
        return;
      }

      scheduler.addEvent(modified_ev);
      scheduler.callEvent("onEventPasted", [is_copy, modified_ev, original_ev]);
    };

    scheduler._is_key_nav_active = function () {
      if (this._is_initialized() && !this._is_lightbox_open() && this.config.key_nav) {
        return true;
      }

      return false;
    };

    function getSelectedEvent() {
      var node = scheduler.$keyboardNavigation.dispatcher.getActiveNode();
      if (node && node.eventId) return node.eventId;
      return scheduler._select_id;
    }

    scheduler.event(document, "keydown", function (e) {
      // compatibility fix - scheduler focus on ctrl+v on mouse hover
      if ((e.ctrlKey || e.metaKey) && e.keyCode == 86 && scheduler._buffer_event && !scheduler.$keyboardNavigation.dispatcher.isEnabled()) {
        scheduler.$keyboardNavigation.dispatcher.isActive = currentTarget();
      }
    });

    scheduler._key_nav_copy_paste = function (e) {
      if (!scheduler._is_key_nav_active()) return true;

      if (e.keyCode == 37 || e.keyCode == 39) {
        // Left, Right arrows
        e.cancelBubble = true;
        var next = scheduler.date.add(scheduler._date, e.keyCode == 37 ? -1 : 1, scheduler._mode);
        scheduler.setCurrentView(next);
        return true;
      }

      var select_id = getSelectedEvent();

      if ((e.ctrlKey || e.metaKey) && e.keyCode == 67) {
        // CTRL+C
        if (select_id) {
          scheduler._buffer_event = copyEvent(scheduler.getEvent(select_id));
          isCopy = true;
          scheduler.callEvent("onEventCopied", [scheduler.getEvent(select_id)]);
        }

        return true;
      }

      if ((e.ctrlKey || e.metaKey) && e.keyCode == 88) {
        // CTRL+X
        if (select_id) {
          isCopy = false;
          var ev = scheduler._buffer_event = copyEvent(scheduler.getEvent(select_id));
          scheduler.updateEvent(ev.id);
          scheduler.callEvent("onEventCut", [ev]);
        }
      }

      if ((e.ctrlKey || e.metaKey) && e.keyCode == 86 && currentTarget(e)) {
        // CTRL+V
        var ev = scheduler._buffer_event ? scheduler.getEvent(scheduler._buffer_event.id) : scheduler._buffer_event;
        ev = ev || scheduler._buffer_event;

        if (ev) {
          var new_ev = scheduler._make_pasted_event(ev);

          if (isCopy) {
            new_ev.id = scheduler.uid();

            scheduler._do_paste(isCopy, new_ev, ev);
          } else {
            // cut operation
            var res = scheduler.callEvent("onBeforeEventChanged", [new_ev, e, false, ev]);

            if (res) {
              scheduler._do_paste(isCopy, new_ev, ev);

              isCopy = true; // switch to copy after first paste operation
            }
          }
        }

        return true;
      }
    };
  };

  scheduler._temp_key_scope();
});

/***/ }),

/***/ "./sources/ext/keyboard_navigation/marker.js":
/*!***************************************************!*\
  !*** ./sources/ext/keyboard_navigation/marker.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.$keyboardNavigation.marker = {
    clear: function clear() {
      var divs = scheduler.$container.querySelectorAll(".dhx_focus_slot");

      for (var i = 0; i < divs.length; i++) {
        divs[i].parentNode.removeChild(divs[i]);
      }
    },
    createElement: function createElement() {
      var element = document.createElement("div");
      element.setAttribute("tabindex", -1);
      element.className = "dhx_focus_slot";
      return element;
    },
    renderMultiple: function renderMultiple(start, end, method) {
      var divs = [];
      var currentStart = new Date(start);
      var currentEnd = new Date(Math.min(end.valueOf(), scheduler.date.add(scheduler.date.day_start(new Date(start)), 1, "day").valueOf()));

      while (currentStart.valueOf() < end.valueOf()) {
        divs = divs.concat(method.call(this, currentStart, new Date(Math.min(currentEnd.valueOf(), end.valueOf()))));
        currentStart = scheduler.date.day_start(scheduler.date.add(currentStart, 1, "day"));
        currentEnd = scheduler.date.day_start(scheduler.date.add(currentStart, 1, "day"));
        currentEnd = new Date(Math.min(currentEnd.valueOf(), end.valueOf()));
      }

      return divs;
    },
    render: function render(start, end, section) {
      this.clear();
      var divs = [];
      var modes = scheduler.$keyboardNavigation.TimeSlot.prototype._modes;

      var view = scheduler.$keyboardNavigation.TimeSlot.prototype._getMode();

      switch (view) {
        case modes.units:
          divs = this.renderVerticalMarker(start, end, section);
          break;

        case modes.timeline:
          divs = this.renderTimelineMarker(start, end, section);
          break;

        case modes.year:
          divs = divs.concat(this.renderMultiple(start, end, this.renderYearMarker));
          break;

        case modes.month:
          divs = this.renderMonthMarker(start, end);
          break;

        case modes.weekAgenda:
          divs = divs.concat(this.renderMultiple(start, end, this.renderWeekAgendaMarker));
          break;

        case modes.list:
          divs = this.renderAgendaMarker(start, end);
          break;

        case modes.dayColumns:
          divs = divs.concat(this.renderMultiple(start, end, this.renderVerticalMarker));
          break;
      }

      this.addWaiAriaLabel(divs, start, end, section);
      this.addDataAttributes(divs, start, end, section);

      for (var i = divs.length - 1; i >= 0; i--) {
        if (divs[i].offsetWidth) {
          return divs[i];
        }
      }

      return null;
    },
    addDataAttributes: function addDataAttributes(divs, start, end, section) {
      var dateToStr = scheduler.date.date_to_str(scheduler.config.api_date);
      var from = dateToStr(start),
          to = dateToStr(end);

      for (var i = 0; i < divs.length; i++) {
        divs[i].setAttribute("data-start-date", from);
        divs[i].setAttribute("data-end-date", to);

        if (section) {
          divs[i].setAttribute("data-section", section);
        }
      }
    },
    addWaiAriaLabel: function addWaiAriaLabel(divs, start, end, section) {
      var label = "";
      var state = scheduler.getState();
      var mode = state.mode;
      var dateTimeLabel = false;
      label += scheduler.templates.day_date(start);

      if (scheduler.date.day_start(new Date(start)).valueOf() != start.valueOf()) {
        label += " " + scheduler.templates.hour_scale(start);
        dateTimeLabel = true;
      }

      if (scheduler.date.day_start(new Date(start)).valueOf() != scheduler.date.day_start(new Date(end)).valueOf()) {
        label += " - " + scheduler.templates.day_date(end);

        if (dateTimeLabel || scheduler.date.day_start(new Date(end)).valueOf() != end.valueOf()) {
          label += " " + scheduler.templates.hour_scale(end);
        }
      }

      if (section) {
        if (scheduler.matrix && scheduler.matrix[mode]) {
          label += ", " + scheduler.templates[mode + "_scale_label"](section.key, section.label, section);
        } else if (scheduler._props && scheduler._props[mode]) {
          label += ", " + scheduler.templates[mode + "_scale_text"](section.key, section.label, section);
        }
      }

      for (var i = 0; i < divs.length; i++) {
        scheduler._waiAria.setAttributes(divs[i], {
          "aria-label": label,
          "aria-live": "polite"
        });
      }
    },
    renderWeekAgendaMarker: function renderWeekAgendaMarker(start_date, end_date) {
      var divs = scheduler.$container.querySelectorAll(".dhx_wa_day_cont .dhx_wa_scale_bar");
      var currDate = scheduler.date.week_start(new Date(scheduler.getState().min_date));
      var index = -1;
      var markerDate = scheduler.date.day_start(new Date(start_date));

      for (var i = 0; i < divs.length; i++) {
        index++;

        if (scheduler.date.day_start(new Date(currDate)).valueOf() == markerDate.valueOf()) {
          break;
        } else {
          currDate = scheduler.date.add(currDate, 1, "day");
        }
      }

      if (index != -1) return this._wrapDiv(divs[index]);
      return [];
    },
    _wrapDiv: function _wrapDiv(cell) {
      var marker = this.createElement();
      marker.style.top = cell.offsetTop + "px";
      marker.style.left = cell.offsetLeft + "px";
      marker.style.width = cell.offsetWidth + "px";
      marker.style.height = cell.offsetHeight + "px";
      cell.appendChild(marker);
      return [marker];
    },
    renderYearMarker: function renderYearMarker(start_date, end_date) {
      var cell = scheduler._get_year_cell(start_date);

      cell.style.position = "relative";
      var marker = this.createElement();
      marker.style.top = "0px";
      marker.style.left = "0px";
      marker.style.width = "100%";
      marker.style.height = "100%";
      cell.appendChild(marker);
      return [marker];
    },
    renderAgendaMarker: function renderAgendaMarker(start_date, end_date) {
      var block = this.createElement();
      block.style.height = "1px";
      block.style.width = "100%";
      block.style.opacity = 1;
      block.style.top = "0px";
      block.style.left = "0px";
      scheduler.$container.querySelector(".dhx_cal_data").appendChild(block);
      return [block];
    },
    renderTimelineMarker: function renderTimelineMarker(start_date, end_date, section) {
      var view_opts = scheduler._lame_copy({}, scheduler.matrix[scheduler._mode]);

      var areas = view_opts._scales; //timespans must always use actual position, not rounded

      view_opts.round_position = false;
      var blocks = [];
      var min_date = start_date ? new Date(start_date) : scheduler._min_date;
      var max_date = end_date ? new Date(end_date) : scheduler._max_date;
      if (min_date.valueOf() < scheduler._min_date.valueOf()) min_date = new Date(scheduler._min_date);
      if (max_date.valueOf() > scheduler._max_date.valueOf()) max_date = new Date(scheduler._max_date);
      if (!view_opts._trace_x) return blocks;

      for (var i = 0; i < view_opts._trace_x.length; i++) {
        if (scheduler._is_column_visible(view_opts._trace_x[i])) break;
      }

      if (i == view_opts._trace_x.length) return blocks;
      var area = areas[section];
      if (!(min_date < end_date && max_date > start_date)) return blocks;
      var block = this.createElement();
      var start_pos = scheduler._timeline_getX({
        start_date: start_date
      }, false, view_opts) - 1;
      var end_pos = scheduler._timeline_getX({
        start_date: end_date
      }, false, view_opts) - 1;
      var height = view_opts._section_height[section] - 1 || view_opts.dy - 1;
      var top = 0;

      if (scheduler._isRender('cell')) {
        top = area.offsetTop;
        start_pos += view_opts.dx;
        end_pos += view_opts.dx;
        area = scheduler.$container.querySelector(".dhx_cal_data");
      } else {}

      var width = Math.max(1, end_pos - start_pos - 1);
      block.style.cssText = "height: " + height + "px; left: " + start_pos + "px; width: " + width + "px; top: " + top + "px;";
      area.appendChild(block);
      blocks.push(block);
      return blocks;
    },
    renderMonthCell: function renderMonthCell(date) {
      var cells = scheduler.$container.querySelectorAll(".dhx_month_head");
      var divs = [];

      for (var i = 0; i < cells.length; i++) {
        divs.push(cells[i].parentNode);
      }

      var firstDate = scheduler.date.week_start(new Date(scheduler.getState().min_date));
      var index = -1;
      var weekNumber = 0;
      var dayIndex = -1;
      var currDate = firstDate;
      var markerDate = scheduler.date.day_start(new Date(date));

      for (var i = 0; i < divs.length; i++) {
        index++;

        if (dayIndex == 6) {
          weekNumber++;
          dayIndex = 0;
        } else {
          dayIndex++;
        }

        if (scheduler.date.day_start(new Date(currDate)).valueOf() == markerDate.valueOf()) {
          break;
        } else {
          currDate = scheduler.date.add(currDate, 1, "day");
        }
      }

      if (index == -1) {
        return [];
      }

      var left = scheduler._colsS[dayIndex];
      var top = scheduler._colsS.heights[weekNumber];
      var div = this.createElement();
      div.style.top = top + "px";
      div.style.left = left + "px";
      div.style.width = scheduler._cols[dayIndex] + "px";
      div.style.height = (scheduler._colsS.heights[weekNumber + 1] - top || scheduler._colsS.height) + "px";
      var container = scheduler.$container.querySelector(".dhx_cal_data");
      var datatable = container.querySelector("table");

      if (datatable.nextSibling) {
        container.insertBefore(div, datatable.nextSibling);
      } else {
        container.appendChild(div);
      }

      return div;
    },
    renderMonthMarker: function renderMonthMarker(start_date, end_date) {
      var res = [];
      var currentDate = start_date;

      while (currentDate.valueOf() < end_date.valueOf()) {
        res.push(this.renderMonthCell(currentDate));
        currentDate = scheduler.date.add(currentDate, 1, "day");
      }

      return res;
    },
    renderVerticalMarker: function renderVerticalMarker(start_date, end_date, section) {
      var index = scheduler.locate_holder_day(start_date);
      var divs = [];
      var area = null;
      var c = scheduler.config;
      if (scheduler._ignores[index]) return divs;

      if (scheduler._props && scheduler._props[scheduler._mode] && section) {
        var view = scheduler._props[scheduler._mode];
        index = view.order[section];
        var inner_index = view.order[section];

        if (!(view.days > 1)) {
          index = inner_index;

          if (view.size && index > view.position + view.size) {
            index = 0;
          }
        } else {
          //var units_l = view.size || view.options.length;
          index = scheduler.locate_holder_day(start_date) + inner_index; //index = index*units_l + inner_index;
        }
      }

      area = scheduler.locate_holder(index);

      if (!area || area.querySelector(".dhx_scale_hour")) {
        // hour scale instead of date column
        return document.createElement("div");
      }

      var start = Math.max(start_date.getHours() * 60 + start_date.getMinutes(), c.first_hour * 60);
      var end = Math.min(end_date.getHours() * 60 + end_date.getMinutes(), c.last_hour * 60);

      if (!end && scheduler.date.day_start(new Date(end_date)).valueOf() > scheduler.date.day_start(new Date(start_date)).valueOf()) {
        end = c.last_hour * 60;
      }

      if (end <= start) {
        return [];
      }

      var block = this.createElement(); // +1 for working with section which really takes up whole height (as % would be == 0)

      var all_hours_height = scheduler.config.hour_size_px * c.last_hour + 1;
      var hour_ms = 60 * 60 * 1000;
      block.style.top = Math.round((start * 60 * 1000 - scheduler.config.first_hour * hour_ms) * scheduler.config.hour_size_px / hour_ms) % all_hours_height + "px";
      block.style.lineHeight = block.style.height = Math.max(Math.round((end - start) * 60 * 1000 * scheduler.config.hour_size_px / hour_ms) % all_hours_height, 1) + "px";
      block.style.width = "100%";
      area.appendChild(block);
      divs.push(block);
      return divs[0];
    }
  };
});

/***/ }),

/***/ "./sources/ext/keyboard_navigation/minical_handlers.js":
/*!*************************************************************!*\
  !*** ./sources/ext/keyboard_navigation/minical_handlers.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.$keyboardNavigation._minicalendars = [];

  scheduler.$keyboardNavigation.isMinical = function (node) {
    var minicalendars = scheduler.$keyboardNavigation._minicalendars;

    for (var i = 0; i < minicalendars.length; i++) {
      if (this.isChildOf(node, minicalendars[i])) return true;
    }

    return false;
  };

  scheduler.$keyboardNavigation.isChildOf = function (child, parent) {
    while (child && child !== parent) {
      child = child.parentNode;
    }

    return !!(child === parent);
  };

  scheduler.$keyboardNavigation.patchMinicalendar = function () {
    var dispatcher = scheduler.$keyboardNavigation.dispatcher;

    function focusMinical(e) {
      var target = e.target;
      dispatcher.enable();
      dispatcher.setActiveNode(new scheduler.$keyboardNavigation.MinicalButton(target, 0));
    }

    function minicalClick(e) {
      var target = e.target || e.srcElement;
      var prev = scheduler.utils.dom.locateCss(e, "dhx_cal_prev_button", false);
      var next = scheduler.utils.dom.locateCss(e, "dhx_cal_next_button", false);
      var cell = scheduler.utils.dom.locateCss(e, "dhx_year_body", false);
      var rowIndex = 0;
      var cellIndex = 0;

      if (cell) {
        var tr;
        var td;
        var current = target;

        while (current && current.tagName.toLowerCase() != "td") {
          current = current.parentNode;
        }

        if (current) {
          td = current;
          tr = td.parentNode;
        }

        if (tr && td) {
          var rows = tr.parentNode.querySelectorAll("tr");

          for (var i = 0; i < rows.length; i++) {
            if (rows[i] == tr) {
              rowIndex = i;
              break;
            }
          }

          var cells = tr.querySelectorAll("td");

          for (var i = 0; i < cells.length; i++) {
            if (cells[i] == td) {
              cellIndex = i;
              break;
            }
          }
        }
      }

      var root = e.currentTarget;
      dispatcher.delay(function () {
        if (prev || next || cell) {
          var element;

          if (prev) {
            element = new scheduler.$keyboardNavigation.MinicalButton(root, 0);
            dispatcher.setActiveNode(new scheduler.$keyboardNavigation.MinicalButton(root, 0));
          } else if (next) {
            element = new scheduler.$keyboardNavigation.MinicalButton(root, 1);
          } else if (cell) {
            element = new scheduler.$keyboardNavigation.MinicalCell(root, rowIndex, cellIndex);
          }

          if (element) {
            dispatcher.enable();

            if (element.isValid()) {
              dispatcher.activeNode = null;
              dispatcher.setActiveNode(element);
            }
          }
        }
      });
    }

    if (scheduler.renderCalendar) {
      var renderMinical = scheduler.renderCalendar;

      scheduler.renderCalendar = function () {
        var cal = renderMinical.apply(this, arguments);
        var minicalendars = scheduler.$keyboardNavigation._minicalendars;
        scheduler.eventRemove(cal, "click", minicalClick);
        scheduler.event(cal, "click", minicalClick);
        scheduler.eventRemove(cal, "focus", focusMinical);
        scheduler.event(cal, "focus", focusMinical);
        var added = false;

        for (var i = 0; i < minicalendars.length; i++) {
          if (minicalendars[i] == cal) {
            added = true;
            break;
          }
        }

        if (!added) minicalendars.push(cal);

        if (dispatcher.isEnabled()) {
          var node = dispatcher.getActiveNode();

          if (node && node.container == cal) {
            dispatcher.focusNode(node);
          } else {
            cal.setAttribute("tabindex", "0");
          }
        } else {
          cal.setAttribute("tabindex", "0");
        }

        return cal;
      };
    }

    if (scheduler.destroyCalendar) {
      var destroyMinical = scheduler.destroyCalendar;

      scheduler.destroyCalendar = function (cal, force) {
        cal = cal || (scheduler._def_count ? scheduler._def_count.firstChild : null);
        var res = destroyMinical.apply(this, arguments);

        if (!cal || !cal.parentNode) {
          var minicalendars = scheduler.$keyboardNavigation._minicalendars;

          for (var i = 0; i < minicalendars.length; i++) {
            if (minicalendars[i] == cal) {
              scheduler.eventRemove(minicalendars[i], "focus", focusMinical);
              minicalendars.splice(i, 1);
              i--;
            }
          }
        }

        return res;
      };
    }
  };
});

/***/ }),

/***/ "./sources/ext/keyboard_navigation/modals.js":
/*!***************************************************!*\
  !*** ./sources/ext/keyboard_navigation/modals.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  (function () {
    var modalsStack = [];

    function isModal() {
      return !!modalsStack.length;
    }

    function isChildOf(child, parent) {
      while (child && child != parent) {
        child = child.parentNode;
      }

      return !!(child == parent);
    }

    function afterPopup(box) {
      setTimeout(function () {
        if (!isModal() && !isChildOf(document.activeElement, scheduler.$container)) {
          scheduler.focus();
        }
      }, 1);
    }

    function startModal(box) {
      scheduler.eventRemove(box, "keydown", trapFocus);
      scheduler.event(box, "keydown", trapFocus);
      modalsStack.push(box); //scheduler.$keyboardNavigation.dispatcher.disable();
    }

    function endModal() {
      var box = modalsStack.pop();

      if (box) {
        scheduler.eventRemove(box, "keydown", trapFocus);
      }

      afterPopup(box);
    }

    function isTopModal(box) {
      //	if(dhtmlx._modalsStack.length){
      //		return box == dhtmlx._modalsStack[dhtmlx._modalsStack.length - 1];
      //	}else{
      return box == modalsStack[modalsStack.length - 1]; //	}
    }

    function trapFocus(event) {
      var event = event || window.event;
      var target = event.currentTarget;
      if (!isTopModal(target)) return;
      scheduler.$keyboardNavigation.trapFocus(target, event);
    }

    function traceLightbox() {
      startModal(scheduler.getLightbox());
    }

    scheduler.attachEvent("onLightbox", traceLightbox);
    scheduler.attachEvent("onAfterLightbox", endModal);
    scheduler.attachEvent("onAfterQuickInfo", function () {
      afterPopup();
    });

    if (!scheduler._keyNavMessagePopup) {
      scheduler._keyNavMessagePopup = true;
      var focusElement = null;
      var backupFocus = null;
      var _modalsStack = [];
      scheduler.attachEvent("onMessagePopup", function (box) {
        focusElement = document.activeElement;
        backupFocus = focusElement;

        while (backupFocus && scheduler._getClassName(backupFocus).indexOf("dhx_cal_data") < 0) {
          backupFocus = backupFocus.parentNode;
        }

        if (backupFocus) {
          backupFocus = backupFocus.parentNode;
        }

        scheduler.eventRemove(box, "keydown", trapFocus);
        scheduler.event(box, "keydown", trapFocus);

        _modalsStack.push(box);
      });
      scheduler.attachEvent("onAfterMessagePopup", function () {
        var box = _modalsStack.pop();

        if (box) {
          scheduler.eventRemove(box, "keydown", trapFocus);
        }

        setTimeout(function () {
          var currentTarget = document.activeElement;

          while (currentTarget && scheduler._getClassName(currentTarget).indexOf("dhx_cal_light") < 0) {
            currentTarget = currentTarget.parentNode;
          }

          if (currentTarget) return;

          if (focusElement && focusElement.parentNode) {
            focusElement.focus();
          } else if (backupFocus && backupFocus.parentNode) {
            backupFocus.focus();
          }

          focusElement = null;
          backupFocus = null;
        }, 1);
      });
    }

    scheduler.$keyboardNavigation.isModal = isModal;
  })();
});

/***/ }),

/***/ "./sources/ext/keyboard_navigation/scheduler_handlers.js":
/*!***************************************************************!*\
  !*** ./sources/ext/keyboard_navigation/scheduler_handlers.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.$keyboardNavigation.attachSchedulerHandlers = function () {
    var dispatcher = scheduler.$keyboardNavigation.dispatcher;

    var keyDownHandler = function keyDownHandler(e) {
      if (!scheduler.config.key_nav) return;
      return dispatcher.keyDownHandler(e);
    };

    var focusHandler = function focusHandler() {
      dispatcher.keepScrollPosition(function () {
        dispatcher.focusGlobalNode();
      });
    };

    var waitCall;
    scheduler.attachEvent("onDataRender", function () {
      if (!scheduler.config.key_nav) return;
      if (!(dispatcher.isEnabled() && !scheduler.getState().editor_id)) return;
      clearTimeout(waitCall);
      waitCall = setTimeout(function () {
        if (!dispatcher.isEnabled()) dispatcher.enable();
        reFocusActiveNode();
      });
    });

    var reFocusActiveNode = function reFocusActiveNode() {
      if (!dispatcher.isEnabled()) return;
      var activeNode = dispatcher.getActiveNode();
      if (!activeNode) return;

      if (!activeNode.isValid()) {
        activeNode = activeNode.fallback();
      }

      if (!activeNode || activeNode instanceof scheduler.$keyboardNavigation.MinicalButton || activeNode instanceof scheduler.$keyboardNavigation.MinicalCell) return;
      dispatcher.keepScrollPosition(function () {
        activeNode.focus(true);
      });
    };

    scheduler.attachEvent("onSchedulerReady", function () {
      var container = scheduler.$container;
      scheduler.eventRemove(document, "keydown", keyDownHandler);
      scheduler.eventRemove(container, "mousedown", mousedownHandler);
      scheduler.eventRemove(container, "focus", focusHandler);

      if (scheduler.config.key_nav) {
        scheduler.event(document, "keydown", keyDownHandler);
        scheduler.event(container, "mousedown", mousedownHandler);
        scheduler.event(container, "focus", focusHandler);
        container.setAttribute("tabindex", "0");
      } else {
        container.removeAttribute("tabindex");
      }
    });

    function mousedownHandler(e) {
      if (!scheduler.config.key_nav) return true;
      var dataAreaClick = scheduler.$keyboardNavigation.isChildOf(e.target || e.srcElement, scheduler.$container.querySelector(".dhx_cal_data"));
      var pos = scheduler.getActionData(e);
      var focusNode;

      if (scheduler._locate_event(e.target || e.srcElement)) {
        focusNode = new scheduler.$keyboardNavigation.Event(scheduler._locate_event(e.target || e.srcElement));
      } else if (dataAreaClick) {
        focusNode = new scheduler.$keyboardNavigation.TimeSlot();

        if (pos.date && dataAreaClick) {
          focusNode = focusNode.nextSlot(new scheduler.$keyboardNavigation.TimeSlot(pos.date, null, pos.section));
        }
      }

      if (focusNode) {
        if (!dispatcher.isEnabled()) {
          dispatcher.activeNode = focusNode;
        } else {
          if (pos.date && dataAreaClick) {
            dispatcher.delay(function () {
              dispatcher.setActiveNode(focusNode);
            });
          }
        }
      }
    }

    function focusEvent(evNode) {
      if (!scheduler.config.key_nav) return;
      if (!dispatcher.isEnabled()) return;
      var prevState = evNode;
      var focusNode = new scheduler.$keyboardNavigation.Event(prevState.eventId);

      if (!focusNode.isValid()) {
        var lastStart = focusNode.start || prevState.start;
        var lastEnd = focusNode.end || prevState.end;
        var lastSection = focusNode.section || prevState.section;
        focusNode = new scheduler.$keyboardNavigation.TimeSlot(lastStart, lastEnd, lastSection);

        if (!focusNode.isValid()) {
          focusNode = new scheduler.$keyboardNavigation.TimeSlot();
        }
      }

      dispatcher.setActiveNode(focusNode);
      var node = dispatcher.getActiveNode();

      if (node && node.getNode && document.activeElement != node.getNode()) {
        dispatcher.focusNode(dispatcher.getActiveNode());
      }
    }

    var updateEvent = scheduler.updateEvent;

    scheduler.updateEvent = function (id) {
      var res = updateEvent.apply(this, arguments);

      if (scheduler.config.key_nav && dispatcher.isEnabled()) {
        if (scheduler.getState().select_id == id) {
          var element = new scheduler.$keyboardNavigation.Event(id);

          if (!scheduler.getState().lightbox_id) {
            focusEvent(element);
          }
        }
      }

      return res;
    };

    scheduler.attachEvent("onEventDeleted", function (id) {
      if (!scheduler.config.key_nav) return true;

      if (dispatcher.isEnabled()) {
        var activeNode = dispatcher.getActiveNode();

        if (activeNode.eventId == id) {
          dispatcher.setActiveNode(new scheduler.$keyboardNavigation.TimeSlot());
        }
      }

      return true;
    });
    scheduler.attachEvent("onClearAll", function () {
      if (!scheduler.config.key_nav) return true;

      if (dispatcher.isEnabled()) {
        if (dispatcher.getActiveNode() instanceof scheduler.$keyboardNavigation.Event) {
          dispatcher.setActiveNode(new scheduler.$keyboardNavigation.TimeSlot());
        }
      }
    });
  };
});

/***/ }),

/***/ "./sources/ext/layer.js":
/*!******************************!*\
  !*** ./sources/ext/layer.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.attachEvent("onTemplatesReady", function () {
    this.layers.sort(function (a, b) {
      return a.zIndex - b.zIndex;
    });

    scheduler._dp_init = function (dp) {
      dp._methods = ["_set_event_text_style", "", "changeEventId", "deleteEvent"];
      this.attachEvent("onEventAdded", function (id) {
        if (!this._loading && this.validId(id) && this.getEvent(id) && this.getEvent(id).layer == dp.layer) dp.setUpdated(id, true, "inserted");
      });
      this.attachEvent("onBeforeEventDelete", function (id) {
        if (this.getEvent(id) && this.getEvent(id).layer == dp.layer) {
          if (!this.validId(id)) return;
          var z = dp.getState(id);

          if (z == "inserted" || this._new_event) {
            dp.setUpdated(id, false);
            return true;
          }

          if (z == "deleted") return false;
          if (z == "true_deleted") return true;
          dp.setUpdated(id, true, "deleted");
          return false;
        } else return true;
      });
      this.attachEvent("onEventChanged", function (id) {
        if (!this._loading && this.validId(id) && this.getEvent(id) && this.getEvent(id).layer == dp.layer) dp.setUpdated(id, true, "updated");
      });

      dp._getRowData = function (id, pref) {
        var ev = this.obj.getEvent(id);
        var data = {};

        for (var a in ev) {
          if (a.indexOf("_") === 0) continue;
          if (ev[a] && ev[a].getUTCFullYear) //not very good, but will work
            data[a] = this.obj._helpers.formatDate(ev[a]);else data[a] = ev[a];
        }

        return data;
      };

      dp._clearUpdateFlag = function () {};

      dp.attachEvent("insertCallback", scheduler._update_callback);
      dp.attachEvent("updateCallback", scheduler._update_callback);
      dp.attachEvent("deleteCallback", function (upd, id) {
        this.obj.setUserData(id, this.action_param, "true_deleted");
        this.obj.deleteEvent(id);
      });
    };

    (function () {
      var _cloneObj = function _cloneObj(obj) {
        if (obj === null || _typeof(obj) != 'object') return obj;
        var temp = new obj.constructor();

        for (var key in obj) {
          temp[key] = _cloneObj(obj[key]);
        }

        return temp;
      };

      scheduler._dataprocessors = [];
      scheduler._layers_zindex = {};

      for (var i = 0; i < scheduler.layers.length; i++) {
        scheduler.config['lightbox_' + scheduler.layers[i].name] = {};
        scheduler.config['lightbox_' + scheduler.layers[i].name].sections = _cloneObj(scheduler.config.lightbox.sections);
        scheduler._layers_zindex[scheduler.layers[i].name] = scheduler.config.initial_layer_zindex || 5 + i * 3;

        if (scheduler.layers[i].url) {
          var dp = scheduler.createDataProcessor({
            url: scheduler.layers[i].url
          });
          dp.layer = scheduler.layers[i].name;

          scheduler._dataprocessors.push(dp);

          scheduler._dataprocessors[i].init(scheduler);
        }

        if (scheduler.layers[i].isDefault) scheduler.defaultLayer = scheduler.layers[i].name;
      }
    })();

    scheduler.showLayer = function (tlayer) {
      this.toggleLayer(tlayer, true);
    };

    scheduler.hideLayer = function (tlayer) {
      this.toggleLayer(tlayer, false);
    };

    scheduler.toggleLayer = function (tlayer, visible) {
      // visible is optional
      var layer = this.getLayer(tlayer);
      if (typeof visible != 'undefined') layer.visible = !!visible;else layer.visible = !layer.visible;
      this.setCurrentView(this._date, this._mode);
    };

    scheduler.getLayer = function (tlayer) {
      // either string with layer name or event with layer property
      var layer, layer_name;
      if (typeof tlayer == 'string') layer_name = tlayer;
      if (_typeof(tlayer) == 'object') layer_name = tlayer.layer;

      for (var i = 0; i < scheduler.layers.length; i++) {
        if (scheduler.layers[i].name == layer_name) layer = scheduler.layers[i];
      }

      return layer;
    };

    scheduler.attachEvent("onBeforeLightbox", function (event_id) {
      var ev = this.getEvent(event_id);
      this.config.lightbox.sections = this.config['lightbox_' + ev.layer].sections;
      scheduler.resetLightbox();
      return true;
    });
    scheduler.attachEvent("onClick", function (event_id, native_event_object) {
      var ev = scheduler.getEvent(event_id);
      return !scheduler.getLayer(ev.layer).noMenu;
    });
    scheduler.attachEvent('onEventCollision', function (ev, evs) {
      var layer = this.getLayer(ev);
      if (!layer.checkCollision) return false;
      var count = 0;

      for (var i = 0; i < evs.length; i++) {
        if (evs[i].layer == layer.name && evs[i].id != ev.id) count++;
      }

      return count >= scheduler.config.collision_limit;
    });

    scheduler.addEvent = function (start_date, end_date, text, id, extra_data) {
      var ev = start_date;

      if (arguments.length != 1) {
        ev = extra_data || {};
        ev.start_date = start_date;
        ev.end_date = end_date;
        ev.text = text;
        ev.id = id;
        ev.layer = this.defaultLayer;
      }

      ev.id = ev.id || scheduler.uid();
      ev.text = ev.text || "";
      if (typeof ev.start_date == "string") ev.start_date = this.templates.api_date(ev.start_date);
      if (typeof ev.end_date == "string") ev.end_date = this.templates.api_date(ev.end_date);
      ev._timed = this.isOneDayEvent(ev);
      var is_new = !this._events[ev.id];
      this._events[ev.id] = ev;
      this.event_updated(ev);
      if (!this._loading) this.callEvent(is_new ? "onEventAdded" : "onEventChanged", [ev.id, ev]);
    };

    this._evs_layer = {};

    for (var i = 0; i < this.layers.length; i++) {
      // array in object for each layer
      this._evs_layer[this.layers[i].name] = [];
    }

    scheduler.addEventNow = function (start, end, e) {
      var base = {};

      if (_typeof(start) == "object") {
        base = start;
        start = null;
      }

      var d = (this.config.event_duration || this.config.time_step) * 60000;
      if (!start) start = Math.round(scheduler._currentDate().valueOf() / d) * d;
      var start_date = new Date(start);

      if (!end) {
        var start_hour = this.config.first_hour;

        if (start_hour > start_date.getHours()) {
          start_date.setHours(start_hour);
          start = start_date.valueOf();
        }

        end = start + d;
      }

      base.start_date = base.start_date || start_date;
      base.end_date = base.end_date || new Date(end);
      base.text = base.text || this.locale.labels.new_event;
      base.id = this._drag_id = this.uid();
      base.layer = this.defaultLayer;
      this._drag_mode = "new-size";
      this._loading = true;
      this.addEvent(base);
      this.callEvent("onEventCreated", [this._drag_id, e]);
      this._loading = false;
      this._drag_event = {}; //dummy , to trigger correct event updating logic

      this._on_mouse_up(e);
    };

    scheduler._t_render_view_data = function (events) {
      // helper
      if (this.config.multi_day && !this._table_view) {
        var tvs = [];
        var tvd = [];

        for (var k = 0; k < events.length; k++) {
          if (events[k]._timed) tvs.push(events[k]);else tvd.push(events[k]);
        }

        this._table_view = true;
        this.render_data(tvd);
        this._table_view = false;
        this.render_data(tvs);
      } else this.render_data(events);
    };

    scheduler.render_view_data = function () {
      if (this._not_render) {
        this._render_wait = true;
        return;
      }

      this._render_wait = false;
      this.clear_view();
      this._evs_layer = {};

      for (var i = 0; i < this.layers.length; i++) {
        // array in object for each layer
        this._evs_layer[this.layers[i].name] = [];
      }

      var evs = this.get_visible_events();

      for (var i = 0; i < evs.length; i++) {
        // filling layer arrays with events
        if (this._evs_layer[evs[i].layer]) this._evs_layer[evs[i].layer].push(evs[i]);
      }

      if (this._mode == 'month') {
        // old logic is used
        var tevs = [];

        for (var i = 0; i < this.layers.length; i++) {
          if (this.layers[i].visible) tevs = tevs.concat(this._evs_layer[this.layers[i].name]);
        }

        this._t_render_view_data(tevs);
      } else {
        // week, day; should use new logic
        for (var i = 0; i < this.layers.length; i++) {
          if (this.layers[i].visible) {
            var evs_layer = this._evs_layer[this.layers[i].name];

            this._t_render_view_data(evs_layer);
          }
        }
      }
    };

    scheduler._render_v_bar = function (ev, x, y, w, h, style, contentA, contentB, bottom) {
      var id = ev.id;
      if (contentA.indexOf('<div class=') == -1) contentA = scheduler.templates['event_header_' + ev.layer] ? scheduler.templates['event_header_' + ev.layer](ev.start_date, ev.end_date, ev) : contentA;
      if (contentB.indexOf('<div class=') == -1) contentB = scheduler.templates['event_text_' + ev.layer] ? scheduler.templates['event_text_' + ev.layer](ev.start_date, ev.end_date, ev) : contentB;
      var d = document.createElement("div");
      var cs = "dhx_cal_event";
      var cse = scheduler.templates['event_class_' + ev.layer] ? scheduler.templates['event_class_' + ev.layer](ev.start_date, ev.end_date, ev) : scheduler.templates.event_class(ev.start_date, ev.end_date, ev);
      if (cse) cs = cs + " " + cse;

      var borderBox = scheduler._border_box_events();

      var borderBoxWidth = w - 2;
      var boxWidth = borderBox ? borderBoxWidth : w - 4,
          headerWidth = borderBox ? borderBoxWidth : w - 6,
          bodyWidth = borderBox ? borderBoxWidth : w - (this._quirks ? 4 : 14),
          footerWidth = borderBox ? borderBoxWidth - 2 : w - 8;
      var bodyHeight = borderBox ? h - this.xy.event_header_height : h - (this._quirks ? 20 : 30) + 1;
      var html = '<div event_id="' + id + '" ' + scheduler.config.event_attribute + '="' + id + '" class="' + cs + '" style="position:absolute; top:' + y + 'px; left:' + x + 'px; width:' + boxWidth + 'px; height:' + h + 'px;' + (style || "") + '">';
      html += '<div class="dhx_header" style=" width:' + headerWidth + 'px;" >&nbsp;</div>';
      html += '<div class="dhx_title">' + contentA + '</div>';
      html += '<div class="dhx_body" style=" width:' + bodyWidth + 'px; height:' + bodyHeight + 'px;">' + contentB + '</div>';
      html += '<div class="dhx_footer" style=" width:' + footerWidth + 'px;' + (bottom ? ' margin-top:-1px;' : '') + '" ></div></div>';
      d.innerHTML = html;
      d.style.zIndex = 100;
      return d.firstChild;
    };

    scheduler.render_event_bar = function (ev) {
      var parent = this._els["dhx_cal_data"][0];
      var x = this._colsS[ev._sday];
      var x2 = this._colsS[ev._eday];
      if (x2 == x) x2 = this._colsS[ev._eday + 1];
      var hb = this.xy.bar_height;
      var y = this._colsS.heights[ev._sweek] + (this._colsS.height ? this.xy.month_scale_height + 2 : 2) + ev._sorder * hb;
      var d = document.createElement("div");
      var cs = ev._timed ? "dhx_cal_event_clear" : "dhx_cal_event_line";
      var cse = scheduler.templates['event_class_' + ev.layer] ? scheduler.templates['event_class_' + ev.layer](ev.start_date, ev.end_date, ev) : scheduler.templates.event_class(ev.start_date, ev.end_date, ev);
      if (cse) cs = cs + " " + cse;
      var html = '<div event_id="' + ev.id + '" ' + this.config.event_attribute + '="' + ev.id + '" class="' + cs + '" style="position:absolute; top:' + y + 'px; left:' + x + 'px; width:' + (x2 - x - 15) + 'px;' + (ev._text_style || "") + '">';
      if (ev._timed) html += scheduler.templates['event_bar_date_' + ev.layer] ? scheduler.templates['event_bar_date_' + ev.layer](ev.start_date, ev.end_date, ev) : scheduler.templates.event_bar_date(ev.start_date, ev.end_date, ev);
      html += scheduler.templates['event_bar_text_' + ev.layer] ? scheduler.templates['event_bar_text_' + ev.layer](ev.start_date, ev.end_date, ev) : scheduler.templates.event_bar_text(ev.start_date, ev.end_date, ev) + '</div>)';
      html += '</div>';
      d.innerHTML = html;

      this._rendered.push(d.firstChild);

      parent.appendChild(d.firstChild);
    };

    scheduler.render_event = function (ev) {
      var menu = scheduler.xy.menu_width;
      if (scheduler.getLayer(ev.layer).noMenu) menu = 0;
      if (ev._sday < 0) return; //can occur in case of recurring event during time shift

      var parent = scheduler.locate_holder(ev._sday);
      if (!parent) return; //attempt to render non-visible event

      var sm = ev.start_date.getHours() * 60 + ev.start_date.getMinutes();
      var em = ev.end_date.getHours() * 60 + ev.end_date.getMinutes() || scheduler.config.last_hour * 60;
      var top = Math.round((sm * 60 * 1000 - this.config.first_hour * 60 * 60 * 1000) * this.config.hour_size_px / (60 * 60 * 1000)) % (this.config.hour_size_px * 24) + 1; //42px/hour

      var height = Math.max(scheduler.xy.min_event_height, (em - sm) * this.config.hour_size_px / 60) + 1; //42px/hour
      //var height = Math.max(25,Math.round((ev.end_date.valueOf()-ev.start_date.valueOf())*(this.config.hour_size_px+(this._quirks?1:0))/(60*60*1000))); //42px/hour

      var width = Math.floor((parent.clientWidth - menu) / ev._count);
      var left = ev._sorder * width + 1;
      if (!ev._inner) width = width * (ev._count - ev._sorder);

      var d = this._render_v_bar(ev.id, menu + left, top, width, height, ev._text_style, scheduler.templates.event_header(ev.start_date, ev.end_date, ev), scheduler.templates.event_text(ev.start_date, ev.end_date, ev));

      this._rendered.push(d);

      parent.appendChild(d);
      left = left + parseInt(parent.style.left, 10) + menu;
      top += this._dy_shift; //corrupt top, to include possible multi-day shift

      d.style.zIndex = this._layers_zindex[ev.layer];

      if (this._edit_id == ev.id) {
        d.style.zIndex = parseInt(d.style.zIndex) + 1; //fix overlapping issue

        var new_zIndex = d.style.zIndex;
        width = Math.max(width - 4, scheduler.xy.editor_width);
        var d = document.createElement("div");
        d.setAttribute("event_id", ev.id); // for backward compatibility

        d.setAttribute(this.config.event_attribute, ev.id);
        this.set_xy(d, width, height - 20, left, top + 14);
        d.className = "dhx_cal_editor";
        d.style.zIndex = new_zIndex;
        var d2 = document.createElement("div");
        this.set_xy(d2, width - 6, height - 26);
        d2.style.cssText += ";margin:2px 2px 2px 2px;overflow:hidden;";
        d2.style.zIndex = new_zIndex;
        d.appendChild(d2);

        this._els["dhx_cal_data"][0].appendChild(d);

        this._rendered.push(d);

        d2.innerHTML = "<textarea class='dhx_cal_editor'>" + ev.text + "</textarea>";
        if (this._quirks7) d2.firstChild.style.height = height - 12 + "px"; //IEFIX

        this._editor = d2.firstChild;

        this._editor.addEventListener("keypress", function (e) {
          if (e.shiftKey) return true;
          var code = e.keyCode;
          if (code == scheduler.keys.edit_save) scheduler.editStop(true);
          if (code == scheduler.keys.edit_cancel) scheduler.editStop(false);
        });

        this._editor.addEventListener("selectstart", function (e) {
          e.cancelBubble = true;
          return true;
        });

        d2.firstChild.focus(); //IE and opera can add x-scroll during focusing

        this._els["dhx_cal_data"][0].scrollLeft = 0;
        d2.firstChild.select();
      }

      if (this._select_id == ev.id) {
        d.style.zIndex = parseInt(d.style.zIndex) + 1; //fix overlapping issue

        var icons = this.config["icons_" + (this._edit_id == ev.id ? "edit" : "select")];
        var icons_str = "";

        for (var i = 0; i < icons.length; i++) {
          icons_str += "<div class='dhx_menu_icon " + icons[i] + "' title='" + this.locale.labels[icons[i]] + "'></div>";
        }

        var obj = this._render_v_bar(ev.id, left - menu + 1, top, menu, icons.length * 20 + 26, "", "<div class='dhx_menu_head'></div>", icons_str, true);

        obj.style.left = left - menu + 1;
        obj.style.zIndex = d.style.zIndex;

        this._els["dhx_cal_data"][0].appendChild(obj);

        this._rendered.push(obj);
      }
    };

    scheduler.filter_agenda = function (id, event) {
      var layer = scheduler.getLayer(event.layer);
      return layer && layer.visible;
    };
  });
});

/***/ }),

/***/ "./sources/ext/limit.js":
/*!******************************!*\
  !*** ./sources/ext/limit.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.config.limit_start = null;
  scheduler.config.limit_end = null;
  scheduler.config.limit_view = false;
  scheduler.config.check_limits = true;
  scheduler.config.mark_now = true;
  scheduler.config.display_marked_timespans = true;
  scheduler.config.overwrite_marked_timespans = true;

  scheduler._temp_limit_scope = function () {
    var before = null;
    var dhx_time_block = "dhx_time_block";
    var default_timespan_type = "default";

    var fix_options = function fix_options(options, days, zones) {
      if (days instanceof Date && zones instanceof Date) {
        options.start_date = days;
        options.end_date = zones;
      } else {
        options.days = days;
        options.zones = zones;
      }

      return options;
    };

    var get_resulting_options = function get_resulting_options(days, zones, sections) {
      var options = _typeof(days) == "object" ? days : {
        days: days
      };
      options.type = dhx_time_block;
      options.css = "";

      if (zones) {
        if (sections) options.sections = sections;
        options = fix_options(options, days, zones);
      }

      return options;
    };

    scheduler.blockTime = function (days, zones, sections) {
      var options = get_resulting_options(days, zones, sections);
      return scheduler.addMarkedTimespan(options);
    };

    scheduler.unblockTime = function (days, zones, sections) {
      zones = zones || "fullday";
      var options = get_resulting_options(days, zones, sections);
      return scheduler.deleteMarkedTimespan(options);
    };

    scheduler.attachEvent("onBeforeViewChange", function (om, od, nm, nd) {
      function isBlocked(date, mode) {
        var limit_start = scheduler.config.limit_start,
            limit_end = scheduler.config.limit_end,
            date_end = scheduler.date.add(date, 1, mode);
        return date.valueOf() > limit_end.valueOf() || date_end <= limit_start.valueOf();
      }

      if (scheduler.config.limit_view) {
        nd = nd || od;
        nm = nm || om;

        if (isBlocked(nd, nm) && !(od.valueOf() == nd.valueOf())) {
          setTimeout(function () {
            var resetDate = !isBlocked(od, nm) ? od : scheduler.config.limit_start;
            scheduler.setCurrentView(!isBlocked(resetDate, nm) ? resetDate : null, nm);
          }, 1);
          return false;
        }
      }

      return true;
    });

    scheduler.checkInMarkedTimespan = function (ev, timespan_type, on_overlap) {
      timespan_type = timespan_type || default_timespan_type;
      var res = true;
      var temp_start_date = new Date(ev.start_date.valueOf());
      var temp_end_date = scheduler.date.add(temp_start_date, 1, "day");
      var timespans = scheduler._marked_timespans;

      for (; temp_start_date < ev.end_date; temp_start_date = scheduler.date.date_part(temp_end_date), temp_end_date = scheduler.date.add(temp_start_date, 1, "day")) {
        var day_value = +scheduler.date.date_part(new Date(temp_start_date)); // the first part of event not necessarily contains only date part

        var day_index = temp_start_date.getDay();
        var zones = getZones(ev, timespans, day_index, day_value, timespan_type);

        if (zones) {
          for (var i = 0; i < zones.length; i += 2) {
            // they may change for new event if it passes limit zone
            var eventStart = scheduler._get_zone_minutes(temp_start_date);

            var eventEnd = ev.end_date > temp_end_date || ev.end_date.getDate() != temp_start_date.getDate() ? 1440 : scheduler._get_zone_minutes(ev.end_date);
            var markerStart = zones[i];
            var markerEnd = zones[i + 1];

            if (markerStart < eventEnd && markerEnd > eventStart) {
              if (typeof on_overlap == "function") {
                //handler allows to cancel overlapping
                //actually needed only to keep default behavior of limits
                res = on_overlap(ev, eventStart, eventEnd, markerStart, markerEnd); //event object, event start/end minutes in 'zones' format, zone start/end minutes
              } else {
                res = false;
              }

              if (!res) break;
            }
          }
        }
      }

      return !res;
    };

    var blocker = scheduler.checkLimitViolation = function (event) {
      if (!event) return true;
      if (!scheduler.config.check_limits) return true;
      var s = scheduler;
      var c = s.config;
      var evs = [];

      if (event.rec_type) {
        var dates = scheduler.getRecDates(event);

        for (var i = 0; i < dates.length; i++) {
          var ev = scheduler._copy_event(event);

          scheduler._lame_copy(ev, dates[i]);

          evs.push(ev);
        }
      } else {
        evs = [event];
      }

      var complete_res = true;

      for (var p = 0; p < evs.length; p++) {
        var res = true;
        var ev = evs[p]; // Event could have old _timed property (e.g. we are creating event with DND on timeline view and crossed day)

        ev._timed = scheduler.isOneDayEvent(ev);
        res = c.limit_start && c.limit_end ? ev.start_date.valueOf() >= c.limit_start.valueOf() && ev.end_date.valueOf() <= c.limit_end.valueOf() : true;

        if (res) {
          res = !scheduler.checkInMarkedTimespan(ev, dhx_time_block, function (event, eventStart, eventEnd, markerStart, markerEnd) {
            //try crop event to allow placing
            var allow = true;

            if (eventStart <= markerEnd && eventStart >= markerStart) {
              if (markerEnd == 24 * 60 || eventEnd <= markerEnd) {
                allow = false;
              }

              if (event._timed && s._drag_id && s._drag_mode == "new-size") {
                event.start_date.setHours(0);
                event.start_date.setMinutes(markerEnd);
              } else {
                allow = false;
              }
            }

            if (eventEnd >= markerStart && eventEnd <= markerEnd || eventStart < markerStart && eventEnd > markerEnd) {
              if (event._timed && s._drag_id && s._drag_mode == "new-size") {
                event.end_date.setHours(0);
                event.end_date.setMinutes(markerStart);
              } else {
                allow = false;
              }
            }

            return allow;
          });
        }

        if (!res) {
          res = s.checkEvent("onLimitViolation") ? s.callEvent("onLimitViolation", [ev.id, ev]) : res;
        }

        complete_res = complete_res && res;
      }

      if (!complete_res) {
        s._drag_id = null;
        s._drag_mode = null;
      }

      return complete_res;
    };

    scheduler._get_blocked_zones = function (timespans, property, day_index, day_value, timespan_type) {
      var zones = [];

      if (timespans && timespans[property]) {
        var timeline_zones = timespans[property];

        var blocked_timeline_zones = this._get_relevant_blocked_zones(day_index, day_value, timeline_zones, timespan_type);

        for (var i = 0; i < blocked_timeline_zones.length; i++) {
          zones = this._add_timespan_zones(zones, blocked_timeline_zones[i].zones);
        }
      }

      return zones;
    };

    scheduler._get_relevant_blocked_zones = function (day_index, day_value, zones, timespan_type) {
      var resultZones;

      if (scheduler.config.overwrite_marked_timespans) {
        resultZones = zones[day_value] && zones[day_value][timespan_type] ? zones[day_value][timespan_type] : zones[day_index] && zones[day_index][timespan_type] ? zones[day_index][timespan_type] : [];
      } else {
        resultZones = [];

        if (zones[day_value] && zones[day_value][timespan_type]) {
          resultZones = resultZones.concat(zones[day_value][timespan_type]);
        }

        if (zones[day_index] && zones[day_index][timespan_type]) {
          resultZones = resultZones.concat(zones[day_index][timespan_type]);
        }
      }

      return resultZones;
    };

    function getZones(ev, timespans, day_index, day_value, timespan_type) {
      var s = scheduler; //containers for 'unit' and 'timeline' views, and related 'section_id' properties

      var zones = [];
      var containers = {
        '_props': 'map_to',
        'matrix': 'y_property'
      }; //check blocked sections in all units and timelines

      for (var container in containers) {
        var property = containers[container];

        if (s[container]) {
          for (var view in s[container]) {
            var view_config = s[container][view];
            var linker = view_config[property];
            if (!ev[linker]) continue;
            zones = s._add_timespan_zones(zones, scheduler._get_blocked_zones(timespans[view], ev[linker], day_index, day_value, timespan_type));
          }
        }
      } // now need to add day blocks


      zones = s._add_timespan_zones(zones, scheduler._get_blocked_zones(timespans, 'global', day_index, day_value, timespan_type));
      return zones;
    }

    scheduler.attachEvent("onMouseDown", function (classname) {
      return !(classname == dhx_time_block);
    });
    scheduler.attachEvent("onBeforeDrag", function (id) {
      if (!id) return true;
      return blocker(scheduler.getEvent(id));
    });
    scheduler.attachEvent("onClick", function (event_id, native_event_object) {
      return blocker(scheduler.getEvent(event_id));
    });
    scheduler.attachEvent("onBeforeLightbox", function (id) {
      var ev = scheduler.getEvent(id);
      before = [ev.start_date, ev.end_date];
      return blocker(ev);
    });
    scheduler.attachEvent("onEventSave", function (id, data, is_new_event) {
      //lightbox may not have 'time' section
      if (!(data.start_date && data.end_date)) {
        var ev = scheduler.getEvent(id);
        data.start_date = new Date(ev.start_date);
        data.end_date = new Date(ev.end_date);
      }

      if (data.rec_type) {
        //_roll_back_dates modifies start_date of recurring event, need to check limits after modification
        // use a copy to keep original event unchanged
        var data_copy = scheduler._lame_clone(data);

        scheduler._roll_back_dates(data_copy);

        return blocker(data_copy);
      }

      return blocker(data);
    });
    scheduler.attachEvent("onEventAdded", function (id) {
      if (!id) return true;
      var ev = scheduler.getEvent(id);

      if (!blocker(ev) && scheduler.config.limit_start && scheduler.config.limit_end) {
        //if newly created event is outside of limited time - crop it, leaving only allowed time
        if (ev.start_date < scheduler.config.limit_start) {
          ev.start_date = new Date(scheduler.config.limit_start);
        }

        if (ev.start_date.valueOf() >= scheduler.config.limit_end.valueOf()) {
          ev.start_date = this.date.add(scheduler.config.limit_end, -1, "day");
        }

        if (ev.end_date < scheduler.config.limit_start) {
          ev.end_date = new Date(scheduler.config.limit_start);
        }

        if (ev.end_date.valueOf() >= scheduler.config.limit_end.valueOf()) {
          ev.end_date = this.date.add(scheduler.config.limit_end, -1, "day");
        }

        if (ev.start_date.valueOf() >= ev.end_date.valueOf()) {
          ev.end_date = this.date.add(ev.start_date, this.config.event_duration || this.config.time_step, "minute");
        }

        ev._timed = this.isOneDayEvent(ev);
      }

      return true;
    });
    scheduler.attachEvent("onEventChanged", function (id) {
      if (!id) return true;
      var ev = scheduler.getEvent(id);

      if (!blocker(ev)) {
        if (!before) return false;
        ev.start_date = before[0];
        ev.end_date = before[1];
        ev._timed = this.isOneDayEvent(ev);
      }

      return true;
    });
    scheduler.attachEvent("onBeforeEventChanged", function (ev, native_object, is_new) {
      return blocker(ev);
    });
    scheduler.attachEvent("onBeforeEventCreated", function (ev) {
      // native event
      var start_date = scheduler.getActionData(ev).date;
      var event = {
        _timed: true,
        start_date: start_date,
        end_date: scheduler.date.add(start_date, scheduler.config.time_step, "minute")
      };
      return blocker(event);
    });
    scheduler.attachEvent("onViewChange", function () {
      scheduler._mark_now();
    });
    scheduler.attachEvent("onAfterSchedulerResize", function () {
      window.setTimeout(function () {
        scheduler._mark_now();
      }, 1);
      return true;
    });
    scheduler.attachEvent("onTemplatesReady", function () {
      scheduler._mark_now_timer = window.setInterval(function () {
        if (!scheduler._is_initialized()) return;

        scheduler._mark_now();
      }, 60000);
    });

    scheduler._mark_now = function (hide) {
      // day, week, units views
      var dhx_now_time = 'dhx_now_time';

      if (!this._els[dhx_now_time]) {
        this._els[dhx_now_time] = [];
      }

      var now = scheduler._currentDate();

      var cfg = this.config;

      scheduler._remove_mark_now(); // delete previous marks if they exist


      if (!hide && cfg.mark_now && now < this._max_date && now > this._min_date && now.getHours() >= cfg.first_hour && now.getHours() < cfg.last_hour) {
        var day_index = this.locate_holder_day(now);
        this._els[dhx_now_time] = scheduler._append_mark_now(day_index, now);
      }
    };

    scheduler._append_mark_now = function (day_index, now) {
      var dhx_now_time = 'dhx_now_time';

      var zone_start = scheduler._get_zone_minutes(now);

      var options = {
        zones: [zone_start, zone_start + 1],
        css: dhx_now_time,
        type: dhx_now_time
      };

      if (!this._table_view) {
        if (this._props && this._props[this._mode]) {
          // units view
          var start_index, end_index;
          var view = this._props[this._mode];
          var units_l = view.size || view.options.length;

          if (view.days > 1) {
            if (view.size && view.options.length) {
              day_index = (view.position + day_index) / view.options.length * view.size;
            }

            start_index = day_index;
            end_index = day_index + units_l;
          } else {
            start_index = 0;
            end_index = start_index + units_l;
          }

          var r_divs = [];

          for (var i = start_index; i < end_index; i++) {
            var t_day = i; // as each unit is actually considered +1 day

            options.days = t_day;

            var t_div = scheduler._render_marked_timespan(options, null, t_day)[0];

            r_divs.push(t_div);
          }

          return r_divs;
        } else {
          // day/week views
          options.days = day_index;
          return scheduler._render_marked_timespan(options, null, day_index);
        }
      } else {
        if (this._mode == "month") {
          options.days = +scheduler.date.date_part(now);
          return scheduler._render_marked_timespan(options, null, null);
        }
      }
    };

    scheduler._remove_mark_now = function () {
      var dhx_now_time = 'dhx_now_time';
      var els = this._els[dhx_now_time];

      for (var i = 0; i < els.length; i++) {
        var div = els[i];
        var parent = div.parentNode;

        if (parent) {
          parent.removeChild(div);
        }
      }

      this._els[dhx_now_time] = [];
    };
    /*
    scheduler._marked_timespans = {
    	"global": {
    		"0": {
    			"default": [
    				{  // sunday
    					zones: [0, 100, 500, 600],
    					css: "yellow_box",
    					type: "default",
    					view: "global",
    					day: 0
    				}
    			]
    		}
    		"112121312": {
    			"my_special_type": [
    				{
    					zones: [600, 900],
    					type: "block",
    					css: "some_class",
    					view: "global",
    					day: 112121312
    				},
    				{}
    			]
    		}
    	},
    	"units": {
    		"5_id": {
    			"3": {
    				"special_type": [ {}, {}, {} ],
    				"another_type": [ {} ]
    			}
    		},
    		"6_id": {
    			"11212127": {
    				...
    			}
    		}
    	}
    }
    */


    scheduler._marked_timespans = {
      global: {}
    };

    scheduler._get_zone_minutes = function (date) {
      return date.getHours() * 60 + date.getMinutes();
    };

    scheduler._prepare_timespan_options = function (config) {
      // receives 1 option, returns array of options
      var r_configs = []; // resulting configs

      var temp_configs = [];
      if (config.days == "fullweek") config.days = [0, 1, 2, 3, 4, 5, 6];

      if (config.days instanceof Array) {
        var t_days = config.days.slice();

        for (var i = 0; i < t_days.length; i++) {
          var cloned_config = scheduler._lame_clone(config);

          cloned_config.days = t_days[i];
          r_configs.push.apply(r_configs, scheduler._prepare_timespan_options(cloned_config));
        }

        return r_configs;
      }

      if (!config || !(config.start_date && config.end_date && config.end_date > config.start_date || config.days !== undefined && config.zones) && !config.type) return r_configs; // incorrect config was provided

      var min = 0;
      var max = 24 * 60;
      if (config.zones == "fullday") config.zones = [min, max];

      if (config.zones && config.invert_zones) {
        config.zones = scheduler.invertZones(config.zones);
      }

      config.id = scheduler.uid();
      config.css = config.css || "";
      config.type = config.type || default_timespan_type;
      var sections = config.sections;

      if (sections) {
        for (var view_key in sections) {
          if (sections.hasOwnProperty(view_key)) {
            var ids = sections[view_key];
            if (!(ids instanceof Array)) ids = [ids];

            for (var i = 0; i < ids.length; i++) {
              var t_config = scheduler._lame_copy({}, config);

              t_config.sections = {};
              t_config.sections[view_key] = ids[i];
              temp_configs.push(t_config);
            }
          }
        }
      } else {
        temp_configs.push(config);
      }

      for (var k = 0; k < temp_configs.length; k++) {
        var c_config = temp_configs[k]; // config to be checked

        var start_date = c_config.start_date;
        var end_date = c_config.end_date;

        if (start_date && end_date) {
          var t_sd = scheduler.date.date_part(new Date(start_date)); // e.g. 05 october

          var t_ed = scheduler.date.add(t_sd, 1, "day"); // 06 october, will both be incremented in the loop

          while (t_sd < end_date) {
            var t_config = scheduler._lame_copy({}, c_config);

            delete t_config.start_date;
            delete t_config.end_date;
            t_config.days = t_sd.valueOf();
            var zone_start = start_date > t_sd ? scheduler._get_zone_minutes(start_date) : min;
            var zone_end = end_date > t_ed || end_date.getDate() != t_sd.getDate() ? max : scheduler._get_zone_minutes(end_date);
            t_config.zones = [zone_start, zone_end];
            r_configs.push(t_config);
            t_sd = t_ed;
            t_ed = scheduler.date.add(t_ed, 1, "day");
          }
        } else {
          if (c_config.days instanceof Date) c_config.days = scheduler.date.date_part(c_config.days).valueOf();
          c_config.zones = config.zones.slice();
          r_configs.push(c_config);
        }
      }

      return r_configs;
    };

    scheduler._get_dates_by_index = function (index, start, end) {
      var dates = [];
      start = scheduler.date.date_part(new Date(start || scheduler._min_date));
      end = new Date(end || scheduler._max_date);
      var start_day = start.getDay();
      var delta = index - start_day >= 0 ? index - start_day : 7 - start.getDay() + index;
      var t_date = scheduler.date.add(start, delta, "day");

      for (; t_date < end; t_date = scheduler.date.add(t_date, 1, "week")) {
        dates.push(t_date);
      }

      return dates;
    };

    scheduler._get_css_classes_by_config = function (config) {
      var css_classes = [];

      if (config.type == dhx_time_block) {
        css_classes.push(dhx_time_block);
        if (config.css) css_classes.push(dhx_time_block + "_reset");
      }

      css_classes.push("dhx_marked_timespan", config.css);
      return css_classes.join(" ");
    };

    scheduler._get_block_by_config = function (config) {
      var block = document.createElement("div");

      if (config.html) {
        if (typeof config.html == "string") block.innerHTML = config.html;else block.appendChild(config.html);
      }

      return block;
    };

    scheduler._render_marked_timespan = function (options, area, day) {
      var blocks = []; // resulting block which will be rendered and returned

      var c = scheduler.config;
      var min_date = this._min_date;
      var max_date = this._max_date;
      var day_value = false; // if timespan for specific date should be displayed

      if (!c.display_marked_timespans) return blocks; // in case of markTimespan

      if (!day && day !== 0) {
        if (options.days < 7) day = options.days;else {
          var date_to_display = new Date(options.days);
          day_value = +date_to_display; // in case of markTimespan date could be not in the viewing range, need to return

          if (!(+max_date > +date_to_display && +min_date <= +date_to_display)) return blocks;
          day = date_to_display.getDay();
        } // convert day default index (Sun - 0, Sat - 6) to index of hourscales (depends on week_start and config.start_on_monday)

        var min_day = min_date.getDay();

        if (min_day > day) {
          day = 7 - (min_day - day);
        } else {
          day = day - min_day;
        }
      }

      var zones = options.zones;

      var css_classes = scheduler._get_css_classes_by_config(options);

      if (scheduler._table_view && scheduler._mode == "month") {
        var areas = [];
        var days = [];

        if (!area) {
          days = day_value ? [day_value] : scheduler._get_dates_by_index(day);

          for (var i = 0; i < days.length; i++) {
            areas.push(this._scales[days[i]]);
          }
        } else {
          areas.push(area);
          days.push(day);
        }

        for (var i = 0; i < areas.length; i++) {
          area = areas[i];
          day = days[i];

          var sweek = Math.floor((this._correct_shift(day, 1) - min_date.valueOf()) / (60 * 60 * 1000 * 24 * this._cols.length)),
              sday = this.locate_holder_day(day, false) % this._cols.length;

          if (this._ignores[sday]) continue;
          var columnNumber = this.config.rtl ? this._colsS.col_length - 1 - sday : sday;

          var block_proto = scheduler._get_block_by_config(options),
              height = Math.max(area.offsetHeight - 1, 0),
              // 1 for bottom border
          width = Math.max(area.offsetWidth - 1, 0),
              // 1 for left border
          left = this._colsS[columnNumber],
              top = this._colsS.heights[sweek] + (this._colsS.height ? this.xy.month_scale_height + 2 : 2) - 1;

          block_proto.className = css_classes;
          block_proto.style.top = top + "px";
          block_proto.style.lineHeight = block_proto.style.height = height + "px";

          for (var k = 0; k < zones.length; k += 2) {
            var start = zones[i];
            var end = zones[i + 1];
            if (end <= start) return [];
            var block = block_proto.cloneNode(true);
            block.style.left = left + Math.round(start / (24 * 60) * width) + "px";
            block.style.width = Math.round((end - start) / (24 * 60) * width) + "px";
            area.appendChild(block);
            blocks.push(block);
          }
        }
      } else {
        var index = day;
        if (this._ignores[this.locate_holder_day(day, false)]) return blocks;

        if (this._props && this._props[this._mode] && options.sections && options.sections[this._mode]) {
          var view = this._props[this._mode];
          index = view.order[options.sections[this._mode]];
          var inner_index = view.order[options.sections[this._mode]];

          if (!(view.days > 1)) {
            index = inner_index;

            if (view.size && index > view.position + view.size) {
              index = 0;
            }
          } else {
            var units_l = view.size || view.options.length;
            index = index * units_l + inner_index;
          }
        }

        area = area ? area : scheduler.locate_holder(index);

        for (var i = 0; i < zones.length; i += 2) {
          var start = Math.max(zones[i], c.first_hour * 60);
          var end = Math.min(zones[i + 1], c.last_hour * 60);

          if (end <= start) {
            if (i + 2 < zones.length) continue;else return [];
          }

          var block = scheduler._get_block_by_config(options);

          block.className = css_classes; // +1 for working with section which really takes up whole height (as % would be == 0)

          var all_hours_height = this.config.hour_size_px * 24 + 1;
          var hour_ms = 60 * 60 * 1000;
          block.style.top = Math.round((start * 60 * 1000 - this.config.first_hour * hour_ms) * this.config.hour_size_px / hour_ms) % all_hours_height + "px";
          block.style.lineHeight = block.style.height = Math.max(Math.round((end - start) * 60 * 1000 * this.config.hour_size_px / hour_ms) % all_hours_height, 1) + "px";
          area.appendChild(block);
          blocks.push(block);
        }
      }

      return blocks;
    };

    scheduler._mark_timespans = function () {
      var data = this._els["dhx_cal_data"][0];
      var divs = [];

      if (scheduler._table_view && scheduler._mode == "month") {
        for (var day in this._scales) {
          var date = new Date(+day);
          divs.push.apply(divs, scheduler._on_scale_add_marker(this._scales[day], date));
        }
      } else {
        //manually trigger rendering of configs for each column
        var date = new Date(scheduler._min_date);

        for (var i = 0, len = data.childNodes.length; i < len; i++) {
          var area = data.childNodes[i];

          if (area.firstChild && scheduler._getClassName(area.firstChild).indexOf("dhx_scale_hour") > -1) {
            continue;
          }

          divs.push.apply(divs, scheduler._on_scale_add_marker(area, date));
          date = scheduler.date.add(date, 1, "day");
        }
      }

      return divs;
    }; // just marks timespan, will be cleaned after refresh


    scheduler.markTimespan = function (configuration) {
      var rebuild_els = false;

      if (!this._els["dhx_cal_data"]) {
        scheduler.get_elements();
        rebuild_els = true;
      } // backup regular marked timespans


      var timespans_ids = scheduler._marked_timespans_ids,
          timespan_types = scheduler._marked_timespans_types,
          timespans = scheduler._marked_timespans;
      scheduler.deleteMarkedTimespan(); //add block to configs

      scheduler.addMarkedTimespan(configuration);

      var divs = scheduler._mark_timespans();

      if (rebuild_els) scheduler._els = []; // restore timespan config

      scheduler._marked_timespans_ids = timespans_ids;
      scheduler._marked_timespans_types = timespan_types;
      scheduler._marked_timespans = timespans;
      return divs;
    };

    scheduler.unmarkTimespan = function (divs) {
      if (!divs) return;

      for (var i = 0; i < divs.length; i++) {
        var div = divs[i]; // parent may no longer be present if we switched views, navigated

        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
      }
    };

    scheduler._addMarkerTimespanConfig = function (config) {
      var global = "global";
      var timespans = scheduler._marked_timespans;
      var id = config.id;
      var ids = scheduler._marked_timespans_ids;
      if (!ids[id]) ids[id] = [];
      var day = config.days;
      var sections = config.sections;
      var type = config.type; // default or specified

      config.id = id;

      if (sections) {
        for (var view_key in sections) {
          if (sections.hasOwnProperty(view_key)) {
            if (!timespans[view_key]) timespans[view_key] = {};
            var unit_id = sections[view_key];
            var timespans_view = timespans[view_key];
            if (!timespans_view[unit_id]) timespans_view[unit_id] = {};
            if (!timespans_view[unit_id][day]) timespans_view[unit_id][day] = {};

            if (!timespans_view[unit_id][day][type]) {
              timespans_view[unit_id][day][type] = [];
              if (!scheduler._marked_timespans_types) scheduler._marked_timespans_types = {};
              if (!scheduler._marked_timespans_types[type]) scheduler._marked_timespans_types[type] = true;
            }

            var day_configs = timespans_view[unit_id][day][type];
            config._array = day_configs;
            day_configs.push(config);
            ids[id].push(config);
          }
        }
      } else {
        if (!timespans[global][day]) timespans[global][day] = {};
        if (!timespans[global][day][type]) timespans[global][day][type] = [];
        if (!scheduler._marked_timespans_types) scheduler._marked_timespans_types = {};
        if (!scheduler._marked_timespans_types[type]) scheduler._marked_timespans_types[type] = true;
        var day_configs = timespans[global][day][type];
        config._array = day_configs;
        day_configs.push(config);
        ids[id].push(config);
      }
    };

    scheduler._marked_timespans_ids = {}; // adds marked timespan to collections, persistent

    scheduler.addMarkedTimespan = function (configuration) {
      var configs = scheduler._prepare_timespan_options(configuration);

      if (!configs.length) return; // options are incorrect, nothing to mark

      var id = configs[0].id;

      for (var i = 0; i < configs.length; i++) {
        scheduler._addMarkerTimespanConfig(configs[i]);
      }

      return id;
    }; // not used for now


    scheduler._add_timespan_zones = function (current_zones, zones) {
      var resulting_zones = current_zones.slice();
      zones = zones.slice();
      if (!resulting_zones.length) return zones;

      for (var i = 0; i < resulting_zones.length; i += 2) {
        var c_zone_start = resulting_zones[i];
        var c_zone_end = resulting_zones[i + 1];
        var isLast = i + 2 == resulting_zones.length;

        for (var k = 0; k < zones.length; k += 2) {
          var zone_start = zones[k];
          var zone_end = zones[k + 1];

          if (zone_end > c_zone_end && zone_start <= c_zone_end || zone_start < c_zone_start && zone_end >= c_zone_start) {
            resulting_zones[i] = Math.min(c_zone_start, zone_start);
            resulting_zones[i + 1] = Math.max(c_zone_end, zone_end);
            i -= 2;
          } else {
            if (!isLast) // do nothing, maybe next current zone will match or will be last
              continue;
            var offset = c_zone_start > zone_start ? 0 : 2;
            resulting_zones.splice(i + offset, 0, zone_start, zone_end); // last current zone, need to add another
          }

          zones.splice(k--, 2); // zone was merged or added, need to exclude it

          break;
        }
      }

      return resulting_zones;
    };

    scheduler._subtract_timespan_zones = function (current_zones, zones) {
      var resulting_zones = current_zones.slice();

      for (var i = 0; i < resulting_zones.length; i += 2) {
        var c_zone_start = resulting_zones[i]; // current_zone_start

        var c_zone_end = resulting_zones[i + 1];

        for (var k = 0; k < zones.length; k += 2) {
          var zone_start = zones[k];
          var zone_end = zones[k + 1];

          if (zone_end > c_zone_start && zone_start < c_zone_end) {
            var is_modified = false;

            if (c_zone_start >= zone_start && c_zone_end <= zone_end) {
              resulting_zones.splice(i, 2);
            }

            if (c_zone_start < zone_start) {
              resulting_zones.splice(i, 2, c_zone_start, zone_start);
              is_modified = true;
            }

            if (c_zone_end > zone_end) {
              resulting_zones.splice(is_modified ? i + 2 : i, is_modified ? 0 : 2, zone_end, c_zone_end);
            }

            i -= 2;
            break;
          } else {
            continue;
          }
        }
      }

      return resulting_zones;
    };

    scheduler.invertZones = function (zones) {
      return scheduler._subtract_timespan_zones([0, 1440], zones.slice());
    };

    scheduler._delete_marked_timespan_by_id = function (id) {
      var configs = scheduler._marked_timespans_ids[id];

      if (configs) {
        for (var i = 0; i < configs.length; i++) {
          var config = configs[i];
          var parent_array = config._array;

          for (var k = 0; k < parent_array.length; k++) {
            if (parent_array[k] == config) {
              parent_array.splice(k, 1);
              break;
            }
          }
        }
      }
    };

    scheduler._delete_marked_timespan_by_config = function (config) {
      var timespans = scheduler._marked_timespans;
      var sections = config.sections;
      var day = config.days;
      var type = config.type || default_timespan_type;
      var viewspans;

      if (sections) {
        for (var view_key in sections) {
          if (sections.hasOwnProperty(view_key) && timespans[view_key]) {
            var unit_id = sections[view_key];

            if (timespans[view_key][unit_id]) {
              viewspans = timespans[view_key][unit_id];
            }
          }
        }
      } else {
        viewspans = timespans.global;
      }

      if (viewspans) {
        if (day !== undefined) {
          if (viewspans[day] && viewspans[day][type]) {
            scheduler._addMarkerTimespanConfig(config); // register config in order to be able to delete recurring timespan from a specific day


            scheduler._delete_marked_timespans_list(viewspans[day][type], config);
          }
        } else {
          for (var d in viewspans) {
            if (viewspans[d][type]) {
              var dayConfig = scheduler._lame_clone(config);

              config.days = d;

              scheduler._addMarkerTimespanConfig(dayConfig); // register config in order to be able to delete recurring timespan from a specific day


              scheduler._delete_marked_timespans_list(viewspans[d][type], config);
            }
          }
        }
      }
    };

    scheduler._delete_marked_timespans_list = function (day_timespans, config) {
      for (var i = 0; i < day_timespans.length; i++) {
        var d_t = day_timespans[i];

        var zones = scheduler._subtract_timespan_zones(d_t.zones, config.zones);

        if (zones.length) d_t.zones = zones;else {
          day_timespans.splice(i, 1);
          i--; // need to update ids collection

          var related_zones = scheduler._marked_timespans_ids[d_t.id];

          for (var k = 0; k < related_zones.length; k++) {
            if (related_zones[k] == d_t) {
              related_zones.splice(k, 1);
              break;
            }
          }
        }
      }
    };

    scheduler.deleteMarkedTimespan = function (configuration) {
      // delete everything
      if (!arguments.length) {
        scheduler._marked_timespans = {
          global: {}
        };
        scheduler._marked_timespans_ids = {};
        scheduler._marked_timespans_types = {};
      }

      if (_typeof(configuration) != "object") {
        // id was passed
        scheduler._delete_marked_timespan_by_id(configuration);
      } else {
        // normal configuration was passed
        if (!(configuration.start_date && configuration.end_date)) {
          if (configuration.days === undefined && !configuration.type) configuration.days = "fullweek";
          if (!configuration.zones) configuration.zones = "fullday";
        }

        var types = [];

        if (!configuration.type) {
          //if type not specified - delete timespans of all types
          for (var type in scheduler._marked_timespans_types) {
            types.push(type);
          }
        } else {
          types.push(configuration.type);
        }

        var configs = scheduler._prepare_timespan_options(configuration);

        for (var i = 0; i < configs.length; i++) {
          var config = configs[i];

          for (var t = 0; t < types.length; t++) {
            var typedConfig = scheduler._lame_clone(config);

            typedConfig.type = types[t];

            scheduler._delete_marked_timespan_by_config(typedConfig);
          }
        }
      }
    };

    scheduler._get_types_to_render = function (common, specific) {
      var types_to_render = common ? scheduler._lame_copy({}, common) : {};

      for (var type in specific || {}) {
        if (specific.hasOwnProperty(type)) {
          types_to_render[type] = specific[type];
        }
      }

      return types_to_render;
    };

    scheduler._get_configs_to_render = function (types) {
      var configs = [];

      for (var type in types) {
        if (types.hasOwnProperty(type)) {
          configs.push.apply(configs, types[type]);
        }
      }

      return configs;
    };

    scheduler._on_scale_add_marker = function (area, day) {
      if (scheduler._table_view && scheduler._mode != "month") return;
      var day_index = day.getDay();
      var day_value = day.valueOf();
      var mode = this._mode;
      var timespans = scheduler._marked_timespans;
      var r_configs = [];
      var divs = [];

      if (this._props && this._props[mode]) {
        // we are in the units view and need to draw it's sections as well
        var view = this._props[mode]; // units view object

        var units = view.options;

        var index = scheduler._get_unit_index(view, day);

        var unit = units[index]; // key, label

        if (!(view.days > 1)) {
          day = scheduler.date.date_part(new Date(this._date)); // for units view actually only 1 day is displayed yet the day variable will change, need to use this._date for all calls
        } else {
          var dx = 24 * 60 * 60 * 1000;
          var day_ind = Math.round((day - scheduler._min_date) / dx);
          var unitsPerDay = view.size || units.length;
          day = scheduler.date.add(scheduler._min_date, Math.floor(day_ind / unitsPerDay), "day"); // to the "same" day for all sections

          day = scheduler.date.date_part(day);
        }

        day_index = day.getDay();
        day_value = day.valueOf();

        if (timespans[mode] && timespans[mode][unit.key]) {
          var unit_zones = timespans[mode][unit.key];

          var unit_types = scheduler._get_types_to_render(unit_zones[day_index], unit_zones[day_value]);

          r_configs.push.apply(r_configs, scheduler._get_configs_to_render(unit_types));
        }
      }

      var global_data = timespans["global"];

      if (scheduler.config.overwrite_marked_timespans) {
        var day_types = global_data[day_value] || global_data[day_index];
        r_configs.push.apply(r_configs, scheduler._get_configs_to_render(day_types));
      } else {
        if (global_data[day_value]) {
          r_configs.push.apply(r_configs, scheduler._get_configs_to_render(global_data[day_value]));
        }

        if (global_data[day_index]) {
          r_configs.push.apply(r_configs, scheduler._get_configs_to_render(global_data[day_index]));
        }
      }

      for (var i = 0; i < r_configs.length; i++) {
        divs.push.apply(divs, scheduler._render_marked_timespan(r_configs[i], area, day));
      }

      return divs;
    };

    scheduler.attachEvent("onScaleAdd", function () {
      scheduler._on_scale_add_marker.apply(scheduler, arguments);
    });

    scheduler.dblclick_dhx_marked_timespan = function (e, src) {
      scheduler.callEvent("onScaleDblClick", [scheduler.getActionData(e).date, src, e]);

      if (scheduler.config.dblclick_create) {
        scheduler.addEventNow(scheduler.getActionData(e).date, null, e);
      }
    };
  };

  scheduler._temp_limit_scope();
});

/***/ }),

/***/ "./sources/ext/map_view.js":
/*!*********************************!*\
  !*** ./sources/ext/map_view.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  /* global google */
  var geocoder;
  scheduler.xy.map_date_width = 188; // date column width

  scheduler.xy.map_icon_width = 25; // event details icon width

  scheduler.xy.map_description_width = 400; // description column width

  scheduler.config.map_resolve_event_location = true; // if events in database doesn't have lat and lng values there will be an attempt to resolve them on event loading, useful for migration

  scheduler.config.map_resolve_user_location = true; // if user will be promted to share his location to display it on the map

  scheduler.config.map_initial_position = new google.maps.LatLng(48.724, 8.215); // initial position of the map

  scheduler.config.map_error_position = new google.maps.LatLng(15, 15); // this position will be displayed in case if event doesn't have corresponding coordinates

  scheduler.config.map_infowindow_max_width = 300;
  scheduler.config.map_type = google.maps.MapTypeId.ROADMAP;
  scheduler.config.map_zoom_after_resolve = 15;
  scheduler.locale.labels.marker_geo_success = "It seems you are here.";
  scheduler.locale.labels.marker_geo_fail = "Sorry, could not get your current position using geolocation.";
  scheduler.templates.marker_date = scheduler.date.date_to_str("%Y-%m-%d %H:%i"); // date for map's infowindow will be formatted following way

  scheduler.templates.marker_text = function (start, end, ev) {
    return "<div><b>" + ev.text + "</b><br/><br/>" + (ev.event_location || '') + "<br/><br/>" + scheduler.templates.marker_date(start) + " - " + scheduler.templates.marker_date(end) + "</div>";
  };

  scheduler.dblclick_dhx_map_area = function () {
    if (!this.config.readonly && this.config.dblclick_create) this.addEventNow({
      start_date: scheduler._date,
      end_date: scheduler.date.add(scheduler._date, scheduler.config.time_step, "minute")
    });
  };

  scheduler.templates.map_time = function (start, end, ev) {
    if (scheduler.config.rtl && !ev._timed) {
      return scheduler.templates.day_date(end) + " &ndash; " + scheduler.templates.day_date(start);
    } else if (ev._timed) {
      return this.day_date(ev.start_date, ev.end_date, ev) + " " + this.event_date(start);
    } else {
      return scheduler.templates.day_date(start) + " &ndash; " + scheduler.templates.day_date(end);
    }
  };

  scheduler.templates.map_text = function (start, end, ev) {
    return ev.text;
  };

  scheduler.date.map_start = function (d) {
    return d;
  };

  scheduler.date.add_map = function (date, inc, mode) {
    return new Date(date.valueOf());
  };

  scheduler.templates.map_date = function (dd, ed, mode) {
    return '';
  };

  scheduler._latLngUpdate = false; // flag for not displaying event second time in case of coordinates update

  scheduler.attachEvent("onSchedulerReady", function () {
    scheduler._isMapPositionSet = false; // if user actual (geolocation) position was set on the map

    var gmap = document.createElement('div');
    gmap.className = 'dhx_map';
    gmap.id = 'dhx_gmap';
    gmap.style.display = "none";
    var node = scheduler._obj;
    node.appendChild(gmap);
    scheduler._els.dhx_gmap = [];

    scheduler._els.dhx_gmap.push(gmap);

    _setMapSize('dhx_gmap');

    var mapOptions = {
      zoom: scheduler.config.map_initial_zoom || 10,
      center: scheduler.config.map_initial_position,
      mapTypeId: scheduler.config.map_type || google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('dhx_gmap'), mapOptions);
    map.disableDefaultUI = false;
    map.disableDoubleClickZoom = !scheduler.config.readonly;
    google.maps.event.addListener(map, "dblclick", function (event) {
      if (!scheduler.config.readonly && scheduler.config.dblclick_create) {
        var point = event.latLng;
        geocoder.geocode({
          'latLng': point
        }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            point = results[0].geometry.location;
            scheduler.addEventNow({
              lat: point.lat(),
              lng: point.lng(),
              event_location: results[0].formatted_address,
              start_date: scheduler._date,
              end_date: scheduler.date.add(scheduler._date, scheduler.config.time_step, "minute")
            });
          }
        });
      }
    });
    var infoWindowOptions = {
      content: ''
    };

    if (scheduler.config.map_infowindow_max_width) {
      infoWindowOptions.maxWidth = scheduler.config.map_infowindow_max_width;
    }

    scheduler.map = {
      _points: [],
      _markers: [],
      _infowindow: new google.maps.InfoWindow(infoWindowOptions),
      _infowindows_content: [],
      _initialization_count: -1,
      _obj: map
    };
    geocoder = new google.maps.Geocoder();

    if (scheduler.config.map_resolve_user_location) {
      if (navigator.geolocation) {
        if (!scheduler._isMapPositionSet) {
          navigator.geolocation.getCurrentPosition(function (position) {
            var _userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            map.setCenter(_userLocation);
            map.setZoom(scheduler.config.map_zoom_after_resolve || 10);

            scheduler.map._infowindow.setContent(scheduler.locale.labels.marker_geo_success);

            scheduler.map._infowindow.position = map.getCenter();

            scheduler.map._infowindow.open(map);

            scheduler._isMapPositionSet = true;
          }, function () {
            scheduler.map._infowindow.setContent(scheduler.locale.labels.marker_geo_fail);

            scheduler.map._infowindow.setPosition(map.getCenter());

            scheduler.map._infowindow.open(map);

            scheduler._isMapPositionSet = true;
          });
        }
      }
    }

    google.maps.event.addListener(map, "resize", function (event) {
      gmap.style.zIndex = '5';
      map.setZoom(map.getZoom());
    });
    google.maps.event.addListener(map, "tilesloaded", function (event) {
      gmap.style.zIndex = '5';
    });
    gmap.style.display = 'none'; // property was changed after attaching map

    var old = scheduler.render_data;

    scheduler.render_data = function (evs, hold) {
      if (this._mode == "map") {
        fill_map_tab();
        var events = scheduler.get_visible_events();

        for (var i = 0; i < events.length; i++) {
          if (!scheduler.map._markers[events[i].id]) {
            showAddress(events[i], false, false);
          }
        }
      } else return old.apply(this, arguments);
    };

    function set_full_view(mode) {
      if (mode) {
        var l = scheduler.locale.labels;
        scheduler._els["dhx_cal_header"][0].innerHTML = "<div class='dhx_map_line' style='width: " + (scheduler.xy.map_date_width + scheduler.xy.map_description_width + 2) + "px;' ><div class='headline_date' style='width: " + scheduler.xy.map_date_width + "px;'>" + l.date + "</div><div class='headline_description' style='width: " + scheduler.xy.map_description_width + "px;'>" + l.description + "</div></div>";
        scheduler._table_view = true;
        scheduler.set_sizes();
      }
    }

    function clear_map_tab() {
      scheduler._selected_event_id = null;

      scheduler.map._infowindow.close();

      var markers = scheduler.map._markers;

      for (var key in markers) {
        if (markers.hasOwnProperty(key)) {
          markers[key].setMap(null);
          delete scheduler.map._markers[key];
          if (scheduler.map._infowindows_content[key]) delete scheduler.map._infowindows_content[key];
        }
      }
    }

    function fill_map_tab() {
      //select events for which data need to be printed
      var events = scheduler.get_visible_events();
      events.sort(function (a, b) {
        if (a.start_date.valueOf() == b.start_date.valueOf()) return a.id > b.id ? 1 : -1;
        return a.start_date > b.start_date ? 1 : -1;
      }); //generate html for the view

      var ariaAttr = scheduler._waiAria.mapAttrString();

      var html = "<div " + ariaAttr + " class='dhx_map_area'>";

      for (var i = 0; i < events.length; i++) {
        var ev = events[i];
        var event_class = ev.id == scheduler._selected_event_id ? 'dhx_map_line highlight' : 'dhx_map_line';
        var bg_color = ev.color ? "background:" + ev.color + ";" : "";
        var color = ev.textColor ? "color:" + ev.textColor + ";" : "";

        var ariaAttr = scheduler._waiAria.mapRowAttrString(ev);

        var ariaButtonAttr = scheduler._waiAria.mapDetailsBtnString();

        html += "<div " + ariaAttr + " class='" + event_class + "' event_id='" + ev.id + "' " + scheduler.config.event_attribute + "='" + ev.id + "' style='" + bg_color + "" + color + "" + (ev._text_style || "") + " width: " + (scheduler.xy.map_date_width + scheduler.xy.map_description_width + 2) + "px;'><div class='dhx_map_event_time' style='width: " + scheduler.xy.map_date_width + "px;' >" + scheduler.templates.map_time(ev.start_date, ev.end_date, ev) + "</div>";
        html += "<div " + ariaButtonAttr + " class='dhx_event_icon icon_details'>&nbsp;</div>";
        html += "<div class='line_description' style='width:" + (scheduler.xy.map_description_width - scheduler.xy.map_icon_width) + "px;'>" + scheduler.templates.map_text(ev.start_date, ev.end_date, ev) + "</div></div>"; // -25 = icon size 20 and padding 5
      }

      html += "<div class='dhx_v_border' style=" + (scheduler.config.rtl ? "'right: " : "'left: ") + (scheduler.xy.map_date_width - 2) + "px;'></div><div class='dhx_v_border_description'></div></div>"; //render html

      scheduler._els["dhx_cal_data"][0].scrollTop = 0; //fix flickering in FF

      scheduler._els["dhx_cal_data"][0].innerHTML = html;
      scheduler._els["dhx_cal_data"][0].style.width = scheduler.xy.map_date_width + scheduler.xy.map_description_width + 1 + 'px';
      var t = scheduler._els["dhx_cal_data"][0].firstChild.childNodes;

      var dateElement = scheduler._getNavDateElement();

      if (dateElement) {
        dateElement.innerHTML = scheduler.templates[scheduler._mode + "_date"](scheduler._min_date, scheduler._max_date, scheduler._mode);
      }

      scheduler._rendered = [];

      for (var i = 0; i < t.length - 2; i++) {
        scheduler._rendered[i] = t[i];
      }
    }

    function _setMapSize(elem_id) {
      //input - map's div id
      var map = document.getElementById(elem_id);
      var height = scheduler._y - scheduler.xy.nav_height;
      if (height < 0) height = 0;
      var width = scheduler._x - scheduler.xy.map_date_width - scheduler.xy.map_description_width - 1;
      if (width < 0) width = 0;
      map.style.height = height + 'px';
      map.style.width = width + 'px';

      if (scheduler.config.rtl) {
        map.style.marginRight = scheduler.xy.map_date_width + scheduler.xy.map_description_width + 1 + 'px';
      } else {
        map.style.marginLeft = scheduler.xy.map_date_width + scheduler.xy.map_description_width + 1 + 'px';
      }

      map.style.marginTop = scheduler.xy.nav_height + 2 + 'px';
    }

    scheduler.map_view = function (mode) {
      scheduler.map._initialization_count++;
      var gmap = scheduler._els.dhx_gmap[0];
      var temp_center;
      scheduler._els.dhx_cal_data[0].style.width = scheduler.xy.map_date_width + scheduler.xy.map_description_width + 1 + 'px';
      scheduler._min_date = scheduler.config.map_start || scheduler._currentDate();
      scheduler._max_date = scheduler.config.map_end || scheduler.date.add(scheduler._currentDate(), 1, "year");
      scheduler._table_view = true;
      set_full_view(mode);

      if (mode) {
        //map tab activated
        clear_map_tab();
        fill_map_tab();
        gmap.style.display = 'block'; // need to resize block every time window is resized

        _setMapSize('dhx_gmap');

        temp_center = scheduler.map._obj.getCenter();
        var events = scheduler.get_visible_events();

        for (var i = 0; i < events.length; i++) {
          if (!scheduler.map._markers[events[i].id]) {
            showAddress(events[i]);
          }
        }
      } else {
        //map tab de-activated
        gmap.style.display = 'none';
      }

      google.maps.event.trigger(scheduler.map._obj, 'resize');

      if (scheduler.map._initialization_count === 0 && temp_center) {
        // if tab is activated for the first time need to fix position
        scheduler.map._obj.setCenter(temp_center);
      }

      if (scheduler._selected_event_id) {
        selectEvent(scheduler._selected_event_id);
      }
    };

    var selectEvent = function selectEvent(event_id) {
      scheduler.map._obj.setCenter(scheduler.map._points[event_id]);

      scheduler.callEvent("onClick", [event_id]);
    };

    var showAddress = function showAddress(event, setCenter, performClick) {
      // what if event have incorrect position from the start?
      var point = scheduler.config.map_error_position;

      if (event.lat && event.lng) {
        point = new google.maps.LatLng(event.lat, event.lng);
      }

      var message = scheduler.templates.marker_text(event.start_date, event.end_date, event);

      if (!scheduler._new_event) {
        scheduler.map._infowindows_content[event.id] = message;
        if (scheduler.map._markers[event.id]) scheduler.map._markers[event.id].setMap(null);
        scheduler.map._markers[event.id] = new google.maps.Marker({
          position: point,
          map: scheduler.map._obj
        });
        google.maps.event.addListener(scheduler.map._markers[event.id], 'click', function () {
          scheduler.map._infowindow.setContent(scheduler.map._infowindows_content[event.id]);

          scheduler.map._infowindow.open(scheduler.map._obj, scheduler.map._markers[event.id]);

          scheduler._selected_event_id = event.id;
          scheduler.render_data();
        });
        scheduler.map._points[event.id] = point;
        if (setCenter) scheduler.map._obj.setCenter(scheduler.map._points[event.id]);
        if (performClick) scheduler.callEvent("onClick", [event.id]);
      }
    };

    scheduler.attachEvent("onClick", function (event_id, native_event_object) {
      if (this._mode == "map") {
        scheduler._selected_event_id = event_id;

        for (var i = 0; i < scheduler._rendered.length; i++) {
          scheduler._rendered[i].className = 'dhx_map_line';

          if (scheduler._rendered[i].getAttribute(scheduler.config.event_attribute) == event_id) {
            scheduler._rendered[i].className += " highlight";
          }
        }

        if (scheduler.map._points[event_id] && scheduler.map._markers[event_id]) {
          scheduler.map._obj.setCenter(scheduler.map._points[event_id]); // was panTo


          google.maps.event.trigger(scheduler.map._markers[event_id], 'click');
        }
      }

      return true;
    });

    var _displayEventOnMap = function _displayEventOnMap(event) {
      if (event.event_location && geocoder) {
        geocoder.geocode({
          'address': event.event_location,
          'language': scheduler.uid().toString()
        }, function (results, status) {
          var point = {};

          if (status != google.maps.GeocoderStatus.OK) {
            point = scheduler.callEvent("onLocationError", [event.id]);
            if (!point || point === true) point = scheduler.config.map_error_position;
          } else {
            point = results[0].geometry.location;
          }

          event.lat = point.lat();
          event.lng = point.lng();
          scheduler._selected_event_id = event.id;
          scheduler._latLngUpdate = true;
          scheduler.callEvent("onEventChanged", [event.id, event]);
          showAddress(event, true, true);
        });
      } else {
        showAddress(event, true, true);
      }
    };

    var _updateEventLocation = function _updateEventLocation(event) {
      // update lat and lng in database
      if (event.event_location && geocoder) {
        geocoder.geocode({
          'address': event.event_location,
          'language': scheduler.uid().toString()
        }, function (results, status) {
          var point = {};

          if (status != google.maps.GeocoderStatus.OK) {
            point = scheduler.callEvent("onLocationError", [event.id]);
            if (!point || point === true) point = scheduler.config.map_error_position;
          } else {
            point = results[0].geometry.location;
          }

          event.lat = point.lat();
          event.lng = point.lng();
          scheduler._latLngUpdate = true;
          scheduler.callEvent("onEventChanged", [event.id, event]);
        });
      }
    };

    var _delay = function _delay(method, object, params, delay) {
      setTimeout(function () {
        var ret = method.apply(object, params);
        method = object = params = null;
        return ret;
      }, delay || 1);
    };

    scheduler.attachEvent("onEventChanged", function (event_id, event_object) {
      if (!this._latLngUpdate) {
        var event = scheduler.getEvent(event_id);

        if (event.start_date < scheduler._min_date && event.end_date > scheduler._min_date || event.start_date < scheduler._max_date && event.end_date > scheduler._max_date || event.start_date.valueOf() >= scheduler._min_date && event.end_date.valueOf() <= scheduler._max_date) {
          if (scheduler.map._markers[event_id]) scheduler.map._markers[event_id].setMap(null);

          _displayEventOnMap(event);
        } else {
          // event no longer should be displayed on the map view
          scheduler._selected_event_id = null;

          scheduler.map._infowindow.close();

          if (scheduler.map._markers[event_id]) scheduler.map._markers[event_id].setMap(null);
        }
      } else this._latLngUpdate = false;

      return true;
    });
    scheduler.attachEvent("onEventIdChange", function (old_event_id, new_event_id) {
      var event = scheduler.getEvent(new_event_id);

      if (event.start_date < scheduler._min_date && event.end_date > scheduler._min_date || event.start_date < scheduler._max_date && event.end_date > scheduler._max_date || event.start_date.valueOf() >= scheduler._min_date && event.end_date.valueOf() <= scheduler._max_date) {
        if (scheduler.map._markers[old_event_id]) {
          scheduler.map._markers[old_event_id].setMap(null);

          delete scheduler.map._markers[old_event_id];
        }

        if (scheduler.map._infowindows_content[old_event_id]) delete scheduler.map._infowindows_content[old_event_id];

        _displayEventOnMap(event);
      }

      return true;
    });
    scheduler.attachEvent("onEventAdded", function (event_id, event_object) {
      if (!scheduler._dataprocessor) {
        if (event_object.start_date < scheduler._min_date && event_object.end_date > scheduler._min_date || event_object.start_date < scheduler._max_date && event_object.end_date > scheduler._max_date || event_object.start_date.valueOf() >= scheduler._min_date && event_object.end_date.valueOf() <= scheduler._max_date) {
          if (scheduler.map._markers[event_id]) scheduler.map._markers[event_id].setMap(null);

          _displayEventOnMap(event_object);
        }
      }

      return true;
    });
    /* Test/example
     scheduler.attachEvent("onLocationError", function(event_id,event_object){
     return new google.maps.LatLng(8, 8);
     });
     */

    scheduler.attachEvent("onBeforeEventDelete", function (event_id, event_object) {
      if (scheduler.map._markers[event_id]) {
        scheduler.map._markers[event_id].setMap(null); // if new event is deleted tab != map then it doesn't have marker yet

      }

      scheduler._selected_event_id = null;

      scheduler.map._infowindow.close();

      return true;
    });
    scheduler._event_resolve_delay = 1500;
    scheduler.attachEvent("onEventLoading", function (event) {
      if (scheduler.config.map_resolve_event_location && event.event_location && !event.lat && !event.lng) {
        // don't delete !event.lat && !event.lng as location could change
        scheduler._event_resolve_delay += 1500;

        _delay(_updateEventLocation, this, [event], scheduler._event_resolve_delay);
      }

      return true;
    });
    scheduler.attachEvent("onEventCancel", function (event_id, is_new) {
      if (is_new) {
        if (scheduler.map._markers[event_id]) scheduler.map._markers[event_id].setMap(null);

        scheduler.map._infowindow.close();
      }

      return true;
    });
  });
});

/***/ }),

/***/ "./sources/ext/minical.js":
/*!********************************!*\
  !*** ./sources/ext/minical.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  var minicalDomEvents = scheduler._createDomEventScope();

  scheduler.templates.calendar_month = scheduler.date.date_to_str("%F %Y");
  scheduler.templates.calendar_scale_date = scheduler.date.date_to_str("%D");
  scheduler.templates.calendar_date = scheduler.date.date_to_str("%d");
  scheduler.config.minicalendar = {
    mark_events: true
  };
  scheduler._synced_minicalendars = [];

  scheduler.renderCalendar = function (obj, _prev, is_refresh) {
    var cal = null;

    var date = obj.date || scheduler._currentDate();

    if (typeof date == "string") date = this.templates.api_date(date);

    if (!_prev) {
      var cont = obj.container;
      var pos = obj.position;
      if (typeof cont == "string") cont = document.getElementById(cont);
      if (typeof pos == "string") pos = document.getElementById(pos);

      if (pos && typeof pos.left == "undefined" && typeof pos.right == "undefined") {
        var tpos = scheduler.$domHelpers.getOffset(pos);
        pos = {
          top: tpos.top + pos.offsetHeight,
          left: tpos.left
        };
      }

      if (!cont) cont = scheduler._get_def_cont(pos);
      cal = this._render_calendar(cont, date, obj);

      if (!cal.$_eventAttached) {
        cal.$_eventAttached = true;
        minicalDomEvents.attach(cal, "click", function (e) {
          var src = e.target || e.srcElement;
          var $dom = scheduler.$domHelpers;

          if ($dom.closest(src, ".dhx_month_head")) {
            if (!$dom.closest(src, ".dhx_after") && !$dom.closest(src, ".dhx_before")) {
              var cellRoot = $dom.closest(src, "[data-cell-date]");
              var dateAttribute = cellRoot.getAttribute("data-cell-date");
              var newDate = scheduler.templates.parse_date(dateAttribute);
              scheduler.unmarkCalendar(this);
              scheduler.markCalendar(this, newDate, "dhx_calendar_click");
              this._last_date = newDate;
              if (this.conf.handler) this.conf.handler.call(scheduler, newDate, this);
            }
          }
        }.bind(cal));
      }
    } else {
      cal = this._render_calendar(_prev.parentNode, date, obj, _prev);
      scheduler.unmarkCalendar(cal);
    }

    if (scheduler.config.minicalendar.mark_events) {
      var start = scheduler.date.month_start(date);
      var end = scheduler.date.add(start, 1, "month");
      var evs = this.getEvents(start, end);
      var filter = this["filter_" + this._mode];
      var markedDates = {};

      for (var i = 0; i < evs.length; i++) {
        var ev = evs[i];
        if (filter && !filter(ev.id, ev)) continue;
        var d = ev.start_date;
        if (d.valueOf() < start.valueOf()) d = start;
        d = scheduler.date.date_part(new Date(d.valueOf()));

        while (d < ev.end_date) {
          if (!markedDates[+d]) {
            markedDates[+d] = true;
            this.markCalendar(cal, d, "dhx_year_event");
          }

          d = this.date.add(d, 1, "day");
          if (d.valueOf() >= end.valueOf()) break;
        }
      }
    }

    this._markCalendarCurrentDate(cal);

    cal.conf = obj;
    if (obj.sync && !is_refresh) this._synced_minicalendars.push(cal);

    if (!cal.conf._on_xle_handler) {
      cal.conf._on_xle_handler = scheduler.attachEvent("onXLE", function refreshOnLoad() {
        scheduler.updateCalendar(cal, cal.conf.date);
      });
    }

    if (this.config.wai_aria_attributes && this.config.wai_aria_application_role) {
      cal.setAttribute("role", "application");
    }

    return cal;
  };

  scheduler._get_def_cont = function (pos) {
    if (!this._def_count) {
      this._def_count = document.createElement("div");
      this._def_count.className = "dhx_minical_popup";
      scheduler.event(this._def_count, "click", function (e) {
        e.cancelBubble = true;
      });
      document.body.appendChild(this._def_count);
    }

    if (pos.left) {
      this._def_count.style.left = pos.left + "px";
    }

    if (pos.right) {
      this._def_count.style.right = pos.right + "px";
    }

    if (pos.top) {
      this._def_count.style.top = pos.top + "px";
    }

    if (pos.bottom) {
      this._def_count.style.bottom = pos.bottom + "px";
    }

    this._def_count._created = new Date();
    return this._def_count;
  };

  scheduler._locateCalendar = function (cal, date) {
    if (typeof date == "string") date = scheduler.templates.api_date(date);
    if (+date > +cal._max_date || +date < +cal._min_date) return null;
    var table = cal.querySelector(".dhx_year_body").childNodes[0];
    var weekNum = 0;
    var dat = new Date(cal._min_date);

    while (+this.date.add(dat, 1, "week") <= +date) {
      dat = this.date.add(dat, 1, "week");
      weekNum++;
    }

    var sm = scheduler.config.start_on_monday;
    var day = (date.getDay() || (sm ? 7 : 0)) - (sm ? 1 : 0);
    return table.rows[weekNum].cells[day].firstChild;
  };

  scheduler.markCalendar = function (cal, date, css) {
    var div = this._locateCalendar(cal, date);

    if (!div) return;
    div.className += " " + css;
  };

  scheduler.unmarkCalendar = function (cal, date, css) {
    date = date || cal._last_date;
    css = css || "dhx_calendar_click";
    if (!date) return;

    var el = this._locateCalendar(cal, date);

    if (!el) return;
    el.className = (el.className || "").replace(RegExp(css, "g"));
  };

  scheduler._week_template = function (width) {
    var summ = width || 250;
    var left = 0;
    var week_template = document.createElement("div");
    var dummy_date = this.date.week_start(scheduler._currentDate());

    for (var i = 0; i < 7; i++) {
      this._cols[i] = Math.floor(summ / (7 - i));

      this._render_x_header(i, left, dummy_date, week_template);

      dummy_date = this.date.add(dummy_date, 1, "day");
      summ -= this._cols[i];
      left += this._cols[i];
    }

    week_template.lastChild.className += " dhx_scale_bar_last";
    return week_template;
  };

  scheduler.updateCalendar = function (obj, sd) {
    obj.conf.date = sd;
    this.renderCalendar(obj.conf, obj, true);
  };

  scheduler._mini_cal_arrows = ["&nbsp;", "&nbsp;"];

  scheduler._render_calendar = function (obj, sd, conf, previous) {
    /*store*/
    var ts = scheduler.templates;
    var temp = this._cols;
    this._cols = [];
    var temp2 = this._mode;
    this._mode = "calendar";
    var temp3 = this._colsS;
    this._colsS = {
      height: 0
    };
    var temp4 = new Date(this._min_date);
    var temp5 = new Date(this._max_date);
    var temp6 = new Date(scheduler._date);
    var temp7 = ts.month_day;
    var temp8 = this._ignores_detected;
    this._ignores_detected = 0;
    ts.month_day = ts.calendar_date;
    sd = this.date.month_start(sd);

    var week_template = this._week_template(obj.offsetWidth - 1 - this.config.minicalendar.padding);

    var d;

    if (previous) {
      d = previous;
    } else {
      d = document.createElement("div");
      d.className = "dhx_cal_container dhx_mini_calendar";
    }

    d.setAttribute("date", this._helpers.formatDate(sd));
    d.innerHTML = "<div class='dhx_year_month'></div>" + "<div class='dhx_year_grid" + (scheduler.config.rtl ? " dhx_grid_rtl'>" : "'>") + "<div class='dhx_year_week'>" + (week_template ? week_template.innerHTML : "") + "</div>" + "<div class='dhx_year_body'></div>" + "</div>";
    var header = d.querySelector(".dhx_year_month");
    var weekHeader = d.querySelector(".dhx_year_week");
    var body = d.querySelector(".dhx_year_body");
    header.innerHTML = this.templates.calendar_month(sd);

    if (conf.navigation) {
      var move_minicalendar_date = function move_minicalendar_date(calendar, diff) {
        var date = scheduler.date.add(calendar._date, diff, "month");
        scheduler.updateCalendar(calendar, date);

        if (scheduler._date.getMonth() == calendar._date.getMonth() && scheduler._date.getFullYear() == calendar._date.getFullYear()) {
          scheduler._markCalendarCurrentDate(calendar);
        }
      };

      var css_classnames = ["dhx_cal_prev_button", "dhx_cal_next_button"];
      var css_texts = ["left:1px;top:2px;position:absolute;", "left:auto; right:1px;top:2px;position:absolute;"];
      var diffs = [-1, 1];

      var handler = function handler(diff) {
        return function () {
          if (conf.sync) {
            var calendars = scheduler._synced_minicalendars;

            for (var k = 0; k < calendars.length; k++) {
              move_minicalendar_date(calendars[k], diff);
            }
          } else {
            if (scheduler.config.rtl) {
              diff = -diff;
            }

            move_minicalendar_date(d, diff);
          }
        };
      };

      var labels = [scheduler.locale.labels.prev, scheduler.locale.labels.next];

      for (var j = 0; j < 2; j++) {
        var arrow = document.createElement("div"); //var diff = diffs[j];

        arrow.className = css_classnames[j];

        scheduler._waiAria.headerButtonsAttributes(arrow, labels[j]);

        arrow.style.cssText = css_texts[j];
        arrow.innerHTML = this._mini_cal_arrows[j];
        header.appendChild(arrow);
        minicalDomEvents.attach(arrow, "click", handler(diffs[j]));
      }
    }

    d._date = new Date(sd);
    d.week_start = (sd.getDay() - (this.config.start_on_monday ? 1 : 0) + 7) % 7;
    var dd = d._min_date = this.date.week_start(sd);
    d._max_date = this.date.add(d._min_date, 6, "week");

    this._reset_month_scale(body, sd, dd, 6);

    if (!previous) obj.appendChild(d);
    weekHeader.style.height = weekHeader.childNodes[0].offsetHeight - 1 + "px"; // dhx_year_week should have height property so that day dates would get correct position. dhx_year_week height = height of it's child (with the day name)

    var headerId = scheduler.uid();

    scheduler._waiAria.minicalHeader(header, headerId);

    scheduler._waiAria.minicalGrid(d.querySelector(".dhx_year_grid"), headerId);

    scheduler._waiAria.minicalRow(weekHeader);

    var dayHeaders = weekHeader.querySelectorAll(".dhx_scale_bar");

    for (var i = 0; i < dayHeaders.length; i++) {
      scheduler._waiAria.minicalHeadCell(dayHeaders[i]);
    }

    var dayCells = body.querySelectorAll("td");
    var firstDate = new Date(dd);

    for (var i = 0; i < dayCells.length; i++) {
      scheduler._waiAria.minicalDayCell(dayCells[i], new Date(firstDate));

      firstDate = scheduler.date.add(firstDate, 1, "day");
    }

    scheduler._waiAria.minicalHeader(header, headerId);
    /*restore*/


    this._cols = temp;
    this._mode = temp2;
    this._colsS = temp3;
    this._min_date = temp4;
    this._max_date = temp5;
    scheduler._date = temp6;
    ts.month_day = temp7;
    this._ignores_detected = temp8;
    return d;
  };

  scheduler.destroyCalendar = function (cal, force) {
    if (!cal && this._def_count && this._def_count.firstChild) {
      if (force || new Date().valueOf() - this._def_count._created.valueOf() > 500) cal = this._def_count.firstChild;
    }

    if (!cal) return;
    minicalDomEvents.detachAll(); //cal.onclick = null;

    cal.innerHTML = "";
    if (cal.parentNode) cal.parentNode.removeChild(cal);
    if (this._def_count) this._def_count.style.top = "-1000px";
    if (cal.conf && cal.conf._on_xle_handler) scheduler.detachEvent(cal.conf._on_xle_handler);
  };

  scheduler.isCalendarVisible = function () {
    if (this._def_count && parseInt(this._def_count.style.top, 10) > 0) return this._def_count;
    return false;
  };

  scheduler.attachEvent("onTemplatesReady", function () {
    scheduler.event(document.body, "click", function () {
      scheduler.destroyCalendar();
    });
  }, {
    once: true
  });
  scheduler.templates.calendar_time = scheduler.date.date_to_str("%d-%m-%Y");
  scheduler.form_blocks.calendar_time = {
    render: function render(sns) {
      var html = "<input class='dhx_readonly' type='text' readonly='true'>";
      var cfg = scheduler.config;
      var dt = this.date.date_part(scheduler._currentDate());
      var last = 24 * 60,
          first = 0;

      if (cfg.limit_time_select) {
        first = 60 * cfg.first_hour;
        last = 60 * cfg.last_hour + 1; // to include "17:00" option if time select is limited
      }

      dt.setHours(first / 60);
      sns._time_values = [];
      html += " <select class='dhx_lightbox_time_select'>";

      for (var i = first; i < last; i += this.config.time_step * 1) {
        // `<` to exclude last "00:00" option
        var time = this.templates.time_picker(dt);
        html += "<option value='" + i + "'>" + time + "</option>";

        sns._time_values.push(i);

        dt = this.date.add(dt, this.config.time_step, "minute");
      }

      html += "</select>"; //var full_day = scheduler.config.full_day;

      return "<div style='height:30px;padding-top:0; font-size:inherit;' class='dhx_section_time dhx_lightbox_minical'>" + html + "<span style='font-weight:normal; font-size:10pt;'> &nbsp;&ndash;&nbsp; </span>" + html + "</div>";
    },
    set_value: function set_value(node, value, ev, config) {
      var inputs = node.getElementsByTagName("input");
      var selects = node.getElementsByTagName("select");
      var start_date, end_date;

      var _init_once = function _init_once(inp, date, number) {
        scheduler.event(inp, "click", function () {
          scheduler.destroyCalendar(null, true);
          scheduler.renderCalendar({
            position: inp,
            date: new Date(this._date),
            navigation: true,
            handler: function handler(new_date) {
              inp.value = scheduler.templates.calendar_time(new_date);
              inp._date = new Date(new_date);
              scheduler.destroyCalendar();

              if (scheduler.config.event_duration && scheduler.config.auto_end_date && number === 0) {
                //first element = start date
                _update_minical_select();
              }
            }
          });
        });
      };

      if (scheduler.config.full_day) {
        if (!node._full_day) {
          var html = "<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> " + scheduler.locale.labels.full_day + "&nbsp;</label></input>";
          if (!scheduler.config.wide_form) html = node.previousSibling.innerHTML + html;
          node.previousSibling.innerHTML = html;
          node._full_day = true;
        }

        var input = node.previousSibling.getElementsByTagName("input")[0];
        var isFulldayEvent = scheduler.date.time_part(ev.start_date) === 0 && scheduler.date.time_part(ev.end_date) === 0;
        input.checked = isFulldayEvent;
        selects[0].disabled = input.checked;
        selects[1].disabled = input.checked;

        if (!input.$_eventAttached) {
          input.$_eventAttached = true;
          scheduler.event(input, "click", function () {
            if (input.checked === true) {
              var obj = {};
              scheduler.form_blocks.calendar_time.get_value(node, obj);
              start_date = scheduler.date.date_part(obj.start_date);
              end_date = scheduler.date.date_part(obj.end_date);
              if (+end_date == +start_date || +end_date >= +start_date && (ev.end_date.getHours() !== 0 || ev.end_date.getMinutes() !== 0)) end_date = scheduler.date.add(end_date, 1, "day");
            }

            var start = start_date || ev.start_date;
            var end = end_date || ev.end_date;

            _attach_action(inputs[0], start);

            _attach_action(inputs[1], end);

            selects[0].value = start.getHours() * 60 + start.getMinutes();
            selects[1].value = end.getHours() * 60 + end.getMinutes();
            selects[0].disabled = input.checked;
            selects[1].disabled = input.checked;
          });
        }
      }

      if (scheduler.config.event_duration && scheduler.config.auto_end_date) {
        var _update_minical_select = function _update_minical_select() {
          if (!(scheduler.config.auto_end_date && scheduler.config.event_duration)) {
            // setting may be disabled after the handler is attached
            return;
          }

          start_date = scheduler.date.add(inputs[0]._date, selects[0].value, "minute");
          end_date = new Date(start_date.getTime() + scheduler.config.event_duration * 60 * 1000);
          inputs[1].value = scheduler.templates.calendar_time(end_date);
          inputs[1]._date = scheduler.date.date_part(new Date(end_date));
          selects[1].value = end_date.getHours() * 60 + end_date.getMinutes();
        };

        if (!selects[0].$_eventAttached) {
          selects[0].addEventListener("change", _update_minical_select); // only update on first select should trigger update so user could define other end date if he wishes too
        }
      }

      function _attach_action(inp, date, number) {
        _init_once(inp, date, number);

        inp.value = scheduler.templates.calendar_time(date);
        inp._date = scheduler.date.date_part(new Date(date));
      }

      _attach_action(inputs[0], ev.start_date, 0);

      _attach_action(inputs[1], ev.end_date, 1);

      _init_once = function _init_once() {};

      function _round_minutes(date) {
        var time_values = config._time_values;
        var direct_value = date.getHours() * 60 + date.getMinutes();
        var fixed_value = direct_value;
        var value_found = false;

        for (var k = 0; k < time_values.length; k++) {
          var t_v = time_values[k];

          if (t_v === direct_value) {
            value_found = true;
            break;
          }

          if (t_v < direct_value) fixed_value = t_v;
        }

        if (!(value_found || fixed_value)) return -1;
        return value_found ? direct_value : fixed_value;
      }

      selects[0].value = _round_minutes(ev.start_date);
      selects[1].value = _round_minutes(ev.end_date);
    },
    get_value: function get_value(node, ev) {
      var inputs = node.getElementsByTagName("input");
      var selects = node.getElementsByTagName("select");
      ev.start_date = scheduler.date.add(inputs[0]._date, selects[0].value, "minute");
      ev.end_date = scheduler.date.add(inputs[1]._date, selects[1].value, "minute");
      if (ev.end_date <= ev.start_date) ev.end_date = scheduler.date.add(ev.start_date, scheduler.config.time_step, "minute");
      return {
        start_date: new Date(ev.start_date),
        end_date: new Date(ev.end_date)
      };
    },
    focus: function focus(node) {}
  };

  scheduler.linkCalendar = function (calendar, datediff) {
    var action = function action() {
      var date = scheduler._date;
      var dateNew = new Date(date.valueOf());
      if (datediff) dateNew = datediff(dateNew);
      dateNew.setDate(1);
      scheduler.updateCalendar(calendar, dateNew);
      return true;
    };

    scheduler.attachEvent("onViewChange", action);
    scheduler.attachEvent("onXLE", action);
    scheduler.attachEvent("onEventAdded", action);
    scheduler.attachEvent("onEventChanged", action);
    scheduler.attachEvent("onEventDeleted", action);
    action();
  };

  scheduler._markCalendarCurrentDate = function (calendar) {
    var state = scheduler.getState();
    var from = state.min_date;
    var to = state.max_date;
    var mode = state.mode;
    var month_start = scheduler.date.month_start(new Date(calendar._date));
    var month_end = scheduler.date.add(month_start, 1, "month");
    var noHighlight = {
      "month": true,
      "year": true,
      "agenda": true,
      "grid": true
    }; // no need to highlight current dates for a large range views - agenda, year, etc.

    if (noHighlight[mode] || from.valueOf() <= month_start.valueOf() && to.valueOf() >= month_end.valueOf()) {
      return;
    }

    var current = from;

    while (current.valueOf() < to.valueOf()) {
      if (month_start.valueOf() <= current.valueOf() && month_end > current) {
        scheduler.markCalendar(calendar, current, "dhx_calendar_click");
      }

      current = scheduler.date.add(current, 1, "day");
    }
  };

  scheduler.attachEvent("onEventCancel", function () {
    scheduler.destroyCalendar(null, true);
  });
  scheduler.attachEvent("onDestroy", function () {
    scheduler.destroyCalendar();
  });
});

/***/ }),

/***/ "./sources/ext/monthheight.js":
/*!************************************!*\
  !*** ./sources/ext/monthheight.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.attachEvent("onTemplatesReady", function () {
    scheduler.xy.scroll_width = 0;
    var old = scheduler.render_view_data;

    scheduler.render_view_data = function () {
      var data = this._els["dhx_cal_data"][0];
      data.firstChild._h_fix = true;
      old.apply(scheduler, arguments);
      var height = parseInt(data.style.height);
      data.style.height = "1px";
      data.style.height = data.scrollHeight + "px";
      this._obj.style.height = this._obj.clientHeight + data.scrollHeight - height + "px";
    };

    var old_s = scheduler._reset_month_scale;

    scheduler._reset_month_scale = function (a, b, c, d) {
      var dummy = {
        clientHeight: 100
      };
      old_s.apply(scheduler, [dummy, b, c, d]);
      a.innerHTML = dummy.innerHTML;
    };
  });
});

/***/ }),

/***/ "./sources/ext/multisource.js":
/*!************************************!*\
  !*** ./sources/ext/multisource.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  function backup(obj) {
    var t = function t() {};

    t.prototype = obj;
    return t;
  }

  var old = scheduler._load;

  scheduler._load = function (url, from) {
    url = url || this._load_url;

    if (_typeof(url) == "object") {
      var t = backup(this._loaded);

      for (var i = 0; i < url.length; i++) {
        this._loaded = new t();
        old.call(this, url[i], from);
      }
    } else old.apply(this, arguments);
  };
});

/***/ }),

/***/ "./sources/ext/mvc.js":
/*!****************************!*\
  !*** ./sources/ext/mvc.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  /* global Backbone */
  var cfg = {
    use_id: false
  }; //remove private properties

  function sanitize(ev) {
    var obj = {};

    for (var key in ev) {
      if (key.indexOf("_") !== 0) obj[key] = ev[key];
    }

    if (!cfg.use_id) delete obj.id;
    return obj;
  }

  var update_timer;

  function update_view() {
    clearTimeout(update_timer);
    update_timer = setTimeout(function () {
      scheduler.updateView();
    }, 1);
  }

  function _start_ext_load(cal) {
    cal._loading = true;
    cal._not_render = true;
    cal.callEvent("onXLS", []);
  }

  function _finish_ext_load(cal) {
    cal._not_render = false;
    if (cal._render_wait) cal.render_view_data();
    cal._loading = false;
    cal.callEvent("onXLE", []);
  }

  function _get_id(model) {
    return cfg.use_id ? model.id : model.cid;
  }

  scheduler.backbone = function (events, config) {
    if (config) cfg = config;
    events.bind("change", function (model, info) {
      var cid = _get_id(model);

      var ev = scheduler._events[cid] = model.toJSON();
      ev.id = cid;

      scheduler._init_event(ev);

      update_view();
    });
    events.bind("remove", function (model, changes) {
      var cid = _get_id(model);

      if (scheduler._events[cid]) scheduler.deleteEvent(cid);
    });
    var queue = [];

    function add_from_queue() {
      if (queue.length) {
        scheduler.parse(queue, "json");
        queue = [];
      }
    }

    events.bind("add", function (model, changes) {
      var cid = _get_id(model);

      if (!scheduler._events[cid]) {
        var ev = model.toJSON();
        ev.id = cid;

        scheduler._init_event(ev);

        queue.push(ev);
        if (queue.length == 1) setTimeout(add_from_queue, 1);
      }
    });
    events.bind("request", function (obj) {
      if (obj instanceof Backbone.Collection) _start_ext_load(scheduler);
    });
    events.bind("sync", function (obj) {
      if (obj instanceof Backbone.Collection) _finish_ext_load(scheduler);
    });
    events.bind("error", function (obj) {
      if (obj instanceof Backbone.Collection) _finish_ext_load(scheduler);
    });
    scheduler.attachEvent("onEventCreated", function (id) {
      var ev = new events.model(scheduler.getEvent(id));
      scheduler._events[id] = ev.toJSON();
      scheduler._events[id].id = id;
      return true;
    });
    scheduler.attachEvent("onEventAdded", function (id) {
      if (!events.get(id)) {
        var data = sanitize(scheduler.getEvent(id));
        var model = new events.model(data);

        var cid = _get_id(model);

        if (cid != id) this.changeEventId(id, cid);
        events.add(model);
        events.trigger("scheduler:add", model);
      }

      return true;
    });
    scheduler.attachEvent("onEventChanged", function (id) {
      var ev = events.get(id);
      var upd = sanitize(scheduler.getEvent(id));
      ev.set(upd);
      events.trigger("scheduler:change", ev);
      return true;
    });
    scheduler.attachEvent("onEventDeleted", function (id) {
      var model = events.get(id);

      if (model) {
        events.trigger("scheduler:remove", model);
        events.remove(id);
      }

      return true;
    });
  };
});

/***/ }),

/***/ "./sources/ext/outerdrag.js":
/*!**********************************!*\
  !*** ./sources/ext/outerdrag.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  /* global dhtmlDragAndDropObject, dhtmlx */
  // lame old code doesn't provide raw event object
  scheduler.attachEvent("onTemplatesReady", function () {
    var dragger = new dhtmlDragAndDropObject();
    var old = dragger.stopDrag;
    var last_event;

    dragger.stopDrag = function (e) {
      last_event = e;
      return old.apply(this, arguments);
    };

    function on_drop(sourceHtmlObject, dhtmlObject, targetHtmlObject, targetHtml) {
      if (scheduler.checkEvent("onBeforeExternalDragIn") && !scheduler.callEvent("onBeforeExternalDragIn", [sourceHtmlObject, dhtmlObject, targetHtmlObject, targetHtml, last_event])) return;
      var temp = scheduler.attachEvent("onEventCreated", function (id) {
        if (!scheduler.callEvent("onExternalDragIn", [id, sourceHtmlObject, last_event])) {
          this._drag_mode = this._drag_id = null;
          this.deleteEvent(id);
        }
      });
      var action_data = scheduler.getActionData(last_event);
      var event_data = {
        start_date: new Date(action_data.date)
      }; // custom views, need to assign section id, fix dates

      if (scheduler.matrix && scheduler.matrix[scheduler._mode]) {
        var view_options = scheduler.matrix[scheduler._mode];
        event_data[view_options.y_property] = action_data.section;

        var pos = scheduler._locate_cell_timeline(last_event);

        event_data.start_date = view_options._trace_x[pos.x];
        event_data.end_date = scheduler.date.add(event_data.start_date, view_options.x_step, view_options.x_unit);
      }

      if (scheduler._props && scheduler._props[scheduler._mode]) {
        event_data[scheduler._props[scheduler._mode].map_to] = action_data.section;
      }

      scheduler.addEventNow(event_data);
      scheduler.detachEvent(temp);
    }

    dragger.addDragLanding(scheduler._els["dhx_cal_data"][0], {
      _drag: function _drag(sourceHtmlObject, dhtmlObject, targetHtmlObject, targetHtml) {
        on_drop(sourceHtmlObject, dhtmlObject, targetHtmlObject, targetHtml);
      },
      _dragIn: function _dragIn(htmlObject, shtmlObject) {
        return htmlObject;
      },
      _dragOut: function _dragOut(htmlObject) {
        return this;
      }
    });

    if (dhtmlx.DragControl) {
      dhtmlx.DragControl.addDrop(scheduler._els["dhx_cal_data"][0], {
        onDrop: function onDrop(source, target, d, e) {
          var sourceDhtmlx = dhtmlx.DragControl.getMaster(source);
          last_event = e;
          on_drop(source, sourceDhtmlx, target, e.target || e.srcElement);
        },
        onDragIn: function onDragIn(source, target, e) {
          return target;
        }
      }, true);
    }
  });
});

/***/ }),

/***/ "./sources/ext/pdf.js":
/*!****************************!*\
  !*** ./sources/ext/pdf.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  var dx,
      dy,
      html_regexp = new RegExp("<[^>]*>", "g"),
      newline_regexp = new RegExp("<br[^>]*>", "g");

  function clean_html(val) {
    return val.replace(newline_regexp, "\n").replace(html_regexp, "");
  }

  function x_norm(x, offset) {
    x = parseFloat(x);
    offset = parseFloat(offset);
    if (!isNaN(offset)) x -= offset;
    var w = colsWidth(x);
    x = x - w.width + w.cols * dx;
    return isNaN(x) ? "auto" : 100 * x / dx;
  }

  function x_norm_event(x, offset, is_left) {
    x = parseFloat(x);
    offset = parseFloat(offset);
    if (!isNaN(offset) && is_left) x -= offset;
    var w = colsWidth(x);
    x = x - w.width + w.cols * dx;
    return isNaN(x) ? "auto" : 100 * x / (dx - (!isNaN(offset) ? offset : 0));
  }

  function colsWidth(width) {
    var r = 0;
    var header = scheduler._els.dhx_cal_header[0].childNodes;
    var els = header[1] ? header[1].childNodes : header[0].childNodes;

    for (var i = 0; i < els.length; i++) {
      var el = els[i].style ? els[i] : els[i].parentNode;
      var w = parseFloat(el.style.width);

      if (width > w) {
        width -= w + 1;
        r += w + 1;
      } else break;
    }

    return {
      width: r,
      cols: i
    };
  }

  function y_norm(y) {
    y = parseFloat(y);
    if (isNaN(y)) return "auto";
    return 100 * y / dy;
  }

  function get_style(node, style) {
    return (window.getComputedStyle ? window.getComputedStyle(node, null)[style] : node.currentStyle ? node.currentStyle[style] : null) || "";
  }

  function de_day(node, n) {
    var x = parseInt(node.style.left, 10);

    for (var dx = 0; dx < scheduler._cols.length; dx++) {
      x -= scheduler._cols[dx];
      if (x < 0) return dx;
    }

    return n;
  }

  function de_week(node, n) {
    var y = parseInt(node.style.top, 10);

    for (var dy = 0; dy < scheduler._colsS.heights.length; dy++) {
      if (scheduler._colsS.heights[dy] > y) return dy;
    }

    return n;
  }

  function xml_start(tag) {
    return tag ? "<" + tag + ">" : "";
  }

  function xml_end(tag) {
    return tag ? "</" + tag + ">" : "";
  }

  function xml_top(tag, profile, header, footer) {
    var xml = "<" + tag + " profile='" + profile + "'";
    if (header) xml += " header='" + header + "'";
    if (footer) xml += " footer='" + footer + "'";
    xml += ">";
    return xml;
  }

  function xml_body_header() {
    var xml = ""; // detects if current mode is timeline

    var mode = scheduler._mode;
    if (scheduler.matrix && scheduler.matrix[scheduler._mode]) mode = scheduler.matrix[scheduler._mode].render == "cell" ? "matrix" : "timeline";
    xml += "<scale mode='" + mode + "' today='" + scheduler._els.dhx_cal_date[0].innerHTML + "'>";

    if (scheduler._mode == "week_agenda") {
      var xh = scheduler._els.dhx_cal_data[0].getElementsByTagName("DIV");

      for (var i = 0; i < xh.length; i++) {
        if (xh[i].className == "dhx_wa_scale_bar") xml += "<column>" + clean_html(xh[i].innerHTML) + "</column>";
      }
    } else if (scheduler._mode == "agenda" || scheduler._mode == "map") {
      var xh = scheduler._els.dhx_cal_header[0].childNodes[0].childNodes;
      xml += "<column>" + clean_html(xh[0].innerHTML) + "</column><column>" + clean_html(xh[1].innerHTML) + "</column>";
    } else if (scheduler._mode == "year") {
      var xh = scheduler._els.dhx_cal_data[0].childNodes;

      for (var i = 0; i < xh.length; i++) {
        xml += "<month label='" + clean_html(xh[i].querySelector(".dhx_year_month").innerHTML) + "'>";
        xml += xml_month_scale(xh[i].querySelector(".dhx_year_week").childNodes);
        xml += xml_month(xh[i].querySelector(".dhx_year_body"));
        xml += "</month>";
      }
    } else {
      xml += "<x>";
      var xh = scheduler._els.dhx_cal_header[0].childNodes;
      xml += xml_month_scale(xh);
      xml += "</x>";
      var yh = scheduler._els.dhx_cal_data[0];

      if (scheduler.matrix && scheduler.matrix[scheduler._mode]) {
        xml += "<y>";

        for (var i = 0; i < yh.firstChild.rows.length; i++) {
          var el = yh.firstChild.rows[i];
          xml += "<row><![CDATA[" + clean_html(el.cells[0].innerHTML) + "]]></row>";
        }

        xml += "</y>";
        dy = yh.firstChild.rows[0].cells[0].offsetHeight;
      } else if (yh.firstChild.tagName == "TABLE") {
        xml += xml_month(yh);
      } else {
        yh = yh.childNodes[yh.childNodes.length - 1];

        while (yh.className.indexOf("dhx_scale_holder") == -1) {
          yh = yh.previousSibling;
        }

        yh = yh.childNodes;
        xml += "<y>";

        for (var i = 0; i < yh.length; i++) {
          xml += "\n<row><![CDATA[" + clean_html(yh[i].innerHTML) + "]]></row>";
        }

        xml += "</y>";
        dy = yh[0].offsetHeight;
      }
    }

    xml += "</scale>";
    return xml;
  }

  function xml_month(yh) {
    var xml = "";
    var r = yh.querySelectorAll("tr");

    for (var i = 0; i < r.length; i++) {
      var days = [];
      var cells = r[i].querySelectorAll("td");

      for (var j = 0; j < cells.length; j++) {
        days.push(cells[j].querySelector(".dhx_month_head").innerHTML);
      }

      xml += "\n<row height='" + cells[0].offsetHeight + "'><![CDATA[" + clean_html(days.join("|")) + "]]></row>";
      dy = cells[0].offsetHeight;
    }

    return xml;
  }

  function xml_month_scale(xh) {
    var xhs,
        xml = "";

    if (scheduler.matrix && scheduler.matrix[scheduler._mode]) {
      if (scheduler.matrix[scheduler._mode].second_scale) xhs = xh[1].childNodes;
      xh = xh[0].childNodes;
    }

    for (var i = 0; i < xh.length; i++) {
      xml += "\n<column><![CDATA[" + clean_html(xh[i].innerHTML) + "]]></column>";
    }

    dx = xh[0].offsetWidth;

    if (xhs) {
      var width = 0;
      var top_width = xh[0].offsetWidth;
      var top_col = 1;

      for (var i = 0; i < xhs.length; i++) {
        xml += "\n<column second_scale='" + top_col + "'><![CDATA[" + clean_html(xhs[i].innerHTML) + "]]></column>";
        width += xhs[i].offsetWidth;

        if (width >= top_width) {
          top_width += xh[top_col] ? xh[top_col].offsetWidth : 0;
          top_col++;
        }

        dx = xhs[0].offsetWidth;
      }
    }

    return xml;
  }

  function xml_body(colors) {
    var xml = "";
    var evs = scheduler._rendered;
    var matrix = scheduler.matrix && scheduler.matrix[scheduler._mode];

    if (scheduler._mode == "agenda" || scheduler._mode == "map") {
      for (var i = 0; i < evs.length; i++) {
        xml += "<event><head><![CDATA[" + clean_html(evs[i].childNodes[0].innerHTML) + "]]></head><body><![CDATA[" + clean_html(evs[i].childNodes[2].innerHTML) + "]]></body></event>";
      }
    } else if (scheduler._mode == "week_agenda") {
      for (var i = 0; i < evs.length; i++) {
        xml += "<event day='" + evs[i].parentNode.getAttribute("day") + "'><body>" + clean_html(evs[i].innerHTML) + "</body></event>";
      }
    } else if (scheduler._mode == "year") {
      var evs = scheduler.get_visible_events();

      for (var i = 0; i < evs.length; i++) {
        var d = evs[i].start_date;
        if (d.valueOf() < scheduler._min_date.valueOf()) d = scheduler._min_date;

        while (d < evs[i].end_date) {
          var m = d.getMonth() + 12 * (d.getFullYear() - scheduler._min_date.getFullYear()) - scheduler.week_starts._month;

          var day = scheduler.week_starts[m] + d.getDate() - 1;
          var text_color = colors ? get_style(scheduler._get_year_cell(d), "color") : "";
          var bg_color = colors ? get_style(scheduler._get_year_cell(d), "backgroundColor") : "";
          xml += "<event day='" + day % 7 + "' week='" + Math.floor(day / 7) + "' month='" + m + "' backgroundColor='" + bg_color + "' color='" + text_color + "'></event>";
          d = scheduler.date.add(d, 1, "day");
          if (d.valueOf() >= scheduler._max_date.valueOf()) break;
        }
      }
    } else if (matrix && matrix.render == "cell") {
      var evs = scheduler._els.dhx_cal_data[0].getElementsByTagName("TD");

      for (var i = 0; i < evs.length; i++) {
        var text_color = colors ? get_style(evs[i], "color") : "";
        var bg_color = colors ? get_style(evs[i], "backgroundColor") : "";
        xml += "\n<event><body backgroundColor='" + bg_color + "' color='" + text_color + "'><![CDATA[" + clean_html(evs[i].innerHTML) + "]]></body></event>";
      }
    } else {
      for (var i = 0; i < evs.length; i++) {
        var zx, zdx;

        if (scheduler.matrix && scheduler.matrix[scheduler._mode]) {
          // logic for timeline view
          zx = x_norm(evs[i].style.left);
          zdx = x_norm(evs[i].offsetWidth) - 1;
        } else {
          // we should use specific logic for day/week/units view
          var left_norm = scheduler.config.use_select_menu_space ? 0 : 26;
          zx = x_norm_event(evs[i].style.left, left_norm, true);
          zdx = x_norm_event(evs[i].style.width, left_norm) - 1;
        }

        if (isNaN(zdx * 1)) continue;
        var zy = y_norm(evs[i].style.top);
        var zdy = y_norm(evs[i].style.height);
        var e_type = evs[i].className.split(" ")[0].replace("dhx_cal_", "");
        if (e_type === 'dhx_tooltip_line') continue;
        var dets = scheduler.getEvent(evs[i].getAttribute(scheduler.config.event_attribute));
        if (!dets) continue;
        var day = dets._sday;
        var week = dets._sweek;
        var length = dets._length || 0;

        if (scheduler._mode == "month") {
          zdy = parseInt(evs[i].offsetHeight, 10);
          zy = parseInt(evs[i].style.top, 10) - scheduler.xy.month_head_height;
          day = de_day(evs[i], day);
          week = de_week(evs[i], week);
        } else if (scheduler.matrix && scheduler.matrix[scheduler._mode]) {
          day = 0;
          var el = evs[i].parentNode.parentNode.parentNode;
          week = el.rowIndex;
          var dy_copy = dy;
          dy = evs[i].parentNode.offsetHeight;
          zy = y_norm(evs[i].style.top);
          zy -= zy * 0.2;
          dy = dy_copy;
        } else {
          if (evs[i].parentNode == scheduler._els.dhx_cal_data[0]) continue;
          var parent = scheduler._els["dhx_cal_data"][0].childNodes[0];
          var offset = parseFloat(parent.className.indexOf("dhx_scale_holder") != -1 ? parent.style.left : 0);
          zx += x_norm(evs[i].parentNode.style.left, offset);
        }

        xml += "\n<event week='" + week + "' day='" + day + "' type='" + e_type + "' x='" + zx + "' y='" + zy + "' width='" + zdx + "' height='" + zdy + "' len='" + length + "'>";

        if (e_type == "event") {
          xml += "<header><![CDATA[" + clean_html(evs[i].childNodes[1].innerHTML) + "]]></header>";
          var text_color = colors ? get_style(evs[i].childNodes[2], "color") : "";
          var bg_color = colors ? get_style(evs[i].childNodes[2], "backgroundColor") : "";
          xml += "<body backgroundColor='" + bg_color + "' color='" + text_color + "'><![CDATA[" + clean_html(evs[i].childNodes[2].innerHTML) + "]]></body>";
        } else {
          var text_color = colors ? get_style(evs[i], "color") : "";
          var bg_color = colors ? get_style(evs[i], "backgroundColor") : "";
          xml += "<body backgroundColor='" + bg_color + "' color='" + text_color + "'><![CDATA[" + clean_html(evs[i].innerHTML) + "]]></body>";
        }

        xml += "</event>";
      }
    }

    return xml;
  }

  function toXML(start, end, view, mode, header, footer) {
    var colors = false;

    if (mode == "fullcolor") {
      colors = true;
      mode = "color";
    }

    mode = mode || "color";
    var xml = "";

    if (start) {
      var original_date = scheduler._date;
      var original_mode = scheduler._mode;
      end = scheduler.date[view + "_start"](end);
      end = scheduler.date["get_" + view + "_end"] ? scheduler.date["get_" + view + "_end"](end) : scheduler.date.add(end, 1, view);
      xml = xml_top("pages", mode, header, footer);

      for (var temp_date = new Date(start); +temp_date < +end; temp_date = this.date.add(temp_date, 1, view)) {
        this.setCurrentView(temp_date, view);
        xml += xml_start("page") + xml_body_header().replace("\u2013", "-") + xml_body(colors) + xml_end("page");
      }

      xml += xml_end("pages");
      this.setCurrentView(original_date, original_mode);
    } else {
      xml = xml_top("data", mode, header, footer) + xml_body_header().replace("\u2013", "-") + xml_body(colors) + xml_end("data");
    }

    return xml;
  }

  scheduler.getPDFData = toXML;

  function send_xml(xml, url) {
    var uid = scheduler.uid();
    var d = document.createElement("div");
    d.style.display = "none";
    document.body.appendChild(d);
    d.innerHTML = '<form id="' + uid + '" method="post" target="_blank" action="' + url + '" accept-charset="utf-8" enctype="application/x-www-form-urlencoded"><input type="hidden" name="mycoolxmlbody"/> </form>';
    document.getElementById(uid).firstChild.value = encodeURIComponent(xml);
    document.getElementById(uid).submit();
    d.parentNode.removeChild(d);
  }

  function to_pdf(start, end, view, url, mode, header, footer) {
    var xml = "";

    if (_typeof(mode) == "object") {
      xml = schedulersToPdf(mode);
    } else {
      xml = toXML.apply(this, [start, end, view, mode, header, footer]);
    }

    send_xml(xml, url);
  }

  function schedulersToPdf(objects) {
    var xml = "<data>";

    for (var i = 0; i < objects.length; i++) {
      xml += objects[i].source.getPDFData(objects[i].start, objects[i].end, objects[i].view, objects[i].mode, objects[i].header, objects[i].footer);
    }

    xml += "</data>";
    return xml;
  }
  /*
   * scheduler.toPDF(url, mode, header, footer) - for a single scheduler
   * scheduler.toPDF(url, [scheduler1, scheduler2,...]) - for multiple schedulers
   * example:
   * scheduler.toPDF("generate.ashx", [
   *     { source: scheduler1, mode: "color" },
   *     { source: scheduler2, mode: "gray", view:"week", start:new Date(2013, 06, 1), end:new Date(2013, 06, 28) },
   *     { source: scheduler3 }
   * ]);
   *
   */


  scheduler.toPDF = function (url, mode, header, footer) {
    return to_pdf.apply(this, [null, null, null, url, mode, header, footer]);
  };

  scheduler.toPDFRange = function (start, end, view, url, mode, header, footer) {
    if (typeof start == "string") {
      start = scheduler.templates.api_date(start);
      end = scheduler.templates.api_date(end);
    }

    return to_pdf.apply(this, arguments);
  };
});

/***/ }),

/***/ "./sources/ext/quick_info.js":
/*!***********************************!*\
  !*** ./sources/ext/quick_info.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.config.icons_select = ["icon_details", "icon_delete"];
  scheduler.config.details_on_create = true;
  scheduler.config.show_quick_info = true;
  scheduler.xy.menu_width = 0;
  scheduler.attachEvent("onClick", function (id) {
    if (!scheduler.config.show_quick_info) {
      return;
    }

    scheduler.showQuickInfo(id);
    return true;
  });

  (function () {
    // pass `force` argument in order to hide quick info synchronously
    // so it won't affect showQuickInfo call that can follow
    var events = ["onEmptyClick", "onViewChange", "onLightbox", "onBeforeEventDelete", "onBeforeDrag"];

    var hiding_function = function hiding_function() {
      scheduler.hideQuickInfo(true);
      return true;
    };

    for (var i = 0; i < events.length; i++) {
      scheduler.attachEvent(events[i], hiding_function);
    }
  })();

  scheduler.templates.quick_info_title = function (start, end, ev) {
    return ev.text.substr(0, 50);
  };

  scheduler.templates.quick_info_content = function (start, end, ev) {
    return ev.details || ev.text;
  };

  scheduler.templates.quick_info_date = function (start, end, ev) {
    if (scheduler.isOneDayEvent(ev) && scheduler.config.rtl) {
      return scheduler.templates.day_date(start, end, ev) + " " + scheduler.templates.event_header(end, start, ev);
    } else if (scheduler.isOneDayEvent(ev)) {
      return scheduler.templates.day_date(start, end, ev) + " " + scheduler.templates.event_header(start, end, ev);
    } else if (scheduler.config.rtl) {
      return scheduler.templates.week_date(end, start, ev);
    } else {
      return scheduler.templates.week_date(start, end, ev);
    }
  };

  scheduler.showQuickInfo = function (id) {
    if (id == this._quick_info_box_id) return;
    this.hideQuickInfo(true);

    if (this.callEvent("onBeforeQuickInfo", [id]) === false) {
      return;
    }

    var pos = this._get_event_counter_part(id);

    if (pos) {
      this._quick_info_box = this._init_quick_info(pos);

      this._fill_quick_data(id);

      this._show_quick_info(pos);

      this.callEvent("onQuickInfo", [id]);
    }
  };

  (function () {
    function cssTimeToMs(time) {
      time = time || "";
      var num = parseFloat(time),
          unit = time.match(/m?s/),
          milliseconds;

      if (unit) {
        unit = unit[0];
      }

      switch (unit) {
        case "s":
          // seconds
          milliseconds = num * 1000;
          break;

        case "ms":
          // milliseconds
          milliseconds = num;
          break;

        default:
          milliseconds = 0;
          break;
      }

      return milliseconds;
    }

    scheduler.hideQuickInfo = function (forced) {
      var qi = this._quick_info_box;
      var eventId = this._quick_info_box_id;
      this._quick_info_box_id = 0;

      if (qi && qi.parentNode) {
        var width = qi.offsetWidth;

        if (scheduler.config.quick_info_detached) {
          this.callEvent("onAfterQuickInfo", [eventId]);
          return qi.parentNode.removeChild(qi);
        }

        if (qi.style.right == "auto") qi.style.left = -width + "px";else qi.style.right = -width + "px";

        if (forced) {
          qi.parentNode.removeChild(qi);
        } else {
          var style;

          if (window.getComputedStyle) {
            style = window.getComputedStyle(qi, null);
          } else if (qi.currentStyle) {
            style = qi.currentStyle;
          }

          var delay = cssTimeToMs(style["transition-delay"]) + cssTimeToMs(style["transition-duration"]);
          setTimeout(function () {
            if (qi.parentNode) {
              qi.parentNode.removeChild(qi);
            }
          }, delay);
        }

        this.callEvent("onAfterQuickInfo", [eventId]);
      }
    };
  })();

  scheduler.event(window, "keydown", function (e) {
    if (e.keyCode == 27) scheduler.hideQuickInfo();
  });

  scheduler._show_quick_info = function (pos) {
    var qi = scheduler._quick_info_box;

    scheduler._obj.appendChild(qi);

    var width = qi.offsetWidth;
    var height = qi.offsetHeight;

    if (scheduler.config.quick_info_detached) {
      var left = pos.left - pos.dx * (width - pos.width);
      var right = left + width;

      if (right > window.innerWidth) {
        left = window.innerWidth - width;
      }

      left = Math.max(0, left);
      qi.style.left = left + "px";
      qi.style.top = pos.top - (pos.dy ? height : -pos.height) + "px";
    } else {
      qi.style.top = this.xy.scale_height + this.xy.nav_height + 20 + "px";

      if (pos.dx == 1) {
        qi.style.right = "auto";
        qi.style.left = -width + "px";
        setTimeout(function () {
          qi.style.left = "-10px";
        }, 1);
      } else {
        qi.style.left = "auto";
        qi.style.right = -width + "px";
        setTimeout(function () {
          qi.style.right = "-10px";
        }, 1);
      }

      qi.className = qi.className.replace(" dhx_qi_left", "").replace(" dhx_qi_right", "") + " dhx_qi_" + (pos.dx == 1 ? "left" : "right");
    }
  };

  scheduler.attachEvent("onTemplatesReady", function () {
    scheduler.hideQuickInfo();

    if (this._quick_info_box) {
      var box = this._quick_info_box;

      if (box.parentNode) {
        box.parentNode.removeChild(box);
      }

      this._quick_info_box = null;
    }
  });

  scheduler._quick_info_onscroll_handler = function (e) {
    scheduler.hideQuickInfo();
  };

  scheduler._init_quick_info = function () {
    if (!this._quick_info_box) {
      var sizes = scheduler.xy;
      var qi = this._quick_info_box = document.createElement("div");

      this._waiAria.quickInfoAttr(qi);

      qi.className = "dhx_cal_quick_info";
      if (scheduler.$testmode) qi.className += " dhx_no_animate";
      if (scheduler.config.rtl) qi.className += " dhx_quick_info_rtl"; //title

      var ariaAttr = this._waiAria.quickInfoHeaderAttrString();

      var html = "<div class=\"dhx_cal_qi_title\" style=\"height:" + sizes.quick_info_title + "px\" " + ariaAttr + ">" + "<div class=\"dhx_cal_qi_tcontent\"></div><div  class=\"dhx_cal_qi_tdate\"></div>" + "</div>" + "<div class=\"dhx_cal_qi_content\"></div>"; //buttons

      html += "<div class=\"dhx_cal_qi_controls\" style=\"height:" + sizes.quick_info_buttons + "px\">";
      var buttons = scheduler.config.icons_select;

      for (var i = 0; i < buttons.length; i++) {
        var ariaAttr = this._waiAria.quickInfoButtonAttrString(this.locale.labels[buttons[i]]);

        html += "<div " + ariaAttr + " class=\"dhx_qi_big_icon " + buttons[i] + "\" title=\"" + scheduler.locale.labels[buttons[i]] + "\"><div class='dhx_menu_icon " + buttons[i] + "'></div><div>" + scheduler.locale.labels[buttons[i]] + "</div></div>";
      } // }


      html += "</div>";
      qi.innerHTML = html;
      scheduler.event(qi, "click", function (ev) {
        scheduler._qi_button_click(ev.target || ev.srcElement);
      });

      if (scheduler.config.quick_info_detached) {
        scheduler._detachDomEvent(scheduler._els["dhx_cal_data"][0], "scroll", scheduler._quick_info_onscroll_handler);

        scheduler.event(scheduler._els["dhx_cal_data"][0], "scroll", scheduler._quick_info_onscroll_handler);
      }
    }

    return this._quick_info_box;
  };

  scheduler._qi_button_click = function (node) {
    var box = scheduler._quick_info_box;
    if (!node || node == box) return;

    var mask = scheduler._getClassName(node);

    if (mask.indexOf("_icon") != -1) {
      var id = scheduler._quick_info_box_id;

      scheduler._click.buttons[mask.split(" ")[1].replace("icon_", "")](id);
    } else scheduler._qi_button_click(node.parentNode);
  };

  scheduler._get_event_counter_part = function (id) {
    var domEv = scheduler.getRenderedEvent(id);
    var left = 0;
    var top = 0;
    var node = domEv;

    while (node && node != scheduler._obj) {
      left += node.offsetLeft;
      top += node.offsetTop - node.scrollTop;
      node = node.offsetParent;
    }

    if (node) {
      var dx = left + domEv.offsetWidth / 2 > scheduler._x / 2 ? 1 : 0;
      var dy = top + domEv.offsetHeight / 2 > scheduler._y / 2 ? 1 : 0;
      return {
        left: left,
        top: top,
        dx: dx,
        dy: dy,
        width: domEv.offsetWidth,
        height: domEv.offsetHeight
      };
    }

    return 0;
  };

  scheduler._fill_quick_data = function (id) {
    var ev = scheduler.getEvent(id);
    var qi = scheduler._quick_info_box;
    scheduler._quick_info_box_id = id; //title content

    var header = {
      content: scheduler.templates.quick_info_title(ev.start_date, ev.end_date, ev),
      date: scheduler.templates.quick_info_date(ev.start_date, ev.end_date, ev)
    };
    var titleContent = qi.firstChild.firstChild;
    titleContent.innerHTML = header.content;
    var titleDate = titleContent.nextSibling;
    titleDate.innerHTML = header.date;

    scheduler._waiAria.quickInfoHeader(qi, [header.content, header.date].join(" ")); //main content


    var main = qi.firstChild.nextSibling;
    main.innerHTML = scheduler.templates.quick_info_content(ev.start_date, ev.end_date, ev);
  };
});

/***/ }),

/***/ "./sources/ext/readonly.js":
/*!*********************************!*\
  !*** ./sources/ext/readonly.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.attachEvent("onTemplatesReady", function () {
    var originalRecurringSetValue;

    if (scheduler.form_blocks.recurring) {
      originalRecurringSetValue = scheduler.form_blocks.recurring.set_value;
    }

    var original_left_buttons = scheduler.config.buttons_left.slice();
    var original_right_buttons = scheduler.config.buttons_right.slice();
    scheduler.attachEvent("onBeforeLightbox", function (id) {
      if (this.config.readonly_form || this.getEvent(id).readonly) {
        this.config.readonly_active = true;
      } else {
        this.config.readonly_active = false;
        scheduler.config.buttons_left = original_left_buttons.slice();
        scheduler.config.buttons_right = original_right_buttons.slice(); // initial value

        if (scheduler.form_blocks.recurring) {
          scheduler.form_blocks.recurring.set_value = originalRecurringSetValue;
        }
      }

      var sns = this.config.lightbox.sections;

      if (this.config.readonly_active) {
        for (var i = 0; i < sns.length; i++) {
          if (sns[i].type == 'recurring') {
            if (this.config.readonly_active && scheduler.form_blocks.recurring) {
              scheduler.form_blocks.recurring.set_value = function (node, value, ev) {
                var wrapper = scheduler.$domHelpers.closest(node, ".dhx_wrap_section");
                var style = "none";
                wrapper.querySelector('.dhx_cal_lsection').display = style;
                wrapper.querySelector('.dhx_form_repeat').display = style;
                wrapper.style.display = style;
                scheduler.setLightboxSize();
              };
            }
          }
        }

        var forbidden_buttons = ["dhx_delete_btn", "dhx_save_btn"];
        var button_arrays = [scheduler.config.buttons_left, scheduler.config.buttons_right];

        for (var i = 0; i < forbidden_buttons.length; i++) {
          var forbidden_button = forbidden_buttons[i];

          for (var k = 0; k < button_arrays.length; k++) {
            var button_array = button_arrays[k];
            var index = -1;

            for (var p = 0; p < button_array.length; p++) {
              if (button_array[p] == forbidden_button) {
                index = p;
                break;
              }
            }

            if (index != -1) {
              button_array.splice(index, 1);
            }
          }
        }
      }

      this.resetLightbox();
      return true;
    });

    function txt_replace(tag, d, n, text) {
      var txts = d.getElementsByTagName(tag);
      var txtt = n.getElementsByTagName(tag);

      for (var i = txtt.length - 1; i >= 0; i--) {
        var n = txtt[i];

        if (!text) {
          n.disabled = true; //radio and checkboxes loses state after .cloneNode in IE

          if (d.checked) n.checked = true;
        } else {
          var t = document.createElement("span");
          t.className = "dhx_text_disabled";
          t.innerHTML = text(txts[i]);
          n.parentNode.insertBefore(t, n);
          n.parentNode.removeChild(n);
        }
      }
    }

    var old = scheduler._fill_lightbox;

    scheduler._fill_lightbox = function () {
      var lb = this.getLightbox();

      if (this.config.readonly_active) {
        lb.style.visibility = 'hidden'; // lightbox should have actual sizes before rendering controls
        // currently only matters for dhtmlxCombo

        lb.style.display = 'block';
      }

      var res = old.apply(this, arguments);

      if (this.config.readonly_active) {
        //reset visibility and display
        lb.style.visibility = '';
        lb.style.display = 'none';
      }

      if (this.config.readonly_active) {
        var d = this.getLightbox();
        var n = this._lightbox_r = d.cloneNode(true);
        n.id = scheduler.uid();
        n.className += " dhx_cal_light_readonly";
        txt_replace("textarea", d, n, function (a) {
          return a.value;
        });
        txt_replace("input", d, n, false);
        txt_replace("select", d, n, function (a) {
          if (!a.options.length) return "";
          return a.options[Math.max(a.selectedIndex || 0, 0)].text;
        });
        d.parentNode.insertBefore(n, d);
        olds.call(this, n);
        if (scheduler._lightbox) scheduler._lightbox.parentNode.removeChild(scheduler._lightbox);
        this._lightbox = n;
        if (scheduler.config.drag_lightbox) scheduler.event(n.firstChild, "mousedown", scheduler._ready_to_dnd);

        scheduler._init_lightbox_events();

        this.setLightboxSize();
      }

      return res;
    };

    var olds = scheduler.showCover;

    scheduler.showCover = function () {
      if (!this.config.readonly_active) olds.apply(this, arguments);
    };

    var hold = scheduler.hide_lightbox;

    scheduler.hide_lightbox = function () {
      if (this._lightbox_r) {
        this._lightbox_r.parentNode.removeChild(this._lightbox_r);

        this._lightbox_r = this._lightbox = null;
      }

      return hold.apply(this, arguments);
    };
  });
});

/***/ }),

/***/ "./sources/ext/recurring.js":
/*!**********************************!*\
  !*** ./sources/ext/recurring.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.config.occurrence_timestamp_in_utc = false;
  scheduler.config.recurring_workdays = [1, 2, 3, 4, 5];
  scheduler.form_blocks["recurring"] = {
    _get_node: function _get_node(node) {
      if (typeof node == "string") node = document.getElementById(node);
      if (node.style.display == 'none') node.style.display = "";
      return node;
    },
    _outer_html: function _outer_html(node) {
      return node.outerHTML || getOuterHTML(node); //probably not needed, FF v10- only

      function getOuterHTML(n) {
        var div = document.createElement('div'),
            h;
        div.appendChild(n.cloneNode(true));
        h = div.innerHTML;
        div = null;
        return h;
      }
    },
    render: function render(sns) {
      if (sns.form) {
        var rec = scheduler.form_blocks["recurring"];

        var form = rec._get_node(sns.form);

        var html = rec._outer_html(form);

        form.style.display = 'none';
        return html;
      }

      var loc = scheduler.locale.labels;
      return '<div class="dhx_form_repeat"> ' + '<form> ' + '<div class="dhx_repeat_left"> ' + '<label><input class="dhx_repeat_radio" type="radio" name="repeat" value="day" />' + loc.repeat_radio_day + '</label><br /> ' + '<label><input class="dhx_repeat_radio" type="radio" name="repeat" value="week"/>' + loc.repeat_radio_week + '</label><br /> ' + '<label><input class="dhx_repeat_radio" type="radio" name="repeat" value="month" checked />' + loc.repeat_radio_month + '</label><br /> ' + '<label><input class="dhx_repeat_radio" type="radio" name="repeat" value="year" />' + loc.repeat_radio_year + '</label> ' + '</div> ' + '<div class="dhx_repeat_divider">' + '</div> ' + '<div class="dhx_repeat_center"> ' + '<div style="display:none;" id="dhx_repeat_day"> ' + '<label><input class="dhx_repeat_radio" type="radio" name="day_type" value="d"/>' + loc.repeat_radio_day_type + '</label>' + '<label><input class="dhx_repeat_text" type="text" name="day_count" value="1" />' + loc.repeat_text_day_count + '</label><br /> ' + '<label><input class="dhx_repeat_radio" type="radio" name="day_type" checked value="w"/>' + loc.repeat_radio_day_type2 + '</label> ' + '</div> ' + '<div style="display:none;" id="dhx_repeat_week">' + '<label>' + loc.repeat_week + '<input class="dhx_repeat_text" type="text" name="week_count" value="1" /></label>' + '<span>' + loc.repeat_text_week_count + '</span><br /> ' + '<table class="dhx_repeat_days"> ' + '<tr> ' + '<td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="1" />' + loc.day_for_recurring[1] + '</label><br /> ' + '<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="4" />' + loc.day_for_recurring[4] + '</label> </td> ' + '<td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="2" />' + loc.day_for_recurring[2] + '</label><br /> ' + '<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="5" />' + loc.day_for_recurring[5] + '</label> </td> ' + '<td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="3" />' + loc.day_for_recurring[3] + '</label><br /> ' + '<label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="6" />' + loc.day_for_recurring[6] + '</label> </td> ' + '<td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="0" />' + loc.day_for_recurring[0] + '</label><br /><br /> </td> ' + '</tr> ' + '</table> ' + '</div> ' + '<div id="dhx_repeat_month"> ' + '<label class = "dhx_repeat_month_label"><input class="dhx_repeat_radio" type="radio" name="month_type" value="d"/>' + loc.repeat_radio_month_type + '</label>' + '<label><input class="dhx_repeat_text" type="text" name="month_day" value="1" />' + loc.repeat_text_month_day + '</label>' + '<label><input class="dhx_repeat_text" type="text" name="month_count" value="1" />' + loc.repeat_text_month_count + '</label><br /> ' + '<label class = "dhx_repeat_month_label"><input class="dhx_repeat_radio" type="radio" name="month_type" checked value="w"/>' + loc.repeat_radio_month_start + '</label>' + '<input class="dhx_repeat_text" type="text" name="month_week2" value="1" />' + '<label>' + '<select name="month_day2">' + '	<option value="1" selected >' + scheduler.locale.date.day_full[1] + '<option value="2">' + scheduler.locale.date.day_full[2] + '<option value="3">' + scheduler.locale.date.day_full[3] + '<option value="4">' + scheduler.locale.date.day_full[4] + '<option value="5">' + scheduler.locale.date.day_full[5] + '<option value="6">' + scheduler.locale.date.day_full[6] + '<option value="0">' + scheduler.locale.date.day_full[0] + '</select>' + loc.repeat_text_month_count2_before + '</label>' + '<label><input class="dhx_repeat_text" type="text" name="month_count2" value="1" />' + loc.repeat_text_month_count2_after + '</label><br /> ' + '</div> ' + '<div style="display:none;" id="dhx_repeat_year"> ' + '<label class = "dhx_repeat_year_label"><input class="dhx_repeat_radio" type="radio" name="year_type" value="d"/>' + loc.repeat_radio_day_type + '</label>' + '<label><input class="dhx_repeat_text" type="text" name="year_day" value="1" />' + loc.repeat_text_year_day + '</label>' + '<label>' + '<select name="year_month">' + '<option value="0" selected >' + loc.month_for_recurring[0] + '<option value="1">' + loc.month_for_recurring[1] + '<option value="2">' + loc.month_for_recurring[2] + '<option value="3">' + loc.month_for_recurring[3] + '<option value="4">' + loc.month_for_recurring[4] + '<option value="5">' + loc.month_for_recurring[5] + '<option value="6">' + loc.month_for_recurring[6] + '<option value="7">' + loc.month_for_recurring[7] + '<option value="8">' + loc.month_for_recurring[8] + '<option value="9">' + loc.month_for_recurring[9] + '<option value="10">' + loc.month_for_recurring[10] + '<option value="11">' + loc.month_for_recurring[11] + '</select>' + loc.select_year_month + '</label><br /> ' + '<label class = "dhx_repeat_year_label"><input class="dhx_repeat_radio" type="radio" name="year_type" checked value="w"/>' + loc.repeat_year_label + '</label>' + '<input class="dhx_repeat_text" type="text" name="year_week2" value="1" />' + '<select name="year_day2">' + '<option value="1" selected >' + scheduler.locale.date.day_full[1] + '<option value="2">' + scheduler.locale.date.day_full[2] + '<option value="3">' + scheduler.locale.date.day_full[3] + '<option value="4">' + scheduler.locale.date.day_full[4] + '<option value="5">' + scheduler.locale.date.day_full[5] + '<option value="6">' + scheduler.locale.date.day_full[6] + '<option value="7">' + scheduler.locale.date.day_full[0] + '</select>' + loc.select_year_day2 + '<select name="year_month2">' + '<option value="0" selected >' + loc.month_for_recurring[0] + '<option value="1">' + loc.month_for_recurring[1] + '<option value="2">' + loc.month_for_recurring[2] + '<option value="3">' + loc.month_for_recurring[3] + '<option value="4">' + loc.month_for_recurring[4] + '<option value="5">' + loc.month_for_recurring[5] + '<option value="6">' + loc.month_for_recurring[6] + '<option value="7">' + loc.month_for_recurring[7] + '<option value="8">' + loc.month_for_recurring[8] + '<option value="9">' + loc.month_for_recurring[9] + '<option value="10">' + loc.month_for_recurring[10] + '<option value="11">' + loc.month_for_recurring[11] + '</select><br /> ' + '</div> ' + '</div> ' + '<div class="dhx_repeat_divider">' + '</div> ' + '<div class="dhx_repeat_right"> ' + '<label><input class="dhx_repeat_radio" type="radio" name="end" checked/>' + loc.repeat_radio_end + '</label><br /> ' + '<label><input class="dhx_repeat_radio" type="radio" name="end" />' + loc.repeat_radio_end2 + '</label>' + '<input class="dhx_repeat_text" type="text" name="occurences_count" value="1" />' + loc.repeat_text_occurences_count + '<br /> ' + '<label><input class="dhx_repeat_radio" type="radio" name="end" />' + loc.repeat_radio_end3 + '</label>' + '<input class="dhx_repeat_date" type="text" name="date_of_end" value="' + scheduler.config.repeat_date_of_end + '" /><br /> ' + '</div> ' + '</form> ' + '</div> ' + '<div style="clear:both"> ' + '</div>';
    },
    _ds: {},
    _get_form_node: function _get_form_node(els, name, value) {
      var col = els[name];
      if (!col) return null;
      if (col.nodeName) return col;

      if (col.length) {
        for (var i = 0; i < col.length; i++) {
          if (col[i].value == value) return col[i];
        }
      }
    },
    _get_node_value: function _get_node_value(els, name, multiselect) {
      var col = els[name];
      if (!col) return "";

      if (col.length) {
        if (multiselect) {
          var res = [];

          for (var i = 0; i < col.length; i++) {
            if (col[i].checked) res.push(col[i].value);
          }

          return res;
        } else {
          for (var i = 0; i < col.length; i++) {
            if (col[i].checked) return col[i].value;
          }
        }
      }

      if (col.value) return !multiselect ? col.value : [col.value];
    },
    _get_node_numeric_value: function _get_node_numeric_value(els, name) {
      var value = scheduler.form_blocks["recurring"]._get_node_value(els, name);

      return value * 1 || 0;
    },
    _set_node_value: function _set_node_value(els, name, value) {
      var col = els[name];
      if (!col) return;

      if (col.name == name) {
        col.value = value;
      } else if (col.length) {
        var hash_value = _typeof(value) == "object";

        for (var i = 0; i < col.length; i++) {
          if (hash_value || col[i].value == value) {
            col[i].checked = hash_value ? !!value[col[i].value] : !!value;
          }
        }
      }
    },
    _init_set_value: function _init_set_value(node, value, ev) {
      var block = scheduler.form_blocks["recurring"];
      var get_value = block._get_node_value;
      var set_value = block._set_node_value;
      scheduler.form_blocks["recurring"]._ds = {
        start: ev.start_date,
        end: ev._end_date
      };
      var str_date_format = scheduler.date.str_to_date(scheduler.config.repeat_date, false, true);

      var str_date = function str_date(_str_date) {
        var date = str_date_format(_str_date);
        if (scheduler.config.include_end_by) date = scheduler.date.add(date, 1, 'day');
        return date;
      };

      var date_str = scheduler.date.date_to_str(scheduler.config.repeat_date);
      var top = node.getElementsByTagName("FORM")[0];
      var els = {};

      function register_els(inps) {
        for (var i = 0; i < inps.length; i++) {
          var inp = inps[i];

          if (inp.name) {
            if (!els[inp.name]) {
              els[inp.name] = inp;
            } else if (els[inp.name].nodeType) {
              var node = els[inp.name];
              els[inp.name] = [node, inp];
            } else {
              els[inp.name].push(inp);
            }
          }
        }
      }

      register_els(top.getElementsByTagName("INPUT"));
      register_els(top.getElementsByTagName("SELECT"));

      if (!scheduler.config.repeat_date_of_end) {
        var formatter = scheduler.date.date_to_str(scheduler.config.repeat_date);
        scheduler.config.repeat_date_of_end = formatter(scheduler.date.add(scheduler._currentDate(), 30, "day"));
      }

      set_value(els, "date_of_end", scheduler.config.repeat_date_of_end);

      var $ = function $(a) {
        return document.getElementById(a) || {
          style: {}
        }; //return fake object if node not found
      };

      function change_current_view() {
        $("dhx_repeat_day").style.display = "none";
        $("dhx_repeat_week").style.display = "none";
        $("dhx_repeat_month").style.display = "none";
        $("dhx_repeat_year").style.display = "none";
        $("dhx_repeat_" + this.value).style.display = "block";
        scheduler.setLightboxSize();
      }

      function get_repeat_code(dates) {
        var code = [get_value(els, "repeat")];
        get_rcode[code[0]](code, dates);

        while (code.length < 5) {
          code.push("");
        }

        var repeat = "";
        var end = get_end_rule(els);

        if (end == "no") {
          dates.end = new Date(9999, 1, 1);
          repeat = "no";
        } else if (end == "date_of_end") {
          dates.end = str_date(get_value(els, "date_of_end"));
        } else {
          scheduler.transpose_type(code.join("_"));
          repeat = Math.max(1, get_value(els, "occurences_count"));
          var transp = 0; //var transp = ((code[0] == "week" && code[4] && code[4].toString().indexOf(scheduler.config.start_on_monday ? 1 : 0) == -1) ? 1 : 0);
          // which is equal to following code, seems to produce extra instance, not clear why needed

          /*if(code[0] == "week"){
          	var days = code[4] || "";
          	if(scheduler.config.start_on_monday){
          		if(days.indexOf(1) == -1)
          		transp = 1;
          	}else{
          		if(days.indexOf(0) == -1)
          		transp = 1;
          	}
          }*/
          //	dates.end = scheduler.date.add(new Date(dates.start), repeat + transp, code.join("_"));

          dates.end = scheduler.date["add_" + code.join("_")](new Date(dates.start), repeat + transp, {
            start_date: dates.start
          }) || dates.start;
        }

        return code.join("_") + "#" + repeat;
      }

      function get_end_rule(els) {
        var end = els["end"];

        if (end.length) {
          for (var i = 0; i < end.length; i++) {
            if (end[i].checked) {
              if (end[i].value && end[i].value != "on") {
                //seems to be default value:var input = document.createElement("input"); input.type = "radio"; input.value
                return end[i].value;
              } else {
                if (!i) {
                  return "no";
                } else if (i == 2) {
                  return "date_of_end";
                } else {
                  return "occurences_count";
                }
              }
            }
          }
        } else {
          if (end.value) return end.value;
        }

        return "no";
      }

      function set_end_rule(els, value) {
        var end = els["end"];

        if (end.length) {
          var has_values = !!end[0].value && end[0].value != "on";

          if (has_values) {
            for (var i = 0; i < end.length; i++) {
              if (end[i].value == value) end[i].checked = true;
            }
          } else {
            var ind = 0;

            switch (value) {
              case "no":
                ind = 0;
                break;

              case "date_of_end":
                ind = 2;
                break;

              default:
                ind = 1;
                break;
            }

            end[ind].checked = true;
          }
        } else {
          end.value = value;
        }
      }

      scheduler.form_blocks["recurring"]._get_repeat_code = get_repeat_code;
      var get_rcode = {
        month: function month(code, dates) {
          var get_value = scheduler.form_blocks["recurring"]._get_node_value;
          var get_numeric_value = scheduler.form_blocks["recurring"]._get_node_numeric_value;

          if (get_value(els, "month_type") == "d") {
            code.push(Math.max(1, get_numeric_value(els, "month_count")));
            dates.start.setDate(get_value(els, "month_day"));
          } else {
            code.push(Math.max(1, get_numeric_value(els, "month_count2")));
            code.push(get_value(els, "month_day2"));
            code.push(Math.max(1, get_numeric_value(els, "month_week2")));

            if (!scheduler.config.repeat_precise) {
              dates.start.setDate(1);
            }
          }

          dates._start = true;
        },
        week: function week(code, dates) {
          var get_value = scheduler.form_blocks["recurring"]._get_node_value;
          var get_numeric_value = scheduler.form_blocks["recurring"]._get_node_numeric_value;
          code.push(Math.max(1, get_numeric_value(els, "week_count")));
          code.push("");
          code.push("");
          var t = [];
          var col = get_value(els, "week_day", true); //var col = els["week_day"];

          var day = dates.start.getDay();
          var start_exists = false;

          for (var i = 0; i < col.length; i++) {
            t.push(col[i]);
            start_exists = start_exists || col[i] == day;
          }

          if (!t.length) {
            t.push(day);
            start_exists = true;
          }

          t.sort();

          if (!scheduler.config.repeat_precise) {
            dates.start = scheduler.date.week_start(dates.start);
            dates._start = true;
          } else if (!start_exists) {
            scheduler.transpose_day_week(dates.start, t, 1, 7);
            dates._start = true;
          }

          code.push(t.join(","));
        },
        day: function day(code) {
          var get_value = scheduler.form_blocks["recurring"]._get_node_value;
          var get_numeric_value = scheduler.form_blocks["recurring"]._get_node_numeric_value;

          if (get_value(els, "day_type") == "d") {
            code.push(Math.max(1, get_numeric_value(els, "day_count")));
          } else {
            code.push("week");
            code.push(1);
            code.push("");
            code.push("");
            code.push(scheduler.config.recurring_workdays.join(","));
            code.splice(0, 1);
          }
        },
        year: function year(code, dates) {
          var get_value = scheduler.form_blocks["recurring"]._get_node_value;

          if (get_value(els, "year_type") == "d") {
            code.push("1");
            dates.start.setMonth(0);
            dates.start.setDate(get_value(els, "year_day"));
            dates.start.setMonth(get_value(els, "year_month"));
          } else {
            code.push("1");
            code.push(get_value(els, "year_day2"));
            code.push(get_value(els, "year_week2"));
            dates.start.setDate(1);
            dates.start.setMonth(get_value(els, "year_month2"));
          }

          dates._start = true;
        }
      };
      var set_rcode = {
        week: function week(code, dates) {
          var set_value = scheduler.form_blocks["recurring"]._set_node_value;
          set_value(els, "week_count", code[1]);
          var t = code[4].split(",");
          var d = {};

          for (var i = 0; i < t.length; i++) {
            d[t[i]] = true;
          }

          set_value(els, "week_day", d); //for (var i = 0; i < col.length; i++)
          //	col[i].checked = (!!d[col[i].value]);
        },
        month: function month(code, dates) {
          var set_value = scheduler.form_blocks["recurring"]._set_node_value;

          if (code[2] === "") {
            set_value(els, "month_type", "d");
            set_value(els, "month_count", code[1]);
            set_value(els, "month_day", dates.start.getDate());
          } else {
            set_value(els, "month_type", "w");
            set_value(els, "month_count2", code[1]);
            set_value(els, "month_week2", code[3]);
            set_value(els, "month_day2", code[2]);
          }
        },
        day: function day(code, dates) {
          var set_value = scheduler.form_blocks["recurring"]._set_node_value;
          set_value(els, "day_type", "d");
          set_value(els, "day_count", code[1]);
        },
        year: function year(code, dates) {
          var set_value = scheduler.form_blocks["recurring"]._set_node_value;

          if (code[2] === "") {
            set_value(els, "year_type", "d");
            set_value(els, "year_day", dates.start.getDate());
            set_value(els, "year_month", dates.start.getMonth());
          } else {
            set_value(els, "year_type", "w");
            set_value(els, "year_week2", code[3]);
            set_value(els, "year_day2", code[2]);
            set_value(els, "year_month2", dates.start.getMonth());
          }
        }
      };

      function set_repeat_code(code, dates) {
        var set_value = scheduler.form_blocks["recurring"]._set_node_value;
        var data = code.split("#");
        code = data[0].split("_");
        set_rcode[code[0]](code, dates);

        switch (data[1]) {
          case "no":
            set_end_rule(els, "no");
            break;

          case "":
            set_end_rule(els, "date_of_end");
            var end_date = dates.end;

            if (scheduler.config.include_end_by) {
              end_date = scheduler.date.add(end_date, -1, 'day');
            }

            set_value(els, "date_of_end", date_str(end_date));
            break;

          default:
            set_end_rule(els, "occurences_count");
            set_value(els, "occurences_count", data[1]);
            break;
        }

        set_value(els, "repeat", code[0]); //e.checked = true;

        var node = scheduler.form_blocks["recurring"]._get_form_node(els, "repeat", code[0]);

        if (node.nodeName == "SELECT"
        /* && node.onchange*/
        ) {
            //	node.onchange();
            node.dispatchEvent(new Event('change'));
            node.dispatchEvent(new MouseEvent('click'));
          } else {
          node.dispatchEvent(new MouseEvent('click'));
        }
      }

      scheduler.form_blocks["recurring"]._set_repeat_code = set_repeat_code;

      for (var i = 0; i < top.elements.length; i++) {
        var el = top.elements[i];

        switch (el.name) {
          case "repeat":
            if (el.nodeName == "SELECT" && !el.$_eventAttached) {
              el.$_eventAttached = true;
              el.addEventListener("change", change_current_view);
            } else if (!el.$_eventAttached) {
              el.$_eventAttached = true;
              el.addEventListener("click", change_current_view);
            }

            break;
        }
      }

      scheduler._lightbox._rec_init_done = true;
    },
    set_value: function set_value(node, value, ev) {
      var rf = scheduler.form_blocks["recurring"];
      if (!scheduler._lightbox._rec_init_done) rf._init_set_value(node, value, ev);
      node.open = !ev.rec_type;
      node.blocked = this._is_modified_occurence(ev);
      var ds = rf._ds;
      ds.start = ev.start_date;
      ds.end = ev._end_date;

      rf._toggle_block();

      if (value) rf._set_repeat_code(value, ds);
    },
    get_value: function get_value(node, ev) {
      if (node.open) {
        var ds = scheduler.form_blocks["recurring"]._ds;
        var actual_dates = {};
        var timeControl = getTimeSection();
        timeControl.getValue(actual_dates);
        ds.start = actual_dates.start_date;
        ev.rec_type = scheduler.form_blocks["recurring"]._get_repeat_code(ds);

        if (ds._start) {
          ev.start_date = new Date(ds.start);
          ev._start_date = new Date(ds.start);
          ds._start = false;
        } else ev._start_date = null;

        ev._end_date = ds.end;
        ev.rec_pattern = ev.rec_type.split("#")[0];
      } else {
        ev.rec_type = ev.rec_pattern = "";
        ev._end_date = ev.end_date;
      }

      return ev.rec_type;
    },
    _get_button: function _get_button() {
      var node = getRecurringSection().header;
      return node.firstChild.firstChild;
    },
    _get_form: function _get_form() {
      return getRecurringSection().node;
    },
    open: function open() {
      var block = scheduler.form_blocks.recurring;

      var cont = block._get_form();

      if (!cont.open) block._toggle_block();
    },
    close: function close() {
      var block = scheduler.form_blocks.recurring;

      var cont = block._get_form();

      if (cont.open) block._toggle_block();
    },
    _toggle_block: function _toggle_block() {
      var block = scheduler.form_blocks.recurring;

      var cont = block._get_form(),
          el = block._get_button();

      if (!cont.open && !cont.blocked) {
        cont.style.height = "auto"; //reset to default value

        if (el) {
          el.style.backgroundPosition = "-5px 0px";
          el.nextSibling.innerHTML = scheduler.locale.labels.button_recurring_open;
        }
      } else {
        cont.style.height = "0px";

        if (el) {
          el.style.backgroundPosition = "-5px 20px";
          el.nextSibling.innerHTML = scheduler.locale.labels.button_recurring;
        }
      }

      cont.open = !cont.open;
      scheduler.setLightboxSize();
    },
    focus: function focus(node) {},
    button_click: function button_click(node, button, event) {
      var block = scheduler.form_blocks.recurring;

      var cont = block._get_form();

      if (!cont.blocked) scheduler.form_blocks.recurring._toggle_block();
    }
  };

  function getTimeSection() {
    var timeControl = scheduler.formSection('time');

    if (!timeControl) {
      timeControl = getFirstSectionOfType('time');
    }

    if (!timeControl) {
      timeControl = getFirstSectionOfType('calendar_time');
    }

    if (!timeControl) {
      throw new Error(["Can't calculate the recurring rule, the Recurring form block can't find the Time control. Make sure you have the time control in 'scheduler.config.lightbox.sections' config.", "You can use either the default time control https://docs.dhtmlx.com/scheduler/time.html, or the datepicker https://docs.dhtmlx.com/scheduler/minicalendar.html, or a custom control. ", "In the latter case, make sure the control is named \"time\":", "", "scheduler.config.lightbox.sections = [", "{name:\"time\", height:72, type:\"YOU CONTROL\", map_to:\"auto\" }];"].join("\n"));
    }

    return timeControl;
  }

  function getRecurringSection() {
    var recurringSection = scheduler.formSection('recurring');

    if (!recurringSection) {
      recurringSection = getFirstSectionOfType('recurring');
    }

    if (!recurringSection) {
      throw new Error(["Can't locate the Recurring form section.", "Make sure that you have the recurring control on the lightbox configuration https://docs.dhtmlx.com/scheduler/recurring_events.html#recurringlightbox ", "and that the recurring control has name \"recurring\":", "", "scheduler.config.lightbox.sections = [", "	{name:\"recurring\", ... }", "];"].join("\n"));
    }

    return recurringSection;
  }

  function getFirstSectionOfType(type) {
    for (var i = 0; i < scheduler.config.lightbox.sections.length; i++) {
      var section = scheduler.config.lightbox.sections[i];

      if (section.type === type) {
        return scheduler.formSection(section.name);
      }
    }

    return null;
  } //problem may occur if we will have two repeating events in the same moment of time


  scheduler._rec_markers = {};
  scheduler._rec_markers_pull = {};

  scheduler._add_rec_marker = function (ev, time) {
    ev._pid_time = time;
    this._rec_markers[ev.id] = ev;
    if (!this._rec_markers_pull[ev.event_pid]) this._rec_markers_pull[ev.event_pid] = {};
    this._rec_markers_pull[ev.event_pid][time] = ev;
  };

  scheduler._get_rec_marker = function (time, id) {
    var ch = this._rec_markers_pull[id];
    if (ch) return ch[time];
    return null;
  };

  scheduler._get_rec_markers = function (id) {
    return this._rec_markers_pull[id] || [];
  };

  function clearMilliseconds(date) {
    //	return date;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);
  }

  scheduler._rec_temp = [];

  (function () {
    var old_add_event = scheduler.addEvent;

    scheduler.addEvent = function (start_date, end_date, text, id, extra_data) {
      var ev_id = old_add_event.apply(this, arguments);

      if (ev_id && scheduler.getEvent(ev_id)) {
        var ev = scheduler.getEvent(ev_id);

        if (ev.start_date) {
          ev.start_date = clearMilliseconds(ev.start_date);
        }

        if (ev.end_date) {
          ev.end_date = clearMilliseconds(ev.end_date);
        }

        if (this._is_modified_occurence(ev)) scheduler._add_rec_marker(ev, ev.event_length * 1000);
        if (ev.rec_type) ev.rec_pattern = ev.rec_type.split("#")[0];
      }

      return ev_id;
    };
  })();

  scheduler.attachEvent("onEventIdChange", function (id, new_id) {
    if (this._ignore_call) return;
    this._ignore_call = true;

    if (scheduler._rec_markers[id]) {
      //important for for correct work of scheduler.getEvents(from, to) and collision detection
      scheduler._rec_markers[new_id] = scheduler._rec_markers[id];
      delete scheduler._rec_markers[id];
    }

    if (scheduler._rec_markers_pull[id]) {
      scheduler._rec_markers_pull[new_id] = scheduler._rec_markers_pull[id];
      delete scheduler._rec_markers_pull[id];
    }

    for (var i = 0; i < this._rec_temp.length; i++) {
      var tev = this._rec_temp[i];

      if (tev.event_pid == id) {
        tev.event_pid = new_id;
        this.changeEventId(tev.id, new_id + "#" + tev.id.split("#")[1]);
      }
    }

    for (var i in this._rec_markers) {
      var tev = this._rec_markers[i];

      if (tev.event_pid == id) {
        tev.event_pid = new_id;
        tev._pid_changed = true;
      }
    }

    var el = scheduler._rec_markers[new_id];

    if (el && el._pid_changed) {
      delete el._pid_changed;
      setTimeout(function () {
        scheduler.callEvent("onEventChanged", [new_id, scheduler.getEvent(new_id)]);
      }, 1);
    }

    delete this._ignore_call;
  });
  scheduler.attachEvent("onConfirmedBeforeEventDelete", function (id) {
    var ev = this.getEvent(id);

    if (this._is_virtual_event(id) || this._is_modified_occurence(ev) && ev.rec_type && ev.rec_type != 'none') {
      id = id.split("#");
      var nid = this.uid();
      var tid = id[1] ? id[1] : Math.round(ev._pid_time / 1000);

      var nev = this._copy_event(ev);

      nev.id = nid;
      nev.event_pid = ev.event_pid || id[0];
      var timestamp = tid;
      nev.event_length = timestamp;
      nev.rec_type = nev.rec_pattern = "none";
      this.addEvent(nev);

      this._add_rec_marker(nev, timestamp * 1000);
    } else {
      if (ev.rec_type && this._lightbox_id) this._roll_back_dates(ev);

      var sub = this._get_rec_markers(id);

      for (var i in sub) {
        if (sub.hasOwnProperty(i)) {
          id = sub[i].id;
          if (this.getEvent(id)) this.deleteEvent(id, true);
        }
      }
    }

    return true;
  });
  scheduler.attachEvent("onEventDeleted", function (id, ev) {
    if (!this._is_virtual_event(id) && this._is_modified_occurence(ev)) {
      if (!scheduler._events[id]) {
        ev.rec_type = ev.rec_pattern = "none";
        this.setEvent(id, ev);
      }
    }
  });
  scheduler.attachEvent("onEventChanged", function (id, event) {
    if (this._loading) return true;
    var ev = this.getEvent(id);

    if (this._is_virtual_event(id)) {
      var id = id.split("#");
      var nid = this.uid();
      this._not_render = true;

      var nev = this._copy_event(event);

      nev.id = nid;
      nev.event_pid = id[0];
      var timestamp = id[1];
      nev.event_length = timestamp;
      nev.rec_type = nev.rec_pattern = "";

      this._add_rec_marker(nev, timestamp * 1000);

      this.addEvent(nev);
      this._not_render = false;
    } else {
      if (ev.start_date) {
        ev.start_date = clearMilliseconds(ev.start_date);
      }

      if (ev.end_date) {
        ev.end_date = clearMilliseconds(ev.end_date);
      }

      if (ev.rec_type && this._lightbox_id) {
        this._roll_back_dates(ev);
      }

      var sub = this._get_rec_markers(id);

      for (var i in sub) {
        if (sub.hasOwnProperty(i)) {
          delete this._rec_markers[sub[i].id];
          this.deleteEvent(sub[i].id, true);
        }
      }

      delete this._rec_markers_pull[id]; // it's possible that after editing event is no longer exists, in such case we need to remove _select_id flag

      var isEventFound = false;

      for (var k = 0; k < this._rendered.length; k++) {
        if (this._rendered[k].getAttribute(this.config.event_attribute) == id) isEventFound = true;
      }

      if (!isEventFound) this._select_id = null;
    }

    return true;
  });
  scheduler.attachEvent("onEventAdded", function (id) {
    if (!this._loading) {
      var ev = this.getEvent(id);

      if (ev.rec_type && !ev.event_length) {
        this._roll_back_dates(ev);
      }
    }

    return true;
  });
  scheduler.attachEvent("onEventSave", function (id, data, is_new_event) {
    var ev = this.getEvent(id);
    if (!ev.rec_type && data.rec_type && !this._is_virtual_event(id)) this._select_id = null;
    return true;
  });
  scheduler.attachEvent("onEventCreated", function (id) {
    var ev = this.getEvent(id);
    if (!ev.rec_type) ev.rec_type = ev.rec_pattern = ev.event_length = ev.event_pid = "";
    return true;
  });
  scheduler.attachEvent("onEventCancel", function (id) {
    var ev = this.getEvent(id);

    if (ev.rec_type) {
      this._roll_back_dates(ev); // a bit expensive, but we need to be sure that event re-rendered, because view can be corrupted by resize , during edit process


      this.render_view_data();
    }
  });

  scheduler._roll_back_dates = function (ev) {
    if (ev.start_date) {
      ev.start_date = clearMilliseconds(ev.start_date);
    }

    if (ev.end_date) {
      ev.end_date = clearMilliseconds(ev.end_date);
    }

    ev.event_length = Math.round((ev.end_date.valueOf() - ev.start_date.valueOf()) / 1000);
    ev.end_date = ev._end_date;

    if (ev._start_date) {
      ev.start_date.setMonth(0);
      ev.start_date.setDate(ev._start_date.getDate());
      ev.start_date.setMonth(ev._start_date.getMonth());
      ev.start_date.setFullYear(ev._start_date.getFullYear());
    }
  };

  scheduler._is_virtual_event = function (id) {
    return id.toString().indexOf("#") != -1;
  };

  scheduler._is_modified_occurence = function (ev) {
    return ev.event_pid && ev.event_pid != "0";
  };

  scheduler._validId = function (id) {
    return !this._is_virtual_event(id);
  };

  scheduler.showLightbox_rec = scheduler.showLightbox;

  scheduler.showLightbox = function (id) {
    var locale = this.locale;
    var c = scheduler.config.lightbox_recurring;
    var ev = this.getEvent(id);
    var pid = ev.event_pid;

    var isVirtual = this._is_virtual_event(id);

    if (isVirtual) pid = id.split("#")[0]; // show series

    var showSeries = function showSeries(id) {
      var event = scheduler.getEvent(id);
      event._end_date = event.end_date;
      event.end_date = new Date(event.start_date.valueOf() + event.event_length * 1000);
      return scheduler.showLightbox_rec(id); // editing series
    };

    if ((pid || pid * 1 === 0) && ev.rec_type) {
      // direct API call on series id
      return showSeries(id);
    }

    if (!pid || pid === '0' || !locale.labels.confirm_recurring || c == 'instance' || c == 'series' && !isVirtual) {
      // editing instance or non recurring event
      return this.showLightbox_rec(id);
    }

    if (c == 'ask') {
      var that = this;
      scheduler.modalbox({
        text: locale.labels.confirm_recurring,
        title: locale.labels.title_confirm_recurring,
        width: "500px",
        position: "middle",
        buttons: [locale.labels.button_edit_series, locale.labels.button_edit_occurrence, locale.labels.icon_cancel],
        callback: function callback(index) {
          switch (+index) {
            case 0:
              return showSeries(pid);

            case 1:
              return that.showLightbox_rec(id);

            case 2:
              return;
          }
        }
      });
    } else {
      showSeries(pid);
    }
  };

  scheduler.get_visible_events_rec = scheduler.get_visible_events;

  scheduler.get_visible_events = function (only_timed) {
    for (var i = 0; i < this._rec_temp.length; i++) {
      delete this._events[this._rec_temp[i].id];
    }

    this._rec_temp = [];
    var stack = this.get_visible_events_rec(only_timed);
    var out = [];

    for (var i = 0; i < stack.length; i++) {
      if (stack[i].rec_type) {
        //deleted element of series
        if (stack[i].rec_pattern != "none") this.repeat_date(stack[i], out);
      } else out.push(stack[i]);
    }

    return out;
  };

  (function () {
    var old = scheduler.isOneDayEvent;

    scheduler.isOneDayEvent = function (ev) {
      if (ev.rec_type) return true;
      return old.call(this, ev);
    };

    var old_update_event = scheduler.updateEvent;

    scheduler.updateEvent = function (id) {
      var ev = scheduler.getEvent(id);

      if (ev && ev.rec_type) {
        //rec_type can be changed without the lightbox,
        // make sure rec_pattern updated as well
        ev.rec_pattern = (ev.rec_type || "").split("#")[0];
      }

      if (ev && ev.rec_type && !this._is_virtual_event(id)) {
        scheduler.update_view();
      } else {
        old_update_event.call(this, id);
      }
    };
  })();

  scheduler.transponse_size = {
    day: 1,
    week: 7,
    month: 1,
    year: 12
  };

  scheduler.date.day_week = function (sd, day, week) {
    sd.setDate(1);
    var originalMonth = scheduler.date.month_start(new Date(sd));
    week = (week - 1) * 7;
    var cday = sd.getDay();
    var nday = day * 1 + week - cday + 1;
    sd.setDate(nday <= week ? nday + 7 : nday);
    var newMonth = scheduler.date.month_start(new Date(sd));

    if (originalMonth.valueOf() !== newMonth.valueOf()) {
      return false;
    }

    return true;
  };

  scheduler.transpose_day_week = function (sd, list, cor, size, cor2) {
    var cday = (sd.getDay() || (scheduler.config.start_on_monday ? 7 : 0)) - cor;

    for (var i = 0; i < list.length; i++) {
      if (list[i] > cday) return sd.setDate(sd.getDate() + list[i] * 1 - cday - (size ? cor : cor2));
    }

    this.transpose_day_week(sd, list, cor + size, null, cor);
  };

  scheduler.transpose_type = function (type) {
    var transposeRecurring = "transpose_" + type;

    if (!this.date[transposeRecurring]) {
      var recurringParts = type.split("_");
      var dayDurationMs = 60 * 60 * 24 * 1000;
      var addRecurring = "add_" + type;
      var recurringStepDays = this.transponse_size[recurringParts[0]] * recurringParts[1];

      if (recurringParts[0] == "day" || recurringParts[0] == "week") {
        var weekDays = null;

        if (recurringParts[4]) {
          weekDays = recurringParts[4].split(",");

          if (scheduler.config.start_on_monday) {
            for (var i = 0; i < weekDays.length; i++) {
              weekDays[i] = weekDays[i] * 1 || 7;
            }

            weekDays.sort();
          }
        }

        this.date[transposeRecurring] = function (nd, td) {
          var delta = Math.floor((td.valueOf() - nd.valueOf()) / (dayDurationMs * recurringStepDays));
          if (delta > 0) nd.setDate(nd.getDate() + delta * recurringStepDays);
          if (weekDays) scheduler.transpose_day_week(nd, weekDays, 1, recurringStepDays);
          return nd;
        };

        this.date[addRecurring] = function (sd, inc) {
          var nd = new Date(sd.valueOf());

          if (weekDays) {
            for (var count = 0; count < inc; count++) {
              scheduler.transpose_day_week(nd, weekDays, 0, recurringStepDays);
            }
          } else nd.setDate(nd.getDate() + inc * recurringStepDays);

          return nd;
        };
      } else if (recurringParts[0] == "month" || recurringParts[0] == "year") {
        this.date[transposeRecurring] = function (nd, td, seriesInstance) {
          var delta = Math.ceil((td.getFullYear() * 12 + td.getMonth() * 1 + 1 - (nd.getFullYear() * 12 + nd.getMonth() * 1 + 1)) / recurringStepDays - 1);

          if (delta >= 0) {
            nd.setDate(1);
            nd.setMonth(nd.getMonth() + delta * recurringStepDays);
          }

          return scheduler.date[addRecurring](nd, 0, seriesInstance); //if (str[3]){
          //	scheduler.date.day_week(nd, str[2], str[3]);
          //}
        };

        this.date[addRecurring] = function (sd, inc, seriesInstance, currentCount) {
          if (!currentCount) {
            currentCount = 1;
          } else {
            currentCount++;
          }

          var maxCount = 12;

          if (currentCount > maxCount) {
            return null;
          }

          var nd = new Date(sd.valueOf());
          nd.setDate(1);
          nd.setMonth(nd.getMonth() + inc * recurringStepDays);
          var origMonth = nd.getMonth();
          var origYear = nd.getFullYear();
          nd.setDate(seriesInstance.start_date.getDate());

          if (recurringParts[3]) {
            scheduler.date.day_week(nd, recurringParts[2], recurringParts[3]);
          }

          var correctOverflowInstances = scheduler.config.recurring_overflow_instances;

          if (nd.getMonth() != origMonth && correctOverflowInstances != "none") {
            // no such day in a month
            if (correctOverflowInstances === "lastDay") {
              // return either last day of the month
              nd = new Date(origYear, origMonth + 1, 0, nd.getHours(), nd.getMinutes(), nd.getSeconds(), nd.getMilliseconds());
            } else {
              // or go to the next instance
              nd = scheduler.date[addRecurring](new Date(origYear, origMonth + 1, 0), inc || 1, seriesInstance, currentCount); // if next instance is not possible (e.g. 'repeat on 40th day of the month') null will be returned
            }
          }

          return nd;
        };
      }
    }
  };

  scheduler.repeat_date = function (ev, stack, non_render, from, to, maxCount) {
    from = from || this._min_date;
    to = to || this._max_date;
    var max = maxCount || -1;
    var td = new Date(ev.start_date.valueOf());
    var startHour = td.getHours();
    var visibleCount = 0;
    if (!ev.rec_pattern && ev.rec_type) ev.rec_pattern = ev.rec_type.split("#")[0];
    this.transpose_type(ev.rec_pattern);
    td = scheduler.date["transpose_" + ev.rec_pattern](td, from, ev);

    while (td && (td < ev.start_date || scheduler._fix_daylight_saving_date(td, from, ev, td, new Date(td.valueOf() + ev.event_length * 1000)).valueOf() <= from.valueOf() || td.valueOf() + ev.event_length * 1000 <= from.valueOf())) {
      td = this.date["add_" + ev.rec_pattern](td, 1, ev);
    }

    while (td && td < to && td < ev.end_date && (max < 0 || visibleCount < max)) {
      td.setHours(startHour);
      var timestamp = scheduler.config.occurrence_timestamp_in_utc ? Date.UTC(td.getFullYear(), td.getMonth(), td.getDate(), td.getHours(), td.getMinutes(), td.getSeconds()) : td.valueOf();

      var ch = this._get_rec_marker(timestamp, ev.id);

      if (!ch) {
        // unmodified element of series
        var ted = new Date(td.valueOf() + ev.event_length * 1000);

        var copy = this._copy_event(ev); //copy._timed = ev._timed;


        copy.text = ev.text;
        copy.start_date = td;
        copy.event_pid = ev.id;
        copy.id = ev.id + "#" + Math.round(timestamp / 1000);
        copy.end_date = ted;
        copy.end_date = scheduler._fix_daylight_saving_date(copy.start_date, copy.end_date, ev, td, copy.end_date);
        copy._timed = this.isOneDayEvent(copy);
        if (!copy._timed && !this._table_view && !this.config.multi_day) return;
        stack.push(copy);

        if (!non_render) {
          this._events[copy.id] = copy;

          this._rec_temp.push(copy);
        }

        visibleCount++;
      } else if (non_render) {
        if (ch.rec_type != "none") {
          visibleCount++;
        }

        stack.push(ch);
      }

      td = this.date["add_" + ev.rec_pattern](td, 1, ev); //	if(!scheduler.date["validate_add_" + ev.rec_pattern](td, 1, ev.rec_pattern)){
      ///		alert("detect add")
      //	}
    }
  };

  scheduler._fix_daylight_saving_date = function (start_date, end_date, ev, counter, default_date) {
    var shift = start_date.getTimezoneOffset() - end_date.getTimezoneOffset();

    if (shift) {
      if (shift > 0) {
        // e.g. 24h -> 23h
        return new Date(counter.valueOf() + ev.event_length * 1000 - shift * 60 * 1000);
      } else {
        // e.g. 24h -> 25h
        return new Date(end_date.valueOf() - shift * 60 * 1000);
      }
    }

    return new Date(default_date.valueOf());
  };

  scheduler.getRecDates = function (id, max) {
    var ev = _typeof(id) == "object" ? id : scheduler.getEvent(id);
    var recurrings = [];
    max = max || 100;

    if (!ev.rec_type) {
      return [{
        start_date: ev.start_date,
        end_date: ev.end_date
      }];
    }

    if (ev.rec_type == "none") {
      return [];
    }

    scheduler.repeat_date(ev, recurrings, true, ev.start_date, ev.end_date, max);
    var result = [];

    for (var i = 0; i < recurrings.length; i++) {
      if (recurrings[i].rec_type != "none") {
        result.push({
          start_date: recurrings[i].start_date,
          end_date: recurrings[i].end_date
        });
      }
    }

    return result;
  };

  scheduler.getEvents = function (from, to) {
    var result = [];

    for (var a in this._events) {
      var ev = this._events[a];

      if (ev && ev.start_date < to && ev.end_date > from) {
        if (ev.rec_pattern) {
          if (ev.rec_pattern == "none") continue;
          var sev = [];
          this.repeat_date(ev, sev, true, from, to);

          for (var i = 0; i < sev.length; i++) {
            // if event is in rec_markers then it will be checked by himself, here need to skip it
            if (!sev[i].rec_pattern && sev[i].start_date < to && sev[i].end_date > from && !this._rec_markers[sev[i].id]) {
              result.push(sev[i]);
            }
          }
        } else if (!this._is_virtual_event(ev.id)) {
          // if it's virtual event we can skip it
          result.push(ev);
        }
      }
    }

    return result;
  };

  scheduler.config.repeat_date = "%m.%d.%Y";
  scheduler.config.lightbox.sections = [{
    name: "description",
    map_to: "text",
    type: "textarea",
    focus: true
  }, {
    name: "recurring",
    type: "recurring",
    map_to: "rec_type",
    button: "recurring"
  }, {
    name: "time",
    height: 72,
    type: "time",
    map_to: "auto"
  }]; //drop secondary attributes

  scheduler._copy_dummy = function (ev) {
    var start_date = new Date(this.start_date);
    var end_date = new Date(this.end_date);
    this.start_date = start_date;
    this.end_date = end_date;
    this.event_length = this.event_pid = this.rec_pattern = this.rec_type = null;
  };

  scheduler.config.include_end_by = false;
  scheduler.config.lightbox_recurring = 'ask'; // series, instance

  scheduler.attachEvent("onClearAll", function () {
    scheduler._rec_markers = {}; //clear recurring events data

    scheduler._rec_markers_pull = {};
    scheduler._rec_temp = [];
  });
});

/***/ }),

/***/ "./sources/ext/restricted_extensions/daytimeline.js":
/*!**********************************************************!*\
  !*** ./sources/ext/restricted_extensions/daytimeline.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _not_implemented_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./not_implemented_extension */ "./sources/ext/restricted_extensions/not_implemented_extension.js");

/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  _not_implemented_extension__WEBPACK_IMPORTED_MODULE_0__["default"].alert("Day Timeline", scheduler.assert);
});

/***/ }),

/***/ "./sources/ext/restricted_extensions/drag_between.js":
/*!***********************************************************!*\
  !*** ./sources/ext/restricted_extensions/drag_between.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _not_implemented_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./not_implemented_extension */ "./sources/ext/restricted_extensions/not_implemented_extension.js");

/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  _not_implemented_extension__WEBPACK_IMPORTED_MODULE_0__["default"].alert("Drag Between", scheduler.assert);
});

/***/ }),

/***/ "./sources/ext/restricted_extensions/grid_view.js":
/*!********************************************************!*\
  !*** ./sources/ext/restricted_extensions/grid_view.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _not_implemented_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./not_implemented_extension */ "./sources/ext/restricted_extensions/not_implemented_extension.js");

/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  _not_implemented_extension__WEBPACK_IMPORTED_MODULE_0__["default"].alert("Grid", scheduler.assert);
});

/***/ }),

/***/ "./sources/ext/restricted_extensions/multisection.js":
/*!***********************************************************!*\
  !*** ./sources/ext/restricted_extensions/multisection.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _not_implemented_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./not_implemented_extension */ "./sources/ext/restricted_extensions/not_implemented_extension.js");

/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  _not_implemented_extension__WEBPACK_IMPORTED_MODULE_0__["default"].alert("Multisection", scheduler.assert);
});

/***/ }),

/***/ "./sources/ext/restricted_extensions/not_implemented_extension.js":
/*!************************************************************************!*\
  !*** ./sources/ext/restricted_extensions/not_implemented_extension.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  alert: function alert(extension, assert) {
    assert(false, "The ".concat(extension, " extension is not included in this version of dhtmlxScheduler.<br>\n\t\tYou may need a <a href=\"https://docs.dhtmlx.com/scheduler/editions_comparison.html\" target=\"_blank\">Professional version of the component</a>.<br>\n\t\tContact us at <a href=\"https://dhtmlx.com/docs/contact.shtml\" target=\"_blank\">https://dhtmlx.com/docs/contact.shtml</a> if you have any questions."));
  }
});

/***/ }),

/***/ "./sources/ext/restricted_extensions/timeline.js":
/*!*******************************************************!*\
  !*** ./sources/ext/restricted_extensions/timeline.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _not_implemented_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./not_implemented_extension */ "./sources/ext/restricted_extensions/not_implemented_extension.js");

/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  _not_implemented_extension__WEBPACK_IMPORTED_MODULE_0__["default"].alert("Timeline", scheduler.assert);
});

/***/ }),

/***/ "./sources/ext/restricted_extensions/treetimeline.js":
/*!***********************************************************!*\
  !*** ./sources/ext/restricted_extensions/treetimeline.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _not_implemented_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./not_implemented_extension */ "./sources/ext/restricted_extensions/not_implemented_extension.js");

/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  _not_implemented_extension__WEBPACK_IMPORTED_MODULE_0__["default"].alert("Tree Timeline", scheduler.assert);
});

/***/ }),

/***/ "./sources/ext/restricted_extensions/units.js":
/*!****************************************************!*\
  !*** ./sources/ext/restricted_extensions/units.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _not_implemented_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./not_implemented_extension */ "./sources/ext/restricted_extensions/not_implemented_extension.js");

/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  _not_implemented_extension__WEBPACK_IMPORTED_MODULE_0__["default"].alert("Units", scheduler.assert);
});

/***/ }),

/***/ "./sources/ext/restricted_extensions/week_agenda.js":
/*!**********************************************************!*\
  !*** ./sources/ext/restricted_extensions/week_agenda.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _not_implemented_extension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./not_implemented_extension */ "./sources/ext/restricted_extensions/not_implemented_extension.js");

/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  _not_implemented_extension__WEBPACK_IMPORTED_MODULE_0__["default"].alert("Week Agenda", scheduler.assert);
});

/***/ }),

/***/ "./sources/ext/serialize.js":
/*!**********************************!*\
  !*** ./sources/ext/serialize.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_common_get_serializable_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/common/get_serializable_events */ "./sources/core/common/get_serializable_events.js");
/* harmony import */ var _core_common_get_serializable_events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_common_get_serializable_events__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  var getSerializableData = _core_common_get_serializable_events__WEBPACK_IMPORTED_MODULE_0___default()(scheduler); //redefine this method, if you want to provide a custom set of attributes for serialization

  scheduler.data_attributes = function () {
    var attrs = [];
    var format = scheduler._helpers.formatDate;
    var all_events = getSerializableData();

    for (var a in all_events) {
      var ev = all_events[a];

      for (var name in ev) {
        if (name.substr(0, 1) != "_") attrs.push([name, name == "start_date" || name == "end_date" ? format : null]);
      }

      break;
    }

    return attrs;
  };

  scheduler.toXML = function (header) {
    var xml = [];
    var attrs = this.data_attributes();
    var all_events = getSerializableData();

    for (var a in all_events) {
      var ev = all_events[a];
      xml.push("<event>");

      for (var i = 0; i < attrs.length; i++) {
        xml.push("<" + attrs[i][0] + "><![CDATA[" + (attrs[i][1] ? attrs[i][1](ev[attrs[i][0]]) : ev[attrs[i][0]]) + "]]></" + attrs[i][0] + ">");
      }

      xml.push("</event>");
    }

    return (header || "") + "<data>" + xml.join("\n") + "</data>";
  };

  scheduler._serialize_json_value = function (value) {
    if (value === null || typeof value === "boolean") {
      value = "" + value;
    } else {
      if (!value && value !== 0) {
        value = "";
      }

      value = '"' + value.toString().replace(/\n/g, "").replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
    }

    return value;
  };

  scheduler.toJSON = function () {
    return JSON.stringify(this.serialize());
  };

  scheduler.toICal = function (header) {
    var start = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//dhtmlXScheduler//NONSGML v2.2//EN\nDESCRIPTION:";
    var end = "END:VCALENDAR";
    var format = scheduler.date.date_to_str("%Y%m%dT%H%i%s");
    var full_day_format = scheduler.date.date_to_str("%Y%m%d");
    var ical = [];
    var all_events = getSerializableData();

    for (var a in all_events) {
      var ev = all_events[a];
      ical.push("BEGIN:VEVENT");
      if (!ev._timed || !ev.start_date.getHours() && !ev.start_date.getMinutes()) ical.push("DTSTART:" + full_day_format(ev.start_date));else ical.push("DTSTART:" + format(ev.start_date));
      if (!ev._timed || !ev.end_date.getHours() && !ev.end_date.getMinutes()) ical.push("DTEND:" + full_day_format(ev.end_date));else ical.push("DTEND:" + format(ev.end_date));
      ical.push("SUMMARY:" + ev.text);
      ical.push("END:VEVENT");
    }

    return start + (header || "") + "\n" + ical.join("\n") + "\n" + end;
  };
});

/***/ }),

/***/ "./sources/ext/tooltip.js":
/*!********************************!*\
  !*** ./sources/ext/tooltip.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  var tooltipEventScope = scheduler._createDomEventScope();

  var dhtmlXTooltip = {};
  scheduler.ext.tooltip = scheduler.dhtmlXTooltip = scheduler.tooltip = dhtmlXTooltip;
  dhtmlXTooltip.config = {
    className: 'dhtmlXTooltip scheduler_tooltip tooltip',
    timeout_to_display: 50,
    timeout_to_hide: 50,
    delta_x: 15,
    delta_y: -20
  };
  dhtmlXTooltip.tooltip = document.createElement('div');
  dhtmlXTooltip.tooltip.className = dhtmlXTooltip.config.className;

  scheduler._waiAria.tooltipAttr(dhtmlXTooltip.tooltip);

  dhtmlXTooltip.show = function (event, text) {
    //browser event, text to display
    if (this._mobile && !scheduler.config.touch_tooltip) return;
    var dhxTooltip = dhtmlXTooltip;
    var tooltip_div = this.tooltip;
    var tooltipStyle = tooltip_div.style;
    dhxTooltip.tooltip.className = dhxTooltip.config.className;
    var pos = this.position(event);
    var target = event.target || event.srcElement; // if we are over tooltip -- do nothing, just return (so tooltip won't move)

    if (this.isTooltip(target)) {
      return;
    }

    var actual_x = pos.x + (dhxTooltip.config.delta_x || 0);
    var actual_y = pos.y - (dhxTooltip.config.delta_y || 0);
    tooltipStyle.visibility = "hidden";
    tooltipStyle.right = "";
    tooltipStyle.bottom = "";
    tooltipStyle.left = "0";
    tooltipStyle.top = "0";

    if (scheduler.config.rtl) {
      tooltip_div.className += " dhtmlXTooltip_rtl";
    }

    this.tooltip.innerHTML = text;
    document.body.appendChild(this.tooltip);
    var tooltip_width = this.tooltip.offsetWidth;
    var tooltip_height = this.tooltip.offsetHeight;

    if (document.documentElement.clientWidth - actual_x - tooltip_width < 0) {
      // tooltip is out of the right page bound
      tooltipStyle.left = "";
      tooltipStyle.right = document.documentElement.clientWidth - actual_x + 2 * (dhxTooltip.config.delta_x || 0) + "px";
    } else {
      if (actual_x < 0) {
        // tooltips is out of the left page bound
        tooltipStyle.left = pos.x + Math.abs(dhxTooltip.config.delta_x || 0) + "px";
      } else {
        // normal situation
        tooltipStyle.left = actual_x + "px";
      }
    }

    if (document.documentElement.clientHeight - actual_y - tooltip_height < 0) {
      // tooltip is below bottom of the page
      var bottom = document.documentElement.clientHeight - actual_y - 2 * (dhxTooltip.config.delta_y || 0);

      if (bottom + tooltip_height > document.documentElement.clientHeight) {
        actual_y -= Math.abs(document.documentElement.clientHeight - actual_y - tooltip_height);
        actual_y = Math.max(actual_y, 0);
        tooltipStyle.top = actual_y + "px";
      } else {
        tooltipStyle.bottom = bottom + "px";
        tooltipStyle.top = "";
      }
    } else {
      if (actual_y < 0) {
        // tooltip is higher then top of the page
        tooltipStyle.top = pos.y + Math.abs(dhxTooltip.config.delta_y || 0) + "px";
      } else {
        // normal situation
        tooltipStyle.top = actual_y + "px";
      }
    }

    scheduler._waiAria.tooltipVisibleAttr(this.tooltip);

    tooltipStyle.visibility = "visible";
    tooltipEventScope.attach(this.tooltip, "mouseleave", function (e) {
      /*
       A rare but reported scenario, when tooltip appears at the edge of the scheduler (e.g. left part inside cal, right part - outside).
       User moves mouse from the scheduler into the tooltip, and then from the tooltip to the page outside the calendar.
       As a result - tooltip freezes and no longer reacts until mouse reenters the calendar.
      */
      var tooltip = scheduler.dhtmlXTooltip;
      var node = e.relatedTarget;

      while (node != scheduler._obj && node) {
        node = node.parentNode;
      }

      if (node != scheduler._obj) tooltip.delay(tooltip.hide, tooltip, [], tooltip.config.timeout_to_hide);
    });
    scheduler.callEvent("onTooltipDisplayed", [this.tooltip, this.tooltip.event_id]);
  };

  dhtmlXTooltip._clearTimeout = function () {
    if (this.tooltip._timeout_id) {
      clearTimeout(this.tooltip._timeout_id);
    }
  };

  dhtmlXTooltip.hide = function () {
    if (this.tooltip.parentNode) {
      scheduler._waiAria.tooltipHiddenAttr(this.tooltip);

      var event_id = this.tooltip.event_id;
      this.tooltip.event_id = null; //this.tooltip.onmouseleave = null;

      tooltipEventScope.detachAll();
      this.tooltip.parentNode.removeChild(this.tooltip);
      scheduler.callEvent("onAfterTooltip", [event_id]);
    }

    this._clearTimeout();
  };

  dhtmlXTooltip.delay = function (method, object, params, delay) {
    this._clearTimeout();

    this.tooltip._timeout_id = setTimeout(function () {
      var ret = method.apply(object, params);
      method = object = params = null;
      return ret;
    }, delay || this.config.timeout_to_display);
  };

  dhtmlXTooltip.isTooltip = function (node) {
    var res = false;

    while (node && !res) {
      res = node.className == this.tooltip.className;
      node = node.parentNode;
    }

    return res;
  };

  dhtmlXTooltip.position = function (ev) {
    return {
      x: ev.clientX,
      y: ev.clientY
    };
  };

  scheduler.attachEvent("onMouseMove", function (event_id, ev) {
    // (scheduler event_id, browser event)
    var target = ev.target || ev.srcElement;
    var dhxTooltip = dhtmlXTooltip;
    var is_tooltip = dhxTooltip.isTooltip(target);
    var is_tooltip_target = dhxTooltip.isTooltipTarget && dhxTooltip.isTooltipTarget(target); // if we are over event or tooltip or custom target for tooltip

    if (event_id && scheduler.getState().editor_id != event_id || is_tooltip || is_tooltip_target) {
      var text;

      if (event_id || dhxTooltip.tooltip.event_id) {
        var event = scheduler.getEvent(event_id) || scheduler.getEvent(dhxTooltip.tooltip.event_id);
        if (!event) return;
        dhxTooltip.tooltip.event_id = event.id;
        text = scheduler.templates.tooltip_text(event.start_date, event.end_date, event);
        if (!text) return dhxTooltip.hide();
      }

      if (is_tooltip_target) {
        text = "";
      }

      var evt;

      if (scheduler.$env.isIE) {
        //make a copy of event, will be used in timed call
        evt = {
          'pageX': undefined,
          'pageY': undefined,
          'clientX': undefined,
          'clientY': undefined,
          'target': undefined,
          'srcElement': undefined
        };

        for (var i in evt) {
          evt[i] = ev[i];
        }
      }

      if (!scheduler.callEvent("onBeforeTooltip", [event_id]) || !text) return;
      dhxTooltip.delay(dhxTooltip.show, dhxTooltip, [evt || ev, text]); // showing tooltip
    } else {
      dhxTooltip.delay(dhxTooltip.hide, dhxTooltip, [], dhxTooltip.config.timeout_to_hide);
    }
  });
  scheduler.attachEvent("onBeforeDrag", function () {
    dhtmlXTooltip.hide();
    return true;
  });
  scheduler.attachEvent("onEventDeleted", function () {
    dhtmlXTooltip.hide();
    return true;
  });
  scheduler.attachEvent("onDestroy", function () {
    dhtmlXTooltip.hide();
  });
});

/***/ }),

/***/ "./sources/ext/url.js":
/*!****************************!*\
  !*** ./sources/ext/url.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler._get_url_nav = function () {
    var p = {};
    var data = (document.location.hash || "").replace("#", "").split(",");

    for (var i = 0; i < data.length; i++) {
      var s = data[i].split("=");
      if (s.length == 2) p[s[0]] = s[1];
    }

    return p;
  };

  scheduler.attachEvent("onTemplatesReady", function () {
    var first = true;
    var s2d = scheduler.date.str_to_date("%Y-%m-%d");
    var d2s = scheduler.date.date_to_str("%Y-%m-%d");
    var select_event = scheduler._get_url_nav().event || null;
    scheduler.attachEvent("onAfterEventDisplay", function (ev) {
      select_event = null;
      return true;
    });
    scheduler.attachEvent("onBeforeViewChange", function (om, od, m, d) {
      if (first) {
        first = false;

        var p = scheduler._get_url_nav();

        if (p.event) {
          try {
            if (scheduler.getEvent(p.event)) {
              setTimeout(function () {
                showEvent(p.event);
              });
              return false;
            } else {
              var handler = scheduler.attachEvent("onXLE", function () {
                setTimeout(function () {
                  showEvent(p.event);
                });
                scheduler.detachEvent(handler);
              });
            }
          } catch (e) {}
        }

        if (p.date || p.mode) {
          try {
            this.setCurrentView(p.date ? s2d(p.date) : null, p.mode || null);
          } catch (e) {
            //assuming that mode is not available anymore
            this.setCurrentView(p.date ? s2d(p.date) : null, m);
          }

          return false;
        }
      }

      var values = ["date=" + d2s(d || od), "mode=" + (m || om)];

      if (select_event) {
        values.push("event=" + select_event);
      }

      var text = "#" + values.join(",");
      document.location.hash = text;
      return true;
    });

    function showEvent(e) {
      select_event = e;

      if (scheduler.getEvent(e)) {
        scheduler.showEvent(e);
      }
    }
  });
});

/***/ }),

/***/ "./sources/ext/wp.js":
/*!***************************!*\
  !*** ./sources/ext/wp.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.attachEvent("onLightBox", function () {
    if (this._cover) {
      try {
        this._cover.style.height = this.expanded ? "100%" : (document.body.parentNode || document.body).scrollHeight + "px";
      } catch (e) {}
    }
  });

  scheduler.form_blocks.select.set_value = function (node, value, ev) {
    if (typeof value == "undefined" || value === "") value = (node.firstChild.options[0] || {}).value;
    node.firstChild.value = value || "";
  };
});

/***/ }),

/***/ "./sources/ext/year_view.js":
/*!**********************************!*\
  !*** ./sources/ext/year_view.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (scheduler) {
  scheduler.config.year_x = 4;
  scheduler.config.year_y = 3;
  scheduler.xy.year_top = 0;

  scheduler.templates.year_date = function (date) {
    return scheduler.date.date_to_str(scheduler.locale.labels.year_tab + " %Y")(date);
  };

  scheduler.templates.year_month = scheduler.date.date_to_str("%F");
  scheduler.templates.year_scale_date = scheduler.date.date_to_str("%D");

  scheduler.templates.year_tooltip = function (s, e, ev) {
    return ev.text;
  };

  var is_year_mode = function is_year_mode() {
    return scheduler._mode == "year";
  };

  scheduler.dblclick_dhx_month_head = function (e) {
    if (is_year_mode()) {
      var t = e.target || e.srcElement;

      var className = scheduler._getClassName(t.parentNode);

      if (className.indexOf("dhx_before") != -1 || className.indexOf("dhx_after") != -1) return false;
      var monthNode = t;

      while (monthNode && !(monthNode.hasAttribute && monthNode.hasAttribute("date"))) {
        monthNode = monthNode.parentNode;
      }

      if (monthNode) {
        var start = this._helpers.parseDate(monthNode.getAttribute("date"));

        start.setDate(parseInt(t.innerHTML, 10));
        var end = this.date.add(start, 1, "day");
        if (!this.config.readonly && this.config.dblclick_create) this.addEventNow(start.valueOf(), end.valueOf(), e);
      }
    }
  };

  var chid = scheduler.changeEventId;

  scheduler.changeEventId = function () {
    chid.apply(this, arguments);
    if (is_year_mode()) this.year_view(true);
  };

  var old = scheduler.render_data;

  scheduler.render_data = function (evs) {
    if (!is_year_mode()) return old.apply(this, arguments);

    for (var i = 0; i < evs.length; i++) {
      this._year_render_event(evs[i]);
    }
  };

  var clear = scheduler.clear_view;

  scheduler.clear_view = function () {
    if (!is_year_mode()) return clear.apply(this, arguments);
    var dates = scheduler._year_marked_cells,
        div = null;

    for (var date in dates) {
      if (dates.hasOwnProperty(date)) {
        div = dates[date];
        div.className = "dhx_month_head";
        div.removeAttribute("date");
      }
    }

    scheduler._year_marked_cells = {};
  };

  scheduler._hideToolTip = function () {
    if (this._tooltip) {
      this._tooltip.style.display = "none";
      this._tooltip.date = new Date(9999, 1, 1);
    }
  };

  scheduler._showToolTip = function (date, pos, e, src) {
    if (this._tooltip) {
      if (this._tooltip.date.valueOf() == date.valueOf()) return;
      this._tooltip.innerHTML = "";
    } else {
      var t = this._tooltip = document.createElement("div");
      t.className = "dhx_year_tooltip";
      if (this.config.rtl) t.className += " dhx_tooltip_rtl";
      document.body.appendChild(t);
      t.addEventListener("click", scheduler._click.dhx_cal_data);
    }

    var evs = this.getEvents(date, this.date.add(date, 1, "day"));
    var html = "";

    for (var i = 0; i < evs.length; i++) {
      var ev = evs[i];
      if (!this.filter_event(ev.id, ev)) continue;
      var bg_color = ev.color ? "background:" + ev.color + ";" : "";
      var color = ev.textColor ? "color:" + ev.textColor + ";" : "";
      html += "<div class='dhx_tooltip_line' style='" + bg_color + "" + color + "' event_id='" + evs[i].id + "' " + this.config.event_attribute + "='" + evs[i].id + "'>";
      html += "<div class='dhx_tooltip_date' style='" + bg_color + "" + color + "'>" + (evs[i]._timed ? this.templates.event_date(evs[i].start_date) : "") + "</div>";
      html += "<div class='dhx_event_icon icon_details'>&nbsp;</div>";
      html += this.templates.year_tooltip(evs[i].start_date, evs[i].end_date, evs[i]) + "</div>";
    }

    this._tooltip.style.display = "";
    this._tooltip.style.top = "0px";
    if (document.body.offsetWidth - pos.left - this._tooltip.offsetWidth < 0) this._tooltip.style.left = pos.left - this._tooltip.offsetWidth + "px";else this._tooltip.style.left = pos.left + src.offsetWidth + "px";
    this._tooltip.date = date;
    this._tooltip.innerHTML = html;
    if (document.body.offsetHeight - pos.top - this._tooltip.offsetHeight < 0) this._tooltip.style.top = pos.top - this._tooltip.offsetHeight + src.offsetHeight + "px";else this._tooltip.style.top = pos.top + "px";
  };

  scheduler._year_view_tooltip_handler = function (e) {
    if (!is_year_mode()) return;
    var src = e.target || e.srcElement;
    if (src.tagName.toLowerCase() == 'a') // fix for active links extension (it adds links to the date in the cell)
      src = src.parentNode;
    if (scheduler._getClassName(src).indexOf("dhx_year_event") != -1) scheduler._showToolTip(scheduler.templates.parse_date(src.getAttribute("data-year-date")), scheduler.$domHelpers.getOffset(src), e, src);else scheduler._hideToolTip();
  };

  scheduler._init_year_tooltip = function () {
    scheduler._detachDomEvent(scheduler._els["dhx_cal_data"][0], "mouseover", scheduler._year_view_tooltip_handler);

    scheduler.event(scheduler._els["dhx_cal_data"][0], "mouseover", scheduler._year_view_tooltip_handler);
  };

  scheduler._get_year_cell = function (d) {
    //there can be more than 1 year in view
    //year can start not from January
    var m = d.getMonth() + 12 * (d.getFullYear() - this._min_date.getFullYear()) - this.week_starts._month;

    var yearBox = this._els["dhx_cal_data"][0].childNodes[m];
    var dayIndex = this.week_starts[m] + d.getDate() - 1;
    var row = yearBox.querySelectorAll(".dhx_year_body tr")[Math.floor(dayIndex / 7)];
    var cell = row.querySelectorAll("td")[dayIndex % 7];
    return cell.querySelector(".dhx_month_head");
  };

  scheduler._year_marked_cells = {};

  scheduler._mark_year_date = function (date, event) {
    var dateString = scheduler.templates.format_date(date);

    var cell = this._get_year_cell(date);

    if (!cell) {
      return;
    }

    var ev_class = this.templates.event_class(event.start_date, event.end_date, event);

    if (!scheduler._year_marked_cells[dateString]) {
      cell.className = "dhx_month_head dhx_year_event";
      cell.setAttribute("data-year-date", dateString);
      cell.setAttribute("date", dateString);
      scheduler._year_marked_cells[dateString] = cell;
    }

    cell.className += ev_class ? " " + ev_class : "";
  };

  scheduler._unmark_year_date = function (date) {
    var cell = this._get_year_cell(date);

    if (!cell) {
      return;
    }

    cell.className = "dhx_month_head";
  };

  scheduler._year_render_event = function (event) {
    var date = event.start_date;

    if (date.valueOf() < this._min_date.valueOf()) {
      date = this._min_date;
    } else {
      date = this.date.date_part(new Date(date));
    }

    while (date < event.end_date) {
      this._mark_year_date(date, event);

      date = this.date.add(date, 1, "day");
      if (date.valueOf() >= this._max_date.valueOf()) return;
    }
  };

  scheduler.year_view = function (mode) {
    var temp;

    if (mode) {
      temp = scheduler.xy.scale_height;
      scheduler.xy.scale_height = -1;
    }

    scheduler._els["dhx_cal_header"][0].style.display = mode ? "none" : "";
    scheduler.set_sizes();
    if (mode) scheduler.xy.scale_height = temp;
    scheduler._table_view = mode;
    if (this._load_mode && this._load()) return;

    if (mode) {
      scheduler._init_year_tooltip();

      scheduler._reset_year_scale();

      if (scheduler._load_mode && scheduler._load()) {
        scheduler._render_wait = true;
        return;
      }

      scheduler.render_view_data();
    } else {
      scheduler._hideToolTip();
    }
  };

  scheduler._reset_year_scale = function () {
    this._cols = [];
    this._colsS = {};
    var week_starts = []; //start day of first week in each month

    var b = this._els["dhx_cal_data"][0];
    var c = this.config;
    b.scrollTop = 0; //fix flickering in FF

    b.innerHTML = "";
    var dx = Math.floor(parseInt(b.style.width) / c.year_x);
    var dy = Math.floor((parseInt(b.style.height) - scheduler.xy.year_top) / c.year_y);

    if (dy < 190) {
      dy = 190;
      dx = Math.floor((parseInt(b.style.width) - scheduler.xy.scroll_width) / c.year_x);
    }

    var summ = dx - 11;
    var left = 0;
    var week_template = document.createElement("div");
    var dummy_date = this.date.week_start(scheduler._currentDate());

    this._process_ignores(dummy_date, 7, "day", 1);

    var scales_count = 7 - (this._ignores_detected || 0);
    var real_count = 0;

    for (var i = 0; i < 7; i++) {
      if (!(this._ignores && this._ignores[i])) {
        this._cols[i] = Math.floor(summ / (scales_count - real_count));

        this._render_x_header(i, left, dummy_date, week_template);

        summ -= this._cols[i];
        left += this._cols[i];
        real_count++;
      }

      dummy_date = this.date.add(dummy_date, 1, "day");
    }

    week_template.lastChild.className += " dhx_scale_bar_last";

    for (var i = 0; i < week_template.childNodes.length; i++) {
      this._waiAria.yearHeadCell(week_template.childNodes[i]);
    }

    var sd = this.date[this._mode + "_start"](this.date.copy(this._date));
    var ssd = sd;
    var d = null;

    for (var i = 0; i < c.year_y; i++) {
      for (var j = 0; j < c.year_x; j++) {
        d = document.createElement("div");
        d.className = "dhx_year_box";
        d.style.cssText = "position:absolute;";
        d.setAttribute("date", this._helpers.formatDate(sd));
        d.innerHTML = "<div class='dhx_year_month'></div><div class='dhx_year_grid'><div class='dhx_year_week'>" + week_template.innerHTML + "</div><div class='dhx_year_body'></div></div>";
        var header = d.querySelector(".dhx_year_month");
        var grid = d.querySelector(".dhx_year_grid");
        var weekHeader = d.querySelector(".dhx_year_week");
        var body = d.querySelector(".dhx_year_body");
        var headerId = scheduler.uid();

        this._waiAria.yearHeader(header, headerId);

        this._waiAria.yearGrid(grid, headerId);

        header.innerHTML = this.templates.year_month(sd);
        var dd = this.date.week_start(sd);

        this._reset_month_scale(body, sd, dd, 6);

        var days = body.querySelectorAll("td");

        for (var day = 0; day < days.length; day++) {
          this._waiAria.yearDayCell(days[day]);
        }

        b.appendChild(d);
        weekHeader.style.height = weekHeader.childNodes[0].offsetHeight + "px"; // dhx_year_week should have height property so that day dates would get correct position. dhx_year_week height = height of it's child (with the day name)

        var dt = Math.round((dy - 190) / 2);
        d.style.marginTop = dt + "px";
        this.set_xy(d, dx - 10, dy - dt - 10, dx * j + 5, dy * i + 5 + scheduler.xy.year_top);
        week_starts[i * c.year_x + j] = (sd.getDay() - (this.config.start_on_monday ? 1 : 0) + 7) % 7;
        sd = this.date.add(sd, 1, "month");
      }
    }

    var dateElement = this._getNavDateElement();

    if (dateElement) {
      dateElement.innerHTML = this.templates[this._mode + "_date"](ssd, sd, this._mode);
    }

    this.week_starts = week_starts;
    week_starts._month = ssd.getMonth();
    this._min_date = ssd;
    this._max_date = sd;
  };

  var getActionData = scheduler.getActionData;

  scheduler.getActionData = function (n_ev) {
    if (!is_year_mode()) return getActionData.apply(scheduler, arguments);
    var trg = n_ev.target;

    var date = scheduler._get_year_month_date(trg);

    var day = scheduler._get_year_month_cell(trg);

    var pos = scheduler._get_year_day_indexes(day);

    if (pos && date) {
      date = scheduler.date.add(date, pos.week, "week");
      date = scheduler.date.add(date, pos.day, "day");
    } else {
      date = null;
    }

    return {
      date: date,
      section: null
    };
  };

  scheduler._get_year_day_indexes = function (targetCell) {
    var month = scheduler._get_year_el_node(targetCell, this._locate_year_month_table);

    if (!month) return null;
    var week = 0,
        day = 0;

    for (var week = 0, weeks = month.rows.length; week < weeks; week++) {
      var w = month.rows[week].getElementsByTagName("td");

      for (var day = 0, days = w.length; day < days; day++) {
        if (w[day] == targetCell) break;
      }

      if (day < days) break;
    }

    if (week < weeks) return {
      day: day,
      week: week
    };else return null;
  };

  scheduler._get_year_month_date = function (node) {
    var node = scheduler._get_year_el_node(node, scheduler._locate_year_month_root);

    if (!node) return null;
    var date = node.getAttribute("data-year-date");
    if (!date) return null;
    return scheduler.date.week_start(scheduler.date.month_start(scheduler.templates.parse_date(date)));
  };

  scheduler._locate_year_month_day = function (n) {
    return scheduler._getClassName(n).indexOf("dhx_year_event") != -1 && n.hasAttribute && n.hasAttribute("data-year-date");
  };

  var locateEvent = scheduler._locate_event;

  scheduler._locate_event = function (node) {
    var id = locateEvent.apply(scheduler, arguments);

    if (!id) {
      var day = scheduler._get_year_el_node(node, scheduler._locate_year_month_day);

      if (!day || !day.hasAttribute("data-year-date")) return null;
      var dat = scheduler.templates.parse_date(day.getAttribute("data-year-date"));
      var evs = scheduler.getEvents(dat, scheduler.date.add(dat, 1, "day"));
      if (!evs.length) return null; //can be multiple events in the cell, return any single one

      id = evs[0].id;
    }

    return id;
  };

  scheduler._locate_year_month_cell = function (n) {
    return n.nodeName.toLowerCase() == "td";
  };

  scheduler._locate_year_month_table = function (n) {
    return n.nodeName.toLowerCase() == "table";
  };

  scheduler._locate_year_month_root = function (n) {
    return n.hasAttribute && n.hasAttribute("data-year-date");
  };

  scheduler._get_year_month_cell = function (node) {
    return this._get_year_el_node(node, this._locate_year_month_cell);
  };

  scheduler._get_year_month_table = function (node) {
    return this._get_year_el_node(node, this._locate_year_month_table);
  };

  scheduler._get_year_month_root = function (node) {
    return this._get_year_el_node(this._get_year_month_table(node), this._locate_year_month_root);
  };

  scheduler._get_year_el_node = function (node, condition) {
    while (node && !condition(node)) {
      node = node.parentNode;
    }

    return node;
  };

  scheduler.attachEvent("onDestroy", function () {
    scheduler._hideToolTip();
  });
});

/***/ }),

/***/ "./sources/global.js":
/*!***************************!*\
  !*** ./sources/global.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* eslint-disable no-restricted-globals */
var globalScope;

if (typeof window !== "undefined") {
  globalScope = window;
} else {
  globalScope = global;
}
/* eslint-enable no-restricted-globals */


/* harmony default export */ __webpack_exports__["default"] = (globalScope);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./sources/locale/index.js":
/*!*********************************!*\
  !*** ./sources/locale/index.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _locale_ar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./locale_ar */ "./sources/locale/locale_ar.js");
/* harmony import */ var _locale_be__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./locale_be */ "./sources/locale/locale_be.js");
/* harmony import */ var _locale_ca__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./locale_ca */ "./sources/locale/locale_ca.js");
/* harmony import */ var _locale_cn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./locale_cn */ "./sources/locale/locale_cn.js");
/* harmony import */ var _locale_cs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./locale_cs */ "./sources/locale/locale_cs.js");
/* harmony import */ var _locale_da__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./locale_da */ "./sources/locale/locale_da.js");
/* harmony import */ var _locale_de__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./locale_de */ "./sources/locale/locale_de.js");
/* harmony import */ var _locale_el__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./locale_el */ "./sources/locale/locale_el.js");
/* harmony import */ var _locale_en__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./locale_en */ "./sources/locale/locale_en.js");
/* harmony import */ var _locale_es__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./locale_es */ "./sources/locale/locale_es.js");
/* harmony import */ var _locale_fi__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./locale_fi */ "./sources/locale/locale_fi.js");
/* harmony import */ var _locale_fr__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./locale_fr */ "./sources/locale/locale_fr.js");
/* harmony import */ var _locale_he__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./locale_he */ "./sources/locale/locale_he.js");
/* harmony import */ var _locale_hu__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./locale_hu */ "./sources/locale/locale_hu.js");
/* harmony import */ var _locale_id__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./locale_id */ "./sources/locale/locale_id.js");
/* harmony import */ var _locale_it__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./locale_it */ "./sources/locale/locale_it.js");
/* harmony import */ var _locale_jp__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./locale_jp */ "./sources/locale/locale_jp.js");
/* harmony import */ var _locale_manager__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./locale_manager */ "./sources/locale/locale_manager.js");
/* harmony import */ var _locale_nb__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./locale_nb */ "./sources/locale/locale_nb.js");
/* harmony import */ var _locale_nl__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./locale_nl */ "./sources/locale/locale_nl.js");
/* harmony import */ var _locale_no__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./locale_no */ "./sources/locale/locale_no.js");
/* harmony import */ var _locale_pl__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./locale_pl */ "./sources/locale/locale_pl.js");
/* harmony import */ var _locale_pt__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./locale_pt */ "./sources/locale/locale_pt.js");
/* harmony import */ var _locale_ro__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./locale_ro */ "./sources/locale/locale_ro.js");
/* harmony import */ var _locale_ru__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./locale_ru */ "./sources/locale/locale_ru.js");
/* harmony import */ var _locale_si__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./locale_si */ "./sources/locale/locale_si.js");
/* harmony import */ var _locale_sk__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./locale_sk */ "./sources/locale/locale_sk.js");
/* harmony import */ var _locale_sv__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./locale_sv */ "./sources/locale/locale_sv.js");
/* harmony import */ var _locale_tr__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./locale_tr */ "./sources/locale/locale_tr.js");
/* harmony import */ var _locale_ua__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./locale_ua */ "./sources/locale/locale_ua.js");






























/* harmony default export */ __webpack_exports__["default"] = (function () {
  return new _locale_manager__WEBPACK_IMPORTED_MODULE_17__["default"]({
    en: _locale_en__WEBPACK_IMPORTED_MODULE_8__["default"],
    ar: _locale_ar__WEBPACK_IMPORTED_MODULE_0__["default"],
    be: _locale_be__WEBPACK_IMPORTED_MODULE_1__["default"],
    ca: _locale_ca__WEBPACK_IMPORTED_MODULE_2__["default"],
    cn: _locale_cn__WEBPACK_IMPORTED_MODULE_3__["default"],
    cs: _locale_cs__WEBPACK_IMPORTED_MODULE_4__["default"],
    da: _locale_da__WEBPACK_IMPORTED_MODULE_5__["default"],
    de: _locale_de__WEBPACK_IMPORTED_MODULE_6__["default"],
    el: _locale_el__WEBPACK_IMPORTED_MODULE_7__["default"],
    es: _locale_es__WEBPACK_IMPORTED_MODULE_9__["default"],
    fi: _locale_fi__WEBPACK_IMPORTED_MODULE_10__["default"],
    fr: _locale_fr__WEBPACK_IMPORTED_MODULE_11__["default"],
    he: _locale_he__WEBPACK_IMPORTED_MODULE_12__["default"],
    hu: _locale_hu__WEBPACK_IMPORTED_MODULE_13__["default"],
    id: _locale_id__WEBPACK_IMPORTED_MODULE_14__["default"],
    it: _locale_it__WEBPACK_IMPORTED_MODULE_15__["default"],
    jp: _locale_jp__WEBPACK_IMPORTED_MODULE_16__["default"],
    nb: _locale_nb__WEBPACK_IMPORTED_MODULE_18__["default"],
    nl: _locale_nl__WEBPACK_IMPORTED_MODULE_19__["default"],
    no: _locale_no__WEBPACK_IMPORTED_MODULE_20__["default"],
    pl: _locale_pl__WEBPACK_IMPORTED_MODULE_21__["default"],
    pt: _locale_pt__WEBPACK_IMPORTED_MODULE_22__["default"],
    ro: _locale_ro__WEBPACK_IMPORTED_MODULE_23__["default"],
    ru: _locale_ru__WEBPACK_IMPORTED_MODULE_24__["default"],
    si: _locale_si__WEBPACK_IMPORTED_MODULE_25__["default"],
    sk: _locale_sk__WEBPACK_IMPORTED_MODULE_26__["default"],
    sv: _locale_sv__WEBPACK_IMPORTED_MODULE_27__["default"],
    tr: _locale_tr__WEBPACK_IMPORTED_MODULE_28__["default"],
    ua: _locale_ua__WEBPACK_IMPORTED_MODULE_29__["default"]
  });
});

/***/ }),

/***/ "./sources/locale/locale_ar.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_ar.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["كانون الثاني", "شباط", "آذار", "نيسان", "أيار", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"],
    month_short: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
    day_full: ["الأحد", "الأثنين", "ألثلاثاء", "الأربعاء", "ألحميس", "ألجمعة", "السبت"],
    day_short: ["احد", "اثنين", "ثلاثاء", "اربعاء", "خميس", "جمعة", "سبت"]
  },
  labels: {
    dhx_cal_today_button: "اليوم",
    day_tab: "يوم",
    week_tab: "أسبوع",
    month_tab: "شهر",
    new_event: "حدث جديد",
    icon_save: "اخزن",
    icon_cancel: "الغاء",
    icon_details: "تفاصيل",
    icon_edit: "تحرير",
    icon_delete: "حذف",
    confirm_closing: "التغييرات سوف تضيع, هل انت متأكد؟",
    //Your changes will be lost, are your sure ?
    confirm_deleting: "الحدث سيتم حذفها نهائيا ، هل أنت متأكد؟",
    section_description: "الوصف",
    section_time: "الفترة الزمنية",
    full_day: "طوال اليوم",
    confirm_recurring: "هل تريد تحرير مجموعة كاملة من الأحداث المتكررة؟",
    section_recurring: "تكرار الحدث",
    button_recurring: "تعطيل",
    button_recurring_open: "تمكين",
    button_edit_series: "تحرير سلسلة",
    button_edit_occurrence: "تعديل نسخة",

    /*grid view extension*/
    grid_tab: "جدول",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute"
  }
});

/***/ }),

/***/ "./sources/locale/locale_be.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_be.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 Translation by Sofya Morozova
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Студзень", "Люты", "Сакавік", "Красавік", "Maй", "Чэрвень", "Ліпень", "Жнівень", "Верасень", "Кастрычнік", "Лістапад", "Снежань"],
    month_short: ["Студз", "Лют", "Сак", "Крас", "Maй", "Чэр", "Ліп", "Жнів", "Вер", "Каст", "Ліст", "Снеж"],
    day_full: ["Нядзеля", "Панядзелак", "Аўторак", "Серада", "Чацвер", "Пятніца", "Субота"],
    day_short: ["Нд", "Пн", "Аўт", "Ср", "Чцв", "Пт", "Сб"]
  },
  labels: {
    dhx_cal_today_button: "Сёння",
    day_tab: "Дзень",
    week_tab: "Тыдзень",
    month_tab: "Месяц",
    new_event: "Новая падзея",
    icon_save: "Захаваць",
    icon_cancel: "Адмяніць",
    icon_details: "Дэталі",
    icon_edit: "Змяніць",
    icon_delete: "Выдаліць",
    confirm_closing: "",
    //Унесеныя змены будуць страчаны, працягнуць?
    confirm_deleting: "Падзея будзе выдалена незваротна, працягнуць?",
    section_description: "Апісанне",
    section_time: "Перыяд часу",
    full_day: "Увесь дзень",
    confirm_recurring: "Вы хочаце змяніць усю серыю паўтаральных падзей?",
    section_recurring: "Паўтарэнне",
    button_recurring: "Адключана",
    button_recurring_open: "Уключана",
    button_edit_series: "Рэдагаваць серыю",
    button_edit_occurrence: "Рэдагаваць асобнік",

    /*agenda view extension*/
    agenda_tab: "Спіс",
    date: "Дата",
    description: "Апісанне",

    /*year view extension*/
    year_tab: "Год",

    /*week agenda view extension*/
    week_agenda_tab: "Спіс",

    /*grid view extension*/
    grid_tab: "Спic",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute",

    /* recurring event components */
    repeat_radio_day: "Дзень",
    repeat_radio_week: "Тыдзень",
    repeat_radio_month: "Месяц",
    repeat_radio_year: "Год",
    repeat_radio_day_type: "Кожны",
    repeat_text_day_count: "дзень",
    repeat_radio_day_type2: "Кожны працоўны дзень",
    repeat_week: " Паўтараць кожны",
    repeat_text_week_count: "тыдзень",
    repeat_radio_month_type: "Паўтараць",
    repeat_radio_month_start: "",
    repeat_text_month_day: " чысла кожнага",
    repeat_text_month_count: "месяцу",
    repeat_text_month_count2_before: "кожны ",
    repeat_text_month_count2_after: "месяц",
    repeat_year_label: "",
    select_year_day2: "",
    repeat_text_year_day: "день",
    select_year_month: "",
    repeat_radio_end: "Без даты заканчэння",
    repeat_text_occurences_count: "паўтораў",
    repeat_radio_end2: "",
    repeat_radio_end3: "Да ",
    month_for_recurring: ["Студзеня", "Лютага", "Сакавіка", "Красавіка", "Мая", "Чэрвеня", "Ліпeня", "Жніўня", "Верасня", "Кастрычніка", "Лістапада", "Снежня"],
    day_for_recurring: ["Нядзелю", "Панядзелак", "Аўторак", "Сераду", "Чацвер", "Пятніцу", "Суботу"]
  }
});

/***/ }),

/***/ "./sources/locale/locale_ca.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_ca.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 @Traducido por Vicente Adria Bohigues - vicenteadria@hotmail.com
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"],
    month_short: ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"],
    day_full: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"],
    day_short: ["Dg", "Dl", "Dm", "Dc", "Dj", "Dv", "Ds"]
  },
  labels: {
    dhx_cal_today_button: "Hui",
    day_tab: "Dia",
    week_tab: "Setmana",
    month_tab: "Mes",
    new_event: "Nou esdeveniment",
    icon_save: "Guardar",
    icon_cancel: "Cancel·lar",
    icon_details: "Detalls",
    icon_edit: "Editar",
    icon_delete: "Esborrar",
    confirm_closing: "",
    //"Els seus canvis es perdràn, continuar ?"
    confirm_deleting: "L'esdeveniment s'esborrarà definitivament, continuar ?",
    section_description: "Descripció",
    section_time: "Periode de temps",
    full_day: "Tot el dia",
    confirm_recurring: "¿Desitja modificar el conjunt d'esdeveniments repetits?",
    section_recurring: "Repeteixca l'esdeveniment",
    button_recurring: "Impedit",
    button_recurring_open: "Permés",
    button_edit_series: "Edit sèrie",
    button_edit_occurrence: "Edita Instància",

    /*agenda view extension*/
    agenda_tab: "Agenda",
    date: "Data",
    description: "Descripció",

    /*year view extension*/
    year_tab: "Any",

    /*week agenda view extension*/
    week_agenda_tab: "Agenda",

    /*grid view extension*/
    grid_tab: "Taula",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute"
  }
});

/***/ }),

/***/ "./sources/locale/locale_cn.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_cn.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
Translation by FreezeSoul
*/
//scheduler.config.day_date="%M %d日 %D";
//scheduler.config.default_date="%Y年 %M %d日";
//scheduler.config.month_date="%Y年 %M";
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    month_short: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    day_full: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    day_short: ["日", "一", "二", "三", "四", "五", "六"]
  },
  labels: {
    dhx_cal_today_button: "今天",
    day_tab: "日",
    week_tab: "周",
    month_tab: "月",
    new_event: "新建日程",
    icon_save: "保存",
    icon_cancel: "关闭",
    icon_details: "详细",
    icon_edit: "编辑",
    icon_delete: "删除",
    confirm_closing: "请确认是否撤销修改!",
    //Your changes will be lost, are your sure?
    confirm_deleting: "是否删除日程?",
    section_description: "描述",
    section_time: "时间范围",
    full_day: "整天",
    confirm_recurring: "请确认是否将日程设为重复模式?",
    section_recurring: "重复周期",
    button_recurring: "禁用",
    button_recurring_open: "启用",
    button_edit_series: "编辑系列",
    button_edit_occurrence: "编辑实例",

    /*agenda view extension*/
    agenda_tab: "议程",
    date: "日期",
    description: "说明",

    /*year view extension*/
    year_tab: "今年",

    /*week agenda view extension*/
    week_agenda_tab: "议程",

    /*grid view extension*/
    grid_tab: "电网",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute",

    /* recurring event components */
    repeat_radio_day: "按天",
    repeat_radio_week: "按周",
    repeat_radio_month: "按月",
    repeat_radio_year: "按年",
    repeat_radio_day_type: "每",
    repeat_text_day_count: "天",
    repeat_radio_day_type2: "每个工作日",
    repeat_week: " 重复 每",
    repeat_text_week_count: "星期的:",
    repeat_radio_month_type: "重复",
    repeat_radio_month_start: "在",
    repeat_text_month_day: "日 每",
    repeat_text_month_count: "月",
    repeat_text_month_count2_before: "每",
    repeat_text_month_count2_after: "月",
    repeat_year_label: "在",
    select_year_day2: "的",
    repeat_text_year_day: "日",
    select_year_month: "月",
    repeat_radio_end: "无结束日期",
    repeat_text_occurences_count: "次结束",
    repeat_radio_end2: "重复",
    repeat_radio_end3: "结束于",
    month_for_recurring: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    day_for_recurring: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
  }
});

/***/ }),

/***/ "./sources/locale/locale_cs.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_cs.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
    month_short: ["Led", "Ún", "Bře", "Dub", "Kvě", "Čer", "Čec", "Srp", "Září", "Říj", "List", "Pro"],
    day_full: ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"],
    day_short: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"]
  },
  labels: {
    dhx_cal_today_button: "Dnes",
    day_tab: "Den",
    week_tab: "Týden",
    month_tab: "Měsíc",
    new_event: "Nová událost",
    icon_save: "Uložit",
    icon_cancel: "Zpět",
    icon_details: "Detail",
    icon_edit: "Edituj",
    icon_delete: "Smazat",
    confirm_closing: "",
    //Vaše změny budou ztraceny, opravdu ?
    confirm_deleting: "Událost bude trvale smazána, opravdu?",
    section_description: "Poznámky",
    section_time: "Doba platnosti",

    /*recurring events*/
    confirm_recurring: "Přejete si upravit celou řadu opakovaných událostí?",
    section_recurring: "Opakování události",
    button_recurring: "Vypnuto",
    button_recurring_open: "Zapnuto",
    button_edit_series: "Edit series",
    button_edit_occurrence: "Upravit instance",

    /*agenda view extension*/
    agenda_tab: "Program",
    date: "Datum",
    description: "Poznámka",

    /*year view extension*/
    year_tab: "Rok",
    full_day: "Full day",

    /*week agenda view extension*/
    week_agenda_tab: "Program",

    /*grid view extension*/
    grid_tab: "Mřížka",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute",

    /* recurring event components */
    repeat_radio_day: "Denně",
    repeat_radio_week: "Týdně",
    repeat_radio_month: "Měsíčně",
    repeat_radio_year: "Ročně",
    repeat_radio_day_type: "každý",
    repeat_text_day_count: "Den",
    repeat_radio_day_type2: "pracovní dny",
    repeat_week: "Opakuje každých",
    repeat_text_week_count: "Týdnů na:",
    repeat_radio_month_type: "u každého",
    repeat_radio_month_start: "na",
    repeat_text_month_day: "Den každého",
    repeat_text_month_count: "Měsíc",
    repeat_text_month_count2_before: "každý",
    repeat_text_month_count2_after: "Měsíc",
    repeat_year_label: "na",
    select_year_day2: "v",
    repeat_text_year_day: "Den v",
    select_year_month: "",
    repeat_radio_end: "bez data ukončení",
    repeat_text_occurences_count: "Události",
    repeat_radio_end2: "po",
    repeat_radio_end3: "Konec",
    month_for_recurring: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
    day_for_recurring: ["Neděle ", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"]
  }
});

/***/ }),

/***/ "./sources/locale/locale_da.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_da.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"],
    month_short: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
    day_full: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"],
    day_short: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"]
  },
  labels: {
    dhx_cal_today_button: "Idag",
    day_tab: "Dag",
    week_tab: "Uge",
    month_tab: "Måned",
    new_event: "Ny begivenhed",
    icon_save: "Gem",
    icon_cancel: "Fortryd",
    icon_details: "Detaljer",
    icon_edit: "Tilret",
    icon_delete: "Slet",
    confirm_closing: "Dine rettelser vil gå tabt.. Er dy sikker?",
    //Your changes will be lost, are your sure ?
    confirm_deleting: "Bigivenheden vil blive slettet permanent. Er du sikker?",
    section_description: "Beskrivelse",
    section_time: "Tidsperiode",

    /*recurring events*/
    confirm_recurring: "Vil du tilrette hele serien af gentagne begivenheder?",
    section_recurring: "Gentag begivenhed",
    button_recurring: "Frakoblet",
    button_recurring_open: "Tilkoblet",
    button_edit_series: "Rediger serien",
    button_edit_occurrence: "Rediger en kopi",

    /*agenda view extension*/
    agenda_tab: "Dagsorden",
    date: "Dato",
    description: "Beskrivelse",

    /*year view extension*/
    year_tab: "År",

    /*week agenda view extension*/
    week_agenda_tab: "Dagsorden",

    /*grid view extension*/
    grid_tab: "Grid",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute",

    /* recurring event components */
    repeat_radio_day: "Daglig",
    repeat_radio_week: "Ugenlig",
    repeat_radio_month: "Månedlig",
    repeat_radio_year: "Årlig",
    repeat_radio_day_type: "Hver",
    repeat_text_day_count: "dag",
    repeat_radio_day_type2: "På hver arbejdsdag",
    repeat_week: " Gentager sig hver",
    repeat_text_week_count: "uge på følgende dage:",
    repeat_radio_month_type: "Hver den",
    repeat_radio_month_start: "Den",
    repeat_text_month_day: " i hver",
    repeat_text_month_count: "måned",
    repeat_text_month_count2_before: "hver",
    repeat_text_month_count2_after: "måned",
    repeat_year_label: "Den",
    select_year_day2: "i",
    repeat_text_year_day: "dag i",
    select_year_month: "",
    repeat_radio_end: "Ingen slutdato",
    repeat_text_occurences_count: "gentagelse",
    repeat_radio_end2: "Efter",
    repeat_radio_end3: "Slut",
    month_for_recurring: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    day_for_recurring: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"]
  }
});

/***/ }),

/***/ "./sources/locale/locale_de.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_de.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: [" Januar", " Februar", " März ", " April", " Mai", " Juni", " Juli", " August", " September ", " Oktober", " November ", " Dezember"],
    month_short: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
    day_full: ["Sonntag", "Montag", "Dienstag", " Mittwoch", " Donnerstag", "Freitag", "Samstag"],
    day_short: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
  },
  labels: {
    dhx_cal_today_button: "Heute",
    day_tab: "Tag",
    week_tab: "Woche",
    month_tab: "Monat",
    new_event: "neuer Eintrag",
    icon_save: "Speichern",
    icon_cancel: "Abbrechen",
    icon_details: "Details",
    icon_edit: "Ändern",
    icon_delete: "Löschen",
    confirm_closing: "",
    //"Ihre Veränderungen werden verloren sein, wollen Sie ergänzen? "
    confirm_deleting: "Der Eintrag wird gelöscht",
    section_description: "Beschreibung",
    section_time: "Zeitspanne",
    full_day: "Ganzer Tag",
    confirm_recurring: "Wollen Sie alle Einträge bearbeiten oder nur diesen einzelnen Eintrag?",
    section_recurring: "Wiederholung",
    button_recurring: "Aus",
    button_recurring_open: "An",
    button_edit_series: "Bearbeiten Sie die Serie",
    button_edit_occurrence: "Bearbeiten Sie eine Kopie",

    /*agenda view extension*/
    agenda_tab: "Agenda",
    date: "Datum",
    description: "Beschreibung",

    /*year view extension*/
    year_tab: "Jahre",

    /*week agenda view extension*/
    week_agenda_tab: "Agenda",

    /*grid view extension*/
    grid_tab: "Grid",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute",

    /* recurring event components */
    repeat_radio_day: "Täglich",
    repeat_radio_week: "Wöchentlich",
    repeat_radio_month: "Monatlich",
    repeat_radio_year: "Jährlich",
    repeat_radio_day_type: "jeden",
    repeat_text_day_count: "Tag",
    repeat_radio_day_type2: "an jedem Arbeitstag",
    repeat_week: " Wiederholt sich jede",
    repeat_text_week_count: "Woche am:",
    repeat_radio_month_type: "an jedem",
    repeat_radio_month_start: "am",
    repeat_text_month_day: "Tag eines jeden",
    repeat_text_month_count: "Monats",
    repeat_text_month_count2_before: "jeden",
    repeat_text_month_count2_after: "Monats",
    repeat_year_label: "am",
    select_year_day2: "im",
    repeat_text_year_day: "Tag im",
    select_year_month: "",
    repeat_radio_end: "kein Enddatum",
    repeat_text_occurences_count: "Ereignissen",
    repeat_radio_end3: "Schluß",
    repeat_radio_end2: "nach",
    month_for_recurring: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    day_for_recurring: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
  }
});

/***/ }),

/***/ "./sources/locale/locale_el.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_el.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάϊος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"],
    month_short: ["ΙΑΝ", "ΦΕΒ", "ΜΑΡ", "ΑΠΡ", "ΜΑΙ", "ΙΟΥΝ", "ΙΟΥΛ", "ΑΥΓ", "ΣΕΠ", "ΟΚΤ", "ΝΟΕ", "ΔΕΚ"],
    day_full: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Κυριακή"],
    day_short: ["ΚΥ", "ΔΕ", "ΤΡ", "ΤΕ", "ΠΕ", "ΠΑ", "ΣΑ"]
  },
  labels: {
    dhx_cal_today_button: "Σήμερα",
    day_tab: "Ημέρα",
    week_tab: "Εβδομάδα",
    month_tab: "Μήνας",
    new_event: "Νέο έργο",
    icon_save: "Αποθήκευση",
    icon_cancel: "Άκυρο",
    icon_details: "Λεπτομέρειες",
    icon_edit: "Επεξεργασία",
    icon_delete: "Διαγραφή",
    confirm_closing: "",
    //Your changes will be lost, are your sure ?
    confirm_deleting: "Το έργο θα διαγραφεί οριστικά. Θέλετε να συνεχίσετε;",
    section_description: "Περιγραφή",
    section_time: "Χρονική περίοδος",
    full_day: "Πλήρης Ημέρα",

    /*recurring events*/
    confirm_recurring: "Θέλετε να επεξεργασθείτε ολόκληρη την ομάδα των επαναλαμβανόμενων έργων;",
    section_recurring: "Επαναλαμβανόμενο έργο",
    button_recurring: "Ανενεργό",
    button_recurring_open: "Ενεργό",
    button_edit_series: "Επεξεργαστείτε τη σειρά",
    button_edit_occurrence: "Επεξεργασία ένα αντίγραφο",

    /*agenda view extension*/
    agenda_tab: "Ημερήσια Διάταξη",
    date: "Ημερομηνία",
    description: "Περιγραφή",

    /*year view extension*/
    year_tab: "Έτος",

    /*week agenda view extension*/
    week_agenda_tab: "Ημερήσια Διάταξη",

    /*grid view extension*/
    grid_tab: "Πλέγμα",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute",

    /* recurring event components */
    repeat_radio_day: "Ημερησίως",
    repeat_radio_week: "Εβδομαδιαίως",
    repeat_radio_month: "Μηνιαίως",
    repeat_radio_year: "Ετησίως",
    repeat_radio_day_type: "Κάθε",
    repeat_text_day_count: "ημέρα",
    repeat_radio_day_type2: "Κάθε εργάσιμη",
    repeat_week: " Επανάληψη κάθε",
    repeat_text_week_count: "εβδομάδα τις επόμενες ημέρες:",
    repeat_radio_month_type: "Επανάληψη",
    repeat_radio_month_start: "Την",
    repeat_text_month_day: "ημέρα κάθε",
    repeat_text_month_count: "μήνα",
    repeat_text_month_count2_before: "κάθε",
    repeat_text_month_count2_after: "μήνα",
    repeat_year_label: "Την",
    select_year_day2: "του",
    repeat_text_year_day: "ημέρα",
    select_year_month: "μήνα",
    repeat_radio_end: "Χωρίς ημερομηνία λήξεως",
    repeat_text_occurences_count: "επαναλήψεις",
    repeat_radio_end3: "Λήγει την",
    repeat_radio_end2: "Μετά από",
    month_for_recurring: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάϊος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"],
    day_for_recurring: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"]
  }
});

/***/ }),

/***/ "./sources/locale/locale_en.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_en.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    month_short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    day_full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    day_short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  },
  labels: {
    dhx_cal_today_button: "Today",
    day_tab: "Day",
    week_tab: "Week",
    month_tab: "Month",
    new_event: "New event",
    icon_save: "Save",
    icon_cancel: "Cancel",
    icon_details: "Details",
    icon_edit: "Edit",
    icon_delete: "Delete",
    confirm_closing: "",
    //Your changes will be lost, are your sure ?
    confirm_deleting: "Event will be deleted permanently, are you sure?",
    section_description: "Description",
    section_time: "Time period",
    full_day: "Full day",

    /*recurring events*/
    confirm_recurring: "Do you want to edit the whole set of repeated events?",
    section_recurring: "Repeat event",
    button_recurring: "Disabled",
    button_recurring_open: "Enabled",
    button_edit_series: "Edit series",
    button_edit_occurrence: "Edit occurrence",

    /*agenda view extension*/
    agenda_tab: "Agenda",
    date: "Date",
    description: "Description",

    /*year view extension*/
    year_tab: "Year",

    /* week agenda extension */
    week_agenda_tab: "Agenda",

    /*grid view extension*/
    grid_tab: "Grid",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute",

    /* recurring event components */
    repeat_radio_day: "Daily",
    //name="repeat" value="day"
    repeat_radio_week: "Weekly",
    //name="repeat" value="week
    repeat_radio_month: "Monthly",
    repeat_radio_year: "Yearly",
    repeat_radio_day_type: "Every",
    repeat_text_day_count: "day",
    repeat_radio_day_type2: "Every workday",
    repeat_week: " Repeat every",
    repeat_text_week_count: "week next days:",
    repeat_radio_month_type: "Repeat",
    repeat_radio_month_start: "On",
    repeat_text_month_day: "day every",
    repeat_text_month_count: "month",
    repeat_text_month_count2_before: "every",
    repeat_text_month_count2_after: "month",
    repeat_year_label: "On",
    select_year_day2: "of",
    repeat_text_year_day: "day",
    select_year_month: "month",
    repeat_radio_end: "No end date",
    repeat_text_occurences_count: "occurrences",
    repeat_radio_end2: "After",
    repeat_radio_end3: "End by",
    month_for_recurring: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    day_for_recurring: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] //

  }
});

/***/ }),

/***/ "./sources/locale/locale_es.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_es.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 @Autor Manuel Fernandez Panzuela - www.mfernandez.es
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    month_short: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    day_full: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    day_short: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
  },
  labels: {
    dhx_cal_today_button: "Hoy",
    day_tab: "Día",
    week_tab: "Semana",
    month_tab: "Mes",
    new_event: "Nuevo evento",
    icon_save: "Guardar",
    icon_cancel: "Cancelar",
    icon_details: "Detalles",
    icon_edit: "Editar",
    icon_delete: "Eliminar",
    confirm_closing: "",
    //"Sus cambios se perderán, continuar ?"
    confirm_deleting: "El evento se borrará definitivamente, ¿continuar?",
    section_description: "Descripción",
    section_time: "Período",
    full_day: "Todo el día",
    confirm_recurring: "¿Desea modificar el conjunto de eventos repetidos?",
    section_recurring: "Repita el evento",
    button_recurring: "Impedido",
    button_recurring_open: "Permitido",
    button_edit_series: "Editar la serie",
    button_edit_occurrence: "Editar este evento",

    /*agenda view extension*/
    agenda_tab: "Día",
    date: "Fecha",
    description: "Descripción",

    /*year view extension*/
    year_tab: "Año",

    /*week agenda view extension*/
    week_agenda_tab: "Día",

    /*grid view extension*/
    grid_tab: "Reja",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute",

    /* recurring event components */
    repeat_radio_day: "Diariamente",
    repeat_radio_week: "Semanalmente",
    repeat_radio_month: "Mensualmente",
    repeat_radio_year: "Anualmente",
    repeat_radio_day_type: "Cada",
    repeat_text_day_count: "dia",
    repeat_radio_day_type2: "Cada jornada de trabajo",
    repeat_week: " Repetir cada",
    repeat_text_week_count: "semana:",
    repeat_radio_month_type: "Repita",
    repeat_radio_month_start: "El",
    repeat_text_month_day: "dia cada ",
    repeat_text_month_count: "mes",
    repeat_text_month_count2_before: "cada",
    repeat_text_month_count2_after: "mes",
    repeat_year_label: "El",
    select_year_day2: "del",
    repeat_text_year_day: "dia",
    select_year_month: "mes",
    repeat_radio_end: "Sin fecha de finalización",
    repeat_text_occurences_count: "ocurrencias",
    repeat_radio_end3: "Fin",
    repeat_radio_end2: "Después de",
    month_for_recurring: ["Enero", "Febrero", "Маrzo", "Аbril", "Mayo", "Junio", "Julio", "Аgosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
    day_for_recurring: ["Domingo", "Lunes", "Martes", "Miércoles", "Jeuves", "Viernes", "Sabado"]
  }
});

/***/ }),

/***/ "./sources/locale/locale_fi.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_fi.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kes&auml;kuu", "Hein&auml;kuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"],
    month_short: ["Tam", "Hel", "Maa", "Huh", "Tou", "Kes", "Hei", "Elo", "Syy", "Lok", "Mar", "Jou"],
    day_full: ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"],
    day_short: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"]
  },
  labels: {
    dhx_cal_today_button: "Tänään",
    day_tab: "Päivä",
    week_tab: "Viikko",
    month_tab: "Kuukausi",
    new_event: "Uusi tapahtuma",
    icon_save: "Tallenna",
    icon_cancel: "Peru",
    icon_details: "Tiedot",
    icon_edit: "Muokkaa",
    icon_delete: "Poista",
    confirm_closing: "",
    //Your changes will be lost, are your sure ?
    confirm_deleting: "Haluatko varmasti poistaa tapahtuman?",
    section_description: "Kuvaus",
    section_time: "Aikajakso",
    full_day: "Koko päivä",
    confirm_recurring: "Haluatko varmasti muokata toistuvan tapahtuman kaikkia jaksoja?",
    section_recurring: "Toista tapahtuma",
    button_recurring: "Ei k&auml;yt&ouml;ss&auml;",
    button_recurring_open: "K&auml;yt&ouml;ss&auml;",
    button_edit_series: "Muokkaa sarja",
    button_edit_occurrence: "Muokkaa kopio",

    /*agenda view extension*/
    agenda_tab: "Esityslista",
    date: "Päivämäärä",
    description: "Kuvaus",

    /*year view extension*/
    year_tab: "Vuoden",

    /*week agenda view extension*/
    week_agenda_tab: "Esityslista",

    /*grid view extension*/
    grid_tab: "Ritilä",

    /* touch tooltip*/
    drag_to_create: "Luo uusi vetämällä",
    drag_to_move: "Siirrä vetämällä",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute",

    /* recurring event components */
    repeat_radio_day: "P&auml;ivitt&auml;in",
    repeat_radio_week: "Viikoittain",
    repeat_radio_month: "Kuukausittain",
    repeat_radio_year: "Vuosittain",
    repeat_radio_day_type: "Joka",
    repeat_text_day_count: "p&auml;iv&auml;",
    repeat_radio_day_type2: "Joka arkip&auml;iv&auml;",
    repeat_week: "Toista joka",
    repeat_text_week_count: "viikko n&auml;in&auml; p&auml;ivin&auml;:",
    repeat_radio_month_type: "Toista",
    repeat_radio_month_start: "",
    repeat_text_month_day: "p&auml;iv&auml;n&auml; joka",
    repeat_text_month_count: "kuukausi",
    repeat_text_month_count2_before: "joka",
    repeat_text_month_count2_after: "kuukausi",
    repeat_year_label: "",
    select_year_day2: "",
    repeat_text_year_day: "p&auml;iv&auml;",
    select_year_month: "kuukausi",
    repeat_radio_end: "Ei loppumisaikaa",
    repeat_text_occurences_count: "Toiston j&auml;lkeen",
    repeat_radio_end3: "Loppuu",
    repeat_radio_end2: "",
    month_for_recurring: ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kes&auml;kuu", "Hein&auml;kuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"],
    day_for_recurring: ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"]
  }
});

/***/ }),

/***/ "./sources/locale/locale_fr.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_fr.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    month_short: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"],
    day_full: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
    day_short: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
  },
  labels: {
    dhx_cal_today_button: "Aujourd'hui",
    day_tab: "Jour",
    week_tab: "Semaine",
    month_tab: "Mois",
    new_event: "Nouvel événement",
    icon_save: "Enregistrer",
    icon_cancel: "Annuler",
    icon_details: "Détails",
    icon_edit: "Modifier",
    icon_delete: "Effacer",
    confirm_closing: "",
    //Vos modifications seront perdus, êtes-vous sûr ?
    confirm_deleting: "L'événement sera effacé sans appel, êtes-vous sûr ?",
    section_description: "Description",
    section_time: "Période",
    full_day: "Journée complète",
    confirm_recurring: "Voulez-vous éditer toute une série d'évènements répétés?",
    section_recurring: "Périodicité",
    button_recurring: "Désactivé",
    button_recurring_open: "Activé",
    button_edit_series: "Modifier la série",
    button_edit_occurrence: "Modifier une copie",

    /*agenda view extension*/
    agenda_tab: "Jour",
    date: "Date",
    description: "Description",

    /*year view extension*/
    year_tab: "Année",

    /*week agenda view extension*/
    week_agenda_tab: "Jour",

    /*grid view extension*/
    grid_tab: "Grille",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute",

    /* recurring event components */
    repeat_radio_day: "Quotidienne",
    repeat_radio_week: "Hebdomadaire",
    repeat_radio_month: "Mensuelle",
    repeat_radio_year: "Annuelle",
    repeat_radio_day_type: "Chaque",
    repeat_text_day_count: "jour",
    repeat_radio_day_type2: "Chaque journée de travail",
    repeat_week: " Répéter toutes les",
    repeat_text_week_count: "semaine:",
    repeat_radio_month_type: "Répéter",
    repeat_radio_month_start: "Le",
    repeat_text_month_day: "jour chaque",
    repeat_text_month_count: "mois",
    repeat_text_month_count2_before: "chaque",
    repeat_text_month_count2_after: "mois",
    repeat_year_label: "Le",
    select_year_day2: "du",
    repeat_text_year_day: "jour",
    select_year_month: "mois",
    repeat_radio_end: "Pas de date d&quot;achèvement",
    repeat_text_occurences_count: "occurrences",
    repeat_radio_end3: "Fin",
    repeat_radio_end2: "Après",
    month_for_recurring: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    day_for_recurring: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
  }
});

/***/ }),

/***/ "./sources/locale/locale_he.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_he.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
    month_short: ["ינו", "פבר", "מרץ", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק", "נוב", "דצמ"],
    day_full: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
    day_short: ["א", "ב", "ג", "ד", "ה", "ו", "ש"]
  },
  labels: {
    dhx_cal_today_button: "היום",
    day_tab: "יום",
    week_tab: "שבוע",
    month_tab: "חודש",
    new_event: "ארוע חדש",
    icon_save: "שמור",
    icon_cancel: "בטל",
    icon_details: "פרטים",
    icon_edit: "ערוך",
    icon_delete: "מחק",
    confirm_closing: "",
    //Your changes will be lost, are your sure ?
    confirm_deleting: "ארוע ימחק סופית.להמשיך?",
    section_description: "תיאור",
    section_time: "תקופה",
    confirm_recurring: "האם ברצונך לשנות כל סדרת ארועים מתמשכים?",
    section_recurring: "להעתיק ארוע",
    button_recurring: "לא פעיל",
    button_recurring_open: "פעיל",
    full_day: "יום שלם",
    button_edit_series: "ערוך את הסדרה",
    button_edit_occurrence: "עריכת עותק",

    /*agenda view extension*/
    agenda_tab: "סדר יום",
    date: "תאריך",
    description: "תיאור",

    /*year view extension*/
    year_tab: "לשנה",

    /*week agenda view extension*/
    week_agenda_tab: "סדר יום",

    /*grid view extension*/
    grid_tab: "סורג",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "גרור כדי להזיז",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "בטל",

    /* wai aria labels for non-text controls */
    next: "הבא",
    prev: "הקודם",
    year: "שנה",
    month: "חודש",
    day: "יום",
    hour: "שעה",
    minute: "דקה",

    /* recurring event components */
    repeat_radio_day: "יומי",
    repeat_radio_week: "שבועי",
    repeat_radio_month: "חודשי",
    repeat_radio_year: "שנתי",
    repeat_radio_day_type: "חזור כל",
    repeat_text_day_count: "ימים",
    repeat_radio_day_type2: "חזור כל יום עבודה",
    repeat_week: " חזור כל",
    repeat_text_week_count: "שבוע לפי ימים:",
    repeat_radio_month_type: "חזור כל",
    repeat_radio_month_start: "כל",
    repeat_text_month_day: "ימים כל",
    repeat_text_month_count: "חודשים",
    repeat_text_month_count2_before: "חזור כל",
    repeat_text_month_count2_after: "חודש",
    repeat_year_label: "כל",
    select_year_day2: "בחודש",
    repeat_text_year_day: "ימים",
    select_year_month: "חודש",
    repeat_radio_end: "לעולם לא מסתיים",
    repeat_text_occurences_count: "אירועים",
    repeat_radio_end3: "מסתיים ב",
    repeat_radio_end2: "אחרי",
    month_for_recurring: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
    day_for_recurring: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
  }
});

/***/ }),

/***/ "./sources/locale/locale_hu.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_hu.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"],
    month_short: ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Sep", "Okt", "Nov", "Dec"],
    day_full: ["Vasárnap", "Hétfõ", "Kedd", "Szerda", "Csütörtök", "Péntek", "szombat"],
    day_short: ["Va", "Hé", "Ke", "Sze", "Csü", "Pé", "Szo"]
  },
  labels: {
    dhx_cal_today_button: "Ma",
    day_tab: "Nap",
    week_tab: "Hét",
    month_tab: "Hónap",
    new_event: "Új esemény",
    icon_save: "Mentés",
    icon_cancel: "Mégse",
    icon_details: "Részletek",
    icon_edit: "Szerkesztés",
    icon_delete: "Törlés",
    confirm_closing: "",
    //A változások elvesznek, biztosan folytatja? "
    confirm_deleting: "Az esemény törölve lesz, biztosan folytatja?",
    section_description: "Leírás",
    section_time: "Idõszak",
    full_day: "Egesz napos",

    /*ismétlõdõ események*/
    confirm_recurring: "Biztosan szerkeszteni akarod az összes ismétlõdõ esemény beállítását?",
    section_recurring: "Esemény ismétlése",
    button_recurring: "Tiltás",
    button_recurring_open: "Engedélyezés",
    button_edit_series: "Edit series",
    button_edit_occurrence: "Szerkesztés bíróság",

    /*napirendi nézet*/
    agenda_tab: "Napirend",
    date: "Dátum",
    description: "Leírás",

    /*éves nézet*/
    year_tab: "Év",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute"
  }
});

/***/ }),

/***/ "./sources/locale/locale_id.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_id.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    month_short: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"],
    day_full: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
    day_short: ["Ming", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]
  },
  labels: {
    dhx_cal_today_button: "Hari Ini",
    day_tab: "Hari",
    week_tab: "Minggu",
    month_tab: "Bulan",
    new_event: "Acara Baru",
    icon_save: "Simpan",
    icon_cancel: "Batal",
    icon_details: "Detail",
    icon_edit: "Edit",
    icon_delete: "Hapus",
    confirm_closing: "",

    /*Perubahan tidak akan disimpan ?*/
    confirm_deleting: "Acara akan dihapus",
    section_description: "Keterangan",
    section_time: "Periode",
    full_day: "Hari penuh",

    /*recurring events*/
    confirm_recurring: "Apakah acara ini akan berulang?",
    section_recurring: "Acara Rutin",
    button_recurring: "Tidak Difungsikan",
    button_recurring_open: "Difungsikan",
    button_edit_series: "Mengedit seri",
    button_edit_occurrence: "Mengedit salinan",

    /*agenda view extension*/
    agenda_tab: "Agenda",
    date: "Tanggal",
    description: "Keterangan",

    /*year view extension*/
    year_tab: "Tahun",

    /*week agenda view extension*/
    week_agenda_tab: "Agenda",

    /*grid view extension*/
    grid_tab: "Tabel",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute"
  }
});

/***/ }),

/***/ "./sources/locale/locale_it.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_it.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
    month_short: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
    day_full: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
    day_short: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"]
  },
  labels: {
    dhx_cal_today_button: "Oggi",
    day_tab: "Giorno",
    week_tab: "Settimana",
    month_tab: "Mese",
    new_event: "Nuovo evento",
    icon_save: "Salva",
    icon_cancel: "Chiudi",
    icon_details: "Dettagli",
    icon_edit: "Modifica",
    icon_delete: "Elimina",
    confirm_closing: "",
    //Le modifiche apportate saranno perse, siete sicuri?
    confirm_deleting: "L'evento sarà eliminato, siete sicuri?",
    section_description: "Descrizione",
    section_time: "Periodo di tempo",
    full_day: "Intera giornata",
    confirm_recurring: "Vuoi modificare l'intera serie di eventi?",
    section_recurring: "Ripetere l'evento",
    button_recurring: "Disattivato",
    button_recurring_open: "Attivato",
    button_edit_series: "Modificare la serie",
    button_edit_occurrence: "Modificare una copia",

    /*agenda view extension*/
    agenda_tab: "Agenda",
    date: "Data",
    description: "Descrizione",

    /*year view extension*/
    year_tab: "Anno",

    /*week agenda view extension*/
    week_agenda_tab: "Agenda",

    /*grid view extension*/
    grid_tab: "Griglia",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute",

    /* recurring event components */
    repeat_radio_day: "Quotidiano",
    repeat_radio_week: "Settimanale",
    repeat_radio_month: "Mensile",
    repeat_radio_year: "Annuale",
    repeat_radio_day_type: "Ogni",
    repeat_text_day_count: "giorno",
    repeat_radio_day_type2: "Ogni giornata lavorativa",
    repeat_week: " Ripetere ogni",
    repeat_text_week_count: "settimana:",
    repeat_radio_month_type: "Ripetere",
    repeat_radio_month_start: "Il",
    repeat_text_month_day: "giorno ogni",
    repeat_text_month_count: "mese",
    repeat_text_month_count2_before: "ogni",
    repeat_text_month_count2_after: "mese",
    repeat_year_label: "Il",
    select_year_day2: "del",
    repeat_text_year_day: "giorno",
    select_year_month: "mese",
    repeat_radio_end: "Senza data finale",
    repeat_text_occurences_count: "occorenze",
    repeat_radio_end3: "Fine",
    repeat_radio_end2: "Dopo",
    month_for_recurring: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Jiugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
    day_for_recurring: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Jovedì", "Venerdì", "Sabato"]
  }
});

/***/ }),

/***/ "./sources/locale/locale_jp.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_jp.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 Translation by Genexus Japan Inc.
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    month_short: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    day_full: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
    day_short: ["日", "月", "火", "水", "木", "金", "土"]
  },
  labels: {
    dhx_cal_today_button: "今日",
    day_tab: "日",
    week_tab: "週",
    month_tab: "月",
    new_event: "新イベント",
    icon_save: "保存",
    icon_cancel: "キャンセル",
    icon_details: "詳細",
    icon_edit: "編集",
    icon_delete: "削除",
    confirm_closing: "",
    //変更が取り消されます、宜しいですか？
    confirm_deleting: "イベント完全に削除されます、宜しいですか？",
    section_description: "デスクリプション",
    section_time: "期間",
    confirm_recurring: "繰り返されているイベントを全て編集しますか？",
    section_recurring: "イベントを繰り返す",
    button_recurring: "無効",
    button_recurring_open: "有効",
    full_day: "終日",
    button_edit_series: "シリーズを編集します",
    button_edit_occurrence: "コピーを編集",

    /*agenda view extension*/
    agenda_tab: "議題は",
    date: "日付",
    description: "説明",

    /*year view extension*/
    year_tab: "今年",

    /*week agenda view extension*/
    week_agenda_tab: "議題は",

    /*grid view extension*/
    grid_tab: "グリッド",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute"
  }
});

/***/ }),

/***/ "./sources/locale/locale_manager.js":
/*!******************************************!*\
  !*** ./sources/locale/locale_manager.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LocaleManager; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LocaleManager = /*#__PURE__*/function () {
  function LocaleManager(config) {
    _classCallCheck(this, LocaleManager);

    this._locales = {};

    for (var i in config) {
      this._locales[i] = config[i];
    }
  }

  _createClass(LocaleManager, [{
    key: "addLocale",
    value: function addLocale(name, locale) {
      this._locales[name] = locale;
    }
  }, {
    key: "getLocale",
    value: function getLocale(name) {
      return this._locales[name];
    }
  }]);

  return LocaleManager;
}();



/***/ }),

/***/ "./sources/locale/locale_nb.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_nb.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"],
    month_short: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
    day_full: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"],
    day_short: ["Søn", "Mon", "Tir", "Ons", "Tor", "Fre", "Lør"]
  },
  labels: {
    dhx_cal_today_button: "I dag",
    day_tab: "Dag",
    week_tab: "Uke",
    month_tab: "Måned",
    new_event: "Ny hendelse",
    icon_save: "Lagre",
    icon_cancel: "Avbryt",
    icon_details: "Detaljer",
    icon_edit: "Rediger",
    icon_delete: "Slett",
    confirm_closing: "",
    //Your changes will be lost, are your sure ?
    confirm_deleting: "Hendelsen vil bli slettet permanent. Er du sikker?",
    section_description: "Beskrivelse",
    section_time: "Tidsperiode",

    /*recurring events*/
    confirm_recurring: "Vil du forandre hele dette settet av repeterende hendelser?",
    section_recurring: "Repeter hendelsen",
    button_recurring: "Av",
    button_recurring_open: "På",
    button_edit_series: "Rediger serien",
    button_edit_occurrence: "Redigere en kopi",

    /*agenda view extension*/
    agenda_tab: "Agenda",
    date: "Dato",
    description: "Beskrivelse",

    /*year view extension*/
    year_tab: "År",

    /*week agenda view extension*/
    week_agenda_tab: "Agenda",

    /*grid view extension*/
    grid_tab: "Grid",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute",

    /* recurring event components */
    repeat_radio_day: "Daglig",
    repeat_radio_week: "Ukentlig",
    repeat_radio_month: "Månedlig",
    repeat_radio_year: "Årlig",
    repeat_radio_day_type: "Hver",
    repeat_text_day_count: "dag",
    repeat_radio_day_type2: "Alle hverdager",
    repeat_week: " Gjentas hver",
    repeat_text_week_count: "uke på:",
    repeat_radio_month_type: "På hver",
    repeat_radio_month_start: "På",
    repeat_text_month_day: "dag hver",
    repeat_text_month_count: "måned",
    repeat_text_month_count2_before: "hver",
    repeat_text_month_count2_after: "måned",
    repeat_year_label: "på",
    select_year_day2: "i",
    repeat_text_year_day: "dag i",
    select_year_month: "",
    repeat_radio_end: "Ingen sluttdato",
    repeat_text_occurences_count: "forekomst",
    repeat_radio_end3: "Stop den",
    repeat_radio_end2: "Etter",
    month_for_recurring: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"],
    day_for_recurring: ["Sondag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"]
  }
});

/***/ }),

/***/ "./sources/locale/locale_nl.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_nl.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
    month_short: ["Jan", "Feb", "mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
    day_full: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"],
    day_short: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"]
  },
  labels: {
    dhx_cal_today_button: "Vandaag",
    day_tab: "Dag",
    week_tab: "Week",
    month_tab: "Maand",
    new_event: "Nieuw item",
    icon_save: "Opslaan",
    icon_cancel: "Annuleren",
    icon_details: "Details",
    icon_edit: "Bewerken",
    icon_delete: "Verwijderen",
    confirm_closing: "",
    //Your changes will be lost, are your sure ?
    confirm_deleting: "Item zal permanent worden verwijderd, doorgaan?",
    section_description: "Beschrijving",
    section_time: "Tijd periode",
    full_day: "Hele dag",
    confirm_recurring: "Wilt u alle terugkerende items bijwerken?",
    section_recurring: "Item herhalen",
    button_recurring: "Uit",
    button_recurring_open: "Aan",
    button_edit_series: "Bewerk de serie",
    button_edit_occurrence: "Bewerk een kopie",

    /*agenda view extension*/
    agenda_tab: "Agenda",
    date: "Datum",
    description: "Omschrijving",

    /*year view extension*/
    year_tab: "Jaar",

    /*week agenda view extension*/
    week_agenda_tab: "Agenda",

    /*grid view extension*/
    grid_tab: "Tabel",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute",

    /* recurring event components */
    repeat_radio_day: "Dagelijks",
    repeat_radio_week: "Wekelijks",
    repeat_radio_month: "Maandelijks",
    repeat_radio_year: "Jaarlijks",
    repeat_radio_day_type: "Elke",
    repeat_text_day_count: "dag(en)",
    repeat_radio_day_type2: "Elke werkdag",
    repeat_week: " Herhaal elke",
    repeat_text_week_count: "week op de volgende dagen:",
    repeat_radio_month_type: "Herhaal",
    repeat_radio_month_start: "Op",
    repeat_text_month_day: "dag iedere",
    repeat_text_month_count: "maanden",
    repeat_text_month_count2_before: "iedere",
    repeat_text_month_count2_after: "maanden",
    repeat_year_label: "Op",
    select_year_day2: "van",
    repeat_text_year_day: "dag",
    select_year_month: "maand",
    repeat_radio_end: "Geen eind datum",
    repeat_text_occurences_count: "keren",
    repeat_radio_end3: "Eindigd per",
    repeat_radio_end2: "Na",
    month_for_recurring: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
    day_for_recurring: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"]
  }
});

/***/ }),

/***/ "./sources/locale/locale_no.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_no.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"],
    month_short: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
    day_full: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"],
    day_short: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"]
  },
  labels: {
    dhx_cal_today_button: "Idag",
    day_tab: "Dag",
    week_tab: "Uke",
    month_tab: "Måned",
    new_event: "Ny",
    icon_save: "Lagre",
    icon_cancel: "Avbryt",
    icon_details: "Detaljer",
    icon_edit: "Endre",
    icon_delete: "Slett",
    confirm_closing: "Endringer blir ikke lagret, er du sikker?",
    //Endringer blir ikke lagret, er du sikker?
    confirm_deleting: "Oppføringen vil bli slettet, er du sikker?",
    section_description: "Beskrivelse",
    section_time: "Tidsperiode",
    full_day: "Full dag",

    /*recurring events*/
    confirm_recurring: "Vil du endre hele settet med repeterende oppføringer?",
    section_recurring: "Repeterende oppføring",
    button_recurring: "Ikke aktiv",
    button_recurring_open: "Aktiv",
    button_edit_series: "Rediger serien",
    button_edit_occurrence: "Redigere en kopi",

    /*agenda view extension*/
    agenda_tab: "Agenda",
    date: "Dato",
    description: "Beskrivelse",

    /*year view extension*/
    year_tab: "År",

    /*week agenda view extension*/
    week_agenda_tab: "Agenda",

    /*grid view extension*/
    grid_tab: "Grid",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute"
  }
});

/***/ }),

/***/ "./sources/locale/locale_pl.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_pl.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
    month_short: ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"],
    day_full: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
    day_short: ["Nie", "Pon", "Wto", "Śro", "Czw", "Pią", "Sob"]
  },
  labels: {
    dhx_cal_today_button: "Dziś",
    day_tab: "Dzień",
    week_tab: "Tydzień",
    month_tab: "Miesiąc",
    new_event: "Nowe zdarzenie",
    icon_save: "Zapisz",
    icon_cancel: "Anuluj",
    icon_details: "Szczegóły",
    icon_edit: "Edytuj",
    icon_delete: "Usuń",
    confirm_closing: "",
    //Zmiany zostaną usunięte, jesteś pewien?
    confirm_deleting: "Zdarzenie zostanie usunięte na zawsze, kontynuować?",
    section_description: "Opis",
    section_time: "Okres czasu",
    full_day: "Cały dzień",

    /*recurring events*/
    confirm_recurring: "Czy chcesz edytować cały zbiór powtarzających się zdarzeń?",
    section_recurring: "Powtórz zdarzenie",
    button_recurring: "Nieaktywne",
    button_recurring_open: "Aktywne",
    button_edit_series: "Edytuj serię",
    button_edit_occurrence: "Edytuj kopię",

    /*agenda view extension*/
    agenda_tab: "Agenda",
    date: "Data",
    description: "Opis",

    /*year view extension*/
    year_tab: "Rok",

    /*week agenda view extension*/
    week_agenda_tab: "Agenda",

    /*grid view extension*/
    grid_tab: "Tabela",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute",

    /* recurring event components */
    repeat_radio_day: "Codziennie",
    repeat_radio_week: "Co tydzie",
    repeat_radio_month: "Co miesic",
    repeat_radio_year: "Co rok",
    repeat_radio_day_type: "Kadego",
    repeat_text_day_count: "dnia",
    repeat_radio_day_type2: "Kadego dnia roboczego",
    repeat_week: " Powtarzaj kadego",
    repeat_text_week_count: "tygodnia w dni:",
    repeat_radio_month_type: "Powtrz",
    repeat_radio_month_start: "W",
    repeat_text_month_day: "dnia kadego",
    repeat_text_month_count: "miesica",
    repeat_text_month_count2_before: "kadego",
    repeat_text_month_count2_after: "miesica",
    repeat_year_label: "W",
    select_year_day2: "miesica",
    repeat_text_year_day: "dnia miesica",
    select_year_month: "",
    repeat_radio_end: "Bez daty kocowej",
    repeat_text_occurences_count: "wystpieniu/ach",
    repeat_radio_end3: "Zakocz w",
    repeat_radio_end2: "Po",
    month_for_recurring: ["Stycznia", "Lutego", "Marca", "Kwietnia", "Maja", "Czerwca", "Lipca", "Sierpnia", "Wrzenia", "Padziernka", "Listopada", "Grudnia"],
    day_for_recurring: ["Niedziela", "Poniedziaek", "Wtorek", "roda", "Czwartek", "Pitek", "Sobota"]
  }
});

/***/ }),

/***/ "./sources/locale/locale_pt.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_pt.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*

 TRANSLATION BY MATTHEUS PIROVANI RORIZ GONЗALVES

 mattheusroriz@hotmail.com / mattheus.pirovani@gmail.com /

 www.atrixian.com.br

 */
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    month_short: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    day_full: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    day_short: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
  },
  labels: {
    dhx_cal_today_button: "Hoje",
    day_tab: "Dia",
    week_tab: "Semana",
    month_tab: "Mês",
    new_event: "Novo evento",
    icon_save: "Salvar",
    icon_cancel: "Cancelar",
    icon_details: "Detalhes",
    icon_edit: "Editar",
    icon_delete: "Deletar",
    confirm_closing: "",
    //Your changes will be lost, are your sure ?
    confirm_deleting: "Tem certeza que deseja excluir?",
    section_description: "Descrição",
    section_time: "Período de tempo",
    full_day: "Dia inteiro",
    confirm_recurring: "Deseja editar todos esses eventos repetidos?",
    section_recurring: "Repetir evento",
    button_recurring: "Desabilitar",
    button_recurring_open: "Habilitar",
    button_edit_series: "Editar a série",
    button_edit_occurrence: "Editar uma cópia",

    /*agenda view extension*/
    agenda_tab: "Dia",
    date: "Data",
    description: "Descrição",

    /*year view extension*/
    year_tab: "Ano",

    /*week agenda view extension*/
    week_agenda_tab: "Dia",

    /*grid view extension*/
    grid_tab: "Grade",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute",

    /* recurring event components */
    repeat_radio_day: "Diário",
    repeat_radio_week: "Semanal",
    repeat_radio_month: "Mensal",
    repeat_radio_year: "Anual",
    repeat_radio_day_type: "Cada",
    repeat_text_day_count: "dia(s)",
    repeat_radio_day_type2: "Cada trabalho diário",
    repeat_week: " Repita cada",
    repeat_text_week_count: "semana:",
    repeat_radio_month_type: "Repetir",
    repeat_radio_month_start: "Em",
    repeat_text_month_day: "todo dia",
    repeat_text_month_count: "mês",
    repeat_text_month_count2_before: "todo",
    repeat_text_month_count2_after: "mês",
    repeat_year_label: "Em",
    select_year_day2: "of",
    repeat_text_year_day: "dia",
    select_year_month: "mês",
    repeat_radio_end: "Sem data final",
    repeat_text_occurences_count: "ocorrências",
    repeat_radio_end3: "Fim",
    repeat_radio_end2: "Depois",
    month_for_recurring: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    day_for_recurring: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
  }
});

/***/ }),

/***/ "./sources/locale/locale_ro.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_ro.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
	Traducere de Ovidiu Lixandru: http://www.madball.ro
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "November", "December"],
    month_short: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    day_full: ["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"],
    day_short: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sa"]
  },
  labels: {
    dhx_cal_today_button: "Astazi",
    day_tab: "Zi",
    week_tab: "Saptamana",
    month_tab: "Luna",
    new_event: "Eveniment nou",
    icon_save: "Salveaza",
    icon_cancel: "Anuleaza",
    icon_details: "Detalii",
    icon_edit: "Editeaza",
    icon_delete: "Sterge",
    confirm_closing: "Schimbarile nu vor fi salvate, esti sigur?",
    //Your changes will be lost, are your sure ?
    confirm_deleting: "Evenimentul va fi sters permanent, esti sigur?",
    section_description: "Descriere",
    section_time: "Interval",
    full_day: "Toata ziua",

    /*recurring events*/
    confirm_recurring: "Vrei sa editezi toata seria de evenimente repetate?",
    section_recurring: "Repetare",
    button_recurring: "Dezactivata",
    button_recurring_open: "Activata",
    button_edit_series: "Editeaza serie",
    button_edit_occurrence: "Editeaza doar intrare",

    /*agenda view extension*/
    agenda_tab: "Agenda",
    date: "Data",
    description: "Descriere",

    /*year view extension*/
    year_tab: "An",

    /* week agenda extension */
    week_agenda_tab: "Agenda",

    /*grid view extension*/
    grid_tab: "Lista",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute",

    /* recurring event components */
    repeat_radio_day: "Zilnic",
    repeat_radio_week: "Saptamanal",
    repeat_radio_month: "Lunar",
    repeat_radio_year: "Anual",
    repeat_radio_day_type: "La fiecare",
    repeat_text_day_count: "zi(le)",
    repeat_radio_day_type2: "Fiecare zi lucratoare",
    repeat_week: " Repeta la fiecare",
    repeat_text_week_count: "saptamana in urmatoarele zile:",
    repeat_radio_month_type: "Repeta in",
    repeat_radio_month_start: "In a",
    repeat_text_month_day: "zi la fiecare",
    repeat_text_month_count: "luni",
    repeat_text_month_count2_before: "la fiecare",
    repeat_text_month_count2_after: "luni",
    repeat_year_label: "In",
    select_year_day2: "a lunii",
    repeat_text_year_day: "zi a lunii",
    select_year_month: "",
    repeat_radio_end: "Fara data de sfarsit",
    repeat_text_occurences_count: "evenimente",
    repeat_radio_end3: "La data",
    repeat_radio_end2: "Dupa",
    month_for_recurring: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
    day_for_recurring: ["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"]
  }
});

/***/ }),

/***/ "./sources/locale/locale_ru.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_ru.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Январь", "Февраль", "Март", "Апрель", "Maй", "Июнь", "Июль", "Август", "Сентябрь", "Oктябрь", "Ноябрь", "Декабрь"],
    month_short: ["Янв", "Фев", "Maр", "Aпр", "Maй", "Июн", "Июл", "Aвг", "Сен", "Окт", "Ноя", "Дек"],
    day_full: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    day_short: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
  },
  labels: {
    dhx_cal_today_button: "Сегодня",
    day_tab: "День",
    week_tab: "Неделя",
    month_tab: "Месяц",
    new_event: "Новое событие",
    icon_save: "Сохранить",
    icon_cancel: "Отменить",
    icon_details: "Детали",
    icon_edit: "Изменить",
    icon_delete: "Удалить",
    confirm_closing: "",
    //Ваши изменения будут потеряны, продолжить?
    confirm_deleting: "Событие будет удалено безвозвратно, продолжить?",
    section_description: "Описание",
    section_time: "Период времени",
    full_day: "Весь день",
    confirm_recurring: "Вы хотите изменить всю серию повторяющихся событий?",
    section_recurring: "Повторение",
    button_recurring: "Отключено",
    button_recurring_open: "Включено",
    button_edit_series: "Редактировать серию",
    button_edit_occurrence: "Редактировать экземпляр",

    /*agenda view extension*/
    agenda_tab: "Список",
    date: "Дата",
    description: "Описание",

    /*year view extension*/
    year_tab: "Год",

    /*week agenda view extension*/
    week_agenda_tab: "Список",

    /*grid view extension*/
    grid_tab: "Таблица",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute",

    /* recurring event components */
    repeat_radio_day: "День",
    repeat_radio_week: "Неделя",
    repeat_radio_month: "Месяц",
    repeat_radio_year: "Год",
    repeat_radio_day_type: "Каждый",
    repeat_text_day_count: "день",
    repeat_radio_day_type2: "Каждый рабочий день",
    repeat_week: " Повторять каждую",
    repeat_text_week_count: "неделю , в:",
    repeat_radio_month_type: "Повторять",
    repeat_radio_month_start: "",
    repeat_text_month_day: " числа каждый ",
    repeat_text_month_count: "месяц",
    repeat_text_month_count2_before: "каждый ",
    repeat_text_month_count2_after: "месяц",
    repeat_year_label: "",
    select_year_day2: "",
    repeat_text_year_day: "день",
    select_year_month: "",
    repeat_radio_end: "Без даты окончания",
    repeat_text_occurences_count: "повторений",
    repeat_radio_end3: "До ",
    repeat_radio_end2: "",
    month_for_recurring: ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"],
    day_for_recurring: ["Воскресенье", "Понедельник", "Вторник", "Среду", "Четверг", "Пятницу", "Субботу"]
  }
});

/***/ }),

/***/ "./sources/locale/locale_si.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_si.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"],
    month_short: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
    day_full: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"],
    day_short: ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"]
  },
  labels: {
    dhx_cal_today_button: "Danes",
    day_tab: "Dan",
    week_tab: "Teden",
    month_tab: "Mesec",
    new_event: "Nov dogodek",
    icon_save: "Shrani",
    icon_cancel: "Prekliči",
    icon_details: "Podrobnosti",
    icon_edit: "Uredi",
    icon_delete: "Izbriši",
    confirm_closing: "",
    //Spremembe ne bodo shranjene. Želite nadaljevati ?
    confirm_deleting: "Dogodek bo izbrisan. Želite nadaljevati?",
    section_description: "Opis",
    section_time: "Časovni okvir",
    full_day: "Ves dan",

    /*recurring events*/
    confirm_recurring: "Želite urediti celoten set ponavljajočih dogodkov?",
    section_recurring: "Ponovi dogodek",
    button_recurring: "Onemogočeno",
    button_recurring_open: "Omogočeno",
    button_edit_series: "Edit series",
    button_edit_occurrence: "Edit occurrence",

    /*agenda view extension*/
    agenda_tab: "Zadeva",
    date: "Datum",
    description: "Opis",

    /*year view extension*/
    year_tab: "Leto",

    /*week agenda view extension*/
    week_agenda_tab: "Zadeva",

    /*grid view extension*/
    grid_tab: "Miza",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute"
  }
});

/***/ }),

/***/ "./sources/locale/locale_sk.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_sk.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"],
    month_short: ["Jan", "Feb", "Mar", "Apr", "Máj", "Jún", "Júl", "Aug", "Sept", "Okt", "Nov", "Dec"],
    day_full: ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"],
    day_short: ["Ne", "Po", "Ut", "St", "Št", "Pi", "So"]
  },
  labels: {
    dhx_cal_today_button: "Dnes",
    day_tab: "Deň",
    week_tab: "Týždeň",
    month_tab: "Mesiac",
    new_event: "Nová udalosť",
    icon_save: "Uložiť",
    icon_cancel: "Späť",
    icon_details: "Detail",
    icon_edit: "Edituj",
    icon_delete: "Zmazať",
    confirm_closing: "Vaše zmeny nebudú uložené. Skutočne?",
    //Vaše změny budou ztraceny, opravdu ?
    confirm_deleting: "Udalosť bude natrvalo vymazaná. Skutočne?",
    section_description: "Poznámky",
    section_time: "Doba platnosti",

    /*recurring events*/
    confirm_recurring: "Prajete si upraviť celú radu opakovaných udalostí?",
    section_recurring: "Opakovanie udalosti",
    button_recurring: "Vypnuté",
    button_recurring_open: "Zapnuté",
    button_edit_series: "Upraviť opakovania",
    button_edit_occurrence: "Upraviť inštancie",

    /*agenda view extension*/
    agenda_tab: "Program",
    date: "Dátum",
    description: "Poznámka",

    /*year view extension*/
    year_tab: "Rok",
    full_day: "Celý deň",
    // Full day

    /*week agenda view extension*/
    week_agenda_tab: "Program",

    /*grid view extension*/
    grid_tab: "Mriežka",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute",

    /* recurring event components */
    repeat_radio_day: "Denne",
    repeat_radio_week: "Týždenne",
    repeat_radio_month: "Mesaène",
    repeat_radio_year: "Roène",
    repeat_radio_day_type: "Každý",
    repeat_text_day_count: "deò",
    repeat_radio_day_type2: "Každý prac. deò",
    repeat_week: "Opakova každý",
    repeat_text_week_count: "týždeò v dòoch:",
    repeat_radio_month_type: "Opakova",
    repeat_radio_month_start: "On",
    repeat_text_month_day: "deò každý",
    repeat_text_month_count: "mesiac",
    repeat_text_month_count2_before: "každý",
    repeat_text_month_count2_after: "mesiac",
    repeat_year_label: "On",
    select_year_day2: "poèas",
    repeat_text_year_day: "deò",
    select_year_month: "mesiac",
    repeat_radio_end: "Bez dátumu ukonèenia",
    repeat_text_occurences_count: "udalostiach",
    repeat_radio_end3: "Ukonèi",
    repeat_radio_end2: "Po",
    month_for_recurring: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"],
    day_for_recurring: ["Nede¾a", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"]
  }
});

/***/ }),

/***/ "./sources/locale/locale_sv.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_sv.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
    month_short: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
    day_full: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"],
    day_short: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"]
  },
  labels: {
    dhx_cal_today_button: "Idag",
    day_tab: "Dag",
    week_tab: "Vecka",
    month_tab: "Månad",
    new_event: "Ny händelse",
    icon_save: "Spara",
    icon_cancel: "Ångra",
    icon_details: "Detaljer",
    icon_edit: "Ändra",
    icon_delete: "Ta bort",
    confirm_closing: "",
    //Dina förändingar kommer gå förlorade, är du säker?
    confirm_deleting: "Är du säker på att du vill ta bort händelsen permanent?",
    section_description: "Beskrivning",
    section_time: "Tid",
    full_day: "Hela dagen",

    /*recurring events*/
    confirm_recurring: "Vill du redigera hela serien med repeterande händelser?",
    section_recurring: "Upprepa händelse",
    button_recurring: "Inaktiverat",
    button_recurring_open: "Aktiverat",
    button_edit_series: "Redigera serien",
    button_edit_occurrence: "Redigera en kopia",

    /*agenda view extension*/
    agenda_tab: "Dagordning",
    date: "Datum",
    description: "Beskrivning",

    /*year view extension*/
    year_tab: "År",

    /*week agenda view extension*/
    week_agenda_tab: "Dagordning",

    /*grid view extension*/
    grid_tab: "Galler",

    /* touch tooltip*/
    drag_to_create: "Dra för att skapa ny",
    drag_to_move: "Dra för att flytta",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute",

    /* recurring event components */
    repeat_radio_day: "Dagligen",
    repeat_radio_week: "Veckovis",
    repeat_radio_month: "Månadsvis",
    repeat_radio_year: "Årligen",
    repeat_radio_day_type: "Var",
    repeat_text_day_count: "dag",
    repeat_radio_day_type2: "Varje arbetsdag",
    repeat_week: " Upprepa var",
    repeat_text_week_count: "vecka dessa dagar:",
    repeat_radio_month_type: "Upprepa",
    repeat_radio_month_start: "Den",
    repeat_text_month_day: "dagen var",
    repeat_text_month_count: "månad",
    repeat_text_month_count2_before: "var",
    repeat_text_month_count2_after: "månad",
    repeat_year_label: "Den",
    select_year_day2: "i",
    repeat_text_year_day: "dag i",
    select_year_month: "månad",
    repeat_radio_end: "Inget slutdatum",
    repeat_text_occurences_count: "upprepningar",
    repeat_radio_end3: "Sluta efter",
    repeat_radio_end2: "Efter",
    month_for_recurring: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
    day_for_recurring: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"]
  }
});

/***/ }),

/***/ "./sources/locale/locale_tr.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_tr.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Ocak", "Þubat", "Mart", "Nisan", "Mayýs", "Haziran", "Temmuz", "Aðustos", "Eylül", "Ekim", "Kasým", "Aralýk"],
    month_short: ["Oca", "Þub", "Mar", "Nis", "May", "Haz", "Tem", "Aðu", "Eyl", "Eki", "Kas", "Ara"],
    day_full: ["Pazar", "Pazartes,", "Salý", "Çarþamba", "Perþembe", "Cuma", "Cumartesi"],
    day_short: ["Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"]
  },
  labels: {
    dhx_cal_today_button: "Bugün",
    day_tab: "Gün",
    week_tab: "Hafta",
    month_tab: "Ay",
    new_event: "Uygun",
    icon_save: "Kaydet",
    icon_cancel: "Ýptal",
    icon_details: "Detaylar",
    icon_edit: "Düzenle",
    icon_delete: "Sil",
    confirm_closing: "",
    //Your changes will be lost, are your sure ?
    confirm_deleting: "Etkinlik silinecek, devam?",
    section_description: "Açýklama",
    section_time: "Zaman aralýðý",
    full_day: "Tam gün",

    /*recurring events*/
    confirm_recurring: "Tüm tekrar eden etkinlikler silinecek, devam?",
    section_recurring: "Etkinliði tekrarla",
    button_recurring: "Pasif",
    button_recurring_open: "Aktif",
    button_edit_series: "Dizi düzenleme",
    button_edit_occurrence: "Bir kopyasını düzenleyin",

    /*agenda view extension*/
    agenda_tab: "Ajanda",
    date: "Tarih",
    description: "Açýklama",

    /*year view extension*/
    year_tab: "Yýl",

    /*week agenda view extension*/
    week_agenda_tab: "Ajanda",

    /*grid view extension*/
    grid_tab: "Izgara",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute"
  }
});

/***/ }),

/***/ "./sources/locale/locale_ua.js":
/*!*************************************!*\
  !*** ./sources/locale/locale_ua.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  date: {
    month_full: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
    month_short: ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"],
    day_full: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"],
    day_short: ["Нед", "Пон", "Вів", "Сер", "Чет", "Птн", "Суб"]
  },
  labels: {
    dhx_cal_today_button: "Сьогодні",
    day_tab: "День",
    week_tab: "Тиждень",
    month_tab: "Місяць",
    new_event: "Нова подія",
    icon_save: "Зберегти",
    icon_cancel: "Відміна",
    icon_details: "Деталі",
    icon_edit: "Редагувати",
    icon_delete: "Вилучити",
    confirm_closing: "",
    //Ваші зміни втратяться. Ви впевнені ?
    confirm_deleting: "Подія вилучиться назавжди. Ви впевнені?",
    section_description: "Опис",
    section_time: "Часовий проміжок",
    full_day: "Весь день",

    /*recurring events*/
    confirm_recurring: "Хочете редагувати весь перелік повторюваних подій?",
    section_recurring: "Повторювана подія",
    button_recurring: "Відключено",
    button_recurring_open: "Включено",
    button_edit_series: "Редагувати серію",
    button_edit_occurrence: "Редагувати примірник",

    /*agenda view extension*/
    agenda_tab: "Перелік",
    date: "Дата",
    description: "Опис",

    /*year view extension*/
    year_tab: "Рік",

    /*week agenda view extension*/
    week_agenda_tab: "Перелік",

    /*grid view extension*/
    grid_tab: "Таблиця",

    /* touch tooltip*/
    drag_to_create: "Drag to create",
    drag_to_move: "Drag to move",

    /* dhtmlx message default buttons */
    message_ok: "OK",
    message_cancel: "Cancel",

    /* wai aria labels for non-text controls */
    next: "Next",
    prev: "Previous",
    year: "Year",
    month: "Month",
    day: "Day",
    hour: "Hour",
    minute: "Minute",

    /* recurring event components */
    repeat_radio_day: "День",
    repeat_radio_week: "Тиждень",
    repeat_radio_month: "Місяць",
    repeat_radio_year: "Рік",
    repeat_radio_day_type: "Кожний",
    repeat_text_day_count: "день",
    repeat_radio_day_type2: "Кожний робочий день",
    repeat_week: " Повторювати кожен",
    repeat_text_week_count: "тиждень , по:",
    repeat_radio_month_type: "Повторювати",
    repeat_radio_month_start: "",
    repeat_text_month_day: " числа кожний ",
    repeat_text_month_count: "місяць",
    repeat_text_month_count2_before: "кожен ",
    repeat_text_month_count2_after: "місяць",
    repeat_year_label: "",
    select_year_day2: "",
    repeat_text_year_day: "день",
    select_year_month: "",
    repeat_radio_end: "Без дати закінчення",
    repeat_text_occurences_count: "повторень",
    repeat_radio_end3: "До ",
    repeat_radio_end2: "",
    month_for_recurring: ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"],
    day_for_recurring: ["Неділям", "Понеділкам", "Вівторкам", "Середам", "Четвергам", "П'ятницям", "Суботам"]
  }
});

/***/ }),

/***/ "./sources/publish_helpers/void_script_first.js":
/*!******************************************************!*\
  !*** ./sources/publish_helpers/void_script_first.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// all builds except for evaluation version get this mockup
// the evaluation build gets actual codes
/* harmony default export */ __webpack_exports__["default"] = (function () {});

/***/ }),

/***/ "./sources/publish_helpers/void_script_second.js":
/*!*******************************************************!*\
  !*** ./sources/publish_helpers/void_script_second.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// all builds except for evaluation version get this mockup
// the evaluation build gets actual codes
/* harmony default export */ __webpack_exports__["default"] = (function () {});

/***/ }),

/***/ "./sources/publish_helpers/void_script_third.js":
/*!******************************************************!*\
  !*** ./sources/publish_helpers/void_script_third.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// all builds except for evaluation version get this mockup
// the evaluation build gets actual codes
/* harmony default export */ __webpack_exports__["default"] = (function () {});

/***/ }),

/***/ "./sources/scheduler_factory.js":
/*!**************************************!*\
  !*** ./sources/scheduler_factory.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dhtmlx_hook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dhtmlx_hook */ "./sources/dhtmlx_hook.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global */ "./sources/global.js");
/* harmony import */ var _scheduler_factory_method__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scheduler_factory_method */ "./sources/scheduler_factory_method.js");
/* harmony import */ var _ext_extension_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ext/extension_manager */ "./sources/ext/extension_manager.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


Object(_dhtmlx_hook__WEBPACK_IMPORTED_MODULE_0__["default"])();




var SchedulerFactory = /*#__PURE__*/function () {
  function SchedulerFactory(extensions) {
    _classCallCheck(this, SchedulerFactory);

    this._seed = 0;
    this._schedulerPlugins = [];
    this._bundledExtensions = extensions;
    this._extensionsManager = new _ext_extension_manager__WEBPACK_IMPORTED_MODULE_3__["default"](extensions);
  }

  _createClass(SchedulerFactory, [{
    key: "plugin",
    value: function plugin(code) {
      this._schedulerPlugins.push(code);

      if (_global__WEBPACK_IMPORTED_MODULE_1__["default"].scheduler) {
        code(_global__WEBPACK_IMPORTED_MODULE_1__["default"].scheduler);
      }
    }
  }, {
    key: "getSchedulerInstance",
    value: function getSchedulerInstance(initConfig) {
      var scheduler = Object(_scheduler_factory_method__WEBPACK_IMPORTED_MODULE_2__["default"])(this._extensionsManager);

      for (var i = 0; i < this._schedulerPlugins.length; i++) {
        this._schedulerPlugins[i](scheduler);
      }

      scheduler._internal_id = this._seed++;

      if (this.$syncFactory) {
        this.$syncFactory(scheduler);
      }

      if (initConfig) {
        this._initFromConfig(scheduler, initConfig);
      }

      return scheduler;
    }
  }, {
    key: "_initFromConfig",
    value: function _initFromConfig(scheduler, initConfig) {
      if (initConfig.plugins) {
        scheduler.plugins(initConfig.plugins);
      }

      if (initConfig.config) {
        scheduler.mixin(scheduler.config, initConfig.config, true);
      }

      if (initConfig.templates) {
        scheduler.attachEvent("onTemplatesReady", function () {
          scheduler.mixin(scheduler.templates, initConfig.templates, true);
        }, {
          once: true
        });
      }

      if (initConfig.events) {
        for (var event in initConfig.events) {
          scheduler.attachEvent(event, initConfig.events[event]);
        }
      }

      if (initConfig.locale) {
        scheduler.i18n.setLocale(initConfig.locale);
      }

      if (Array.isArray(initConfig.calendars)) {
        initConfig.calendars.forEach(function (calendar) {
          scheduler.addCalendar(calendar);
        });
      }

      if (initConfig.container) {
        scheduler.init(initConfig.container);
      } else {
        scheduler.init();
      }

      if (initConfig.data) {
        if (typeof initConfig.data === "string") {
          scheduler.load(initConfig.data);
        } else {
          scheduler.parse(initConfig.data);
        }
      }
    }
  }]);

  return SchedulerFactory;
}();

/* harmony default export */ __webpack_exports__["default"] = (SchedulerFactory);

/***/ }),

/***/ "./sources/scheduler_factory_method.js":
/*!*********************************************!*\
  !*** ./sources/scheduler_factory_method.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_terrace_skin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/terrace.skin */ "./sources/css/terrace.skin.js");
/* harmony import */ var _core_common_assert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/common/assert */ "./sources/core/common/assert.js");
/* harmony import */ var _core_common_errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/common_errors */ "./sources/core/common_errors.js");
/* harmony import */ var _core_connector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/connector */ "./sources/core/connector.js");
/* harmony import */ var _core_scheduler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/scheduler */ "./sources/core/scheduler.js");
/* harmony import */ var _core_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/common */ "./sources/core/common.js");
/* harmony import */ var _core_wai_aria__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/wai_aria */ "./sources/core/wai_aria.js");
/* harmony import */ var _core_utils_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core/utils/utils */ "./sources/core/utils/utils.js");
/* harmony import */ var _core_utils_dom_helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./core/utils/dom_helpers */ "./sources/core/utils/dom_helpers.js");
/* harmony import */ var _utils_env__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/env */ "./sources/utils/env.js");
/* harmony import */ var _core_utils_bluebird__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./core/utils/bluebird */ "./sources/core/utils/bluebird.js");
/* harmony import */ var _core_destructor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./core/destructor */ "./sources/core/destructor.js");
/* harmony import */ var _core_utils_ajax__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./core/utils/ajax */ "./sources/core/utils/ajax.js");
/* harmony import */ var _core_base__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./core/base */ "./sources/core/base.js");
/* harmony import */ var _core_config__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./core/config */ "./sources/core/config.js");
/* harmony import */ var _core_event__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./core/event */ "./sources/core/event.js");
/* harmony import */ var _core_event_highlight__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./core/event_highlight */ "./sources/core/event_highlight.js");
/* harmony import */ var _core_load__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./core/load */ "./sources/core/load.js");
/* harmony import */ var _core_lightbox__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./core/lightbox */ "./sources/core/lightbox.js");
/* harmony import */ var _core_touch__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./core/touch */ "./sources/core/touch.js");
/* harmony import */ var _core_dhtmlx_dhtmlx_suite_hooks__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./core/dhtmlx/dhtmlx_suite_hooks */ "./sources/core/dhtmlx/dhtmlx_suite_hooks.js");
/* harmony import */ var _core_skins__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./core/skins */ "./sources/core/skins.js");
/* harmony import */ var _core_jquery__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./core/jquery */ "./sources/core/jquery.js");
/* harmony import */ var _core_delay_render__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./core/delay_render */ "./sources/core/delay_render.js");
/* harmony import */ var _core_dataprocessor_dataprocessor__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./core/dataprocessor/dataprocessor */ "./sources/core/dataprocessor/dataprocessor.js");
/* harmony import */ var _core_message__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./core/message */ "./sources/core/message.js");
/* harmony import */ var _locale__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./locale */ "./sources/locale/index.js");
/* harmony import */ var _publish_helpers_void_script_first__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./publish_helpers/void_script_first */ "./sources/publish_helpers/void_script_first.js");
/* harmony import */ var _publish_helpers_void_script_second__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./publish_helpers/void_script_second */ "./sources/publish_helpers/void_script_second.js");
/* harmony import */ var _publish_helpers_void_script_third__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./publish_helpers/void_script_third */ "./sources/publish_helpers/void_script_third.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }































/* harmony default export */ __webpack_exports__["default"] = (function (extensionManager) {
  var scheduler = {
    version: "6.0.2"
  };
  Object(_core_common_errors__WEBPACK_IMPORTED_MODULE_2__["default"])(scheduler);
  Object(_core_common__WEBPACK_IMPORTED_MODULE_5__["default"])(scheduler);
  Object(_core_scheduler__WEBPACK_IMPORTED_MODULE_4__["default"])(scheduler);
  Object(_core_wai_aria__WEBPACK_IMPORTED_MODULE_6__["default"])(scheduler); //utils(scheduler);

  scheduler.utils = _core_utils_utils__WEBPACK_IMPORTED_MODULE_7__["default"];
  scheduler.$domHelpers = _core_utils_dom_helpers__WEBPACK_IMPORTED_MODULE_8__["default"];
  scheduler.utils.dom = _core_utils_dom_helpers__WEBPACK_IMPORTED_MODULE_8__["default"];
  scheduler.uid = _core_utils_utils__WEBPACK_IMPORTED_MODULE_7__["default"].uid;
  scheduler.mixin = _core_utils_utils__WEBPACK_IMPORTED_MODULE_7__["default"].mixin;
  scheduler.defined = _core_utils_utils__WEBPACK_IMPORTED_MODULE_7__["default"].defined;
  scheduler.assert = Object(_core_common_assert__WEBPACK_IMPORTED_MODULE_1__["default"])(scheduler);
  scheduler.copy = _core_utils_utils__WEBPACK_IMPORTED_MODULE_7__["default"].copy; //old api compatibility

  scheduler._getFocusableNodes = _core_utils_dom_helpers__WEBPACK_IMPORTED_MODULE_8__["default"].getFocusableNodes;
  scheduler._getClassName = _core_utils_dom_helpers__WEBPACK_IMPORTED_MODULE_8__["default"].getClassName;
  scheduler._locate_css = _core_utils_dom_helpers__WEBPACK_IMPORTED_MODULE_8__["default"].locateCss;
  var messageApi = Object(_core_message__WEBPACK_IMPORTED_MODULE_25__["default"])(scheduler);
  scheduler.utils.mixin(scheduler, messageApi);
  scheduler.env = scheduler.$env = _utils_env__WEBPACK_IMPORTED_MODULE_9__["default"];
  scheduler.Promise = _core_utils_bluebird__WEBPACK_IMPORTED_MODULE_10__["default"];
  Object(_core_destructor__WEBPACK_IMPORTED_MODULE_11__["default"])(scheduler);
  Object(_core_utils_ajax__WEBPACK_IMPORTED_MODULE_12__["default"])(scheduler);
  Object(_publish_helpers_void_script_first__WEBPACK_IMPORTED_MODULE_27__["default"])(scheduler);
  Object(_core_base__WEBPACK_IMPORTED_MODULE_13__["default"])(scheduler);
  Object(_core_config__WEBPACK_IMPORTED_MODULE_14__["default"])(scheduler);
  Object(_core_event__WEBPACK_IMPORTED_MODULE_15__["default"])(scheduler);
  Object(_core_event_highlight__WEBPACK_IMPORTED_MODULE_16__["default"])(scheduler);
  Object(_core_load__WEBPACK_IMPORTED_MODULE_17__["default"])(scheduler);
  Object(_core_lightbox__WEBPACK_IMPORTED_MODULE_18__["default"])(scheduler);
  Object(_core_touch__WEBPACK_IMPORTED_MODULE_19__["default"])(scheduler);
  Object(_core_dhtmlx_dhtmlx_suite_hooks__WEBPACK_IMPORTED_MODULE_20__["default"])(scheduler);
  Object(_publish_helpers_void_script_second__WEBPACK_IMPORTED_MODULE_28__["default"])(scheduler);
  Object(_core_skins__WEBPACK_IMPORTED_MODULE_21__["default"])(scheduler);
  Object(_core_jquery__WEBPACK_IMPORTED_MODULE_22__["default"])(scheduler);
  Object(_core_delay_render__WEBPACK_IMPORTED_MODULE_23__["default"])(scheduler);
  Object(_core_dataprocessor_dataprocessor__WEBPACK_IMPORTED_MODULE_24__["default"])(scheduler);
  Object(_publish_helpers_void_script_third__WEBPACK_IMPORTED_MODULE_29__["default"])(scheduler);
  Object(_core_connector__WEBPACK_IMPORTED_MODULE_3__["default"])(scheduler);
  var i18n = Object(_locale__WEBPACK_IMPORTED_MODULE_26__["default"])();
  scheduler.i18n = {
    addLocale: i18n.addLocale,
    setLocale: function setLocale(locale) {
      if (typeof locale === "string") {
        var localeObject = i18n.getLocale(locale);

        if (!localeObject) {
          localeObject = i18n.getLocale("en");
        }

        scheduler.locale = localeObject;
      } else if (locale) {
        if (!scheduler.locale) {
          scheduler.locale = locale;
        } else {
          for (var i in locale) {
            if (locale[i] && _typeof(locale[i]) === "object") {
              if (!scheduler.locale[i]) {
                scheduler.locale[i] = {};
              }

              scheduler.mixin(scheduler.locale[i], locale[i], true);
            } else {
              scheduler.locale[i] = locale[i];
            }
          }
        }
      }
    },
    getLocale: i18n.getLocale
  };
  scheduler.i18n.setLocale("en");
  scheduler.ext = {};
  var activePlugins = {};

  scheduler.plugins = function (config) {
    var extensionList = getExtensionList(config, {
      treetimeline: ["timeline"],
      daytimeline: ["timeline"],
      outerdrag: ["legacy"]
    }, {
      legacy: 1,
      limit: 1,
      timeline: 2,
      daytimeline: 3,
      treetimeline: 3,
      outerdrag: 6
    });
    extensionList.forEach(function (name) {
      if (!activePlugins[name]) {
        var plugin = extensionManager.getExtension(name);

        if (plugin) {
          plugin(scheduler);
          activePlugins[name] = true;
        } else {
          throw new Error("unknown plugin " + name);
        }
      }
    });
  };

  function getExtensionList(config, dependencies, priorities) {
    var result = [];

    for (var i in config) {
      if (config[i]) {
        var extension = i.toLowerCase();

        if (dependencies[extension]) {
          dependencies[extension].forEach(function (dep) {
            var dependencyName = dep.toLowerCase();

            if (!config[dependencyName]) {
              result.push(dependencyName);
            }
          });
        }

        result.push(extension);
      }
    }

    result.sort(function (a, b) {
      var orderA = priorities[a] || 0;
      var orderB = priorities[b] || 0;

      if (orderA > orderB) {
        return 1;
      } else if (orderA < orderB) {
        return -1;
      } else {
        return 0;
      }
    });
    return result;
  }

  return scheduler;
});

/***/ }),

/***/ "./sources/utils/env.js":
/*!******************************!*\
  !*** ./sources/utils/env.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable no-restricted-globals */
var isWindowAwailable = typeof window !== "undefined";
/* eslint-enable no-restricted-globals */

/* harmony default export */ __webpack_exports__["default"] = ({
  isIE: isWindowAwailable && (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent.indexOf("Trident") >= 0),
  isIE6: isWindowAwailable && !XMLHttpRequest && navigator.userAgent.indexOf("MSIE") >= 0,
  isIE7: isWindowAwailable && navigator.userAgent.indexOf("MSIE 7.0") >= 0 && navigator.userAgent.indexOf("Trident") < 0,
  isIE8: isWindowAwailable && navigator.userAgent.indexOf("MSIE 8.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0,
  isOpera: isWindowAwailable && navigator.userAgent.indexOf("Opera") >= 0,
  isChrome: isWindowAwailable && navigator.userAgent.indexOf("Chrome") >= 0,
  isKHTML: isWindowAwailable && (navigator.userAgent.indexOf("Safari") >= 0 || navigator.userAgent.indexOf("Konqueror") >= 0),
  isFF: isWindowAwailable && navigator.userAgent.indexOf("Firefox") >= 0,
  isIPad: isWindowAwailable && navigator.userAgent.search(/iPad/gi) >= 0,
  isEdge: isWindowAwailable && navigator.userAgent.indexOf("Edge") != -1,
  isNode: !isWindowAwailable || typeof navigator == "undefined"
});

/***/ }),

/***/ "./sources/utils/eventable.js":
/*!************************************!*\
  !*** ./sources/utils/eventable.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventHost = /*#__PURE__*/function () {
  function EventHost() {
    _classCallCheck(this, EventHost);

    this._silent_mode = false;
    this.listeners = {};
  }

  _createClass(EventHost, [{
    key: "_silentStart",
    value: function _silentStart() {
      this._silent_mode = true;
    }
  }, {
    key: "_silentEnd",
    value: function _silentEnd() {
      this._silent_mode = false;
    }
  }]);

  return EventHost;
}();

var createEventStorage = function createEventStorage(obj) {
  var handlers = {};
  var index = 0;

  var eventStorage = function eventStorage() {
    var combinedResult = true;

    for (var i in handlers) {
      var handlerResult = handlers[i].apply(obj, arguments);
      combinedResult = combinedResult && handlerResult;
    }

    return combinedResult;
  };

  eventStorage.addEvent = function (handler, settings) {
    if (typeof handler == "function") {
      var handlerId;

      if (settings && settings.id) {
        handlerId = settings.id;
      } else {
        handlerId = index;
        index++;
      }

      if (settings && settings.once) {
        var originalHandler = handler;

        handler = function handler() {
          originalHandler();
          eventStorage.removeEvent(handlerId);
        };
      }

      handlers[handlerId] = handler;
      return handlerId;
    }

    return false;
  };

  eventStorage.removeEvent = function (id) {
    delete handlers[id];
  };

  eventStorage.clear = function () {
    handlers = {};
  };

  return eventStorage;
};

function makeEventable(obj) {
  var eventHost = new EventHost();

  obj.attachEvent = function (eventName, handler, settings) {
    eventName = 'ev_' + eventName.toLowerCase();

    if (!eventHost.listeners[eventName]) {
      eventHost.listeners[eventName] = createEventStorage(this);
    }

    if (settings && settings.thisObject) {
      handler = handler.bind(settings.thisObject);
    }

    var innerId = eventHost.listeners[eventName].addEvent(handler, settings);
    var handlerId = eventName + ':' + innerId; //return ID (ev_eventname:1)

    if (settings && settings.id) {
      handlerId = settings.id;
    }

    return handlerId;
  };

  obj.attachAll = function (callback) {
    this.attachEvent('listen_all', callback);
  };

  obj.callEvent = function (name, eventArguments) {
    if (eventHost._silent_mode) return true;
    var handlerName = 'ev_' + name.toLowerCase();
    var listeners = eventHost.listeners;

    if (listeners['ev_listen_all']) {
      listeners['ev_listen_all'].apply(this, [name].concat(eventArguments));
    }

    if (listeners[handlerName]) return listeners[handlerName].apply(this, eventArguments);
    return true;
  };

  obj.checkEvent = function (name) {
    var listeners = eventHost.listeners;
    return !!listeners['ev_' + name.toLowerCase()];
  };

  obj.detachEvent = function (id) {
    if (id) {
      var listeners = eventHost.listeners;

      for (var i in listeners) {
        listeners[i].removeEvent(id); //remove event
      }

      var list = id.split(':'); //get EventName and ID

      listeners = eventHost.listeners;

      if (list.length === 2) {
        var eventName = list[0];
        var eventId = list[1];

        if (listeners[eventName]) {
          listeners[eventName].removeEvent(eventId); //remove event
        }
      }
    }
  };

  obj.detachAllEvents = function () {
    for (var name in eventHost.listeners) {
      eventHost.listeners[name].clear();
    }
  };
}

/* harmony default export */ __webpack_exports__["default"] = (makeEventable);

/***/ })

/******/ });
});