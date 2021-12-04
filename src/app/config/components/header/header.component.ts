import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy, OnInit {

  @HostBinding('class') className = '';
  @Input() theme: boolean | undefined;
  @Input() hasMenu = false;
  mobileQuery: MediaQueryList;
  currentTheme = 'corporate';
  themeClass = {
    'ai-toggle-switcher': true,
    'ai-toggle-switcher-light': this.currentTheme === 'corporate',
    'ai-toggle-switcher-dark': this.currentTheme === 'dark',
  };

  private readonly mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private overlay: OverlayContainer
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnInit(): void {
    this.loadTheme();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
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

  drawer() {
    // Open drawer
  }
}
