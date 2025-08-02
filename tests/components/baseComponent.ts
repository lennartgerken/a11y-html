import { Locator } from '@playwright/test'

export class BaseComponent {

    readonly locator: Locator

    constructor(locator: Locator) {

        this.locator = locator

    }

}