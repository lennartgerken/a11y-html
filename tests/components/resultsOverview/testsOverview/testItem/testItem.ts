import { Locator } from '@playwright/test'
import { TestDetails } from './testDetails/testDetails.js'
import { BaseComponent } from '@/components/baseComponent.js'

export class TestItem extends BaseComponent {
    readonly headerDiv: Locator
    readonly resultDiv: Locator
    readonly descriptionDiv: Locator
    readonly openButton: Locator
    readonly details: TestDetails

    constructor(locator: Locator) {
        super(locator)

        this.headerDiv = locator.getByTestId('item-header')
        this.resultDiv = locator.getByTestId('item-result')
        this.descriptionDiv = locator.getByTestId('item-description')
        this.openButton = locator.getByTestId('item-open')
        this.details = new TestDetails(locator.getByTestId('details'))
    }
}
