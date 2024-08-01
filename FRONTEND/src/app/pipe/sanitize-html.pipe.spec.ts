// import { DomSanitizer } from '@angular/platform-browser';
// import { SanitizeHtmlPipe } from './sanitize-html.pipe';

// describe('SanitizeHtmlPipe', () => {
//   it('create an instance', () => {
//     let sanitizer: DomSanitizer;
//     const pipe = new SanitizeHtmlPipe();
//     expect(pipe).toBeTruthy();
//   });
// });

import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

describe('SanitizeHtmlPipe', () => {
  let sanitizer: DomSanitizer;
  let pipe: SanitizeHtmlPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomSanitizer]
    });
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new SanitizeHtmlPipe(sanitizer);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});

