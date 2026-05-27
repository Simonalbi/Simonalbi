import { Component, ElementRef, OnInit, OnDestroy, ViewChild, NgZone, AfterViewInit, ApplicationRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

@Component({
  selector: 'app-code-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-loader.component.html',
  styleUrls: ['./code-loader.component.css']
})
export class CodeLoaderComponent implements AfterViewInit, OnDestroy {
  @Output() animationComplete = new EventEmitter<void>();

  @ViewChild('codeWindow') codeWindow!: ElementRef<HTMLDivElement>;
  
  @ViewChild('line1') line1!: ElementRef<HTMLSpanElement>;
  @ViewChild('line2') line2!: ElementRef<HTMLSpanElement>;
  @ViewChild('line3') line3!: ElementRef<HTMLSpanElement>;
  @ViewChild('line4') line4!: ElementRef<HTMLSpanElement>;
  @ViewChild('line5') line5!: ElementRef<HTMLSpanElement>;
  
  @ViewChild('c1') c1!: ElementRef<HTMLSpanElement>;
  @ViewChild('c2') c2!: ElementRef<HTMLSpanElement>;
  @ViewChild('c3') c3!: ElementRef<HTMLSpanElement>;
  @ViewChild('c4') c4!: ElementRef<HTMLSpanElement>;
  @ViewChild('c5') c5!: ElementRef<HTMLSpanElement>;
  
  @ViewChild('statusCursorPos') statusCursorPos!: ElementRef<HTMLSpanElement>;

  @ViewChild('loaderContainer') loaderContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('topHalf') topHalf!: ElementRef<HTMLDivElement>;
  @ViewChild('bottomHalf') bottomHalf!: ElementRef<HTMLDivElement>;
  @ViewChild('indentGuide') indentGuide!: ElementRef<HTMLDivElement>;
  @ViewChild('foldingArrow') foldingArrow!: ElementRef<HTMLSpanElement>;
  
  private tl: gsap.core.Timeline | null = null;
  private cursorBlink: gsap.core.Tween | null = null;
  
  constructor(private ngZone: NgZone, private appRef: ApplicationRef) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      // Global cursor blink animation
      this.cursorBlink = gsap.to('.cursor:not(.hidden)', {
        opacity: 0,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        duration: 0.4
      });
      
      this.tl = gsap.timeline({
        onUpdate: () => {
          let line = 1;
          let col = 1;
          if (!this.c1.nativeElement.classList.contains('hidden')) {
            line = 1; col = (this.line1.nativeElement.textContent?.length || 0) + 1;
          } else if (!this.c2.nativeElement.classList.contains('hidden')) {
            line = 2; col = (this.line2.nativeElement.textContent?.length || 0) + 3;
          } else if (!this.c3.nativeElement.classList.contains('hidden')) {
            line = 3; col = (this.line3.nativeElement.textContent?.length || 0) + 3;
          } else if (!this.c4.nativeElement.classList.contains('hidden')) {
            line = 4; col = (this.line4.nativeElement.textContent?.length || 0) + 3;
          } else if (!this.c5.nativeElement.classList.contains('hidden')) {
            line = 5; col = (this.line5.nativeElement.textContent?.length || 0) + 1;
          }
          if (this.statusCursorPos) {
            this.statusCursorPos.nativeElement.textContent = `Ln ${line}, Col ${col}`;
          }
        },
        onComplete: () => {
          this.ngZone.run(() => {
            this.appRef.tick();
            this.animationComplete.emit();
          });
        }
      });
      
      // Helper to dynamically create spans for granular typing
      const createSpan = (line: ElementRef, className: string) => {
        const span = document.createElement('span');
        if (className) span.className = className;
        line.nativeElement.appendChild(span);
        return span;
      };

      // Create all necessary spans
      const l1_obj = createSpan(this.line1, 'obj');
      const l1_punct1 = createSpan(this.line1, 'punct');
      const l1_func = createSpan(this.line1, 'func');
      const l1_punct2 = createSpan(this.line1, 'punct');

      const l2_key = createSpan(this.line2, 'key');
      const l2_str = createSpan(this.line2, 'str');
      const l2_punct = createSpan(this.line2, 'punct');

      const l3_key = createSpan(this.line3, 'key');
      const l3_str = createSpan(this.line3, 'str');
      const l3_punct = createSpan(this.line3, 'punct');

      const l4_key = createSpan(this.line4, 'key');
      const l4_str = createSpan(this.line4, 'str');

      const l5_punct = createSpan(this.line5, 'punct');

      // Line 1
      this.tl.to(l1_obj, { duration: 0.35, text: 'System', ease: "none" })
             .to(l1_punct1, { duration: 0.05, text: '.', ease: "none" })
             .to(l1_func, { duration: 0.25, text: 'init', ease: "none" }, "+=0.1") // micro-pause
             .to(l1_punct2, { duration: 0.15, text: '({', ease: "none" }, "+=0.05");
      
      // Move to line 2
      this.tl.add(() => {
        this.c1.nativeElement.classList.add('hidden');
        this.c2.nativeElement.classList.remove('hidden');
        this.cursorBlink?.invalidate().restart();
      });
      
      // Line 2
      const isMobile = window.innerWidth <= 500;
      const developerName = isMobile ? '"S. F. A."' : '"Simone Francesco Albino"';
      const typingDuration = isMobile ? 0.6 : 1.2;
      
      this.tl.to(l2_key, { duration: 0.4, text: 'developer: ', ease: "none" })
             .to(l2_str, { duration: typingDuration, text: developerName, ease: "none" }, "+=0.2") // pause before typing name
             .to(l2_punct, { duration: 0.05, text: ',', ease: "none" });
      
      // Move to line 3
      this.tl.add(() => {
        this.c2.nativeElement.classList.add('hidden');
        this.c3.nativeElement.classList.remove('hidden');
        this.cursorBlink?.invalidate().restart();
      });
      
      // Line 3
      this.tl.to(l3_key, { duration: 0.25, text: 'role: ', ease: "none" })
             .to(l3_str, { duration: 0.8, text: '"Software Engineer"', ease: "none" }, "+=0.15")
             .to(l3_punct, { duration: 0.05, text: ',', ease: "none" });
      
      // Move to line 4
      this.tl.add(() => {
        this.c3.nativeElement.classList.add('hidden');
        this.c4.nativeElement.classList.remove('hidden');
        this.cursorBlink?.invalidate().restart();
      });
      
      // Line 4
      this.tl.to(l4_key, { duration: 0.3, text: 'status: ', ease: "none" })
             .to(l4_str, { duration: 0.4, text: '"Online"', ease: "none" }, "+=0.1");
      
      // Move to line 5
      this.tl.add(() => {
        this.c4.nativeElement.classList.add('hidden');
        this.c5.nativeElement.classList.remove('hidden');
        this.cursorBlink?.invalidate().restart();
      });
      
      // Line 5
      this.tl.to(l5_punct, { duration: 0.2, text: '});', ease: "none" });
      
      // Fade in the indent guide and folding arrow exactly when the closing bracket appears
      this.tl.to([this.indentGuide.nativeElement, this.foldingArrow.nativeElement], {
        opacity: 1,
        duration: 0.3,
        ease: "power1.inOut"
      }, "<");
      
      // Pause at the end to admire the code
      this.tl.to({}, { duration: 0.5 });
      
      // Code window lifts and fades out
      this.tl.to(this.codeWindow.nativeElement, {
        y: -40,
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "power2.in"
      }, "+=0.1");
      
      // Curtains slide apart
      this.tl.to(this.topHalf.nativeElement, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut"
      }, "+=0.1");
      
      this.tl.to(this.bottomHalf.nativeElement, {
        yPercent: 100,
        duration: 1,
        ease: "power4.inOut"
      }, "<");
      
      // Cleanup
      this.tl.to(this.loaderContainer.nativeElement, {
        display: 'none',
        duration: 0
      });
    });
  }

  ngOnDestroy(): void {
    if (this.cursorBlink) this.cursorBlink.kill();
    if (this.tl) this.tl.kill();
  }
}
