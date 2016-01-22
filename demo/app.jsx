import React from 'react'
import look, { StyleSheet } from '../modules/look'
import { Presets } from '../modules/addons'
import Container from './components/layout/Container.jsx'
import UserAction from './components/examples/UserAction.jsx'
import ChildIndex from './components/examples/ChildIndex.jsx'
import Input from './components/examples/Input.jsx'
import Condition from './components/examples/Condition.jsx'
import Media from './components/examples/Media.jsx'
import Keyframes from './components/examples/Keyframes.jsx'
import Platform from './components/examples/Platform.jsx'
import Pseudo from './components/examples/Pseudo.jsx'

const App = () => (
<div>
		<h1 {...styles}>Look Examples</h1>
		<Container group title="1. Pseudo classes">
			<Container title="1.1. user action">
				<UserAction />
			</Container>
			<Container noPadding title="1.2. child index & child type">
				<ChildIndex items={new Array(5).join(',').split('').map((item, index) => index)} />
			</Container>
			<Container title="1.3. input">
				<Input />
			</Container>
      <Container title="1.4. other">
        <Pseudo />
      </Container>
		</Container>

		<Container group title="2. Stateful conditions">
			<Container description="Styles depend on props, state & context">
				<Condition />
			</Container>
		</Container>

		<Container group title="3. Media queries">
			<Container noPadding>
				<Media />
			</Container>
		</Container>

    <Container group title="4. Platform queries">
      <Container noPadding>
        <Platform />
      </Container>
    </Container>

    <Container group title="5. Keyframe animations">
      <Container noPadding description="Using the StyleSheet.keyframes helper">
        <Keyframes />
      </Container>
    </Container>
	</div>
)

const styles = StyleSheet.create({
  marginTop: 20,
  marginBottom: 30,
  fontSize: 40,
  fontWeight: 600,
  textAlign: 'center',
  color: 'rgb(82, 67, 203)'
})

// Apply lookRoot: true as this is the top-level Component
export default look(App, { lookRoot: true })
