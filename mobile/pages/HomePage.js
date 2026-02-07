class HomePage {
    constructor(driver) {
        this.driver = driver;

        
        this.menuButton = 'id=com.example.android:id/menu_button';
        this.nextPageTitle = 'id=com.example.android:id/next_page_title';
    }

    async tapMenuButton() {
        const element = await this.driver.$(this.menuButton);
        await element.click();
    }

    async isNextPageDisplayed() {
        const title = await this.driver.$(this.nextPageTitle);
        return await title.isDisplayed();
    }
}

module.exports = HomePage;
