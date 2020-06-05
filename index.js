"use strict";

function isObject(arg) {
  return typeof arg === "object" && arg !== null && !isArray(arg);
}

function isArray(arg) {
  return Array.isArray(arg);
}

function isString(arg) {
  return typeof arg === "string";
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
        bccInitial: isString(args[0]) && args[0] ? args[0] : "",
        bccSource: isObject(args[1]) && args[1] ? args[1] : {},
        bccKeys: isArray(args[2]) && args[2] ? args[2] : getObjectKeys(args[1])
      };
}

module.exports = (...args) => {
  try {
    const { bccInitial, bccSource, bccKeys } = normalizeArgs(args);

    return bccKeys
      .reduce(
        (cssClass, key) => (bccSource[key] ? `${cssClass} ${key}` : cssClass),
        bccInitial
      )
      .trim();
  } catch (err) {
    console.error(err);

    return "";
  }
};
