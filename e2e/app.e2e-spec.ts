import { DBZCollectionPage } from './app.po';

describe('dbzcollection App', () => {
  let page: DBZCollectionPage;

  beforeEach(() => {
    page = new DBZCollectionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
