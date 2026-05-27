import { AfterContentInit, Component, ElementRef, Input, Renderer2 } from '@angular/core';

enum CardTypes {
  Default = 'default',
  List = 'list',
}

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.css'
})
export class DashboardCardComponent implements AfterContentInit {
  @Input() banner?: string;
  @Input() title?: string;
  @Input() type: `${CardTypes}` = CardTypes.Default;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterContentInit(): void {
    switch (this.type) {
      case CardTypes.List:
        this.initListCard();
        break;
      default:
        break;
    }
  }

  private initListCard(): void {
    const host = this.el.nativeElement;

    const dividersParent = host.querySelector('.card-content > div');
    const contentChildren = host.querySelectorAll('.card-content > div > *');

    contentChildren.forEach((child: Element, index: number) => {
      if (index < contentChildren.length - 1) {
        const divider = this.renderer.createElement('div');
        this.renderer.addClass(divider, 'card-divider');

        this.renderer.insertBefore(
          dividersParent,
          divider,
          contentChildren[index + 1]
        );
      }
    });
  }
}
