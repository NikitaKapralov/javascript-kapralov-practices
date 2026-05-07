import { Button } from './components/ui/Button'
import { Input } from './components/ui/Input'
import { Checkbox } from './components/ui/Checkbox'
import { Loader } from './components/ui/Loader'
import { IconButton } from './components/ui/IconButton'
import { MultiDropdown } from './components/ui/MultiDropdown'
import { Card } from './components/dummies/Card'
import './App.css'

function App() {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Тест компонентов - Практика 2</h1>

      <section style={{ marginBottom: '40px' }}>
        <h2>Buttons</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="primary" fullWidth>Full Width</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>Icon Buttons</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <IconButton icon="🔍" aria-label="Search" />
          <IconButton icon="❤️" variant="primary" aria-label="Like" />
          <IconButton icon="🗑️" variant="secondary" aria-label="Delete" />
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>Inputs & Dropdown</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '300px' }}>
            <Input label="Email" placeholder="Enter email" />
          </div>
          <div style={{ maxWidth: '300px' }}>
            <MultiDropdown 
              label="Tags" 
              options={['React', 'Vue', 'Angular', 'Svelte']} 
            />
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>Other</h2>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <Checkbox label="Remember me" />
          <Loader size="medium" />
        </div>
      </section>

      <section>
        <h2>Cards</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <Card 
            title="Practice 2" 
            description="Architecture setup and component creation" 
            imageUrl="https://via.placeholder.com/250x150"
          />
          <Card 
            title="Next Practice" 
            description="State management with Zustand" 
            imageUrl="https://via.placeholder.com/250x150"
          />
        </div>
      </section>
    </div>
  )
}

export default App