export namespace VueEvent {
  export interface Input<T extends EventTarget> extends InputEvent {
    target: T;
  }
  export interface Mouse<T extends EventTarget> extends MouseEvent {
    target: T;
  }
}

// export namespace VueRef {

// }