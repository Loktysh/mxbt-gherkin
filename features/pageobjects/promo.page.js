const { $ } = require('@wdio/globals');
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
// promo.page.js

class PromoPage {
  // можно было бы сделать все эти проверки без переходов чтобы сразу открывать /news допустим
  // нужный url с категорией, всё зависит от необходимости атомарности
  // и стабильности ссылок на разделы я делал e2e-like 😄
  get tournamentsButton() {
    return $('//*[@class="owl-item active" and descendant::*[contains(text(), "Турниры")]]');
  }

  get newsButton() {
    return $('//*[@class="owl-item active" and descendant::*[contains(text(), "Новости")]]');
  }

  get bonusesButton() {
    return $('//*[@class="owl-item active" and descendant::*[contains(text(), "Бонусы")]]');
  }

  get statusesButton() {
    return $('//*[@class="owl-item active" and descendant::*[contains(text(), "Статусы")]]');
  }

  get lotteriesButton() {
    return $('//*[@class="owl-item active" and descendant::*[contains(text(), "Лотереи")]]');
  }

  get cashbackButton() {
    return $(`//div[contains(@class, 'owl-item') and contains(@class, 'active')]//a[@href="/cashback"]`);
    // скорее всего лучше везде переделать под похожий локатор
  }

  async goToSection(section) {
    switch (section) {
      case 'Статусы':
        await this.statusesButton.waitForStable();
        await this.statusesButton.click();
        break;
      case 'Турниры':
        await this.tournamentsButton.waitForStable();
        await this.tournamentsButton.click();
        break;
      case 'Бонусы':
        await this.bonusesButton.waitForStable();
        await this.bonusesButton.click();
        break;
      case 'Лотереи':
        await this.lotteriesButton.waitForStable();
        await this.lotteriesButton.click();
        break;
      case 'Кешбэк':
        await this.cashbackButton.waitForStable();
        await this.cashbackButton.click();
        break;
      default:
        throw new Error(`Неизвестный раздел: ${section}`);
    }
  }

  open() {
    return browser.url('/promo');
  }
}

module.exports = new PromoPage();
