import { HipTopPage } from './app.po';

describe('hip-top App', () => {
  let page: HipTopPage;

  beforeEach(() => {
    page = new HipTopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
