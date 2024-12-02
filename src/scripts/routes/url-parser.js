class UrlParser {
  static parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    const splitedUrl = this._urlSplitter(url);
    return this._urlCombiner(splitedUrl);
  }

  static _urlSplitter(url) {
    const urls = url.split('/');
    return {
      resource: urls[1] || null,
      id: urls[2] || null,
      verb: urls[3] || null,
    };
  }

  static _urlCombiner(splitedUrl) {
    return (
      (splitedUrl.resource ? `/${splitedUrl.resource}` : '/') +
        (splitedUrl.id ? '/:id' : '') +
        (splitedUrl.verb ? `/${splitedUrl.verb}` : '')
    );
  }
}

export default UrlParser;
