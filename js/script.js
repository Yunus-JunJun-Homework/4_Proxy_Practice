'use strict';

let arrObjNoProto = new Array();

arrObjNoProto = new Proxy(arrObjNoProto, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return `Isinvalid_: no such element`;
    }
  },

  set(target, prop, value) {
    if (prop === 'length') {
      return `string`;
    }

    if (typeof value !== 'object' || Object.getPrototypeOf(value)) {
      console.warn(
        `Isinvalid: it's not an object - object with prototype to an array`
      );

      return {
        errorDesc: `Isinvalid: it's not an object - object with prototype to an array`,
      };
    }

    if (!typeof value === 'string') {
      value = JSON.stringify(value);
    }

    // save value

    target[prop] = value;
    return true;
  },
});

console.log(arrObjNoProto);

arrObjNoProto.push({
  name: `Yunus`,
  lastName: `Seytnazarov`,
});

console.log(arrObjNoProto.name);
console.log(arrObjNoProto.lastName);

arrObjNoProto.push(Object.create(null));
arrObjNoProto.push(Object.create(null));
arrObjNoProto.push(Object.create(null));
arrObjNoProto.push(Object.create(null));
arrObjNoProto.push(Object.create(null));

arrObjNoProto.push({});
console.log(arrObjNoProto.push(Object.create({}))); // 6
console.log(arrObjNoProto);
arrObjNoProto.push(7);
arrObjNoProto.push([0, 1, 2]);

console.log(arrObjNoProto[1]); //{}
console.log(arrObjNoProto); // Array length 5

// PRACTICE PROXY

const user = {
  firstName: 'Yunus',
  lastName: 'Seytnazarov',
};

const getFullName = function (user) {
  return `${user.firstName} ${user.lastName}`;
};

const getFullNameProxy = new Proxy(getFullName, {
  apply(target, thisArg, args) {
    return target(...args).toUpperCase();
  },
});

console.log(getFullNameProxy(user));

const proxy = new Proxy(user, {
  get: function (target, property) {
    if (property === 'toJSON') {
      return () => target;
    }
  },
});

console.log(proxy);
