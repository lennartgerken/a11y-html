import { Locator } from '@playwright/test'
import { BaseComponent } from '../baseComponent'

export class ResultItem extends BaseComponent {
    readonly url: Locator
    readonly info: Locator

    constructor(locator: Locator) {
        super(locator)

        this.url = locator.getByTestId('url')
        this.info = locator.getByTestId('info')
    }
}
