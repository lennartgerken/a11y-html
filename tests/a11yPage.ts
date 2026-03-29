import { Locator, Page } from '@playwright/test'
import { ResultsOverview } from './components/resultsOverview/resultsOverview'
import { TargetModal } from './components/targetModal'

export class A11yPage {
    readonly headingH1: Locator
    readonly resultsOverview: ResultsOverview
    readonly targetModal: TargetModal

    constructor(page: Page) {
        this.headingH1 = page.locator('h1')
        this.resultsOverview = new ResultsOverview(
            page.getByTestId('results-overview')
        )
        this.targetModal = new TargetModal(
            page.getByTestId('modal').filter({ hasText: 'Full Target' })
        )
    }
}
