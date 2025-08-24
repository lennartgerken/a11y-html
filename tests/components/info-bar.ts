import { Locator } from '@playwright/test'
import { BaseComponent } from '@/components/baseComponent.js'

export class InfoBar extends BaseComponent {
    readonly urlDiv: Locator
    readonly timestampDiv: Locator

    constructor(locator: Locator) {
        super(locator)

        this.urlDiv = locator.getByTestId('url')
        this.timestampDiv = locator.getByTestId('timestamp')
    }
}
