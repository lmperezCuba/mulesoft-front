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
  currentTheme = 'light';

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
    console.log('d');
    
    if (this.currentTheme === 'dark') {
      localStorage.setItem('theme', 'light');
      this.currentTheme = 'light';
    } else {
      this.currentTheme = 'dark';
      localStorage.setItem('theme', 'dark');
    }
    if (this.currentTheme === 'dark') {
      this.className = 'dark-theme';
      this.overlay.getContainerElement().parentElement?.classList.add('dark-theme');
    } else {
      this.className = '';
      this.overlay.getContainerElement().parentElement?.classList.remove('dark-theme');
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
