import { BaseComponent } from '@/components/baseComponent.js'
import { Locator } from '@playwright/test'

export class Rule extends BaseComponent {

    readonly headerDiv: Locator
    readonly typeDiv: Locator
    readonly impactDiv: Locator
    readonly descriptionDiv: Locator

    constructor(locator: Locator) {

        super(locator)

        this.headerDiv = this.locator.getByTestId('rule-header')
        this.typeDiv = this.locator.getByTestId('rule-type').getByTestId('tag-info')
        this.impactDiv = this.locator.getByTestId('rule-impact').getByTestId(/tag/)
        this.descriptionDiv = this.locator.getByTestId('rule-description')

    }

}