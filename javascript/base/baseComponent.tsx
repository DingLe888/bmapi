import equal from 'fast-deep-equal';
import { Component } from 'react';

export default class BaseComponent<T> extends Component<T> {

  constructor(props: T) {
    super(props)
  }

  shouldComponentUpdate(newProps: T, newState: any) {
    return !equal(this.props, newProps) || !equal(this.state, newState)
  }

}