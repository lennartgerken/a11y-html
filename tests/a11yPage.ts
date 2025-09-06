import { Locator, Page } from '@playwright/test'
import { ResultsOverview } from './components/resultsOverview/resultsOverview.js'

export class A11yPage {
    readonly headingH1: Locator
    readonly resultsOverview: ResultsOverview

    constructor(page: Page) {
        this.headingH1 = page.locator('h1')
        this.resultsOverview = new ResultsOverview(
            page.getByTestId('results-overview')
        )
    }
}
