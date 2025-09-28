import './App.css'
import { useState } from 'react';
function App() {

  const [customJson, setCustomJson] = useState({
    reto: "", frase: ""
  })

  const [response, setResponse] = useState("")

  async function handleSubmit(e) {
    e.preventDefault();

    // check for keychain
    try {
      const hiveKeychain = window.hive_keychain;

      if (!hiveKeychain) {
        throw Error("Hive Keychain no esta instalada")
      }

      hiveKeychain.requestCustomJson(null, 'hive-challenge-custom-json', 'Posting', JSON.stringify(customJson), 'Hive Challenge Custom Json by @Jkalthor', (res) => {
        console.log(res);
        setResponse(JSON.stringify(res)); 
      });

    } catch (error) {
      console.error(error); 
      setResponse(error)
    }
    // broadcast to hive from keychain
  }

  return (
    <>
      <h2>Hive Challenge 1: Custom Json</h2>
      <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="reto">Reto</label>
        <input value={customJson.reto} onChange={(e) => setCustomJson({...customJson, reto: e.target.value})} name='reto' type='text'></input>

        <label htmlFor="frase">Frase</label>
        <input value={customJson.frase} onChange={(e) => setCustomJson({...customJson, frase: e.target.value})}  name='frase' type='text'></input>

        <button type='submit'>Enviar custom json</button>
      </form>

      <code>
        {response}
      </code>
      </div>
    </>
  )
}

export default App
