import { Locator } from '@playwright/test'
import { BaseComponent } from '../baseComponent.js'
import { Details } from './details/details.js'

export class Item extends BaseComponent {

    readonly headerDiv: Locator
    readonly resultDiv: Locator
    readonly descriptionDiv: Locator
    readonly openButton: Locator
    readonly details: Details

    constructor(locator: Locator) {

        super(locator)

        this.headerDiv = locator.getByTestId('item-header')
        this.resultDiv = locator.getByTestId('item-result')
        this.descriptionDiv = locator.getByTestId('item-description')
        this.openButton = locator.getByTitle('open')
        this.details = new Details(locator.getByTestId('details'))

    }

}