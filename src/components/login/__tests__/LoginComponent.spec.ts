import { describe, it, expect } from 'vitest'
import { createPinia } from 'pinia'
import { mount } from '@vue/test-utils'

import LoginComponent from '@/components/login/LoginComponent.vue'

describe('LoginComponent', () => {
  it('renders properly', () => {
    const pinia = createPinia()
    const wrapper = mount(LoginComponent, {
      // props: { msg: 'Hello Vitest' },
      global: {
        plugins: [pinia], // Inject Pinia into the component
      },
    })
    console.log(wrapper.text())
    expect(wrapper.html()).toMatchSnapshot()
  })
})
