import { Locator } from '@playwright/test'
import { BaseComponent } from '@/components/baseComponent'
import { HTMLElement } from './htmlElement'

export class TestDetails extends BaseComponent {
    readonly headerDiv: Locator
    readonly resultDiv: Locator
    readonly descriptionSpan: Locator
    readonly helpSpan: Locator
    readonly urlA: Locator
    readonly allTagDivs: Locator
    readonly allElementDivs: Locator

    constructor(locator: Locator) {
        super(locator)

        this.headerDiv = locator.getByTestId('details-header')
        this.resultDiv = locator.getByTestId('details-result')
        this.descriptionSpan = locator.getByTestId('details-description')
        this.helpSpan = locator.getByTestId('details-help')
        this.urlA = locator.getByTestId('details-url')
        this.allTagDivs = locator
            .getByTestId('details-tags')
            .getByTestId('tag-info')
        this.allElementDivs = locator.getByTestId('html-element')
    }

    getHTMLElement(html: string) {
        return new HTMLElement(
            this.allElementDivs.filter({
                has: this.locator.page().getByText(html, { exact: true })
            })
        )
    }
}
