

export const ActionButton = ({ onClick, name }) => {
    return <button
        style={{ background: 'white', minWidth: '200px', padding: '10px 5px', borderBottom: '10px solid silver' }}
        onClick={() => { console.log('resuming'); onClick() }}>{name}</button>
}