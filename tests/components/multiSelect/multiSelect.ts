import { Locator } from '@playwright/test'
import { BaseComponent } from '@/components/baseComponent.js'
import { Dropdown } from '@/components/multiSelect/dropdown.js'

export class MultiSelect extends BaseComponent {
    readonly openButton: Locator
    readonly dropdown: Dropdown

    constructor(locator: Locator) {
        super(locator)

        this.openButton = locator.getByTestId('open')
        this.dropdown = new Dropdown(locator.getByTestId('dropdown'))
    }
}
