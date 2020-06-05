"use strict";

function isObject(arg) {
  return typeof arg === "object";
}

function getObjectKeys(object) {
  return isObject(object) ? Object.keys(object) : [];
}

function normalizeArgs(args) {
  return isObject(args[0])
    ? {
        bccInitial: args[0].bccInitial || "",
        bccSource: args[0].bccSource || {},
        bccKeys: args[0].bccKeys || getObjectKeys(args[0].bccSource)
      }
    : {
        bccInitial: args[0] || "",
        bccSource: args[1] || {},
        bccKeys: args[2] || getObjectKeys(args[1])
      };
}

// bccInitial: string, bccSource: object, bccKeys: array | optional
// { bccInitial: string | optional, bccSource: object, bccKeys: array | optional }

module.exports = (...args) => {
  const { bccInitial, bccSource, bccKeys } = normalizeArgs(args);

  return bccKeys
    .reduce(
      (cssClass, key) => (bccSource[key] ? `${cssClass} ${key}` : cssClass),
      bccInitial
    )
    .trim();
};
