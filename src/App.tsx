import{useState}from'react'
  interface Card{q:string;a:string}
  interface Deck{name:string;icon:string;cards:Card[]}
  const DECKS:Deck[]=[
    {name:'TypeScript',icon:'🟦',cards:[
      {q:'What is a type guard?',a:'A conditional check that narrows the type of a variable within a block (e.g., typeof, instanceof, or custom type predicate).'},
      {q:'Difference between interface and type?',a:'Both define shapes. interface is extendable with declaration merging; type supports union/intersection types and computed properties.'},
      {q:'What is the unknown type?',a:'A type-safe alternative to any. Values of type unknown must be checked before use, unlike any.'},
      {q:'What are generics used for?',a:'Creating reusable components that work with multiple types while maintaining type safety (e.g., Array<T>, Promise<T>).'},
      {q:'What is the readonly modifier?',a:'Prevents reassignment of object properties after initialization. Similar to const but for object properties.'},
    ]},
    {name:'React',icon:'⚛️',cards:[
      {q:'What is the virtual DOM?',a:'A lightweight in-memory representation of the real DOM. React computes a diff and applies minimal updates to the real DOM.'},
      {q:'When does useEffect run?',a:'After every render by default. With a dependency array, it runs only when those values change. With [], only on mount.'},
      {q:'What is the purpose of useCallback?',a:'Memoizes a function reference so it is not recreated on every render — useful when passing callbacks to memoized child components.'},
      {q:'What is reconciliation?',a:'The process React uses to compare the previous and new virtual DOM trees to determine the minimal set of DOM mutations needed.'},
      {q:'What is lifting state up?',a:'Moving state to the closest common ancestor of components that need to share it, then passing data down via props.'},
    ]},
    {name:'CS Fundamentals',icon:'💻',cards:[
      {q:'What is Big-O notation?',a:'A mathematical notation describing the upper bound of an algorithm's growth rate in time or space as input size grows.'},
      {q:'What is a hash table?',a:'A data structure that maps keys to values using a hash function. Provides O(1) average-case lookup, insert, and delete.'},
      {q:'Explain binary search.',a:'Repeatedly halves the search space on a sorted array. Time complexity: O(log n). Requires sorted input.'},
      {q:'What is a closure?',a:'A function that retains access to its lexical scope — the variables defined in the scope where it was created — even after that scope has exited.'},
      {q:'Difference: stack vs queue?',a:'Stack: LIFO (Last In First Out). Queue: FIFO (First In First Out). Stack uses push/pop, queue uses enqueue/dequeue.'},
    ]},
  ]
  export default function App(){
    const[deckIdx,setDeckIdx]=useState(0)
    const[cardIdx,setCardIdx]=useState(0)
    const[flipped,setFlipped]=useState(false)
    const[known,setKnown]=useState<Set<number>>(new Set())
    const deck=DECKS[deckIdx]
    const card=deck.cards[cardIdx]
    const next=()=>{setCardIdx(i=>(i+1)%deck.cards.length);setFlipped(false)}
    const prev=()=>{setCardIdx(i=>(i-1+deck.cards.length)%deck.cards.length);setFlipped(false)}
    const markKnown=()=>{setKnown(k=>new Set([...k,cardIdx]));next()}
    const changeDeck=(i:number)=>{setDeckIdx(i);setCardIdx(0);setFlipped(false);setKnown(new Set())}
    return(
      <div style={{minHeight:'100vh',background:'#0f172a',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:'Inter,system-ui,sans-serif',color:'#e2e8f0',padding:'2rem'}}>
        <div style={{width:'100%',maxWidth:600}}>
          <h1 style={{fontWeight:800,fontSize:'1.75rem',marginBottom:'1rem',color:'#f8fafc',textAlign:'center'}}>🃏 Flashcard Study App</h1>
          <div style={{display:'flex',gap:'0.75rem',justifyContent:'center',marginBottom:'1.5rem'}}>
            {DECKS.map((d,i)=><button key={d.name} onClick={()=>changeDeck(i)} style={{padding:'0.5rem 1rem',background:deckIdx===i?'#1e40af':'#1e293b',color:deckIdx===i?'#93c5fd':'#94a3b8',border:'none',borderRadius:20,cursor:'pointer',fontWeight:500,fontSize:'0.85rem'}}>{d.icon} {d.name}</button>)}
          </div>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.75rem',alignItems:'center'}}>
            <span style={{color:'#94a3b8',fontSize:'0.85rem'}}>{cardIdx+1} / {deck.cards.length}</span>
            <span style={{color:'#22c55e',fontSize:'0.85rem'}}>✓ {known.size} known</span>
          </div>
          <div style={{marginBottom:'1rem'}}>
            <div style={{height:4,background:'#1e293b',borderRadius:2}}><div style={{height:'100%',background:'#38bdf8',borderRadius:2,width:`${((cardIdx+1)/deck.cards.length)*100}%`,transition:'width 0.3s'}}/></div>
          </div>
          <div onClick={()=>setFlipped(f=>!f)} style={{background:'#111827',border:`2px solid ${flipped?'#38bdf8':'#1e293b'}`,borderRadius:16,padding:'3rem 2rem',minHeight:240,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center',marginBottom:'1.5rem',transition:'border-color 0.2s',userSelect:'none'}}>
            <div>
              <div style={{color:'#475569',fontSize:'0.75rem',fontWeight:600,letterSpacing:'0.1em',marginBottom:'1rem'}}>{flipped?'ANSWER':'QUESTION — tap to reveal'}</div>
              <p style={{color:flipped?'#86efac':'#f1f5f9',fontSize:'1.05rem',lineHeight:1.7,fontWeight:flipped?400:500}}>{flipped?card.a:card.q}</p>
            </div>
          </div>
          <div style={{display:'flex',gap:'0.75rem',justifyContent:'center'}}>
            <button onClick={prev} style={{padding:'0.7rem 1.25rem',background:'#1e293b',color:'#94a3b8',border:'1px solid #334155',borderRadius:8,cursor:'pointer'}}>← Prev</button>
            <button onClick={markKnown} style={{padding:'0.7rem 1.5rem',background:'#16a34a',color:'#fff',border:'none',borderRadius:8,cursor:'pointer',fontWeight:700}}>✓ Got it</button>
            <button onClick={next} style={{padding:'0.7rem 1.25rem',background:'#1e293b',color:'#94a3b8',border:'1px solid #334155',borderRadius:8,cursor:'pointer'}}>Next →</button>
          </div>
        </div>
      </div>
    )
  }