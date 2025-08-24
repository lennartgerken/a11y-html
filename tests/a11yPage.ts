import { Locator, Page } from '@playwright/test'
import { NavBar } from '@/components/navBar.js'
import { Item } from '@/components/item/item.js'
import { InfoBar } from './components/info-bar.js'

export class A11yPage {
    private page: Page

    readonly infoBar: InfoBar
    readonly navBar: NavBar
    readonly allItemDivs: Locator

    constructor(page: Page) {
        this.page = page

        this.infoBar = new InfoBar(page.getByTestId('info-bar'))
        this.navBar = new NavBar(page.locator('nav'))
        this.allItemDivs = page.getByTestId(/test-item/)
    }

    getItem(id: string) {
        return new Item(this.page.getByTestId('test-item-' + id))
    }
}
