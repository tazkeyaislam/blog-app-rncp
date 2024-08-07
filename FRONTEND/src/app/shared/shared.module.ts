import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizeHtmlPipe } from '../pipe/sanitize-html.pipe';
import { MenuItems } from './menu-items';



@NgModule({
  declarations: [SanitizeHtmlPipe],
  imports: [
    CommonModule
  ],
  exports: [SanitizeHtmlPipe],
  providers: [MenuItems]
})
export class SharedModule { }
