import { BaseComponent } from '@/components/baseComponent.js'
import { InfoBar } from '@/components/resultsOverview/testsOverview/infoBar.js'
import { NavBar } from '../navBar.js'
import { Locator } from '@playwright/test'
import { TestItem } from './testItem/testItem.js'

export class TestsOverview extends BaseComponent {
    readonly infoBar: InfoBar
    readonly navBar: NavBar
    readonly allItemDivs: Locator

    constructor(locator: Locator) {
        super(locator)

        this.infoBar = new InfoBar(locator.getByTestId('info-bar'))
        this.navBar = new NavBar(locator.getByTestId('tests-nav'))
        this.allItemDivs = locator.getByTestId(/test-item/)
    }

    getTestsItem(id: string) {
        return new TestItem(this.locator.getByTestId('test-item-' + id))
    }
}
