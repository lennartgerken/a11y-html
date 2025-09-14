import { Locator } from '@playwright/test'
import { BaseComponent } from '../baseComponent'

export class ResultItem extends BaseComponent {
    readonly urlButton: Locator
    readonly infoDiv: Locator

    constructor(locator: Locator) {
        super(locator)

        this.urlButton = locator.getByTestId('url')
        this.infoDiv = locator.getByTestId('info')
    }
}
