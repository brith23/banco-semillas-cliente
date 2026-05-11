import { useState, useEffect } from 'react'
import { db } from './firebase'
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore'

function App() {
  const [semillas, setSemillas] = useState([])
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [buscaCambio, setBuscaCambio] = useState('')
  const MI_USUARIO = 'Brith'

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'semillas'), (snapshot) => {
      setSemillas(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
    return () => unsub()
  }, [])

  const publicarSemilla = async (e) => {
    e.preventDefault()
    if (!nombre.trim() || !cantidad || !buscaCambio.trim()) {
      alert('Llena todos los campos')
      return
    }
    await addDoc(collection(db, 'semillas'), {
      nombre: nombre.trim(),
      cantidad: Number(cantidad),
      buscaCambio: buscaCambio.trim(),
      usuario: MI_USUARIO
    })
    setNombre('')
    setCantidad('')
    setBuscaCambio('')
  }

  const eliminarSemilla = async (id) => {
    await deleteDoc(doc(db, 'semillas', id))
  }

  const solicitarIntercambio = (semilla) => {
    alert(`Solicitaste intercambio de ${semilla.nombre} con ${semilla.usuario}`)
  }
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Intercambio de Semillas</h1>
      
      <form onSubmit={publicarSemilla} style={{ background: '#333', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2 style={{ color: 'white', marginTop: 0 }}>Publicar mi semilla</h2>
        <input 
          type="text" 
          placeholder="Nombre de la semilla" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)}
          style={{ width: '100%', padding: '10px', margin: '5px 0', borderRadius: '4px', border: 'none' }}
        />
        <input 
          type="number" 
          placeholder="Cantidad en kg" 
          value={cantidad} 
          onChange={(e) => setCantidad(e.target.value)}
          style={{ width: '100%', padding: '10px', margin: '5px 0', borderRadius: '4px', border: 'none' }}
        />
        <input 
          type="text" 
          placeholder="¿Qué buscas a cambio?" 
          value={buscaCambio} 
          onChange={(e) => setBuscaCambio(e.target.value)}
          style={{ width: '100%', padding: '10px', margin: '5px 0', borderRadius: '4px', border: 'none' }}
        />
        <button type="submit" style={{ background: '#22c55e', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '10px' }}>
          Publicar semilla
        </button>
      </form>

      <h2>Semillas disponibles</h2>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {semillas.map(semilla => (
          <div key={semilla.id} style={{ background: '#f5f5f5', color: '#333', padding: '15px', borderRadius: '8px', margin: '0 0 10px 0' }}>
            <h2 style={{ margin: '0 0 10px 0' }}>{semilla.nombre?.trim() ? semilla.nombre : 'Sin nombre'}</h2>
            <p><b>Cantidad:</b> {semilla.cantidad} kg</p>
            <p><b>Busca a cambio:</b> {semilla.buscaCambio?.trim() ? semilla.buscaCambio : 'No especificado'}</p>
            <p><b>Publicado por:</b> {semilla.usuario}</p>
            
            {semilla.usuario === MI_USUARIO ? (
              <button
                onClick={() => eliminarSemilla(semilla.id)}
                style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Eliminar mi semilla
              </button>
            ) : (
              <button
                onClick={() => solicitarIntercambio(semilla)}
                style={{ background: '#22c55e', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Solicitar intercambio
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App