import { Directive, ElementRef, Renderer, HostListener } from '@angular/core';

@Directive({
  selector: '[appMyhover]'
})
export class MyhoverDirective {

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @HostListener('mouseover') onMouseOver(){
    const part = this.el.nativeElement.querySelector('.examples');
    this.renderer.setElementStyle(part, 'display', 'block');
  }

}
