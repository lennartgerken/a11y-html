import { BaseComponent } from '@/components/baseComponent'
import { InfoBar } from '@/components/resultsOverview/testsOverview/infoBar'
import { NavBar } from '../navBar'
import { Locator } from '@playwright/test'
import { TestItem } from './testItem/testItem'

export class TestsOverview extends BaseComponent {
    readonly infoBar: InfoBar
    readonly openScreenshotButton: Locator
    readonly screenshotImg: Locator
    readonly navBar: NavBar
    readonly allItemDivs: Locator

    constructor(locator: Locator) {
        super(locator)

        this.infoBar = new InfoBar(locator.getByTestId('info-bar'))
        this.openScreenshotButton = locator.getByTestId('open-screenshot')
        this.screenshotImg = locator.getByAltText('Screenshot')
        this.navBar = new NavBar(locator.getByTestId('tests-nav'))
        this.allItemDivs = locator.getByTestId(/test-item/)
    }

    getTestsItem(id: string) {
        return new TestItem(this.locator.getByTestId('test-item-' + id))
    }
}
