"use strict";
var Framework = require('../framework');
var ValueObject = (function () {
    function ValueObject() {
    }
    ValueObject.prototype.objectsAreEqual = function (object1, object2, stackLevel) {
        if (stackLevel > 3) {
            Framework.ErrorService.throw("stack overflow in value object comparison. avoid circular references in value objects");
            return false;
        }
        var self = this;
        for (var prop in object1) {
            if (object1.hasOwnProperty(prop)) {
                if (object1[prop] == null && object2[prop] != null) {
                    return false;
                }
                else if (object1[prop].length && object1[prop].length != 0) {
                    if (object1[prop].length != object2[prop].length) {
                        return false;
                    }
                    for (var i = 0; i < object1[prop].length; i++) {
                        if (object1[prop][i] != object2[prop][i]) {
                            return false;
                        }
                    }
                }
                else if (typeof (object1[prop].equals) === "function") {
                    return object1[prop].equals(object2[prop]);
                }
                else if (typeof (object1[prop]) === "object") {
                    return self.objectsAreEqual(object1[prop], object2[prop], stackLevel + 1);
                }
                else if (object1[prop] != object2[prop]) {
                    return false;
                }
            }
        }
        return true;
    };
    ValueObject.prototype.equals = function (other) {
        var me = this;
        return me.objectsAreEqual(me, other, 0);
    };
    return ValueObject;
}());
exports.ValueObject = ValueObject;
