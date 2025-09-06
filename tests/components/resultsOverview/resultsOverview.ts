import { Locator } from '@playwright/test'
import { BaseComponent } from '../baseComponent.js'
import { TestsOverview } from './testsOverview/testsOverview.js'
import { NavBar } from './navBar.js'
import { ResultItem } from './resultItem.js'

export class ResultsOverview extends BaseComponent {
    readonly backButton: Locator
    readonly timestamp: Locator
    readonly navBar: NavBar
    readonly testsOverview: TestsOverview

    constructor(locator: Locator) {
        super(locator)

        this.backButton = locator.getByRole('button', {
            name: 'Back to Overview'
        })
        this.timestamp = locator.getByTestId('results-timestamp')
        this.navBar = new NavBar(locator.getByTestId('results-nav'))
        this.testsOverview = new TestsOverview(
            locator.getByTestId('tests-overview')
        )
    }

    getResultItem(url: string) {
        return new ResultItem(
            this.locator.getByTestId('result-item').filter({
                has: this.locator
                    .page()
                    .getByTestId('url')
                    .filter({ hasText: url })
            })
        )
    }
}
