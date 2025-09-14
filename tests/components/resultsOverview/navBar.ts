import { Locator } from '@playwright/test'
import { BaseComponent } from '@/components/baseComponent'
import { MultiSelect } from '@/components/multiSelect/multiSelect'

export class NavBar extends BaseComponent {
    readonly searchInput: Locator
    readonly filterSelect: Locator
    readonly tags: MultiSelect

    constructor(locator: Locator) {
        super(locator)

        this.searchInput = locator.getByPlaceholder('search')
        this.filterSelect = locator.getByTitle('filter')
        this.tags = new MultiSelect(
            locator.getByTestId('multi-select').filter({
                has: locator.page().getByRole('button', { name: 'Tags' })
            })
        )
    }
}
