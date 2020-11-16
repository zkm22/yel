import "reflect-metadata";

export function keyPath() {
  return function(target, propertyName) {
    if (Reflect.getMetadata('keyPath', target)) {
      throw new Error('multy keyPath');
    }
    Reflect.defineMetadata('keyPath', propertyName, target)
  }
}

export function index() {
  return function(target, propertyName) {
    let indexies: string[] = Reflect.getMetadata('indexes', target) || [];
    if (!indexies.length) {
      Reflect.defineMetadata('indexes', [], target);
    }
    Reflect.defineMetadata('indexes', [...indexies, propertyName], target);
  }
}


export abstract class Entity {
}
