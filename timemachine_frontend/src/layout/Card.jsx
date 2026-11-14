export default function Card({item}) {
    return (
    <div className="card bg-base-100 shadow">
        <div className="card-body">
            <h2 className="card-title">{item.title}</h2>
            <p className="text-base-content/60">{item.description}</p>
        </div>
    </div>
    )
}