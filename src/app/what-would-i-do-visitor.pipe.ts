import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'whatWouldIDoVisitor'
})
export class WhatWouldIDoVisitorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
