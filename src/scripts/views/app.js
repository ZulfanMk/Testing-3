import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner(); // Ambil URL aktif
    const page = routes[url]; // Tentukan halaman berdasarkan URL

    this._content.innerHTML = '<div class="loading">Loading...</div>';

    // Render halaman berdasarkan rute
    this._content.innerHTML = await page.render();
    await page.afterRender();

    const skipLink = document.querySelector('.skip-to-content');

    skipLink.addEventListener('click', (event)=>{
      event.preventDefault();
      document.querySelector('#mainContent').focus();
    });
  }
}

export default App;
