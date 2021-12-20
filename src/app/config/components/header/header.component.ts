import { Component, EventEmitter, HostBinding, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SecurityService } from '../../services/security.service';

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
  @Input() title = 'Mulesoft Dashboard';
  activeDrawer = true;
  currentTheme = 'light';

  constructor(
    // private overlay: OverlayContainer,
    private securityService: SecurityService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.loadTheme();
  }

  /**
   * Switch between themes light and dark.
   */
  changeTheme(): void {
    if (this.currentTheme === 'dark') {
      localStorage.setItem('theme', 'light');
      this.currentTheme = 'light';
    } else {
      this.currentTheme = 'dark';
      localStorage.setItem('theme', 'dark');
    }
    if (this.currentTheme === 'dark') {
      this.className = 'dark-theme';
      this.renderer.addClass(document.body, 'dark-theme');
      // this.overlay.getContainerElement().parentElement?.parentElement?.classList.add('dark-theme');
    } else {
      this.className = '';
      this.renderer.removeClass(document.body, 'dark-theme');
      // this.overlay.getContainerElement().parentElement?.parentElement?.classList.remove('dark-theme');
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

  /**
   * Logout front the app
   */
  logout(){
    this.securityService.logout();
  }
}
