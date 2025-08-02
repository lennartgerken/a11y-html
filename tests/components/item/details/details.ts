import { Locator } from '@playwright/test'
import { BaseComponent } from '@/components/baseComponent.js'
import { Element } from './element.js'

export class Details extends BaseComponent {

    readonly headerDiv: Locator
    readonly resultDiv: Locator
    readonly descriptionDiv: Locator
    readonly allTagDivs: Locator
    readonly allElementDivs: Locator

    constructor(locator: Locator) {

        super(locator)

        this.headerDiv = locator.getByTestId('details-header')
        this.resultDiv = locator.getByTestId('details-result')
        this.descriptionDiv = locator.getByTestId('details-description')
        this.allTagDivs = locator.getByTestId('details-tags').getByTestId('tag-info')
        this.allElementDivs = locator.getByTestId('html-element')

    }

    getElement(html: string) {

        return new Element(this.allElementDivs.filter({ has: this.locator.page().getByText(html, { exact: true }) }))

    }

}