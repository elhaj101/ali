function App() {
  const sections = [
    'Section 1',
    'Section 2',
    'Section 3',
    'Section 4',
    'Section 5',
  ]

  return (
    <main>
      {sections.map((label) => (
        <div key={label} className="full-frame-section">
          <h1>{label}</h1>
        </div>
      ))}
    </main>
  )
}

export default App
