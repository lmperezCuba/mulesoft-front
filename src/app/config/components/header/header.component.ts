import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() drawer: EventEmitter<boolean> = new EventEmitter();
  @HostBinding('class') className = '';
  @Input() theme: boolean | undefined;
  @Input() hasMenu = false;
  activeDrawer = true;
  currentTheme = 'corporate';
  themeClass = {
    'ai-toggle-switcher': true,
    'ai-toggle-switcher-light': this.currentTheme === 'corporate',
    'ai-toggle-switcher-dark': this.currentTheme === 'dark',
  };

  constructor(
    private overlay: OverlayContainer
  ) {}

  ngOnInit(): void {
    this.loadTheme();
  }

  /**
   * Switch between themes light and dark.
   */
  changeTheme(): void {
    if (this.currentTheme === 'dark') {
      localStorage.setItem('theme', 'corporate');
      this.currentTheme = 'corporate';
    } else {
      this.currentTheme = 'dark';
      localStorage.setItem('theme', 'dark');
    }
    // this.themeService.changeTheme(this.currentTheme)
    this.themeClass = {
      'ai-toggle-switcher': true,
      'ai-toggle-switcher-light': this.currentTheme === 'dark',
      'ai-toggle-switcher-dark': this.currentTheme === 'corporate',
    };
    if (this.currentTheme === 'dark') {
      this.className = 'dark-theme';
      this.overlay.getContainerElement().classList.add('dark-theme');
    } else {
      this.className = '';
      this.overlay.getContainerElement().classList.remove('dark-theme');
    }
  }

  /**
   * Load the theme from local storage
   */
  loadTheme(): void {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.changeTheme();
    }
  }

  /**
   * Emit an event when the menu is selected
   */
  clickDrawer() {
    this.drawer.emit(this.activeDrawer = !this.activeDrawer);
  }
}
