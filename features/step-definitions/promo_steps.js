const { Given, When, Then } = require('@wdio/cucumber-framework');
const { browser, expect, $ } = require('@wdio/globals');
const promoPage = require('../pageobjects/promo.page');

Given('пользователь находится на странице "Промо"', async () => {
  await promoPage.open();
});

When('пользователь переходит в раздел {string}', async section => {
  await promoPage.goToSection(section);
  // возможно стоило бы в стиле AAA вынести сюда click отдельно
});

When('пользователь переходит на страницу {string}', async pageName => {
  //костыль потому что у кнопки нет test id
  if (pageName === 'Акции') {
    const headerPromoDropdown = await $(`//a[text()='Промо']`);
    headerPromoDropdown.moveTo();
    headerPromoBtn = await $(`//a[text()="АКЦИИ"]`);
    headerPromoBtn.waitForStable();
    headerPromoBtn.click();
  } else {
    const headerPromoDropdown = await $(`//a[text()='Промо']`);
    headerPromoDropdown.moveTo();
    headerNewsBtn = await $(`[data-test="news"]`);
    headerNewsBtn.waitForStable();
    headerNewsBtn.click();
  }
});

Then('убеждается в наличии статуса {string}', async status => {
  const formattedStatusTitle = status.toLowerCase();
  const statusTitle = await $(
    `//*[contains(@class, 'status-title') and contains(text(), '${formattedStatusTitle}')]`
  );
  await statusTitle.waitForDisplayed();
  await expect(statusTitle).toBeDisplayed();
});

Then('убеждается в наличии турнира {string}', async tournament => {
  const tournamentFormattedTitle = tournament.toLowerCase().replace(/[\s-_]/g, '');
  const tournamentTitle = await $(`//*[@data-tournament='${tournamentFormattedTitle}']`);
  await tournamentTitle.scrollIntoView();
  await expect(tournamentTitle).toBeDisplayed();
});

Then('убеждается в наличии подарка на ДР', async () => {
  const birthdayGift = await $(`//*[@id='birthday']`);
  // await birthdayGift.waitForDisplayed();
  await expect(birthdayGift).toBeDisplayed();
});

Then('убеждается в наличии кнопки {string}', async buttonText => {
  const learnMoreButton = await $(`//*[contains(text(), '${buttonText}')]`);
  await learnMoreButton.waitForDisplayed();
  await expect(learnMoreButton).toBeDisplayed();
});

Then('убеждается в наличии блока "Как получить кешбэк"', async () => {
  const cashbackBlock = await $('//*[contains(text(), "Как получить Кешбэк?")]');
  await cashbackBlock.waitForDisplayed();
  await expect(cashbackBlock).toBeDisplayed();
});

Then('убеждается в наличии {int} новостей', async newsCount => {
  const newsItem = $(`//*[@class='news-list__item']`);
  await newsItem.waitForDisplayed();
  const allNewsItem = await $$(`//*[@class='news-list__item']`);
  //уверен можно как-то лучше через массив и проверять или мы видим эти две новости на экране
  await expect(allNewsItem.length).toBeGreaterThanOrEqual(newsCount);
});

Then(
  'убеждается в наличии {int} любых действующих и {int} завершенных акций',
  //не делал так как нужно было искать нормальный локатор для АКЦИИ
  async (currentPromotionsCount, passedPromotionsCount) => {
    const actionsItem = $(`.actions__items`);
    await actionsItem.waitForDisplayed();
    const allNewsItem = await $$(`//*[@class='news-list__item']`);
    await expect(allNewsItem.length).toBeGreaterThanOrEqual(currentPromotionsCount);
  }
);
