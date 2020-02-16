import { shallow } from 'enzyme'
import React from 'react'
import ConfigPage from './ConfigPage'
import { AuthProvider } from '../../auth/auth-context'
import { ViewType } from '../../util/Twitch/ViewType'

test('renders without failing', ()=>{
    let wrapper = shallow(
    <AuthProvider viewType={ViewType.CONFIG}>
        <ConfigPage />
    </AuthProvider>
    )

    expect(wrapper).toBeDefined()
})