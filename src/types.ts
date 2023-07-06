export enum ComponentType {
  Layout = "Layout",
  Atomic = "Atomic",
}

interface IState {
  initialValue?: any;
  type: string;
}

interface IProgramProp {
  type: string;
  initialValue: string;
  required?: boolean;
  name: string;
}

interface IComponentProp {
  staticValue?: any;
  dynamicValue?: string;
}

export interface IReactProgram {
  name: string;
  states?: Record<string, IState>;
  props?: Record<string, IProgramProp>;
  imports?: Record<string, string[]>;
  return: IReactComponent;
}

export interface IReactComponent {
  tag: string;
  $$type: ComponentType;
  props?: Record<string, IComponentProp>;
  children?: IReactComponent[];
}
